import type { Q } from '../questions';

/** Deterministic PRNG so a deck id with a seed always rebuilds the same items for server scoring. */
export type R = () => number;
export function rng(seed: number): R {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export const int = (r: R, a: number, b: number) => a + Math.floor(r() * (b - a + 1));
export const pick = <T>(r: R, xs: readonly T[]): T => xs[Math.floor(r() * xs.length)] as T;
export function shuffle<T>(r: R, xs: readonly T[]): T[] {
  const out = [...xs];
  for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); const a = out[i] as T; out[i] = out[j] as T; out[j] = a; }
  return out;
}
export const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

/** Spanish number format: decimal comma and space grouping from five digits (RAE). */
export function num(n: number, dec = 0) {
  const fixed = Math.abs(n).toFixed(dec);
  const [i = '0', d] = fixed.split('.');
  const grouped = i.length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : i;
  return `${n < 0 ? '−' : ''}${grouped}${d ? `,${d}` : ''}`;
}
/** Shortest faithful decimal (up to 3 places), so equal values never display differently. */
export function smart(n: number) {
  if (Number.isInteger(n)) return num(n);
  const places = Math.abs(n) < 1 ? 3 : Math.abs(n) < 100 ? 2 : 1;
  const r = Number(n.toFixed(places));
  const d = Math.min(places, (String(r).split('.')[1] ?? '').length);
  return num(r, d);
}
export const crc = (n: number) => `₡${num(Math.round(n))}`;
export const pct = (n: number, dec = 0) => `${num(n, dec)} %`;

export type Level = 1 | 2 | 3;
export type Item = { q: string; correct: string; wrong: string[]; why: string };
export type Generator = (r: R, level: Level) => Item;

/** Builds a 4-option item; distractors are de-duplicated and never equal the key. */
export function toQuestion(r: R, item: Item, level: Level, source: string): Q | null {
  const seen = new Set([item.correct]);
  const wrong: string[] = [];
  for (const w of item.wrong) { if (!seen.has(w)) { seen.add(w); wrong.push(w); } if (wrong.length === 3) break; }
  if (wrong.length < 3) return null;
  const options = shuffle(r, [item.correct, ...wrong]);
  return { q: item.q, options, answer: options.indexOf(item.correct), why: item.why, source, difficulty: level };
}
/** Numeric distractors near the key (common slips: ±1 step, ×10, swapped operation). */
export function near(r: R, value: number, fmt: (n: number) => string, extra: number[] = [], step = 1): string[] {
  const pool = [...extra, value + step, value - step, value + 2 * step, value - 2 * step, value * 10, Math.round(value / 10), value + int(r, 3, 9) * step];
  return shuffle(r, pool.filter(v => v !== value && Number.isFinite(v) && v >= 0)).map(x => fmt(x));
}
