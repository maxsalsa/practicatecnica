CREATE TABLE public.student_pickup_authorizations (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), request_id uuid NOT NULL REFERENCES public.enrollment_requests(id),
 name text NOT NULL CHECK(char_length(name) BETWEEN 3 AND 120), identification text NOT NULL CHECK(identification ~ '^[A-Za-z0-9]{5,20}$'), relation text NOT NULL CHECK(char_length(relation) BETWEEN 2 AND 80),
 status text NOT NULL DEFAULT 'pendiente' CHECK(status IN ('pendiente','autorizada','rechazada','revocada')), reviewed_by uuid, reviewed_at timestamptz, note text NOT NULL DEFAULT '', created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.student_pickup_authorizations TO authenticated;
GRANT ALL ON public.student_pickup_authorizations TO service_role;
ALTER TABLE public.student_pickup_authorizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pickup family and reviewer reads" ON public.student_pickup_authorizations FOR SELECT TO authenticated USING(EXISTS(SELECT 1 FROM public.enrollment_requests r WHERE r.id=request_id AND (r.guardian_id=auth.uid() OR public.can_review_enrollment(r.institution_id))));
CREATE TABLE public.student_pickup_events(id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, authorization_id uuid NOT NULL REFERENCES public.student_pickup_authorizations(id), status text NOT NULL, actor_id uuid NOT NULL, note text NOT NULL DEFAULT '', created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.student_pickup_events TO authenticated;
GRANT ALL ON public.student_pickup_events TO service_role;
ALTER TABLE public.student_pickup_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pickup event authorized reads" ON public.student_pickup_events FOR SELECT TO authenticated USING(EXISTS(SELECT 1 FROM public.student_pickup_authorizations a WHERE a.id=authorization_id));
CREATE OR REPLACE FUNCTION public.initialize_pickup_proposals() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE p jsonb;
BEGIN
 FOR p IN SELECT value FROM jsonb_array_elements(coalesce(NEW.family_contact->'pickup','[]'::jsonb)) LOOP
 INSERT INTO public.student_pickup_authorizations(request_id,name,identification,relation) VALUES(NEW.id,p->>'name',p->>'identification',p->>'relation');
 END LOOP;
 RETURN NEW;
END $$;
CREATE TRIGGER initialize_pickup_proposals AFTER INSERT ON public.enrollment_requests FOR EACH ROW EXECUTE FUNCTION public.initialize_pickup_proposals();
CREATE OR REPLACE FUNCTION public.audit_pickup_authorization() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
 IF TG_OP='INSERT' OR NEW.status IS DISTINCT FROM OLD.status THEN
 INSERT INTO public.student_pickup_events(authorization_id,status,actor_id,note) VALUES(NEW.id,NEW.status,coalesce(NEW.reviewed_by,(SELECT guardian_id FROM public.enrollment_requests WHERE id=NEW.request_id)),NEW.note);
 END IF; RETURN NEW;
END $$;
CREATE TRIGGER audit_pickup_authorization AFTER INSERT OR UPDATE ON public.student_pickup_authorizations FOR EACH ROW EXECUTE FUNCTION public.audit_pickup_authorization();
CREATE OR REPLACE FUNCTION public.review_pickup_authorization(_id uuid,_status text,_note text) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE a public.student_pickup_authorizations; r public.enrollment_requests;
BEGIN
 SELECT * INTO a FROM public.student_pickup_authorizations WHERE id=_id FOR UPDATE;
 SELECT * INTO r FROM public.enrollment_requests WHERE id=a.request_id;
 IF a.id IS NULL OR NOT coalesce(public.can_review_enrollment(r.institution_id),false) OR r.guardian_id=auth.uid() THEN RAISE EXCEPTION 'not authorized'; END IF;
 IF _status NOT IN ('autorizada','rechazada','revocada') OR (a.status='revocada') OR (a.status <> 'pendiente' AND _status <> 'revocada') THEN RAISE EXCEPTION 'invalid transition'; END IF;
 IF _status='autorizada' AND r.status <> 'aprobada' THEN RAISE EXCEPTION 'enrollment approval required'; END IF;
 IF char_length(btrim(coalesce(_note,''))) < 3 THEN RAISE EXCEPTION 'review evidence required'; END IF;
 UPDATE public.student_pickup_authorizations SET status=_status,note=left(_note,500),reviewed_by=auth.uid(),reviewed_at=now() WHERE id=_id;
END $$;
REVOKE ALL ON FUNCTION public.review_pickup_authorization(uuid,text,text) FROM public,anon;
GRANT EXECUTE ON FUNCTION public.review_pickup_authorization(uuid,text,text) TO authenticated;