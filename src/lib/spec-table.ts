export type SpecLevel = 'conocimiento' | 'aplicacion' | 'razonamiento';
export const SPEC_LEVELS: SpecLevel[] = ['conocimiento', 'aplicacion', 'razonamiento'];
export const SPEC_LEVEL_LABELS: Record<SpecLevel, string> = { conocimiento: 'Conocimiento', aplicacion: 'Aplicación', razonamiento: 'Razonamiento' };
export type SpecRow = { indicator: string; lessons: number; split: Record<SpecLevel, number> };
export type SpecResult = { points: number; byLevel: Record<SpecLevel, number> }[];

/** Reparte enteros proporcionales a los pesos y conserva el total (resto mayor). */
export function apportion(weights: number[], total: number): number[] {
  const sum = weights.reduce((a, b) => a + b, 0);
  if (sum <= 0 || total <= 0) return weights.map(() => 0);
  const raw = weights.map(w => (w / sum) * total);
  const out = raw.map(Math.floor);
  let left = total - out.reduce((a, b) => a + b, 0);
  raw.map((r, i) => [r - Math.floor(r), i] as const).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (left > 0) { out[i] = (out[i] ?? 0) + 1; left--; } });
  return out;
}

/** Puntos por indicador = lecciones ÷ lecciones totales × puntos totales; luego se reparte por nivel. */
export function buildSpecTable(rows: SpecRow[], totalPoints: number): SpecResult {
  const pts = apportion(rows.map(r => Math.max(0, r.lessons)), totalPoints);
  return rows.map((r, i) => {
    const p = pts[i] ?? 0;
    const lv = apportion(SPEC_LEVELS.map(l => Math.max(0, r.split[l])), p);
    return { points: p, byLevel: { conocimiento: lv[0] ?? 0, aplicacion: lv[1] ?? 0, razonamiento: lv[2] ?? 0 } };
  });
}
