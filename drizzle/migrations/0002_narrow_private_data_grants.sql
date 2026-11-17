REVOKE ALL ON public.profiles,public.user_roles,public.students,public.practice_attempts,public.teacher_access FROM anon;
REVOKE ALL ON public.profiles,public.user_roles,public.students,public.practice_attempts,public.teacher_access FROM authenticated;
GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT ON public.user_roles,public.students,public.practice_attempts,public.teacher_access TO authenticated;
GRANT ALL ON public.profiles,public.user_roles,public.students,public.practice_attempts,public.teacher_access TO service_role;