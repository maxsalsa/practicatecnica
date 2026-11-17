ALTER TABLE public.enrollment_requests ADD COLUMN family_contact jsonb NOT NULL DEFAULT '{}'::jsonb, ADD COLUMN documents jsonb NOT NULL DEFAULT '[]'::jsonb;
CREATE OR REPLACE FUNCTION public.guard_enrollment_documents() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
 IF jsonb_typeof(NEW.family_contact) <> 'object' OR jsonb_typeof(NEW.documents) <> 'array' OR jsonb_array_length(NEW.documents) > 10 THEN RAISE EXCEPTION 'invalid enrollment documents'; END IF;
 IF TG_OP = 'INSERT' AND (NEW.documents <> '[]'::jsonb OR NEW.family_contact <> '{}'::jsonb) AND coalesce(auth.role(),'') <> 'service_role' THEN RAISE EXCEPTION 'verified server submission required'; END IF;
 IF TG_OP = 'UPDATE' AND (NEW.documents IS DISTINCT FROM OLD.documents OR NEW.family_contact IS DISTINCT FROM OLD.family_contact) THEN RAISE EXCEPTION 'submitted documents are immutable'; END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER guard_enrollment_documents BEFORE INSERT OR UPDATE ON public.enrollment_requests FOR EACH ROW EXECUTE FUNCTION public.guard_enrollment_documents();
CREATE TABLE public.enrollment_events (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 request_id uuid NOT NULL REFERENCES public.enrollment_requests(id) ON DELETE CASCADE,
 status text NOT NULL, actor_id uuid NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.enrollment_events TO authenticated;
GRANT ALL ON public.enrollment_events TO service_role;
ALTER TABLE public.enrollment_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "enrollment event authorized reads" ON public.enrollment_events FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.enrollment_requests r WHERE r.id=request_id AND (r.guardian_id=auth.uid() OR public.can_review_enrollment(r.institution_id))));
CREATE OR REPLACE FUNCTION public.audit_enrollment_event() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
 IF TG_OP='INSERT' THEN INSERT INTO public.enrollment_events(request_id,status,actor_id) VALUES(NEW.id,NEW.status,NEW.guardian_id);
 ELSIF NEW.status IS DISTINCT FROM OLD.status THEN INSERT INTO public.enrollment_events(request_id,status,actor_id) VALUES(NEW.id,NEW.status,coalesce(NEW.reviewed_by,auth.uid())); END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER audit_enrollment_event AFTER INSERT OR UPDATE ON public.enrollment_requests FOR EACH ROW EXECUTE FUNCTION public.audit_enrollment_event();