// Pure logic for classic recreational games (no academic scoring).
export type Cell = '' | 'X' | 'O';
export const LINES: [number, number, number][] = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
export function tttWinner(b: Cell[]): Cell { for (const [a,c,d] of LINES) if (b[a] && b[a]===b[c] && b[a]===b[d]) return b[a]!; return ''; }
export function tttBestMove(b: Cell[], me: Cell = 'O'): number {
  const op: Cell = me === 'O' ? 'X' : 'O';
  const score = (s: Cell[], turn: Cell, depth: number): number => {
    const w = tttWinner(s); if (w === me) return 10 - depth; if (w === op) return depth - 10; if (s.every(Boolean)) return 0;
    let best = turn === me ? -99 : 99;
    s.forEach((v, i) => { if (v) return; const n = [...s]; n[i] = turn; const r = score(n, turn === me ? op : me, depth + 1); best = turn === me ? Math.max(best, r) : Math.min(best, r); });
    return best;
  };
  let move = -1, best = -99;
  b.forEach((v, i) => { if (v) return; const n = [...b]; n[i] = me; const r = score(n, op, 1); if (r > best) { best = r; move = i; } });
  return move;
}
// Cuatro en línea: 7 columns x 6 rows, row 0 = top
export const C4_COLS = 7, C4_ROWS = 6;
export const c4Empty = () => Array.from({ length: C4_ROWS }, () => Array<number>(C4_COLS).fill(0));
export function c4Drop(g: number[][], col: number, p: number): number[][] | null {
  for (let r = C4_ROWS - 1; r >= 0; r--) if (!g[r]![col]) { const n = g.map(x => [...x]); n[r]![col] = p; return n; }
  return null;
}
export function c4Winner(g: number[][]): number {
  const dirs = [[0,1],[1,0],[1,1],[1,-1]];
  for (let r = 0; r < C4_ROWS; r++) for (let c = 0; c < C4_COLS; c++) { const p = g[r]![c]; if (!p) continue;
    for (const [dr, dc] of dirs) { let k = 1; while (k < 4 && g[r + dr! * k]?.[c + dc! * k] === p) k++; if (k === 4) return p; } }
  return 0;
}
export function c4AiMove(g: number[][]): number {
  const open = [...Array(C4_COLS).keys()].filter(c => !g[0]![c]);
  for (const p of [2, 1]) for (const c of open) { const n = c4Drop(g, c, p); if (n && c4Winner(n) === p) return c; }
  const pref = [3, 2, 4, 1, 5, 0, 6].filter(c => open.includes(c));
  return pref[0] ?? -1;
}
// Siete y media: cartas 1-7 valen su número; sota, caballo y rey (10,11,12) valen 0,5
export const cardValue = (n: number) => (n >= 10 ? 0.5 : n);
export const handTotal = (h: number[]) => h.reduce((s, n) => s + cardValue(n), 0);
export const newDeck = () => [1,2,3,4,5,6,7,10,11,12].flatMap(n => [n, n, n, n]);
export function shuffle<T>(a: T[], rnd = Math.random): T[] { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [r[i], r[j]] = [r[j]!, r[i]!]; } return r; }
export function sevenResult(player: number, bank: number): 'gana' | 'pierde' | 'empate' {
  if (player > 7.5) return 'pierde'; if (bank > 7.5) return 'gana'; if (player > bank) return 'gana'; if (player < bank) return 'pierde'; return 'empate';
}
// Misterio del colegio (tipo deducción): persona + lugar + objeto, sin violencia
export const SUSPECTS = ['Profe Ana', 'Conserje Luis', 'Bibliotecaria Rosa', 'Estudiante Diego'];
export const ROOMS = ['Biblioteca', 'Laboratorio', 'Comedor', 'Gimnasio'];
export const ITEMS = ['Llave del aula', 'Calculadora', 'Balón', 'Microscopio'];
export type Guess = { s: number; r: number; i: number };
export function mysteryHint(secret: Guess, g: Guess): number { return (secret.s === g.s ? 1 : 0) + (secret.r === g.r ? 1 : 0) + (secret.i === g.i ? 1 : 0); }
