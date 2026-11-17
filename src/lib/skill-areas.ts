import {splitQuestionForm} from './question-forms';
import type { Attempt } from './progress-data';
export const skillAreas = [
  { id: 'mopt-carro', title: 'MOPT · Carro', icon: 'car' },
  { id: 'mopt-moto', title: 'MOPT · Moto', icon: 'bike' },
  { id: 'web', title: 'Desarrollo web', icon: 'code' },
  { id: 'ciberseguridad', title: 'Ciberseguridad', icon: 'shield' },
  { id: 'ciudadania', title: 'Ciudadanía', icon: 'users' },
  { id: 'ciencias', title: 'Ciencias', icon: 'flask' },
  { id: 'deportes', title: 'Deportes', icon: 'trophy' },
  { id: 'artes', title: 'Artes', icon: 'palette' },
  { id: 'ucr', title: 'Admisión UCR', icon: 'graduation' },
  { id: 'tec', title: 'Admisión TEC', icon: 'graduation' },
  { id: 'cientificos', title: 'Colegios científicos', icon: 'atom' },
  { id: 'agilidad', title: 'Agilidad mental', icon: 'brain' },
] as const;
export type SkillAreaId = typeof skillAreas[number]['id'];
const decks: Record<string, SkillAreaId> = {
  'mopt-carro': 'mopt-carro', 'mopt-moto': 'mopt-moto',
  'ctp-web': 'web', 'ctp-ciber': 'ciberseguridad', civica: 'ciudadania',
  'school-biologia': 'ciencias', 'school-quimica': 'ciencias', 'school-fisica': 'ciencias',
  'mopt-agilidad': 'agilidad', 'agilidad-mental': 'agilidad',
  'admision-ucr': 'ucr', 'admision-tec': 'tec', 'colegios-cientificos': 'cientificos',
};
export function deckArea(id: string): SkillAreaId | undefined {
  const deckId=splitQuestionForm(id).baseId;
  return decks[deckId] ?? (deckId.startsWith('topic-') ? decks[deckId.replace(/^topic-/, '').split('-grade-')[0] ?? ''] : undefined);
}
export function areaResults(rows: Attempt[]) {
  return skillAreas.map(area => {
    const attempts = rows.filter(r => r.verified_scoring && r.question_count > 0 && deckArea(r.deck_id) === area.id)
      .sort((a, b) => a.created_at.localeCompare(b.created_at));
    return { ...area, attempts: attempts.length, last: attempts.at(-1)?.score, best: attempts.length ? Math.max(...attempts.map(a => a.score)) : undefined };
  });
}