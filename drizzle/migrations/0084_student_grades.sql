CREATE TABLE public.student_grades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  teacher_id uuid NOT NULL DEFAULT auth.uid(),
  subject text NOT NULL CHECK (char_length(subject) BETWEEN 1 AND 80),
  kind text NOT NULL CHECK (kind IN ('cotidiano','tarea','proyecto','examen')),
  title text NOT NULL CHECK (char_length(title) BETWEEN 1 AND 120),
  score numeric(5,2) NOT NULL CHECK (score >= 0 AND score <= 100),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.student_grades TO authenticated;
GRANT ALL ON public.student_grades TO service_role;
ALTER TABLE public.student_grades ENABLE ROW LEVEL SECURITY;
CREATE POLICY grades_read ON public.student_grades FOR SELECT TO authenticated USING (teacher_id = auth.uid() OR public.has_role(auth.uid(),'admin') OR EXISTS (SELECT 1 FROM public.students s WHERE s.id = student_id AND s.user_id = auth.uid()));
CREATE POLICY grades_insert ON public.student_grades FOR INSERT TO authenticated WITH CHECK (teacher_id = auth.uid() AND public.can_use_teacher_tools() AND EXISTS (SELECT 1 FROM public.students s WHERE s.id = student_id AND s.teacher_id = auth.uid()));
CREATE POLICY grades_delete ON public.student_grades FOR DELETE TO authenticated USING (teacher_id = auth.uid());
CREATE INDEX student_grades_student_idx ON public.student_grades(student_id);