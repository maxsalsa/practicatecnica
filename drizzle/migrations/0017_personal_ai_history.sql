CREATE TABLE public.ai_generations (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE, created_at timestamptz NOT NULL DEFAULT now(), document_name text NOT NULL, model text NOT NULL, questions jsonb NOT NULL DEFAULT '[]'::jsonb, input_tokens integer, output_tokens integer, actual_credits numeric(16,8), gateway_request_id text, CONSTRAINT ai_cost_nonnegative CHECK (actual_credits IS NULL OR actual_credits >= 0));
GRANT SELECT ON public.ai_generations TO authenticated;
GRANT ALL ON public.ai_generations TO service_role;
ALTER TABLE public.ai_generations ENABLE ROW LEVEL SECURITY;
CREATE POLICY ai_history_own_read ON public.ai_generations FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE INDEX ai_history_user_date ON public.ai_generations(user_id, created_at DESC);
COMMENT ON COLUMN public.ai_generations.actual_credits IS 'Provider-confirmed credits only; NULL means unknown, never substitute an estimate.';