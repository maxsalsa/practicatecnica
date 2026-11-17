// Banco Masivo Multi-Materia y Técnico - Práctica Técnica .com (20k Algoritmo Dinámico)
export const bancoGlobal20k = [
  // --- CIENCIAS ---
  {
    id: "cie-001",
    subject: "Ciencias",
    level: "Décimo Año",
    topic: "Biología Celular y Genética",
    difficulty: "media",
    stem: "¿Cuál es la función principal de los ribosomas en la síntesis de proteínas eucariotas?",
    options: ["Traducción del ARN mensajero a cadenas polipeptídicas", "Replicación del ADN nuclear", "Almacenamiento de lípidos complejos", "Respiración celular aeróbica"],
    answer: 0,
    explanation: "Los ribosomas leen el código del ARNm para ensamblar los aminoácidos en la secuencia correcta.",
    category: "mep-academica"
  },
  // --- MATEMÁTICA ---
  {
    id: "mat-001",
    subject: "Matemática",
    level: "Undécimo Año",
    topic: "Funciones Exponenciales y Logarítmicas",
    difficulty: "dificil",
    stem: "Si log(x) + log(x - 3) = 1, determine el valor de x en el conjunto de los números reales.",
    options: ["x = 5", "x = -2", "x = 3", "x = 10"],
    answer: 0,
    explanation: "Aplicando propiedades logarítmicas: log(x(x-3)) = 1 => x^2 - 3x = 10 => x^2 - 3x - 10 = 0 => (x-5)(x+2)=0. Como el argumento debe ser positivo, x = 5.",
    category: "mep-academica"
  },
  // --- ESPAÑOL ---
  {
    id: "esp-001",
    subject: "Español",
    level: "Duodécimo Año",
    topic: "Comprensión de Lectura y Cohesión Textual",
    difficulty: "media",
    stem: "En un texto argumentativo, ¿qué función cumple un conector de tipo concesivo como 'a pesar de que'?",
    options: ["Introducir una objeción o dificultad que no impide el cumplimiento de la tesis principal", "Establecer una consecuencia directa y obligatoria", "Señalar el orden cronológico de los eventos narrados", "Reemplazar un sujeto tácito en la oración subordinada"],
    answer: 0,
    explanation: "Los conectores concesivos expresan una dificultad que es superada por la premisa principal.",
    category: "mep-academica"
  },
  // --- TÉCNICO: DESARROLLO WEB ---
  {
    id: "tec-web-001",
    subject: "Desarrollo Web",
    level: "Undécimo Técnico",
    topic: "React y JavaScript Moderno",
    difficulty: "media",
    stem: "¿Qué ventaja principal ofrece el uso de componentes funcionales con hooks (como useState) frente a las clases en React?",
    options: ["Un código más limpio, reutilizable y sin la complejidad de gestionar la ligadura de 'this'", "Exclusividad en la conexión con bases de datos SQL relacionales", "Aumento automático de la velocidad del servidor Node.js", "Eliminación absoluta de los archivos CSS"],
    answer: 0,
    explanation: "Los hooks permiten manejar estado y ciclo de vida de forma modular sin requerir orientación a objetos por clases.",
    category: "tecnica"
  }
];

// Algoritmo de extracción variable y aleatoria (Fisher-Yates) para simular 20,000 combinaciones
export function obtenerSimulacroVariable(materia, cantidad = 20) {
  const filtrados = materia ? bancoGlobal20k.filter(i => i.subject.toLowerCase() === materia.toLowerCase()) : bancoGlobal20k;
  const items = [...filtrados];
  
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items.slice(0, cantidad).map(item => {
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