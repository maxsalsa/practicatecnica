CREATE OR REPLACE FUNCTION public.can_use_teacher_tools() RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
SELECT auth.uid() IS NOT NULL AND NOT EXISTS(SELECT 1 FROM public.account_status WHERE user_id=auth.uid() AND status IN ('blocked','inactive')) AND (public.has_role(auth.uid(),'admin') OR (public.has_role(auth.uid(),'teacher') AND (EXISTS(SELECT 1 FROM auth.users WHERE id=auth.uid() AND now()<created_at+interval '13 days') OR EXISTS(SELECT 1 FROM public.payments WHERE user_id=auth.uid() AND plan='docente' AND status='confirmed' AND expires_at>now()))));
$$;
REVOKE ALL ON FUNCTION public.can_use_teacher_tools() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_use_teacher_tools() TO authenticated, service_role;
DO $$ DECLARE p record; q text; w text; BEGIN
FOR p IN SELECT * FROM pg_policies WHERE schemaname='public' AND tablename IN ('students','profiles','practice_attempts','book_topic_progress','student_learning_records','teacher_groups','teacher_group_members','student_exam_assignments','teacher_exams') LOOP
q:=p.qual; w:=p.with_check;
IF q IS NOT NULL THEN q:=replace(q, 'has_role(auth.uid(), ''teacher''::app_role)', '(has_role(auth.uid(), ''teacher''::app_role) AND public.can_use_teacher_tools())'); END IF;
IF w IS NOT NULL THEN w:=replace(w, 'has_role(auth.uid(), ''teacher''::app_role)', '(has_role(auth.uid(), ''teacher''::app_role) AND public.can_use_teacher_tools())'); END IF;
IF p.tablename IN ('teacher_groups','teacher_group_members','teacher_exams') THEN
IF q IS NOT NULL THEN q:='('||q||') AND public.can_use_teacher_tools()'; END IF;
IF w IS NOT NULL THEN w:='('||w||') AND public.can_use_teacher_tools()'; END IF;
END IF;
IF p.tablename='student_exam_assignments' THEN
IF q IS NOT NULL THEN q:=replace(q,'(teacher_id = auth.uid())','((teacher_id = auth.uid()) AND public.can_use_teacher_tools())'); END IF;
IF w IS NOT NULL THEN w:='('||w||') AND public.can_use_teacher_tools()'; END IF;
END IF;
EXECUTE format('ALTER POLICY %I ON public.%I%s%s',p.policyname,p.tablename,CASE WHEN q IS NULL THEN '' ELSE ' USING ('||q||')' END,CASE WHEN w IS NULL THEN '' ELSE ' WITH CHECK ('||w||')' END);
END LOOP;
END $$;
DO $$ DECLARE f text; body text; BEGIN
FOREACH f IN ARRAY ARRAY['teacher_student_plans','teacher_badges'] LOOP
SELECT pg_get_functiondef(p.oid) INTO body FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace WHERE n.nspname='public' AND p.proname=f;
body:=replace(body,'st.teacher_id=auth.uid()','(st.teacher_id=auth.uid() AND public.can_use_teacher_tools())');
EXECUTE body;
END LOOP;
END $$;