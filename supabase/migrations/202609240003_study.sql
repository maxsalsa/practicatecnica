-- All grading/snapshots remain private; browser-facing functions return explicit DTOs.
create table public.attempts (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  specialty_code text not null, form_code text not null, ordinal integer not null check(ordinal between 1 and 5),
  mode text not null check(mode in ('practice','pro')), blueprint_id uuid not null references private.blueprint_versions(id),
  state text not null default 'open' check(state in ('open','submitted')), total integer not null default 60 check(total=60),
  answered_count integer not null default 0 check(answered_count between 0 and 60),
  started_at timestamptz not null default now(), submitted_at timestamptz,
  owner_preview boolean not null default false,
  foreign key(specialty_code,form_code) references public.forms(specialty_code,code),
  unique(user_id,specialty_code,form_code,ordinal),
  check((state='submitted')=(submitted_at is not null))
);
create unique index attempt_one_open on public.attempts(user_id,specialty_code,form_code) where state='open';
create index attempt_user_history on public.attempts(user_id,specialty_code,started_at desc);
create index attempt_tracking on public.attempts(specialty_code,form_code,state,started_at desc);
create table private.attempt_items (
  attempt_id uuid not null references public.attempts(id) on delete cascade,
  position integer not null check(position between 1 and 60),
  question_id uuid not null references private.questions(id), question_version_id uuid not null references private.question_versions(id),
  snapshot jsonb not null, primary key(attempt_id,position), unique(attempt_id,question_id)
);
create index attempt_question_exposure on private.attempt_items(question_id,attempt_id);
create table public.attempt_responses (
  attempt_id uuid not null, position integer not null, option_id text not null,
  confirmed_at timestamptz not null default now(),
  primary key(attempt_id,position),
  foreign key(attempt_id,position) references private.attempt_items(attempt_id,position) on delete cascade
);
create table public.attempt_flags (
  attempt_id uuid not null, position integer not null, flagged boolean not null default false,
  updated_at timestamptz not null default now(), primary key(attempt_id,position),
  foreign key(attempt_id,position) references private.attempt_items(attempt_id,position) on delete cascade
);
create table private.attempt_grades (
  attempt_id uuid primary key references public.attempts(id) on delete cascade,
  correct_count integer not null check(correct_count between 0 and 60),
  incorrect_count integer not null check(incorrect_count between 0 and 60),
  omitted_count integer not null check(omitted_count between 0 and 60),
  graded_at timestamptz not null default now(), check(correct_count+incorrect_count+omitted_count=60)
);
alter table public.attempts enable row level security;
alter table public.attempt_responses enable row level security;
alter table public.attempt_flags enable row level security;
alter table private.attempt_items enable row level security;
alter table private.attempt_grades enable row level security;
create policy attempt_read on public.attempts for select to authenticated using(private.can_study() and (user_id=auth.uid() or private.can_administer()));
create policy responses_read on public.attempt_responses for select to authenticated using(exists(select 1 from public.attempts a where a.id=attempt_id));
create policy flags_read on public.attempt_flags for select to authenticated using(exists(select 1 from public.attempts a where a.id=attempt_id));
grant select on public.attempts,public.attempt_responses,public.attempt_flags to authenticated;
revoke insert,update,delete on public.attempts,public.attempt_responses,public.attempt_flags from authenticated,anon;
revoke all on private.attempt_items,private.attempt_grades from public,anon,authenticated;

create function private.attempt_dto(p_id uuid) returns jsonb language plpgsql security definer set search_path='' as $$
declare v_a public.attempts%rowtype; v_correct integer; v_result jsonb;
begin
  select * into v_a from public.attempts where id=p_id;
  v_result:=jsonb_build_object('id',v_a.id,'specialty',v_a.specialty_code,'form',v_a.form_code,'ordinal',v_a.ordinal,'mode',v_a.mode,'state',v_a.state,'answered',v_a.answered_count,'total',v_a.total,'startedAt',v_a.started_at,'submittedAt',v_a.submitted_at);
  if v_a.state='submitted' then
    select correct_count into v_correct from private.attempt_grades where attempt_id=p_id;
    v_result:=v_result||jsonb_build_object('correct',v_correct,'incorrect',v_a.answered_count-v_correct,'omitted',v_a.total-v_a.answered_count,'score',round(v_correct*100.0/v_a.total,2));
  elsif v_a.mode='practice' then
    select count(*) into v_correct from public.attempt_responses r join private.attempt_items i on i.attempt_id=r.attempt_id and i.position=r.position where r.attempt_id=p_id and r.option_id=i.snapshot->>'correctOptionId';
    v_result:=v_result||jsonb_build_object('correct',v_correct,'incorrect',v_a.answered_count-v_correct,'omitted',v_a.total-v_a.answered_count,'score',case when v_a.answered_count>0 then round(v_correct*100.0/v_a.answered_count,2) else null end);
  end if;
  return v_result;
end $$;

create function private.item_dto(p_id uuid,p_position integer) returns jsonb language plpgsql security definer set search_path='' as $$
declare v_a public.attempts%rowtype; v_item private.attempt_items%rowtype; v_selected text; v_flagged boolean; v_feedback jsonb:=null;
begin
  select * into v_a from public.attempts where id=p_id;
  select * into v_item from private.attempt_items where attempt_id=p_id and position=p_position;
  if not found then raise exception using message='NOT_FOUND',errcode='P0001'; end if;
  select option_id into v_selected from public.attempt_responses where attempt_id=p_id and position=p_position;
  select flagged into v_flagged from public.attempt_flags where attempt_id=p_id and position=p_position;
  if v_a.state='submitted' or (v_a.mode='practice' and v_selected is not null) then
    v_feedback:=jsonb_build_object('correct',coalesce(v_selected=v_item.snapshot->>'correctOptionId',false),'correctOptionId',v_item.snapshot->>'correctOptionId','explanation',v_item.snapshot->>'explanation','distractors',v_item.snapshot->'distractors');
  end if;
  return jsonb_build_object('position',p_position,'stem',v_item.snapshot->>'stem','options',v_item.snapshot->'options','selectedOptionId',v_selected,'confirmed',v_selected is not null,'flagged',coalesce(v_flagged,false),'area',v_item.snapshot->>'area','indicator',v_item.snapshot->>'indicator','indicatorText',v_item.snapshot->>'indicatorText','feedback',v_feedback);
end $$;

create function private.finish_attempt(p_id uuid) returns void language plpgsql security definer set search_path='' as $$
declare v_a public.attempts%rowtype; v_correct integer; v_answered integer;
begin
  select * into v_a from public.attempts where id=p_id for update;
  if v_a.state='submitted' then return; end if;
  select count(*),count(*) filter(where r.option_id=i.snapshot->>'correctOptionId') into v_answered,v_correct
  from public.attempt_responses r join private.attempt_items i on i.attempt_id=r.attempt_id and i.position=r.position where r.attempt_id=p_id;
  insert into private.attempt_grades(attempt_id,correct_count,incorrect_count,omitted_count) values(p_id,v_correct,v_answered-v_correct,60-v_answered);
  update public.attempts set state='submitted',answered_count=v_answered,submitted_at=now() where id=p_id;
end $$;

create function private.progress_dto(p_user uuid,p_specialty text) returns jsonb language plpgsql security definer set search_path='' as $$
declare v_result jsonb; v_areas jsonb; v_history jsonb;
begin
  select jsonb_build_object('started',count(*),'open',count(*) filter(where a.state='open'),'completed',count(*) filter(where a.state='submitted'),'completedForms',count(distinct a.form_code) filter(where a.state='submitted'),'best',max(round(g.correct_count*100.0/60,2)),'average',round(avg(g.correct_count*100.0/60),1),'answered',coalesce(sum(a.answered_count),0)) into v_result
  from public.attempts a left join private.attempt_grades g on g.attempt_id=a.id where a.user_id=p_user and a.specialty_code=p_specialty;
  select coalesce(jsonb_agg(private.attempt_dto(a.id) order by a.started_at desc),'[]'::jsonb) into v_history from public.attempts a where a.user_id=p_user and a.specialty_code=p_specialty;
  with area_list as (
    select value #>> '{}' as name, ordinality-1 as idx from public.specialties s cross join lateral jsonb_array_elements(s.areas) with ordinality where s.code=p_specialty
  ), stats as (
    select (i.snapshot->>'areaIndex')::integer as idx,count(*) as answered,count(*) filter(where r.option_id=i.snapshot->>'correctOptionId') as correct
    from public.attempts a join public.attempt_responses r on r.attempt_id=a.id join private.attempt_items i on i.attempt_id=a.id and i.position=r.position
    where a.user_id=p_user and a.specialty_code=p_specialty and (a.mode='practice' or a.state='submitted') group by (i.snapshot->>'areaIndex')::integer
  ), ordered as (
    select l.name,l.idx,coalesce(s.answered,0) as answered,coalesce(s.correct,0) as correct,
      case when coalesce(s.answered,0)>0 then round((s.answered-s.correct)*100.0/s.answered,1) else null end as error_rate
    from area_list l left join stats s on s.idx=l.idx
  ) select coalesce(jsonb_agg(jsonb_build_object('name',name,'correct',correct,'answered',answered,'errorRate',error_rate,'initialEvidence',answered<5) order by error_rate desc nulls last,answered-correct desc,idx),'[]'::jsonb) into v_areas from ordered;
  return v_result||jsonb_build_object('areas',v_areas,'history',v_history);
end $$;

create function public.study(action text,payload jsonb default '{}'::jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare v_user uuid:=auth.uid(); v_specialty text:=payload->>'specialty'; v_form text:=payload->>'form';
  v_id uuid; v_a public.attempts%rowtype; v_f public.forms%rowtype; v_bp private.blueprint_versions%rowtype;
  v_q jsonb; v_row record; v_version private.question_versions%rowtype; v_opts jsonb; v_distractors jsonb; v_correct_option text; v_option_id text;
  v_snap jsonb; v_selected uuid[]:='{}'; v_pos integer:=0; v_ordinal integer; v_count integer; v_answer text;
  v_items jsonb; v_result jsonb; v_forms jsonb; v_materials jsonb; v_target uuid; v_areas jsonb; v_m private.material_versions%rowtype;
  v_page integer:=greatest(coalesce((payload->>'page')::integer,1),1); v_limit integer:=least(greatest(coalesce((payload->>'pageSize')::integer,25),1),100);
  v_search text:=btrim(coalesce(payload->>'search',payload->>'name','')); v_group text:=btrim(coalesce(payload->>'group','')); v_state text:=coalesce(payload->>'state','');
  v_from timestamptz; v_to timestamptz;
begin
  if v_user is null then raise exception using message='UNAUTHENTICATED',errcode='P0001'; end if;
  if not private.can_study() then raise exception using message='FORBIDDEN',errcode='P0001'; end if;
  if action in ('tracking','students','student_edit','content_list','content_save','content_publish','content_create','content_retire','materials_list','material_save','material_publish','material_preview','blueprint_list','blueprint_save','blueprint_publish') and not private.can_administer() then raise exception using message='FORBIDDEN',errcode='P0001'; end if;

  if action='start' then
    perform pg_advisory_xact_lock(hashtextextended(v_user::text||':'||coalesce(v_specialty,'')||':'||coalesce(v_form,''),0));
    select f.* into v_f from public.forms f join public.specialties s on s.code=f.specialty_code where f.specialty_code=v_specialty and f.code=v_form and f.published and s.published;
    if not found then raise exception using message='NOT_FOUND',errcode='P0001'; end if;
    select id into v_id from public.attempts where user_id=v_user and specialty_code=v_specialty and form_code=v_form and state='open';
    if v_id is not null then return jsonb_build_object('attempt',private.attempt_dto(v_id),'resumed',true); end if;
    select coalesce(max(ordinal),0)+1 into v_ordinal from public.attempts where user_id=v_user and specialty_code=v_specialty and form_code=v_form;
    if v_ordinal>5 then raise exception using message='ATTEMPT_LIMIT_REACHED',errcode='P0001'; end if;
    select * into v_bp from private.blueprint_versions where specialty_code=v_specialty and form_code=v_form and status='published';
    if not found then raise exception using message='CONTENT_UNAVAILABLE',errcode='P0001'; end if;
    perform private.validate_blueprint(v_specialty,v_form,v_bp.quotas,true);
    select areas into v_areas from public.specialties where code=v_specialty;
    insert into public.attempts(user_id,specialty_code,form_code,ordinal,mode,blueprint_id,owner_preview) values(v_user,v_specialty,v_form,v_ordinal,v_f.mode,v_bp.id,private.is_owner()) returning id into v_id;
    for v_q in select value from jsonb_array_elements(v_bp.quotas) loop
      v_count:=0;
      for v_row in
        select q.id as question_id,ver.id as version_id,ver.data,ver.area,ver.indicator
        from private.questions q join private.question_versions ver on ver.question_id=q.id and ver.status='published'
        join public.forms f on f.specialty_code=q.specialty_code and f.code=q.source_form
        where q.specialty_code=v_specialty and f.mode=v_f.mode and ver.area=(v_q->>'area')::integer and ver.indicator=v_q->>'indicator' and ver.difficulty=v_q->>'difficulty' and not(q.id=any(v_selected))
        order by (select count(*) from private.attempt_items i join public.attempts a on a.id=i.attempt_id where i.question_id=q.id and a.user_id=v_user),gen_random_uuid()
        limit (v_q->>'count')::integer
      loop
        v_count:=v_count+1; v_pos:=v_pos+1; v_selected:=array_append(v_selected,v_row.question_id);
        v_opts:='[]'::jsonb; v_distractors:='{}'::jsonb; v_correct_option:=null;
        -- Fresh random option IDs avoid exposing the source correct-answer index.
        for v_result in select jsonb_build_object('index',ordinality-1,'text',value #>> '{}') from jsonb_array_elements(v_row.data->'options') with ordinality order by gen_random_uuid() loop
          v_option_id:=gen_random_uuid()::text;
          v_opts:=v_opts||jsonb_build_array(jsonb_build_object('id',v_option_id,'text',v_result->>'text'));
          if (v_result->>'index')::integer=(v_row.data->>'answer')::integer then v_correct_option:=v_option_id; end if;
          if v_row.data->'distractors' ? (v_result->>'index') then v_distractors:=v_distractors||jsonb_build_object(v_option_id,v_row.data->'distractors'->(v_result->>'index')); end if;
        end loop;
        v_snap:=jsonb_build_object('stem',v_row.data->>'stem','options',v_opts,'correctOptionId',v_correct_option,'explanation',v_row.data->>'explanation','distractors',v_distractors,'areaIndex',v_row.area,'area',v_areas->>v_row.area,'indicator',v_row.indicator,'indicatorText',v_row.data->>'indicatorText');
        insert into private.attempt_items(attempt_id,position,question_id,question_version_id,snapshot) values(v_id,v_pos,v_row.question_id,v_row.version_id,v_snap);
      end loop;
      if v_count<>(v_q->>'count')::integer then raise exception using message='INSUFFICIENT_QUESTION_POOL',errcode='P0001'; end if;
    end loop;
    if v_pos<>60 then raise exception using message='INVALID_BLUEPRINT',errcode='P0001'; end if;
    -- Mix question order without a transient PK collision.
    with mixed as (select question_id,question_version_id,snapshot,row_number() over(order by gen_random_uuid())::integer as pos from private.attempt_items where attempt_id=v_id), saved as (select jsonb_agg(jsonb_build_object('question_id',question_id,'version_id',question_version_id,'snapshot',snapshot,'position',pos)) as data from mixed) select data into v_items from saved;
    delete from private.attempt_items where attempt_id=v_id;
    insert into private.attempt_items(attempt_id,position,question_id,question_version_id,snapshot) select v_id,(x->>'position')::integer,(x->>'question_id')::uuid,(x->>'version_id')::uuid,x->'snapshot' from jsonb_array_elements(v_items) x;
    return jsonb_build_object('attempt',private.attempt_dto(v_id),'resumed',false);
  end if;

  if action in ('attempt','item','answer','flag','submit') then
    v_id:=coalesce(payload->>'attemptId',payload->>'id')::uuid;
    select * into v_a from public.attempts where id=v_id and (user_id=v_user or private.can_administer()) for update;
    if not found then raise exception using message='NOT_FOUND',errcode='P0001'; end if;
    if action in ('answer','flag','submit') and v_a.user_id<>v_user then raise exception using message='FORBIDDEN',errcode='P0001'; end if;
    if action='attempt' then
      select jsonb_agg(jsonb_build_object('position',i.position,'confirmed',r.position is not null,'flagged',coalesce(f.flagged,false)) order by i.position) into v_items
      from private.attempt_items i left join public.attempt_responses r on r.attempt_id=i.attempt_id and r.position=i.position left join public.attempt_flags f on f.attempt_id=i.attempt_id and f.position=i.position where i.attempt_id=v_id;
      return jsonb_build_object('attempt',private.attempt_dto(v_id),'map',v_items);
    elsif action='item' then
      return jsonb_build_object('item',private.item_dto(v_id,(payload->>'position')::integer));
    elsif action='answer' then
      v_pos:=(payload->>'position')::integer; v_option_id:=payload->>'optionId';
      select option_id into v_answer from public.attempt_responses where attempt_id=v_id and position=v_pos;
      if v_answer is not null then
        if v_answer is distinct from v_option_id then raise exception using message='ANSWER_ALREADY_CONFIRMED',errcode='P0001'; end if;
        return jsonb_build_object('item',private.item_dto(v_id,v_pos),'attempt',private.attempt_dto(v_id));
      end if;
      if v_a.state<>'open' then raise exception using message='ATTEMPT_SUBMITTED',errcode='P0001'; end if;
      select snapshot into v_snap from private.attempt_items where attempt_id=v_id and position=v_pos;
      if not found then raise exception using message='NOT_FOUND',errcode='P0001'; end if;
      if not exists(select 1 from jsonb_array_elements(v_snap->'options') o where o->>'id'=v_option_id) then raise exception using message='INVALID_OPTION',errcode='P0001'; end if;
      insert into public.attempt_responses(attempt_id,position,option_id) values(v_id,v_pos,v_option_id);
      update public.attempts set answered_count=answered_count+1 where id=v_id returning answered_count into v_count;
      if v_a.mode='practice' and v_count=60 then perform private.finish_attempt(v_id); end if;
      return jsonb_build_object('item',private.item_dto(v_id,v_pos),'attempt',private.attempt_dto(v_id));
    elsif action='flag' then
      if v_a.state<>'open' then raise exception using message='ATTEMPT_SUBMITTED',errcode='P0001'; end if;
      v_pos:=(payload->>'position')::integer;
      if not exists(select 1 from private.attempt_items where attempt_id=v_id and position=v_pos) then raise exception using message='NOT_FOUND',errcode='P0001'; end if;
      insert into public.attempt_flags(attempt_id,position,flagged) values(v_id,v_pos,coalesce((payload->>'flagged')::boolean,false)) on conflict(attempt_id,position) do update set flagged=excluded.flagged,updated_at=now();
      return jsonb_build_object('item',private.item_dto(v_id,v_pos));
    elsif action='submit' then
      perform private.finish_attempt(v_id);
      return jsonb_build_object('attempt',private.attempt_dto(v_id));
    end if;
  end if;

  if action in ('overview','progress') then
    if not exists(select 1 from public.specialties where code=v_specialty and published) then raise exception using message='NOT_FOUND',errcode='P0001'; end if;
    v_result:=private.progress_dto(v_user,v_specialty);
    if action='progress' then return v_result; end if;
    select jsonb_agg(jsonb_build_object('code',f.code,'title',f.title,'mode',f.mode,'total',f.total,'used',(select count(*) from public.attempts a where a.user_id=v_user and a.specialty_code=v_specialty and a.form_code=f.code),'openAttemptId',(select id from public.attempts a where a.user_id=v_user and a.specialty_code=v_specialty and a.form_code=f.code and state='open')) order by f.code) into v_forms from public.forms f where f.specialty_code=v_specialty and f.published;
    select coalesce(jsonb_agg(jsonb_build_object('id',id,'title',title,'kind',kind) order by kind),'[]'::jsonb) into v_materials from private.material_versions where specialty_code=v_specialty and status='published';
    return jsonb_build_object('forms',v_forms,'materials',v_materials,'progress',v_result);
  elsif action in ('material','material_preview') then
    select jsonb_build_object('id',m.id,'bucket',m.bucket,'path',m.object_path,'filename',m.filename,'title',m.title) into v_result from private.material_versions m join public.specialties s on s.code=m.specialty_code where m.id=coalesce(payload->>'materialId',payload->>'id')::uuid and ((m.status='published' and s.published) or action='material_preview');
    if v_result is null then raise exception using message='NOT_FOUND',errcode='P0001'; end if;
    return jsonb_build_object('material',v_result);
  elsif action='tracking' then
    v_from:=nullif(payload->>'from','')::date::timestamp at time zone 'America/Costa_Rica';
    v_to:=(nullif(payload->>'to','')::date+1)::timestamp at time zone 'America/Costa_Rica';
    if v_from is not null and v_to is not null and v_from>=v_to then raise exception using message='INVALID_FILTER',errcode='P0001'; end if;
    with filtered as (
      select a.id as attempt_id,p.id as user_id,p.name,ac.email,p.group_name,a.specialty_code,a.form_code,a.ordinal,a.answered_count,a.total,a.state,a.started_at,
        case when a.state='submitted' then round(g.correct_count*100.0/60,2) else null end as score,
        (select max(confirmed_at) from public.attempt_responses r where r.attempt_id=a.id) as last_answer_at
      from public.profiles p join private.accounts ac on ac.user_id=p.id
      left join public.attempts a on a.user_id=p.id left join private.attempt_grades g on g.attempt_id=a.id
      where not exists(select 1 from private.platform_owner o where o.user_id=p.id)
        and (v_search='' or strpos(lower(p.name),lower(v_search))>0 or strpos(lower(ac.email),lower(v_search))>0)
        and (v_group='' or p.group_name=v_group) and (coalesce(v_specialty,'')='' or a.specialty_code=v_specialty)
        and (coalesce(v_form,'')='' or a.form_code=v_form) and (v_state='' or a.state=v_state)
        and (v_from is null or a.started_at>=v_from) and (v_to is null or a.started_at<v_to)
    ), paged as (select * from filtered order by last_answer_at desc nulls last,started_at desc nulls last,user_id limit v_limit offset (v_page-1)*v_limit)
    select jsonb_build_object('rows',coalesce((select jsonb_agg(jsonb_build_object('userId',user_id,'name',name,'email',email,'group',group_name,'specialty',specialty_code,'form',form_code,'ordinal',ordinal,'answered',coalesce(answered_count,0),'total',coalesce(total,60),'state',coalesce(state,'not_started'),'score',score,'lastAnswerAt',last_answer_at,'attemptId',attempt_id)) from paged),'[]'::jsonb),'total',(select count(*) from filtered),'page',v_page,'pageSize',v_limit) into v_result;
    return v_result;
  elsif action='students' then
    with filtered as (
      select p.id,p.name,p.group_name,ac.email,ac.state from public.profiles p join private.accounts ac on ac.user_id=p.id
      where not exists(select 1 from private.platform_owner o where o.user_id=p.id)
      and (v_search='' or strpos(lower(p.name),lower(v_search))>0 or strpos(lower(ac.email),lower(v_search))>0)
      and (v_group='' or p.group_name=v_group) and (v_state='' or ac.state=v_state)
    ), paged as (select * from filtered order by name,id limit v_limit offset (v_page-1)*v_limit)
    select jsonb_build_object('rows',coalesce((select jsonb_agg(jsonb_build_object('id',p.id,'name',p.name,'email',p.email,'group',p.group_name,'state',p.state,'createdAt',u.created_at)) from paged p join auth.users u on u.id=p.id),'[]'::jsonb),'total',(select count(*) from filtered),'page',v_page,'pageSize',v_limit) into v_result;
    return v_result;
  elsif action='student_edit' then
    v_target:=payload->>'userId';
    if exists(select 1 from private.platform_owner where user_id=v_target) then raise exception using message='OWNER_PROTECTED',errcode='P0001'; end if;
    if (payload ? 'name' and length(btrim(payload->>'name')) not between 2 and 120) or (payload ? 'group' and length(btrim(payload->>'group')) not between 1 and 40) then raise exception using message='INVALID_PROFILE',errcode='P0001'; end if;
    if payload ? 'specialty' and not exists(select 1 from public.specialties where code=payload->>'specialty' and published) then raise exception using message='INVALID_SPECIALTY',errcode='P0001'; end if;
    update public.profiles set name=coalesce(btrim(payload->>'name'),name),group_name=coalesce(btrim(payload->>'group'),group_name),specialty_code=coalesce(payload->>'specialty',specialty_code) where id=v_target;
    if not found then raise exception using message='NOT_FOUND',errcode='P0001'; end if;
    insert into private.audit_log(actor_id,subject_id,action) values(v_user,v_target,'student_profile_edited');
    return jsonb_build_object('updated',true);
  elsif action='content_list' then
    with filtered as (select q.id as question_id,q.source_id,q.source_form,q.specialty_code,v.id,v.version,v.status,v.data from private.questions q join private.question_versions v on v.question_id=q.id where (coalesce(v_specialty,'')='' or q.specialty_code=v_specialty) and (coalesce(v_form,'')='' or q.source_form=v_form) and (v_state='' or v.status=v_state)), paged as (select * from filtered order by specialty_code,source_form,source_id,version desc limit v_limit offset (v_page-1)*v_limit)
    select jsonb_build_object('rows',coalesce((select jsonb_agg(jsonb_build_object('questionId',question_id,'versionId',id,'sourceId',source_id,'specialty',specialty_code,'form',source_form,'version',version,'status',status,'data',data)) from paged),'[]'::jsonb),'total',(select count(*) from filtered),'page',v_page,'pageSize',v_limit) into v_result;
    return v_result;
  elsif action='content_save' then
    v_id:=(payload->>'questionId')::uuid;
    select q.specialty_code into v_specialty from private.questions q where q.id=v_id for update;
    if not found then raise exception using message='NOT_FOUND',errcode='P0001'; end if;
    perform private.validate_question(payload->'data',v_specialty);
    if (select source_id from private.questions where id=v_id) is distinct from payload->'data'->>'id' then raise exception using message='INVALID_QUESTION',errcode='P0001'; end if;
    select id,version into v_target,v_ordinal from private.question_versions where question_id=v_id and data=payload->'data' order by version desc limit 1;
    if v_target is not null then return jsonb_build_object('versionId',v_target,'version',v_ordinal,'unchanged',true); end if;
    select coalesce(max(version),0)+1 into v_ordinal from private.question_versions where question_id=v_id;
    insert into private.question_versions(question_id,version,source_hash,area,indicator,difficulty,data,status) values(v_id,v_ordinal,encode(sha256(convert_to((payload->'data')::text,'UTF8')),'hex'),(payload->'data'->>'area')::integer,payload->'data'->>'indicator',payload->'data'->>'difficulty',payload->'data','draft') returning id into v_target;
    insert into private.audit_log(actor_id,action,detail) values(v_user,'content_draft_created',jsonb_build_object('questionId',v_id,'versionId',v_target));
    return jsonb_build_object('versionId',v_target,'version',v_ordinal,'status','draft');
  elsif action='content_create' then
    perform pg_advisory_xact_lock(hashtextextended('content:'||coalesce(v_specialty,''),0));
    if not exists(select 1 from public.forms where specialty_code=v_specialty and code=v_form) then raise exception using message='INVALID_SPECIALTY',errcode='P0001'; end if;
    perform private.validate_question(payload->'data',v_specialty);
    select q.id,v.id into v_id,v_target from private.questions q join private.question_versions v on v.question_id=q.id where q.specialty_code=v_specialty and q.source_form=v_form and q.source_id=payload->'data'->>'id' and v.data=payload->'data' limit 1;
    if v_target is not null then return jsonb_build_object('questionId',v_id,'versionId',v_target,'unchanged',true); end if;
    insert into private.questions(specialty_code,source_form,source_id) values(v_specialty,v_form,payload->'data'->>'id') returning id into v_id;
    insert into private.question_versions(question_id,version,source_hash,area,indicator,difficulty,data,status)
    values(v_id,1,encode(sha256(convert_to((payload->'data')::text,'UTF8')),'hex'),(payload->'data'->>'area')::integer,payload->'data'->>'indicator',payload->'data'->>'difficulty',payload->'data','draft') returning id into v_target;
    insert into private.audit_log(actor_id,action,detail) values(v_user,'content_created',jsonb_build_object('questionId',v_id,'versionId',v_target));
    return jsonb_build_object('questionId',v_id,'versionId',v_target,'version',1,'status','draft');
  elsif action='content_retire' then
    select * into v_version from private.question_versions where id=(payload->>'versionId')::uuid for update;
    if not found then raise exception using message='NOT_FOUND',errcode='P0001'; end if;
    select specialty_code into v_specialty from private.questions where id=v_version.question_id;
    perform pg_advisory_xact_lock(hashtextextended('content:'||v_specialty,0));
    update private.question_versions set status='retired' where id=v_version.id;
    for v_row in select form_code,quotas from private.blueprint_versions where specialty_code=v_specialty and status='published' loop perform private.validate_blueprint(v_specialty,v_row.form_code,v_row.quotas,true); end loop;
    insert into private.audit_log(actor_id,action,detail) values(v_user,'content_retired',jsonb_build_object('versionId',v_version.id));
    return jsonb_build_object('retired',true,'versionId',v_version.id);
  elsif action='content_publish' then
    select * into v_version from private.question_versions where id=(payload->>'versionId')::uuid for update;
    if not found then raise exception using message='NOT_FOUND',errcode='P0001'; end if;
    select specialty_code into v_specialty from private.questions where id=v_version.question_id;
    perform pg_advisory_xact_lock(hashtextextended('content:'||v_specialty,0));
    update private.question_versions set status='retired' where question_id=v_version.question_id and status='published' and id<>v_version.id;
    update private.question_versions set status='published',published_at=now() where id=v_version.id;
    for v_row in select form_code,quotas from private.blueprint_versions where specialty_code=v_specialty and status='published' loop perform private.validate_blueprint(v_specialty,v_row.form_code,v_row.quotas,true); end loop;
    insert into private.audit_log(actor_id,action,detail) values(v_user,'content_published',jsonb_build_object('versionId',v_version.id,'specialty',v_specialty));
    return jsonb_build_object('published',true,'versionId',v_version.id);
  elsif action='materials_list' then
    select coalesce(jsonb_agg(jsonb_build_object('id',id,'specialty',specialty_code,'kind',kind,'version',version,'title',title,'filename',filename,'sha256',sha256,'bytes',bytes,'status',status,'createdAt',created_at) order by specialty_code,kind,version desc),'[]'::jsonb) into v_result from private.material_versions where coalesce(v_specialty,'')='' or specialty_code=v_specialty;
    return jsonb_build_object('rows',v_result);
  elsif action='material_save' then
    perform pg_advisory_xact_lock(hashtextextended('content:'||coalesce(v_specialty,''),0));
    if not exists(select 1 from public.specialties where code=v_specialty) or payload->>'kind' not in ('tabla','libro')
      or coalesce(length(btrim(payload->>'title')),0) not between 1 and 200 or coalesce(length(payload->>'filename'),0) not between 1 and 200
      or payload->>'bucket' is distinct from 'study-materials' or payload->>'path' not like v_specialty||'/%' or strpos(payload->>'path','..')>0 then raise exception using message='INVALID_MATERIAL',errcode='P0001'; end if;
    select * into v_m from private.material_versions where specialty_code=v_specialty and kind=payload->>'kind' and sha256=payload->>'sha256';
    if found then return jsonb_build_object('id',v_m.id,'version',v_m.version,'status',v_m.status,'unchanged',true); end if;
    select coalesce(max(version),0)+1 into v_ordinal from private.material_versions where specialty_code=v_specialty and kind=payload->>'kind';
    insert into private.material_versions(specialty_code,kind,version,title,filename,bucket,object_path,sha256,bytes,status)
    values(v_specialty,payload->>'kind',v_ordinal,btrim(payload->>'title'),payload->>'filename','study-materials',payload->>'path',payload->>'sha256',(payload->>'bytes')::bigint,'draft') returning id into v_id;
    insert into private.audit_log(actor_id,action,detail) values(v_user,'material_draft_created',jsonb_build_object('id',v_id,'specialty',v_specialty,'sha256',payload->>'sha256'));
    return jsonb_build_object('id',v_id,'version',v_ordinal,'status','draft');
  elsif action='material_publish' then
    select * into v_m from private.material_versions where id=(payload->>'id')::uuid for update;
    if not found then raise exception using message='NOT_FOUND',errcode='P0001'; end if;
    perform pg_advisory_xact_lock(hashtextextended('content:'||v_m.specialty_code,0));
    if to_regclass('storage.objects') is not null then
      if not exists(select 1 from storage.objects where bucket_id=v_m.bucket and name=v_m.object_path) then raise exception using message='MATERIAL_FILE_MISSING',errcode='P0001'; end if;
    end if;
    update private.material_versions set status='retired' where specialty_code=v_m.specialty_code and kind=v_m.kind and status='published' and id<>v_m.id;
    update private.material_versions set status='published' where id=v_m.id;
    insert into private.audit_log(actor_id,action,detail) values(v_user,'material_published',jsonb_build_object('id',v_m.id,'specialty',v_m.specialty_code));
    return jsonb_build_object('published',true,'id',v_m.id);
  elsif action='blueprint_list' then
    select coalesce(jsonb_agg(jsonb_build_object('id',id,'specialty',specialty_code,'form',form_code,'version',version,'status',status,'quotas',quotas) order by specialty_code,form_code,version desc),'[]'::jsonb) into v_result from private.blueprint_versions where coalesce(v_specialty,'')='' or specialty_code=v_specialty;
    return jsonb_build_object('rows',v_result);
  elsif action='blueprint_save' then
    perform pg_advisory_xact_lock(hashtextextended('content:'||coalesce(v_specialty,''),0));
    perform private.validate_blueprint(v_specialty,v_form,payload->'quotas',false);
    select * into v_bp from private.blueprint_versions where specialty_code=v_specialty and form_code=v_form and quotas=payload->'quotas' limit 1;
    if found then return jsonb_build_object('id',v_bp.id,'version',v_bp.version,'status',v_bp.status,'unchanged',true); end if;
    select coalesce(max(version),0)+1 into v_ordinal from private.blueprint_versions where specialty_code=v_specialty and form_code=v_form;
    insert into private.blueprint_versions(specialty_code,form_code,version,quotas,status) values(v_specialty,v_form,v_ordinal,payload->'quotas','draft') returning id into v_id;
    insert into private.audit_log(actor_id,action,detail) values(v_user,'blueprint_draft_created',jsonb_build_object('id',v_id,'specialty',v_specialty,'form',v_form));
    return jsonb_build_object('id',v_id,'version',v_ordinal,'status','draft');
  elsif action='blueprint_publish' then
    select * into v_bp from private.blueprint_versions where id=(payload->>'id')::uuid for update;
    if not found then raise exception using message='NOT_FOUND',errcode='P0001'; end if;
    perform pg_advisory_xact_lock(hashtextextended('content:'||v_bp.specialty_code,0));
    perform private.validate_blueprint(v_bp.specialty_code,v_bp.form_code,v_bp.quotas,true);
    update private.blueprint_versions set status='retired' where specialty_code=v_bp.specialty_code and form_code=v_bp.form_code and status='published' and id<>v_bp.id;
    update private.blueprint_versions set status='published' where id=v_bp.id;
    insert into private.audit_log(actor_id,action,detail) values(v_user,'blueprint_published',jsonb_build_object('id',v_bp.id,'specialty',v_bp.specialty_code,'form',v_bp.form_code));
    return jsonb_build_object('published',true,'id',v_bp.id);
  end if;
  raise exception using message='UNKNOWN_ACTION',errcode='P0001';
end $$;
revoke all on function private.attempt_dto(uuid),private.item_dto(uuid,integer),private.finish_attempt(uuid),private.progress_dto(uuid,text) from public,anon,authenticated;
revoke all on function public.study(text,jsonb) from public,anon;
grant execute on function public.study(text,jsonb) to authenticated;
