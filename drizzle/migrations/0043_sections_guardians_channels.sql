-- Families see general and student notices; only staff memberships grant institutional content access.
DROP POLICY "audience reads announcements" ON public.institution_announcements;
CREATE POLICY "audience reads announcements" ON public.institution_announcements FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.is_institution_staff(institution_id)
    OR (public.institution_role_of(institution_id) IN ('estudiante','encargado') AND audience IN ('todos','estudiantes')));

CREATE OR REPLACE FUNCTION public.my_access()
 RETURNS TABLE(trial_ends timestamp with time zone, paid_until timestamp with time zone, status text, has_access boolean)
 LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE me uuid:=auth.uid(); te timestamptz; em text; pu timestamptz; su timestamptz; cu timestamptz; iu timestamptz; st text; adm boolean;
BEGIN
  IF me IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;
  SELECT u.created_at+interval '13 days', lower(coalesce(u.email,'')) INTO te, em FROM auth.users u WHERE u.id=me;
  SELECT max(p.expires_at) INTO pu FROM public.payments p WHERE p.user_id=me AND p.status='confirmed' AND p.plan<>'institucion';
  SELECT max(s.current_period_end) INTO su FROM public.subscriptions s WHERE s.user_id=me AND s.environment='live' AND s.status IN ('active','trialing','past_due','canceled') AND s.current_period_end>now();
  IF su IS NOT NULL AND (pu IS NULL OR su>pu) THEN pu:=su; END IF;
  SELECT max(r.expires_at) INTO cu FROM public.access_code_redemptions r JOIN public.access_codes c ON c.code=r.code WHERE r.user_id=me AND c.active;
  IF cu IS NOT NULL AND (pu IS NULL OR cu>pu) THEN pu:=cu; END IF;
  SELECT max(public.institution_paid_until(m.institution_id)) INTO iu FROM public.institution_members m WHERE m.user_id=me AND m.member_role IN ('direccion','docente','administrativo');
  IF iu IS NOT NULL AND iu>now() AND (pu IS NULL OR iu>pu) THEN pu:=iu; END IF;
  st:=coalesce((SELECT a.status FROM public.account_status a WHERE a.user_id=me),'active');
  adm:=public.has_role(me,'admin');
  IF NOT adm AND st NOT IN ('blocked','inactive') AND em !~ '^[^@[:space:]]+@gmail\.com$' THEN st:='gmail_required'; END IF;
  RETURN QUERY SELECT te,pu,st,st NOT IN ('blocked','inactive','gmail_required') AND (adm OR st='gift' OR now()<te OR (pu IS NOT NULL AND now()<pu));
END $function$;

CREATE OR REPLACE FUNCTION public.admin_institutions()
 RETURNS TABLE(id uuid, name text, logo_path text, is_test boolean, kind text, paid_until timestamp with time zone, staff bigint, students bigint, created_at timestamp with time zone)
 LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
#variable_conflict use_column
BEGIN
  IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'Solo administración' USING ERRCODE='42501'; END IF;
  RETURN QUERY SELECT i.id, i.name, i.logo_path, i.is_test, i.kind, public.institution_paid_until(i.id),
    (SELECT count(*) FROM public.institution_members m WHERE m.institution_id=i.id AND m.member_role IN ('direccion','docente','administrativo')),
    (SELECT count(*) FROM public.institution_members m WHERE m.institution_id=i.id AND m.member_role='estudiante'),
    i.created_at
  FROM public.institutions i ORDER BY i.created_at DESC;
END $function$;

CREATE OR REPLACE FUNCTION public.announcement_delivery(_inst uuid)
 RETURNS TABLE(announcement_id uuid, staff_recipients bigint, student_recipients bigint, staff_reads bigint, student_reads bigint)
 LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
#variable_conflict use_column
BEGIN
  IF NOT (public.has_role(auth.uid(),'admin') OR public.institution_role_of(_inst) IN ('direccion','administrativo')) THEN RAISE EXCEPTION 'Sin permiso' USING ERRCODE='42501'; END IF;
  RETURN QUERY SELECT a.id,
    (SELECT count(*) FROM public.institution_members m WHERE m.institution_id=a.institution_id AND m.member_role IN ('direccion','docente','administrativo') AND a.audience IN ('todos','personal')),
    (SELECT count(*) FROM public.institution_members m WHERE m.institution_id=a.institution_id AND m.member_role='estudiante' AND a.audience IN ('todos','estudiantes')),
    (SELECT count(*) FROM public.announcement_reads r JOIN public.institution_members m ON m.user_id=r.user_id AND m.institution_id=a.institution_id WHERE r.announcement_id=a.id AND m.member_role IN ('direccion','docente','administrativo')),
    (SELECT count(*) FROM public.announcement_reads r JOIN public.institution_members m ON m.user_id=r.user_id AND m.institution_id=a.institution_id WHERE r.announcement_id=a.id AND m.member_role='estudiante')
  FROM public.institution_announcements a WHERE a.institution_id=_inst;
END $function$;

CREATE TABLE public.institution_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
  name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 40),
  guide_id uuid,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (institution_id, name)
);
CREATE TABLE public.section_students (
  section_id uuid NOT NULL REFERENCES public.institution_sections(id) ON DELETE CASCADE,
  student_id uuid NOT NULL,
  PRIMARY KEY (section_id, student_id)
);
CREATE TABLE public.guardian_links (
  institution_id uuid NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
  guardian_id uuid NOT NULL,
  student_id uuid NOT NULL,
  relation text NOT NULL CHECK (relation IN ('madre','padre','encargado')),
  verified_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (institution_id, guardian_id, student_id)
);
CREATE TABLE public.institution_channels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
  kind text NOT NULL CHECK (kind IN ('personal','seccion','familia')),
  section_id uuid REFERENCES public.institution_sections(id) ON DELETE CASCADE,
  student_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK ((kind='personal' AND section_id IS NULL AND student_id IS NULL) OR (kind='seccion' AND section_id IS NOT NULL AND student_id IS NULL) OR (kind='familia' AND section_id IS NULL AND student_id IS NOT NULL))
);
CREATE UNIQUE INDEX institution_channels_unique ON public.institution_channels (institution_id, kind, coalesce(section_id,'00000000-0000-0000-0000-000000000000'::uuid), coalesce(student_id,'00000000-0000-0000-0000-000000000000'::uuid));
CREATE TABLE public.channel_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id uuid NOT NULL REFERENCES public.institution_channels(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL,
  body text NOT NULL CHECK (char_length(body) BETWEEN 1 AND 2000),
  attachment_path text CHECK (attachment_path IS NULL OR attachment_path ~ '^[0-9a-f-]{36}/[A-Za-z0-9._-]{1,100}$'),
  attachment_name text CHECK (attachment_name IS NULL OR char_length(attachment_name) <= 120),
  created_at timestamptz NOT NULL DEFAULT now(),
  hidden_at timestamptz,
  hidden_by uuid
);
CREATE INDEX channel_messages_channel_time ON public.channel_messages (channel_id, created_at DESC);
CREATE TABLE public.channel_reads (
  channel_id uuid NOT NULL REFERENCES public.institution_channels(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  read_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (channel_id, user_id)
);

GRANT SELECT ON public.institution_sections, public.section_students, public.guardian_links, public.institution_channels TO authenticated;
GRANT SELECT, INSERT ON public.channel_messages TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.channel_reads TO authenticated;
GRANT ALL ON public.institution_sections, public.section_students, public.guardian_links, public.institution_channels, public.channel_messages, public.channel_reads TO service_role;
ALTER TABLE public.institution_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.section_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guardian_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institution_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.channel_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.channel_reads ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.can_manage_sections(_inst uuid) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT public.has_role(auth.uid(),'admin') OR coalesce(public.institution_role_of(_inst) IN ('direccion','administrativo'), false)
$$;
CREATE OR REPLACE FUNCTION public.is_section_guide_of(_inst uuid, _student uuid) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT public.institution_role_of(_inst) IS NOT NULL AND EXISTS(SELECT 1 FROM public.institution_sections s JOIN public.section_students x ON x.section_id=s.id
    WHERE s.institution_id=_inst AND s.guide_id=auth.uid() AND x.student_id=_student)
$$;

CREATE OR REPLACE FUNCTION public.channel_access(_ch uuid) RETURNS text
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public AS $$
DECLARE c public.institution_channels; r public.institution_role;
BEGIN
  IF auth.uid() IS NULL THEN RETURN 'none'; END IF;
  SELECT * INTO c FROM public.institution_channels WHERE id=_ch;
  IF NOT FOUND THEN RETURN 'none'; END IF;
  IF public.has_role(auth.uid(),'admin') THEN RETURN 'moderate'; END IF;
  r := public.institution_role_of(c.institution_id);
  IF r IS NULL THEN RETURN 'none'; END IF;
  IF r='direccion' THEN RETURN 'moderate'; END IF;
  IF c.kind='personal' THEN RETURN CASE WHEN r IN ('docente','administrativo') THEN 'post' ELSE 'none' END; END IF;
  IF c.kind='seccion' THEN
    IF r IN ('docente','administrativo') THEN RETURN 'post'; END IF;
    IF r='estudiante' AND EXISTS(SELECT 1 FROM public.section_students x WHERE x.section_id=c.section_id AND x.student_id=auth.uid()) THEN RETURN 'read'; END IF;
    IF r='encargado' AND EXISTS(SELECT 1 FROM public.section_students x JOIN public.guardian_links g ON g.student_id=x.student_id AND g.institution_id=c.institution_id WHERE x.section_id=c.section_id AND g.guardian_id=auth.uid()) THEN RETURN 'read'; END IF;
    RETURN 'none';
  END IF;
  IF r IN ('docente','administrativo') THEN RETURN 'post'; END IF;
  IF r='encargado' AND EXISTS(SELECT 1 FROM public.guardian_links g WHERE g.institution_id=c.institution_id AND g.student_id=c.student_id AND g.guardian_id=auth.uid()) THEN RETURN 'post'; END IF;
  RETURN 'none';
END $$;
CREATE OR REPLACE FUNCTION public.channel_access_path(_name text) RETURNS text
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT CASE WHEN split_part(_name,'/',1) ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN public.channel_access(split_part(_name,'/',1)::uuid) ELSE 'none' END
$$;

CREATE POLICY "section visibility" ON public.institution_sections FOR SELECT TO authenticated USING (public.institution_role_of(institution_id) IS NOT NULL OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "section roster visibility" ON public.section_students FOR SELECT TO authenticated USING (student_id=auth.uid() OR EXISTS(SELECT 1 FROM public.institution_sections s WHERE s.id=section_id AND (public.can_manage_sections(s.institution_id) OR s.guide_id=auth.uid())));
CREATE POLICY "guardian link visibility" ON public.guardian_links FOR SELECT TO authenticated USING (guardian_id=auth.uid() OR student_id=auth.uid() OR public.can_manage_sections(institution_id) OR public.is_section_guide_of(institution_id, student_id));
CREATE POLICY "channel visibility" ON public.institution_channels FOR SELECT TO authenticated USING (public.channel_access(id)<>'none');
CREATE POLICY "channel message visibility" ON public.channel_messages FOR SELECT TO authenticated
  USING (public.channel_access(channel_id)<>'none' AND (hidden_at IS NULL OR sender_id=auth.uid() OR public.channel_access(channel_id)='moderate'));
CREATE POLICY "channel message posting" ON public.channel_messages FOR INSERT TO authenticated
  WITH CHECK (sender_id=auth.uid() AND hidden_at IS NULL AND hidden_by IS NULL AND public.channel_access(channel_id) IN ('post','moderate')
    AND (attachment_path IS NULL OR split_part(attachment_path,'/',1)=channel_id::text));
CREATE POLICY "own channel reads" ON public.channel_reads FOR SELECT TO authenticated USING (user_id=auth.uid());
CREATE POLICY "mark channel read" ON public.channel_reads FOR INSERT TO authenticated WITH CHECK (user_id=auth.uid() AND public.channel_access(channel_id)<>'none');
CREATE POLICY "update channel read" ON public.channel_reads FOR UPDATE TO authenticated USING (user_id=auth.uid()) WITH CHECK (user_id=auth.uid() AND public.channel_access(channel_id)<>'none');

CREATE OR REPLACE FUNCTION public.moderate_channel_message() RETURNS trigger
LANGUAGE plpgsql SET search_path=public AS $$
DECLARE t text;
BEGIN
  NEW.body := btrim(NEW.body);
  IF NEW.body = '' THEN RAISE EXCEPTION 'Escriba un mensaje.'; END IF;
  t := lower(translate(NEW.body,'ÁÉÍÓÚÜáéíóúü','AEIOUUaeiouu'));
  IF t ~ '\m(hijueputa|hijoeputa|jueputa|hdp|puta|puto|putas|putos|mierda|malparido|malparida|carepicha|pendejo|pendeja|idiota|idiotas|imbecil|estupido|estupida|zorra|culero|verga|playo|maricon|cerote|mamon|ctm)\M' THEN
    RAISE EXCEPTION 'Mensaje bloqueado: use un lenguaje respetuoso.' USING ERRCODE='22023';
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER moderate_channel_message BEFORE INSERT ON public.channel_messages FOR EACH ROW EXECUTE FUNCTION public.moderate_channel_message();

CREATE OR REPLACE FUNCTION public.hide_channel_message(_id uuid) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE ch uuid;
BEGIN
  SELECT channel_id INTO ch FROM public.channel_messages WHERE id=_id;
  IF ch IS NULL OR public.channel_access(ch)<>'moderate' THEN RAISE EXCEPTION 'Solo la dirección puede ocultar mensajes' USING ERRCODE='42501'; END IF;
  UPDATE public.channel_messages SET hidden_at=now(), hidden_by=auth.uid() WHERE id=_id AND hidden_at IS NULL;
END $$;

CREATE OR REPLACE FUNCTION public.open_channel(_inst uuid, _kind text, _section uuid, _student uuid) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE cid uuid;
BEGIN
  IF _kind='personal' THEN _section:=NULL; _student:=NULL;
  ELSIF _kind='seccion' THEN
    _student:=NULL;
    IF NOT EXISTS(SELECT 1 FROM public.institution_sections WHERE id=_section AND institution_id=_inst) THEN RAISE EXCEPTION 'Sección no encontrada'; END IF;
  ELSIF _kind='familia' THEN
    _section:=NULL;
    IF NOT EXISTS(SELECT 1 FROM public.guardian_links WHERE institution_id=_inst AND student_id=_student) THEN RAISE EXCEPTION 'El estudiante no tiene familia vinculada'; END IF;
  ELSE RAISE EXCEPTION 'Tipo de canal inválido'; END IF;
  SELECT id INTO cid FROM public.institution_channels WHERE institution_id=_inst AND kind=_kind AND section_id IS NOT DISTINCT FROM _section AND student_id IS NOT DISTINCT FROM _student;
  IF cid IS NULL THEN
    INSERT INTO public.institution_channels(institution_id,kind,section_id,student_id) VALUES (_inst,_kind,_section,_student) RETURNING id INTO cid;
  END IF;
  IF public.channel_access(cid)='none' THEN RAISE EXCEPTION 'Sin acceso a este canal' USING ERRCODE='42501'; END IF;
  RETURN cid;
END $$;

CREATE OR REPLACE FUNCTION public.my_channels(_inst uuid) RETURNS TABLE(kind text, section_id uuid, student_id uuid, title text, channel_id uuid, last_at timestamptz, unread bigint)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public AS $$
#variable_conflict use_column
DECLARE r public.institution_role := public.institution_role_of(_inst); adm boolean := public.has_role(auth.uid(),'admin'); staff boolean;
BEGIN
  IF r IS NULL AND NOT adm THEN RETURN; END IF;
  staff := adm OR r IN ('direccion','docente','administrativo');
  RETURN QUERY
  WITH cand AS (
    SELECT 'personal'::text AS k, NULL::uuid AS sec, NULL::uuid AS stu, 'Personal docente y administrativo'::text AS t WHERE staff
    UNION ALL
    SELECT 'seccion', s.id, NULL::uuid, 'Sección ' || s.name FROM public.institution_sections s
    WHERE s.institution_id=_inst AND (staff
      OR (r='estudiante' AND EXISTS(SELECT 1 FROM public.section_students x WHERE x.section_id=s.id AND x.student_id=auth.uid()))
      OR (r='encargado' AND EXISTS(SELECT 1 FROM public.section_students x JOIN public.guardian_links g ON g.student_id=x.student_id AND g.institution_id=_inst WHERE x.section_id=s.id AND g.guardian_id=auth.uid())))
    UNION ALL
    SELECT 'familia', NULL::uuid, f.student_id, 'Familia de ' || coalesce(nullif(btrim(p.display_name),''),'estudiante')
    FROM (SELECT DISTINCT g.student_id FROM public.guardian_links g WHERE g.institution_id=_inst AND (staff OR (r='encargado' AND g.guardian_id=auth.uid()))) f
    LEFT JOIN public.profiles p ON p.id=f.student_id
  )
  SELECT cand.k, cand.sec, cand.stu, cand.t, c.id,
    (SELECT max(m.created_at) FROM public.channel_messages m WHERE m.channel_id=c.id AND m.hidden_at IS NULL),
    coalesce((SELECT count(*) FROM public.channel_messages m WHERE m.channel_id=c.id AND m.hidden_at IS NULL AND m.sender_id<>auth.uid()
      AND m.created_at > coalesce((SELECT rd.read_at FROM public.channel_reads rd WHERE rd.channel_id=c.id AND rd.user_id=auth.uid()),'-infinity'::timestamptz)),0)
  FROM cand LEFT JOIN public.institution_channels c ON c.institution_id=_inst AND c.kind=cand.k AND c.section_id IS NOT DISTINCT FROM cand.sec AND c.student_id IS NOT DISTINCT FROM cand.stu
  ORDER BY 6 DESC NULLS LAST, 4;
END $$;

CREATE OR REPLACE FUNCTION public.channel_feed(_ch uuid) RETURNS TABLE(id uuid, sender_id uuid, sender_name text, sender_role text, is_guide boolean, body text, attachment_path text, attachment_name text, created_at timestamptz, hidden boolean)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public AS $$
#variable_conflict use_column
DECLARE acc text := public.channel_access(_ch); inst uuid;
BEGIN
  IF acc='none' THEN RAISE EXCEPTION 'Sin acceso a este canal' USING ERRCODE='42501'; END IF;
  SELECT c.institution_id INTO inst FROM public.institution_channels c WHERE c.id=_ch;
  RETURN QUERY SELECT * FROM (
    SELECT m.id, m.sender_id, coalesce(nullif(btrim(p.display_name),''),'Persona'),
      CASE WHEN public.has_role(m.sender_id,'admin') AND mm.member_role IS NULL THEN 'superadmin' ELSE coalesce(mm.member_role::text,'') END,
      EXISTS(SELECT 1 FROM public.institution_sections s WHERE s.institution_id=inst AND s.guide_id=m.sender_id),
      CASE WHEN m.hidden_at IS NULL OR m.sender_id=auth.uid() OR acc='moderate' THEN m.body ELSE '' END,
      CASE WHEN m.hidden_at IS NULL OR acc='moderate' THEN m.attachment_path END, m.attachment_name, m.created_at, m.hidden_at IS NOT NULL
    FROM public.channel_messages m LEFT JOIN public.profiles p ON p.id=m.sender_id
      LEFT JOIN public.institution_members mm ON mm.institution_id=inst AND mm.user_id=m.sender_id
    WHERE m.channel_id=_ch AND (m.hidden_at IS NULL OR m.sender_id=auth.uid() OR acc='moderate')
    ORDER BY m.created_at DESC LIMIT 200) x ORDER BY x.created_at;
END $$;

CREATE OR REPLACE FUNCTION public.institution_people(_inst uuid) RETURNS TABLE(user_id uuid, display_name text, email text, member_role public.institution_role, section_id uuid, section_name text, guardians bigint)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public AS $$
#variable_conflict use_column
DECLARE mgr boolean := public.can_manage_sections(_inst);
BEGIN
  IF NOT mgr AND NOT coalesce(public.institution_role_of(_inst) IN ('docente','direccion','administrativo'),false) THEN RAISE EXCEPTION 'Sin permiso' USING ERRCODE='42501'; END IF;
  RETURN QUERY SELECT m.user_id, coalesce(nullif(btrim(p.display_name),''),''), CASE WHEN mgr THEN u.email::text END, m.member_role,
    sx.section_id, s.name,
    (SELECT count(*) FROM public.guardian_links g WHERE g.institution_id=_inst AND g.student_id=m.user_id)
  FROM public.institution_members m JOIN auth.users u ON u.id=m.user_id LEFT JOIN public.profiles p ON p.id=m.user_id
    LEFT JOIN public.section_students sx ON sx.student_id=m.user_id AND sx.section_id IN (SELECT id FROM public.institution_sections WHERE institution_id=_inst)
    LEFT JOIN public.institution_sections s ON s.id=sx.section_id
  WHERE m.institution_id=_inst AND (mgr OR m.member_role<>'encargado')
  ORDER BY m.member_role, 2;
END $$;

CREATE OR REPLACE FUNCTION public.save_section(_inst uuid, _id uuid, _name text, _guide uuid) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE sid uuid;
BEGIN
  IF NOT public.can_manage_sections(_inst) THEN RAISE EXCEPTION 'Solo dirección o administración' USING ERRCODE='42501'; END IF;
  IF _guide IS NOT NULL AND NOT EXISTS(SELECT 1 FROM public.institution_members WHERE institution_id=_inst AND user_id=_guide AND member_role IN ('docente','direccion','administrativo')) THEN RAISE EXCEPTION 'La persona guía debe ser parte del personal'; END IF;
  IF _id IS NULL THEN
    INSERT INTO public.institution_sections(institution_id,name,guide_id,created_by) VALUES (_inst,btrim(_name),_guide,auth.uid()) RETURNING id INTO sid;
  ELSE
    UPDATE public.institution_sections SET name=btrim(_name), guide_id=_guide WHERE id=_id AND institution_id=_inst RETURNING id INTO sid;
    IF sid IS NULL THEN RAISE EXCEPTION 'Sección no encontrada'; END IF;
  END IF;
  RETURN sid;
END $$;
CREATE OR REPLACE FUNCTION public.assign_student_section(_section uuid, _student uuid) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE inst uuid;
BEGIN
  SELECT institution_id INTO inst FROM public.institution_sections WHERE id=_section;
  IF inst IS NULL OR NOT public.can_manage_sections(inst) THEN RAISE EXCEPTION 'Solo dirección o administración' USING ERRCODE='42501'; END IF;
  IF NOT EXISTS(SELECT 1 FROM public.institution_members WHERE institution_id=inst AND user_id=_student AND member_role='estudiante') THEN RAISE EXCEPTION 'La cuenta no es estudiante de la institución'; END IF;
  DELETE FROM public.section_students WHERE student_id=_student AND section_id IN (SELECT id FROM public.institution_sections WHERE institution_id=inst);
  INSERT INTO public.section_students(section_id,student_id) VALUES (_section,_student);
END $$;
CREATE OR REPLACE FUNCTION public.remove_student_section(_section uuid, _student uuid) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE inst uuid;
BEGIN
  SELECT institution_id INTO inst FROM public.institution_sections WHERE id=_section;
  IF inst IS NULL OR NOT public.can_manage_sections(inst) THEN RAISE EXCEPTION 'Solo dirección o administración' USING ERRCODE='42501'; END IF;
  DELETE FROM public.section_students WHERE section_id=_section AND student_id=_student;
END $$;
CREATE OR REPLACE FUNCTION public.link_guardian(_inst uuid, _student uuid, _email text, _relation text) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE gid uuid; existing public.institution_role;
BEGIN
  IF NOT (public.can_manage_sections(_inst) OR public.is_section_guide_of(_inst,_student)) THEN RAISE EXCEPTION 'Solo dirección, administración o la persona guía' USING ERRCODE='42501'; END IF;
  IF NOT EXISTS(SELECT 1 FROM public.institution_members WHERE institution_id=_inst AND user_id=_student AND member_role='estudiante') THEN RAISE EXCEPTION 'La cuenta no es estudiante de la institución'; END IF;
  SELECT u.id INTO gid FROM auth.users u WHERE lower(u.email)=lower(btrim(_email)) AND u.email_confirmed_at IS NOT NULL LIMIT 1;
  IF gid IS NULL THEN RAISE EXCEPTION 'No existe una cuenta Gmail confirmada con ese correo'; END IF;
  IF gid=_student THEN RAISE EXCEPTION 'La familia debe usar una cuenta distinta a la del estudiante'; END IF;
  SELECT member_role INTO existing FROM public.institution_members WHERE institution_id=_inst AND user_id=gid;
  IF existing IS NOT NULL AND existing<>'encargado' THEN RAISE EXCEPTION 'Esa cuenta ya pertenece a la institución con otro rol'; END IF;
  IF existing IS NULL THEN INSERT INTO public.institution_members(institution_id,user_id,member_role,verified_by) VALUES (_inst,gid,'encargado',auth.uid()); END IF;
  INSERT INTO public.guardian_links(institution_id,guardian_id,student_id,relation,verified_by) VALUES (_inst,gid,_student,_relation,auth.uid())
  ON CONFLICT (institution_id,guardian_id,student_id) DO UPDATE SET relation=EXCLUDED.relation, verified_by=EXCLUDED.verified_by;
  RETURN gid;
END $$;
CREATE OR REPLACE FUNCTION public.unlink_guardian(_inst uuid, _guardian uuid, _student uuid) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
  IF NOT public.can_manage_sections(_inst) THEN RAISE EXCEPTION 'Solo dirección o administración' USING ERRCODE='42501'; END IF;
  DELETE FROM public.guardian_links WHERE institution_id=_inst AND guardian_id=_guardian AND student_id=_student;
  IF NOT EXISTS(SELECT 1 FROM public.guardian_links WHERE institution_id=_inst AND guardian_id=_guardian) THEN
    DELETE FROM public.institution_members WHERE institution_id=_inst AND user_id=_guardian AND member_role='encargado';
  END IF;
END $$;
CREATE OR REPLACE FUNCTION public.student_guardians(_inst uuid, _student uuid) RETURNS TABLE(guardian_id uuid, display_name text, email text, relation text)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public AS $$
#variable_conflict use_column
BEGIN
  IF NOT (public.can_manage_sections(_inst) OR public.is_section_guide_of(_inst,_student)) THEN RAISE EXCEPTION 'Sin permiso' USING ERRCODE='42501'; END IF;
  RETURN QUERY SELECT g.guardian_id, coalesce(nullif(btrim(p.display_name),''),''), u.email::text, g.relation
  FROM public.guardian_links g JOIN auth.users u ON u.id=g.guardian_id LEFT JOIN public.profiles p ON p.id=g.guardian_id
  WHERE g.institution_id=_inst AND g.student_id=_student ORDER BY g.created_at;
END $$;

REVOKE ALL ON FUNCTION public.can_manage_sections(uuid), public.is_section_guide_of(uuid,uuid), public.channel_access(uuid), public.channel_access_path(text), public.hide_channel_message(uuid), public.open_channel(uuid,text,uuid,uuid), public.my_channels(uuid), public.channel_feed(uuid), public.institution_people(uuid), public.save_section(uuid,uuid,text,uuid), public.assign_student_section(uuid,uuid), public.remove_student_section(uuid,uuid), public.link_guardian(uuid,uuid,text,text), public.unlink_guardian(uuid,uuid,uuid), public.student_guardians(uuid,uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_manage_sections(uuid), public.is_section_guide_of(uuid,uuid), public.channel_access(uuid), public.channel_access_path(text), public.hide_channel_message(uuid), public.open_channel(uuid,text,uuid,uuid), public.my_channels(uuid), public.channel_feed(uuid), public.institution_people(uuid), public.save_section(uuid,uuid,text,uuid), public.assign_student_section(uuid,uuid), public.remove_student_section(uuid,uuid), public.link_guardian(uuid,uuid,text,text), public.unlink_guardian(uuid,uuid,uuid), public.student_guardians(uuid,uuid) TO authenticated, service_role;

CREATE POLICY "channel files read" ON storage.objects FOR SELECT TO authenticated USING (bucket_id='channel-files' AND public.channel_access_path(name)<>'none');
CREATE POLICY "channel files upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id='channel-files' AND public.channel_access_path(name) IN ('post','moderate'));

ALTER PUBLICATION supabase_realtime ADD TABLE public.channel_messages;