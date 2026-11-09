-- ============================================================================
-- MIGRACIÓN OFICIAL SUPABASE: PRACTICATECNICA.COM (BDS DEVS - MAX SALAZAR S.)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.perfiles_usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  correo TEXT UNIQUE NOT NULL CHECK (correo LIKE '%@gmail.com'),
  nombre TEXT NOT NULL,
  rol TEXT NOT NULL DEFAULT 'ESTUDIANTE_VIP',
  institucion TEXT DEFAULT 'Suscriptor Nacional CR',
  xp_total INTEGER DEFAULT 0,
  racha_dias INTEGER DEFAULT 1,
  creado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.banco_items_oficial (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  especialidad TEXT NOT NULL,
  subarea_unidad TEXT NOT NULL,
  codigo_competencia TEXT NOT NULL,
  habilidad_mep_admision TEXT NOT NULL,
  enunciado_es TEXT NOT NULL,
  enunciado_en TEXT,
  opciones JSONB NOT NULL,
  indice_correcto INTEGER NOT NULL,
  fundamento_pedagogico TEXT NOT NULL,
  nivel_dificultad TEXT DEFAULT 'Alto',
  verificado_qa BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS public.trazabilidad_competencias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_correo TEXT NOT NULL,
  especialidad TEXT NOT NULL,
  codigo_competencia TEXT NOT NULL,
  habilidad TEXT NOT NULL,
  intentos INTEGER DEFAULT 0,
  aciertos INTEGER DEFAULT 0,
  porcentaje_dominio NUMERIC(5,2) DEFAULT 0.00,
  actualizado_en TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.perfiles_usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banco_items_oficial ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trazabilidad_competencias ENABLE ROW LEVEL SECURITY;
