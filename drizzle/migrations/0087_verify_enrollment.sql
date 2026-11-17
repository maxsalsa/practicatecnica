CREATE OR REPLACE FUNCTION public.verify_enrollment(_hash text)
RETURNS TABLE(valid boolean, institution_name text, level text, reviewed_at timestamptz, is_mine boolean)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT true, i.name, r.level, r.reviewed_at, (r.guardian_id = auth.uid())
  FROM public.enrollment_requests r JOIN public.institutions i ON i.id = r.institution_id
  WHERE r.status = 'aprobada' AND r.verification_hash = _hash AND _hash ~ '^[a-f0-9]{64}$'
  LIMIT 1
$$;
REVOKE ALL ON FUNCTION public.verify_enrollment(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.verify_enrollment(text) TO anon, authenticated;