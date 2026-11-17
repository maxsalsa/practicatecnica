CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  email text,
  plan text NOT NULL CHECK (plan IN ('estudiante','general')),
  amount integer NOT NULL,
  method text NOT NULL DEFAULT 'sinpe',
  payer_phone text NOT NULL,
  reference text NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','confirmed','rejected')),
  expires_at timestamptz NOT NULL DEFAULT now() + interval '1 year',
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.payments TO authenticated;
GRANT UPDATE (status, reviewed_at) ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own payments read" ON public.payments FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "own payments insert" ON public.payments FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND status = 'active'
    AND ((plan = 'estudiante' AND amount = 1500) OR (plan = 'general' AND amount = 3500)));
CREATE POLICY "admin review" ON public.payments FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));