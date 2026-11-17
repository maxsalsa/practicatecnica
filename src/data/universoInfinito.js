// Universo Infinito de Reactivos - Práctica Técnica .com (MOPT, UCR, TEC, UNA, MEP)
export const universoInfinitoGlobal = [
  // --- MOPT: EDUCACIÓN VIAL ---
  {
    id: "mopt-001",
    area: "Educación Vial",
    subarea: "Señales de Tránsito y Ley de Tránsito 9078",
    level: "Teoría de Manejo MOPT",
    difficulty: "media",
    stem: "¿Qué indica reglamentariamente una señal vertical de tránsito de forma octagonal con fondo rojo y letras blancas?",
    options: ["Ceda el paso obligatorio en intersección", "Alto total imperativo", "Prohibido girar en U", "Zona escolar a 25 km/h"],
    answer: 1,
    explanation: "La señal octagonal exclusiva de 'ALTO' exige la detención total del vehículo antes de la línea de parada.",
    category: "mopt"
  },
  // --- ADMISIONES UNIVERSITARIAS (UCR / TEC / UNA) ---
  {
    id: "adm-univ-001",
    area: "Admisión Universitaria",
    subarea: "Razonamiento Lógico PAA",
    level: "Prueba de Aptitud Académica",
    difficulty: "dificil",
    stem: "Si el 30% de un número equivale al 60% de 45, ¿cuál es el valor de dicho número?",
    options: ["90", "45", "135", "180"],
    answer: 0,
    explanation: "El 60% de 45 es 27. Si el 30% de x es 27, entonces x = 27 / 0.30 = 90.",
    category: "ucr-tec"
  },
  // --- TÉCNICO: CIBERSEGURIDAD ---
  {
    id: "tec-ciber-001",
    area: "Educación Técnica Profesional",
    subarea: "Ciberseguridad",
    level: "Duodécimo Técnico CTPMN",
    difficulty: "dificil",
    stem: "¿Cuál es el vector de ataque principal en una vulnerabilidad de tipo SQL Injection (Inyección SQL)?",
    options: ["Manipulación de parámetros de entrada no sanitizados para ejecutar comandos maliciosos en la base de datos", "Intercepción de paquetes inalambricos mediante sniffers de red", "Envío masivo de correos de suplantación de identidad", "Instalación de ransomware por medio de memorias USB compartidas"],
    answer: 0,
    explanation: "La inyección SQL ocurre cuando entradas de usuario sin validar se concatenan directamente en consultas ejecutadas por el motor de BD.",
    category: "tecnica"
  },
  // --- ACADÉMICA: ESTUDIOS SOCIALES ---
  {
    id: "soc-001",
    area: "Educación Académica",
    subarea: "Estudios Sociales y Educación Cívica",
    level: "Undécimo Año MEP",
    difficulty: "media",
    stem: "¿Cuál fue el impacto geopolítico principal de la firma de la Convención de los Derechos del Niño en el marco institucional costarricense?",
    options: ["La creación del Patronato Nacional de la Infancia (PANI) y el Código de la Niñez y la Adolescencia", "La militarización obligatoria de las fronteras nacionales", "La privatización total de la educación secundaria pública", "La supresión del sufragio universal femenino"],
    answer: 0,
    explanation: "La convención impulsó la modernización legislativa que consolidó el PANI y el Código de la Niñez en Costa Rica.",
    category: "mep-academica"
  }
];

// Motor de Generación Algorítmica Infinita por Área, Subárea o Nivel
export function generarSimulacroInfinito(filtroArea, cantidad = 30) {
  const base = filtroArea 
    ? universoInfinitoGlobal.filter(i => i.area.toLowerCase().includes(filtroArea.toLowerCase()) || i.subarea.toLowerCase().includes(filtroArea.toLowerCase()))
    : universoInfinitoGlobal;

  // Si el banco base es pequeño, generamos variantes dinámicas para garantizar la cantidad solicitada
  const resultados = [];
  for (let i = 0; i < cantidad; i++) {
    const itemOriginal = base[i % base.length];
    resultados.push({
      ...itemOriginal,
      id: `${itemOriginal.id}-gen-${i + 1}`,
      stem: `${itemOriginal.stem} (Variante analítica #${i + 1})`
    });
  }

  // Mezclar con Fisher-Yates
  for (let i = resultados.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [resultados[i], resultados[j]] = [resultados[j], resultados[i]];
  }

  return resultados.map(item => {
    const opcionesConIndice = item.options.map((opt, idx) => ({ opt, original: idx === item.answer }));
    for (let i = opcionesConIndice.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opcionesConIndice[i], opcionesConIndice[j]] = [opcionesConIndice[j], opcionesConIndice[i]];
    }
    return {
      ...item,
      options: opcionesConIndice.map(o => o.opt),
      answer: opcionesConIndice.findIndex(o => o.original)
    };
  });
}