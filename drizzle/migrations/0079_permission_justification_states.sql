CREATE OR REPLACE FUNCTION public.permission_justification_states()
RETURNS TABLE(id uuid, justification_status text, justification_note text, justification_reviewed_at timestamptz)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT r.id, r.justification_status, r.justification_note, r.justification_reviewed_at
  FROM public.staff_permission_requests r
  WHERE (r.requester_id=auth.uid() OR public.can_review_permissions(r.institution_id)) AND r.justification_status IS NOT NULL
$$;
REVOKE ALL ON FUNCTION public.permission_justification_states() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.permission_justification_states() TO authenticated;