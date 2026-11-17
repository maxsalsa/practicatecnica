export const HORARIOS_DIRECTIVOS_INSTITUCION = {
  version: "2026.1.1-DirectivaMEP",
  modeloFinanciero: {
    pagador: "Jefatura / Dirección / Administración Institucional",
    metodoPago: "SINPE Móvil / Facturación Electrónica Institucional",
    alcance: "Licencia global que cubre toda la institución, permitiendo a la Dirección generar, auditar y exportar horarios oficiales."
  },
  casoEstudioCtpMercedesNorte: {
    institucion: "Colegio Técnico Profesional (CTP) Mercedes Norte",
    secciones: {
      tercerCiclo: ["7-1 a 7-4", "8-1 a 8-4", "9-1 a 9-4"],
      educacionDiversificada: ["10-1 a 10-4", "11-1 a 11-4", "12-1 a 12-4"]
    },
    componentesHorarios: [
      "Lecciones estándar MEP de 40 minutos",
      "Espacios obligatorios de Recreo y Almuerzo institucional",
      "Talleres Exploratorios (Tercer Ciclo)",
      "Bloques masivos de Especialidad Técnica (IV Ciclo: Subgrupos A y B)"
    ]
  },
  motorGeneracionAutomatica: {
    activo: true,
    reglasMep: "Cruce automático de disponibilidad docente, asignación de aulas/laboratorios y cumplimiento estricto del REAC 2026."
  }
};
"// Módulo de horarios directivos y facturación institucional inicializado correctamente";