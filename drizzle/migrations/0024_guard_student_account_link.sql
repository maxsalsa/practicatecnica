CREATE OR REPLACE FUNCTION public.guard_student_link()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.user_id IS NOT NULL
     AND (TG_OP = 'INSERT' OR NEW.user_id IS DISTINCT FROM OLD.user_id)
     AND NEW.user_id IS DISTINCT FROM auth.uid()
     AND coalesce(auth.role(), '') <> 'service_role' THEN
    RAISE EXCEPTION 'Solo el propio estudiante puede vincular su cuenta.';
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS guard_student_link ON public.students;
CREATE TRIGGER guard_student_link BEFORE INSERT OR UPDATE ON public.students
FOR EACH ROW EXECUTE FUNCTION public.guard_student_link();