CREATE TABLE public.account_status (
  user_id uuid PRIMARY KEY,
  status text NOT NULL DEFAULT 'active',
  note text NOT NULL DEFAULT '',
  updated_by uuid,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.account_status TO authenticated;
GRANT ALL ON public.account_status TO service_role;
ALTER TABLE public.account_status ENABLE ROW LEVEL SECURITY;
CREATE POLICY status_read ON public.account_status FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY status_admin_ins ON public.account_status FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY status_admin_upd ON public.account_status FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.page_visits (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  path text NOT NULL,
  user_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.page_visits TO anon, authenticated;
GRANT SELECT ON public.page_visits TO authenticated;
GRANT ALL ON public.page_visits TO service_role;
ALTER TABLE public.page_visits ENABLE ROW LEVEL SECURITY;
CREATE POLICY visits_insert ON public.page_visits FOR INSERT TO anon, authenticated WITH CHECK (char_length(path) <= 200 AND (user_id IS NULL OR user_id = auth.uid()));
CREATE POLICY visits_admin_read ON public.page_visits FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.admin_user_overview()
RETURNS TABLE(user_id uuid, email text, display_name text, created_at timestamptz, last_sign_in timestamptz, xp bigint, attempts bigint, avg_score numeric, paid_plan text, paid_until timestamptz, status text)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'forbidden'; END IF;
  RETURN QUERY
  SELECT u.id, u.email::text, coalesce(p.display_name,''), u.created_at, u.last_sign_in_at,
    coalesce((SELECT sum(a.earned_points) FROM practice_attempts a WHERE a.user_id=u.id),0)::bigint,
    (SELECT count(*) FROM practice_attempts a WHERE a.user_id=u.id),
    (SELECT round(avg(a.score),0) FROM practice_attempts a WHERE a.user_id=u.id),
    (SELECT pm.plan FROM payments pm WHERE pm.user_id=u.id ORDER BY pm.created_at DESC LIMIT 1),
    (SELECT pm.expires_at FROM payments pm WHERE pm.user_id=u.id ORDER BY pm.created_at DESC LIMIT 1),
    coalesce((SELECT s.status FROM account_status s WHERE s.user_id=u.id),'active')
  FROM auth.users u LEFT JOIN profiles p ON p.id=u.id
  ORDER BY u.created_at DESC;
END $$;
REVOKE ALL ON FUNCTION public.admin_user_overview() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.admin_user_overview() TO authenticated;