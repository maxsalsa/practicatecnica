ALTER TABLE public.student_grades ADD COLUMN weight numeric(5,2) NOT NULL DEFAULT 0 CHECK (weight >= 0 AND weight <= 100);
ALTER TABLE public.student_grades ADD COLUMN level text NOT NULL DEFAULT '' CHECK (char_length(level) <= 40);
ALTER TABLE public.student_grades DROP CONSTRAINT IF EXISTS student_grades_kind_check;
ALTER TABLE public.student_grades ADD CONSTRAINT student_grades_kind_check CHECK (kind IN ('cotidiano','tarea','proyecto','examen','asistencia'));
GRANT UPDATE (weight, level) ON public.student_grades TO authenticated;