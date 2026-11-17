import { expect, it } from 'vitest';
import { code128B } from './code128';
it('Code128B: cada símbolo mide 11 módulos y la parada 13', () => {
  expect(code128B('AB').reduce((a, b) => a + b, 0)).toBe(11 * 4 + 13);
  expect(code128B('A').slice(0, 6)).toEqual([2, 1, 1, 2, 1, 4]);
});
