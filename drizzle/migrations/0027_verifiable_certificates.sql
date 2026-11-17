CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;
CREATE TABLE public.certificates (
  hash text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  attempt_id uuid NOT NULL UNIQUE REFERENCES public.practice_attempts(id) ON DELETE CASCADE,
  holder text NOT NULL, title text NOT NULL, score integer NOT NULL,
  issued_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.certificates TO authenticated;
GRANT ALL ON public.certificates TO service_role;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own certificates" ON public.certificates FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.issue_certificate(_attempt uuid) RETURNS text
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
DECLARE a record; n text; h text;
BEGIN
  SELECT hash INTO h FROM certificates WHERE attempt_id=_attempt AND user_id=auth.uid();
  IF h IS NOT NULL THEN RETURN h; END IF;
  SELECT * INTO a FROM practice_attempts WHERE id=_attempt AND user_id=auth.uid() AND verified_scoring AND score>=70;
  IF NOT FOUND THEN RAISE EXCEPTION 'Intento no elegible (requiere calificación verificada ≥70%%)'; END IF;
  SELECT coalesce(nullif(display_name,''),'Estudiante') INTO n FROM profiles WHERE id=auth.uid();
  h := encode(digest(a.id::text||'|'||a.user_id::text||'|'||a.deck_id||'|'||a.score||'|'||a.created_at::text||'|'||gen_random_uuid()::text,'sha256'),'hex');
  INSERT INTO certificates(hash,user_id,attempt_id,holder,title,score) VALUES (h,auth.uid(),a.id,n,a.title,a.score);
  RETURN h;
END $$;
REVOKE ALL ON FUNCTION public.issue_certificate(uuid) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.issue_certificate(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.verify_certificate(_hash text)
RETURNS TABLE(holder text, title text, score integer, issued_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT holder,title,score,issued_at FROM certificates WHERE hash=lower(trim(_hash)) AND length(trim(_hash))=64
$$;
GRANT EXECUTE ON FUNCTION public.verify_certificate(text) TO anon, authenticated;