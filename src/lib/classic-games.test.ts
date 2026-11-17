import { describe, it, expect } from 'vitest';
import { tttWinner, tttBestMove, c4Empty, c4Drop, c4Winner, c4AiMove, handTotal, sevenResult, mysteryHint, type Cell } from './classic-games';
describe('juegos clásicos', () => {
  it('gato: la PC bloquea la línea del jugador', () => { const b: Cell[] = ['X','X','','','O','','','','']; expect(tttBestMove(b)).toBe(2); expect(tttWinner(['X','X','X','','','','','',''])).toBe('X'); });
  it('cuatro en línea: detecta cuatro horizontales y la PC gana si puede', () => { let g = c4Empty(); for (const c of [0,1,2]) g = c4Drop(g, c, 2)!; expect(c4AiMove(g)).toBe(3); g = c4Drop(g, 3, 2)!; expect(c4Winner(g)).toBe(2); });
  it('siete y media: figuras valen media y pasarse pierde', () => { expect(handTotal([7, 12])).toBe(7.5); expect(sevenResult(8, 5)).toBe('pierde'); expect(sevenResult(6, 8)).toBe('gana'); expect(sevenResult(5, 5)).toBe('empate'); });
  it('misterio: cuenta aciertos de persona, lugar y objeto', () => { expect(mysteryHint({ s: 1, r: 2, i: 3 }, { s: 1, r: 0, i: 3 })).toBe(2); });
});
