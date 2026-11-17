ALTER TABLE public.payments DROP CONSTRAINT payments_plan_check;
ALTER TABLE public.payments ADD CONSTRAINT payments_plan_check CHECK (plan IN ('estudiante','general','docente'));
CREATE TABLE public.paypal_quotes (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL REFERENCES public.profiles(id), plan text NOT NULL CHECK (plan='docente'), crc_amount integer NOT NULL CHECK (crc_amount=3500), usd_amount numeric(10,2) NOT NULL CHECK (usd_amount>0), crc_per_usd numeric NOT NULL CHECK (crc_per_usd>0), rate_source text NOT NULL, rate_date timestamptz NOT NULL, expires_at timestamptz NOT NULL DEFAULT now()+interval '30 minutes', order_id text UNIQUE, created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.paypal_quotes TO authenticated;
GRANT ALL ON public.paypal_quotes TO service_role;
ALTER TABLE public.paypal_quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY paypal_quotes_owner_read ON public.paypal_quotes FOR SELECT TO authenticated USING(user_id=auth.uid());
ALTER TABLE public.payments ADD COLUMN paypal_quote_id uuid REFERENCES public.paypal_quotes(id);
CREATE UNIQUE INDEX payments_paypal_quote_unique ON public.payments(paypal_quote_id) WHERE paypal_quote_id IS NOT NULL;
CREATE UNIQUE INDEX payments_paypal_capture_unique ON public.payments(reference) WHERE method='paypal';
DROP POLICY "own payments insert" ON public.payments;
CREATE POLICY "own payments insert" ON public.payments FOR INSERT TO authenticated WITH CHECK(auth.uid()=user_id AND status='active' AND method='sinpe' AND reviewed_at IS NULL AND paypal_quote_id IS NULL AND expires_at<=now()+interval '1 year' AND ((plan='estudiante' AND amount=1500) OR (plan IN ('general','docente') AND amount=3500)));
CREATE OR REPLACE FUNCTION public.initialize_confirmed_payment_period() RETURNS trigger LANGUAGE plpgsql SET search_path=public AS $$ BEGIN IF NEW.status='confirmed' THEN NEW.expires_at:=now()+interval '1 year'; NEW.reviewed_at:=now(); END IF; RETURN NEW; END; $$;
CREATE TRIGGER confirmed_payment_insert BEFORE INSERT ON public.payments FOR EACH ROW EXECUTE FUNCTION public.initialize_confirmed_payment_period();