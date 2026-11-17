create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  paddle_subscription_id text not null unique,
  paddle_customer_id text not null,
  product_id text not null,
  price_id text not null,
  status text not null default 'active',
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  environment text not null default 'sandbox',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index idx_subscriptions_user_id on public.subscriptions(user_id);
grant select on public.subscriptions to authenticated;
grant all on public.subscriptions to service_role;
alter table public.subscriptions enable row level security;
create policy "own subscriptions" on public.subscriptions for select to authenticated using (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.my_access()
RETURNS TABLE (trial_ends timestamptz, paid_until timestamptz, status text, has_access boolean)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE me uuid := auth.uid(); te timestamptz; pu timestamptz; su timestamptz; st text; adm boolean;
BEGIN
  IF me IS NULL THEN RAISE EXCEPTION 'auth required'; END IF;
  SELECT u.created_at + interval '13 days' INTO te FROM auth.users u WHERE u.id = me;
  SELECT max(p.expires_at) INTO pu FROM payments p WHERE p.user_id = me AND p.status = 'confirmed';
  SELECT max(coalesce(s.current_period_end, now() + interval '1 day')) INTO su FROM subscriptions s
    WHERE s.user_id = me AND s.status IN ('active','trialing','past_due','canceled');
  IF su IS NOT NULL AND (pu IS NULL OR su > pu) THEN pu := su; END IF;
  st := COALESCE((SELECT s.status FROM account_status s WHERE s.user_id = me), 'active');
  adm := public.has_role(me, 'admin') OR public.has_role(me, 'teacher');
  RETURN QUERY SELECT te, pu, st,
    st <> 'blocked' AND (adm OR st = 'gift' OR now() < te OR (pu IS NOT NULL AND now() < pu));
END $$;
REVOKE EXECUTE ON FUNCTION public.my_access() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_access() TO authenticated;