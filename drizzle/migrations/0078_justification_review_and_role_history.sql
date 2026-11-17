ALTER TABLE public.staff_permission_requests
  ADD COLUMN IF NOT EXISTS justification_status text,
  ADD COLUMN IF NOT EXISTS justification_reviewer_id uuid,
  ADD COLUMN IF NOT EXISTS justification_reviewed_at timestamptz,
  ADD COLUMN IF NOT EXISTS justification_note text;

CREATE OR REPLACE FUNCTION public.review_permission_justification(_id uuid, _decision text, _note text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE r public.staff_permission_requests;
BEGIN
  IF _decision NOT IN ('aceptada','rechazada') THEN RAISE EXCEPTION 'Decisión inválida'; END IF;
  SELECT * INTO r FROM public.staff_permission_requests WHERE id=_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Solicitud no encontrada'; END IF;
  IF NOT public.can_review_permissions(r.institution_id) THEN RAISE EXCEPTION 'Solo Max o la dirección pueden revisar comprobantes' USING ERRCODE='42501'; END IF;
  IF r.requester_id=auth.uid() THEN RAISE EXCEPTION 'No puede revisar su propio comprobante'; END IF;
  IF r.justification_path IS NULL AND r.attachment_path IS NULL THEN RAISE EXCEPTION 'No hay comprobante'; END IF;
  UPDATE public.staff_permission_requests SET justification_status=_decision, justification_reviewer_id=auth.uid(),
    justification_reviewed_at=now(), justification_note=nullif(btrim(coalesce(_note,'')),'') WHERE id=_id;
END $$;
REVOKE ALL ON FUNCTION public.review_permission_justification(uuid,text,text) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.review_permission_justification(uuid,text,text) TO authenticated;

CREATE OR REPLACE FUNCTION public.institution_role_history(_inst uuid)
RETURNS TABLE(created_at timestamptz, person_email text, actor_email text, previous_role text, new_role text)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  IF NOT public.can_review_permissions(_inst) THEN RAISE EXCEPTION 'Sin permiso' USING ERRCODE='42501'; END IF;
  RETURN QUERY SELECT e.created_at, u.email::text, a.email::text, e.previous_role::text, e.new_role::text
    FROM public.institution_role_events e
    LEFT JOIN auth.users u ON u.id=e.user_id LEFT JOIN auth.users a ON a.id=e.actor_id
    WHERE e.institution_id=_inst ORDER BY e.created_at DESC LIMIT 200;
END $$;
REVOKE ALL ON FUNCTION public.institution_role_history(uuid) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.institution_role_history(uuid) TO authenticated;