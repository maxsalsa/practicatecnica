import subjects from './grade6-catalog.json';
import type { Deck } from './questions';
export const GRADE6_VERSIONS = 500;
export const grade6Subjects = subjects;
export type Grade6Subject = 'matematica' | 'ciencias' | 'espanol' | 'sociales';
export function grade6Deck(subject: string, version: number): Deck {
  const meta = subjects.find(s => s.id === subject);
  if (!meta) throw new Error('Materia no disponible.');
  return { id: `g6-${subject}-v${version}`, title: `${meta.title} 6.º · versión ${version + 1}`, emoji: meta.emoji, level: '6.º primaria', questions: [], questionCount: 6 };
}
export function grade6MixedDeck(version: number): Deck {
  return { id: `g6-mixto-v${version}`, title: `Simulacro 6.º · versión ${version+1}`, emoji: '🎒', level: '6.º primaria', questions: [], questionCount: 12 };
}