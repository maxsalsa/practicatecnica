CREATE OR REPLACE FUNCTION public.initialize_student_account() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$ BEGIN
INSERT INTO public.profiles(id,display_name) VALUES(new.id, coalesce(new.raw_user_meta_data->>'full_name',new.raw_user_meta_data->>'name','')) ON CONFLICT(id) DO NOTHING;
IF new.email_confirmed_at IS NOT NULL THEN
IF lower(new.email) IN ('maxi.salsa@gmail.com','escb77@gmail.com') THEN INSERT INTO public.user_roles(user_id,role) VALUES(new.id,'admin') ON CONFLICT DO NOTHING; END IF;
IF EXISTS(SELECT 1 FROM public.teacher_access WHERE email=lower(new.email)) THEN INSERT INTO public.user_roles(user_id,role) VALUES(new.id,'teacher') ON CONFLICT DO NOTHING; END IF;
UPDATE public.students SET user_id=new.id WHERE email=lower(new.email) AND user_id IS NULL;
END IF;
RETURN new; END $$;
REVOKE ALL ON FUNCTION public.initialize_student_account() FROM PUBLIC,anon,authenticated;