import type { Deck } from "./questions";
import mat07 from "./mat07-lote01.json";
import mat08 from "./mat08-lote01.json";

type Item = { q: string; options: string[]; answer: number; why: string; source: string; dificultad: 1 | 2 | 3 };

export const loteDecks: Deck[] = [
  {
    id: "lote-mat-07-01",
    title: "Matemática 7.º · Lote 1",
    emoji: "➗",
    level: "7.º",
    questions: (mat07 as Item[]).map((x) => ({ q: x.q, options: x.options, answer: x.answer, why: x.why, source: x.source, difficulty: x.dificultad })),
  },
  {
    id: "lote-mat-08-01",
    title: "Matemática 8.º · Lote 1",
    emoji: "📐",
    level: "8.º",
    questions: (mat08 as Item[]).map((x) => ({ q: x.q, options: x.options, answer: x.answer, why: x.why, source: x.source, difficulty: x.dificultad })),
  },
];

const TEMAS: { unidad: string; emoji: string }[] = [
  { unidad: "Números enteros", emoji: "➖" },
  { unidad: "Divisibilidad", emoji: "🚌" },
  { unidad: "Proporcionalidad", emoji: "🏷️" },
  { unidad: "Álgebra inicial", emoji: "🔤" },
];
export const mat07TopicDecks: Deck[] = TEMAS.map((t, k) => ({
  id: `lote-mat-07-01-t${k + 1}`,
  title: `Matemática 7.º · ${t.unidad}`,
  emoji: t.emoji,
  level: "7.º",
  questions: (mat07 as (Item & { unidad: string })[]).filter((x) => x.unidad === t.unidad).map((x) => ({ q: x.q, options: x.options, answer: x.answer, why: x.why, source: x.source, difficulty: x.dificultad })),
}));
