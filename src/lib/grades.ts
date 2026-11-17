import { officialGradeWeights } from './rea-weights';
export const GRADE_KINDS = ["cotidiano", "tarea", "proyecto", "examen", "asistencia"] as const;
export type GradeRow = { subject: string; level?: string; kind: string; score: number; weight: number };
const r = (n: number) => Math.round(n * 100) / 100;
/** Nota por materia: promedio de cada rubro × su porcentaje (el último porcentaje registrado del rubro).
 * Los porcentajes los define el docente según el reglamento vigente; si no suman 100 se avisa. */
export function gradeAverages(rows: GradeRow[]) {
  const subjects = new Map<string, Map<string, { scores: number[]; weight: number }>>();
  for (const x of rows) {
    const subjectKey = x.level ? `${x.subject} · ${x.level}` : x.subject;
    const official = x.level ? officialGradeWeights(x.subject, x.level) : null;
    const s = subjects.get(subjectKey) ?? new Map(); subjects.set(subjectKey, s);
    const k = s.get(x.kind) ?? { scores: [], weight: official?.weights[x.kind] ?? x.weight }; k.scores.push(x.score); s.set(x.kind, k);
  }
  const bySubject = [...subjects].map(([subject, kinds]) => {
    const parts = [...kinds].map(([kind, k]) => ({ kind, weight: k.weight, avg: r(k.scores.reduce((a, b) => a + b, 0) / k.scores.length) }));
    const totalWeight = r(parts.reduce((a, p) => a + p.weight, 0));
    const grade = r(parts.reduce((a, p) => a + p.avg * p.weight / 100, 0));
    return { subject, parts, totalWeight, grade, complete: totalWeight === 100 };
  });
  return { bySubject };
}
