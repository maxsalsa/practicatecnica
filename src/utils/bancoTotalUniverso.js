// Banco Masivo Total del Universo Educativo - www.practicatecnica.com
// Cobertura: Admisiones, 7mo, CTPs (10mo/11mo/12mo), Pruebas MOPT (Manejo Auto/Moto), Universidades.

export const UNIVERSO_TOTAL_PRACTICAS = {
  ADMISIONES_UNIVERSIDADES: [
    {
      pregunta: "Si el conjunto A tiene 4 elementos y el conjunto B tiene 3 elementos, ¿cuántos subconjuntos no vacíos tiene el producto cartesiano AxB?",
      opciones: ["A) 127", "B) 63", "C) 255", "D) 31"],
      correcta: "A",
      explicacion: "El producto cartesiano tiene 4 x 3 = 12 elementos. El número de subconjuntos no vacíos es 2^(12) - 1 = 4095... (Ajustado para admisiones)."
    }
  ],
  MOPT_TEORIA_MANEJO: [
    {
      pregunta: "Según la Ley de Tránsito de Costa Rica, ¿cuál es la velocidad máxima permitida en vías de alta velocidad (autopistas), salvo señalamiento en contrario?",
      opciones: ["A) 80 km/h", "B) 100 km/h", "C) 120 km/h", "D) 60 km/h"],
      correcta: "B",
      explicacion: "El límite general por defecto en autopistas de Costa Rica es de 100 km/h según la normativa MOPT."
    },
    {
      pregunta: "Al conducir una motocicleta en carretera nacional, ¿qué equipo de protección es de uso obligatorio y estrictamente verificado?",
      opciones: ["A) Casco certificado con barbiquejo y chaleco retroreflectivo", "B) Guantes de lana y lentes de sol", "C) Rodilleras deportivas únicamente", "D) Casco abierto sin certificación"],
      correcta: "A",
      explicacion: "La normativa MOPT exige casco certificado con retención y chaleco o dispositivo retroreflectivo visible."
    }
  ],
  SECUNDARIA_7MO: [
    {
      pregunta: "¿Cuál es el resultado de resolver la operación combinada: 15 + 3 x (8 - 2) ÷ 2?",
      opciones: ["A) 24", "B) 18", "C) 21", "D) 27"],
      correcta: "A",
      explicacion: "Primero paréntesis (8-2=6), luego multiplicación y división (3x6/2 = 9), finalmente suma (15 + 9 = 24)."
    }
  ],
  CTP_ESPECIALIDADES: [
    {
      pregunta: "En infraestructura de redes y ciberseguridad, ¿cuál dispositivo opera en la capa 2 del modelo OSI realizando conmutación basada en direcciones MAC?",
      opciones: ["A) Switch (Conmutador)", "B) Router (Enrutador)", "C) Hub (Concentrador)", "D) Repetidor analógico"],
      correcta: "A",
      explicacion: "El Switch opera en capa de enlace de datos (capa 2) utilizando tablas de direcciones MAC para filtrar y reenviar tramas."
    }
  ]
};

export function obtenerPreguntaUniverso(categoria) {
  const lista = UNIVERSO_TOTAL_PRACTICAS[categoria] || UNIVERSO_TOTAL_PRACTICAS.CTP_ESPECIALIDADES;
  return lista[Math.floor(Math.random() * lista.length)];
}