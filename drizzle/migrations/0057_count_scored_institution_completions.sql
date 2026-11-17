CREATE OR REPLACE FUNCTION public.score_institution_practice(_id uuid,_version timestamptz,_picks integer[]) RETURNS jsonb LANGUAGE plpgsql VOLATILE SECURITY DEFINER SET search_path=public AS $$ DECLARE p public.institution_publications; n integer; correct integer:=0; q jsonb; BEGIN
IF auth.uid() IS NULL OR NOT EXISTS(SELECT 1 FROM public.my_access() a WHERE a.has_access) THEN RAISE EXCEPTION 'Active access required'; END IF;
SELECT * INTO p FROM public.institution_publications WHERE id=_id AND status='published' AND kind IN ('practica','simulacro'); IF NOT FOUND OR p.updated_at<>_version THEN RAISE EXCEPTION 'Practice changed; restart'; END IF;
n=jsonb_array_length(p.questions); IF n<1 OR cardinality(_picks) IS DISTINCT FROM n OR EXISTS(SELECT 1 FROM unnest(_picks) v WHERE v IS NULL OR v<0 OR v>3) THEN RAISE EXCEPTION 'Invalid responses'; END IF;
FOR idx IN 0..n-1 LOOP q=p.questions->idx; IF _picks[idx+1]=(q->>'answer')::integer THEN correct=correct+1; END IF; END LOOP;
INSERT INTO public.institution_completion_counts(publication_id,completions) VALUES(p.id,1) ON CONFLICT(publication_id) DO UPDATE SET completions=institution_completion_counts.completions+1;
RETURN jsonb_build_object('correct',correct,'total',n,'score',round(100.0*correct/n)); END $$;
REVOKE ALL ON FUNCTION public.count_institution_completion() FROM PUBLIC,anon,authenticated;