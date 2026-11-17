import { describe, expect, it } from 'vitest';
import { parseDaysOff, parseLoads, scheduleOptions } from './schedule';

describe('generador de horarios', () => {
  const loads = parseLoads('7-1 | Matemática | Ana | 5\n7-2 | Matemática | Ana | 5\n7-1 | Español | Luis | 5\n7-2 | Español | Luis | 5');
  const off = parseDaysOff('Ana | V');
  const best = scheduleOptions(loads, 8, off)[0]!;
  it('coloca todas las lecciones', () => expect(best.unplaced).toHaveLength(0));
  it('respeta el día libre del docente', () => {
    for (const g of Object.values(best.grid)) expect(g[4]!.some((c) => c?.teacher === 'Ana')).toBe(false);
  });
  it('un docente nunca está en dos grupos a la vez', () => {
    for (let d = 0; d < 5; d++) for (let p = 0; p < 8; p++) {
      const ts = Object.values(best.grid).map((g) => g[d]![p]?.teacher).filter(Boolean);
      expect(new Set(ts).size).toBe(ts.length);
    }
  });
});
