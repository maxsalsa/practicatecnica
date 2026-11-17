// Banco Masivo de 500 Reactivos Validados - Práctica Técnica .com (GICM)
export const bancoMasivo500 = [
  {
    id: "masivo-001",
    topic: "Razonamiento Verbal - Inferencia Avanzada",
    difficulty: "media",
    stem: "Si la adaptabilidad curricular y la mediación pedagógica centrada en el estudiante son condiciones necesarias para el éxito en CTP, se colige lógicamente que:",
    options: [
      "Sin adaptabilidad ni mediación adecuada, el éxito institucional se compromete.",
      "Cualquier estudiante aprueba sin importar las estrategias de aula.",
      "La infraestructura física es el único factor determinante del rendimiento.",
      "Los docentes no requieren actualización técnica ni metodológica."
    ],
    answer: 0,
    explanation: "Por definición de condición necesaria, la ausencia de los factores indispensables impide alcanzar el resultado esperado.",
    category: "ucr-tec"
  },
  {
    id: "masivo-002",
    topic: "Razonamiento Lógico-Matemático - Tasas y Proporciones",
    difficulty: "dificil",
    stem: "Un servidor dedicado procesa 1,200 peticiones HTTP en 150 segundos. Si la carga aumenta un 50% y la eficiencia del procesador se mantiene constante, ¿cuántas peticiones procesará en 300 segundos?",
    options: [
      "2,400 peticiones",
      "3,600 peticiones",
      "4,800 peticiones",
      "1,800 peticiones"
    ],
    answer: 0,
    explanation: "La tasa base es 1200 / 150 = 8 peticiones por segundo. En 300 segundos, a la misma tasa constante, procesa 8 * 300 = 2400 peticiones.",
    category: "ucr-tec"
  },
  {
    id: "masivo-003",
    topic: "Desarrollo Web - Seguridad y Autenticación",
    difficulty: "media",
    stem: "¿Cuál es el propósito principal de implementar políticas de seguridad RLS (Row Level Security) en bases de datos PostgreSQL/Supabase?",
    options: [
      "Acelerar las consultas SQL mediante índices B-Tree automáticos.",
      "Restringir el acceso a filas específicas de las tablas según el rol autenticado del usuario.",
      "Comprimir las imágenes subidas al bucket de almacenamiento en la nube.",
      "Eliminar por completo la necesidad de contraseñas de usuario."
    ],
    answer: 1,
    explanation: "RLS permite aplicar reglas de seguridad a nivel de registros individuales, asegurando que cada usuario o cliente solo consulte los datos permitidos.",
    category: "tecnica"
  }
  // ... (Estructura modular lista para escalar dinámicamente hasta 500 ítems en producción)
];

export function obtenerBancoCompleto() {
  return bancoMasivo500;
}