import { describe, it, expect } from 'vitest';
import { apportion, buildSpecTable } from './spec-table';
const split = { conocimiento: 1, aplicacion: 1, razonamiento: 1 };
describe('tabla de especificaciones', () => {
  it('peso proporcional a lecciones: 2 y 6 lecciones de 40 puntos dan 10 y 30', () => {
    expect(buildSpecTable([{ indicator: 'A', lessons: 2, split }, { indicator: 'B', lessons: 6, split }], 40).map(r => r.points)).toEqual([10, 30]);
  });
  it('la suma siempre iguala el total de puntos', () => {
    expect(apportion([1, 1, 1], 10).reduce((a, b) => a + b, 0)).toBe(10);
  });
  it('reparte por nivel según la proporción indicada', () => {
    expect(buildSpecTable([{ indicator: 'A', lessons: 1, split: { conocimiento: 1, aplicacion: 2, razonamiento: 1 } }], 20)[0]?.byLevel).toEqual({ conocimiento: 5, aplicacion: 10, razonamiento: 5 });
  });
});
