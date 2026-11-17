CREATE OR REPLACE FUNCTION public.guard_institution_publication() RETURNS trigger LANGUAGE plpgsql SET search_path=public AS $$ DECLARE q jsonb; BEGIN
 IF TG_OP='UPDATE' AND (NEW.institution_id<>OLD.institution_id OR NEW.author_id<>OLD.author_id) THEN RAISE EXCEPTION 'Immutable owner'; END IF;
 IF NEW.status='published' AND NOT(coalesce(public.institution_role_of(NEW.institution_id)='direccion',false) OR coalesce(public.has_role(auth.uid(),'admin'),false)) THEN RAISE EXCEPTION 'Director approval required'; END IF;
 IF jsonb_typeof(NEW.questions)<>'array' OR jsonb_array_length(NEW.questions)>60 THEN RAISE EXCEPTION 'Invalid questions'; END IF;
 IF NEW.kind IN ('practica','simulacro') AND jsonb_array_length(NEW.questions)=0 THEN RAISE EXCEPTION 'Questions required'; END IF;
 FOR q IN SELECT value FROM jsonb_array_elements(NEW.questions) LOOP
 IF jsonb_typeof(q)<>'object' OR coalesce(length(q->>'q'),0)<3 OR length(q->>'q')>1000 OR jsonb_typeof(q->'options') IS DISTINCT FROM 'array' THEN RAISE EXCEPTION 'Invalid question'; END IF;
 IF jsonb_array_length(q->'options')<>4 OR (q->>'answer') IS NULL OR (q->>'answer') !~ '^[0-3]$' THEN RAISE EXCEPTION 'Invalid answer'; END IF;
 IF EXISTS(SELECT 1 FROM jsonb_array_elements(q->'options') o WHERE jsonb_typeof(o)<>'string' OR length(trim(o#>>'{}')) NOT BETWEEN 1 AND 500) THEN RAISE EXCEPTION 'Invalid option'; END IF;
 END LOOP;
 NEW.updated_at=now(); RETURN NEW; END $$;