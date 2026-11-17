import { describe, expect, it } from 'vitest';
import { sourcesForMaterial } from './material-sources';
describe('material source scope', () => {
  it('selects the first-cycle Spanish document for first grade', () => {
    expect(sourcesForMaterial('Español', 1)[0]?.url).toBe('https://ddc.mep.go.cr/dpsc/asignaturaspsc/espanol/informaciongeneral/pdfs/Programa_de_Estudio_de_Espanol_I_Ciclo.pdf');
  });
  it('does not attribute primary Spanish to secondary students', () => {
    expect(sourcesForMaterial('Español', 7)[0]?.url).toBe('https://www.mep.go.cr/programas-de-estudio');
  });
});