CREATE OR REPLACE FUNCTION public.my_access()
 RETURNS TABLE(trial_ends timestamp with time zone, paid_until timestamp with time zone, status text, has_access boolean)
 LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE me uuid:=auth.uid(); te timestamptz; pu timestamptz; su timestamptz; cu timestamptz; st text; adm boolean;
BEGIN
 IF me IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;
 SELECT u.created_at+interval '13 days' INTO te FROM auth.users u WHERE u.id=me;
 SELECT max(p.expires_at) INTO pu FROM public.payments p WHERE p.user_id=me AND p.status='confirmed';
 SELECT max(s.current_period_end) INTO su FROM public.subscriptions s WHERE s.user_id=me AND s.environment='live' AND s.status IN ('active','trialing','past_due','canceled') AND s.current_period_end>now();
 IF su IS NOT NULL AND (pu IS NULL OR su>pu) THEN pu:=su; END IF;
 SELECT max(r.expires_at) INTO cu FROM public.access_code_redemptions r JOIN public.access_codes c ON c.code=r.code WHERE r.user_id=me AND c.active;
 IF cu IS NOT NULL AND (pu IS NULL OR cu>pu) THEN pu:=cu; END IF;
 st:=coalesce((SELECT a.status FROM public.account_status a WHERE a.user_id=me),'active');
 adm:=public.has_role(me,'admin');
 RETURN QUERY SELECT te,pu,st,st NOT IN ('blocked','inactive') AND (adm OR st='gift' OR now()<te OR (pu IS NOT NULL AND now()<pu));
END $function$;

CREATE OR REPLACE FUNCTION public.paid_through(_user uuid) RETURNS timestamptz LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
 SELECT greatest(now(), coalesce((SELECT max(expires_at) FROM public.payments WHERE user_id=_user AND status='confirmed'), now()));
$$;
REVOKE ALL ON FUNCTION public.paid_through(uuid) FROM public, anon, authenticated;

CREATE OR REPLACE FUNCTION public.start_confirmed_payment_period() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
 IF NEW.status='confirmed' AND OLD.status IS DISTINCT FROM 'confirmed' THEN NEW.expires_at:=public.paid_through(NEW.user_id)+interval '1 year'; NEW.reviewed_at:=now(); END IF;
 RETURN NEW;
END $$;
CREATE OR REPLACE FUNCTION public.initialize_confirmed_payment_period() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
 IF NEW.status='confirmed' THEN NEW.expires_at:=public.paid_through(NEW.user_id)+interval '1 year'; NEW.reviewed_at:=coalesce(NEW.reviewed_at,now()); END IF;
 RETURN NEW;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS payments_sinpe_reference_uniq ON public.payments (lower(reference)) WHERE method='sinpe' AND status<>'rejected';