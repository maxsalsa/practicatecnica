// 8x8 checkers: 1=red, 2=black, +2 = king (3 red king, 4 black king). Red moves up.
export type Board = number[];
export const start = (): Board => Array.from({ length: 64 }, (_, i) => { const r = Math.floor(i / 8), c = i % 8; if ((r + c) % 2 === 0) return 0; return r < 3 ? 2 : r > 4 ? 1 : 0; });
export const owner = (v: number) => (v === 1 || v === 3 ? 1 : v === 2 || v === 4 ? 2 : 0);
export type Move = { from: number; to: number; jump?: number };
export function movesFor(b: Board, i: number): Move[] {
  const v = b[i] ?? 0, p = owner(v); if (!p) return [];
  const king = v > 2, dirs = king ? [-1, 1] : p === 1 ? [-1] : [1];
  const r = Math.floor(i / 8), c = i % 8, out: Move[] = [];
  for (const dr of dirs) for (const dc of [-1, 1]) {
    const r1 = r + dr, c1 = c + dc; if (r1 < 0 || r1 > 7 || c1 < 0 || c1 > 7) continue;
    const t = r1 * 8 + c1;
    if (!b[t]) out.push({ from: i, to: t });
    else if (owner(b[t] ?? 0) !== p) { const r2 = r1 + dr, c2 = c1 + dc; if (r2 >= 0 && r2 < 8 && c2 >= 0 && c2 < 8 && !b[r2 * 8 + c2]) out.push({ from: i, to: r2 * 8 + c2, jump: t }); }
  }
  return out;
}
export function allMoves(b: Board, p: number): Move[] {
  const all = b.flatMap((v, i) => (owner(v) === p ? movesFor(b, i) : []));
  const jumps = all.filter(m => m.jump !== undefined);
  return jumps.length ? jumps : all; // capture is mandatory
}
export function apply(b: Board, m: Move): Board {
  const n = [...b]; let v = n[m.from] ?? 0; n[m.from] = 0; if (m.jump !== undefined) n[m.jump] = 0;
  const row = Math.floor(m.to / 8); if (v === 1 && row === 0) v = 3; if (v === 2 && row === 7) v = 4;
  n[m.to] = v; return n;
}
