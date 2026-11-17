export const MODALIDADES_MEP_TOTAL = {
  version: "2026.1.1-Industrial",
  ofertas: [
    {
      tipo: "Secundaria Académica Diurna",
      subTipos: ["Liceos Rurales", "Colegios Científicos", "Colegios Humanísticos", "Colegios Deportivos y Artísticos"],
      caracteristicas: "Tronco común humanístico-científico con talleres exploratorios en Tercer Ciclo y bachillerato académico en IV Ciclo."
    },
    {
      tipo: "Educación Técnica Profesional (CTP Diurno)",
      especialidades: ["Desarrollo Web", "Ciberseguridad", "Soporte TI", "Contabilidad", "Electromecánica", "Agroindustria"],
      caracteristicas: "Formación dual, bloques masivos de talleres y laboratorios con división estricta en Subgrupos A y B."
    },
    {
      tipo: "Educación de Adultos y Nocturna",
      instituciones: ["Liceos Nocturnos", "CTPs Modalidad Nocturna", "IPEC (Instituto Profesional de Educación Comunitaria)", "CINDEA (Centros Integrados de Educación de Adultos)"],
      caracteristicas: "Horarios flexibles modulares semestrales, cuatrimestrales o por periodos para población adulta trabajadora."
    }
  ],
  motorHorariosInteligentes: {
    activo: true,
    capacidades: "Generación automática de lecciones de 40 minutos, optimización de espacios de laboratorios, control de asistencia por subgrupo y gestión de horarios especiales por modalidad."
  }
};
"// Módulo multioferta MEP inicializado correctamente";