CREATE TABLE public.enrollment_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
  guardian_id uuid NOT NULL DEFAULT auth.uid(),
  relation text NOT NULL CHECK (relation IN ('madre','padre','encargado')),
  student_name text NOT NULL CHECK (char_length(btrim(student_name)) BETWEEN 3 AND 120),
  student_id_number text NOT NULL CHECK (student_id_number ~ '^[A-Za-z0-9]{5,20}$'),
  student_email text CHECK (student_email IS NULL OR student_email ~ '^[^\s@]+@gmail\.com$'),
  birth_date date,
  level text NOT NULL CHECK (char_length(level) BETWEEN 1 AND 40),
  id_photo_path text NOT NULL,
  fee_receipt_path text,
  consent_version text NOT NULL,
  consented_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'pendiente' CHECK (status IN ('pendiente','aprobada','rechazada')),
  review_note text,
  reviewed_by uuid,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.enrollment_requests TO authenticated;
GRANT ALL ON public.enrollment_requests TO service_role;
ALTER TABLE public.enrollment_requests ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.can_review_enrollment(_inst uuid) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT coalesce(public.has_role(auth.uid(),'admin'),false)
      OR coalesce(public.institution_role_of(_inst) IN ('direccion','administrativo'),false)
$$;
REVOKE ALL ON FUNCTION public.can_review_enrollment(uuid) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.can_review_enrollment(uuid) TO authenticated;

CREATE POLICY "family reads own enrollment" ON public.enrollment_requests FOR SELECT TO authenticated
  USING (guardian_id = auth.uid() OR public.can_review_enrollment(institution_id));
CREATE POLICY "family creates enrollment" ON public.enrollment_requests FOR INSERT TO authenticated
  WITH CHECK (guardian_id = auth.uid() AND status = 'pendiente' AND reviewed_by IS NULL
    AND split_part(id_photo_path,'/',1) = institution_id::text AND split_part(id_photo_path,'/',2) = auth.uid()::text
    AND (fee_receipt_path IS NULL OR (split_part(fee_receipt_path,'/',1) = institution_id::text AND split_part(fee_receipt_path,'/',2) = auth.uid()::text)));

CREATE OR REPLACE FUNCTION public.enrollment_institutions() RETURNS TABLE(id uuid, name text, kind text, is_test boolean)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT i.id, i.name, i.kind, i.is_test FROM public.institutions i ORDER BY i.is_test, i.name
$$;
REVOKE ALL ON FUNCTION public.enrollment_institutions() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.enrollment_institutions() TO authenticated;

CREATE OR REPLACE FUNCTION public.review_enrollment(_id uuid, _approve boolean, _note text) RETURNS text
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE r public.enrollment_requests; sid uuid; result text := 'aprobada';
BEGIN
  SELECT * INTO r FROM public.enrollment_requests WHERE id = _id FOR UPDATE;
  IF r.id IS NULL OR r.status <> 'pendiente' THEN RAISE EXCEPTION 'not pending'; END IF;
  IF NOT public.can_review_enrollment(r.institution_id) THEN RAISE EXCEPTION 'not allowed'; END IF;
  IF r.guardian_id = auth.uid() THEN RAISE EXCEPTION 'cannot review own request'; END IF;
  IF NOT _approve THEN
    UPDATE public.enrollment_requests SET status='rechazada', review_note=left(_note,500), reviewed_by=auth.uid(), reviewed_at=now() WHERE id=_id;
    RETURN 'rechazada';
  END IF;
  IF r.student_email IS NOT NULL THEN
    SELECT u.id INTO sid FROM auth.users u WHERE lower(u.email) = lower(r.student_email) AND u.email_confirmed_at IS NOT NULL LIMIT 1;
  END IF;
  IF sid IS NOT NULL THEN
    INSERT INTO public.institution_members(institution_id,user_id,member_role,verified_by) VALUES (r.institution_id,sid,'estudiante',auth.uid()) ON CONFLICT DO NOTHING;
    INSERT INTO public.institution_members(institution_id,user_id,member_role,verified_by) VALUES (r.institution_id,r.guardian_id,'encargado',auth.uid()) ON CONFLICT DO NOTHING;
    INSERT INTO public.guardian_links(institution_id,guardian_id,student_id,relation,verified_by,consented_at,consent_version)
      VALUES (r.institution_id,r.guardian_id,sid,r.relation,auth.uid(),r.consented_at,r.consent_version) ON CONFLICT DO NOTHING;
  ELSE
    result := 'aprobada_sin_cuenta';
  END IF;
  UPDATE public.enrollment_requests SET status='aprobada', review_note=left(_note,500), reviewed_by=auth.uid(), reviewed_at=now() WHERE id=_id;
  RETURN result;
END $$;
REVOKE ALL ON FUNCTION public.review_enrollment(uuid, boolean, text) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.review_enrollment(uuid, boolean, text) TO authenticated;

CREATE POLICY "enrollment files upload own" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id='enrollment-files' AND (storage.foldername(name))[2] = auth.uid()::text);
CREATE POLICY "enrollment files read" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id='enrollment-files' AND ((storage.foldername(name))[2] = auth.uid()::text
    OR public.has_role(auth.uid(),'admin')
    OR EXISTS(SELECT 1 FROM public.institution_members m WHERE m.user_id=auth.uid() AND m.member_role IN ('direccion','administrativo') AND m.institution_id::text=(storage.foldername(name))[1])));