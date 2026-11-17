CREATE OR REPLACE FUNCTION public.my_institutions()
 RETURNS TABLE(id uuid, name text, logo_path text, is_test boolean, kind text, member_role institution_role, paid_until timestamp with time zone)
 LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
  SELECT i.id, i.name, i.logo_path, i.is_test, i.kind, m.member_role,
    CASE WHEN m.member_role='direccion' THEN public.institution_paid_until(i.id) END
  FROM public.institution_members m JOIN public.institutions i ON i.id=m.institution_id
  WHERE m.user_id=auth.uid()
    AND NOT EXISTS(SELECT 1 FROM public.account_status a WHERE a.user_id=auth.uid() AND a.status IN ('blocked','inactive'))
  ORDER BY i.name
$function$;
REVOKE EXECUTE ON FUNCTION public.institution_paid_until(uuid) FROM PUBLIC, anon, authenticated;