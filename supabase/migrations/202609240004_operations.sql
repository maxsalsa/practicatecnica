create table private.platform_settings (
 singleton boolean primary key default true check(singleton),
 registration_open boolean not null default false,
 privacy_ready boolean not null default false,
 updated_at timestamptz not null default now()
);
insert into private.platform_settings(singleton) values(true);
revoke all on private.platform_settings from public,anon,authenticated;
create table private.material_uploads (
 id uuid primary key default gen_random_uuid(), actor_id uuid not null references auth.users(id) on delete cascade,
 metadata jsonb not null, object_path text not null unique,
 expected_bytes integer not null check(expected_bytes between 1 and 20971520),
 expires_at timestamptz not null default now()+interval '30 minutes',
 version_id uuid references private.material_versions(id), created_at timestamptz not null default now()
);
revoke all on private.material_uploads from public,anon,authenticated;

create function public.service_platform(action text,payload jsonb default '{}'::jsonb) returns jsonb
language plpgsql security definer set search_path='' as $$
declare s private.platform_settings%rowtype; u private.material_uploads%rowtype;
begin
 if action in ('upload_create','upload_get','upload_finish') then
   if not exists(select 1 from private.platform_owner where user_id=(payload->>'actor_id')::uuid) then raise exception 'FORBIDDEN'; end if;
   if action='upload_create' then
     insert into private.material_uploads(actor_id,metadata,object_path,expected_bytes)
       values((payload->>'actor_id')::uuid,payload->'metadata',payload->>'path',(payload->>'bytes')::integer) returning * into u;
   else
     select * into u from private.material_uploads where id=(payload->>'id')::uuid and actor_id=(payload->>'actor_id')::uuid for update;
     if u.id is null or (u.expires_at<=now() and u.version_id is null) then raise exception 'UPLOAD_EXPIRED'; end if;
     if action='upload_finish' then
       if u.version_id is not null and u.version_id is distinct from (payload->>'version_id')::uuid then raise exception 'UPLOAD_ALREADY_FINISHED'; end if;
       if not exists(select 1 from private.material_versions m where m.id=(payload->>'version_id')::uuid
         and m.specialty_code=u.metadata->>'specialty' and m.kind=u.metadata->>'kind'
         and m.sha256=payload->>'sha256' and m.bytes=u.expected_bytes) then raise exception 'UPLOAD_VERSION_MISMATCH'; end if;
       update private.material_uploads set version_id=(payload->>'version_id')::uuid where id=u.id returning * into u;
     end if;
   end if;
   return to_jsonb(u);
 end if;
 if action='settings_update' then
   if not exists(select 1 from private.platform_owner where user_id=(payload->>'actor_id')::uuid) then raise exception 'FORBIDDEN'; end if;
   if coalesce((payload->>'registrationOpen')::boolean,false) and not coalesce((payload->>'privacyReady')::boolean,false) then raise exception 'PRIVACY_REQUIRED'; end if;
   update private.platform_settings set registration_open=(payload->>'registrationOpen')::boolean,privacy_ready=(payload->>'privacyReady')::boolean,updated_at=now() where singleton;
   insert into private.audit_log(actor_id,action,detail) values((payload->>'actor_id')::uuid,'settings_updated',jsonb_build_object('registrationOpen',payload->'registrationOpen','privacyReady',payload->'privacyReady'));
 elsif action not in ('status','settings') then raise exception 'UNKNOWN_ACTION'; end if;
 select * into s from private.platform_settings where singleton;
 return jsonb_build_object('registrationOpen',s.registration_open,'privacyReady',s.privacy_ready);
end $$;
revoke all on function public.service_platform(text,jsonb) from public,anon,authenticated;
grant execute on function public.service_platform(text,jsonb) to service_role;
