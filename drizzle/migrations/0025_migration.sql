CREATE OR REPLACE FUNCTION public.my_access()
 RETURNS TABLE(trial_ends timestamp with time zone, paid_until timestamp with time zone, status text, has_access boolean)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE me uuid:=auth.uid(); te timestamptz; pu timestamptz; su timestamptz; st text; adm boolean;
BEGIN
 IF me IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;
 SELECT u.created_at+interval '13 days' INTO te FROM auth.users u WHERE u.id=me;
 -- Confirmed payments, plus owner-requested auto-activation of pending teacher SINPE submissions (admin can still reject them).
 SELECT max(p.expires_at) INTO pu FROM public.payments p WHERE p.user_id=me AND (p.status='confirmed' OR (p.status='active' AND p.method='sinpe' AND p.plan='docente' AND p.amount=3500));
 SELECT max(s.current_period_end) INTO su FROM public.subscriptions s WHERE s.user_id=me AND s.environment='live' AND s.status IN ('active','trialing','canceled') AND s.current_period_end>now();
 IF su IS NOT NULL AND (pu IS NULL OR su>pu) THEN pu:=su; END IF;
 st:=coalesce((SELECT a.status FROM public.account_status a WHERE a.user_id=me),'active');
 adm:=public.has_role(me,'admin');
 RETURN QUERY SELECT te,pu,st,st NOT IN ('blocked','inactive') AND (adm OR st='gift' OR now()<te OR (pu IS NOT NULL AND now()<pu));
END $function$;