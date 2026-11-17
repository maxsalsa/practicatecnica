import type { Deck, Q } from "./questions";

// 6.º grado: 500 versiones reproducibles por materia. La versión (0–499) es la semilla:
// el mismo id siempre produce las mismas preguntas, así el servidor recalcula la nota.
export const GRADE6_VERSIONS = 500;
export const grade6Subjects = [
  { id: "matematica", title: "Matemática", emoji: "➗" },
  { id: "ciencias", title: "Ciencias", emoji: "🔬" },
  { id: "espanol", title: "Español", emoji: "✍️" },
  { id: "sociales", title: "Estudios Sociales", emoji: "🗺️" },
] as const;
export type Grade6Subject = (typeof grade6Subjects)[number]["id"];

function rng(seed: number) {
  let s = (seed * 2654435761) >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 1_000_000) / 1_000_000;
  };
}
type R = () => number;
const int = (r: R, a: number, b: number) => a + Math.floor(r() * (b - a + 1));
const fmt = (n: number) => n.toLocaleString("es-CR", { maximumFractionDigits: 2 });

/** Builds a question with the correct answer at index 0 and three distinct distractors. */
function mc(q: string, correct: string, wrong: string[], why: string, source: string, difficulty: 1 | 2 | 3): Q {
  const opts = [correct];
  for (const w of wrong) if (!opts.includes(w) && opts.length < 4) opts.push(w);
  let k = 1;
  while (opts.length < 4) {
    const extra = `${correct} + ${k++}`;
    if (!opts.includes(extra)) opts.push(extra);
  }
  return { q, options: opts, answer: 0, why, source, difficulty };
}

const MATH: ((r: R) => Q)[] = [
  (r) => {
    const p = [10, 15, 20, 25, 30, 40][int(r, 0, 5)]!;
    const price = int(r, 4, 40) * 500;
    const d = (price * p) / 100;
    return mc(
      `En la pulpería, un producto cuesta ₡${fmt(price)} y tiene ${p}% de descuento. ¿Cuánto paga?`,
      `₡${fmt(price - d)}`,
      [`₡${fmt(d)}`, `₡${fmt(price + d)}`, `₡${fmt(price - p)}`],
      `${p}% de ${fmt(price)} = ${fmt(d)}; ${fmt(price)} − ${fmt(d)} = ${fmt(price - d)}.`,
      "MEP · Números: porcentajes",
      2,
    );
  },
  (r) => {
    const b = int(r, 3, 25), h = int(r, 2, 18);
    return mc(
      `Un terreno rectangular mide ${b} m de largo y ${h} m de ancho. ¿Cuál es su área?`,
      `${b * h} m²`,
      [`${2 * (b + h)} m²`, `${b + h} m²`, `${(b * h) / 2} m²`],
      `Área = largo × ancho = ${b} × ${h} = ${b * h} m². Sumar los lados da el perímetro, no el área.`,
      "MEP · Medidas y geometría",
      1,
    );
  },
  (r) => {
    const den = [4, 6, 8, 10, 12][int(r, 0, 4)]!;
    const a = int(r, 1, den - 2), b = int(r, 1, den - a - 1);
    return mc(
      `María comió ${a}/${den} de una pizza y Juan ${b}/${den}. ¿Qué fracción comieron entre ambos?`,
      `${a + b}/${den}`,
      [`${a + b}/${den * 2}`, `${a * b}/${den}`, `${Math.abs(a - b)}/${den}`],
      `Con igual denominador se suman los numeradores: ${a} + ${b} = ${a + b}; el denominador se mantiene (${den}).`,
      "MEP · Números: fracciones",
      1,
    );
  },
  (r) => {
    const xs = Array.from({ length: 4 }, () => int(r, 50, 100));
    const sum = xs.reduce((s, x) => s + x, 0);
    const extra = (4 - (sum % 4)) % 4;
    xs[0]! += extra;
    const m = (sum + extra) / 4;
    return mc(
      `Las notas de Ana son ${xs.join(", ")}. ¿Cuál es su promedio?`,
      fmt(m),
      [fmt(m + 2), fmt(Math.max(...xs)), fmt(sum + extra)],
      `Promedio = suma ÷ cantidad = ${sum + extra} ÷ 4 = ${fmt(m)}.`,
      "MEP · Estadística",
      2,
    );
  },
  (r) => {
    const km = int(r, 2, 40) / 2;
    return mc(
      `Una ruta mide ${fmt(km)} km. ¿Cuántos metros son?`,
      `${fmt(km * 1000)} m`,
      [`${fmt(km * 100)} m`, `${fmt(km * 10)} m`, `${fmt(km * 10000)} m`],
      `1 km = 1000 m, entonces ${fmt(km)} × 1000 = ${fmt(km * 1000)} m.`,
      "MEP · Medidas",
      1,
    );
  },
  (r) => {
    const n = int(r, 3, 9), per = int(r, 12, 48);
    const tot = n * per * 25;
    const paid = Math.ceil(tot / 5000) * 5000;
    return mc(
      `Compra ${n} cuadernos de ₡${fmt(per * 25)} cada uno y paga con ₡${fmt(paid)}. ¿Cuánto vuelto recibe?`,
      `₡${fmt(paid - tot)}`,
      [`₡${fmt(tot)}`, `₡${fmt(paid - per * 25)}`, `₡${fmt(paid - tot + per * 25)}`],
      `Total: ${n} × ${fmt(per * 25)} = ${fmt(tot)}. Vuelto: ${fmt(paid)} − ${fmt(tot)} = ${fmt(paid - tot)}.`,
      "MEP · Problemas con dinero",
      3,
    );
  },
  (r) => {
    const a = int(r, 2, 12), b = int(r, 2, 12);
    const c = int(r, 1, 20);
    return mc(
      `Resuelva respetando la jerarquía de operaciones: ${c} + ${a} × ${b}`,
      String(c + a * b),
      [String((c + a) * b), String(c + a + b), String(c * a + b)],
      `Primero la multiplicación: ${a} × ${b} = ${a * b}; luego ${c} + ${a * b} = ${c + a * b}.`,
      "MEP · Operaciones combinadas",
      2,
    );
  },
];

const SCIENCE_PARAM: ((r: R) => Q)[] = [
  (r) => {
    const d = int(r, 2, 12) * 10, t = [2, 4, 5][int(r, 0, 2)]!;
    return mc(
      `Un ciclista recorre ${d} km en ${t} horas a ritmo constante. ¿Cuál es su rapidez?`,
      `${fmt(d / t)} km/h`,
      [`${d * t} km/h`, `${d + t} km/h`, `${fmt(d / t / 2)} km/h`],
      `Rapidez = distancia ÷ tiempo = ${d} ÷ ${t} = ${fmt(d / t)} km/h.`,
      "MEP · Ciencias: fuerza y movimiento",
      2,
    );
  },
  (r) => {
    const c = int(r, 5, 95);
    return mc(
      `Un termómetro marca ${c} °C. Al nivel del mar, el agua hierve a 100 °C. ¿Cuántos grados faltan para que hierva?`,
      `${100 - c} °C`,
      [`${100 + c} °C`, `${c} °C`, `${Math.abs(c - 50)} °C`],
      `100 − ${c} = ${100 - c} °C.`,
      "MEP · Ciencias: materia y energía",
      1,
    );
  },
];
const SCIENCE_FIXED: Q[] = [
  mc("¿Qué órgano bombea la sangre por el cuerpo?", "El corazón", ["Los pulmones", "El hígado", "El estómago"], "El corazón impulsa la sangre por arterias y venas (sistema circulatorio).", "MEP · Cuerpo humano", 1),
  mc("¿Qué proceso realizan las plantas para producir su alimento usando la luz solar?", "Fotosíntesis", ["Respiración", "Digestión", "Evaporación"], "En la fotosíntesis la planta usa luz, agua y dióxido de carbono para producir glucosa y oxígeno.", "MEP · Seres vivos", 1),
  mc("El paso del agua de líquido a gas se llama:", "Evaporación", ["Condensación", "Solidificación", "Fusión"], "Evaporar es pasar de líquido a gas; condensar es lo inverso.", "MEP · Estados de la materia", 1),
  mc("En una cadena alimentaria, el organismo que produce su propio alimento es:", "El productor", ["El consumidor primario", "El descomponedor", "El depredador"], "Las plantas son productoras: inician la cadena con energía del Sol.", "MEP · Ecosistemas", 2),
  mc("¿Cuál planeta es el más cercano al Sol?", "Mercurio", ["Venus", "Tierra", "Marte"], "El orden desde el Sol es Mercurio, Venus, Tierra, Marte…", "MEP · Sistema solar", 1),
  mc("Un material que permite el paso de la corriente eléctrica es:", "Conductor, como el cobre", ["Aislante, como el plástico", "Aislante, como la madera seca", "Aislante, como el vidrio"], "Los metales como el cobre conducen la electricidad; plástico, madera seca y vidrio la bloquean.", "MEP · Energía eléctrica", 2),
  mc("¿Qué gas necesitamos respirar para vivir?", "Oxígeno", ["Dióxido de carbono", "Nitrógeno puro", "Helio"], "Las células usan oxígeno para obtener energía de los alimentos.", "MEP · Cuerpo humano", 1),
  mc("Una acción que reduce la contaminación de ríos es:", "No botar basura ni aceite en desagües", ["Quemar plásticos", "Lavar el carro junto al río", "Usar más detergente"], "El aceite y la basura en desagües llegan a los ríos y dañan los ecosistemas.", "MEP · Ambiente", 2),
  mc("Costa Rica genera la mayor parte de su electricidad con fuentes:", "Renovables, sobre todo hidroeléctricas", ["De carbón", "Nucleares", "De petróleo en su mayoría"], "La mayor parte proviene de fuentes renovables, principalmente agua, además de geotermia y viento.", "ICE · Generación eléctrica", 3),
];
const SPANISH: Q[] = [
  mc("¿Cuál palabra es aguda?", "canción", ["árbol", "lápiz", "música"], "Can-CIÓN: fuerza en la última sílaba.", "RAE · Ortografía", 1),
  mc("¿Cuál palabra es esdrújula?", "teléfono", ["camión", "fácil", "reloj"], "Te-LÉ-fo-no: fuerza en la antepenúltima; las esdrújulas siempre llevan tilde.", "RAE · Ortografía", 1),
  mc("¿Cuál palabra es grave o llana?", "lápiz", ["café", "corazón", "pájaro"], "LÁ-piz: fuerza en la penúltima; lleva tilde porque no termina en n, s ni vocal.", "RAE · Ortografía", 2),
  mc("Escritura correcta:", "estuve", ["estube", "hestuve", "estuvé"], "Los pretéritos de estar, andar y tener se escriben con v: estuve, anduve, tuve.", "RAE · Ortografía", 2),
  mc("En «Los estudiantes de sexto resolvieron la práctica», el sujeto es:", "Los estudiantes de sexto", ["la práctica", "resolvieron", "de sexto"], "El sujeto concuerda con el verbo: ellos resolvieron.", "RAE · Gramática", 2),
  mc("En «El perro grande ladra», la palabra «grande» es un:", "Adjetivo", ["Sustantivo", "Verbo", "Adverbio"], "El adjetivo describe al sustantivo (perro).", "RAE · Gramática", 1),
  mc("Sinónimo de «alegre»:", "contento", ["triste", "cansado", "enojado"], "Sinónimo: palabra de significado igual o parecido.", "RAE · Vocabulario", 1),
  mc("Antónimo de «generoso»:", "tacaño", ["amable", "dadivoso", "bondadoso"], "Antónimo: significado opuesto. Dadivoso es sinónimo.", "RAE · Vocabulario", 2),
  mc("Autora de «Cuentos de mi tía Panchita»:", "Carmen Lyra", ["Yolanda Oreamuno", "Eunice Odio", "Carmen Naranjo"], "Carmen Lyra (María Isabel Carvajal) publicó la obra en 1920.", "Literatura costarricense", 2),
  mc("¿En cuál palabra hay hiato?", "país", ["cielo", "causa", "huevo"], "Pa-ís: la vocal cerrada tónica con tilde forma sílaba aparte.", "RAE · Ortografía", 3),
  mc("La expresión «llueve a cántaros» es un ejemplo de:", "Hipérbole (exageración)", ["Pregunta retórica", "Rima", "Onomatopeya"], "Exagera la cantidad de lluvia para dar fuerza a la idea.", "MEP · Figuras literarias", 3),
  mc("¿Qué signo cierra una pregunta en español?", "?", ["¡", "¿", ";"], "En español la pregunta se abre con ¿ y se cierra con ?.", "RAE · Puntuación", 1),
];
const SOCIAL: Q[] = [
  mc("¿Cuántas provincias tiene Costa Rica?", "7", ["5", "6", "8"], "San José, Alajuela, Cartago, Heredia, Guanacaste, Puntarenas y Limón.", "IGN", 1),
  mc("Capital de la provincia de Guanacaste:", "Liberia", ["Nicoya", "Santa Cruz", "Cañas"], "Liberia es la cabecera provincial de Guanacaste.", "IGN", 1),
  mc("Fecha de la Anexión del Partido de Nicoya:", "25 de julio de 1824", ["15 de setiembre de 1821", "11 de abril de 1856", "1 de diciembre de 1948"], "El Partido de Nicoya se unió a Costa Rica el 25 de julio de 1824.", "Historia de CR · MEP", 2),
  mc("Fecha de la independencia de Centroamérica:", "15 de setiembre de 1821", ["25 de julio de 1824", "11 de abril de 1856", "12 de octubre de 1492"], "El Acta de Independencia se firmó en Guatemala el 15 de setiembre de 1821.", "MEP", 1),
  mc("Héroe nacional de la Batalla de Rivas (1856):", "Juan Santamaría", ["Juanito Mora", "Braulio Carrillo", "José María Cañas"], "Juan Santamaría incendió el mesón el 11 de abril de 1856.", "Historia de CR", 1),
  mc("Año de la abolición del ejército en Costa Rica:", "1948", ["1821", "1856", "1970"], "José Figueres lo abolió el 1 de diciembre de 1948; la Constitución de 1949 lo ratificó.", "Constitución Política, art. 12", 2),
  mc("Los tres poderes de la República son:", "Ejecutivo, Legislativo y Judicial", ["Ejecutivo, Electoral y Municipal", "Legislativo, Militar y Judicial", "Presidencial, Ministerial y Judicial"], "La Constitución establece esos tres poderes; el TSE tiene rango de poder en lo electoral.", "Constitución Política, art. 9", 2),
  mc("¿Cuál océano baña la costa de Limón?", "Mar Caribe (océano Atlántico)", ["Océano Pacífico", "Océano Índico", "Golfo de Nicoya"], "Limón está en la costa del Caribe; Puntarenas y Guanacaste en el Pacífico.", "IGN", 1),
  mc("Primer jefe de Estado de Costa Rica (1824):", "Juan Mora Fernández", ["Braulio Carrillo", "Juan Rafael Mora Porras", "José María Castro Madriz"], "Juan Mora Fernández asumió en 1824.", "Historia de CR · MEP", 3),
  mc("La Batalla de Santa Rosa (1856) ocurrió en la provincia de:", "Guanacaste", ["Alajuela", "Limón", "Cartago"], "Fue el 20 de marzo de 1856 en la hacienda Santa Rosa, Guanacaste.", "Historia de CR · MEP", 2),
  mc("Las Garantías Sociales (1943) se impulsaron durante el gobierno de:", "Rafael Ángel Calderón Guardia", ["José Figueres Ferrer", "Ricardo Jiménez", "Óscar Arias"], "Calderón Guardia impulsó las Garantías Sociales y la CCSS.", "Historia de CR · MEP", 3),
  mc("¿Qué institución organiza las elecciones en Costa Rica?", "El Tribunal Supremo de Elecciones", ["La Asamblea Legislativa", "La Sala Constitucional", "El Ministerio de Educación"], "El TSE organiza, dirige y vigila los procesos electorales.", "Constitución Política, art. 99", 2),
];

function shuffleWith<T>(r: R, a: T[]) {
  const c = [...a];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [c[i], c[j]] = [c[j]!, c[i]!];
  }
  return c;
}

export function grade6Deck(subject: Grade6Subject, version: number): Deck {
  const v = Math.max(0, Math.min(GRADE6_VERSIONS - 1, Math.floor(version)));
  const r = rng(v * 7919 + subject.length * 104729 + subject.charCodeAt(0));
  const meta = grade6Subjects.find((s) => s.id === subject)!;
  let questions: Q[];
  if (subject === "matematica") questions = shuffleWith(r, MATH).slice(0, 6).map((g) => g(r));
  else if (subject === "ciencias")
    questions = [...SCIENCE_PARAM.map((g) => g(r)), ...shuffleWith(r, SCIENCE_FIXED).slice(0, 4)];
  else questions = shuffleWith(r, subject === "espanol" ? SPANISH : SOCIAL).slice(0, 6);
  return {
    id: `g6-${subject}-v${v}`,
    title: `${meta.title} 6.º · versión ${v + 1}`,
    emoji: meta.emoji,
    level: "6.º primaria",
    questions,
  };
}

/** Simulacro 6.º: 12 preguntas, 3 por materia, misma semilla reproducible. */
export function grade6MixedDeck(version: number): Deck {
  const v = Math.max(0, Math.min(GRADE6_VERSIONS - 1, Math.floor(version)));
  const questions = grade6Subjects.flatMap((s) => grade6Deck(s.id, v).questions.slice(0, 3));
  return { id: `g6-mixto-v${v}`, title: `Simulacro 6.º grado · versión ${v + 1}`, emoji: "🎒", level: "6.º primaria", questions };
}

export function resolveGrade6Deck(id: string): Deck | undefined {
  const m = /^g6-(matematica|ciencias|espanol|sociales|mixto)-v(\d+)$/.exec(id);
  if (!m) return undefined;
  const v = Number(m[2]);
  if (v >= GRADE6_VERSIONS) return undefined;
  if (m[1] === "mixto") return grade6MixedDeck(v);
  return grade6Deck(m[1] as Grade6Subject, v);
}
