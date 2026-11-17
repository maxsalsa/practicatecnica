CREATE TABLE public.access_codes(code text PRIMARY KEY CHECK (code ~ '^[A-Z0-9-]{4,32}$'), days integer NOT NULL DEFAULT 30 CHECK (days BETWEEN 1 AND 366), max_uses integer NOT NULL DEFAULT 30 CHECK (max_uses BETWEEN 1 AND 1000), uses integer NOT NULL DEFAULT 0, created_by uuid NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), active boolean NOT NULL DEFAULT true);
GRANT SELECT, UPDATE ON public.access_codes TO authenticated; GRANT ALL ON public.access_codes TO service_role;
ALTER TABLE public.access_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins read codes" ON public.access_codes FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins update codes" ON public.access_codes FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TABLE public.access_code_redemptions(code text NOT NULL REFERENCES public.access_codes(code), user_id uuid NOT NULL, redeemed_at timestamptz NOT NULL DEFAULT now(), expires_at timestamptz NOT NULL, PRIMARY KEY(code,user_id));
GRANT SELECT ON public.access_code_redemptions TO authenticated; GRANT ALL ON public.access_code_redemptions TO service_role;
ALTER TABLE public.access_code_redemptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own or admin redemptions" ON public.access_code_redemptions FOR SELECT TO authenticated USING (user_id=auth.uid() OR public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.create_access_code(_code text,_days integer,_max_uses integer) RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'forbidden'; END IF;
INSERT INTO public.access_codes(code,days,max_uses,created_by) VALUES(upper(trim(_code)),_days,_max_uses,auth.uid()); RETURN upper(trim(_code)); END $$;

CREATE OR REPLACE FUNCTION public.redeem_access_code(_code text) RETURNS timestamptz LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE me uuid:=auth.uid(); c public.access_codes; ex timestamptz;
BEGIN IF me IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;
SELECT * INTO c FROM public.access_codes WHERE code=upper(trim(_code)) FOR UPDATE;
IF c.code IS NULL OR NOT c.active THEN RAISE EXCEPTION 'Código no válido'; END IF;
IF EXISTS(SELECT 1 FROM public.access_code_redemptions WHERE code=c.code AND user_id=me) THEN RAISE EXCEPTION 'Ya usó este código'; END IF;
IF c.uses>=c.max_uses THEN RAISE EXCEPTION 'Código agotado'; END IF;
ex:=now()+make_interval(days=>c.days);
INSERT INTO public.access_code_redemptions(code,user_id,expires_at) VALUES(c.code,me,ex);
UPDATE public.access_codes SET uses=uses+1 WHERE code=c.code;
INSERT INTO public.user_roles(user_id,role) VALUES(me,'student') ON CONFLICT DO NOTHING;
RETURN ex; END $$;
REVOKE EXECUTE ON FUNCTION public.create_access_code(text,integer,integer), public.redeem_access_code(text) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.create_access_code(text,integer,integer), public.redeem_access_code(text) TO authenticated;

CREATE OR REPLACE FUNCTION public.my_access()
 RETURNS TABLE(trial_ends timestamp with time zone, paid_until timestamp with time zone, status text, has_access boolean)
 LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE me uuid:=auth.uid(); te timestamptz; pu timestamptz; su timestamptz; cu timestamptz; st text; adm boolean;
BEGIN
 IF me IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;
 SELECT u.created_at+interval '13 days' INTO te FROM auth.users u WHERE u.id=me;
 SELECT max(p.expires_at) INTO pu FROM public.payments p WHERE p.user_id=me AND (p.status='confirmed' OR (p.status='active' AND p.method='sinpe' AND p.plan='docente' AND p.amount=3500));
 SELECT max(s.current_period_end) INTO su FROM public.subscriptions s WHERE s.user_id=me AND s.environment='live' AND s.status IN ('active','trialing','canceled') AND s.current_period_end>now();
 IF su IS NOT NULL AND (pu IS NULL OR su>pu) THEN pu:=su; END IF;
 SELECT max(r.expires_at) INTO cu FROM public.access_code_redemptions r JOIN public.access_codes c ON c.code=r.code WHERE r.user_id=me AND c.active;
 IF cu IS NOT NULL AND (pu IS NULL OR cu>pu) THEN pu:=cu; END IF;
 st:=coalesce((SELECT a.status FROM public.account_status a WHERE a.user_id=me),'active');
 adm:=public.has_role(me,'admin');
 RETURN QUERY SELECT te,pu,st,st NOT IN ('blocked','inactive') AND (adm OR st='gift' OR now()<te OR (pu IS NOT NULL AND now()<pu));
END $function$;