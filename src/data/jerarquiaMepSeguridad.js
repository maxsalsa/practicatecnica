export const JERARQUIA_MEP_SEGURIDAD = {
  version: "2026.5.0-MepSecurityMaster",
  marcoLegal: "Ley 8968 de Protección de Datos y Directrices del Ministerio de Educación Pública (MEP) de Costa Rica.",
  matrizRolesYPermisos: [
    {
      rol: "SuperAdmin (Ing. Max Salazar Sánchez)",
      nivel: "Global Absoluto",
      alcance: "Control total de infraestructura, delegación de roles, auditoría SHA-256 y gestión de licencias a ₡10,000/año."
    },
    {
      rol: "Ministro / Viceministro / Asesores Nacionales",
      nivel: "Macro / Nacional",
      alcance: "Acceso exclusivo a paneles estadísticos globales, gráficos de rendimiento país y reportes macro. PROHIBIDO acceso a notas nominales individuales."
    },
    {
      rol: "Directores Regionales / Supervisores de Circuito",
      nivel: "Regional / Circuital (Circuitos 01, 02, 03, 04+)",
      alcance: "Auditoría de centros educativos adscritos a su jurisdicción, indicadores consolidados y cumplimiento REAC 2026 sin exposición de datos sensibles."
    },
    {
      rol: "Director / Directora Institucional",
      nivel: "Institucional (Ej. CTP Mercedes Norte)",
      alcance: "Gestión de horarios, comedores, permisos, secciones (7-1 a 12-4) y supervisión docente de su centro."
    },
    {
      rol: "Docente / Profesor",
      nivel: "Áulico / Subgrupo",
      alcance: "Registro de asistencia por QR/NFC, control de subgrupos A/B, calificación OER y cuaderno de comunicaciones."
    },
    {
      rol: "Estudiante",
      nivel: "Personal",
      alcance: "Carné digital móvil, visualización de su propio expediente, trivias de práctica y descarga de manuales."
    }
  ],
  garantiaPrivacidad: "Aislamiento estricto de datos personales mediante políticas de acceso y encriptación SHA-256."
};
"// Módulo de Jerarquía MEP y Seguridad inicializado correctamente";