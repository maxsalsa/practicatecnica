-- PRACTICATECNICA.COM - INYECCIÓN MAESTRA DE CUADERNILLOS (ACADÉMICO PNE + TÉCNICO PNEET)
BEGIN;

CREATE TABLE IF NOT EXISTS pt_modalidades (
    id VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL
);

INSERT INTO pt_modalidades (id, nombre, descripcion) VALUES
('MOD-ACA', 'Cuadernillo Académico Nacional (PNE)', 'Asignaturas académicas troncales evaluadas en Educación Diversificada y CTP.'),
('MOD-TEC', 'Cuadernillo de Especialidades Técnicas (PNEET)', 'Especialidades de Educación y Formación Técnica Profesional (EFTP) del MEP.')
ON CONFLICT (id) DO UPDATE SET nombre = EXCLUDED.nombre, descripcion = EXCLUDED.descripcion;

CREATE TABLE IF NOT EXISTS pt_areas_especialidades (
    id VARCHAR(32) PRIMARY KEY,
    modalidad_id VARCHAR(20) NOT NULL REFERENCES pt_modalidades(id) ON DELETE CASCADE,
    codigo_mep VARCHAR(30) UNIQUE NOT NULL,
    nombre VARCHAR(160) NOT NULL,
    sector_o_departamento VARCHAR(120) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO pt_areas_especialidades (id, modalidad_id, codigo_mep, nombre, sector_o_departamento) VALUES
('ACA-MAT', 'MOD-ACA', 'PNE-MAT-2026', 'Matemáticas Académicas', 'Departamento de Matemáticas'),
('ACA-ESP', 'MOD-ACA', 'PNE-ESP-2026', 'Español y Literatura', 'Departamento de Español'),
('ACA-CIE', 'MOD-ACA', 'PNE-CIE-2026', 'Ciencias (Biología, Química y Física)', 'Departamento de Ciencias Naturales'),
('ACA-ESO', 'MOD-ACA', 'PNE-ESO-2026', 'Estudios Sociales', 'Departamento de Estudios Sociales'),
('ACA-CIV', 'MOD-ACA', 'PNE-CIV-2026', 'Educación Cívica', 'Departamento de Estudios Sociales y Cívica'),
('TEC-1001', 'MOD-TEC', '1001', 'Agroecología', 'Agropecuario y Ambiental'),
('TEC-1003', 'MOD-TEC', '1003', 'Agroindustria Alimentaria con Tecnología Agrícola', 'Agroindustria'),
('TEC-1004', 'MOD-TEC', '1004', 'Agroindustria Alimentaria con Tecnología Pecuaria', 'Agroindustria'),
('TEC-1005', 'MOD-TEC', '1005', 'Agrojardinería', 'Agropecuario y Paisajismo'),
('TEC-1009', 'MOD-TEC', '1009', 'Producción Agrícola y Pecuaria', 'Agropecuario'),
('TEC-2003', 'MOD-TEC', '2003', 'Construcción Civil', 'Construcción e Ingeniería'),
('TEC-2005', 'MOD-TEC', '2005', 'Dibujo Técnico', 'Ingeniería y Diseño'),
('TEC-2006', 'MOD-TEC', '2006', 'Dibujo y Modelado para Edificaciones (BIM)', 'Arquitectura y Construcción'),
('TEC-2007', 'MOD-TEC', '2007', 'Diseño Gráfico', 'Artes Gráficas y Comunicación'),
('TEC-2008', 'MOD-TEC', '2008', 'Diseño Publicitario', 'Publicidad y Comunicación Visual'),
('TEC-3016', 'MOD-TEC', '3016', 'Desarrollo Web y Ciberseguridad', 'Tecnologías de la Información y Comunicación')
ON CONFLICT (id) DO UPDATE SET nombre = EXCLUDED.nombre, updated_at = CURRENT_TIMESTAMP;

COMMIT;