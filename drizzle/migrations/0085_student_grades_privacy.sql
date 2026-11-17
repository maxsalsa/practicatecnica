DROP POLICY IF EXISTS grades_read ON public.student_grades;
CREATE POLICY grades_read ON public.student_grades FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.students s WHERE s.id = student_id AND (
    s.teacher_id = auth.uid()
    OR s.user_id = auth.uid()
    OR EXISTS (SELECT 1 FROM public.guardian_links g WHERE g.student_id = s.user_id AND g.guardian_id = auth.uid() AND g.consented_at IS NOT NULL)
  )));
DROP POLICY IF EXISTS grades_delete ON public.student_grades;
CREATE POLICY grades_delete ON public.student_grades FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM public.students s WHERE s.id = student_id AND s.teacher_id = auth.uid()));
GRANT UPDATE (subject, kind, title, score) ON public.student_grades TO authenticated;
CREATE POLICY grades_update ON public.student_grades FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.students s WHERE s.id = student_id AND s.teacher_id = auth.uid()))
  WITH CHECK (public.can_use_teacher_tools() AND EXISTS (SELECT 1 FROM public.students s WHERE s.id = student_id AND s.teacher_id = auth.uid()));