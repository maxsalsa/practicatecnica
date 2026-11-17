DO $test$
DECLARE admin_id uuid; original_claims text := current_setting('request.jwt.claims', true);
BEGIN
 SELECT user_id INTO admin_id FROM public.user_roles WHERE role = 'admin' LIMIT 1;
 IF admin_id IS NULL THEN RAISE EXCEPTION 'Role privacy test needs an existing admin'; END IF;
 PERFORM set_config('request.jwt.claims', json_build_object('sub','00000000-0000-0000-0000-000000000099','role','authenticated')::text, true);
 IF public.has_role(admin_id, 'admin') THEN RAISE EXCEPTION 'An unrelated caller can see admin role'; END IF;
 PERFORM set_config('request.jwt.claims', json_build_object('sub',admin_id,'role','authenticated')::text, true);
 IF NOT public.has_role(admin_id, 'admin') THEN RAISE EXCEPTION 'Self admin check broken'; END IF;
 PERFORM set_config('request.jwt.claims', coalesce(original_claims, ''), true);
END;
$test$;