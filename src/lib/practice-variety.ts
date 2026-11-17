/** Prefer unseen canonical indices; only recycle after exhausting the local bank. */
export function variedIndices(length: number, count: number, seen: number[], random = Math.random): number[] {
  const used = new Set(seen);
  const mix = (items: number[]) => {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      const a = items[i], b = items[j];
      if (a !== undefined && b !== undefined) { items[i] = b; items[j] = a; }
    }
    return items;
  };
  const all = Array.from({ length }, (_, i) => i);
  return [...mix(all.filter(i => !used.has(i))), ...mix(all.filter(i => used.has(i)))].slice(0, count);
}
export function readSeen(key: string): number[] {
  try { const value: unknown = JSON.parse(localStorage.getItem(key) ?? '[]'); return Array.isArray(value) ? value.filter((v): v is number => Number.isInteger(v) && v >= 0) : []; } catch { return []; }
}
export function rememberSeen(key: string, index: number, length: number) {
  try { const prior = readSeen(key); localStorage.setItem(key, JSON.stringify([...prior.filter(i => i !== index && i < length), index].slice(-length))); } catch { /* Storage is optional. */ }
}