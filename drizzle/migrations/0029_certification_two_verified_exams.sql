ALTER TABLE public.practice_attempts ADD COLUMN assessment_mode text NOT NULL DEFAULT 'practice', ADD COLUMN certification_subject text;
CREATE TABLE public.exam_sessions (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL, deck_id text NOT NULL, subject text NOT NULL, question_count integer NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), consumed_at timestamptz);
GRANT SELECT ON public.exam_sessions TO authenticated;
GRANT ALL ON public.exam_sessions TO service_role;
ALTER TABLE public.exam_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owner reads issued exam sessions" ON public.exam_sessions FOR SELECT TO authenticated USING (user_id=auth.uid());
ALTER TABLE public.certificates ADD COLUMN evidence_ids uuid[], ADD COLUMN canonical_payload text, ADD COLUMN revoked_at timestamptz;
CREATE OR REPLACE FUNCTION public.issue_certificate(_attempt uuid) RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public','extensions' AS $$
DECLARE a record; n text; h text; ids uuid[]; stamp timestamptz; payload text;
BEGIN
 IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Ingrese para emitir'; END IF;
 SELECT hash INTO h FROM certificates WHERE attempt_id=_attempt AND user_id=auth.uid();
 IF h IS NOT NULL THEN RETURN h; END IF;
 SELECT * INTO a FROM practice_attempts WHERE id=_attempt AND user_id=auth.uid() AND verified_scoring AND assessment_mode='exam' AND certification_subject IS NOT NULL AND score>80;
 IF NOT FOUND THEN RAISE EXCEPTION 'Requiere simulacro verificado con nota superior a 80'; END IF;
 SELECT array_agg(id ORDER BY created_at DESC) INTO ids FROM (SELECT id,created_at FROM practice_attempts WHERE user_id=auth.uid() AND verified_scoring AND assessment_mode='exam' AND certification_subject=a.certification_subject AND score>80 ORDER BY created_at DESC LIMIT 2) t;
 IF coalesce(array_length(ids,1),0)<2 THEN RAISE EXCEPTION 'Requiere al menos dos simulacros de la misma materia con nota superior a 80'; END IF;
 SELECT coalesce(nullif(display_name,''),'Estudiante') INTO n FROM profiles WHERE id=auth.uid();
 stamp:=now(); payload:=jsonb_build_object('version',2,'holder',n,'title',a.title,'subject',a.certification_subject,'score',a.score,'issued_at',stamp,'evidence',ids,'nonce',gen_random_uuid())::text;
 h:=encode(digest(payload,'sha256'),'hex');
 INSERT INTO certificates(hash,user_id,attempt_id,holder,title,score,issued_at,evidence_ids,canonical_payload) VALUES(h,auth.uid(),a.id,n,a.title,a.score,stamp,ids,payload);
 RETURN h;
END $$;
CREATE OR REPLACE FUNCTION public.verify_certificate(_hash text) RETURNS TABLE(holder text,title text,score integer,issued_at timestamptz) LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public','extensions' AS $$
 SELECT c.holder,c.title,c.score,c.issued_at FROM certificates c WHERE c.hash=lower(trim(_hash)) AND length(trim(_hash))=64 AND c.revoked_at IS NULL AND (c.canonical_payload IS NULL OR encode(digest(c.canonical_payload,'sha256'),'hex')=c.hash)
$$;
REVOKE ALL ON FUNCTION public.issue_certificate(uuid) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.issue_certificate(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.verify_certificate(text) TO anon,authenticated;
COMMENT ON COLUMN public.practice_attempts.assessment_mode IS 'Legacy and guided attempts remain practice; exam requires a server-issued consumed full-bank session.';