CREATE OR REPLACE FUNCTION public.validate_permission_request()
 RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE r public.institution_role;
BEGIN
  r := (SELECT m.member_role FROM public.institution_members m WHERE m.institution_id=NEW.institution_id AND m.user_id=NEW.requester_id);
  IF r IS NULL THEN RAISE EXCEPTION 'Debe pertenecer a la institución'; END IF;
  IF r='encargado' THEN RAISE EXCEPTION 'Las familias se comunican por su canal; los permisos los solicita el personal o el estudiante'; END IF;
  NEW.requester_role := r;
  IF r='estudiante' AND NEW.kind NOT IN ('cita_medica','incapacidad','cita_encargado','justificacion_ausencia','actividad_institucional','otro') THEN RAISE EXCEPTION 'Motivo no disponible para estudiantes'; END IF;
  IF r<>'estudiante' AND NEW.kind='justificacion_ausencia' THEN RAISE EXCEPTION 'La justificación de ausencia estudiantil es solo para estudiantes'; END IF;
  IF NEW.starts_on < (now() AT TIME ZONE 'America/Costa_Rica')::date - 30 THEN RAISE EXCEPTION 'La fecha de inicio no puede tener más de 30 días de antigüedad'; END IF;
  IF NEW.ends_on > NEW.starts_on + 90 THEN RAISE EXCEPTION 'Un permiso no puede exceder 90 días'; END IF;
  RETURN NEW;
END $function$;