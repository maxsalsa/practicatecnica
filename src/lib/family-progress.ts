import { aggregateAttempts, costaRicaDay, type Attempt } from './progress-data';
import { GENERATED_FAMILIES } from './generated-catalog';
import { deckArea, skillAreas } from './skill-areas';
import { splitQuestionForm } from './question-forms';

export type Band = 'Dominado' | 'En proceso' | 'Requiere reforzamiento';
export const bandOf = (score: number): Band => (score >= 80 ? 'Dominado' : score >= 50 ? 'En proceso' : 'Requiere reforzamiento');
export const MODE_LABELS: Record<string, string> = { exam: 'Simulacro', practice: 'Práctica', guided: 'Práctica guiada' };

/** Groups attempts by subject: generated families ignore their seed, other decks use their canonical area or base deck. */
export function subjectOf(a: Pick<Attempt, 'deck_id' | 'title'>) {
  const gen = /^gen-([a-z]+)/.exec(a.deck_id);
  if (gen) { const f = GENERATED_FAMILIES.find(x => x.key === gen[1]); if (f) return { key: `gen-${f.key}`, title: f.title }; }
  const area = deckArea(a.deck_id);
  if (area) return { key: `area-${area}`, title: skillAreas.find(x => x.id === area)!.title };
  const base = splitQuestionForm(a.deck_id).baseId;
  return { key: base, title: a.title };
}

export function summarizeFollowUp(rows: Attempt[], visitDays: string[], now = new Date()) {
  const verified = rows.filter(r => r.verified_scoring && r.question_count > 0);
  const { streak, points } = aggregateAttempts(rows, now);
  const cutoff = costaRicaDay(new Date(now.getTime() - 29 * 86400000));
  const days = new Set([...visitDays, ...rows.map(r => costaRicaDay(new Date(r.created_at)))].filter(d => d >= cutoff && d <= costaRicaDay(now)));
  const groups = new Map<string, { title: string; attempts: number; last: number; best: number; lastAt: string }>();
  for (const r of [...verified].sort((a, b) => a.created_at.localeCompare(b.created_at))) {
    const s = subjectOf(r);
    const g = groups.get(s.key) ?? { title: s.title, attempts: 0, last: 0, best: 0, lastAt: r.created_at };
    g.attempts++; g.last = r.score; g.best = Math.max(g.best, r.score); g.lastAt = r.created_at;
    groups.set(s.key, g);
  }
  const subjects = [...groups.values()].map(g => ({ ...g, band: bandOf(g.last) })).sort((a, b) => b.lastAt.localeCompare(a.lastAt));
  const avg = verified.length ? Math.round(verified.reduce((n, r) => n + r.score, 0) / verified.length) : null;
  return {
    activeDays30: days.size,
    streak: streak.count,
    points,
    verifiedCount: verified.length,
    exams: verified.filter(r => r.assessment_mode === 'exam').length,
    average: avg,
    subjects,
    recent: [...verified].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 8),
    toReinforce: subjects.filter(s => s.band === 'Requiere reforzamiento').map(s => s.title),
  };
}
