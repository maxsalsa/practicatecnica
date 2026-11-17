CREATE TABLE public.institution_practice_results (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), institution_id uuid NOT NULL REFERENCES public.institutions(id), publication_id uuid NOT NULL REFERENCES public.institution_publications(id), user_id uuid NOT NULL, publication_version timestamptz NOT NULL, subject text NOT NULL, title text NOT NULL, correct integer NOT NULL CHECK(correct>=0), question_count integer NOT NULL CHECK(question_count>0 AND correct<=question_count), score integer NOT NULL CHECK(score BETWEEN 0 AND 100), created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.institution_practice_results TO authenticated;
GRANT ALL ON public.institution_practice_results TO service_role;
ALTER TABLE public.institution_practice_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owner or authorized institution follow-up" ON public.institution_practice_results FOR SELECT TO authenticated USING(user_id=auth.uid() OR public.can_follow_student(institution_id,user_id));
CREATE INDEX institution_practice_results_student ON public.institution_practice_results(institution_id,user_id,created_at);
CREATE OR REPLACE FUNCTION public.score_institution_practice(_id uuid, _version timestamptz, _picks integer[]) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE p public.institution_publications; n integer; correct integer:=0; q jsonb; result_id uuid;
BEGIN
IF auth.uid() IS NULL OR NOT EXISTS(SELECT 1 FROM public.my_access() a WHERE a.has_access) THEN RAISE EXCEPTION 'Active access required'; END IF;
SELECT * INTO p FROM public.institution_publications WHERE id=_id AND status='published' AND kind IN ('practica','simulacro') FOR SHARE;
IF NOT FOUND OR NOT public.institution_topic_visible(p.institution_id,p.subject,p.id::text) THEN RAISE EXCEPTION 'Not available' USING ERRCODE='42501'; END IF;
IF p.updated_at<>_version THEN RAISE EXCEPTION 'Practice changed; restart'; END IF;
n=jsonb_array_length(p.questions); IF n<1 OR cardinality(_picks) IS DISTINCT FROM n OR EXISTS(SELECT 1 FROM unnest(_picks) v WHERE v IS NULL OR v<0 OR v>3) THEN RAISE EXCEPTION 'Invalid responses'; END IF;
FOR idx IN 0..n-1 LOOP q=p.questions->idx; IF _picks[idx+1]=(q->>'answer')::integer THEN correct=correct+1; END IF; END LOOP;
INSERT INTO public.institution_practice_results(institution_id,publication_id,user_id,publication_version,subject,title,correct,question_count,score) VALUES(p.institution_id,p.id,auth.uid(),p.updated_at,p.subject,p.title,correct,n,round(100.0*correct/n)) RETURNING id INTO result_id;
INSERT INTO public.institution_completion_counts(publication_id,completions) VALUES(p.id,1) ON CONFLICT(publication_id) DO UPDATE SET completions=institution_completion_counts.completions+1;
RETURN jsonb_build_object('correct',correct,'total',n,'score',round(100.0*correct/n),'result_id',result_id);
END $$;
REVOKE ALL ON FUNCTION public.score_institution_practice(uuid,timestamptz,integer[]) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.score_institution_practice(uuid,timestamptz,integer[]) TO authenticated;
COMMENT ON TABLE public.institution_practice_results IS 'Server-scored individual institutional results, separate from platform academic attempts, XP, streaks and certificates. No reconstruction from anonymous counters.';