CREATE TABLE public.permission_edit_history (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, request_id uuid NOT NULL REFERENCES public.staff_permission_requests(id), actor_id uuid NOT NULL, previous_values jsonb NOT NULL, new_values jsonb NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.permission_edit_history TO authenticated;
GRANT ALL ON public.permission_edit_history TO service_role;
ALTER TABLE public.permission_edit_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY permission_edit_participants ON public.permission_edit_history FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.staff_permission_requests r WHERE r.id=request_id AND (r.requester_id=auth.uid() OR public.can_review_permissions(r.institution_id))));
CREATE FUNCTION public.edit_pending_permission(_id uuid, _starts_on date, _ends_on date, _hours text, _reason text, _urgent boolean) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE r public.staff_permission_requests; next_values jsonb;
BEGIN
SELECT * INTO r FROM public.staff_permission_requests WHERE id=_id FOR UPDATE;
IF NOT FOUND OR auth.uid() IS NULL OR r.requester_id IS DISTINCT FROM auth.uid() OR public.institution_role_of(r.institution_id) IS NULL THEN RAISE EXCEPTION 'Solo puede modificar solicitudes propias de su institución' USING ERRCODE='42501'; END IF;
IF r.status<>'pendiente' THEN RAISE EXCEPTION 'Solo se modifican solicitudes pendientes'; END IF;
IF _starts_on IS NULL OR _ends_on IS NULL OR _ends_on<_starts_on OR _starts_on<(now() AT TIME ZONE 'America/Costa_Rica')::date-30 OR _ends_on>_starts_on+90 THEN RAISE EXCEPTION 'Fechas inválidas'; END IF;
IF _reason IS NULL OR length(btrim(_reason)) NOT BETWEEN 5 AND 1000 OR length(coalesce(_hours,''))>60 OR _urgent IS NULL THEN RAISE EXCEPTION 'Detalle inválido'; END IF;
next_values:=jsonb_build_object('starts_on',_starts_on,'ends_on',_ends_on,'hours',nullif(btrim(_hours),''),'reason',btrim(_reason),'urgent',_urgent);
INSERT INTO public.permission_edit_history(request_id,actor_id,previous_values,new_values) VALUES(r.id,auth.uid(),jsonb_build_object('starts_on',r.starts_on,'ends_on',r.ends_on,'hours',r.hours,'reason',r.reason,'urgent',r.urgent),next_values);
UPDATE public.staff_permission_requests SET starts_on=_starts_on, ends_on=_ends_on, hours=nullif(btrim(_hours),''),reason=btrim(_reason),urgent=_urgent WHERE id=_id;
END $$;
REVOKE ALL ON FUNCTION public.edit_pending_permission(uuid,date,date,text,text,boolean) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.edit_pending_permission(uuid,date,date,text,text,boolean) TO authenticated;