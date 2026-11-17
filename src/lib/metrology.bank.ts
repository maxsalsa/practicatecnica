import type { Deck } from "./questions";
const SI = "BIPM · Sistema Internacional de Unidades (SI)";
const VIM = "JCGM 200:2012 · Vocabulario Internacional de Metrología (VIM)";
export const metrologySources = [
  { title: SI, url: "https://www.bipm.org/en/measurement-units/si-base-units" },
  { title: VIM, url: "https://www.bipm.org/en/committees/jc/jcgm/publications" },
];
type Sheet = {
  id: string;
  title: string;
  objective: string;
  summary: string;
  sequence: string[];
  task: string;
  rubric: string[];
  questions: Deck["questions"];
};
const q = (text: string, options: string[], answer: number, why: string, source = SI) => ({
  q: text,
  options,
  answer,
  why,
  source,
});
export const metrologySheets: Sheet[] = [
  {
    id: "si",
    title: "Magnitudes y unidades SI",
    objective: "Distinguir magnitud, valor y unidad; reconocer las siete unidades base.",
    summary:
      "Una magnitud es una propiedad que se puede expresar mediante un número y una referencia. Las unidades base son segundo (s), metro (m), kilogramo (kg), amperio (A), kelvin (K), mol (mol) y candela (cd).",
    sequence: [
      "Identifique propiedades medibles de una pieza.",
      "Clasifique longitud, masa y tiempo.",
      "Registre tres valores con número y unidad.",
    ],
    task: "Elabore una tabla de tres magnitudes de objetos del aula, con unidad y procedimiento.",
    rubric: [
      "Identifica correctamente la magnitud.",
      "Usa una unidad adecuada y su símbolo.",
      "Expresa cada valor con número y unidad.",
      "Justifica el procedimiento.",
    ],
    questions: [
      q(
        "¿Cuál es la unidad base SI de masa?",
        ["Gramo", "Kilogramo", "Newton", "Litro"],
        1,
        "La unidad base es el kilogramo; el gramo es un submúltiplo, el newton mide fuerza y el litro volumen.",
      ),
      q(
        "En 25 mm, ¿cuál es la unidad?",
        ["25", "Longitud", "mm", "25 mm²"],
        2,
        "mm es el símbolo del milímetro; 25 es el valor numérico.",
      ),
      q(
        "¿Qué magnitud se expresa en kelvin?",
        ["Masa", "Temperatura termodinámica", "Tiempo", "Corriente eléctrica"],
        1,
        "El kelvin es la unidad SI de temperatura termodinámica.",
      ),
    ],
  },
  {
    id: "conversion",
    title: "Prefijos y conversiones",
    objective: "Convertir longitudes conservando la magnitud y mostrando el factor de conversión.",
    summary:
      "Kilo significa 10³, centi 10⁻², mili 10⁻³ y micro 10⁻⁶. Para longitudes: 1 m = 100 cm = 1000 mm. Las áreas y los volúmenes requieren elevar el factor al cuadrado o al cubo.",
    sequence: [
      "Escriba la equivalencia de unidades.",
      "Multiplique por un factor igual a uno.",
      "Compruebe que la unidad original se cancela.",
    ],
    task: "Convierta 0,075 m a milímetros y 2500 mm a metros, mostrando cada paso.",
    rubric: [
      "Selecciona el factor correcto.",
      "Cancela las unidades.",
      "Calcula sin errores.",
      "Comprueba el orden de magnitud.",
    ],
    questions: [
      q(
        "0,075 m equivalen a:",
        ["0,75 mm", "7,5 mm", "75 mm", "750 mm"],
        2,
        "0,075 × 1000 = 75 mm. Las otras opciones desplazan incorrectamente la coma.",
      ),
      q("2500 mm equivalen a:", ["25 m", "2,5 m", "0,25 m", "250 m"], 1, "2500 ÷ 1000 = 2,5 m."),
      q(
        "1 cm² equivale a:",
        ["10 mm²", "100 mm²", "1000 mm²", "1 mm²"],
        1,
        "1 cm = 10 mm; al elevar al cuadrado, 1 cm² = 100 mm².",
      ),
    ],
  },
  {
    id: "selection",
    title: "Selección y cuidado del instrumento",
    objective:
      "Elegir un instrumento por su intervalo y resolución, evitando falsas garantías de exactitud.",
    summary:
      "La resolución es el cambio más pequeño que produce una variación perceptible de la indicación. No equivale a exactitud. Antes de medir, limpie las superficies, revise el cero y respete el intervalo y las condiciones del fabricante.",
    sequence: [
      "Defina qué dimensión medirá.",
      "Compare intervalo y resolución.",
      "Revise limpieza, cero y estado del instrumento.",
    ],
    task: "Compare una regla y un calibrador para medir una pieza pequeña; justifique la elección.",
    rubric: [
      "Define el mensurando.",
      "Comprueba el intervalo.",
      "Relaciona resolución y necesidad.",
      "Documenta cuidado y revisión.",
    ],
    questions: [
      q(
        "Un instrumento indica de 0,01 mm en 0,01 mm. Esto describe su:",
        [
          "Exactitud garantizada",
          "Resolución de indicación",
          "Trazabilidad completa",
          "Error cero",
        ],
        1,
        "El paso de indicación describe resolución, no garantiza exactitud ni ausencia de error.",
        VIM,
      ),
      q(
        "Antes de medir una pieza, corresponde:",
        [
          "Forzar las mordazas",
          "Limpiar las caras y revisar el cero",
          "Ignorar la temperatura",
          "Medir fuera del intervalo",
        ],
        1,
        "Suciedad y un cero incorrecto pueden afectar la medición.",
      ),
      q(
        "Para una pieza de 200 mm, un instrumento de intervalo 0–150 mm:",
        ["Siempre sirve", "Sirve si se fuerza", "No cubre la dimensión", "Garantiza más exactitud"],
        2,
        "La dimensión excede el intervalo de medición.",
      ),
    ],
  },
  {
    id: "vernier",
    title: "Lectura del calibrador Vernier",
    objective: "Combinar la escala principal con el nonio usando la resolución declarada.",
    summary:
      "En un Vernier métrico, sume la lectura de la escala principal anterior al cero del nonio y la división coincidente multiplicada por la resolución. Este curso usa ejemplos didácticos con resolución explícita; confirme la del instrumento real.",
    sequence: [
      "Localice el cero del nonio.",
      "Lea la escala principal anterior al cero.",
      "Sume la contribución de la división coincidente.",
    ],
    task: "Para 12 mm de escala principal y división 7 coincidente a 0,02 mm, registre lectura y cálculo.",
    rubric: [
      "Identifica la escala principal.",
      "Identifica la división coincidente.",
      "Aplica la resolución declarada.",
      "Registra resultado y unidad.",
    ],
    questions: [
      q(
        "Principal: 12 mm; división coincidente: 7; resolución: 0,02 mm. Lectura:",
        ["12,07 mm", "12,14 mm", "14,00 mm", "12,70 mm"],
        1,
        "12 + 7 × 0,02 = 12,14 mm; no se suma el número de división directamente.",
      ),
      q(
        "Principal: 8 mm; división 3; resolución: 0,05 mm. Lectura:",
        ["8,03 mm", "8,30 mm", "8,15 mm", "8,50 mm"],
        2,
        "8 + 3 × 0,05 = 8,15 mm.",
      ),
      q(
        "¿Qué dato debe conocerse para convertir una división del nonio en longitud?",
        ["Color del instrumento", "Nombre de la pieza", "Resolución del nonio", "Peso de la pieza"],
        2,
        "Cada división coincidente aporta el múltiplo de la resolución indicada.",
      ),
    ],
  },
  {
    id: "micrometer",
    title: "Lectura del micrómetro",
    objective: "Sumar escala del manguito y tambor en un micrómetro métrico convencional.",
    summary:
      "En los ejemplos, un tornillo de paso 0,5 mm tiene un tambor de 50 divisiones: cada división representa 0,01 mm. Sume la escala visible del manguito y el tambor. Incluya la marca de 0,5 mm cuando sea visible y use el mecanismo de fuerza indicado por el fabricante.",
    sequence: [
      "Compruebe cero y limpieza.",
      "Lea milímetros y medios milímetros del manguito.",
      "Sume tambor × 0,01 mm.",
    ],
    task: "Calcule lecturas para manguito 5,5 mm y tambor 23; explique por qué no omite el medio milímetro.",
    rubric: [
      "Lee el manguito completo.",
      "Calcula aporte del tambor.",
      "Suma correctamente.",
      "Describe fuerza de contacto adecuada.",
    ],
    questions: [
      q(
        "Manguito 5,5 mm y tambor 23 a 0,01 mm. Lectura:",
        ["5,23 mm", "5,73 mm", "7,80 mm", "5,523 mm"],
        1,
        "5,5 + 23 × 0,01 = 5,73 mm.",
      ),
      q(
        "Paso de 0,5 mm y 50 divisiones: aporte por división:",
        ["0,1 mm", "0,05 mm", "0,01 mm", "0,5 mm"],
        2,
        "0,5 ÷ 50 = 0,01 mm.",
      ),
      q(
        "Omitir una marca visible de 0,5 mm produce:",
        ["Lectura 0,5 mm menor", "Lectura 0,5 mm mayor", "Ningún cambio", "Mayor resolución"],
        0,
        "Omitir medio milímetro resta 0,5 mm al resultado.",
      ),
    ],
  },
  {
    id: "errors",
    title: "Error, precisión y exactitud",
    objective: "Diferenciar error de medición y dispersión, sin confundir precisión con exactitud.",
    summary:
      "Error de medición = valor medido − valor de referencia. La precisión describe concordancia entre mediciones repetidas en condiciones especificadas. La exactitud se relaciona con la proximidad al valor verdadero; no es una magnitud a la que se asigne un valor numérico.",
    sequence: [
      "Compare un valor medido con una referencia.",
      "Calcule el error con su signo.",
      "Compare dos series de resultados repetidos.",
    ],
    task: "Con referencia 10,00 mm y lectura 10,08 mm, calcule el error y explique si repeticiones cercanas bastan para asegurar exactitud.",
    rubric: [
      "Distingue referencia y lectura.",
      "Calcula el error con signo.",
      "Distingue precisión y exactitud.",
      "Evita conclusiones sin evidencia.",
    ],
    questions: [
      q(
        "Lectura 10,08 mm y referencia 10,00 mm. Error:",
        ["−0,08 mm", "+0,08 mm", "0,8 mm", "10,08 mm"],
        1,
        "Error = 10,08 − 10,00 = +0,08 mm.",
        VIM,
      ),
      q(
        "Mediciones muy agrupadas pero alejadas de la referencia muestran:",
        [
          "Buena precisión, no necesariamente buena exactitud",
          "Error necesariamente nulo",
          "Trazabilidad garantizada",
          "Ausencia de incertidumbre",
        ],
        0,
        "Agrupamiento indica precisión; proximidad a referencia es otro aspecto.",
        VIM,
      ),
      q(
        "Una resolución pequeña garantiza:",
        [
          "Exactitud perfecta",
          "Incertidumbre nula",
          "Solo un paso de indicación pequeño",
          "Calibración vigente",
        ],
        2,
        "La resolución no sustituye evaluación de error, incertidumbre o calibración.",
        VIM,
      ),
    ],
  },
  {
    id: "traceability",
    title: "Calibración y trazabilidad",
    objective: "Interpretar calibración, ajuste y trazabilidad como conceptos diferentes.",
    summary:
      "La calibración establece una relación entre valores de patrones y las indicaciones, con sus incertidumbres, para obtener resultados de medición. No equivale a ajuste. La trazabilidad metrológica requiere una cadena documentada e ininterrumpida de calibraciones, cada una contribuyendo a la incertidumbre.",
    sequence: [
      "Identifique patrón e instrumento.",
      "Distinga calibrar y ajustar.",
      "Revise cadena, fecha, condiciones e incertidumbre del certificado.",
    ],
    task: "Prepare una lista de revisión de certificado y explique qué información falta si solo dice «calibrado».",
    rubric: [
      "Distingue calibración y ajuste.",
      "Identifica referencia utilizada.",
      "Incluye incertidumbre y condiciones.",
      "Describe cadena documentada.",
    ],
    questions: [
      q(
        "Calibrar un instrumento significa necesariamente ajustarlo:",
        [
          "Sí, siempre",
          "No, son operaciones diferentes",
          "Solo si es digital",
          "Solo si mide masa",
        ],
        1,
        "Calibración establece relaciones; ajuste modifica el sistema para obtener indicaciones prescritas.",
        VIM,
      ),
      q(
        "La trazabilidad requiere:",
        [
          "Solo una etiqueta",
          "Cadena documentada e ininterrumpida de calibraciones",
          "Solo batería nueva",
          "Solo resolución pequeña",
        ],
        1,
        "Cada calibración de la cadena contribuye a la incertidumbre.",
        VIM,
      ),
      q(
        "En un certificado, la incertidumbre:",
        [
          "Es información relevante",
          "Debe omitirse",
          "Prueba ausencia de error",
          "Es el color del sello",
        ],
        0,
        "Es esencial para interpretar resultados y su trazabilidad.",
        VIM,
      ),
    ],
  },
  {
    id: "report",
    title: "Incertidumbre, tolerancia e informe",
    objective: "Presentar resultados con incertidumbre y separar tolerancia de aceptación.",
    summary:
      "La incertidumbre caracteriza la dispersión de valores atribuidos al mensurando. La tolerancia es un intervalo permitido por una especificación, no la incertidumbre. Si el intervalo de medición cruza un límite, la conformidad depende de una regla de decisión acordada; no basta con observar solo el valor central.",
    sequence: [
      "Registre resultado, unidad y condiciones.",
      "Compare con límites de especificación.",
      "Declare incertidumbre y regla de decisión antes de concluir.",
    ],
    task: "Informe 10,02 mm ± 0,03 mm para una tolerancia 9,98–10,04 mm; identifique el cruce de límites sin declarar conformidad automática.",
    rubric: [
      "Registra valor y unidad.",
      "Distingue incertidumbre y tolerancia.",
      "Calcula intervalo correctamente.",
      "Justifica límites de la conclusión.",
    ],
    questions: [
      q(
        "10,02 mm ± 0,03 mm corresponde al intervalo:",
        ["9,99 a 10,05 mm", "10,01 a 10,03 mm", "9,72 a 10,32 mm", "10,02 a 10,05 mm"],
        0,
        "10,02 − 0,03 = 9,99; 10,02 + 0,03 = 10,05 mm.",
      ),
      q(
        "La tolerancia y la incertidumbre son:",
        ["Sinónimos", "Conceptos distintos", "Siempre cero", "Unidades base"],
        1,
        "La tolerancia viene de la especificación; la incertidumbre caracteriza la medición.",
        VIM,
      ),
      q(
        "El intervalo cruza un límite de tolerancia. Para decidir conformidad debe considerarse:",
        [
          "Solo el valor central",
          "Una regla de decisión que considere la incertidumbre",
          "Solo el número de intentos",
          "El color del instrumento",
        ],
        1,
        "La decisión debe responder a una regla previamente definida y al riesgo asociado.",
      ),
    ],
  },
];
export const metrologyDecks: Deck[] = metrologySheets.map((s) => ({
  id: `metro-${s.id}`,
  title: s.title,
  level: "Metrología · curso introductorio",
  emoji: "📏",
  questions: s.questions,
}));
