CREATE TABLE public.book_topic_progress (
 user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
 topic_id text NOT NULL,
 read_done boolean NOT NULL DEFAULT false,
 exercises_done boolean NOT NULL DEFAULT false,
 updated_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY (user_id, topic_id)
);
GRANT SELECT, INSERT, UPDATE ON public.book_topic_progress TO authenticated;
GRANT ALL ON public.book_topic_progress TO service_role;
ALTER TABLE public.book_topic_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY book_topic_owner_read ON public.book_topic_progress FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY book_topic_owner_insert ON public.book_topic_progress FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY book_topic_owner_update ON public.book_topic_progress FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY book_topic_teacher_read ON public.book_topic_progress FOR SELECT TO authenticated USING (
 (public.has_role(auth.uid(), 'teacher') OR public.has_role(auth.uid(), 'admin'))
 AND EXISTS (SELECT 1 FROM public.students s WHERE s.teacher_id = auth.uid() AND s.user_id = book_topic_progress.user_id)
);