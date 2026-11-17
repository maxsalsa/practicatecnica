CREATE OR REPLACE FUNCTION public.create_access_code(_code text,_days integer,_max_uses integer) RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE c text;
BEGIN IF NOT public.has_role(auth.uid(),'admin') THEN RAISE EXCEPTION 'forbidden'; END IF;
c := 'PT-' || upper(substr(translate(encode(extensions.gen_random_bytes(18),'base64'),'+/=0OIl1',''),1,16));
INSERT INTO public.access_codes(code,days,max_uses,created_by) VALUES(c,_days,_max_uses,auth.uid()); RETURN c; END $$;
-- Close legacy guessable codes to new redemptions; existing redemptions keep their access period.
UPDATE public.access_codes SET max_uses = uses WHERE length(code) < 19 AND uses < max_uses;