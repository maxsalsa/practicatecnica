DO $test$
DECLARE definition text;
BEGIN
 SELECT pg_get_functiondef('public.my_access()'::regprocedure) INTO definition;
 IF position('adm:=public.has_role(me,''admin'');' in definition)=0 THEN RAISE EXCEPTION 'Administrator bypass must remain'; END IF;
 IF position('public.has_role(me,''teacher'')' in definition)>0 THEN RAISE EXCEPTION 'Teacher role must not bypass payment'; END IF;
 IF position('p.status=''confirmed''' in definition)=0 THEN RAISE EXCEPTION 'Only confirmed payments may grant access'; END IF;
END;
$test$;