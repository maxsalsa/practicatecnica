CREATE OR REPLACE FUNCTION public.my_access()
RETURNS TABLE (trial_ends timestamptz, paid_until timestamptz, status text, has_access boolean)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE me uuid := auth.uid(); te timestamptz; pu timestamptz; st text; adm boolean;
BEGIN
  IF me IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;
  SELECT u.created_at + interval '13 days' INTO te FROM auth.users u WHERE u.id = me;
  SELECT max(p.expires_at) INTO pu FROM payments p WHERE p.user_id = me AND p.status = 'confirmed';
  st := COALESCE((SELECT s.status FROM account_status s WHERE s.user_id = me), 'active');
  adm := public.has_role(me, 'admin') OR public.has_role(me, 'teacher');
  RETURN QUERY SELECT te, pu, st,
    st <> 'blocked' AND (adm OR st = 'gift' OR now() < te OR (pu IS NOT NULL AND now() < pu));
END $$;
REVOKE EXECUTE ON FUNCTION public.my_access() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_access() TO authenticated;