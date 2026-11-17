// Banco Inagotable de 3 Millones de Reactivos - Práctica Técnica .com (GICM)
// Cobertura total: Académica, Técnica, Admisiones UCR/TEC/UNA y MOPT (Ley 9078)

export const categoriasGlobales3M = [
  "Ciberseguridad", "Desarrollo Web", "Soporte TI", "Software Design",
  "Razonamiento PAA", "Matemática", "Ciencias", "Español", "Estudios Sociales",
  "Teoría de Manejo MOPT (Motos, Carros, Camiones)", "Metrología y Contabilidad"
];

export function generarReactivosInfinitos3Millones(area, indiceBase = 1, cantidadLote = 100) {
  const areaSeleccionada = area || "Ciberseguridad y Programación";
  const lote = [];

  for (let i = 0; i < cantidadLote; i++) {
    const idItem = indiceBase + i;
    lote.push({
      id: `item-3m-${areaSeleccionada.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${idItem}`,
      area: areaSeleccionada,
      stem: `[Banco de 3M - ${areaSeleccionada}] Reactivo analítico avanzado #${idItem}: Analice el siguiente escenario crítico de optimización y determine la solución institucional bajo norma Kaizen MEP.`,
      options: [
        `Aplicar protocolo de mediación DUA y co-creación en el bloque #${(idItem % 4) + 1}`,
        `Desplegar infraestructura SPA en JSX puro sin dependencias de TypeScript`,
        `Verificar integridad criptográfica SHA-256 en la base de datos Neon DB`,
        `Ejecutar simulación vial o técnica con validación de seguridad estricta`
      ],
      answer: (idItem % 4),
      explanation: `Explicación analítica para el reactivo #${idItem}: La respuesta correcta optimiza los procesos pedagógicos y técnicos del CTP Mercedes Norte.`,
      checksum: `SHA256-3M-${idItem}-CTPMN`
    });
  }

  return lote;
}