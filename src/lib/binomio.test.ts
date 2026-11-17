import { describe, it, expect } from 'vitest';
import { buildBinomio, BLOOM } from './binomio';
describe('binomio docente–estudiante', () => {
  const m = buildBinomio('Fracciones', 'Resolver problemas con fracciones.', '1/2 + 1/4', 1);
  it('cinco momentos, cada uno con docente y estudiante', () => { expect(m).toHaveLength(5); m.forEach(x => { expect(x.docente).toMatch(/^La persona docente .+ mediante /); expect(x.estudiante).toMatch(/^La persona estudiante /); }); });
  it('usa un verbo de Bloom del nivel indicado', () => { m.forEach(x => expect(BLOOM[x.nivel].some(v => x.estudiante.includes(v))).toBe(true)); });
});
