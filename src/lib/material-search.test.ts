import { describe, expect, it } from 'vitest';
import { findSpecialties } from './material-search';
describe('requested specialty discovery', () => {
  it('finds Accounting', () => expect(findSpecialties('accounting').map(x => x.code)).toContain('3001'));
  it('finds Agroecología without accents', () => expect(findSpecialties('agroecologia').map(x => x.code)).toContain('1001'));
  it('finds both Agroindustria branches', () => expect(findSpecialties('agroindustria').map(x => x.code)).toEqual(['1003', '1004']));
  it('finds Banca y Finanzas by the requested name', () => expect(findSpecialties('banquifinanzas').map(x => x.code)).toEqual(['3004']));
  it('finds Contabilidad de Costos', () => expect(findSpecialties('contabilidad de costos').map(x => x.code)).toEqual(['3013']));
});
