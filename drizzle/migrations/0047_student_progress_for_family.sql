CREATE OR REPLACE FUNCTION public.can_follow_student(_inst uuid, _student uuid) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT auth.uid() IS NOT NULL AND EXISTS(SELECT 1 FROM public.institution_members s WHERE s.institution_id=_inst AND s.user_id=_student AND s.member_role='estudiante') AND (
    public.has_role(auth.uid(),'admin')
    OR public.institution_role_of(_inst) IN ('direccion','administrativo')
    OR public.is_section_guide_of(_inst,_student)
    OR EXISTS(SELECT 1 FROM public.guardian_links g WHERE g.institution_id=_inst AND g.student_id=_student AND g.guardian_id=auth.uid() AND g.consented_at IS NOT NULL))
$$;

CREATE OR REPLACE FUNCTION public.student_follow_up(_inst uuid, _student uuid) RETURNS jsonb
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public AS $$
DECLARE since timestamptz := now() - interval '365 days';
BEGIN
  IF NOT public.can_follow_student(_inst,_student) THEN RAISE EXCEPTION 'Sin permiso para ver este seguimiento' USING ERRCODE='42501'; END IF;
  RETURN jsonb_build_object(
    'student_name', (SELECT coalesce(nullif(btrim(display_name),''),'Estudiante') FROM public.profiles WHERE id=_student),
    'attempts', coalesce((SELECT jsonb_agg(jsonb_build_object('id',a.id,'deck_id',a.deck_id,'title',a.title,'score',a.score,'question_count',a.question_count,'created_at',a.created_at,'verified_scoring',a.verified_scoring,'assessment_mode',a.assessment_mode,'earned_points',a.earned_points,'points_version',a.points_version) ORDER BY a.created_at)
      FROM public.practice_attempts a WHERE a.user_id=_student AND a.created_at>=since), '[]'::jsonb),
    'visit_days', coalesce((SELECT jsonb_agg(d ORDER BY d) FROM (SELECT DISTINCT (v.created_at AT TIME ZONE 'America/Costa_Rica')::date::text d FROM public.page_visits v WHERE v.user_id=_student AND v.created_at>=now()-interval '90 days') x), '[]'::jsonb),
    'last_seen', (SELECT max(v.created_at) FROM public.page_visits v WHERE v.user_id=_student)
  );
END $$;

REVOKE ALL ON FUNCTION public.can_follow_student(uuid,uuid), public.student_follow_up(uuid,uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_follow_student(uuid,uuid), public.student_follow_up(uuid,uuid) TO authenticated, service_role;