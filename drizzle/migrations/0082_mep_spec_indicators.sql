CREATE TABLE public.mep_spec_indicators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL DEFAULT auth.uid(),
  modalidad text NOT NULL,
  nivel text NOT NULL,
  materia text NOT NULL,
  subarea text NOT NULL DEFAULT '',
  tema text NOT NULL DEFAULT '',
  indicador text NOT NULL CHECK (char_length(indicador) BETWEEN 5 AND 600),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.mep_spec_indicators TO authenticated;
GRANT ALL ON public.mep_spec_indicators TO service_role;
ALTER TABLE public.mep_spec_indicators ENABLE ROW LEVEL SECURITY;
CREATE POLICY "docentes leen propios y admin todos" ON public.mep_spec_indicators FOR SELECT TO authenticated
  USING (owner_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "docentes y admin guardan propios" ON public.mep_spec_indicators FOR INSERT TO authenticated
  WITH CHECK (owner_id = auth.uid() AND (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'teacher')));
CREATE POLICY "docentes borran propios" ON public.mep_spec_indicators FOR DELETE TO authenticated
  USING (owner_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE INDEX mep_spec_indicators_owner_idx ON public.mep_spec_indicators(owner_id, created_at DESC);