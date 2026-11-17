export const QA_SIMULADORES_TECNICOS = {
  version: "2026.5.0-QASimuladores",
  moduloExcel: {
    activo: true,
    pruebas: [
      { id: "EXC-01", desc: "Validación de sintaxis para función =PROMEDIO()", resultadoEsperado: "Correcto" },
      { id: "EXC-02", desc: "Evaluación de condición lógica anidada =SI()", resultadoEsperado: "Correcto" }
    ]
  },
  moduloWord: {
    activo: true,
    pruebas: [
      { id: "WRD-01", desc: "Aplicación de estilos de títulos y tablas de contenido automáticas", resultadoEsperado: "Correcto" },
      { id: "WRD-02", desc: "Formato de párrafos y tabulaciones bajo normas técnicas", resultadoEsperado: "Correcto" }
    ]
  },
  moduloCcna: {
    activo: true,
    pruebas: [
      { id: "CCNA-01", desc: "Ejecución de comando 'configure terminal' en Cisco IOS", resultadoEsperado: "Correcto" },
      { id: "CCNA-02", desc: "Activación de interfaz con 'no shutdown' y asignación IP", resultadoEsperado: "Correcto" }
    ]
  },
  estadoQa: "Banco de pruebas y validación interactiva cargado exitosamente para QA institucional."
};
"// Módulo de QA para simuladores técnicos inicializado correctamente";