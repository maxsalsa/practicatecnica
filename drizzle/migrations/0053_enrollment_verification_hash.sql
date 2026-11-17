ALTER TABLE public.enrollment_requests ADD COLUMN verification_hash text;
CREATE OR REPLACE FUNCTION public.hash_enrollment() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
BEGIN
  IF NEW.status = 'aprobada' AND OLD.status <> 'aprobada' THEN
    NEW.verification_hash := encode(extensions.digest(concat_ws('|', NEW.id, NEW.institution_id, NEW.student_name, NEW.student_id_number, NEW.level, NEW.relation, NEW.consent_version, NEW.consented_at, coalesce(NEW.fee_receipt_path,'sin-cuota'), NEW.reviewed_by, NEW.reviewed_at), 'sha256'), 'hex');
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER enrollment_hash BEFORE UPDATE ON public.enrollment_requests FOR EACH ROW EXECUTE FUNCTION public.hash_enrollment();