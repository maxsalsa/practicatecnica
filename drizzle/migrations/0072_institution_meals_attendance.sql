CREATE TABLE public.institution_service_operators (institution_id uuid NOT NULL REFERENCES public.institutions(id), user_id uuid NOT NULL, service text NOT NULL CHECK(service IN ('comedor','asistencia')), PRIMARY KEY(institution_id,user_id,service));
GRANT SELECT ON public.institution_service_operators TO authenticated; GRANT ALL ON public.institution_service_operators TO service_role;
ALTER TABLE public.institution_service_operators ENABLE ROW LEVEL SECURITY;
CREATE FUNCTION public.school_service_manager(_inst uuid) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$ SELECT coalesce(public.has_role(auth.uid(),'admin') OR public.institution_role_of(_inst) IN ('direccion','subdireccion'),false) AND NOT EXISTS(SELECT 1 FROM public.account_status WHERE user_id=auth.uid() AND status IN ('blocked','inactive')) $$;
CREATE FUNCTION public.school_service_operator(_inst uuid,_service text) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$ SELECT public.school_service_manager(_inst) OR (public.institution_role_of(_inst) IS NOT NULL AND EXISTS(SELECT 1 FROM public.institution_service_operators WHERE institution_id=_inst AND user_id=auth.uid() AND service=_service)) $$;
CREATE POLICY service_operator_read ON public.institution_service_operators FOR SELECT TO authenticated USING(public.school_service_manager(institution_id) OR user_id=auth.uid());
CREATE TABLE public.institution_credentials (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), institution_id uuid NOT NULL REFERENCES public.institutions(id), user_id uuid NOT NULL, identification text NOT NULL DEFAULT '', active boolean NOT NULL DEFAULT true, created_by uuid NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(institution_id,user_id));
GRANT SELECT ON public.institution_credentials TO authenticated; GRANT ALL ON public.institution_credentials TO service_role;
ALTER TABLE public.institution_credentials ENABLE ROW LEVEL SECURITY;
CREATE FUNCTION public.school_family_can_read(_inst uuid,_user uuid) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$ SELECT public.institution_role_of(_inst) IS NOT NULL AND (auth.uid()=_user OR EXISTS(SELECT 1 FROM public.guardian_links WHERE institution_id=_inst AND student_id=_user AND guardian_id=auth.uid() AND consented_at IS NOT NULL)) $$;
CREATE POLICY credential_read ON public.institution_credentials FOR SELECT TO authenticated USING(public.school_service_manager(institution_id) OR public.school_family_can_read(institution_id,user_id));
CREATE TABLE public.institution_meal_settings (institution_id uuid PRIMARY KEY REFERENCES public.institutions(id), student_price integer NOT NULL DEFAULT 700 CHECK(student_price>0), teacher_price integer NOT NULL DEFAULT 1400 CHECK(teacher_price>0), universal_free boolean NOT NULL DEFAULT false, sinpe_account text NOT NULL DEFAULT '', updated_by uuid NOT NULL, updated_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.institution_meal_settings TO authenticated; GRANT ALL ON public.institution_meal_settings TO service_role;
ALTER TABLE public.institution_meal_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY meal_settings_read ON public.institution_meal_settings FOR SELECT TO authenticated USING(public.institution_role_of(institution_id) IS NOT NULL OR public.school_service_manager(institution_id));
CREATE TABLE public.institution_meal_coverage (institution_id uuid NOT NULL REFERENCES public.institutions(id), user_id uuid NOT NULL, kind text NOT NULL DEFAULT 'tiquete' CHECK(kind IN ('tiquete','beca','cortesia')), reason text NOT NULL DEFAULT '', approved_by uuid NOT NULL, updated_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(institution_id,user_id));
GRANT SELECT ON public.institution_meal_coverage TO authenticated; GRANT ALL ON public.institution_meal_coverage TO service_role;
ALTER TABLE public.institution_meal_coverage ENABLE ROW LEVEL SECURITY;
CREATE POLICY coverage_read ON public.institution_meal_coverage FOR SELECT TO authenticated USING(public.school_service_operator(institution_id,'comedor') OR public.school_family_can_read(institution_id,user_id));
CREATE TABLE public.institution_ticket_purchases (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), institution_id uuid NOT NULL REFERENCES public.institutions(id), user_id uuid NOT NULL, quantity integer NOT NULL CHECK(quantity>0), unit_price integer NOT NULL CHECK(unit_price>0), method text NOT NULL CHECK(method IN ('efectivo','sinpe')), reference text NOT NULL DEFAULT '', status text NOT NULL CHECK(status IN ('pendiente','confirmado','anulado')), created_by uuid NOT NULL, reviewed_by uuid, created_at timestamptz NOT NULL DEFAULT now(), reviewed_at timestamptz);
GRANT SELECT ON public.institution_ticket_purchases TO authenticated; GRANT ALL ON public.institution_ticket_purchases TO service_role;
ALTER TABLE public.institution_ticket_purchases ENABLE ROW LEVEL SECURITY;
CREATE UNIQUE INDEX meal_sinpe_reference ON public.institution_ticket_purchases(institution_id,reference) WHERE method='sinpe' AND status<>'anulado';
CREATE POLICY purchase_read ON public.institution_ticket_purchases FOR SELECT TO authenticated USING(public.school_service_operator(institution_id,'comedor') OR public.school_family_can_read(institution_id,user_id));
CREATE TABLE public.institution_meal_deliveries (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), institution_id uuid NOT NULL REFERENCES public.institutions(id), user_id uuid NOT NULL, service text NOT NULL, local_day date NOT NULL DEFAULT (now() AT TIME ZONE 'America/Costa_Rica')::date, coverage text NOT NULL CHECK(coverage IN ('tiquete','beca','cortesia','universal')), recorded_by uuid NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(institution_id,user_id,service,local_day));
GRANT SELECT ON public.institution_meal_deliveries TO authenticated; GRANT ALL ON public.institution_meal_deliveries TO service_role;
ALTER TABLE public.institution_meal_deliveries ENABLE ROW LEVEL SECURITY;
CREATE POLICY delivery_read ON public.institution_meal_deliveries FOR SELECT TO authenticated USING(public.school_service_operator(institution_id,'comedor') OR public.school_family_can_read(institution_id,user_id));
CREATE TABLE public.institution_attendance_sessions (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), institution_id uuid NOT NULL REFERENCES public.institutions(id), section_id uuid NOT NULL REFERENCES public.institution_sections(id), subject text NOT NULL, created_by uuid NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.institution_attendance_sessions TO authenticated; GRANT ALL ON public.institution_attendance_sessions TO service_role;
ALTER TABLE public.institution_attendance_sessions ENABLE ROW LEVEL SECURITY;
CREATE FUNCTION public.school_attendance_operator(_session uuid) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$ SELECT EXISTS(SELECT 1 FROM public.institution_attendance_sessions a JOIN public.institution_sections s ON s.id=a.section_id WHERE a.id=_session AND (public.school_service_operator(a.institution_id,'asistencia') OR (s.guide_id=auth.uid() AND public.institution_role_of(a.institution_id) IS NOT NULL))) $$;
CREATE POLICY session_read ON public.institution_attendance_sessions FOR SELECT TO authenticated USING(public.school_attendance_operator(id) OR EXISTS(SELECT 1 FROM public.section_students x WHERE x.section_id=institution_attendance_sessions.section_id AND public.school_family_can_read(institution_id,x.student_id)));
CREATE TABLE public.institution_attendance_records (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), session_id uuid NOT NULL REFERENCES public.institution_attendance_sessions(id), institution_id uuid NOT NULL REFERENCES public.institutions(id), student_id uuid NOT NULL, status text NOT NULL DEFAULT 'presente' CHECK(status IN ('presente','ausente','justificada')), arrived_at timestamptz NOT NULL DEFAULT now(), recorded_by uuid NOT NULL, updated_at timestamptz NOT NULL DEFAULT now(), UNIQUE(session_id,student_id));
GRANT SELECT ON public.institution_attendance_records TO authenticated; GRANT ALL ON public.institution_attendance_records TO service_role;
ALTER TABLE public.institution_attendance_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY attendance_read ON public.institution_attendance_records FOR SELECT TO authenticated USING(public.school_attendance_operator(session_id) OR public.school_family_can_read(institution_id,student_id));
CREATE TABLE public.institution_service_events (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, institution_id uuid NOT NULL REFERENCES public.institutions(id), actor_id uuid NOT NULL, action text NOT NULL, subject_id uuid, details jsonb NOT NULL DEFAULT '{}', created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.institution_service_events TO authenticated; GRANT ALL ON public.institution_service_events TO service_role;
ALTER TABLE public.institution_service_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY service_audit_read ON public.institution_service_events FOR SELECT TO authenticated USING(public.school_service_manager(institution_id));
CREATE FUNCTION public.school_service_action(_inst uuid,_action text,_data jsonb DEFAULT '{}') RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE target uuid; cred public.institution_credentials; r public.institution_role; settings public.institution_meal_settings; coverage text; balance bigint; sid uuid; rowid uuid; q integer; price integer; purchase public.institution_ticket_purchases; oldrecord public.institution_attendance_records; sec uuid; result jsonb;
BEGIN
IF auth.uid() IS NULL OR EXISTS(SELECT 1 FROM public.account_status WHERE user_id=auth.uid() AND status IN ('blocked','inactive')) THEN RAISE EXCEPTION 'Sin permiso'; END IF;
IF _action IN ('settings','credential','coverage','operator') THEN
 IF NOT public.school_service_manager(_inst) THEN RAISE EXCEPTION 'Sin permiso'; END IF;
 IF _action='settings' THEN
 INSERT INTO public.institution_meal_settings(institution_id,student_price,teacher_price,universal_free,sinpe_account,updated_by) VALUES(_inst,(_data->>'student_price')::integer,(_data->>'teacher_price')::integer,coalesce((_data->>'universal_free')::boolean,false),coalesce(_data->>'sinpe_account',''),auth.uid()) ON CONFLICT(institution_id) DO UPDATE SET student_price=excluded.student_price,teacher_price=excluded.teacher_price,universal_free=excluded.universal_free,sinpe_account=excluded.sinpe_account,updated_by=auth.uid(),updated_at=now();
 ELSE
 target:=(_data->>'user_id')::uuid;
 SELECT member_role INTO r FROM public.institution_members WHERE institution_id=_inst AND user_id=target;
 IF r IS NULL OR r='encargado' THEN RAISE EXCEPTION 'Persona no elegible'; END IF;
 IF _action='credential' THEN
 INSERT INTO public.institution_credentials(institution_id,user_id,identification,created_by) VALUES(_inst,target,btrim(coalesce(_data->>'identification','')),auth.uid()) ON CONFLICT(institution_id,user_id) DO UPDATE SET identification=excluded.identification,active=coalesce((_data->>'active')::boolean,true);
 ELSIF _action='coverage' THEN
 IF _data->>'kind'<>'tiquete' AND length(btrim(coalesce(_data->>'reason','')))<3 THEN RAISE EXCEPTION 'Indique motivo de autorización'; END IF;
 INSERT INTO public.institution_meal_coverage(institution_id,user_id,kind,reason,approved_by) VALUES(_inst,target,_data->>'kind',coalesce(_data->>'reason',''),auth.uid()) ON CONFLICT(institution_id,user_id) DO UPDATE SET kind=excluded.kind,reason=excluded.reason,approved_by=auth.uid(),updated_at=now();
 ELSE
 IF r='estudiante' OR _data->>'service' NOT IN ('comedor','asistencia') THEN RAISE EXCEPTION 'Responsable no elegible'; END IF;
 IF coalesce((_data->>'enabled')::boolean,false) THEN INSERT INTO public.institution_service_operators VALUES(_inst,target,_data->>'service') ON CONFLICT DO NOTHING; ELSE DELETE FROM public.institution_service_operators WHERE institution_id=_inst AND user_id=target AND service=_data->>'service'; END IF;
 END IF; END IF;
ELSIF _action='session' THEN
 sec:=(_data->>'section_id')::uuid;
 IF NOT EXISTS(SELECT 1 FROM public.institution_sections WHERE id=sec AND institution_id=_inst AND (public.school_service_operator(_inst,'asistencia') OR (guide_id=auth.uid() AND public.institution_role_of(_inst) IS NOT NULL))) THEN RAISE EXCEPTION 'Sin permiso de sección'; END IF;
 IF length(btrim(coalesce(_data->>'subject','')))<2 THEN RAISE EXCEPTION 'Indique materia'; END IF;
 INSERT INTO public.institution_attendance_sessions(institution_id,section_id,subject,created_by) VALUES(_inst,sec,btrim(_data->>'subject'),auth.uid()) RETURNING id INTO rowid;
ELSIF _action='attendance' THEN
 sid:=(_data->>'session_id')::uuid;
 IF NOT public.school_attendance_operator(sid) OR NOT EXISTS(SELECT 1 FROM public.institution_attendance_sessions WHERE id=sid AND institution_id=_inst) THEN RAISE EXCEPTION 'Sin permiso de clase'; END IF;
 SELECT * INTO cred FROM public.institution_credentials WHERE institution_id=_inst AND active AND (id::text=replace(_data->>'code','PT-PERSONA:','') OR (identification<>'' AND identification=_data->>'code')) LIMIT 1;
 IF cred.id IS NULL THEN RAISE EXCEPTION 'Credencial no registrada'; END IF;
 target:=cred.user_id;
 IF NOT EXISTS(SELECT 1 FROM public.institution_attendance_sessions a JOIN public.section_students x ON x.section_id=a.section_id JOIN public.institution_members m ON m.user_id=x.student_id AND m.institution_id=a.institution_id WHERE a.id=sid AND x.student_id=target AND m.member_role='estudiante') THEN RAISE EXCEPTION 'Estudiante no pertenece a esta clase'; END IF;
 INSERT INTO public.institution_attendance_records(session_id,institution_id,student_id,recorded_by) VALUES(sid,_inst,target,auth.uid()) ON CONFLICT(session_id,student_id) DO NOTHING RETURNING id INTO rowid;
 IF rowid IS NULL THEN RETURN jsonb_build_object('ok',true,'duplicate',true); END IF;
ELSIF _action='correct_attendance' THEN
 rowid:=(_data->>'id')::uuid; SELECT * INTO oldrecord FROM public.institution_attendance_records WHERE id=rowid AND institution_id=_inst;
 IF oldrecord.id IS NULL OR NOT public.school_attendance_operator(oldrecord.session_id) OR length(btrim(coalesce(_data->>'reason','')))<3 THEN RAISE EXCEPTION 'Sin permiso o motivo'; END IF;
 target:=oldrecord.student_id;
 UPDATE public.institution_attendance_records SET status=_data->>'status',updated_at=now() WHERE id=rowid;
 _data:=_data||jsonb_build_object('previous_status',oldrecord.status);
ELSIF _action IN ('lookup','purchase','deliver') THEN
 IF NOT public.school_service_operator(_inst,'comedor') THEN RAISE EXCEPTION 'Sin permiso de comedor'; END IF;
 SELECT * INTO cred FROM public.institution_credentials WHERE institution_id=_inst AND active AND (id::text=replace(_data->>'code','PT-PERSONA:','') OR (identification<>'' AND identification=_data->>'code')) LIMIT 1;
 IF cred.id IS NULL THEN RAISE EXCEPTION 'Credencial no registrada'; END IF;
 target:=cred.user_id;
 SELECT member_role INTO r FROM public.institution_members WHERE institution_id=_inst AND user_id=target;
 IF r IS NULL OR r='encargado' OR EXISTS(SELECT 1 FROM public.account_status WHERE user_id=target AND status IN ('blocked','inactive')) THEN RAISE EXCEPTION 'Persona no elegible'; END IF;
 PERFORM pg_advisory_xact_lock(hashtextextended(_inst::text||target::text,0));
 SELECT * INTO settings FROM public.institution_meal_settings WHERE institution_id=_inst;
 IF settings.institution_id IS NULL THEN RAISE EXCEPTION 'Dirección debe configurar comedor'; END IF;
 SELECT kind INTO coverage FROM public.institution_meal_coverage WHERE institution_id=_inst AND user_id=target;
 coverage:=CASE WHEN settings.universal_free THEN 'universal' ELSE coalesce(coverage,'tiquete') END;
 SELECT coalesce(sum(quantity),0) INTO balance FROM public.institution_ticket_purchases WHERE institution_id=_inst AND user_id=target AND status='confirmado';
 balance:=balance-(SELECT count(*) FROM public.institution_meal_deliveries WHERE institution_id=_inst AND user_id=target AND coverage='tiquete');
 price:=CASE WHEN r='estudiante' THEN settings.student_price ELSE settings.teacher_price END;
 IF _action='lookup' THEN RETURN jsonb_build_object('ok',true,'user_id',target,'name',(SELECT display_name FROM public.profiles WHERE id=target),'coverage',coverage,'balance',balance,'unit_price',price,'role',r); END IF;
 IF _action='purchase' THEN
 q:=(_data->>'quantity')::integer; IF q IS NULL OR q<=0 THEN RAISE EXCEPTION 'Cantidad inválida'; END IF;
 IF _data->>'method'='sinpe' AND (length(btrim(coalesce(_data->>'reference','')))<3 OR settings.sinpe_account='') THEN RAISE EXCEPTION 'Configure SINPE e indique referencia'; END IF;
 INSERT INTO public.institution_ticket_purchases(institution_id,user_id,quantity,unit_price,method,reference,status,created_by,reviewed_by,reviewed_at) VALUES(_inst,target,q,price,_data->>'method',coalesce(_data->>'reference',''),CASE WHEN _data->>'method'='efectivo' THEN 'confirmado' ELSE 'pendiente' END,auth.uid(),CASE WHEN _data->>'method'='efectivo' THEN auth.uid() END,CASE WHEN _data->>'method'='efectivo' THEN now() END) RETURNING id INTO rowid;
 ELSE
 IF length(btrim(coalesce(_data->>'service','')))<2 THEN RAISE EXCEPTION 'Indique servicio'; END IF;
 IF EXISTS(SELECT 1 FROM public.institution_meal_deliveries WHERE institution_id=_inst AND user_id=target AND service=btrim(_data->>'service') AND local_day=(now() AT TIME ZONE 'America/Costa_Rica')::date) THEN RETURN jsonb_build_object('ok',true,'duplicate',true); END IF;
 IF coverage='tiquete' AND balance<=0 THEN RAISE EXCEPTION 'Sin tiquetes disponibles'; END IF;
 INSERT INTO public.institution_meal_deliveries(institution_id,user_id,service,coverage,recorded_by) VALUES(_inst,target,btrim(_data->>'service'),coverage,auth.uid()) RETURNING id INTO rowid;
 END IF;
ELSIF _action='confirm_purchase' THEN
 IF NOT public.school_service_operator(_inst,'comedor') THEN RAISE EXCEPTION 'Sin permiso'; END IF;
 SELECT * INTO purchase FROM public.institution_ticket_purchases WHERE id=(_data->>'id')::uuid AND institution_id=_inst FOR UPDATE;
 IF purchase.id IS NULL OR purchase.status<>'pendiente' OR length(btrim(coalesce(_data->>'reason','')))<3 THEN RAISE EXCEPTION 'Compra no pendiente o sin evidencia'; END IF;
 target:=purchase.user_id; PERFORM pg_advisory_xact_lock(hashtextextended(_inst::text||target::text,0));
 UPDATE public.institution_ticket_purchases SET status='confirmado',reviewed_by=auth.uid(),reviewed_at=now() WHERE id=purchase.id; rowid:=purchase.id;
ELSE RAISE EXCEPTION 'Acción no válida'; END IF;
INSERT INTO public.institution_service_events(institution_id,actor_id,action,subject_id,details) VALUES(_inst,auth.uid(),_action,target,_data||jsonb_build_object('record_id',rowid));
RETURN jsonb_build_object('ok',true,'id',rowid);
END $$;
REVOKE ALL ON FUNCTION public.school_service_action(uuid,text,jsonb) FROM PUBLIC,anon; GRANT EXECUTE ON FUNCTION public.school_service_action(uuid,text,jsonb) TO authenticated;
