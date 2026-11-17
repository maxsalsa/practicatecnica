ALTER TABLE public.channel_messages ADD COLUMN attachment_status text NOT NULL DEFAULT 'aprobado' CHECK (attachment_status IN ('aprobado','pendiente','rechazado'));
ALTER TABLE public.channel_messages ADD COLUMN attachment_reviewed_by uuid;
ALTER TABLE public.channel_messages ADD COLUMN attachment_reviewed_at timestamptz;

CREATE OR REPLACE FUNCTION public.moderate_channel_message() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE t text; inst uuid;
BEGIN
  NEW.body := btrim(NEW.body);
  IF NEW.body = '' THEN RAISE EXCEPTION 'Escriba un mensaje.'; END IF;
  t := lower(translate(NEW.body,'ÁÉÍÓÚÜáéíóúü','AEIOUUaeiouu'));
  IF t ~ '\m(hijueputa|hijoeputa|jueputa|hdp|puta|puto|putas|putos|mierda|malparido|malparida|carepicha|pendejo|pendeja|idiota|idiotas|imbecil|estupido|estupida|zorra|culero|verga|playo|maricon|cerote|mamon|ctm)\M' THEN
    RAISE EXCEPTION 'Mensaje bloqueado: use un lenguaje respetuoso.' USING ERRCODE='22023';
  END IF;
  SELECT c.institution_id INTO inst FROM public.institution_channels c WHERE c.id=NEW.channel_id;
  NEW.attachment_reviewed_by := NULL; NEW.attachment_reviewed_at := NULL;
  NEW.attachment_status := CASE WHEN NEW.attachment_path IS NULL THEN 'aprobado'
    WHEN public.has_role(auth.uid(),'admin') OR public.institution_role_of(inst) IN ('direccion','docente','administrativo') THEN 'aprobado'
    ELSE 'pendiente' END;
  RETURN NEW;
END $$;

CREATE OR REPLACE FUNCTION public.can_review_channel_attachment(_ch uuid) RETURNS boolean
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public AS $$
DECLARE c public.institution_channels;
BEGIN
  IF public.channel_access(_ch)='moderate' THEN RETURN true; END IF;
  SELECT * INTO c FROM public.institution_channels WHERE id=_ch;
  RETURN FOUND AND c.kind='familia' AND public.is_section_guide_of(c.institution_id, c.student_id);
END $$;

CREATE OR REPLACE FUNCTION public.review_channel_attachment(_id uuid, _approve boolean) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE m public.channel_messages;
BEGIN
  SELECT * INTO m FROM public.channel_messages WHERE id=_id FOR UPDATE;
  IF NOT FOUND OR m.attachment_path IS NULL THEN RAISE EXCEPTION 'Archivo no encontrado'; END IF;
  IF NOT public.can_review_channel_attachment(m.channel_id) THEN RAISE EXCEPTION 'Solo dirección o la persona guía revisan archivos' USING ERRCODE='42501'; END IF;
  IF m.sender_id=auth.uid() THEN RAISE EXCEPTION 'No puede revisar su propio archivo'; END IF;
  UPDATE public.channel_messages SET attachment_status=CASE WHEN _approve THEN 'aprobado' ELSE 'rechazado' END, attachment_reviewed_by=auth.uid(), attachment_reviewed_at=now() WHERE id=_id;
END $$;

CREATE OR REPLACE FUNCTION public.channel_file_readable(_name text) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
  SELECT EXISTS(SELECT 1 FROM public.channel_messages m WHERE m.attachment_path=_name AND m.hidden_at IS NULL AND public.channel_access(m.channel_id)<>'none'
    AND (m.attachment_status='aprobado' OR m.sender_id=auth.uid() OR public.can_review_channel_attachment(m.channel_id)))
  OR EXISTS(SELECT 1 FROM public.channel_messages m WHERE m.attachment_path=_name AND public.channel_access(m.channel_id)='moderate')
$$;

DROP POLICY "channel files read" ON storage.objects;
CREATE POLICY "channel files read" ON storage.objects FOR SELECT TO authenticated USING (bucket_id='channel-files' AND public.channel_file_readable(name));

DROP FUNCTION public.channel_feed(uuid);
CREATE OR REPLACE FUNCTION public.channel_feed(_ch uuid) RETURNS TABLE(id uuid, sender_id uuid, sender_name text, sender_role text, is_guide boolean, body text, attachment_path text, attachment_name text, attachment_status text, created_at timestamptz, hidden boolean, can_review boolean)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path=public AS $$
#variable_conflict use_column
DECLARE acc text := public.channel_access(_ch); inst uuid; rev boolean;
BEGIN
  IF acc='none' THEN RAISE EXCEPTION 'Sin acceso a este canal' USING ERRCODE='42501'; END IF;
  SELECT c.institution_id INTO inst FROM public.institution_channels c WHERE c.id=_ch;
  rev := public.can_review_channel_attachment(_ch);
  RETURN QUERY SELECT * FROM (
    SELECT m.id, m.sender_id, coalesce(nullif(btrim(p.display_name),''),'Persona'),
      CASE WHEN public.has_role(m.sender_id,'admin') AND mm.member_role IS NULL THEN 'superadmin' ELSE coalesce(mm.member_role::text,'') END,
      EXISTS(SELECT 1 FROM public.institution_sections s WHERE s.institution_id=inst AND s.guide_id=m.sender_id),
      CASE WHEN m.hidden_at IS NULL OR m.sender_id=auth.uid() OR acc='moderate' THEN m.body ELSE '' END,
      CASE WHEN (m.hidden_at IS NULL OR acc='moderate') AND (m.attachment_status='aprobado' OR m.sender_id=auth.uid() OR rev) THEN m.attachment_path END,
      CASE WHEN m.attachment_status='aprobado' OR m.sender_id=auth.uid() OR rev THEN m.attachment_name END,
      CASE WHEN m.attachment_path IS NULL THEN NULL ELSE m.attachment_status END,
      m.created_at, m.hidden_at IS NOT NULL,
      rev AND m.attachment_path IS NOT NULL AND m.attachment_status='pendiente' AND m.sender_id<>auth.uid()
    FROM public.channel_messages m LEFT JOIN public.profiles p ON p.id=m.sender_id
      LEFT JOIN public.institution_members mm ON mm.institution_id=inst AND mm.user_id=m.sender_id
    WHERE m.channel_id=_ch AND (m.hidden_at IS NULL OR m.sender_id=auth.uid() OR acc='moderate')
    ORDER BY m.created_at DESC LIMIT 200) x ORDER BY x.created_at;
END $$;

REVOKE ALL ON FUNCTION public.can_review_channel_attachment(uuid), public.review_channel_attachment(uuid,boolean), public.channel_file_readable(text), public.channel_feed(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.can_review_channel_attachment(uuid), public.review_channel_attachment(uuid,boolean), public.channel_file_readable(text), public.channel_feed(uuid) TO authenticated, service_role;