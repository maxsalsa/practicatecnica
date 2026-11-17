CREATE TABLE public.institution_tariffs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
  service text NOT NULL CHECK (service IN ('matricula','comedor','circuito_vial','otro')),
  label text NOT NULL CHECK (char_length(btrim(label)) BETWEEN 2 AND 120),
  level text CHECK (level IS NULL OR char_length(level) BETWEEN 1 AND 60),
  vehicle text CHECK (vehicle IS NULL OR vehicle IN ('carro','moto','trailer','bicicleta','bicimoto','taxi','autobus','especial')),
  license_category text CHECK (license_category IS NULL OR char_length(license_category) BETWEEN 1 AND 20),
  amount integer NOT NULL CHECK (amount BETWEEN 0 AND 10000000),
  active boolean NOT NULL DEFAULT true,
  updated_by uuid NOT NULL DEFAULT auth.uid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.institution_tariffs TO authenticated;
GRANT ALL ON public.institution_tariffs TO service_role;
ALTER TABLE public.institution_tariffs ENABLE ROW LEVEL SECURITY;
CREATE UNIQUE INDEX institution_tariffs_active_scope ON public.institution_tariffs (institution_id, service, coalesce(level,''), coalesce(vehicle,''), coalesce(license_category,'')) WHERE active;
CREATE POLICY tariffs_read ON public.institution_tariffs FOR SELECT TO authenticated USING (public.institution_role_of(institution_id) IS NOT NULL OR public.school_service_manager(institution_id));
CREATE POLICY tariffs_insert ON public.institution_tariffs FOR INSERT TO authenticated WITH CHECK (public.school_service_manager(institution_id));
CREATE POLICY tariffs_update ON public.institution_tariffs FOR UPDATE TO authenticated USING (public.school_service_manager(institution_id)) WITH CHECK (public.school_service_manager(institution_id));

CREATE TABLE public.institution_discounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id uuid NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
  name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 2 AND 120),
  criteria text NOT NULL DEFAULT '' CHECK (char_length(criteria) <= 500),
  priority smallint NOT NULL CHECK (priority BETWEEN 1 AND 99),
  kind text NOT NULL CHECK (kind IN ('porcentaje','monto')),
  value integer NOT NULL CHECK (value > 0 AND value <= 10000000),
  applies_to text NOT NULL DEFAULT 'todos' CHECK (applies_to IN ('todos','matricula','comedor','circuito_vial','otro')),
  active boolean NOT NULL DEFAULT true,
  updated_by uuid NOT NULL DEFAULT auth.uid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (kind <> 'porcentaje' OR value <= 100)
);
GRANT SELECT, INSERT, UPDATE ON public.institution_discounts TO authenticated;
GRANT ALL ON public.institution_discounts TO service_role;
ALTER TABLE public.institution_discounts ENABLE ROW LEVEL SECURITY;
CREATE UNIQUE INDEX institution_discounts_active_priority ON public.institution_discounts (institution_id, priority) WHERE active;
CREATE POLICY discounts_read ON public.institution_discounts FOR SELECT TO authenticated USING (public.is_institution_staff(institution_id) OR public.school_service_manager(institution_id) OR public.can_review_enrollment(institution_id));
CREATE POLICY discounts_insert ON public.institution_discounts FOR INSERT TO authenticated WITH CHECK (public.school_service_manager(institution_id));
CREATE POLICY discounts_update ON public.institution_discounts FOR UPDATE TO authenticated USING (public.school_service_manager(institution_id)) WITH CHECK (public.school_service_manager(institution_id));

-- Price rows are history: only the active flag may change; author and timestamps are server-derived.
CREATE OR REPLACE FUNCTION public.guard_institution_price_row()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    NEW.updated_by := coalesce(auth.uid(), NEW.updated_by);
    NEW.created_at := now(); NEW.updated_at := now();
    IF NOT NEW.active THEN RAISE EXCEPTION 'new price rows must be active'; END IF;
    RETURN NEW;
  END IF;
  IF (to_jsonb(NEW) - 'active' - 'updated_by' - 'updated_at') IS DISTINCT FROM (to_jsonb(OLD) - 'active' - 'updated_by' - 'updated_at') THEN
    RAISE EXCEPTION 'price rows are immutable; deactivate and create a new one';
  END IF;
  IF OLD.active = false AND NEW.active = true THEN RAISE EXCEPTION 'inactive price rows cannot be reactivated'; END IF;
  NEW.updated_by := coalesce(auth.uid(), OLD.updated_by);
  NEW.updated_at := now();
  RETURN NEW;
END $$;
CREATE TRIGGER guard_institution_tariffs BEFORE INSERT OR UPDATE ON public.institution_tariffs FOR EACH ROW EXECUTE FUNCTION public.guard_institution_price_row();
CREATE TRIGGER guard_institution_discounts BEFORE INSERT OR UPDATE ON public.institution_discounts FOR EACH ROW EXECUTE FUNCTION public.guard_institution_price_row();

CREATE TABLE public.enrollment_pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES public.enrollment_requests(id) ON DELETE CASCADE,
  institution_id uuid NOT NULL REFERENCES public.institutions(id) ON DELETE CASCADE,
  tariff_id uuid NOT NULL REFERENCES public.institution_tariffs(id),
  tariff_label text NOT NULL,
  base_amount integer NOT NULL CHECK (base_amount >= 0),
  discount_id uuid REFERENCES public.institution_discounts(id),
  discount_name text,
  discount_priority smallint,
  discount_amount integer NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
  final_amount integer NOT NULL CHECK (final_amount >= 0),
  priced_by uuid NOT NULL,
  priced_at timestamptz NOT NULL DEFAULT now(),
  CHECK (final_amount = base_amount - discount_amount)
);
GRANT SELECT ON public.enrollment_pricing TO authenticated;
GRANT ALL ON public.enrollment_pricing TO service_role;
ALTER TABLE public.enrollment_pricing ENABLE ROW LEVEL SECURITY;
CREATE INDEX enrollment_pricing_latest ON public.enrollment_pricing (request_id, priced_at DESC);
CREATE POLICY enrollment_pricing_read ON public.enrollment_pricing FOR SELECT TO authenticated USING (
  public.can_review_enrollment(institution_id)
  OR EXISTS (SELECT 1 FROM public.enrollment_requests r WHERE r.id = request_id AND r.guardian_id = auth.uid())
);

-- Canonical pricing: only the highest-priority (lowest number) eligible discount applies; discounts never stack.
CREATE OR REPLACE FUNCTION public.price_enrollment(_id uuid, _tariff uuid, _discounts uuid[])
RETURNS public.enrollment_pricing
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE r public.enrollment_requests; t public.institution_tariffs; d public.institution_discounts; amt integer := 0; res public.enrollment_pricing;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'sign in required'; END IF;
  SELECT * INTO r FROM public.enrollment_requests WHERE id = _id;
  IF r.id IS NULL OR r.status = 'rechazada' THEN RAISE EXCEPTION 'enrollment not priceable'; END IF;
  IF NOT public.can_review_enrollment(r.institution_id) THEN RAISE EXCEPTION 'not allowed'; END IF;
  IF r.guardian_id = auth.uid() THEN RAISE EXCEPTION 'cannot price own request'; END IF;
  IF coalesce(array_length(_discounts, 1), 0) > 10 THEN RAISE EXCEPTION 'too many discounts'; END IF;
  SELECT * INTO t FROM public.institution_tariffs WHERE id = _tariff AND institution_id = r.institution_id AND service = 'matricula' AND active;
  IF t.id IS NULL THEN RAISE EXCEPTION 'tariff not available'; END IF;
  SELECT * INTO d FROM public.institution_discounts
    WHERE id = ANY(coalesce(_discounts, '{}'::uuid[])) AND institution_id = r.institution_id AND active AND applies_to IN ('todos','matricula')
    ORDER BY priority LIMIT 1;
  IF d.id IS NOT NULL THEN
    amt := CASE WHEN d.kind = 'porcentaje' THEN round(t.amount * d.value / 100.0)::integer ELSE least(d.value, t.amount) END;
  END IF;
  INSERT INTO public.enrollment_pricing (request_id, institution_id, tariff_id, tariff_label, base_amount, discount_id, discount_name, discount_priority, discount_amount, final_amount, priced_by)
  VALUES (r.id, r.institution_id, t.id, t.label, t.amount, d.id, d.name, d.priority, amt, t.amount - amt, auth.uid())
  RETURNING * INTO res;
  RETURN res;
END $$;
REVOKE ALL ON FUNCTION public.price_enrollment(uuid, uuid, uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.price_enrollment(uuid, uuid, uuid[]) TO authenticated;