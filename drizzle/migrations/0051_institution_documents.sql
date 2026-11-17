CREATE TABLE public.institution_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
  title text NOT NULL CHECK (char_length(title) BETWEEN 3 AND 150),
  path text NOT NULL UNIQUE,
  created_by uuid NOT NULL DEFAULT auth.uid(),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.institution_documents TO authenticated;
GRANT ALL ON public.institution_documents TO service_role;
ALTER TABLE public.institution_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members read docs" ON public.institution_documents FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.institution_role_of(institution_id) IS NOT NULL);
CREATE POLICY "direccion adds docs" ON public.institution_documents FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid() AND split_part(path,'/',1) = institution_id::text
    AND (public.has_role(auth.uid(),'admin') OR coalesce(public.institution_role_of(institution_id)='direccion',false)));
CREATE POLICY "direccion deletes docs" ON public.institution_documents FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR coalesce(public.institution_role_of(institution_id)='direccion',false));

CREATE POLICY "inst docs read" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id='institution-docs' AND (public.has_role(auth.uid(),'admin') OR EXISTS(SELECT 1 FROM public.institution_members m WHERE m.user_id=auth.uid() AND m.institution_id::text=(storage.foldername(name))[1])));
CREATE POLICY "inst docs upload" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id='institution-docs' AND (public.has_role(auth.uid(),'admin') OR EXISTS(SELECT 1 FROM public.institution_members m WHERE m.user_id=auth.uid() AND m.member_role='direccion' AND m.institution_id::text=(storage.foldername(name))[1])));
CREATE POLICY "inst docs delete" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id='institution-docs' AND (public.has_role(auth.uid(),'admin') OR EXISTS(SELECT 1 FROM public.institution_members m WHERE m.user_id=auth.uid() AND m.member_role='direccion' AND m.institution_id::text=(storage.foldername(name))[1])));