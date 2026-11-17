CREATE OR REPLACE FUNCTION public.set_institution_logo(_inst uuid, _path text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT (public.has_role(auth.uid(),'admin') OR coalesce(public.institution_role_of(_inst) = 'direccion', false)) THEN
    RAISE EXCEPTION 'not allowed';
  END IF;
  IF _path IS NULL OR split_part(_path,'/',1) <> _inst::text OR _path !~ '^[0-9a-f-]{36}/logo-[0-9]+\.(png|jpg|webp)$' THEN
    RAISE EXCEPTION 'invalid path';
  END IF;
  UPDATE public.institutions SET logo_path = _path WHERE id = _inst;
END $$;
REVOKE ALL ON FUNCTION public.set_institution_logo(uuid, text) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.set_institution_logo(uuid, text) TO authenticated;

CREATE POLICY "direccion uploads own institution logo" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id='institution-logos' AND EXISTS(SELECT 1 FROM public.institution_members m WHERE m.user_id=auth.uid() AND m.member_role='direccion' AND m.institution_id::text=(storage.foldername(name))[1]));
CREATE POLICY "direccion removes own institution logo" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id='institution-logos' AND EXISTS(SELECT 1 FROM public.institution_members m WHERE m.user_id=auth.uid() AND m.member_role='direccion' AND m.institution_id::text=(storage.foldername(name))[1]));