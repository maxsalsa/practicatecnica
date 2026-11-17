CREATE OR REPLACE FUNCTION public.can_edit_institution_publication(_inst uuid) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$ SELECT coalesce(public.has_role(auth.uid(),'admin'),false) OR (coalesce(public.institution_role_of(_inst)::text IN ('direccion','subdireccion','docente','administrativo'),false) AND EXISTS(SELECT 1 FROM public.my_access() a WHERE a.has_access)); $$;
CREATE OR REPLACE FUNCTION public.manages_institution_resource(_inst uuid) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$ SELECT coalesce(public.has_role(auth.uid(),'admin'),false) OR (coalesce(public.institution_role_of(_inst)::text IN ('direccion','subdireccion'),false) AND public.can_edit_institution_publication(_inst)); $$;
CREATE OR REPLACE FUNCTION public.guard_institution_resource() RETURNS trigger LANGUAGE plpgsql SET search_path=public AS $$ BEGIN
IF TG_OP='UPDATE' AND (NEW.institution_id<>OLD.institution_id OR NEW.author_id<>OLD.author_id) THEN RAISE EXCEPTION 'Immutable owner'; END IF;
IF NEW.kind='pdf' AND (NEW.file_path IS NULL OR NEW.file_path !~ ('^'||NEW.institution_id::text||'/[0-9a-f-]{36}\.pdf$')) THEN RAISE EXCEPTION 'Invalid PDF path'; END IF;
IF NEW.status='published' THEN
IF NOT(coalesce(public.institution_role_of(NEW.institution_id)::text IN ('direccion','subdireccion'),false) OR coalesce(public.has_role(auth.uid(),'admin'),false)) THEN RAISE EXCEPTION 'Director approval required'; END IF;
IF NEW.content->>'rights' IS DISTINCT FROM 'true' THEN RAISE EXCEPTION 'Publication rights and privacy review required'; END IF;
IF NEW.kind='campaign' AND NEW.content->>'observance'='true' AND (coalesce(NEW.content->>'source','') !~ '^https://[^ ]+' OR NEW.content->>'sourceConfirmed' IS DISTINCT FROM 'true') THEN RAISE EXCEPTION 'Source review required'; END IF;
END IF; NEW.updated_at=now(); RETURN NEW; END $$;
CREATE POLICY subdirection_resource_update ON public.institution_resources FOR UPDATE TO authenticated USING (public.manages_institution_resource(institution_id) AND public.institution_role_of(institution_id)='subdireccion') WITH CHECK (public.manages_institution_resource(institution_id) AND public.institution_role_of(institution_id)='subdireccion');
CREATE OR REPLACE FUNCTION public.guard_institution_publication() RETURNS trigger LANGUAGE plpgsql SET search_path=public AS $$ DECLARE q jsonb; BEGIN
IF TG_OP='UPDATE' AND (NEW.institution_id<>OLD.institution_id OR NEW.author_id<>OLD.author_id) THEN RAISE EXCEPTION 'Immutable owner'; END IF;
IF NEW.status='published' AND NOT(coalesce(public.institution_role_of(NEW.institution_id)::text IN ('direccion','subdireccion'),false) OR coalesce(public.has_role(auth.uid(),'admin'),false)) THEN RAISE EXCEPTION 'Director approval required'; END IF;
IF jsonb_typeof(NEW.questions)<>'array' OR jsonb_array_length(NEW.questions)>60 THEN RAISE EXCEPTION 'Invalid questions'; END IF;
IF NEW.kind IN ('practica','simulacro') AND jsonb_array_length(NEW.questions)=0 THEN RAISE EXCEPTION 'Questions required'; END IF;
FOR q IN SELECT value FROM jsonb_array_elements(NEW.questions) LOOP
IF jsonb_typeof(q)<>'object' OR coalesce(length(q->>'q'),0)<3 OR length(q->>'q')>1000 OR jsonb_typeof(q->'options') IS DISTINCT FROM 'array' THEN RAISE EXCEPTION 'Invalid question'; END IF;
IF jsonb_array_length(q->'options')<>4 OR (q->>'answer') IS NULL OR (q->>'answer') !~ '^[0-3]$' THEN RAISE EXCEPTION 'Invalid answer'; END IF;
IF EXISTS(SELECT 1 FROM jsonb_array_elements(q->'options') o WHERE jsonb_typeof(o)<>'string' OR length(trim(o#>>'{}')) NOT BETWEEN 1 AND 500) THEN RAISE EXCEPTION 'Invalid option'; END IF;
END LOOP; NEW.updated_at=now(); RETURN NEW; END $$;
CREATE POLICY subdirection_publication_update ON public.institution_publications FOR UPDATE TO authenticated USING (public.manages_institution_resource(institution_id) AND public.institution_role_of(institution_id)='subdireccion') WITH CHECK (public.can_edit_institution_publication(institution_id) AND public.institution_role_of(institution_id)='subdireccion');
CREATE POLICY subdirection_schedule_read ON public.institution_schedules FOR SELECT TO authenticated USING (public.institution_role_of(institution_id)='subdireccion');
CREATE POLICY subdirection_schedule_insert ON public.institution_schedules FOR INSERT TO authenticated WITH CHECK (created_by=auth.uid() AND public.institution_role_of(institution_id)='subdireccion');
CREATE POLICY subdirection_schedule_update ON public.institution_schedules FOR UPDATE TO authenticated USING (public.institution_role_of(institution_id)='subdireccion') WITH CHECK (public.institution_role_of(institution_id)='subdireccion');
CREATE POLICY subdirection_schedule_delete ON public.institution_schedules FOR DELETE TO authenticated USING (public.institution_role_of(institution_id)='subdireccion');