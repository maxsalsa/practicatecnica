CREATE TABLE public.teacher_exams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id uuid NOT NULL DEFAULT auth.uid(),
  title text NOT NULL CHECK (char_length(title) BETWEEN 3 AND 120),
  minutes integer NOT NULL DEFAULT 20 CHECK (minutes BETWEEN 1 AND 180),
  questions jsonb NOT NULL DEFAULT '[]'::jsonb,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.teacher_exams TO authenticated;
GRANT ALL ON public.teacher_exams TO service_role;
ALTER TABLE public.teacher_exams ENABLE ROW LEVEL SECURITY;
CREATE POLICY teacher_exams_owner ON public.teacher_exams FOR ALL TO authenticated
  USING (teacher_id = auth.uid() AND (public.has_role(auth.uid(),'teacher') OR public.has_role(auth.uid(),'admin')))
  WITH CHECK (teacher_id = auth.uid() AND (public.has_role(auth.uid(),'teacher') OR public.has_role(auth.uid(),'admin')));

-- Students list their teachers' published exams without answer keys.
CREATE OR REPLACE FUNCTION public.my_teacher_exams()
RETURNS TABLE(id uuid, title text, minutes integer, questions jsonb)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT e.id, e.title, e.minutes,
    (SELECT coalesce(jsonb_agg(jsonb_build_object('q', q->>'q', 'options', q->'options')), '[]'::jsonb) FROM jsonb_array_elements(e.questions) q)
  FROM public.teacher_exams e
  WHERE e.published AND EXISTS (SELECT 1 FROM public.students s WHERE s.teacher_id = e.teacher_id AND s.user_id = auth.uid())
  ORDER BY e.created_at DESC
$$;

-- Score server-side so answer keys never reach students.
CREATE OR REPLACE FUNCTION public.grade_teacher_exam(_exam uuid, _picks integer[])
RETURNS TABLE(correct integer, total integer, answers integer[])
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE qs jsonb; c int := 0; n int; a int[] := '{}'; k int;
BEGIN
  SELECT e.questions INTO qs FROM public.teacher_exams e
  WHERE e.id = _exam AND e.published AND EXISTS (SELECT 1 FROM public.students s WHERE s.teacher_id = e.teacher_id AND s.user_id = auth.uid());
  IF qs IS NULL THEN RAISE EXCEPTION 'Examen no disponible'; END IF;
  n := jsonb_array_length(qs);
  FOR k IN 0..n-1 LOOP
    a := a || (qs->k->>'answer')::int;
    IF _picks[k+1] = (qs->k->>'answer')::int THEN c := c + 1; END IF;
  END LOOP;
  RETURN QUERY SELECT c, n, a;
END $$;
REVOKE ALL ON FUNCTION public.my_teacher_exams() FROM public, anon;
REVOKE ALL ON FUNCTION public.grade_teacher_exam(uuid, integer[]) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.my_teacher_exams() TO authenticated;
GRANT EXECUTE ON FUNCTION public.grade_teacher_exam(uuid, integer[]) TO authenticated;