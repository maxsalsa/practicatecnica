create or replace function public.admin_card_revenue()
returns table(user_id uuid, email text, price_id text, product_id text, status text, current_period_end timestamptz, cancel_at_period_end boolean, created_at timestamptz)
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.has_role(auth.uid(), 'admin') then raise exception 'forbidden'; end if;
  return query select s.user_id, u.email::text, s.price_id, s.product_id, s.status, s.current_period_end, coalesce(s.cancel_at_period_end,false), s.created_at
    from public.subscriptions s left join auth.users u on u.id = s.user_id
    where s.environment = 'live' order by s.created_at desc;
end $$;
revoke all on function public.admin_card_revenue() from public, anon;
grant execute on function public.admin_card_revenue() to authenticated;