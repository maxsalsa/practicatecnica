import { describe, expect, it } from 'vitest';
import { teacherToolsAllowed } from './teacher-policy';
const now = Date.parse('2026-11-14T19:00:00Z');
const base = { roles: ['teacher'], trialEnds: '2026-11-14T19:00:00Z', payments: [], blocked: false };
describe('permisos docentes', () => {
  it('estudiante con pago docente no obtiene rol docente', () => expect(teacherToolsAllowed({ ...base, roles: ['student'], payments: [{ plan: 'docente', status: 'confirmed', expires_at: '2027-11-14' }] }, now)).toBe(false));
  it('pago general no habilita docente fuera de prueba', () => expect(teacherToolsAllowed({ ...base, payments: [{ plan: 'general', status: 'confirmed', expires_at: '2027-11-14' }] }, now)).toBe(false));
  it('docente autorizado tiene acceso antes de vencer los 13 días', () => expect(teacherToolsAllowed({ ...base, trialEnds: new Date(Date.parse('2026-11-01T19:00:01Z') + 13 * 86400000).toISOString() }, now)).toBe(true));
  it('prueba vence exactamente al cumplir 13 días', () => expect(teacherToolsAllowed(base, now)).toBe(false));
  it('pago pendiente no habilita herramientas', () => expect(teacherToolsAllowed({ ...base, payments: [{ plan: 'docente', status: 'pending', expires_at: '2027-11-14' }] }, now)).toBe(false));
  it('pago docente confirmado vigente habilita docente autorizado', () => expect(teacherToolsAllowed({ ...base, payments: [{ plan: 'docente', status: 'confirmed', expires_at: '2027-11-14' }] }, now)).toBe(true));
  it('pago docente vencido no habilita herramientas', () => expect(teacherToolsAllowed({ ...base, payments: [{ plan: 'docente', status: 'confirmed', expires_at: '2026-11-14T19:00:00Z' }] }, now)).toBe(false));
  it('docente de institución con plan vigente tiene herramientas', () => expect(teacherToolsAllowed({ ...base, institutionalTeacher: true }, now)).toBe(true));
  it('membresía institucional sin rol docente no habilita herramientas', () => expect(teacherToolsAllowed({ ...base, roles: ['student'], institutionalTeacher: true }, now)).toBe(false));
  it('administración conserva acceso', () => expect(teacherToolsAllowed({ ...base, roles: ['admin'] }, now)).toBe(true));
  it('cuenta suspendida no tiene herramientas', () => expect(teacherToolsAllowed({ ...base, roles: ['admin'], blocked: true }, now)).toBe(false));
});