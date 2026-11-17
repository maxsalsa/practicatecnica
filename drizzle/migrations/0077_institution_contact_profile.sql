CREATE TABLE public.institution_contact_profiles (
 institution_id uuid PRIMARY KEY REFERENCES public.institutions(id) ON DELETE CASCADE,
 regional_direction text NOT NULL DEFAULT '' CHECK (length(regional_direction)<=120),
 circuit text NOT NULL DEFAULT '' CHECK (length(circuit)<=40),
 director_name text NOT NULL DEFAULT '' CHECK (length(director_name)<=160),
 phone text NOT NULL DEFAULT '' CHECK (length(phone)<=40),
 address text NOT NULL DEFAULT '' CHECK (length(address)<=400),
 website text NOT NULL DEFAULT '' CHECK (website='' OR (website ~ '^https://' AND length(website)<=400)),
 facebook text NOT NULL DEFAULT '' CHECK (facebook='' OR (facebook ~ '^https://' AND length(facebook)<=400)),
 instagram text NOT NULL DEFAULT '' CHECK (instagram='' OR (instagram ~ '^https://' AND length(instagram)<=400)),
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT,INSERT,UPDATE ON public.institution_contact_profiles TO authenticated;
GRANT ALL ON public.institution_contact_profiles TO service_role;
ALTER TABLE public.institution_contact_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY contact_profile_read ON public.institution_contact_profiles FOR SELECT TO authenticated USING (coalesce(public.has_role(auth.uid(),'admin'),false) OR public.institution_role_of(institution_id) IS NOT NULL);
CREATE POLICY contact_profile_insert ON public.institution_contact_profiles FOR INSERT TO authenticated WITH CHECK (coalesce(public.has_role(auth.uid(),'admin'),false) OR coalesce(public.institution_role_of(institution_id)='direccion',false));
CREATE POLICY contact_profile_update ON public.institution_contact_profiles FOR UPDATE TO authenticated USING (coalesce(public.has_role(auth.uid(),'admin'),false) OR coalesce(public.institution_role_of(institution_id)='direccion',false)) WITH CHECK (coalesce(public.has_role(auth.uid(),'admin'),false) OR coalesce(public.institution_role_of(institution_id)='direccion',false));