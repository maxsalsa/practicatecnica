import catalog from './school-catalog.json';
import type { Deck } from './questions';
export const { schoolSubjects, schoolLevels } = catalog;
export function schoolDeck(subject: string, level: string, lang: 'es' | 'en'): Deck {
  const s = schoolSubjects.find(s => s.id === subject);
  if (!s) throw new Error('Materia no disponible.');
  return { id: `school-${s.id}`, title: lang === 'es' ? s.title : s.en, emoji: s.emoji, level, questions: [] };
}