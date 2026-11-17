-- ==============================================================================
-- SCRIPT SQL MAESTRO — OPTIMIZACIÓN Y INDEXACIÓN DE NEON DB (GICM & BDS Devs)
-- Proyecto: Práctica Técnica (www.practicatecnica.com)
-- Arquitectura: Relacional de Alto Rendimiento (<5ms por consulta)
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS instituciones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    codigo_presupuestario VARCHAR(50) UNIQUE NOT NULL,
    nombre_institucion VARCHAR(150) NOT NULL,
    provincia VARCHAR(50) NOT NULL,
    circuito VARCHAR(20) NOT NULL,
    modalidad VARCHAR(100) NOT NULL,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institucion_id UUID REFERENCES instituciones(id) ON DELETE CASCADE,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    correo_electronico VARCHAR(100) UNIQUE NOT NULL,
    nombre_completo VARCHAR(150) NOT NULL,
    rol VARCHAR(50) DEFAULT 'estudiante' CHECK (rol IN ('estudiante', 'docente', 'director', 'administrador', 'ministro', 'super_admin')),
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS estudiantes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    seccion VARCHAR(20) NOT NULL,
    especialidad_tecnica VARCHAR(100),
    promedio_ponderado NUMERIC(5,2) DEFAULT 0.00,
    hash_carnet_sha256 VARCHAR(64) UNIQUE NOT NULL,
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS asistencias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    estudiante_id UUID REFERENCES estudiantes(id) ON DELETE CASCADE,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    hora_ingreso TIME WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIME,
    estado VARCHAR(30) DEFAULT 'Presente' CHECK (estado IN ('Presente', 'Ausente', 'Justificado', 'Tardía')),
    validado_por VARCHAR(50) DEFAULT 'Sistema QR/NFC'
);

CREATE TABLE IF NOT EXISTS calificaciones_sea (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    estudiante_id UUID REFERENCES estudiantes(id) ON DELETE CASCADE,
    periodo VARCHAR(20) NOT NULL,
    subarea_asignatura VARCHAR(100) NOT NULL,
    nota_obtenida NUMERIC(5,2) NOT NULL,
    evidencias TEXT,
    hash_firma_sha256 VARCHAR(64) NOT NULL,
    registrado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS auditoria_sha256 (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_responsable_id UUID REFERENCES usuarios(id),
    accion_realizada TEXT NOT NULL,
    hash_bloque VARCHAR(64) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_usuarios_cedula ON usuarios(cedula);
CREATE INDEX IF NOT EXISTS idx_usuarios_correo ON usuarios(correo_electronico);
CREATE INDEX IF NOT EXISTS idx_usuarios_rol ON usuarios(rol);
CREATE INDEX IF NOT EXISTS idx_estudiantes_seccion ON estudiantes(seccion);
CREATE INDEX IF NOT EXISTS idx_estudiantes_especialidad ON estudiantes(especialidad_tecnica);
CREATE INDEX IF NOT EXISTS idx_estudiantes_hash ON estudiantes(hash_carnet_sha256);
CREATE INDEX IF NOT EXISTS idx_asistencias_estudiante_fecha ON asistencias(estudiante_id, fecha);
CREATE INDEX IF NOT EXISTS idx_asistencias_fecha ON asistencias(fecha);
CREATE INDEX IF NOT EXISTS idx_calificaciones_estudiante ON calificaciones_sea(estudiante_id);
CREATE INDEX IF NOT EXISTS idx_calificaciones_periodo ON calificaciones_sea(periodo);
CREATE INDEX IF NOT EXISTS idx_auditoria_timestamp ON auditoria_sha256(timestamp DESC);