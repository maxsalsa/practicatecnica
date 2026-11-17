CREATE TYPE public.institution_role AS ENUM ('direccion','docente','administrativo','estudiante');

CREATE TABLE public.institutions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 3 AND 120),
  logo_path text CHECK (logo_path IS NULL OR logo_path ~ '^[0-9a-f-]{36}/[A-Za-z0-9._-]{1,80}$'),
  is_test boolean NOT NULL DEFAULT false,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.institutions TO authenticated;
GRANT ALL ON public.institutions TO service_role;
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.payments ADD COLUMN institution_id uuid REFERENCES public.institutions(id);
CREATE INDEX payments_institution_idx ON public.payments(institution_id) WHERE institution_id IS NOT NULL;
ALTER TABLE public.payments DROP CONSTRAINT payments_plan_check;
ALTER TABLE public.payments ADD CONSTRAINT payments_plan_check CHECK (plan IN ('estudiante','estudiante_colegio','general','docente','institucion'));
ALTER TABLE public.payments ADD CONSTRAINT payments_institution_scope CHECK ((plan IN ('estudiante_colegio','institucion')) = (institution_id IS NOT NULL));

CREATE TABLE public.institution_members (
  institution_id uuid NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  member_role public.institution_role NOT NULL,
  verified_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (institution_id, user_id)
);
CREATE INDEX institution_members_user_idx ON public.institution_members(user_id);
GRANT SELECT ON public.institution_members TO authenticated;
GRANT ALL ON public.institution_members TO service_role;
ALTER TABLE public.institution_members ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.institution_role_of(_inst uuid) RETURNS public.institution_role
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT m.member_role FROM public.institution_members m
  WHERE m.institution_id=_inst AND m.user_id=auth.uid()
    AND NOT EXISTS(SELECT 1 FROM public.account_status a WHERE a.user_id=auth.uid() AND a.status IN ('blocked','inactive'))
$$;
CREATE OR REPLACE FUNCTION public.is_institution_staff(_inst uuid) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT coalesce(public.institution_role_of(_inst) IN ('direccion','docente','administrativo'), false)
$$;
CREATE OR REPLACE FUNCTION public.institution_paid_until(_inst uuid) RETURNS timestamptz
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT max(p.expires_at) FROM public.payments p WHERE p.plan='institucion' AND p.status='confirmed' AND p.institution_id=_inst
$$;
REVOKE ALL ON FUNCTION public.institution_role_of(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.is_institution_staff(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.institution_paid_until(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.institution_role_of(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_institution_staff(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.institution_paid_until(uuid) TO authenticated, service_role;

CREATE POLICY "members and admin read institutions" ON public.institutions FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.institution_role_of(id) IS NOT NULL);
CREATE POLICY "own membership or admin read" ON public.institution_members FOR SELECT TO authenticated
  USING (user_id=auth.uid() OR public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.admin_create_institution(_name text, _is_test boolean) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE nid uuid;
BEGIN
  IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'Solo administración' USING ERRCODE='42501'; END IF;
  INSERT INTO public.institutions(name,is_test,created_by) VALUES (btrim(_name), coalesce(_is_test,false), auth.uid()) RETURNING id INTO nid;
  RETURN nid;
END $$;

CREATE OR REPLACE FUNCTION public.admin_set_institution_logo(_inst uuid, _path text) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'Solo administración' USING ERRCODE='42501'; END IF;
  IF _path IS NOT NULL AND split_part(_path,'/',1)<>_inst::text THEN RAISE EXCEPTION 'Ruta de logo inválida'; END IF;
  UPDATE public.institutions SET logo_path=_path WHERE id=_inst;
  IF NOT FOUND THEN RAISE EXCEPTION 'Institución no encontrada'; END IF;
END $$;

CREATE OR REPLACE FUNCTION public.admin_set_institution_member(_inst uuid, _email text, _role public.institution_role) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE uid uuid;
BEGIN
  IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'Solo administración' USING ERRCODE='42501'; END IF;
  IF NOT EXISTS(SELECT 1 FROM public.institutions WHERE id=_inst) THEN RAISE EXCEPTION 'Institución no encontrada'; END IF;
  SELECT u.id INTO uid FROM auth.users u WHERE lower(u.email)=lower(btrim(_email)) AND u.email_confirmed_at IS NOT NULL LIMIT 1;
  IF uid IS NULL THEN RAISE EXCEPTION 'No existe una cuenta confirmada con ese correo'; END IF;
  INSERT INTO public.institution_members(institution_id,user_id,member_role,verified_by) VALUES (_inst,uid,_role,auth.uid())
  ON CONFLICT (institution_id,user_id) DO UPDATE SET member_role=EXCLUDED.member_role, verified_by=EXCLUDED.verified_by, created_at=now();
  IF _role IN ('docente','direccion') THEN INSERT INTO public.user_roles(user_id,role) VALUES (uid,'teacher') ON CONFLICT DO NOTHING; END IF;
  RETURN uid;
END $$;

CREATE OR REPLACE FUNCTION public.admin_remove_institution_member(_inst uuid, _user uuid) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'Solo administración' USING ERRCODE='42501'; END IF;
  DELETE FROM public.institution_members WHERE institution_id=_inst AND user_id=_user;
END $$;

CREATE OR REPLACE FUNCTION public.admin_institutions() RETURNS TABLE(id uuid, name text, logo_path text, is_test boolean, paid_until timestamptz, staff bigint, students bigint, created_at timestamptz)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public AS $$
#variable_conflict use_column
BEGIN
  IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'Solo administración' USING ERRCODE='42501'; END IF;
  RETURN QUERY SELECT i.id, i.name, i.logo_path, i.is_test, public.institution_paid_until(i.id),
    (SELECT count(*) FROM public.institution_members m WHERE m.institution_id=i.id AND m.member_role<>'estudiante'),
    (SELECT count(*) FROM public.institution_members m WHERE m.institution_id=i.id AND m.member_role='estudiante'),
    i.created_at
  FROM public.institutions i ORDER BY i.created_at DESC;
END $$;

CREATE OR REPLACE FUNCTION public.admin_institution_members(_inst uuid) RETURNS TABLE(user_id uuid, email text, display_name text, member_role public.institution_role, created_at timestamptz)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public AS $$
#variable_conflict use_column
BEGIN
  IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'Solo administración' USING ERRCODE='42501'; END IF;
  RETURN QUERY SELECT m.user_id, u.email::text, coalesce(p.display_name,''), m.member_role, m.created_at
  FROM public.institution_members m JOIN auth.users u ON u.id=m.user_id LEFT JOIN public.profiles p ON p.id=m.user_id
  WHERE m.institution_id=_inst ORDER BY m.member_role, m.created_at;
END $$;

CREATE OR REPLACE FUNCTION public.my_institutions() RETURNS TABLE(id uuid, name text, logo_path text, is_test boolean, member_role public.institution_role, paid_until timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT i.id, i.name, i.logo_path, i.is_test, m.member_role, public.institution_paid_until(i.id)
  FROM public.institution_members m JOIN public.institutions i ON i.id=m.institution_id
  WHERE m.user_id=auth.uid()
    AND NOT EXISTS(SELECT 1 FROM public.account_status a WHERE a.user_id=auth.uid() AND a.status IN ('blocked','inactive'))
  ORDER BY i.name
$$;

REVOKE ALL ON FUNCTION public.admin_create_institution(text,boolean) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admin_set_institution_logo(uuid,text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admin_set_institution_member(uuid,text,public.institution_role) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admin_remove_institution_member(uuid,uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admin_institutions() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admin_institution_members(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.my_institutions() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_create_institution(text,boolean) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_set_institution_logo(uuid,text) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_set_institution_member(uuid,text,public.institution_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_remove_institution_member(uuid,uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_institutions() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_institution_members(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.my_institutions() TO authenticated, service_role;

CREATE TABLE public.institution_announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
  kind text NOT NULL CHECK (kind IN ('actividad','reunion','ausencia','salida_temprana','acto_civico','general')),
  audience text NOT NULL CHECK (audience IN ('todos','personal','estudiantes')),
  title text NOT NULL CHECK (char_length(btrim(title)) BETWEEN 3 AND 140),
  body text NOT NULL CHECK (char_length(btrim(body)) BETWEEN 3 AND 2000),
  event_at timestamptz,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX institution_announcements_inst_idx ON public.institution_announcements(institution_id, created_at DESC);
GRANT SELECT, INSERT, DELETE ON public.institution_announcements TO authenticated;
GRANT ALL ON public.institution_announcements TO service_role;
ALTER TABLE public.institution_announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "audience reads announcements" ON public.institution_announcements FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.is_institution_staff(institution_id)
    OR (public.institution_role_of(institution_id)='estudiante' AND audience IN ('todos','estudiantes')));
CREATE POLICY "management publishes announcements" ON public.institution_announcements FOR INSERT TO authenticated
  WITH CHECK (created_by=auth.uid() AND (public.has_role(auth.uid(),'admin') OR public.institution_role_of(institution_id) IN ('direccion','administrativo')));
CREATE POLICY "management deletes announcements" ON public.institution_announcements FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR (created_by=auth.uid() AND public.institution_role_of(institution_id) IN ('direccion','administrativo')));

CREATE TABLE public.announcement_reads (
  announcement_id uuid NOT NULL REFERENCES public.institution_announcements(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  read_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (announcement_id, user_id)
);
GRANT SELECT, INSERT ON public.announcement_reads TO authenticated;
GRANT ALL ON public.announcement_reads TO service_role;
ALTER TABLE public.announcement_reads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own reads" ON public.announcement_reads FOR SELECT TO authenticated USING (user_id=auth.uid());
CREATE POLICY "mark visible announcement read" ON public.announcement_reads FOR INSERT TO authenticated
  WITH CHECK (user_id=auth.uid() AND EXISTS(SELECT 1 FROM public.institution_announcements a WHERE a.id=announcement_id));

CREATE OR REPLACE FUNCTION public.announcement_delivery(_inst uuid) RETURNS TABLE(announcement_id uuid, staff_recipients bigint, student_recipients bigint, staff_reads bigint, student_reads bigint)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public AS $$
#variable_conflict use_column
BEGIN
  IF NOT (public.has_role(auth.uid(),'admin') OR public.institution_role_of(_inst) IN ('direccion','administrativo')) THEN RAISE EXCEPTION 'Sin permiso' USING ERRCODE='42501'; END IF;
  RETURN QUERY SELECT a.id,
    (SELECT count(*) FROM public.institution_members m WHERE m.institution_id=a.institution_id AND m.member_role<>'estudiante' AND a.audience IN ('todos','personal')),
    (SELECT count(*) FROM public.institution_members m WHERE m.institution_id=a.institution_id AND m.member_role='estudiante' AND a.audience IN ('todos','estudiantes')),
    (SELECT count(*) FROM public.announcement_reads r JOIN public.institution_members m ON m.user_id=r.user_id AND m.institution_id=a.institution_id WHERE r.announcement_id=a.id AND m.member_role<>'estudiante'),
    (SELECT count(*) FROM public.announcement_reads r JOIN public.institution_members m ON m.user_id=r.user_id AND m.institution_id=a.institution_id WHERE r.announcement_id=a.id AND m.member_role='estudiante')
  FROM public.institution_announcements a WHERE a.institution_id=_inst;
END $$;
REVOKE ALL ON FUNCTION public.announcement_delivery(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.announcement_delivery(uuid) TO authenticated, service_role;

CREATE TABLE public.permission_approvers (
  user_id uuid PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.permission_approvers TO authenticated;
GRANT ALL ON public.permission_approvers TO service_role;
ALTER TABLE public.permission_approvers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own approver row or admin" ON public.permission_approvers FOR SELECT TO authenticated USING (user_id=auth.uid() OR public.has_role(auth.uid(),'admin'));
INSERT INTO public.permission_approvers(user_id) SELECT id FROM auth.users WHERE lower(email)='maxi.salsa@gmail.com' ON CONFLICT DO NOTHING;

CREATE OR REPLACE FUNCTION public.is_permission_approver() RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT auth.uid() IS NOT NULL AND public.has_role(auth.uid(),'admin') AND EXISTS(SELECT 1 FROM public.permission_approvers WHERE user_id=auth.uid())
$$;
REVOKE ALL ON FUNCTION public.is_permission_approver() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_permission_approver() TO authenticated, service_role;

CREATE TABLE public.staff_permission_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
  requester_id uuid NOT NULL,
  kind text NOT NULL CHECK (kind IN ('cita_medica','incapacidad','asunto_personal','capacitacion','otro')),
  starts_on date NOT NULL,
  ends_on date NOT NULL,
  hours text CHECK (hours IS NULL OR char_length(hours)<=60),
  reason text NOT NULL CHECK (char_length(btrim(reason)) BETWEEN 5 AND 1000),
  attachment_path text CHECK (attachment_path IS NULL OR attachment_path ~ '^[0-9a-f-]{36}/[A-Za-z0-9._-]{1,100}$'),
  status text NOT NULL DEFAULT 'pendiente' CHECK (status IN ('pendiente','aprobado','rechazado','cancelado')),
  reviewer_id uuid,
  review_note text CHECK (review_note IS NULL OR char_length(review_note)<=500),
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (ends_on >= starts_on),
  CHECK (attachment_path IS NULL OR split_part(attachment_path,'/',1)=requester_id::text)
);
CREATE INDEX staff_permission_requests_requester_idx ON public.staff_permission_requests(requester_id, created_at DESC);
GRANT SELECT, INSERT ON public.staff_permission_requests TO authenticated;
GRANT ALL ON public.staff_permission_requests TO service_role;
ALTER TABLE public.staff_permission_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "requester or approver reads" ON public.staff_permission_requests FOR SELECT TO authenticated
  USING (requester_id=auth.uid() OR public.is_permission_approver());
CREATE POLICY "staff creates own pending request" ON public.staff_permission_requests FOR INSERT TO authenticated
  WITH CHECK (requester_id=auth.uid() AND status='pendiente' AND reviewer_id IS NULL AND reviewed_at IS NULL AND review_note IS NULL AND public.is_institution_staff(institution_id));

CREATE OR REPLACE FUNCTION public.validate_permission_request() RETURNS trigger
LANGUAGE plpgsql SET search_path=public AS $$
BEGIN
  IF NEW.starts_on < (now() AT TIME ZONE 'America/Costa_Rica')::date - 30 THEN RAISE EXCEPTION 'La fecha de inicio no puede tener más de 30 días de antigüedad'; END IF;
  IF NEW.ends_on > NEW.starts_on + 90 THEN RAISE EXCEPTION 'Un permiso no puede exceder 90 días'; END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER validate_permission_request BEFORE INSERT ON public.staff_permission_requests FOR EACH ROW EXECUTE FUNCTION public.validate_permission_request();

CREATE TABLE public.permission_request_history (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  request_id uuid NOT NULL REFERENCES public.staff_permission_requests(id) ON DELETE CASCADE,
  from_status text,
  to_status text NOT NULL,
  changed_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.permission_request_history TO authenticated;
GRANT ALL ON public.permission_request_history TO service_role;
ALTER TABLE public.permission_request_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "requester or approver reads history" ON public.permission_request_history FOR SELECT TO authenticated
  USING (public.is_permission_approver() OR EXISTS(SELECT 1 FROM public.staff_permission_requests r WHERE r.id=request_id AND r.requester_id=auth.uid()));

CREATE OR REPLACE FUNCTION public.audit_permission_request() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
  IF TG_OP='INSERT' THEN
    INSERT INTO public.permission_request_history(request_id,from_status,to_status,changed_by) VALUES (NEW.id,NULL,NEW.status,auth.uid());
  ELSIF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.permission_request_history(request_id,from_status,to_status,changed_by) VALUES (NEW.id,OLD.status,NEW.status,auth.uid());
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER audit_permission_request AFTER INSERT OR UPDATE OF status ON public.staff_permission_requests FOR EACH ROW EXECUTE FUNCTION public.audit_permission_request();

CREATE OR REPLACE FUNCTION public.review_permission_request(_id uuid, _decision text, _note text) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE r public.staff_permission_requests;
BEGIN
  IF NOT public.is_permission_approver() THEN RAISE EXCEPTION 'Solo la persona aprobadora autorizada puede resolver permisos' USING ERRCODE='42501'; END IF;
  IF _decision NOT IN ('aprobado','rechazado') THEN RAISE EXCEPTION 'Decisión inválida'; END IF;
  SELECT * INTO r FROM public.staff_permission_requests WHERE id=_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Solicitud no encontrada'; END IF;
  IF r.requester_id=auth.uid() THEN RAISE EXCEPTION 'No puede resolver su propia solicitud'; END IF;
  IF r.status<>'pendiente' THEN RAISE EXCEPTION 'La solicitud ya fue resuelta'; END IF;
  UPDATE public.staff_permission_requests SET status=_decision, reviewer_id=auth.uid(), review_note=nullif(btrim(coalesce(_note,'')),''), reviewed_at=now() WHERE id=_id;
END $$;

CREATE OR REPLACE FUNCTION public.cancel_permission_request(_id uuid) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
  UPDATE public.staff_permission_requests SET status='cancelado' WHERE id=_id AND requester_id=auth.uid() AND status='pendiente';
  IF NOT FOUND THEN RAISE EXCEPTION 'Solo puede cancelar sus solicitudes pendientes'; END IF;
END $$;

CREATE OR REPLACE FUNCTION public.permission_requests_for_review() RETURNS TABLE(id uuid, institution_name text, requester_email text, requester_name text, kind text, starts_on date, ends_on date, hours text, reason text, attachment_path text, status text, review_note text, reviewed_at timestamptz, created_at timestamptz)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public AS $$
#variable_conflict use_column
BEGIN
  IF NOT public.is_permission_approver() THEN RAISE EXCEPTION 'Sin permiso' USING ERRCODE='42501'; END IF;
  RETURN QUERY SELECT r.id, i.name, u.email::text, coalesce(p.display_name,''), r.kind, r.starts_on, r.ends_on, r.hours, r.reason, r.attachment_path, r.status, r.review_note, r.reviewed_at, r.created_at
  FROM public.staff_permission_requests r JOIN public.institutions i ON i.id=r.institution_id JOIN auth.users u ON u.id=r.requester_id LEFT JOIN public.profiles p ON p.id=r.requester_id
  ORDER BY (r.status='pendiente') DESC, r.created_at DESC;
END $$;
REVOKE ALL ON FUNCTION public.review_permission_request(uuid,text,text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.cancel_permission_request(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.permission_requests_for_review() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.review_permission_request(uuid,text,text) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.cancel_permission_request(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.permission_requests_for_review() TO authenticated, service_role;

CREATE POLICY "permission attachments owner upload" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id='permission-attachments' AND (storage.foldername(name))[1]=auth.uid()::text);
CREATE POLICY "permission attachments owner or approver read" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id='permission-attachments' AND ((storage.foldername(name))[1]=auth.uid()::text OR public.is_permission_approver()));
CREATE POLICY "institution logos admin insert" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id='institution-logos' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "institution logos admin update" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id='institution-logos' AND public.has_role(auth.uid(),'admin'))
  WITH CHECK (bucket_id='institution-logos' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "institution logos admin delete" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id='institution-logos' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "institution logos members read" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id='institution-logos' AND (public.has_role(auth.uid(),'admin') OR EXISTS(SELECT 1 FROM public.institution_members m WHERE m.user_id=auth.uid() AND m.institution_id::text=(storage.foldername(name))[1])));

CREATE OR REPLACE FUNCTION public.student_discount_eligible(_inst uuid) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT coalesce(public.institution_role_of(_inst)='estudiante', false) AND coalesce(public.institution_paid_until(_inst)>now(), false)
$$;
REVOKE ALL ON FUNCTION public.student_discount_eligible(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.student_discount_eligible(uuid) TO authenticated, service_role;

ALTER POLICY "own payments insert" ON public.payments WITH CHECK (
  auth.uid()=user_id AND status='active' AND method='sinpe' AND reviewed_at IS NULL AND paypal_quote_id IS NULL AND expires_at<=now()+interval '1 year' AND (
    (plan='estudiante' AND amount=2500 AND institution_id IS NULL)
    OR (plan IN ('general','docente') AND amount=3500 AND institution_id IS NULL)
    OR (plan='estudiante_colegio' AND amount=1000 AND public.student_discount_eligible(institution_id))
    OR (plan='institucion' AND amount=10000 AND public.institution_role_of(institution_id)='direccion')
  ));

CREATE OR REPLACE FUNCTION public.paid_through(_user uuid) RETURNS timestamptz
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT greatest(now(), coalesce((SELECT max(expires_at) FROM public.payments WHERE user_id=_user AND status='confirmed' AND plan<>'institucion'), now()));
$$;

CREATE OR REPLACE FUNCTION public.payment_period_end(_user uuid, _plan text, _inst uuid) RETURNS timestamptz
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT CASE WHEN _plan='institucion' THEN greatest(now(), coalesce(public.institution_paid_until(_inst), now())) ELSE public.paid_through(_user) END + interval '1 year'
$$;
REVOKE ALL ON FUNCTION public.payment_period_end(uuid,text,uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.payment_period_end(uuid,text,uuid) TO service_role;

CREATE OR REPLACE FUNCTION public.initialize_confirmed_payment_period() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
  IF NEW.status='confirmed' THEN NEW.expires_at:=public.payment_period_end(NEW.user_id,NEW.plan,NEW.institution_id); NEW.reviewed_at:=coalesce(NEW.reviewed_at,now()); END IF;
  RETURN NEW;
END $$;

CREATE OR REPLACE FUNCTION public.start_confirmed_payment_period() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
  IF NEW.status='confirmed' AND OLD.status IS DISTINCT FROM 'confirmed' THEN NEW.expires_at:=public.payment_period_end(NEW.user_id,NEW.plan,NEW.institution_id); NEW.reviewed_at:=now(); END IF;
  RETURN NEW;
END $$;

CREATE OR REPLACE FUNCTION public.my_access() RETURNS TABLE(trial_ends timestamptz, paid_until timestamptz, status text, has_access boolean)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public AS $$
DECLARE me uuid:=auth.uid(); te timestamptz; pu timestamptz; su timestamptz; cu timestamptz; iu timestamptz; st text; adm boolean;
BEGIN
  IF me IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;
  SELECT u.created_at+interval '13 days' INTO te FROM auth.users u WHERE u.id=me;
  SELECT max(p.expires_at) INTO pu FROM public.payments p WHERE p.user_id=me AND p.status='confirmed' AND p.plan<>'institucion';
  SELECT max(s.current_period_end) INTO su FROM public.subscriptions s WHERE s.user_id=me AND s.environment='live' AND s.status IN ('active','trialing','past_due','canceled') AND s.current_period_end>now();
  IF su IS NOT NULL AND (pu IS NULL OR su>pu) THEN pu:=su; END IF;
  SELECT max(r.expires_at) INTO cu FROM public.access_code_redemptions r JOIN public.access_codes c ON c.code=r.code WHERE r.user_id=me AND c.active;
  IF cu IS NOT NULL AND (pu IS NULL OR cu>pu) THEN pu:=cu; END IF;
  SELECT max(public.institution_paid_until(m.institution_id)) INTO iu FROM public.institution_members m WHERE m.user_id=me AND m.member_role<>'estudiante';
  IF iu IS NOT NULL AND iu>now() AND (pu IS NULL OR iu>pu) THEN pu:=iu; END IF;
  st:=coalesce((SELECT a.status FROM public.account_status a WHERE a.user_id=me),'active');
  adm:=public.has_role(me,'admin');
  RETURN QUERY SELECT te,pu,st,st NOT IN ('blocked','inactive') AND (adm OR st='gift' OR now()<te OR (pu IS NOT NULL AND now()<pu));
END $$;

CREATE OR REPLACE FUNCTION public.can_use_teacher_tools() RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
SELECT auth.uid() IS NOT NULL AND NOT EXISTS(SELECT 1 FROM public.account_status WHERE user_id=auth.uid() AND status IN ('blocked','inactive')) AND (public.has_role(auth.uid(),'admin') OR (public.has_role(auth.uid(),'teacher') AND (
  EXISTS(SELECT 1 FROM auth.users WHERE id=auth.uid() AND now()<created_at+interval '13 days')
  OR EXISTS(SELECT 1 FROM public.payments WHERE user_id=auth.uid() AND plan='docente' AND status='confirmed' AND expires_at>now())
  OR EXISTS(SELECT 1 FROM public.institution_members m WHERE m.user_id=auth.uid() AND m.member_role IN ('docente','direccion') AND public.institution_paid_until(m.institution_id)>now())
)));
$$;

CREATE TABLE public.assistant_usage (
  user_id uuid NOT NULL,
  day date NOT NULL,
  questions integer NOT NULL DEFAULT 0 CHECK (questions >= 0),
  PRIMARY KEY (user_id, day)
);
GRANT SELECT ON public.assistant_usage TO authenticated;
GRANT ALL ON public.assistant_usage TO service_role;
ALTER TABLE public.assistant_usage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own assistant usage" ON public.assistant_usage FOR SELECT TO authenticated USING (user_id=auth.uid());

CREATE OR REPLACE FUNCTION public.consume_assistant_question() RETURNS integer
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE me uuid:=auth.uid(); d date:=(now() AT TIME ZONE 'America/Costa_Rica')::date; used integer; total bigint;
BEGIN
  IF me IS NULL THEN RAISE EXCEPTION 'auth required' USING ERRCODE='42501'; END IF;
  IF EXISTS(SELECT 1 FROM public.account_status WHERE user_id=me AND status IN ('blocked','inactive')) THEN RAISE EXCEPTION 'cuenta_inactiva'; END IF;
  PERFORM pg_advisory_xact_lock(hashtext('assistant_usage:'||d::text));
  SELECT coalesce(sum(questions),0) INTO total FROM public.assistant_usage WHERE day=d;
  IF total >= 100 THEN RAISE EXCEPTION 'limite_global'; END IF;
  INSERT INTO public.assistant_usage(user_id,day,questions) VALUES (me,d,1)
  ON CONFLICT (user_id,day) DO UPDATE SET questions=public.assistant_usage.questions+1 WHERE public.assistant_usage.questions < 5
  RETURNING questions INTO used;
  IF used IS NULL THEN RAISE EXCEPTION 'limite_personal'; END IF;
  RETURN 5-used;
END $$;
REVOKE ALL ON FUNCTION public.consume_assistant_question() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.consume_assistant_question() TO authenticated, service_role;