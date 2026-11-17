CREATE OR REPLACE FUNCTION public.my_access()
RETURNS TABLE (trial_ends timestamptz, paid_until timestamptz, status text, has_access boolean)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public AS $$
DECLARE me uuid:=auth.uid(); te timestamptz; pu timestamptz; su timestamptz; st text; adm boolean;
BEGIN
 IF me IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;
 SELECT u.created_at+interval '13 days' INTO te FROM auth.users u WHERE u.id=me;
 SELECT max(p.expires_at) INTO pu FROM public.payments p WHERE p.user_id=me AND p.status='confirmed';
 SELECT max(s.current_period_end) INTO su FROM public.subscriptions s WHERE s.user_id=me AND s.environment='live' AND s.status IN ('active','trialing','canceled') AND s.current_period_end>now();
 IF su IS NOT NULL AND (pu IS NULL OR su>pu) THEN pu:=su; END IF;
 st:=coalesce((SELECT a.status FROM public.account_status a WHERE a.user_id=me),'active');
 adm:=public.has_role(me,'admin') OR public.has_role(me,'teacher');
 RETURN QUERY SELECT te,pu,st,st NOT IN ('blocked','inactive') AND (adm OR st='gift' OR now()<te OR (pu IS NOT NULL AND now()<pu));
END $$;
REVOKE ALL ON FUNCTION public.my_access() FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.my_access() TO authenticated;
COMMENT ON COLUMN public.payments.status IS 'active means pending administrative verification, not paid access; only confirmed grants payment access.';
CREATE OR REPLACE FUNCTION public.start_confirmed_payment_period() RETURNS trigger LANGUAGE plpgsql SET search_path=public AS $$
BEGIN
 IF NEW.status='confirmed' AND OLD.status IS DISTINCT FROM 'confirmed' THEN NEW.expires_at:=now()+interval '1 year'; NEW.reviewed_at:=now(); END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER confirmed_payment_period BEFORE UPDATE OF status ON public.payments FOR EACH ROW EXECUTE FUNCTION public.start_confirmed_payment_period();
ALTER POLICY "own payments insert" ON public.payments WITH CHECK (auth.uid()=user_id AND status='active' AND method='sinpe' AND reviewed_at IS NULL AND expires_at<=now()+interval '1 year' AND ((plan='estudiante' AND amount=1500) OR (plan='general' AND amount=3500)));