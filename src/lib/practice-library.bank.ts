import type { Deck, Q } from "./questions";
import { schoolLevels, schoolSubjects } from "./school-practice.bank";
import { topicChallenges } from "./topic-challenges";
export type Language = "es" | "en";
export type PracticeMode = "practice" | "review" | "trivia";
type Pair = [string, string];
export type Topic = {
  id: string;
  subject: string;
  title: Pair;
  objective: Pair;
  summary: Pair;
  minGrade: number;
  source: string;
  questions: (grade: number, lang: Language) => Q[];
};
const pick = (pair: Pair, lang: Language) => pair[lang === "es" ? 0 : 1];
type Item = [Pair, Pair[], number, Pair];
const items =
  (list: Item[], source: string) =>
  (_grade: number, lang: Language): Q[] =>
    list.map(([q, options, answer, why]) => ({
      q: pick(q, lang),
      options: options.map((o) => pick(o, lang)),
      answer,
      why: pick(why, lang),
      source,
    }));
const numeric = (
  q: Pair,
  values: number[],
  unit: string,
  why: Pair,
  lang: Language,
  source: string,
): Q => ({
  q: pick(q, lang),
  options: values.map(
    (n) =>
      `${Number(n.toFixed(3)).toLocaleString(lang === "es" ? "es-CR" : "en-US", { maximumFractionDigits: 3 })}${unit}`,
  ),
  answer: 0,
  why: pick(why, lang),
  source,
});
export const practiceTopics: Topic[] = [
  {
    id: "fracciones",
    subject: "matematica",
    title: ["Fracciones y proporciones", "Fractions and proportions"],
    objective: [
      "Resolver proporciones mostrando la operación.",
      "Solve proportions and show the calculation.",
    ],
    summary: [
      "Una proporción mantiene una razón constante. Divida para hallar el valor de una unidad y multiplique por la cantidad requerida.",
      "A proportion preserves a constant ratio. Divide to find the unit value, then multiply by the required quantity.",
    ],
    minGrade: 6,
    source: "OpenStax · Prealgebra",
    questions: (grade, lang) => {
      const n = grade + 2;
      const source = "OpenStax \u00b7 Prealgebra";
      return [0, 1, 2, 3].map((k) => {
        const a = n + k;
        const total = a * 4;
        return numeric(
          [
            `Si ${a} cuadernos cuestan ₡${total * 100}, ¿cuánto cuestan 3 cuadernos al mismo precio unitario?`,
            `If ${a} notebooks cost ₡${total * 100}, how much do 3 notebooks cost at the same unit price?`,
          ],
          [1200, total * 100, 400, 800],
          " CRC",
          [
            `${total * 100} ÷ ${a} = 400 por cuaderno; 400 × 3 = 1200.`,
            ` ${total * 100} ÷ ${a} = 400 per notebook; 400 × 3 = 1200.`,
          ],
          lang,
          source,
        );
      });
    },
  },
  {
    id: "ecuaciones",
    subject: "matematica",
    title: ["Ecuaciones lineales", "Linear equations"],
    objective: [
      "Resolver una ecuación y comprobar por sustitución.",
      "Solve an equation and check by substitution.",
    ],
    summary: [
      "Realice la misma operación a ambos lados de la igualdad. Primero elimine el término constante; luego divida entre el coeficiente.",
      "Apply the same operation to both sides. Remove the constant term first, then divide by the coefficient.",
    ],
    minGrade: 8,
    source: "OpenStax · Elementary Algebra",
    questions: (grade, lang) => {
      const n = grade + 2;
      const source = "OpenStax \u00b7 Elementary Algebra";
      return [0, 1, 2, 3].map((k) => {
        const a = n + k;
        return numeric(
          [`Si 3x + ${a} = ${4 * a}, ¿cuál es x?`, `If 3x + ${a} = ${4 * a}, what is x?`],
          [a, 3 * a, 4 * a, a + 3],
          "",
          [
            `Reste ${a}: 3x = ${3 * a}. Divida entre 3: x = ${a}.`,
            `Subtract ${a}: 3x = ${3 * a}. Divide by 3: x = ${a}.`,
          ],
          lang,
          source,
        );
      });
    },
  },
  {
    id: "probabilidad",
    subject: "matematica",
    title: ["Probabilidad simple", "Simple probability"],
    objective: [
      "Calcular probabilidades con resultados equiprobables.",
      "Calculate probabilities for equally likely outcomes.",
    ],
    summary: [
      "Probabilidad = casos favorables / casos posibles, cuando todos los resultados son igualmente probables.",
      "Probability = favourable outcomes / possible outcomes, when all outcomes are equally likely.",
    ],
    minGrade: 10,
    source: "OpenStax · Introductory Statistics",
    questions: (grade, lang) => {
      const n = grade + 2;
      const source = "OpenStax \u00b7 Introductory Statistics";
      return [0, 1, 2, 3].map((k) => {
        const a = n + k;
        return numeric(
          [
            `Una bolsa contiene ${a} fichas rojas y ${a * 3} azules. Al sacar una ficha al azar, ¿qué porcentaje de probabilidad tiene de ser roja?`,
            `A bag contains ${a} red counters and ${a * 3} blue counters. One is drawn at random. What is the percentage probability that it is red?`,
          ],
          [25, 75, 50, 100],
          "%",
          [`${a} ÷ ${a * 4} = 1/4 = 25 %.`, `${a} ÷ ${a * 4} = 1/4 = 25%.`],
          lang,
          source,
        );
      });
    },
  },
  {
    id: "rapidez",
    subject: "fisica",
    title: ["Movimiento y rapidez", "Motion and speed"],
    objective: [
      "Calcular rapidez media con unidades correctas.",
      "Calculate average speed with correct units.",
    ],
    summary: [
      "La rapidez media es distancia total dividida entre tiempo total. No confunda distancia con desplazamiento.",
      "Average speed is total distance divided by total time. Do not confuse distance with displacement.",
    ],
    minGrade: 6,
    source: "OpenStax · College Physics 2e",
    questions: (grade, lang) => {
      const n = grade + 2;
      const source = "OpenStax \u00b7 College Physics 2e";
      return [0, 1, 2, 3].map((k) => {
        const a = n + k;
        return numeric(
          [
            `Una persona recorre ${a * 5} m en 5 s. ¿Cuál es su rapidez media?`,
            `A person travels ${a * 5} m in 5 s. What is their average speed?`,
          ],
          [a, a * 5, a + 5, a * 25],
          " m/s",
          [`${a * 5} m ÷ 5 s = ${a} m/s.`, `${a * 5} m ÷ 5 s = ${a} m/s.`],
          lang,
          source,
        );
      });
    },
  },
  {
    id: "fuerza",
    subject: "fisica",
    title: ["Fuerza y aceleración", "Force and acceleration"],
    objective: [
      "Aplicar la segunda ley de Newton a la fuerza neta.",
      "Apply Newton’s second law to net force.",
    ],
    summary: [
      "La fuerza neta es F = ma. Use masa en kilogramos y aceleración en m/s² para obtener newtons.",
      "Net force is F = ma. Use mass in kilograms and acceleration in m/s² to obtain newtons.",
    ],
    minGrade: 8,
    source: "OpenStax · College Physics 2e",
    questions: (grade, lang) => {
      const n = grade + 2;
      const source = "OpenStax \u00b7 College Physics 2e";
      return [0, 1, 2, 3].map((k) => {
        const a = n + k;
        return numeric(
          [
            `Un cuerpo de ${a} kg tiene aceleración de 2 m/s². ¿Cuál es la fuerza neta?`,
            `A body of ${a} kg has an acceleration of 2 m/s². What is the net force?`,
          ],
          [a * 2, a + 2, a / 2, a * 4],
          " N",
          [`F = ma = ${a} × 2 = ${a * 2} N.`, `F = ma = ${a} × 2 = ${a * 2} N.`],
          lang,
          source,
        );
      });
    },
  },
  {
    id: "energia",
    subject: "fisica",
    title: ["Trabajo y energía", "Work and energy"],
    objective: [
      "Calcular trabajo de una fuerza constante paralela al desplazamiento.",
      "Calculate work by a constant force parallel to displacement.",
    ],
    summary: [
      "Para una fuerza constante paralela al desplazamiento, W = Fd. La unidad es el joule (J). Si son perpendiculares, esa fuerza no realiza trabajo.",
      "For a constant force parallel to displacement, W = Fd. The unit is the joule (J). A perpendicular force does no work.",
    ],
    minGrade: 10,
    source: "OpenStax · College Physics 2e",
    questions: (grade, lang) => {
      const n = grade + 2;
      const source = "OpenStax \u00b7 College Physics 2e";
      return [0, 1, 2, 3].map((k) => {
        const a = n + k;
        return numeric(
          [
            `Una fuerza constante de ${a} N actúa en la dirección de un desplazamiento de 3 m. ¿Qué trabajo realiza?`,
            `A constant force of ${a} N acts along a displacement of 3 m. How much work does it do?`,
          ],
          [a * 3, a + 3, a / 3, a * 6],
          " J",
          [`W = Fd = ${a} × 3 = ${a * 3} J.`, `W = Fd = ${a} × 3 = ${a * 3} J.`],
          lang,
          source,
        );
      });
    },
  },
  {
    id: "densidad",
    subject: "quimica",
    title: ["Materia y densidad", "Matter and density"],
    objective: [
      "Determinar densidad a partir de masa y volumen.",
      "Determine density from mass and volume.",
    ],
    summary: [
      "Densidad = masa / volumen. Compare materiales usando las mismas unidades y condiciones; la masa sola no identifica una sustancia.",
      "Density = mass / volume. Compare materials using the same units and conditions; mass alone does not identify a substance.",
    ],
    minGrade: 6,
    source: "OpenStax · Chemistry 2e",
    questions: (grade, lang) => {
      const n = grade + 2;
      const source = "OpenStax \u00b7 Chemistry 2e";
      return [0, 1, 2, 3].map((k) => {
        const a = n + k;
        return numeric(
          [
            `Una muestra tiene masa de ${a * 5} g y volumen de 5 cm³. ¿Cuál es su densidad?`,
            `A sample has a mass of ${a * 5} g and a volume of 5 cm³. What is its density?`,
          ],
          [a, a * 5, a * 25, a + 5],
          " g/cm³",
          [`ρ = m/V = ${a * 5}/5 = ${a} g/cm³.`, `ρ = m/V = ${a * 5}/5 = ${a} g/cm³.`],
          lang,
          source,
        );
      });
    },
  },
  {
    id: "atomos",
    subject: "quimica",
    title: ["Átomos e isótopos", "Atoms and isotopes"],
    objective: [
      "Deducir neutrones usando número másico y número atómico.",
      "Deduce the neutron count from mass number and atomic number.",
    ],
    summary: [
      "Z es el número de protones. A es protones + neutrones. Por tanto, neutrones = A − Z; en un átomo neutro, electrones = Z.",
      "Z is the proton count. A is protons + neutrons. Thus neutrons = A − Z; in a neutral atom, electrons = Z.",
    ],
    minGrade: 8,
    source: "OpenStax · Chemistry 2e",
    questions: (grade, lang) => {
      const n = grade + 2;
      const source = "OpenStax \u00b7 Chemistry 2e";
      return [0, 1, 2, 3].map((k) => {
        const a = n + k;
        return numeric(
          [
            `Un átomo tiene Z = ${a} y A = ${a * 2 + 1}. ¿Cuántos neutrones contiene?`,
            `An atom has Z = ${a} and A = ${a * 2 + 1}. How many neutrons does it contain?`,
          ],
          [a + 1, a, a * 2 + 1, a * 3 + 1],
          "",
          [
            `N = A − Z = ${a * 2 + 1} − ${a} = ${a + 1}.`,
            `N = A − Z = ${a * 2 + 1} − ${a} = ${a + 1}.`,
          ],
          lang,
          source,
        );
      });
    },
  },
  {
    id: "disoluciones",
    subject: "quimica",
    title: ["Concentración de disoluciones", "Solution concentration"],
    objective: [
      "Calcular concentración másica por volumen de disolución.",
      "Calculate mass concentration using solution volume.",
    ],
    summary: [
      "Concentración másica = masa de soluto / volumen de disolución. El volumen se refiere a la disolución final, no solo al disolvente inicial.",
      "Mass concentration = solute mass / solution volume. The volume is the final solution volume, not just the initial solvent volume.",
    ],
    minGrade: 10,
    source: "OpenStax · Chemistry 2e",
    questions: (grade, lang) => {
      const n = grade + 2;
      const source = "OpenStax \u00b7 Chemistry 2e";
      return [0, 1, 2, 3].map((k) => {
        const a = n + k;
        return numeric(
          [
            `Se disuelven ${a} g de soluto hasta completar 2 L de disolución. ¿Cuál es la concentración másica?`,
            `${a} g of solute is dissolved to make 2 L of solution. What is the mass concentration?`,
          ],
          [a / 2, a * 2, a, a + 2],
          " g/L",
          [`c = ${a} g ÷ 2 L = ${a / 2} g/L.`, `c = ${a} g ÷ 2 L = ${a / 2} g/L.`],
          lang,
          source,
        );
      });
    },
  },
  {
    id: "celulas",
    subject: "biologia",
    title: ["Células y organización", "Cells and organization"],
    objective: [
      "Relacionar estructuras celulares con funciones.",
      "Relate cell structures to their functions.",
    ],
    summary: [
      "La membrana regula intercambios; los ribosomas sintetizan proteínas. En eucariotas, el núcleo contiene la mayor parte del ADN.",
      "The membrane regulates exchange; ribosomes synthesize proteins. In eukaryotes, the nucleus contains most DNA.",
    ],
    minGrade: 6,
    source: "OpenStax · Biology 2e",
    questions: items(
      [
        [
          ["¿Qué estructura sintetiza proteínas?", "Which structure synthesizes proteins?"],
          [
            ["Ribosoma", "Ribosome"],
            ["Vacuola", "Vacuole"],
            ["Pared celular", "Cell wall"],
            ["Cilio", "Cilium"],
          ],
          0,
          [
            "Los ribosomas traducen la información del ARN mensajero a proteínas.",
            "Ribosomes translate messenger RNA information into proteins.",
          ],
        ],
        [
          [
            "¿Qué regula el paso de sustancias hacia el interior celular?",
            "What regulates substances entering a cell?",
          ],
          [
            ["Núcleo", "Nucleus"],
            ["Membrana plasmática", "Plasma membrane"],
            ["Cromosoma", "Chromosome"],
            ["Nucléolo", "Nucleolus"],
          ],
          1,
          [
            "La membrana plasmática tiene permeabilidad selectiva.",
            "The plasma membrane is selectively permeable.",
          ],
        ],
        [
          [
            "¿Qué estructura aparece en células vegetales, pero no en células animales?",
            "Which structure occurs in plant cells but not in animal cells?",
          ],
          [
            ["Ribosoma", "Ribosome"],
            ["Membrana", "Membrane"],
            ["Pared celular de celulosa", "Cellulose cell wall"],
            ["ADN", "DNA"],
          ],
          2,
          [
            "Las células vegetales poseen una pared rica en celulosa; las animales no.",
            "Plant cells have a cellulose-rich wall; animal cells do not.",
          ],
        ],
        [
          [
            "Un organismo crece mediante división celular. ¿Qué debe copiar antes de dividirse?",
            "An organism grows through cell division. What must be copied before division?",
          ],
          [
            ["Solo agua", "Only water"],
            ["Solo lípidos", "Only lipids"],
            ["Solo sales", "Only salts"],
            ["ADN", "DNA"],
          ],
          3,
          [
            "La replicación del ADN permite transmitir información genética a las células hijas.",
            "DNA replication allows genetic information to be passed to daughter cells.",
          ],
        ],
      ],
      "OpenStax · Biology 2e",
    ),
  },
  {
    id: "ecosistemas",
    subject: "biologia",
    title: ["Ecosistemas y redes tróficas", "Ecosystems and food webs"],
    objective: [
      "Interpretar flujo de energía y relaciones alimentarias.",
      "Interpret energy flow and feeding relationships.",
    ],
    summary: [
      "Los productores incorporan energía a las redes tróficas. La energía disponible disminuye entre niveles; la materia circula en ciclos.",
      "Producers bring energy into food webs. Available energy decreases between levels; matter circulates in cycles.",
    ],
    minGrade: 8,
    source: "OpenStax · Biology 2e",
    questions: items(
      [
        [
          [
            "En pasto → conejo → zorro, ¿cuál es el consumidor primario?",
            "In grass → rabbit → fox, which is the primary consumer?",
          ],
          [
            ["Pasto", "Grass"],
            ["Conejo", "Rabbit"],
            ["Zorro", "Fox"],
            ["Luz solar", "Sunlight"],
          ],
          1,
          [
            "El conejo consume al productor; es consumidor primario.",
            "The rabbit eats the producer, making it a primary consumer.",
          ],
        ],
        [
          [
            "¿Qué representa la flecha pasto → conejo?",
            "What does the arrow grass → rabbit represent?",
          ],
          [
            ["Migración", "Migration"],
            ["Reproducción", "Reproduction"],
            ["Transferencia de energía al consumidor", "Energy transfer to the consumer"],
            ["Creación de materia", "Creation of matter"],
          ],
          2,
          [
            "La flecha indica transferencia de energía desde el alimento a quien lo consume.",
            "The arrow indicates energy transfer from food to its consumer.",
          ],
        ],
        [
          ["¿Qué hacen los descomponedores?", "What do decomposers do?"],
          [
            ["Crean energía", "Create energy"],
            ["Eliminan todos los nutrientes", "Remove all nutrients"],
            ["Producen animales", "Produce animals"],
            ["Reciclan nutrientes de materia orgánica", "Recycle nutrients from organic matter"],
          ],
          3,
          [
            "Al degradar restos orgánicos, permiten reutilizar nutrientes.",
            "By breaking down organic remains, they allow nutrients to be reused.",
          ],
        ],
        [
          ["¿Qué factor es abiótico?", "Which factor is abiotic?"],
          [
            ["Temperatura", "Temperature"],
            ["Hongo", "Fungus"],
            ["Árbol", "Tree"],
            ["Bacteria", "Bacterium"],
          ],
          0,
          [
            "La temperatura es una condición física, no un ser vivo.",
            "Temperature is a physical condition, not a living organism.",
          ],
        ],
      ],
      "OpenStax · Biology 2e",
    ),
  },
  {
    id: "genetica",
    subject: "biologia",
    title: ["Herencia y genética", "Inheritance and genetics"],
    objective: [
      "Distinguir genotipo, fenotipo y probabilidades mendelianas simples.",
      "Distinguish genotype, phenotype and simple Mendelian probabilities.",
    ],
    summary: [
      "El genotipo describe variantes genéticas; el fenotipo son características observables influidas por genes y ambiente. En dominancia completa, Aa expresa el rasgo dominante.",
      "Genotype describes genetic variants; phenotype refers to observable traits influenced by genes and environment. Under complete dominance, Aa expresses the dominant trait.",
    ],
    minGrade: 10,
    source: "OpenStax · Biology 2e",
    questions: items(
      [
        [
          [
            "En dominancia completa, ¿qué genotipo es heterocigoto?",
            "Under complete dominance, which genotype is heterozygous?",
          ],
          [
            ["AA", "AA"],
            ["aa", "aa"],
            ["Aa", "Aa"],
            ["Ninguno", "None"],
          ],
          2,
          ["Aa contiene dos alelos distintos.", "Aa contains two different alleles."],
        ],
        [
          [
            "En Aa × Aa, ¿qué proporción esperada es aa?",
            "In Aa × Aa, what expected proportion is aa?",
          ],
          [
            ["0 %", "0%"],
            ["50 %", "50%"],
            ["100 %", "100%"],
            ["25 %", "25%"],
          ],
          3,
          [
            "Las combinaciones son AA, Aa, Aa y aa; una de cuatro es aa.",
            "The combinations are AA, Aa, Aa and aa; one in four is aa.",
          ],
        ],
        [
          ["¿Qué describe un fenotipo?", "What describes a phenotype?"],
          [
            ["Una característica observable", "An observable trait"],
            ["Solo la secuencia de ADN", "Only the DNA sequence"],
            ["Solo un alelo", "Only one allele"],
            ["El número de gametos", "The number of gametes"],
          ],
          0,
          [
            "El fenotipo es observable y puede depender también del ambiente.",
            "Phenotype is observable and may also depend on the environment.",
          ],
        ],
        [
          ["¿Cómo se relacionan un gen y un alelo?", "How are a gene and an allele related?"],
          [
            ["Son organismos", "They are organisms"],
            ["Un alelo es una variante de un gen", "An allele is a variant of a gene"],
            ["Todo gen tiene un solo alelo", "Every gene has only one allele"],
            ["Un alelo carece de ADN", "An allele contains no DNA"],
          ],
          1,
          ["Los alelos son variantes de un mismo gen.", "Alleles are variants of the same gene."],
        ],
      ],
      "OpenStax · Biology 2e",
    ),
  },
  {
    id: "acentuacion",
    subject: "espanol",
    title: ["Acentuación y ortografía", "Spanish accentuation and spelling"],
    objective: [
      "Aplicar reglas de acentuación a palabras españolas.",
      "Apply accentuation rules to Spanish words.",
    ],
    summary: [
      "Las agudas llevan tilde si terminan en vocal, n o s; las llanas, si no terminan así; las esdrújulas siempre llevan tilde.",
      "Spanish oxytone words take an accent when ending in a vowel, n or s; paroxytone words when not ending in those; proparoxytone words always take an accent.",
    ],
    minGrade: 6,
    source: "RAE · Ortografía de la lengua española",
    questions: items(
      [
        [
          ["¿Cuál es aguda con tilde?", "Which Spanish word is oxytone with an accent mark?"],
          [
            ["Café", "Café"],
            ["Mesa", "Mesa"],
            ["Música", "Música"],
            ["Árbol", "Árbol"],
          ],
          0,
          [
            "Café tiene acento en la última sílaba y termina en vocal.",
            "Café is stressed on its last syllable and ends in a vowel.",
          ],
        ],
        [
          ["¿Por qué árbol lleva tilde?", "Why does árbol take an accent mark?"],
          [
            ["Es aguda", "It is oxytone"],
            ["Es llana y termina en l", "It is paroxytone and ends in l"],
            ["Es esdrújula", "It is proparoxytone"],
            ["Toda palabra la lleva", "Every word takes one"],
          ],
          1,
          [
            "Árbol es llana y no termina en vocal, n ni s.",
            "Árbol is paroxytone and does not end in a vowel, n or s.",
          ],
        ],
        [
          ["¿Cuál palabra es esdrújula?", "Which Spanish word is proparoxytone?"],
          [
            ["Reloj", "Reloj"],
            ["Camión", "Camión"],
            ["Teléfono", "Teléfono"],
            ["Pared", "Pared"],
          ],
          2,
          [
            "Teléfono se acentúa en la antepenúltima sílaba.",
            "Teléfono is stressed on its antepenultimate syllable.",
          ],
        ],
        [
          [
            "¿Cuál forma completa «___ llegó temprano» si se refiere a una persona?",
            "Which form completes “___ llegó temprano” when referring to a person?",
          ],
          [
            ["El", "El"],
            ["Dé", "Dé"],
            ["De", "De"],
            ["Él", "Él"],
          ],
          3,
          [
            "Él es pronombre personal; el sin tilde es artículo.",
            "Él is a personal pronoun; el without an accent is an article.",
          ],
        ],
      ],
      "RAE · Ortografía de la lengua española",
    ),
  },
  {
    id: "gramatica",
    subject: "espanol",
    title: ["Concordancia y gramática", "Spanish agreement and grammar"],
    objective: [
      "Reconocer concordancia y funciones en una oración.",
      "Recognize agreement and functions in a sentence.",
    ],
    summary: [
      "El verbo concuerda con el sujeto en número y persona. El núcleo del sujeto suele ser un sustantivo o pronombre.",
      "The verb agrees with the subject in number and person. The subject head is usually a noun or pronoun.",
    ],
    minGrade: 8,
    source: "RAE · Nueva gramática de la lengua española",
    questions: items(
      [
        [
          [
            "¿Qué oración tiene concordancia correcta?",
            "Which Spanish sentence has correct agreement?",
          ],
          [
            ["Los estudiantes lee", "Los estudiantes lee"],
            ["Los estudiantes leen", "Los estudiantes leen"],
            ["Las estudiante leen", "Las estudiante leen"],
            ["El estudiantes leen", "El estudiantes leen"],
          ],
          1,
          [
            "Estudiantes es plural y exige leen en plural.",
            "Estudiantes is plural and requires the plural verb leen.",
          ],
        ],
        [
          [
            "En «La profesora explica», ¿cuál es el verbo?",
            "In “La profesora explica”, which word is the verb?",
          ],
          [
            ["La", "La"],
            ["Profesora", "Profesora"],
            ["Explica", "Explica"],
            ["La profesora", "La profesora"],
          ],
          2,
          [
            "Explica expresa la acción del predicado.",
            "Explica expresses the action of the predicate.",
          ],
        ],
        [
          ["¿Qué pronombre exige «estudiamos»?", "Which pronoun agrees with “estudiamos”?"],
          [
            ["Ella", "Ella"],
            ["Usted", "Usted"],
            ["Ellos", "Ellos"],
            ["Nosotros", "Nosotros"],
          ],
          3,
          [
            "Estudiamos corresponde a primera persona del plural.",
            "Estudiamos is first-person plural.",
          ],
        ],
        [
          [
            "En «El libro nuevo», ¿cuál palabra es adjetivo?",
            "In “El libro nuevo”, which word is an adjective?",
          ],
          [
            ["Nuevo", "Nuevo"],
            ["Libro", "Libro"],
            ["El", "El"],
            ["El libro", "El libro"],
          ],
          0,
          ["Nuevo modifica al sustantivo libro.", "Nuevo modifies the noun libro."],
        ],
      ],
      "RAE · Nueva gramática de la lengua española",
    ),
  },
  {
    id: "lectura",
    subject: "espanol",
    title: ["Lectura y argumentación", "Reading and argumentation"],
    objective: [
      "Distinguir tesis, evidencia e inferencia en textos breves.",
      "Distinguish claims, evidence and inference in short texts.",
    ],
    summary: [
      "Una tesis expresa la postura. La evidencia debe ser pertinente y verificable. Una inferencia se apoya en pistas del texto, no en suposiciones ajenas.",
      "A claim states a position. Evidence must be relevant and verifiable. An inference relies on textual clues, not unrelated assumptions.",
    ],
    minGrade: 10,
    source: "REA · comprensión lectora y pensamiento crítico",
    questions: items(
      [
        [
          [
            "«El grupo separó residuos y redujo la basura mezclada». ¿Qué inferencia está apoyada?",
            "“The group sorted waste and reduced mixed rubbish.” Which inference is supported?",
          ],
          [
            ["La separación contribuyó a reducir la mezcla", "Sorting helped reduce mixed waste"],
            ["Ya no existe basura", "Rubbish no longer exists"],
            ["Todos los residuos son reciclables", "All waste is recyclable"],
            ["Se prohibió estudiar", "Studying was banned"],
          ],
          0,
          [
            "El texto relaciona separar residuos con menos basura mezclada; no afirma resultados absolutos.",
            "The text links sorting to less mixed waste; it makes no absolute claims.",
          ],
        ],
        [
          [
            "¿Cuál es una evidencia verificable para afirmar que una intervención redujo residuos?",
            "Which is verifiable evidence that an intervention reduced waste?",
          ],
          [
            ["Me parece bonita", "It looks nice"],
            [
              "Pesajes antes y después con el mismo método",
              "Before-and-after weights using the same method",
            ],
            ["Un rumor", "A rumour"],
            ["Una promesa", "A promise"],
          ],
          1,
          [
            "Mediciones comparables permiten contrastar la afirmación.",
            "Comparable measurements allow the claim to be checked.",
          ],
        ],
        [
          ["¿Qué enunciado expresa una tesis?", "Which statement expresses a claim?"],
          [
            ["Hay tres recipientes", "There are three bins"],
            ["El informe tiene dos páginas", "The report has two pages"],
            ["La escuela debería separar residuos", "The school should sort waste"],
            ["El recipiente pesa 2 kg", "The bin weighs 2 kg"],
          ],
          2,
          [
            "Debería expresa una postura que puede argumentarse.",
            "Should expresses a position that can be argued for.",
          ],
        ],
        [
          ["¿Qué fortalece una conclusión?", "What strengthens a conclusion?"],
          [
            ["Insultos", "Insults"],
            ["Datos no relacionados", "Unrelated data"],
            ["Repetir sin justificar", "Unjustified repetition"],
            [
              "Vincular evidencia pertinente con la tesis",
              "Linking relevant evidence to the claim",
            ],
          ],
          3,
          [
            "La conclusión debe derivarse de razones y evidencia pertinentes.",
            "A conclusion should follow from relevant reasons and evidence.",
          ],
        ],
      ],
      "REA · comprensión lectora y pensamiento crítico",
    ),
  },
  {
    id: "respeto",
    subject: "religion",
    title: ["Dignidad y libertad de conciencia", "Dignity and freedom of conscience"],
    objective: [
      "Reconocer acciones que respetan la dignidad y las creencias.",
      "Recognize actions respecting dignity and beliefs.",
    ],
    summary: [
      "Toda persona tiene dignidad y libertad de conciencia. El respeto no exige compartir una creencia ni autoriza imponerla.",
      "Every person has dignity and freedom of conscience. Respect does not require sharing a belief or justify imposing it.",
    ],
    minGrade: 6,
    source: "Declaración Universal de Derechos Humanos · artículos 1 y 18",
    questions: items(
      [
        [
          [
            "Un compañero tiene otra creencia. ¿Qué acción respeta su dignidad?",
            "A classmate has a different belief. Which action respects their dignity?",
          ],
          [
            ["Escucharlo sin ridiculizarlo", "Listen without mocking"],
            ["Excluirlo", "Exclude them"],
            ["Forzarlo a cambiar", "Force them to change"],
            ["Difundir burlas", "Spread mockery"],
          ],
          0,
          [
            "El respeto reconoce igual dignidad sin coerción.",
            "Respect recognizes equal dignity without coercion.",
          ],
        ],
        [
          ["¿Qué implica libertad de conciencia?", "What does freedom of conscience entail?"],
          [
            ["Creer lo que diga el grupo", "Believe what the group says"],
            ["Poder sostener convicciones sin imposición", "Hold convictions without coercion"],
            ["No dialogar nunca", "Never engage in dialogue"],
            ["Obligar a otros", "Compel others"],
          ],
          1,
          [
            "La libertad protege las convicciones personales frente a imposiciones.",
            "Freedom protects personal convictions from coercion.",
          ],
        ],
        [
          [
            "¿Qué frase favorece un diálogo respetuoso?",
            "Which statement supports respectful dialogue?",
          ],
          [
            ["Usted no vale", "You have no worth"],
            ["Solo yo tengo derechos", "Only I have rights"],
            [
              "No comparto su idea, pero escucharé sus razones",
              "I disagree, but I will listen to your reasons",
            ],
            ["No puede opinar", "You cannot speak"],
          ],
          2,
          [
            "Distingue la idea de la dignidad de la persona.",
            "It distinguishes an idea from the person’s dignity.",
          ],
        ],
        [
          [
            "¿Qué debe hacer un grupo cuando alguien no desea participar en una expresión religiosa?",
            "What should a group do when someone does not wish to join a religious expression?",
          ],
          [
            ["Castigarlo", "Punish them"],
            ["Burlarse", "Mock them"],
            ["Forzarlo", "Force them"],
            [
              "Respetar su decisión sin excluirlo del grupo",
              "Respect their decision without excluding them",
            ],
          ],
          3,
          [
            "Participar debe ser libre; discrepar no justifica exclusión.",
            "Participation should be voluntary; disagreement does not justify exclusion.",
          ],
        ],
      ],
      "Declaración Universal de Derechos Humanos · artículos 1 y 18",
    ),
  },
  {
    id: "convivencia",
    subject: "religion",
    title: ["Convivencia y resolución de conflictos", "Coexistence and conflict resolution"],
    objective: [
      "Elegir respuestas pacíficas y responsables ante conflictos.",
      "Choose peaceful and responsible responses to conflicts.",
    ],
    summary: [
      "Resolver un conflicto exige escuchar, identificar necesidades y acordar acciones sin violencia. Ante amenazas, busque ayuda de una persona adulta responsable.",
      "Resolving conflict requires listening, identifying needs and agreeing on nonviolent actions. In cases of threats, seek help from a responsible adult.",
    ],
    minGrade: 8,
    source: "UNESCO · educación para la paz",
    questions: items(
      [
        [
          [
            "Dos estudiantes quieren usar el mismo material. ¿Qué acuerdo es justo?",
            "Two students want the same materials. Which agreement is fair?",
          ],
          [
            ["Que gane quien grite", "Let the loudest win"],
            ["Establecer turnos acordados", "Agree on turns"],
            ["Esconder el material", "Hide the materials"],
            ["Romperlo", "Break them"],
          ],
          1,
          [
            "Los turnos permiten atender ambas necesidades sin violencia.",
            "Taking turns addresses both needs without violence.",
          ],
        ],
        [
          [
            "Si recibe amenazas, ¿cuál es una respuesta segura?",
            "If you receive threats, which response is safe?",
          ],
          [
            ["Vengarse", "Seek revenge"],
            ["Callar siempre", "Always stay silent"],
            ["Buscar ayuda responsable", "Seek responsible help"],
            ["Amenazar también", "Threaten back"],
          ],
          2,
          [
            "La ayuda de una persona responsable permite activar protección.",
            "Help from a responsible person allows protective action.",
          ],
        ],
        [
          ["¿Qué muestra escucha activa?", "What demonstrates active listening?"],
          [
            ["Interrumpir", "Interrupting"],
            ["Preparar insultos", "Preparing insults"],
            ["Ignorar", "Ignoring"],
            [
              "Confirmar lo entendido antes de responder",
              "Checking understanding before responding",
            ],
          ],
          3,
          [
            "Reformular ayuda a evitar malentendidos.",
            "Restating helps prevent misunderstandings.",
          ],
        ],
        [
          [
            "Después de causar un daño, ¿qué acción es responsable?",
            "After causing harm, which action is responsible?",
          ],
          [
            ["Reconocerlo y acordar una reparación", "Acknowledge it and agree on repair"],
            ["Negarlo siempre", "Always deny it"],
            ["Culpar a otro", "Blame someone else"],
            ["Repetirlo", "Repeat it"],
          ],
          0,
          [
            "La responsabilidad incluye reconocer consecuencias y reparar cuando sea posible.",
            "Responsibility includes acknowledging consequences and repairing harm where possible.",
          ],
        ],
      ],
      "UNESCO · educación para la paz",
    ),
  },
  {
    id: "etica",
    subject: "religion",
    title: ["Ética, solidaridad y decisiones", "Ethics, solidarity and decisions"],
    objective: [
      "Justificar decisiones considerando consecuencias y derechos.",
      "Justify decisions by considering consequences and rights.",
    ],
    summary: [
      "Una decisión ética considera dignidad, derechos, consecuencias y responsabilidad. La solidaridad ayuda sin humillar ni exigir beneficios personales.",
      "An ethical decision considers dignity, rights, consequences and responsibility. Solidarity helps without humiliation or demands for personal benefit.",
    ],
    minGrade: 10,
    source: "Declaración Universal de Derechos Humanos · UNESCO educación para la paz",
    questions: items(
      [
        [
          ["¿Qué ayuda es solidaria?", "Which action demonstrates solidarity?"],
          [
            ["Ayudar sin humillar", "Help without humiliating"],
            ["Exigir favores a cambio", "Demand favours in return"],
            [
              "Publicar la dificultad ajena sin permiso",
              "Publish another’s difficulty without consent",
            ],
            ["Burlarse al ayudar", "Mock while helping"],
          ],
          0,
          [
            "La solidaridad reconoce dignidad y no instrumentaliza la necesidad.",
            "Solidarity recognizes dignity and does not exploit need.",
          ],
        ],
        [
          [
            "Antes de compartir una fotografía ajena, ¿qué debe considerar?",
            "Before sharing someone else’s photograph, what should you consider?",
          ],
          [
            ["Solo los me gusta", "Only likes"],
            ["Su consentimiento y privacidad", "Their consent and privacy"],
            ["Solo la resolución", "Only resolution"],
            ["Nada", "Nothing"],
          ],
          1,
          [
            "Compartir imágenes afecta privacidad y requiere respetar consentimiento y contexto.",
            "Sharing images affects privacy and requires respect for consent and context.",
          ],
        ],
        [
          [
            "¿Qué argumento es éticamente pertinente ante una decisión?",
            "Which argument is ethically relevant to a decision?",
          ],
          [
            ["Es popular", "It is popular"],
            ["Nadie se dará cuenta", "Nobody will notice"],
            ["Respeta derechos y reduce daños", "It respects rights and reduces harm"],
            ["Me beneficia aunque perjudique a todos", "It benefits me even if it harms everyone"],
          ],
          2,
          [
            "Los derechos y daños son criterios pertinentes para evaluar una acción.",
            "Rights and harms are relevant criteria for evaluating an action.",
          ],
        ],
        [
          [
            "Si un acuerdo discrimina, ¿qué corresponde hacer?",
            "If an agreement discriminates, what should be done?",
          ],
          [
            ["Cumplirlo sin cuestionar", "Follow it without question"],
            ["Celebrarlo", "Celebrate it"],
            ["Ocultarlo", "Hide it"],
            ["Revisarlo para respetar igualdad de derechos", "Revise it to respect equal rights"],
          ],
          3,
          [
            "Un acuerdo no vuelve legítima la discriminación.",
            "An agreement does not make discrimination legitimate.",
          ],
        ],
      ],
      "Declaración Universal de Derechos Humanos · UNESCO educación para la paz",
    ),
  },
];
export function gradeNumber(level: string) {
  const grade = Number.parseInt(level, 10);
  if (!Number.isInteger(grade) || grade < 6 || grade > 12) throw new Error("Nivel no disponible.");
  return grade;
}
export function topicsFor(subject: string, level: string) {
  return practiceTopics.filter((t) => t.subject === subject && t.minGrade <= gradeNumber(level));
}
export const numericTopicIds = [
  "fracciones",
  "ecuaciones",
  "probabilidad",
  "rapidez",
  "fuerza",
  "energia",
  "densidad",
  "atomos",
  "disoluciones",
];
export function topicDeck(
  topicId: string,
  level: string,
  lang: Language,
  mode: PracticeMode = "practice",
  version: 1 | 2 = 2,
  variant = 0,
): Deck {
  const topic = practiceTopics.find((t) => t.id === topicId);
  const grade = gradeNumber(level);
  if (!topic || grade < topic.minGrade) throw new Error("Tema no disponible para este nivel.");
  const subject = schoolSubjects.find((s) => s.id === topic.subject);
  if (!Number.isInteger(variant) || variant < 0 || variant > 49)
    throw new Error("Variante no disponible.");
  const base = topic
    .questions(grade + (numericTopicIds.includes(topicId) ? variant : 0), lang)
    .map((q) => ({ ...q, difficulty: 1 as const }));
  const expanded = [...base, ...topicChallenges(topic.id, lang, topic.source)];
  const questions =
    version === 1
      ? base
      : mode === "trivia"
        ? [expanded[0], expanded[4], expanded[5]].filter((q): q is Q => !!q)
        : expanded;
  return {
    id: `${version === 2 ? "topic-v2" : "topic"}-${topic.id}-${grade}-${mode}${variant ? `-v${variant}` : ""}`,
    title: `${pick(topic.title, lang)} · ${grade}.° · ${mode === "review" ? (lang === "es" ? "Repaso" : "Review") : lang === "es" ? "Práctica" : "Practice"}`,
    level,
    emoji: subject?.emoji ?? "📚",
    questions,
    progressive: version === 2,
  };
}
export function resolveVariantDeck(id: string): Deck | undefined {
  const match = /^topic-v2-([a-z]+)-(\d+)-(practice|review|trivia)-v(\d+)$/.exec(id);
  if (!match) return undefined;
  const [, topic, grade, mode, variant] = match;
  const level = schoolLevels.find((l) => parseInt(l, 10) === Number(grade));
  if (
    !topic ||
    !level ||
    !numericTopicIds.includes(topic) ||
    (mode !== "practice" && mode !== "review" && mode !== "trivia")
  )
    return undefined;
  return topicDeck(topic, level, "es", mode, 2, Number(variant));
}
export const topicDecks = practiceTopics.flatMap((t) =>
  schoolLevels
    .filter((l) => gradeNumber(l) >= t.minGrade)
    .flatMap((l) =>
      (["practice", "review", "trivia"] as const).flatMap((mode) =>
        mode === "trivia"
          ? [topicDeck(t.id, l, "es", mode)]
          : [topicDeck(t.id, l, "es", mode, 1), topicDeck(t.id, l, "es", mode, 2)],
      ),
    ),
);
export const librarySources = [
  { title: "OpenStax · REA de ciencias y matemática", url: "https://openstax.org/subjects" },
  { title: "RAE · Ortografía y gramática", url: "https://www.rae.es/obras-academicas" },
  {
    title: "Naciones Unidas · Derechos humanos",
    url: "https://www.un.org/es/about-us/universal-declaration-of-human-rights",
  },
  { title: "UNESCO · Educación para la paz", url: "https://www.unesco.org/es/education" },
  {
    title: "MEP · Programas de estudio (referencia curricular)",
    url: "https://www.mep.go.cr/programas-estudio",
  },
];
export { pick as localText };
