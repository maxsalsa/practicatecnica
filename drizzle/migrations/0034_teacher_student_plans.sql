CREATE OR REPLACE FUNCTION public.teacher_student_plans()
RETURNS TABLE(student_id uuid, trial_ends timestamptz, paid_until timestamptz, has_access boolean)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
 WITH s AS (SELECT st.id, st.user_id FROM public.students st WHERE st.user_id IS NOT NULL AND (st.teacher_id=auth.uid() OR public.has_role(auth.uid(),'admin'))),
 p AS (SELECT s.id, u.created_at+interval '13 days' te,
  greatest((SELECT max(x.expires_at) FROM public.payments x WHERE x.user_id=s.user_id AND x.status='confirmed'),
   (SELECT max(c.current_period_end) FROM public.subscriptions c WHERE c.user_id=s.user_id AND c.environment='live' AND c.status IN ('active','trialing','canceled')),
   (SELECT max(r.expires_at) FROM public.access_code_redemptions r JOIN public.access_codes k ON k.code=r.code WHERE r.user_id=s.user_id AND k.active)) pu,
  coalesce((SELECT a.status FROM public.account_status a WHERE a.user_id=s.user_id),'active') st
  FROM s JOIN auth.users u ON u.id=s.user_id)
 SELECT id, te, pu, st NOT IN ('blocked','inactive') AND (st='gift' OR now()<te OR (pu IS NOT NULL AND now()<pu)) FROM p;
$$;
REVOKE ALL ON FUNCTION public.teacher_student_plans() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.teacher_student_plans() TO authenticated;