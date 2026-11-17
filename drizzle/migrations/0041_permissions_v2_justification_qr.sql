ALTER TABLE public.staff_permission_requests DROP CONSTRAINT staff_permission_requests_kind_check;
ALTER TABLE public.staff_permission_requests ADD CONSTRAINT staff_permission_requests_kind_check CHECK (kind IN ('cita_medica','incapacidad','asunto_personal','capacitacion','congreso','asamblea','actividad_institucional','visita_empresa','sindical','cita_encargado','justificacion_ausencia','otro'));
ALTER TABLE public.staff_permission_requests ADD COLUMN urgent boolean NOT NULL DEFAULT false;
ALTER TABLE public.staff_permission_requests ADD COLUMN requester_role public.institution_role;
ALTER TABLE public.staff_permission_requests ADD COLUMN justification_path text CHECK (justification_path IS NULL OR (justification_path ~ '^[0-9a-f-]{36}/[A-Za-z0-9._-]{1,100}$' AND split_part(justification_path,'/',1)=requester_id::text));
ALTER TABLE public.staff_permission_requests ADD COLUMN justified_at timestamptz;
ALTER TABLE public.staff_permission_requests ADD COLUMN verification_hash text UNIQUE;
ALTER TABLE public.staff_permission_requests ADD COLUMN verification_payload text;
COMMENT ON TABLE public.staff_permission_requests IS 'Permission and absence-justification requests for staff and students of an institution.';

CREATE OR REPLACE FUNCTION public.can_review_permissions(_inst uuid) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT public.is_permission_approver() OR coalesce(public.institution_role_of(_inst)='direccion', false)
$$;
REVOKE ALL ON FUNCTION public.can_review_permissions(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_review_permissions(uuid) TO authenticated, service_role;

DROP POLICY "requester or approver reads" ON public.staff_permission_requests;
CREATE POLICY "requester or reviewer reads" ON public.staff_permission_requests FOR SELECT TO authenticated
  USING (requester_id=auth.uid() OR public.can_review_permissions(institution_id));
DROP POLICY "staff creates own pending request" ON public.staff_permission_requests;
CREATE POLICY "member creates own pending request" ON public.staff_permission_requests FOR INSERT TO authenticated
  WITH CHECK (requester_id=auth.uid() AND status='pendiente' AND reviewer_id IS NULL AND reviewed_at IS NULL AND review_note IS NULL
    AND justification_path IS NULL AND justified_at IS NULL AND verification_hash IS NULL AND verification_payload IS NULL
    AND public.institution_role_of(institution_id) IS NOT NULL);

CREATE OR REPLACE FUNCTION public.validate_permission_request() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE r public.institution_role;
BEGIN
  r := (SELECT m.member_role FROM public.institution_members m WHERE m.institution_id=NEW.institution_id AND m.user_id=NEW.requester_id);
  IF r IS NULL THEN RAISE EXCEPTION 'Debe pertenecer a la institución'; END IF;
  NEW.requester_role := r;
  IF r='estudiante' AND NEW.kind NOT IN ('cita_medica','incapacidad','cita_encargado','justificacion_ausencia','actividad_institucional','otro') THEN RAISE EXCEPTION 'Motivo no disponible para estudiantes'; END IF;
  IF r<>'estudiante' AND NEW.kind='justificacion_ausencia' THEN RAISE EXCEPTION 'La justificación de ausencia estudiantil es solo para estudiantes'; END IF;
  IF NEW.starts_on < (now() AT TIME ZONE 'America/Costa_Rica')::date - 30 THEN RAISE EXCEPTION 'La fecha de inicio no puede tener más de 30 días de antigüedad'; END IF;
  IF NEW.ends_on > NEW.starts_on + 90 THEN RAISE EXCEPTION 'Un permiso no puede exceder 90 días'; END IF;
  RETURN NEW;
END $$;

DROP POLICY "permission attachments owner or approver read" ON storage.objects;
CREATE POLICY "permission attachments owner or reviewer read" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id='permission-attachments' AND (
    (storage.foldername(name))[1]=auth.uid()::text
    OR public.is_permission_approver()
    OR EXISTS(SELECT 1 FROM public.staff_permission_requests r WHERE (r.attachment_path=name OR r.justification_path=name) AND public.institution_role_of(r.institution_id)='direccion')
  ));

CREATE OR REPLACE FUNCTION public.review_permission_request(_id uuid, _decision text, _note text) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public, extensions AS $$
DECLARE r public.staff_permission_requests; payload text; at timestamptz:=now();
BEGIN
  IF _decision NOT IN ('aprobado','rechazado') THEN RAISE EXCEPTION 'Decisión inválida'; END IF;
  SELECT * INTO r FROM public.staff_permission_requests WHERE id=_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Solicitud no encontrada'; END IF;
  IF NOT public.can_review_permissions(r.institution_id) THEN RAISE EXCEPTION 'Solo Max o la dirección de la institución pueden resolver permisos' USING ERRCODE='42501'; END IF;
  IF r.requester_id=auth.uid() THEN RAISE EXCEPTION 'No puede resolver su propia solicitud'; END IF;
  IF r.status<>'pendiente' THEN RAISE EXCEPTION 'La solicitud ya fue resuelta'; END IF;
  IF _decision='aprobado' THEN
    payload := concat_ws('|','pt-permiso-v1',r.id,r.institution_id,r.requester_id,r.kind,r.starts_on,r.ends_on,coalesce(r.hours,''),auth.uid(),to_char(at AT TIME ZONE 'UTC','YYYY-MM-DD"T"HH24:MI:SS"Z"'));
  END IF;
  UPDATE public.staff_permission_requests SET status=_decision, reviewer_id=auth.uid(), review_note=nullif(btrim(coalesce(_note,'')),''), reviewed_at=at,
    verification_payload=payload, verification_hash=CASE WHEN payload IS NULL THEN NULL ELSE encode(digest(payload,'sha256'),'hex') END
  WHERE id=_id;
END $$;

CREATE OR REPLACE FUNCTION public.attach_permission_justification(_id uuid, _path text) RETURNS timestamptz
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE at timestamptz:=now();
BEGIN
  IF _path IS NULL OR split_part(_path,'/',1)<>auth.uid()::text THEN RAISE EXCEPTION 'Ruta de comprobante inválida'; END IF;
  UPDATE public.staff_permission_requests SET justification_path=_path, justified_at=at
  WHERE id=_id AND requester_id=auth.uid() AND status IN ('pendiente','aprobado') AND justification_path IS NULL;
  IF NOT FOUND THEN RAISE EXCEPTION 'No se puede justificar esta solicitud'; END IF;
  RETURN at;
END $$;
REVOKE ALL ON FUNCTION public.attach_permission_justification(uuid,text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.attach_permission_justification(uuid,text) TO authenticated, service_role;

DROP FUNCTION public.permission_requests_for_review();
CREATE OR REPLACE FUNCTION public.permission_requests_for_review() RETURNS TABLE(id uuid, institution_name text, requester_email text, requester_name text, requester_role public.institution_role, kind text, starts_on date, ends_on date, hours text, reason text, urgent boolean, attachment_path text, justification_path text, justified_at timestamptz, status text, review_note text, reviewed_at timestamptz, verification_hash text, created_at timestamptz)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public AS $$
#variable_conflict use_column
BEGIN
  RETURN QUERY SELECT r.id, i.name, u.email::text, coalesce(p.display_name,''), r.requester_role, r.kind, r.starts_on, r.ends_on, r.hours, r.reason, r.urgent, r.attachment_path, r.justification_path, r.justified_at, r.status, r.review_note, r.reviewed_at, r.verification_hash, r.created_at
  FROM public.staff_permission_requests r JOIN public.institutions i ON i.id=r.institution_id JOIN auth.users u ON u.id=r.requester_id LEFT JOIN public.profiles p ON p.id=r.requester_id
  WHERE r.requester_id<>auth.uid() AND public.can_review_permissions(r.institution_id)
  ORDER BY (r.status='pendiente') DESC, r.created_at DESC
  LIMIT 300;
END $$;
REVOKE ALL ON FUNCTION public.permission_requests_for_review() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.permission_requests_for_review() TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.can_review_any_permissions() RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT public.is_permission_approver() OR EXISTS(SELECT 1 FROM public.institution_members m WHERE m.user_id=auth.uid() AND m.member_role='direccion'
    AND NOT EXISTS(SELECT 1 FROM public.account_status a WHERE a.user_id=auth.uid() AND a.status IN ('blocked','inactive')))
$$;
REVOKE ALL ON FUNCTION public.can_review_any_permissions() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_review_any_permissions() TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.verify_permission(_hash text) RETURNS TABLE(institution_name text, kind text, starts_on date, ends_on date, hours text, holder text, reviewed_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public, extensions AS $$
  SELECT i.name, r.kind, r.starts_on, r.ends_on, r.hours,
    coalesce(nullif(split_part(btrim(p.display_name),' ',1),''),'Persona') || CASE WHEN split_part(btrim(p.display_name),' ',2)<>'' THEN ' ' || left(split_part(btrim(p.display_name),' ',2),1) || '.' ELSE '' END,
    r.reviewed_at
  FROM public.staff_permission_requests r JOIN public.institutions i ON i.id=r.institution_id LEFT JOIN public.profiles p ON p.id=r.requester_id
  WHERE length(btrim(_hash))=64 AND r.verification_hash=lower(btrim(_hash)) AND r.status='aprobado'
    AND encode(digest(r.verification_payload,'sha256'),'hex')=r.verification_hash
$$;
REVOKE ALL ON FUNCTION public.verify_permission(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.verify_permission(text) TO anon, authenticated, service_role;