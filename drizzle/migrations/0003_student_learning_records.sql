CREATE TABLE public.student_learning_records (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 student_id uuid NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
 subject text NOT NULL,
 level text NOT NULL,
 progress integer NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
 notes text NOT NULL DEFAULT '',
 recorded_by uuid NOT NULL DEFAULT auth.uid(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(student_id, subject, level)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.student_learning_records TO authenticated;
GRANT ALL ON public.student_learning_records TO service_role;
ALTER TABLE public.student_learning_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY learning_read ON public.student_learning_records FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.students s WHERE s.id = student_id AND (s.user_id = auth.uid() OR public.has_role(auth.uid(), 'admin') OR (s.teacher_id = auth.uid() AND public.has_role(auth.uid(), 'teacher')))));
CREATE POLICY learning_insert ON public.student_learning_records FOR INSERT TO authenticated WITH CHECK (recorded_by = auth.uid() AND EXISTS (SELECT 1 FROM public.students s WHERE s.id = student_id AND (public.has_role(auth.uid(), 'admin') OR (s.teacher_id = auth.uid() AND public.has_role(auth.uid(), 'teacher')))));
CREATE POLICY learning_update ON public.student_learning_records FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM public.students s WHERE s.id = student_id AND (public.has_role(auth.uid(), 'admin') OR (s.teacher_id = auth.uid() AND public.has_role(auth.uid(), 'teacher'))))) WITH CHECK (recorded_by = auth.uid() AND EXISTS (SELECT 1 FROM public.students s WHERE s.id = student_id AND (public.has_role(auth.uid(), 'admin') OR (s.teacher_id = auth.uid() AND public.has_role(auth.uid(), 'teacher')))));
CREATE INDEX student_learning_student_idx ON public.student_learning_records(student_id);