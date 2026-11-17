CREATE TABLE public.support_cases (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL, kind text NOT NULL DEFAULT 'solicitud' CHECK (kind IN ('solicitud','incidencia')), subject text NOT NULL CHECK (char_length(subject) BETWEEN 1 AND 160), notes text NOT NULL DEFAULT '' CHECK (char_length(notes) <= 2000), status text NOT NULL DEFAULT 'abierta' CHECK (status IN ('abierta','en_proceso','resuelta')), created_by uuid NOT NULL DEFAULT auth.uid(), created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.support_cases TO authenticated;
GRANT ALL ON public.support_cases TO service_role;
ALTER TABLE public.support_cases ENABLE ROW LEVEL SECURITY;
CREATE POLICY support_admin_read ON public.support_cases FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY support_admin_insert ON public.support_cases FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin') AND created_by=auth.uid());
CREATE POLICY support_admin_update ON public.support_cases FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TABLE public.account_status_history (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, user_id uuid NOT NULL, previous_status text, status text NOT NULL, changed_by uuid NOT NULL DEFAULT auth.uid(), created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.account_status_history TO authenticated;
GRANT ALL ON public.account_status_history TO service_role;
ALTER TABLE public.account_status_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY status_history_admin ON public.account_status_history FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE FUNCTION public.audit_account_status() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
 IF TG_OP='INSERT' THEN INSERT INTO public.account_status_history(user_id,previous_status,status,changed_by) VALUES(NEW.user_id,'active',NEW.status,auth.uid());
 ELSIF OLD.status IS DISTINCT FROM NEW.status THEN INSERT INTO public.account_status_history(user_id,previous_status,status,changed_by) VALUES(NEW.user_id,OLD.status,NEW.status,auth.uid()); END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER account_status_audit AFTER INSERT OR UPDATE ON public.account_status FOR EACH ROW EXECUTE FUNCTION public.audit_account_status();
CREATE FUNCTION public.admin_user_trace(_environment text DEFAULT 'live') RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public AS $$
BEGIN
 IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'forbidden'; END IF;
 IF _environment NOT IN ('live','sandbox') THEN RAISE EXCEPTION 'invalid environment'; END IF;
 RETURN jsonb_build_object(
 'payments',coalesce((SELECT jsonb_agg(to_jsonb(p)) FROM public.payments p),'[]'::jsonb),
 'subscriptions',coalesce((SELECT jsonb_agg(to_jsonb(s)) FROM public.subscriptions s WHERE s.environment=_environment),'[]'::jsonb),
 'documents',coalesce((SELECT jsonb_agg(jsonb_build_object('name',o.name,'created_at',o.created_at)) FROM storage.objects o WHERE o.bucket_id='id-documents'),'[]'::jsonb),
 'activity',coalesce((SELECT jsonb_agg(to_jsonb(a)) FROM (SELECT user_id,(created_at AT TIME ZONE 'America/Costa_Rica')::date AS day,count(*) AS attempts,sum(earned_points) AS xp FROM public.practice_attempts WHERE created_at>=now()-interval '30 days' GROUP BY user_id,(created_at AT TIME ZONE 'America/Costa_Rica')::date ORDER BY day DESC) a),'[]'::jsonb),
 'cases',coalesce((SELECT jsonb_agg(to_jsonb(c) ORDER BY c.created_at DESC) FROM public.support_cases c),'[]'::jsonb),
 'history',coalesce((SELECT jsonb_agg(to_jsonb(h) ORDER BY h.created_at DESC) FROM public.account_status_history h),'[]'::jsonb));
END $$;
REVOKE ALL ON FUNCTION public.admin_user_trace(text) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.admin_user_trace(text) TO authenticated;
CREATE OR REPLACE FUNCTION public.my_access()
RETURNS TABLE (trial_ends timestamptz, paid_until timestamptz, status text, has_access boolean)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public AS $$
DECLARE me uuid:=auth.uid(); te timestamptz; pu timestamptz; su timestamptz; st text; adm boolean;
BEGIN
 IF me IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;
 SELECT u.created_at+interval '13 days' INTO te FROM auth.users u WHERE u.id=me;
 SELECT max(p.expires_at) INTO pu FROM public.payments p WHERE p.user_id=me AND p.status IN ('active','confirmed');
 SELECT max(s.current_period_end) INTO su FROM public.subscriptions s WHERE s.user_id=me AND s.environment='live' AND s.status IN ('active','trialing','canceled') AND s.current_period_end>now();
 IF su IS NOT NULL AND (pu IS NULL OR su>pu) THEN pu:=su; END IF;
 st:=coalesce((SELECT a.status FROM public.account_status a WHERE a.user_id=me),'active');
 adm:=public.has_role(me,'admin') OR public.has_role(me,'teacher');
 RETURN QUERY SELECT te,pu,st,st NOT IN ('blocked','inactive') AND (adm OR st='gift' OR now()<te OR (pu IS NOT NULL AND now()<pu));
END $$;