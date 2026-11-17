import type { InstitutionKind } from './institutions';

export const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'] as const;
const DAY_KEYS = ['L', 'K', 'M', 'J', 'V'];
/** Lecciones diarias típicas por tipo de institución (editables por la institución). */
export const PERIODS_BY_KIND: Record<InstitutionKind, number> = { preescolar: 5, escuela: 7, academico: 8, ctp: 10, universidad: 6 };

export type Load = { group: string; subject: string; teacher: string; lessons: number };
export type Cell = { subject: string; teacher: string; room?: string; startTime?: string; endTime?: string } | null;
export type ScheduleOption = { grid: Record<string, Cell[][]>; unplaced: Load[]; score: number };

/** "Grupo | Materia | Docente | lecciones" por línea. */
export function parseLoads(text: string): Load[] {
  return text.split('\n').map((l) => l.split('|').map((s) => s.trim())).filter((p) => p.length >= 4 && p[0] && p[1] && p[2])
    .map(([group = '', subject = '', teacher = '', n]) => ({ group, subject, teacher, lessons: Math.max(0, Math.min(40, Number(n) || 0)) }));
}
/** "Docente | L,K" por línea: días libres (L, K=martes, M, J, V). */
export function parseDaysOff(text: string): Record<string, number[]> {
  const out: Record<string, number[]> = {};
  for (const l of text.split('\n')) {
    const [t, d] = l.split('|').map((s) => s?.trim());
    if (t && d) out[t] = d.toUpperCase().split(/[ ,]+/).map((k) => DAY_KEYS.indexOf(k)).filter((i) => i >= 0);
  }
  return out;
}

function rng(seed: number) { return () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 2 ** 32; }; }

export function generateSchedule(loads: Load[], periods: number, daysOff: Record<string, number[]>, seed: number, maxDaily = periods): ScheduleOption {
  const r = rng(seed);
  const grid: Record<string, Cell[][]> = {};
  const busy = new Set<string>();
  const daily: Record<string, number> = {};
  for (const l of loads) grid[l.group] ??= DAYS.map(() => Array<Cell>(periods).fill(null));
  const units = loads.flatMap((l) => Array.from({ length: l.lessons }, () => l));
  units.sort((a, b) => (daysOff[b.teacher]?.length ?? 0) - (daysOff[a.teacher]?.length ?? 0) || r() - 0.5);
  const unplaced: Load[] = [];
  for (const u of units) {
    const slots: [number, number][] = [];
    for (let d = 0; d < DAYS.length; d++) for (let p = 0; p < periods; p++) slots.push([d, p]);
    slots.sort(() => r() - 0.5);
    let best: [number, number] | null = null; let bestCost = Infinity;
    for (const [d, p] of slots) {
      if (grid[u.group]![d]![p] || busy.has(`${u.teacher}|${d}|${p}`) || daysOff[u.teacher]?.includes(d)) continue;
      if ((daily[`${u.teacher}|${d}`] ?? 0) >= maxDaily) continue;
      const same = grid[u.group]![d]!.filter((c) => c?.subject === u.subject).length;
      const row = grid[u.group]![d] as Cell[]; const near = row[p - 1]?.subject === u.subject || row[p + 1]?.subject === u.subject;
      const cost = same * 3 - (near ? 2 : 0) + p * 0.1; // bloques dobles sí, más de 2 al día no
      if (same >= 3) continue;
      if (cost < bestCost) { bestCost = cost; best = [d, p]; }
    }
    if (!best) { unplaced.push(u); continue; }
    const [d, p] = best;
    (grid[u.group]![d] as Cell[])[p] = { subject: u.subject, teacher: u.teacher };
    busy.add(`${u.teacher}|${d}|${p}`);
    daily[`${u.teacher}|${d}`] = (daily[`${u.teacher}|${d}`] ?? 0) + 1;
  }
  let gaps = 0;
  for (const g of Object.values(grid)) for (const day of g) { const last = day.map((c) => !!c).lastIndexOf(true); gaps += day.slice(0, last).filter((c) => !c).length; }
  return { grid, unplaced, score: unplaced.length * 100 + gaps };
}

/** Varias opciones ordenadas de mejor a peor. */
export function scheduleOptions(loads: Load[], periods: number, daysOff: Record<string, number[]>, count = 3, maxDaily = periods): ScheduleOption[] {
  return Array.from({ length: count * 4 }, (_, i) => generateSchedule(loads, periods, daysOff, i * 7919 + 17, maxDaily))
    .sort((a, b) => a.score - b.score).slice(0, count);
}
