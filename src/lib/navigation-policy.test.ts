import { describe, expect, it } from 'vitest';
import { navigationSections } from './navigation-policy';
const base = { signedIn: true, admin: false, teacher: false, institutionRoles: [] as string[] };
describe('role navigation', () => {
  it('students never receive teaching or leadership navigation', () => {
    expect(navigationSections({ ...base, institutionRoles: ['estudiante'] })).toMatchObject({ teaching: false, leadership: false, administration: false, student: true });
  });
  it('family navigation does not grant teaching or leadership', () => {
    expect(navigationSections({ ...base, institutionRoles: ['encargado'] })).toMatchObject({ family: true, teaching: false, leadership: false, student: false });
  });
  it('direction has institutional leadership but no teacher entitlement by role alone', () => {
    expect(navigationSections({ ...base, institutionRoles: ['direccion'] })).toMatchObject({ institution: true, leadership: true, teaching: false });
  });
  it('authorized teachers see teaching without global administration', () => {
    expect(navigationSections({ ...base, teacher: true, institutionRoles: ['docente'] })).toMatchObject({ teaching: true, leadership: false, administration: false });
  });
  it('unassigned MEP advisers receive no private institutional navigation', () => {
    expect(navigationSections(base)).toMatchObject({ institution: false, leadership: false, administration: false });
  });
});