-- Versioned curriculum. Correct answers and storage paths are never public data.
create table public.specialties (
  code text primary key check (code ~ '^[0-9]{4}$'),
  name text not null, initials text not null, slug text not null unique,
  areas jsonb not null check (jsonb_typeof(areas) = 'array'),
  published boolean not null default false, sort_order integer not null default 0
);
create table public.forms (
  specialty_code text not null references public.specialties(code),
  code text not null check (code in ('A','B','C','D','E')),
  title text not null, mode text not null check (mode in ('practice','pro')),
  total integer not null default 60 check (total = 60), published boolean not null default false,
  primary key (specialty_code, code)
);
create table private.questions (
  id uuid primary key default gen_random_uuid(), specialty_code text not null,
  source_form text not null, source_id text not null,
  created_at timestamptz not null default now(),
  unique(specialty_code,source_form,source_id),
  foreign key(specialty_code,source_form) references public.forms(specialty_code,code)
);
create table private.question_versions (
  id uuid primary key default gen_random_uuid(), question_id uuid not null references private.questions(id),
  version integer not null check(version > 0), source_hash text not null,
  area integer not null check(area >= 0), indicator text not null, difficulty text not null check(difficulty in ('Básica','Media','Alta')),
  data jsonb not null,
  status text not null default 'draft' check(status in ('draft','published','retired')),
  created_at timestamptz not null default now(), published_at timestamptz,
  unique(question_id,version), unique(question_id,source_hash),
  check (jsonb_typeof(data->'options')='array' and jsonb_array_length(data->'options')=4),
  check ((data->>'answer')::integer between 0 and 3)
);
create unique index question_one_published on private.question_versions(question_id) where status='published';
create index question_pool on private.question_versions(area,indicator,difficulty) where status='published';
create index question_specialty on private.questions(specialty_code,source_form);
create table private.blueprint_versions (
  id uuid primary key default gen_random_uuid(), specialty_code text not null, form_code text not null,
  version integer not null check(version>0), quotas jsonb not null check(jsonb_typeof(quotas)='array'),
  status text not null default 'draft' check(status in ('draft','published','retired')),
  created_at timestamptz not null default now(),
  unique(specialty_code,form_code,version),
  foreign key(specialty_code,form_code) references public.forms(specialty_code,code)
);
create unique index blueprint_one_published on private.blueprint_versions(specialty_code,form_code) where status='published';
create table private.material_versions (
  id uuid primary key default gen_random_uuid(), specialty_code text not null references public.specialties(code),
  kind text not null check(kind in ('tabla','libro')), version integer not null check(version>0), title text not null,
  filename text not null, bucket text not null check(bucket='study-materials'), object_path text not null,
  sha256 text not null check(sha256 ~ '^[a-f0-9]{64}$'), bytes bigint not null check(bytes > 0 and bytes <= 20971520),
  status text not null default 'draft' check(status in ('draft','published','retired')),
  created_at timestamptz not null default now(),
  unique(specialty_code,kind,version), unique(specialty_code,kind,sha256)
);
create unique index material_one_published on private.material_versions(specialty_code,kind) where status='published';

alter table public.specialties enable row level security;
alter table public.forms enable row level security;
alter table private.questions enable row level security;
alter table private.question_versions enable row level security;
alter table private.blueprint_versions enable row level security;
alter table private.material_versions enable row level security;
create policy published_specialties on public.specialties for select to anon,authenticated using(published);
create policy published_forms on public.forms for select to anon,authenticated using(published and exists(select 1 from public.specialties s where s.code=specialty_code and s.published));
grant select on public.specialties,public.forms to anon,authenticated;
revoke all on private.questions,private.question_versions,private.blueprint_versions,private.material_versions from public,anon,authenticated;

create function private.validate_question(p_data jsonb,p_specialty text) returns void language plpgsql security definer set search_path='' as $$
declare v_areas integer; v_options integer;
begin
  select jsonb_array_length(areas) into v_areas from public.specialties where code=p_specialty;
  if v_areas is null or jsonb_typeof(p_data) is distinct from 'object'
    or jsonb_typeof(p_data->'id') is distinct from 'string'
    or jsonb_typeof(p_data->'stem') is distinct from 'string'
    or jsonb_typeof(p_data->'explanation') is distinct from 'string'
    or jsonb_typeof(p_data->'indicator') is distinct from 'string'
    or coalesce(length(btrim(p_data->>'id')),0)=0
    or coalesce(length(btrim(p_data->>'stem')),0)=0
    or coalesce(length(btrim(p_data->>'explanation')),0)=0
    or coalesce(length(btrim(p_data->>'indicator')),0)=0
    or jsonb_typeof(p_data->'options') is distinct from 'array'
    or jsonb_array_length(p_data->'options') <> 4
    or coalesce((p_data->>'answer')::integer,-1) not between 0 and 3
    or coalesce((p_data->>'area')::integer,-1) not between 0 and v_areas-1
    or coalesce(p_data->>'difficulty','') not in ('Básica','Media','Alta') then
    raise exception using message='INVALID_QUESTION',errcode='P0001';
  end if;
  if exists(select 1 from jsonb_array_elements(p_data->'options') o where jsonb_typeof(o)<>'string') then raise exception using message='INVALID_QUESTION_OPTIONS',errcode='P0001'; end if;
  select count(distinct value) into v_options from jsonb_array_elements_text(p_data->'options') where length(btrim(value))>0;
  if v_options<>4 then raise exception using message='INVALID_QUESTION_OPTIONS',errcode='P0001'; end if;
end $$;

create function private.validate_blueprint(p_specialty text,p_form text,p_quotas jsonb,p_check_pool boolean default false) returns void language plpgsql security definer set search_path='' as $$
declare v_total integer; v_groups integer; v_mode text; v_q jsonb; v_available integer;
begin
  select mode into v_mode from public.forms where specialty_code=p_specialty and code=p_form;
  if v_mode is null or jsonb_typeof(p_quotas) is distinct from 'array' then raise exception using message='INVALID_BLUEPRINT',errcode='P0001'; end if;
  select sum((x->>'count')::integer),count(distinct jsonb_build_array(x->'area',x->'indicator',x->'difficulty')) into v_total,v_groups from jsonb_array_elements(p_quotas) x;
  if v_total is distinct from 60 or v_groups <> jsonb_array_length(p_quotas) then raise exception using message='INVALID_BLUEPRINT',errcode='P0001'; end if;
  for v_q in select value from jsonb_array_elements(p_quotas) loop
    if coalesce((v_q->>'count')::integer,0)<1 or coalesce((v_q->>'area')::integer,-1)<0 or coalesce(v_q->>'indicator','')='' or coalesce(v_q->>'difficulty','') not in ('Básica','Media','Alta') then raise exception using message='INVALID_BLUEPRINT',errcode='P0001'; end if;
    if p_check_pool then
      select count(*) into v_available from private.questions q
      join private.question_versions v on v.question_id=q.id and v.status='published'
      join public.forms f on f.specialty_code=q.specialty_code and f.code=q.source_form
      where q.specialty_code=p_specialty and f.mode=v_mode and v.area=(v_q->>'area')::integer and v.indicator=v_q->>'indicator' and v.difficulty=v_q->>'difficulty';
      if v_available < (v_q->>'count')::integer then raise exception using message='INSUFFICIENT_QUESTION_POOL',errcode='P0001'; end if;
    end if;
  end loop;
end $$;

-- Service-role import only. Identical source hashes are idempotent; changed content is a new draft.
create function public.service_import(action text,payload jsonb default '{}'::jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare v_specialty text; v_s jsonb; v_form jsonb; v_q jsonb; v_id uuid; v_version integer;
  v_hash text; v_existing uuid; v_count integer:=0; v_unchanged integer:=0; v_status text; v_qdata jsonb; v_row record;
begin
  if coalesce(auth.role(),'') <> 'service_role' then raise exception using message='FORBIDDEN',errcode='P0001'; end if;
  v_specialty:=payload->>'specialty';
  if action='specialty' then
    v_s:=payload->'specialty'; v_specialty:=v_s->>'code';
    insert into public.specialties(code,name,initials,slug,areas,sort_order) values(v_specialty,v_s->>'name',v_s->>'initials',v_s->>'slug',v_s->'areas',coalesce((v_s->>'sort_order')::integer,0))
    on conflict(code) do update set name=excluded.name,initials=excluded.initials,slug=excluded.slug,areas=excluded.areas;
    for v_form in select value from jsonb_array_elements(v_s->'forms') loop
      insert into public.forms(specialty_code,code,title,mode,total) values(v_specialty,v_form->>'id',v_form->>'title',v_form->>'mode',60)
      on conflict(specialty_code,code) do update set title=excluded.title;
    end loop;
    return jsonb_build_object('specialty',v_specialty);
  end if;
  perform pg_advisory_xact_lock(hashtextextended('content:'||coalesce(v_specialty,''),0));
  if action='questions' then
    if jsonb_typeof(payload->'questions') is distinct from 'array' or jsonb_array_length(payload->'questions')>100 then raise exception using message='INVALID_BATCH',errcode='P0001'; end if;
    for v_q in select value from jsonb_array_elements(payload->'questions') loop
      v_qdata:=v_q-'source_hash'; perform private.validate_question(v_qdata,v_specialty);
      v_hash:=v_q->>'source_hash';
      if v_hash is null or v_hash !~ '^[a-f0-9]{64}$' then raise exception using message='INVALID_SOURCE_HASH',errcode='P0001'; end if;
      insert into private.questions(specialty_code,source_form,source_id) values(v_specialty,payload->>'form',v_qdata->>'id') on conflict(specialty_code,source_form,source_id) do nothing;
      select id into v_id from private.questions where specialty_code=v_specialty and source_form=payload->>'form' and source_id=v_qdata->>'id';
      select id into v_existing from private.question_versions where question_id=v_id and source_hash=v_hash;
      if v_existing is not null then v_unchanged:=v_unchanged+1; continue; end if;
      select coalesce(max(version),0)+1 into v_version from private.question_versions where question_id=v_id;
      v_status:=case when v_version=1 then 'published' else 'draft' end;
      insert into private.question_versions(question_id,version,source_hash,area,indicator,difficulty,data,status,published_at)
      values(v_id,v_version,v_hash,(v_qdata->>'area')::integer,v_qdata->>'indicator',v_qdata->>'difficulty',v_qdata,v_status,case when v_status='published' then now() else null end);
      v_count:=v_count+1;
    end loop;
    return jsonb_build_object('imported',v_count,'unchanged',v_unchanged);
  elsif action='blueprint' then
    perform private.validate_blueprint(v_specialty,payload->>'form',payload->'quotas',false);
    select id into v_existing from private.blueprint_versions where specialty_code=v_specialty and form_code=payload->>'form' and quotas=payload->'quotas' limit 1;
    if v_existing is not null then return jsonb_build_object('id',v_existing,'unchanged',true); end if;
    select coalesce(max(version),0)+1 into v_version from private.blueprint_versions where specialty_code=v_specialty and form_code=payload->>'form';
    insert into private.blueprint_versions(specialty_code,form_code,version,quotas,status) values(v_specialty,payload->>'form',v_version,payload->'quotas',case when v_version=1 then 'published' else 'draft' end) returning id into v_id;
    return jsonb_build_object('id',v_id,'version',v_version);
  elsif action='material' then
    select id into v_existing from private.material_versions where specialty_code=v_specialty and kind=payload->>'kind' and sha256=payload->>'sha256';
    if v_existing is not null then return jsonb_build_object('id',v_existing,'unchanged',true); end if;
    select coalesce(max(version),0)+1 into v_version from private.material_versions where specialty_code=v_specialty and kind=payload->>'kind';
    insert into private.material_versions(specialty_code,kind,version,title,filename,bucket,object_path,sha256,bytes,status)
    values(v_specialty,payload->>'kind',v_version,payload->>'title',payload->>'filename',payload->>'bucket',payload->>'path',payload->>'sha256',(payload->>'bytes')::bigint,case when v_version=1 then 'published' else 'draft' end) returning id into v_id;
    return jsonb_build_object('id',v_id,'version',v_version);
  elsif action='publish' then
    if (select count(*) from public.forms where specialty_code=v_specialty)<>5 then raise exception using message='INCOMPLETE_SPECIALTY',errcode='P0001'; end if;
    for v_row in select f.code,b.quotas from public.forms f left join private.blueprint_versions b on b.specialty_code=f.specialty_code and b.form_code=f.code and b.status='published' where f.specialty_code=v_specialty loop
      -- The initial source has exactly 60 per form; later editorial additions may expand its pool.
      if (select count(*) from private.questions q join private.question_versions v on v.question_id=q.id and v.status='published' where q.specialty_code=v_specialty and q.source_form=v_row.code)<60 then raise exception using message='INCOMPLETE_QUESTIONS',errcode='P0001'; end if;
      perform private.validate_blueprint(v_specialty,v_row.code,v_row.quotas,true);
    end loop;
    if (select count(*) from private.material_versions where specialty_code=v_specialty and status='published')<>2 then raise exception using message='INCOMPLETE_MATERIALS',errcode='P0001'; end if;
    update public.specialties set published=true where code=v_specialty;
    update public.forms set published=true where specialty_code=v_specialty;
    return jsonb_build_object('published',true,'specialty',v_specialty);
  end if;
  raise exception using message='UNKNOWN_IMPORT_ACTION',errcode='P0001';
end $$;
revoke all on function private.validate_question(jsonb,text),private.validate_blueprint(text,text,jsonb,boolean) from public,anon,authenticated;
revoke all on function public.service_import(text,jsonb) from public,anon,authenticated;
grant execute on function public.service_import(text,jsonb) to service_role;

-- On Supabase, ensure documents remain private. No public object policies are created.
do $$ begin
  if to_regclass('storage.buckets') is not null then
    insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
      values('study-materials','study-materials',false,20971520,array['application/pdf'])
      on conflict(id) do update set public=false,file_size_limit=20971520,allowed_mime_types=array['application/pdf'];
  end if;
end $$;
