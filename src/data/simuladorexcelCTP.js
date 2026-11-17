export const SIMULADOR_EXCEL_CTP = {
  version: "2026.1.1-ExcelMaster",
  subArea: "Producción de Documentos y Hoja Electrónica",
  moduloInteractivo: {
    activo: true,
    caracteristicas: [
      "Cuadrito interactivo de filas (1,2,3) y columnas (A,B,C) para simulación de celdas",
      "Motor de evaluación de fórmulas básicas: =SUMA(), =PROMEDIO(), =SI()",
      "Banco de retos prácticos y ejercicios de pruebas estandarizadas del MEP"
    ]
  },
  ejemploRetoHojaElectronica: {
    enunciado: "Calcule el promedio de notas de los subgrupos A y B aplicando la función correcta.",
    celdasMock: {
      "A1": "Estudiante", "B1": "Nota 1", "C1": "Nota 2", "D1": "Promedio Final",
      "A2": "Juan Pérez", "B2": 85, "C2": 90, "D2": "=PROMEDIO(B2:C2)"
    },
    validacion: "Correcto uso de sintaxis de rangos y funciones lógicas."
  }
};
"// Simulador de Excel CTP inicializado correctamente";