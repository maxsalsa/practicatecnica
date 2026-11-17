import type { Deck, Q } from "./questions";
type Item = [string, string, string[], string[], number, string, string];
const subjects: { id: string; title: string; en: string; emoji: string; items: Item[] }[] = [
  {
    id: "religion",
    title: "Educación Religiosa",
    en: "Religious Education",
    emoji: "🤝",
    items: [
      [
        "¿Qué acción respeta la libertad de conciencia?",
        "Which action respects freedom of conscience?",
        [
          "Escuchar sin obligar a compartir una creencia",
          "Excluir a quien piensa diferente",
          "Imponer una religión",
          "Ridiculizar las convicciones",
        ],
        [
          "Listening without forcing a shared belief",
          "Excluding people who think differently",
          "Imposing a religion",
          "Mocking convictions",
        ],
        0,
        "La libertad de conciencia implica respeto a las convicciones, sin coerción.",
        "Freedom of conscience requires respect for convictions without coercion.",
      ],
      [
        "¿Qué respuesta fomenta la convivencia ante un desacuerdo?",
        "Which response promotes coexistence during a disagreement?",
        ["Insultar", "Dialogar con respeto", "Difundir rumores", "Amenazar"],
        ["Insulting", "Respectful dialogue", "Spreading rumours", "Threatening"],
        1,
        "Dialogar permite expresar diferencias sin dañar la dignidad de las personas.",
        "Dialogue allows differences to be expressed without harming human dignity.",
      ],
    ],
  },
  {
    id: "biologia",
    title: "Biología",
    en: "Biology",
    emoji: "🌱",
    items: [
      [
        "¿Qué estructura celular contiene normalmente la mayor parte del ADN en una célula eucariota?",
        "Which structure usually contains most DNA in a eukaryotic cell?",
        ["Ribosoma", "Membrana plasmática", "Núcleo", "Pared celular"],
        ["Ribosome", "Plasma membrane", "Nucleus", "Cell wall"],
        2,
        "La mayor parte del ADN eucariota está en el núcleo; mitocondrias y cloroplastos también contienen ADN.",
        "Most eukaryotic DNA is in the nucleus; mitochondria and chloroplasts also contain DNA.",
      ],
      [
        "En una cadena alimentaria, un productor se caracteriza por:",
        "In a food chain, a producer is characterized by:",
        [
          "Producir materia orgánica a partir de sustancias inorgánicas",
          "Comer siempre animales",
          "Carecer de células",
          "No necesitar energía",
        ],
        [
          "Producing organic matter from inorganic substances",
          "Always eating animals",
          "Having no cells",
          "Needing no energy",
        ],
        0,
        "Los productores son autótrofos; utilizan energía luminosa o química.",
        "Producers are autotrophs; they use light or chemical energy.",
      ],
    ],
  },
  {
    id: "quimica",
    title: "Química",
    en: "Chemistry",
    emoji: "🧪",
    items: [
      [
        "El número atómico de un elemento corresponde a su número de:",
        "The atomic number of an element is its number of:",
        ["Neutrones", "Protones", "Moléculas", "Enlaces"],
        ["Neutrons", "Protons", "Molecules", "Bonds"],
        1,
        "El número de protones define el elemento; los neutrones pueden variar entre isótopos.",
        "The proton count defines the element; neutron counts can vary between isotopes.",
      ],
      [
        "¿Cuál es un cambio químico?",
        "Which is a chemical change?",
        ["Derretir hielo", "Cortar papel", "Oxidar hierro", "Evaporar agua"],
        ["Melting ice", "Cutting paper", "Rusting iron", "Evaporating water"],
        2,
        "La oxidación genera sustancias distintas; los otros ejemplos no cambian la identidad química principal.",
        "Rusting forms different substances; the other examples do not change the main chemical identity.",
      ],
    ],
  },
  {
    id: "fisica",
    title: "Física",
    en: "Physics",
    emoji: "⚙️",
    items: [
      [
        "Una distancia de 120 m recorrida en 20 s corresponde a una rapidez media de:",
        "A distance of 120 m travelled in 20 s gives an average speed of:",
        ["2400 m/s", "0,167 m/s", "100 m/s", "6 m/s"],
        ["2400 m/s", "0.167 m/s", "100 m/s", "6 m/s"],
        3,
        "Rapidez media = distancia / tiempo = 120 / 20 = 6 m/s.",
        "Average speed = distance / time = 120 / 20 = 6 m/s.",
      ],
      [
        "Para una masa de 2 kg y aceleración de 3 m/s², la fuerza neta es:",
        "For a mass of 2 kg and acceleration of 3 m/s², the net force is:",
        ["6 N", "1,5 N", "5 N", "0,67 N"],
        ["6 N", "1.5 N", "5 N", "0.67 N"],
        0,
        "F = ma = 2 × 3 = 6 N.",
        "F = ma = 2 × 3 = 6 N.",
      ],
    ],
  },
  {
    id: "matematica",
    title: "Matemática",
    en: "Mathematics",
    emoji: "📐",
    items: [
      [
        "¿Cuánto es 3/4 + 1/4?",
        "What is 3/4 + 1/4?",
        ["4/8", "1/2", "1", "3/8"],
        ["4/8", "1/2", "1", "3/8"],
        2,
        "Con igual denominador se suman numeradores: 4/4 = 1.",
        "With equal denominators, add numerators: 4/4 = 1.",
      ],
      [
        "Si 2x + 6 = 14, ¿cuál es x?",
        "If 2x + 6 = 14, what is x?",
        ["10", "4", "7", "8"],
        ["10", "4", "7", "8"],
        1,
        "Reste 6 a ambos lados: 2x = 8; divida entre 2: x = 4.",
        "Subtract 6 from both sides: 2x = 8; divide by 2: x = 4.",
      ],
    ],
  },
  {
    id: "espanol",
    title: "Español",
    en: "Spanish",
    emoji: "📖",
    items: [
      [
        "¿Cuál palabra lleva tilde por ser esdrújula?",
        "Which Spanish word takes an accent mark because it is stressed on the antepenultimate syllable?",
        ["Papel", "Café", "Música", "Reloj"],
        ["Papel", "Café", "Música", "Reloj"],
        2,
        "Música es esdrújula: la sílaba tónica es la antepenúltima. Las esdrújulas llevan tilde.",
        "Música is stressed on the antepenultimate syllable. Such Spanish words take an accent mark.",
      ],
      [
        "En «Las estudiantes leen», el núcleo del sujeto es:",
        "In “Las estudiantes leen”, the head of the subject is:",
        ["Las", "Estudiantes", "Leen", "Las leen"],
        ["Las", "Estudiantes", "Leen", "Las leen"],
        1,
        "Estudiantes es el sustantivo que constituye el núcleo del sujeto; leen es el verbo.",
        "Estudiantes is the noun heading the subject; leen is the verb.",
      ],
    ],
  },
];
export const schoolSubjects = subjects.map(({ id, title, en, emoji }) => ({
  id,
  title,
  en,
  emoji,
}));
export const schoolLevels = [
  "6.º primaria",
  "7.º secundaria",
  "8.º secundaria",
  "9.º secundaria",
  "10.º secundaria / CTP",
  "11.º secundaria / CTP",
  "12.º CTP",
];
export function schoolDeck(subject: string, level: string, lang: "es" | "en"): Deck {
  const s = subjects.find((s) => s.id === subject) ?? subjects[0];
  if (!s) throw new Error("Materia no disponible.");
  const questions: Q[] = s.items.map((i) => ({
    q: lang === "es" ? i[0] : i[1],
    options: lang === "es" ? i[2] : i[3],
    answer: i[4],
    why: lang === "es" ? i[5] : i[6],
    source:
      s.id === "espanol"
        ? "RAE · Ortografía y gramática"
        : s.id === "religion"
          ? "Declaración Universal de Derechos Humanos, art. 18"
          : "Fundamentos escolares · práctica de repaso",
  }));
  return {
    id: `school-${s.id}`,
    title: lang === "es" ? s.title : s.en,
    emoji: s.emoji,
    level: `${level} · repaso inicial`,
    questions,
  };
}
export const schoolDecks = subjects.map((s) => schoolDeck(s.id, "Repaso", "es"));
