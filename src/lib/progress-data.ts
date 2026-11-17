import {splitQuestionForm} from './question-forms';
export type Attempt = {
  id: string;
  deck_id: string;
  title: string;
  score: number;
  question_count: number;
  created_at: string;
  verified_scoring: boolean;
  assessment_mode?: string;
  institution_subject?: string;
  certification_subject?: string | null;
  earned_points?: number;
  points_version?: number;
};
export type Stat = {
  title: string;
  attempts: number;
  best: number;
  last: number;
  history: number[];
};
export function costaRicaDay(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Costa_Rica",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}
export function aggregateAttempts(rows: Attempt[], now = new Date()) {
  const stats: Record<string, Stat> = {};
  const days = new Set<string>();
  let xp = 0;
  for (const r of [...rows].sort((a, b) => a.created_at.localeCompare(b.created_at))) {
    const baseId=splitQuestionForm(r.deck_id).baseId;
    const s = stats[baseId] ?? { title: r.title, attempts: 0, best: 0, last: 0, history: [] };
    s.attempts++;
    s.best = Math.max(s.best, r.score);
    s.last = r.score;
    s.history = [...s.history, r.score].slice(-10);
    stats[baseId] = s;
    const day = costaRicaDay(new Date(r.created_at));
    if (r.question_count > 0 && (r.points_version !== 1 || r.verified_scoring)) days.add(day);
    if (day === costaRicaDay(now)) xp += r.earned_points ?? 0;
  }
  let count = 0;
  let cursor = new Date(now);
  if (!days.has(costaRicaDay(cursor))) cursor = new Date(cursor.getTime() - 86400000);
  while (days.has(costaRicaDay(cursor))) {
    count++;
    cursor = new Date(cursor.getTime() - 86400000);
  }
  return {
    stats,
    streak: { count, xp, xpDay: costaRicaDay(now) },
    points: rows.reduce((sum, r) => sum + (r.earned_points ?? 0), 0),
  };
}
export function exercisePoints(q: { difficulty?: 1 | 2 | 3 }) {
  return (q.difficulty ?? 1) * 10;
}
export function earnedPoints(
  questions: { answer: number; difficulty?: 1 | 2 | 3 }[],
  answers: { index: number; pick: number }[],
) {
  scoreAnswers(questions, answers);
  return answers.reduce((sum, a) => {
    const q = questions[a.index];
    return sum + (q && q.answer === a.pick ? exercisePoints(q) : 0);
  }, 0);
}
export function scoreAnswers(
  questions: { answer: number }[],
  answers: { index: number; pick: number }[],
) {
  if (
    !answers.length ||
    new Set(answers.map((a) => a.index)).size !== answers.length ||
    answers.some(
      (a) => !questions[a.index] || !Number.isInteger(a.pick) || a.pick < 0 || a.pick > 3,
    )
  )
    throw new Error("Respuestas inválidas.");
  return Math.round(
    (100 * answers.filter((a) => questions[a.index]?.answer === a.pick).length) / answers.length,
  );
}
