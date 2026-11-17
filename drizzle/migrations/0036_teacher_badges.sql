CREATE OR REPLACE FUNCTION public.teacher_badges()
RETURNS TABLE(student_name text, title text, score integer, issued_at timestamptz, revoked boolean, hash text)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
 SELECT st.name, c.title, c.score, c.issued_at, c.revoked_at IS NOT NULL, c.hash
 FROM public.students st JOIN public.certificates c ON c.user_id=st.user_id
 WHERE st.user_id IS NOT NULL AND (st.teacher_id=auth.uid() OR public.has_role(auth.uid(),'admin'))
 ORDER BY c.issued_at DESC LIMIT 2000;
$$;
REVOKE ALL ON FUNCTION public.teacher_badges() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.teacher_badges() TO authenticated;