ALTER TABLE public.institutions ADD COLUMN kind text NOT NULL DEFAULT 'ctp' CHECK (kind IN ('escuela','academico','ctp'));

DROP FUNCTION public.admin_create_institution(text, boolean);
CREATE OR REPLACE FUNCTION public.admin_create_institution(_name text, _is_test boolean, _kind text) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE nid uuid;
BEGIN
  IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'Solo administración' USING ERRCODE='42501'; END IF;
  INSERT INTO public.institutions(name,is_test,kind,created_by) VALUES (btrim(_name), coalesce(_is_test,false), coalesce(_kind,'ctp'), auth.uid()) RETURNING id INTO nid;
  RETURN nid;
END $$;
REVOKE ALL ON FUNCTION public.admin_create_institution(text,boolean,text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_create_institution(text,boolean,text) TO authenticated, service_role;

DROP FUNCTION public.admin_institutions();
CREATE OR REPLACE FUNCTION public.admin_institutions() RETURNS TABLE(id uuid, name text, logo_path text, is_test boolean, kind text, paid_until timestamptz, staff bigint, students bigint, created_at timestamptz)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public AS $$
#variable_conflict use_column
BEGIN
  IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'Solo administración' USING ERRCODE='42501'; END IF;
  RETURN QUERY SELECT i.id, i.name, i.logo_path, i.is_test, i.kind, public.institution_paid_until(i.id),
    (SELECT count(*) FROM public.institution_members m WHERE m.institution_id=i.id AND m.member_role<>'estudiante'),
    (SELECT count(*) FROM public.institution_members m WHERE m.institution_id=i.id AND m.member_role='estudiante'),
    i.created_at
  FROM public.institutions i ORDER BY i.created_at DESC;
END $$;
REVOKE ALL ON FUNCTION public.admin_institutions() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_institutions() TO authenticated, service_role;

DROP FUNCTION public.my_institutions();
CREATE OR REPLACE FUNCTION public.my_institutions() RETURNS TABLE(id uuid, name text, logo_path text, is_test boolean, kind text, member_role public.institution_role, paid_until timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT i.id, i.name, i.logo_path, i.is_test, i.kind, m.member_role, public.institution_paid_until(i.id)
  FROM public.institution_members m JOIN public.institutions i ON i.id=m.institution_id
  WHERE m.user_id=auth.uid()
    AND NOT EXISTS(SELECT 1 FROM public.account_status a WHERE a.user_id=auth.uid() AND a.status IN ('blocked','inactive'))
  ORDER BY i.name
$$;
REVOKE ALL ON FUNCTION public.my_institutions() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_institutions() TO authenticated, service_role;

CREATE TABLE public.institution_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
  title text NOT NULL CHECK (char_length(btrim(title)) BETWEEN 3 AND 120),
  config jsonb NOT NULL CHECK (pg_column_size(config) < 400000),
  result jsonb NOT NULL CHECK (pg_column_size(result) < 400000),
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX institution_schedules_inst_idx ON public.institution_schedules(institution_id, created_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.institution_schedules TO authenticated;
GRANT ALL ON public.institution_schedules TO service_role;
ALTER TABLE public.institution_schedules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "staff reads schedules" ON public.institution_schedules FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.is_institution_staff(institution_id));
CREATE POLICY "management creates schedules" ON public.institution_schedules FOR INSERT TO authenticated
  WITH CHECK (created_by=auth.uid() AND (public.has_role(auth.uid(),'admin') OR public.institution_role_of(institution_id) IN ('direccion','administrativo')));
CREATE POLICY "management updates schedules" ON public.institution_schedules FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.institution_role_of(institution_id) IN ('direccion','administrativo'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.institution_role_of(institution_id) IN ('direccion','administrativo'));
CREATE POLICY "management deletes schedules" ON public.institution_schedules FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.institution_role_of(institution_id) IN ('direccion','administrativo'));

CREATE OR REPLACE FUNCTION public.initialize_student_account() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$ BEGIN
INSERT INTO public.profiles(id,display_name) VALUES(new.id, coalesce(new.raw_user_meta_data->>'full_name',new.raw_user_meta_data->>'name','')) ON CONFLICT(id) DO NOTHING;
IF new.email_confirmed_at IS NOT NULL THEN
IF lower(new.email)='maxi.salsa@gmail.com' THEN INSERT INTO public.user_roles(user_id,role) VALUES(new.id,'admin') ON CONFLICT DO NOTHING; END IF;
IF EXISTS(SELECT 1 FROM public.teacher_access WHERE email=lower(new.email)) THEN INSERT INTO public.user_roles(user_id,role) VALUES(new.id,'teacher') ON CONFLICT DO NOTHING; END IF;
UPDATE public.students SET user_id=new.id WHERE email=lower(new.email) AND user_id IS NULL;
END IF;
RETURN new; END $$;

CREATE OR REPLACE FUNCTION public.my_access() RETURNS TABLE(trial_ends timestamptz, paid_until timestamptz, status text, has_access boolean)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public AS $$
DECLARE me uuid:=auth.uid(); te timestamptz; em text; pu timestamptz; su timestamptz; cu timestamptz; iu timestamptz; st text; adm boolean;
BEGIN
  IF me IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;
  SELECT u.created_at+interval '13 days', lower(coalesce(u.email,'')) INTO te, em FROM auth.users u WHERE u.id=me;
  SELECT max(p.expires_at) INTO pu FROM public.payments p WHERE p.user_id=me AND p.status='confirmed' AND p.plan<>'institucion';
  SELECT max(s.current_period_end) INTO su FROM public.subscriptions s WHERE s.user_id=me AND s.environment='live' AND s.status IN ('active','trialing','past_due','canceled') AND s.current_period_end>now();
  IF su IS NOT NULL AND (pu IS NULL OR su>pu) THEN pu:=su; END IF;
  SELECT max(r.expires_at) INTO cu FROM public.access_code_redemptions r JOIN public.access_codes c ON c.code=r.code WHERE r.user_id=me AND c.active;
  IF cu IS NOT NULL AND (pu IS NULL OR cu>pu) THEN pu:=cu; END IF;
  SELECT max(public.institution_paid_until(m.institution_id)) INTO iu FROM public.institution_members m WHERE m.user_id=me AND m.member_role<>'estudiante';
  IF iu IS NOT NULL AND iu>now() AND (pu IS NULL OR iu>pu) THEN pu:=iu; END IF;
  st:=coalesce((SELECT a.status FROM public.account_status a WHERE a.user_id=me),'active');
  adm:=public.has_role(me,'admin');
  IF NOT adm AND st NOT IN ('blocked','inactive') AND em !~ '^[^@[:space:]]+@gmail\.com$' THEN st:='gmail_required'; END IF;
  RETURN QUERY SELECT te,pu,st,st NOT IN ('blocked','inactive','gmail_required') AND (adm OR st='gift' OR now()<te OR (pu IS NOT NULL AND now()<pu));
END $$;