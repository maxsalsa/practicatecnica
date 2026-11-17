import { describe, expect, it } from 'vitest';
import { malla } from './malla';
import { resolveCurriculumSelection, validCurriculumSearch } from './curriculum-selection';

describe('cascading curricular discovery', () => {
  it('includes Primaria, Secundaria, CTP and Admisión without filtering pending subjects', () => {
    for (const id of ['primaria', 'academica', 'ctp', 'admision']) {
      const modality = resolveCurriculumSelection({ modalidad: id }).modality;
      expect(modality?.id).toBe(id);
      expect(modality?.niveles.length).toBeGreaterThan(0);
    }
    expect(malla.find(m => m.id === 'primaria')?.niveles).toHaveLength(6);
    expect(resolveCurriculumSelection({ modalidad: 'primaria', nivel: '2.º grado', materia: 'Ciencias' }).subject?.decks).toEqual([]);
  });
  it('drops dependent selections when switching to another modality', () => {
    expect(validCurriculumSearch({ modalidad: 'admision', nivel: '2.º grado', materia: 'Ciencias' })).toEqual({ modalidad: 'admision' });
  });
  it('round-trips every canonical subject including pending technical specialties', () => {
    for (const modality of malla) for (const level of modality.niveles) for (const subject of level.materias) {
      const search = { modalidad: modality.id, nivel: level.name, materia: subject.name };
      expect(validCurriculumSearch(search)).toEqual(search);
    }
  });
  it('does not accept fabricated curriculum names', () => {
    expect(validCurriculumSearch({ modalidad: 'inventada', nivel: '99.º', materia: 'inventada' })).toEqual({});
  });
});