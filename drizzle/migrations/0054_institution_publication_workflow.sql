CREATE TABLE public.institution_publications (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), institution_id uuid NOT NULL REFERENCES public.institutions(id), author_id uuid NOT NULL, kind text NOT NULL CHECK(kind IN ('anuncio','circular','horario','practica','simulacro')), title text NOT NULL CHECK(length(title) BETWEEN 3 AND 140), body text NOT NULL DEFAULT '' CHECK(length(body)<=5000), subject text NOT NULL DEFAULT '', level text NOT NULL DEFAULT '', minutes integer NOT NULL DEFAULT 20 CHECK(minutes BETWEEN 1 AND 180), questions jsonb NOT NULL DEFAULT '[]'::jsonb, status text NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','review','published')), created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT,INSERT,UPDATE,DELETE ON public.institution_publications TO authenticated;
GRANT ALL ON public.institution_publications TO service_role;
ALTER TABLE public.institution_publications ENABLE ROW LEVEL SECURITY;
CREATE FUNCTION public.can_edit_institution_publication(_inst uuid) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$ SELECT coalesce(public.has_role(auth.uid(),'admin'),false) OR (coalesce(public.institution_role_of(_inst)::text IN ('direccion','docente','administrativo'),false) AND EXISTS(SELECT 1 FROM public.my_access() a WHERE a.has_access)); $$;
REVOKE ALL ON FUNCTION public.can_edit_institution_publication(uuid) FROM PUBLIC; GRANT EXECUTE ON FUNCTION public.can_edit_institution_publication(uuid) TO authenticated;
CREATE POLICY publication_staff_read ON public.institution_publications FOR SELECT TO authenticated USING (public.can_edit_institution_publication(institution_id));
CREATE POLICY publication_staff_insert ON public.institution_publications FOR INSERT TO authenticated WITH CHECK(public.can_edit_institution_publication(institution_id) AND author_id=auth.uid() AND status IN ('draft','review'));
CREATE POLICY publication_staff_update ON public.institution_publications FOR UPDATE TO authenticated USING(public.can_edit_institution_publication(institution_id) AND (author_id=auth.uid() OR public.institution_role_of(institution_id)='direccion' OR public.has_role(auth.uid(),'admin'))) WITH CHECK(public.can_edit_institution_publication(institution_id));
CREATE POLICY publication_staff_delete ON public.institution_publications FOR DELETE TO authenticated USING(public.can_edit_institution_publication(institution_id) AND (author_id=auth.uid() OR public.institution_role_of(institution_id)='direccion' OR public.has_role(auth.uid(),'admin')));
CREATE FUNCTION public.guard_institution_publication() RETURNS trigger LANGUAGE plpgsql SET search_path=public AS $$ BEGIN
 IF TG_OP='UPDATE' AND (NEW.institution_id<>OLD.institution_id OR NEW.author_id<>OLD.author_id) THEN RAISE EXCEPTION 'Immutable owner'; END IF;
 IF NEW.status='published' AND NOT(coalesce(public.institution_role_of(NEW.institution_id)='direccion',false) OR coalesce(public.has_role(auth.uid(),'admin'),false)) THEN RAISE EXCEPTION 'Director approval required'; END IF;
 IF TG_OP='UPDATE' AND OLD.status='published' AND NEW.status='published' AND NOT(coalesce(public.institution_role_of(NEW.institution_id)='direccion',false) OR coalesce(public.has_role(auth.uid(),'admin'),false)) THEN RAISE EXCEPTION 'Return to review before editing'; END IF;
 IF jsonb_typeof(NEW.questions)<>'array' OR jsonb_array_length(NEW.questions)>60 THEN RAISE EXCEPTION 'Invalid questions'; END IF;
 NEW.updated_at=now(); RETURN NEW; END $$;
CREATE TRIGGER guard_institution_publication BEFORE INSERT OR UPDATE ON public.institution_publications FOR EACH ROW EXECUTE FUNCTION public.guard_institution_publication();
CREATE FUNCTION public.public_institution_catalog() RETURNS TABLE(id uuid,institution_id uuid,institution_name text,logo_path text,kind text,title text,body text,subject text,level text,minutes integer,question_count integer) LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$ SELECT p.id,p.institution_id,i.name,i.logo_path,p.kind,p.title,p.body,p.subject,p.level,p.minutes,jsonb_array_length(p.questions) FROM public.institution_publications p JOIN public.institutions i ON i.id=p.institution_id WHERE p.status='published' ORDER BY p.updated_at DESC LIMIT 200; $$;
REVOKE ALL ON FUNCTION public.public_institution_catalog() FROM PUBLIC; GRANT EXECUTE ON FUNCTION public.public_institution_catalog() TO anon,authenticated;
CREATE FUNCTION public.load_institution_practice(_id uuid) RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public AS $$ DECLARE p public.institution_publications; BEGIN
 IF auth.uid() IS NULL OR NOT EXISTS(SELECT 1 FROM public.my_access() a WHERE a.has_access) THEN RAISE EXCEPTION 'Active access required'; END IF;
 SELECT * INTO p FROM public.institution_publications WHERE id=_id AND status='published' AND kind IN ('practica','simulacro'); IF NOT FOUND THEN RAISE EXCEPTION 'Not available'; END IF;
 RETURN jsonb_build_object('id',p.id,'title',p.title,'minutes',p.minutes,'version',p.updated_at,'questions',(SELECT jsonb_agg(jsonb_build_object('q',q->>'q','options',q->'options') ORDER BY ord) FROM jsonb_array_elements(p.questions) WITH ORDINALITY AS e(q,ord)));
 END $$;
REVOKE ALL ON FUNCTION public.load_institution_practice(uuid) FROM PUBLIC; GRANT EXECUTE ON FUNCTION public.load_institution_practice(uuid) TO authenticated;
CREATE FUNCTION public.score_institution_practice(_id uuid,_version timestamptz,_picks integer[]) RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public AS $$ DECLARE p public.institution_publications; n integer; correct integer:=0; q jsonb; BEGIN
 IF auth.uid() IS NULL OR NOT EXISTS(SELECT 1 FROM public.my_access() a WHERE a.has_access) THEN RAISE EXCEPTION 'Active access required'; END IF;
 SELECT * INTO p FROM public.institution_publications WHERE id=_id AND status='published' AND kind IN ('practica','simulacro'); IF NOT FOUND OR p.updated_at<>_version THEN RAISE EXCEPTION 'Practice changed; restart'; END IF;
 n=jsonb_array_length(p.questions); IF n<1 OR cardinality(_picks)<>n THEN RAISE EXCEPTION 'Invalid responses'; END IF;
 FOR idx IN 0..n-1 LOOP q=p.questions->idx; IF _picks[idx+1]=(q->>'answer')::integer THEN correct=correct+1; END IF; END LOOP;
 RETURN jsonb_build_object('correct',correct,'total',n,'score',round(100.0*correct/n)); END $$;
REVOKE ALL ON FUNCTION public.score_institution_practice(uuid,timestamptz,integer[]) FROM PUBLIC; GRANT EXECUTE ON FUNCTION public.score_institution_practice(uuid,timestamptz,integer[]) TO authenticated;
CREATE INDEX institution_publications_scope ON public.institution_publications(institution_id,status);