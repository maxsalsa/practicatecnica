CREATE OR REPLACE FUNCTION public.can_follow_student(_inst uuid, _student uuid) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT coalesce(auth.uid() IS NOT NULL AND EXISTS(SELECT 1 FROM public.institution_members s WHERE s.institution_id=_inst AND s.user_id=_student AND s.member_role='estudiante') AND (
    public.has_role(auth.uid(),'admin')
    OR coalesce(public.institution_role_of(_inst) IN ('direccion','administrativo'), false)
    OR coalesce(public.is_section_guide_of(_inst,_student), false)
    OR EXISTS(SELECT 1 FROM public.guardian_links g WHERE g.institution_id=_inst AND g.student_id=_student AND g.guardian_id=auth.uid() AND g.consented_at IS NOT NULL)), false)
$$;