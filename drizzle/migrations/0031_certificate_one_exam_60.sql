CREATE OR REPLACE FUNCTION public.issue_certificate(_attempt uuid)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE a record; n text; h text; ids uuid[]; stamp timestamptz; payload text;
BEGIN
 IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Ingrese para emitir'; END IF;
 SELECT hash INTO h FROM certificates WHERE attempt_id=_attempt AND user_id=auth.uid();
 IF h IS NOT NULL THEN RETURN h; END IF;
 SELECT * INTO a FROM practice_attempts WHERE id=_attempt AND user_id=auth.uid() AND verified_scoring AND assessment_mode='exam' AND certification_subject IS NOT NULL AND score>=60;
 IF NOT FOUND THEN RAISE EXCEPTION 'Requiere un simulacro verificado con nota de 60 o más'; END IF;
 ids:=ARRAY[a.id];
 SELECT coalesce(nullif(display_name,''),'Estudiante') INTO n FROM profiles WHERE id=auth.uid();
 stamp:=now(); payload:=jsonb_build_object('version',3,'holder',n,'title',a.title,'subject',a.certification_subject,'score',a.score,'issued_at',stamp,'evidence',ids,'nonce',gen_random_uuid())::text;
 h:=encode(digest(payload,'sha256'),'hex');
 INSERT INTO certificates(hash,user_id,attempt_id,holder,title,score,issued_at,evidence_ids,canonical_payload) VALUES(h,auth.uid(),a.id,n,a.title,a.score,stamp,ids,payload);
 RETURN h;
END $function$;