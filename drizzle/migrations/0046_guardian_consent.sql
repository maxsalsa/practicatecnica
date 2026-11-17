ALTER TABLE public.guardian_links ADD COLUMN consented_at timestamptz;
ALTER TABLE public.guardian_links ADD COLUMN consent_version text;

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
    IF r='encargado' AND EXISTS(SELECT 1 FROM public.section_students x JOIN public.guardian_links g ON g.student_id=x.student_id AND g.institution_id=c.institution_id WHERE x.section_id=c.section_id AND g.guardian_id=auth.uid() AND g.consented_at IS NOT NULL) THEN RETURN 'read'; END IF;
    RETURN 'none';
  END IF;
  IF r IN ('docente','administrativo') THEN RETURN 'post'; END IF;
  IF r='encargado' AND EXISTS(SELECT 1 FROM public.guardian_links g WHERE g.institution_id=c.institution_id AND g.student_id=c.student_id AND g.guardian_id=auth.uid() AND g.consented_at IS NOT NULL) THEN RETURN 'post'; END IF;
  RETURN 'none';
END $$;

CREATE OR REPLACE FUNCTION public.accept_guardian_consent(_inst uuid, _version text) RETURNS integer
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE n integer;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Inicie sesión' USING ERRCODE='42501'; END IF;
  IF _version IS NULL OR length(_version) NOT BETWEEN 1 AND 40 THEN RAISE EXCEPTION 'Versión inválida'; END IF;
  UPDATE public.guardian_links SET consented_at=now(), consent_version=_version WHERE institution_id=_inst AND guardian_id=auth.uid() AND consented_at IS NULL;
  GET DIAGNOSTICS n = ROW_COUNT;
  RETURN n;
END $$;

CREATE OR REPLACE FUNCTION public.my_guardian_links(_inst uuid) RETURNS TABLE(student_id uuid, student_name text, relation text, consented_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT g.student_id, coalesce(nullif(btrim(p.display_name),''),'Estudiante'), g.relation, g.consented_at
  FROM public.guardian_links g LEFT JOIN public.profiles p ON p.id=g.student_id
  WHERE g.institution_id=_inst AND g.guardian_id=auth.uid() ORDER BY 2
$$;

REVOKE ALL ON FUNCTION public.accept_guardian_consent(uuid,text), public.my_guardian_links(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.accept_guardian_consent(uuid,text), public.my_guardian_links(uuid) TO authenticated, service_role;