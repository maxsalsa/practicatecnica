-- Identity and durable delivery. Application passwords remain in Supabase Auth.
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to authenticated, service_role;

create table private.accounts (
 user_id uuid primary key references auth.users(id) on delete cascade,
 email text not null unique check(email=lower(btrim(email))),
 state text not null default 'pending_email' check(state in ('pending_email','password_change','active','disabled','deleting')),
 security_epoch integer not null default 1 check(security_epoch>0),
 must_change boolean not null default true,
 temporary_expires_at timestamptz, verified_at timestamptz,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 name text not null check(char_length(name) between 2 and 120),
 group_name text not null check(char_length(group_name) between 1 and 40),
 specialty_code text not null,
 theme text not null default 'system' check(theme in ('light','dark','system')),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table private.owner_reservation (
 singleton boolean primary key default true check(singleton),
 email text not null check(email='maxi.salsa@gmail.com'), created_at timestamptz not null default now()
);
create table private.platform_owner (
 singleton boolean primary key default true check(singleton),
 user_id uuid not null unique references auth.users(id) on delete restrict,
 created_at timestamptz not null default now()
);
create table private.app_sessions (
 session_id uuid primary key,
 user_id uuid not null references auth.users(id) on delete cascade,
 security_epoch integer not null,
 scope text not null check(scope in ('password_change','mfa_setup','mfa_challenge','student','owner_admin','owner_student')),
 purpose text not null default 'login' check(purpose in ('login','recovery')),
 requires_mfa boolean not null default false,
 expires_at timestamptz not null, revoked_at timestamptz,
 created_at timestamptz not null default now()
);
create index app_sessions_user on private.app_sessions(user_id);
create table private.registrations (
 id uuid primary key default gen_random_uuid(),
 email text not null unique check(email=lower(btrim(email))),
 user_id uuid unique references auth.users(id) on delete cascade,
 name text not null, group_name text not null, specialty_code text not null,
 credential_cipher text, credential_version integer not null default 1,
 state text not null default 'reserved' check(state in ('reserved','provisioning','pending_email','verified','active','cancelled')),
 lease_token uuid, lease_until timestamptz,
 consent_version text not null default '2026-09-24', consent_at timestamptz not null default now(),
 verified_at timestamptz, temporary_expires_at timestamptz,
 verification_digest text, verification_expires_at timestamptz,
 last_reconciled_at timestamptz not null default '1970-01-01',
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table private.security_operations (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 kind text not null check(kind in ('password','recovery','email_change')),
 expected_epoch integer not null,
 state text not null default 'pending' check(state in ('pending','completed','cancelled')),
 token_hash text, destination text,
 expires_at timestamptz not null default now()+interval '1 hour',
 created_at timestamptz not null default now(), completed_at timestamptz,
 last_reconciled_at timestamptz not null default '1970-01-01'
);
create table private.rate_limits (
 key text primary key, count integer not null default 0,
 window_at timestamptz not null default now(), last_at timestamptz, blocked_until timestamptz
);
create table private.mail_outbox (
 id uuid primary key default gen_random_uuid(),
 user_id uuid references auth.users(id) on delete cascade,
 registration_id uuid references private.registrations(id) on delete cascade,
 recipient text not null,
 kind text not null check(kind in ('verification','welcome','recovery','invitation','test')),
 dedupe_key text not null unique, credential_version integer, payload_cipher text,
 state text not null default 'queued' check(state in ('queued','processing','accepted','delivered','bounced','complained','failed','expired','cancelled')),
 provider_id text unique, attempts integer not null default 0,
 next_attempt_at timestamptz not null default now(), expires_at timestamptz not null,
 lease_token uuid, lease_until timestamptz,
 last_error text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index mail_outbox_due on private.mail_outbox(next_attempt_at) where state in ('queued','processing');
create table private.mail_events (
 event_id text primary key, provider_id text not null, event_type text not null,
 occurred_at timestamptz not null, received_at timestamptz not null default now()
);
create table private.mail_suppressions (email text primary key, reason text not null, created_at timestamptz not null default now());
create table private.audit_log (
 id bigint generated always as identity primary key,
 actor_id uuid, subject_id uuid, action text not null,
 detail jsonb not null default '{}'::jsonb, created_at timestamptz not null default now()
);

create function private.is_owner() returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from private.platform_owner o where o.user_id=auth.uid())
$$;
create function private.session_valid() returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from private.app_sessions s join private.accounts a on a.user_id=s.user_id
 where s.user_id=auth.uid() and s.session_id::text=(auth.jwt()->>'session_id')
 and s.revoked_at is null and s.expires_at>now() and s.security_epoch=a.security_epoch
 and a.state not in ('disabled','deleting','pending_email')
 and exists(select 1 from auth.users auth_user where auth_user.id=a.user_id and lower(auth_user.email)=a.email and auth_user.email_confirmed_at is not null))
$$;
create function private.can_study() returns boolean language sql stable security definer set search_path='' as $$
 select private.session_valid() and exists(
 select 1 from private.app_sessions s join private.accounts a on a.user_id=s.user_id
 where s.session_id::text=(auth.jwt()->>'session_id') and s.user_id=auth.uid()
 and a.state='active' and not a.must_change
 and s.scope in ('student','owner_admin','owner_student')
 and (not exists(select 1 from private.platform_owner o where o.user_id=s.user_id) or
 (auth.jwt()->>'aal'='aal2' and a.email='maxi.salsa@gmail.com' and exists(select 1 from auth.mfa_factors factor where factor.user_id=a.user_id and factor.factor_type='totp' and factor.status='verified'))))
$$;
create function private.can_administer() returns boolean language sql stable security definer set search_path='' as $$
 select private.can_study() and private.is_owner() and auth.jwt()->>'aal'='aal2'
 and exists(select 1 from private.app_sessions s where s.user_id=auth.uid()
 and s.session_id::text=(auth.jwt()->>'session_id') and s.scope='owner_admin')
$$;
revoke all on function private.is_owner(), private.session_valid(), private.can_study(), private.can_administer() from public, anon;
grant execute on function private.is_owner(), private.session_valid(), private.can_study(), private.can_administer() to authenticated,service_role;
alter table public.profiles enable row level security;
create policy profiles_read on public.profiles for select to authenticated using ((id=auth.uid() and private.can_study()) or private.can_administer());
grant select on public.profiles to authenticated;
revoke all on all tables in schema private from public, anon, authenticated;

create function public.service_auth(action text, payload jsonb default '{}'::jsonb) returns jsonb
language plpgsql security definer set search_path='' as $$
declare
 r private.registrations%rowtype; a private.accounts%rowtype; ss private.app_sessions%rowtype;
 op private.security_operations%rowtype; m private.mail_outbox%rowtype; rate private.rate_limits%rowtype;
 v_user uuid; v_session uuid; v_id uuid; v_email text; v_scope text; v_owner boolean;
 v_now timestamptz:=now(); v_result jsonb; v_count integer; v_limit integer; v_window integer;
begin
 if action='reserve_owner' then
   if payload->>'email'<>'maxi.salsa@gmail.com' then raise exception 'OWNER_EMAIL_INVALID'; end if;
   insert into private.owner_reservation(email) values('maxi.salsa@gmail.com') on conflict(singleton) do nothing;
   return jsonb_build_object('reserved',true,'bound',exists(select 1 from private.platform_owner));
 elsif action='registration_reserve' then
   v_email:=payload->>'email';
   if v_email is null or v_email<>lower(btrim(v_email)) then raise exception 'EMAIL_INVALID'; end if;
   if v_email='maxi.salsa@gmail.com' and not exists(select 1 from private.owner_reservation) then return jsonb_build_object('blocked',true); end if;
   insert into private.registrations(email,name,group_name,specialty_code,credential_cipher)
   values(v_email,payload->>'name',payload->>'group',payload->>'specialty',payload->>'credential_cipher') on conflict(email) do nothing;
   select * into r from private.registrations where email=v_email for update;
   if r.state in ('verified','active','cancelled') then return jsonb_build_object('existing',true,'state',r.state); end if;
   if r.lease_until>v_now then return jsonb_build_object('busy',true); end if;
   update private.registrations set lease_token=gen_random_uuid(),lease_until=v_now+interval '2 minutes',state=case when user_id is null then 'provisioning' else state end,updated_at=v_now where id=r.id returning * into r;
   return to_jsonb(r);
 elsif action='registration_get' then
   select * into r from private.registrations where (payload ? 'id' and id=(payload->>'id')::uuid) or (payload ? 'email' and email=payload->>'email');
   return case when r.id is null then null else to_jsonb(r) end;
 elsif action='registration_link' then
   select * into r from private.registrations where id=(payload->>'id')::uuid for update;
   if r.id is null or r.lease_token is distinct from (payload->>'lease_token')::uuid or r.lease_until<v_now then raise exception 'LEASE_LOST'; end if;
   v_user:=(payload->>'user_id')::uuid;
   if r.user_id is not null and r.user_id<>v_user then raise exception 'IDENTITY_CONFLICT'; end if;
   if exists(select 1 from private.accounts where user_id=v_user and email<>r.email) then raise exception 'IDENTITY_CONFLICT'; end if;
   insert into private.accounts(user_id,email) values(v_user,r.email) on conflict(user_id) do nothing;
   insert into public.profiles(id,name,group_name,specialty_code) values(v_user,r.name,r.group_name,r.specialty_code) on conflict(id) do nothing;
   if r.email='maxi.salsa@gmail.com' then
     if not exists(select 1 from private.owner_reservation) then raise exception 'OWNER_NOT_RESERVED'; end if;
     insert into private.platform_owner(user_id) values(v_user) on conflict(singleton) do nothing;
     if not exists(select 1 from private.platform_owner where user_id=v_user) then raise exception 'OWNER_ALREADY_BOUND'; end if;
   end if;
   update private.registrations set user_id=v_user,state='pending_email',verification_digest=payload->>'verification_digest',verification_expires_at=v_now+interval '1 hour',lease_until=null,lease_token=null,updated_at=v_now where id=r.id returning * into r;
   return to_jsonb(r);
 elsif action='registration_release' then
   update private.registrations set lease_token=null,lease_until=null where id=(payload->>'id')::uuid and lease_token=(payload->>'lease_token')::uuid;
   return '{}'::jsonb;
 elsif action='registration_verified' then
   select * into r from private.registrations where id=(payload->>'id')::uuid for update;
   if r.user_id is distinct from (payload->>'user_id')::uuid or r.email is distinct from payload->>'email' then raise exception 'IDENTITY_CONFLICT'; end if;
   select * into a from private.accounts where user_id=r.user_id for update;
   if a.state in ('disabled','deleting') or r.state='cancelled' then raise exception 'ACCOUNT_DISABLED'; end if;
   if a.verified_at is null then
     update private.accounts set verified_at=v_now,temporary_expires_at=v_now+interval '24 hours',state='password_change',updated_at=v_now where user_id=r.user_id;
     update private.registrations set verified_at=v_now,temporary_expires_at=v_now+interval '24 hours',state='verified',updated_at=v_now where id=r.id returning * into r;
     update private.mail_outbox set state='cancelled',payload_cipher=null,updated_at=v_now where registration_id=r.id and kind='verification' and state in ('queued','processing','failed');
   end if;
   return to_jsonb(r);
 elsif action='reconcile_registrations' then
   with candidates as (select registration_row.id from private.registrations registration_row join private.accounts account_row on account_row.user_id=registration_row.user_id where registration_row.state in ('pending_email','verified') and account_row.state in ('pending_email','password_change') order by registration_row.last_reconciled_at limit 5 for update of registration_row skip locked), checked as (update private.registrations set last_reconciled_at=v_now where id in (select id from candidates) returning id,user_id,email,state)
   select coalesce(jsonb_agg(to_jsonb(checked)),'[]'::jsonb) into v_result from checked;
   return v_result;
 elsif action='account_get' then
   select * into a from private.accounts where (payload ? 'user_id' and user_id=(payload->>'user_id')::uuid) or (payload ? 'email' and email=payload->>'email');
   if a.user_id is null then return null; end if;
   return to_jsonb(a)||jsonb_build_object('owner',exists(select 1 from private.platform_owner where user_id=a.user_id));
 elsif action='session_register' then
   v_user:=(payload->>'user_id')::uuid; v_session:=(payload->>'session_id')::uuid;
   select * into a from private.accounts where user_id=v_user for update;
   if a.user_id is null or a.state in ('disabled','deleting','pending_email') then raise exception 'ACCOUNT_DISABLED'; end if;
   v_owner:=exists(select 1 from private.platform_owner where user_id=v_user);
   if payload->>'purpose'='recovery' then
     v_scope:=case when v_owner and payload->>'aal' is distinct from 'aal2' then case when coalesce((payload->>'has_factor')::boolean,false) then 'mfa_challenge' else 'mfa_setup' end else 'password_change' end;
   elsif a.must_change then
     if a.temporary_expires_at<=v_now then raise exception 'TEMPORARY_EXPIRED'; end if;
     v_scope:='password_change';
   elsif v_owner then
     v_scope:=case when payload->>'aal'='aal2' then 'owner_admin' when coalesce((payload->>'has_factor')::boolean,false) then 'mfa_challenge' else 'mfa_setup' end;
   else v_scope:='student'; end if;
   if exists(select 1 from private.app_sessions where session_id=v_session and revoked_at is not null) then raise exception 'SESSION_REVOKED'; end if;
   insert into private.app_sessions(session_id,user_id,security_epoch,scope,purpose,requires_mfa,expires_at)
   values(v_session,v_user,a.security_epoch,v_scope,coalesce(payload->>'purpose','login'),v_owner and coalesce((payload->>'has_factor')::boolean,false),v_now+case when v_owner then interval '8 hours' else interval '24 hours' end)
   on conflict(session_id) do update set scope=excluded.scope,requires_mfa=excluded.requires_mfa where private.app_sessions.user_id=excluded.user_id and private.app_sessions.security_epoch=excluded.security_epoch;
   return jsonb_build_object('scope',v_scope,'owner',v_owner,'epoch',a.security_epoch);
 elsif action='context' then
   select * into ss from private.app_sessions where session_id=(payload->>'session_id')::uuid and user_id=(payload->>'user_id')::uuid;
   select * into a from private.accounts where user_id=ss.user_id;
   if ss.session_id is null or ss.revoked_at is not null or ss.expires_at<=v_now or ss.security_epoch<>a.security_epoch or a.state in ('pending_email','disabled','deleting') then return null; end if;
   if ss.scope='password_change' and ss.purpose<>'recovery' and a.must_change and a.temporary_expires_at<=v_now then return null; end if;
   return jsonb_build_object('account',to_jsonb(a),'session',to_jsonb(ss),'profile',(select to_jsonb(p) from public.profiles p where p.id=a.user_id),'owner',exists(select 1 from private.platform_owner where user_id=a.user_id));
 elsif action='session_revoke' then
   update private.app_sessions set revoked_at=v_now where session_id=(payload->>'session_id')::uuid and user_id=(payload->>'user_id')::uuid;
   return '{}'::jsonb;
 elsif action='session_view' then
   if payload->>'mode' not in ('student','admin') or payload->>'aal' is distinct from 'aal2' then raise exception 'FORBIDDEN'; end if;
   update private.app_sessions s set scope=case when payload->>'mode'='admin' then 'owner_admin' else 'owner_student' end
   from private.accounts account_row where account_row.user_id=s.user_id and s.user_id=(payload->>'user_id')::uuid and s.session_id=(payload->>'session_id')::uuid
   and s.revoked_at is null and s.expires_at>v_now and account_row.state='active' and s.security_epoch=account_row.security_epoch
   and exists(select 1 from private.platform_owner o where o.user_id=s.user_id) and s.scope in ('owner_admin','owner_student');
   if not found then raise exception 'FORBIDDEN'; end if;
   return '{}'::jsonb;
 elsif action='password_begin' then
   v_user:=(payload->>'user_id')::uuid;
   select * into a from private.accounts where user_id=v_user for update;
   select * into ss from private.app_sessions where session_id=(payload->>'session_id')::uuid and user_id=v_user;
   if a.state not in ('password_change','active') or ss.session_id is null or ss.revoked_at is not null or ss.expires_at<=v_now or ss.security_epoch<>a.security_epoch or ss.scope in ('mfa_setup','mfa_challenge') then raise exception 'FORBIDDEN'; end if;
   if (ss.requires_mfa or (ss.purpose='recovery' and exists(select 1 from private.platform_owner where user_id=ss.user_id))) and payload->>'aal' is distinct from 'aal2' then raise exception 'FORBIDDEN'; end if;
   if exists(select 1 from private.security_operations where user_id=v_user and kind='password' and state='pending' and expires_at>v_now) then raise exception 'OPERATION_BUSY'; end if;
   insert into private.security_operations(user_id,kind,expected_epoch,expires_at) values(v_user,'password',a.security_epoch,v_now+interval '2 minutes') returning * into op;
   return to_jsonb(op);
 elsif action='password_finish' then
   select * into op from private.security_operations where id=(payload->>'id')::uuid and kind='password' for update;
   select * into a from private.accounts where user_id=op.user_id for update;
   if op.state='completed' then return jsonb_build_object('completed',true); end if;
   if op.id is null or op.state<>'pending' or op.expires_at<v_now or a.security_epoch<>op.expected_epoch or a.state not in ('password_change','active') then raise exception 'OPERATION_CANCELLED'; end if;
   update private.accounts set state='active',must_change=false,temporary_expires_at=null,security_epoch=security_epoch+1,updated_at=v_now where user_id=a.user_id;
   update private.app_sessions set revoked_at=v_now where user_id=a.user_id;
   update private.registrations set credential_cipher=null,state='active',temporary_expires_at=null,updated_at=v_now where user_id=a.user_id;
   update private.mail_outbox set state='cancelled',payload_cipher=null,updated_at=v_now where user_id=a.user_id and kind in ('verification','welcome','recovery') and state in ('queued','processing','failed');
   update private.security_operations set state='cancelled' where user_id=a.user_id and state='pending' and id<>op.id;
   update private.security_operations set state='completed',completed_at=v_now where id=op.id;
   insert into private.audit_log(actor_id,subject_id,action) values(a.user_id,a.user_id,'password_changed');
   return jsonb_build_object('completed',true);
 elsif action='operation_cancel' then
   update private.security_operations set state='cancelled' where id=(payload->>'id')::uuid and state='pending'; return '{}'::jsonb;
 elsif action='recovery_create' then
   select * into a from private.accounts where user_id=(payload->>'user_id')::uuid for update;
   if a.user_id is null or a.state not in ('password_change','active') then raise exception 'ACCOUNT_DISABLED'; end if;
   update private.security_operations set state='cancelled' where user_id=a.user_id and kind='recovery' and state='pending';
   insert into private.security_operations(user_id,kind,expected_epoch,token_hash) values(a.user_id,'recovery',a.security_epoch,payload->>'token_hash') returning * into op;
   return to_jsonb(op);
 elsif action='operation_get' then
   select * into op from private.security_operations where id=(payload->>'id')::uuid;
   return case when op.id is null then null else to_jsonb(op) end;
 elsif action='recovery_claim' then
   select * into op from private.security_operations where id=(payload->>'id')::uuid and kind='recovery' for update;
   select * into a from private.accounts where user_id=op.user_id for update;
   if op.id is null or op.state<>'pending' or op.expires_at<v_now or op.expected_epoch<>a.security_epoch or a.state not in ('active','password_change') or op.token_hash is distinct from payload->>'token_hash' then raise exception 'LINK_INVALID'; end if;
   update private.security_operations set state='completed',completed_at=v_now where id=op.id;
   return to_jsonb(op);
 elsif action='rate' then
   insert into private.rate_limits(key) values(payload->>'key') on conflict(key) do nothing;
   select * into rate from private.rate_limits where key=payload->>'key' for update;
   if rate.blocked_until>v_now then return jsonb_build_object('allowed',false,'retryAfter',ceil(extract(epoch from rate.blocked_until-v_now))); end if;
   v_window:=coalesce((payload->>'window')::integer,900); v_limit:=coalesce((payload->>'limit')::integer,3);
   if rate.window_at+make_interval(secs=>v_window)<=v_now then rate.count:=0; rate.window_at:=v_now; end if;
   if rate.count>=v_limit or (payload ? 'spacing' and rate.last_at+make_interval(secs=>(payload->>'spacing')::integer)>v_now) then return jsonb_build_object('allowed',false,'retryAfter',60); end if;
   update private.rate_limits set count=rate.count+1,window_at=rate.window_at,last_at=v_now where key=rate.key;
   return jsonb_build_object('allowed',true);
 elsif action='login_check' then
   select * into rate from private.rate_limits where key=payload->>'key';
   return jsonb_build_object('allowed',rate.blocked_until is null or rate.blocked_until<=v_now);
 elsif action='login_result' then
   insert into private.rate_limits(key) values(payload->>'key') on conflict(key) do nothing;
   select * into rate from private.rate_limits where key=payload->>'key' for update;
   if coalesce((payload->>'success')::boolean,false) then delete from private.rate_limits where key=rate.key;
   else
     v_count:=case when rate.blocked_until is not null and rate.blocked_until<=v_now then 1 else rate.count+1 end;
     update private.rate_limits set count=v_count,last_at=v_now,blocked_until=case when v_count>=5 then v_now+interval '5 minutes' else null end where key=rate.key;
   end if;
   return '{}'::jsonb;
 elsif action='profile_update' then
   update public.profiles set name=coalesce(payload->>'name',name),group_name=coalesce(payload->>'group',group_name),specialty_code=coalesce(payload->>'specialty',specialty_code),theme=coalesce(payload->>'theme',theme),updated_at=v_now where id=(payload->>'user_id')::uuid returning to_jsonb(profiles.*) into v_result;
   return v_result;
 elsif action='account_state' then
   v_user:=(payload->>'user_id')::uuid;
   if exists(select 1 from private.platform_owner where user_id=v_user) then raise exception 'OWNER_PROTECTED'; end if;
   select * into a from private.accounts where user_id=v_user for update;
   if a.user_id is null then raise exception 'NOT_FOUND'; end if;
   if payload->>'state' not in ('disabled','active','deleting') then raise exception 'STATE_INVALID'; end if;
   update private.accounts set state=case when payload->>'state'='active' then case when verified_at is null then 'pending_email' when must_change then 'password_change' else 'active' end else payload->>'state' end,security_epoch=security_epoch+1,updated_at=v_now where user_id=v_user;
   update private.app_sessions set revoked_at=v_now where user_id=v_user;
   update private.security_operations set state='cancelled' where user_id=v_user and state='pending';
   if payload->>'state'<>'active' then update private.mail_outbox set state='cancelled',payload_cipher=null,updated_at=v_now where user_id=v_user and state in ('queued','processing','failed'); end if;
   insert into private.audit_log(actor_id,subject_id,action) values((payload->>'actor_id')::uuid,v_user,'account_'||(payload->>'state'));
   return '{}'::jsonb;
 elsif action='email_begin' then
   v_user:=(payload->>'user_id')::uuid;
   select * into a from private.accounts where user_id=v_user for update;
   if a.state<>'active' or exists(select 1 from private.platform_owner where user_id=v_user) then raise exception 'FORBIDDEN'; end if;
   if exists(select 1 from private.accounts where email=payload->>'email') or exists(select 1 from private.registrations where email=payload->>'email' and user_id is distinct from v_user) then raise exception 'EMAIL_UNAVAILABLE'; end if;
   update private.security_operations set state='cancelled' where user_id=v_user and kind='email_change' and state='pending';
   insert into private.security_operations(user_id,kind,expected_epoch,destination) values(v_user,'email_change',a.security_epoch,payload->>'email') returning * into op;
   return to_jsonb(op);
 elsif action='email_finish' then
   select * into op from private.security_operations where user_id=(payload->>'user_id')::uuid and kind='email_change' and state='pending' and destination=payload->>'email' order by created_at desc limit 1 for update;
   select * into a from private.accounts where user_id=op.user_id for update;
   if op.id is null or (op.expires_at<v_now and not coalesce((payload->>'reconcile')::boolean,false)) or a.state<>'active' or a.security_epoch<>op.expected_epoch then raise exception 'OPERATION_CANCELLED'; end if;
   update private.accounts set email=op.destination,security_epoch=security_epoch+1,updated_at=v_now where user_id=a.user_id;
   update private.registrations set email=op.destination,updated_at=v_now where user_id=a.user_id;
   update private.app_sessions set revoked_at=v_now where user_id=a.user_id;
   update private.security_operations set state='completed',completed_at=v_now where id=op.id;
   return '{}'::jsonb;
 elsif action='email_reconcile' then
   with candidates as (select id from private.security_operations where kind='email_change' and state='pending' and created_at>v_now-interval '7 days' order by last_reconciled_at limit 3 for update skip locked), checked as (update private.security_operations set last_reconciled_at=v_now where id in (select id from candidates) returning id,user_id,destination)
   select coalesce(jsonb_agg(to_jsonb(checked)),'[]'::jsonb) into v_result from checked;
   return v_result;
 elsif action='mail_enqueue' then
   if exists(select 1 from private.mail_suppressions where email=payload->>'recipient') then return jsonb_build_object('suppressed',true); end if;
   if payload->>'kind' in ('verification','recovery') then
     update private.mail_outbox set state='cancelled',payload_cipher=null,updated_at=v_now where recipient=payload->>'recipient' and kind=payload->>'kind' and dedupe_key<>payload->>'dedupe_key' and state in ('queued','processing','failed');
   end if;
   insert into private.mail_outbox(user_id,registration_id,recipient,kind,dedupe_key,credential_version,payload_cipher,expires_at)
   values((payload->>'user_id')::uuid,(payload->>'registration_id')::uuid,payload->>'recipient',payload->>'kind',payload->>'dedupe_key',(payload->>'credential_version')::integer,payload->>'payload_cipher',(payload->>'expires_at')::timestamptz)
   on conflict(dedupe_key) do nothing returning * into m;
   if m.id is null then select * into m from private.mail_outbox where dedupe_key=payload->>'dedupe_key'; end if;
   return jsonb_build_object('id',m.id,'state',m.state);
 elsif action='mail_claim' then
   update private.mail_outbox set state='expired',payload_cipher=null,updated_at=v_now where expires_at<=v_now and state in ('queued','processing','failed');
   update private.registrations set credential_cipher=null where temporary_expires_at<=v_now;
   update private.mail_outbox outbox_row set state='cancelled',payload_cipher=null,updated_at=v_now where outbox_row.state in ('queued','processing','failed') and (
     exists(select 1 from private.accounts account_row where account_row.user_id=outbox_row.user_id and account_row.state in ('disabled','deleting')) or
     (outbox_row.kind='welcome' and exists(select 1 from private.accounts account_row where account_row.user_id=outbox_row.user_id and (not account_row.must_change or account_row.temporary_expires_at<=v_now))) or
     exists(select 1 from private.mail_suppressions p where p.email=outbox_row.recipient));
   select * into m from private.mail_outbox where payload_cipher is not null and expires_at>v_now and next_attempt_at<=v_now
   and (state='queued' or (state='processing' and lease_until<=v_now)) order by created_at for update skip locked limit 1;
   if m.id is null then return null; end if;
   update private.mail_outbox set state='processing',attempts=attempts+1,lease_token=gen_random_uuid(),lease_until=v_now+interval '90 seconds',updated_at=v_now where id=m.id returning * into m;
   return to_jsonb(m);
 elsif action='mail_finish' then
   select * into m from private.mail_outbox where id=(payload->>'id')::uuid for update;
   if m.state<>'processing' or m.lease_token is distinct from (payload->>'lease_token')::uuid then return jsonb_build_object('stale',true); end if;
   if payload->>'state'='accepted' then
     update private.mail_outbox set state='accepted',provider_id=payload->>'provider_id',payload_cipher=null,lease_token=null,lease_until=null,last_error=null,updated_at=v_now where id=m.id;
     if exists(select 1 from private.mail_events where provider_id=payload->>'provider_id' and event_type in ('email.bounced','email.complained')) then
       update private.mail_outbox set state=case when exists(select 1 from private.mail_events where provider_id=payload->>'provider_id' and event_type='email.complained') then 'complained' else 'bounced' end where id=m.id;
       insert into private.mail_suppressions(email,reason) values(m.recipient,'provider_negative_event') on conflict(email) do nothing;
     elsif exists(select 1 from private.mail_events where provider_id=payload->>'provider_id' and event_type='email.delivered') then update private.mail_outbox set state='delivered' where id=m.id; end if;
   else
     update private.mail_outbox set state=case when coalesce((payload->>'permanent')::boolean,false) or m.attempts>=5 then 'failed' else 'queued' end,
     next_attempt_at=v_now+make_interval(secs=>greatest(coalesce((payload->>'retry_after')::integer,0),case m.attempts when 1 then 60 when 2 then 300 when 3 then 900 else 3600 end)),
     lease_token=null,lease_until=null,last_error=left(payload->>'error',180),updated_at=v_now where id=m.id;
   end if;
   return '{}'::jsonb;
 elsif action='mail_event' then
   insert into private.mail_events(event_id,provider_id,event_type,occurred_at) values(payload->>'event_id',payload->>'provider_id',payload->>'type',(payload->>'occurred_at')::timestamptz) on conflict(event_id) do nothing;
   if not found then return jsonb_build_object('duplicate',true); end if;
   select * into m from private.mail_outbox where provider_id=payload->>'provider_id' for update;
   if m.id is not null then
     if payload->>'type' in ('email.bounced','email.complained') then
       update private.mail_outbox set state=case when payload->>'type'='email.complained' or state='complained' then 'complained' else 'bounced' end,payload_cipher=null,updated_at=v_now where id=m.id;
       insert into private.mail_suppressions(email,reason) values(m.recipient,payload->>'type') on conflict(email) do nothing;
     elsif payload->>'type'='email.delivered' and m.state not in ('bounced','complained') then update private.mail_outbox set state='delivered',updated_at=v_now where id=m.id; end if;
   end if;
   return '{}'::jsonb;
 elsif action='mail_list' then
   select coalesce(jsonb_agg(to_jsonb(x)),'[]'::jsonb) into v_result from (select id,recipient,kind,state,attempts,last_error,created_at,updated_at from private.mail_outbox order by created_at desc limit 200) x;
   return v_result;
 elsif action='mail_retry' then
   select * into m from private.mail_outbox where id=(payload->>'id')::uuid for update;
   if m.state<>'failed' or m.expires_at<=v_now or m.payload_cipher is null or exists(select 1 from private.mail_suppressions where email=m.recipient) then raise exception 'MAIL_RETRY_UNAVAILABLE'; end if;
   update private.mail_outbox set state='queued',next_attempt_at=v_now,attempts=0,last_error=null,updated_at=v_now where id=m.id;
   return '{}'::jsonb;
 else raise exception 'UNKNOWN_AUTH_ACTION';
 end if;
end
$$;
revoke all on function public.service_auth(text,jsonb) from public,anon,authenticated;
grant execute on function public.service_auth(text,jsonb) to service_role;
