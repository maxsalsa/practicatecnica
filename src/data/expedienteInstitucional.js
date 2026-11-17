export const EXPEDIENTE_INSTITUCIONAL_GICM = {
  expedienteEstudiantil: {
    activo: true,
    componentes: [
      "Fotografía oficial del estudiante",
      "Fotografías y datos de contacto de padres o encargados",
      "Escaneo y validación de cédulas de identidad / DIMEX",
      "Historial académico y técnico (Desarrollo Web, Ciberseguridad, etc.)"
    ]
  },
  muroLogros: {
    activo: true,
    caracteristicas: "Muro público institucional de logros estudiantiles sin comentarios ni 'me gusta'. Visualización limpia por Estudiante, Sección y Nivel."
  },
  operativaCtp: {
    activo: true,
    modulos: ["Control de Horarios y Asistencias", "Gestión de Comedor Escolar", "Permisos y Comprobantes de Justificación"]
  },
  seguridadQrSha256: {
    activo: true,
    algoritmo: "SHA-256 con firma digital",
    uso: "Generación de códigos QR inalterables para pases de salida, justificaciones y carés estudiantiles oficiales."
  }
};
"// Módulo de expediente y operativa institucional inicializado correctamente";