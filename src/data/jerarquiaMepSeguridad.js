export const JERARQUIA_MEP_SEGURIDAD = {
  version: "2026.5.0-CircuitosMepMaster",
  autor: "Ing. Max Salazar Sánchez (Profe Max) & BDS Devs",
  direccionesRegionalesCostaRica: [
    { region: "Dirección Regional de Alajuela", circuitos: ["01", "02", "03", "04 (Incluye CTP Mercedes Norte)"] },
    { region: "Dirección Regional de San José Central", circuitos: ["01", "02", "03"] },
    { region: "Dirección Regional de Heredia", circuitos: ["01", "02"] },
    { region: "Dirección Regional de Cartago", circuitos: ["01", "02"] }
  ],
  controlPrivacidadRbac: {
    activo: true,
    regla: "Principio de mínima paradoja y aislamiento Ley 8968. Un docente solo visualiza notas de su subárea y sección asignada. El padre solo accede al QR de su hijo."
  }
};
"// Módulo de Jerarquía y Seguridad MEP inicializado correctamente";