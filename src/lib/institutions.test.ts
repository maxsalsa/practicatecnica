import { describe, expect, it } from 'vitest';
import { attachmentExtension, audienceIncludes, audienceTargets, canPublish, canLeadInstitution, justificationDeadline, justificationState, lateNotice, logoExtension, noticeDays } from './institutions';

describe('avisos institucionales', () => {
  it('Subdirección puede aprobar campañas y gestionar horarios sin delegar a personal de apoyo', () => {
    expect(canLeadInstitution('subdireccion')).toBe(true);
    expect(canLeadInstitution('direccion')).toBe(true);
    expect(canLeadInstitution('asistente')).toBe(false);
    expect(canLeadInstitution('auxiliar')).toBe(false);
    expect(canLeadInstitution('apoyo')).toBe(false);
  });
  it('Festival de las Artes para todos llega a docentes', () => expect(audienceIncludes('todos', 'docente')).toBe(true));
  it('Festival de las Artes para todos llega a estudiantes', () => expect(audienceIncludes('todos', 'estudiante')).toBe(true));
  it('consejo de profesores solo para personal no llega a estudiantes', () => expect(audienceIncludes('personal', 'estudiante')).toBe(false));
  it('consejo de profesores llega a docentes', () => expect(audienceIncludes('personal', 'docente')).toBe(true));
  it('un aviso para estudiantes no cuenta al personal como destinatario', () => expect(audienceTargets('estudiantes', 'docente')).toBe(false));
  it('solo dirección, administración del colegio o superadministración publican', () => {
    expect(canPublish('direccion')).toBe(true);
    expect(canPublish('administrativo')).toBe(true);
    expect(canPublish('admin')).toBe(true);
    expect(canPublish('docente')).toBe(false);
    expect(canPublish('estudiante')).toBe(false);
  });
});

describe('adjuntos y logos', () => {
  it('acepta comprobante PDF de hasta 5 MB', () => expect(attachmentExtension({ type: 'application/pdf', size: 5 * 1024 * 1024 }).ext).toBe('pdf'));
  it('rechaza comprobante mayor a 5 MB', () => expect(attachmentExtension({ type: 'application/pdf', size: 5 * 1024 * 1024 + 1 }).error).toBeTruthy());
  it('rechaza ejecutables como comprobante', () => expect(attachmentExtension({ type: 'application/x-msdownload', size: 10 }).error).toBeTruthy());
  it('rechaza logo mayor a 1 MB', () => expect(logoExtension({ type: 'image/png', size: 1024 * 1024 + 1 }).error).toBeTruthy());
  it('calcula días de aviso anticipado en hora de Costa Rica', () => expect(noticeDays('2026-11-20', '2026-11-15T03:00:00Z')).toBe(6));
});

describe('plazos de permisos', () => {
  it('cita médica con 3 días de anticipación no es aviso tardío', () => expect(lateNotice('cita_medica', '2026-11-20', '2026-11-17T15:00:00Z', false)).toBe(false));
  it('cita médica con 2 días de anticipación es aviso tardío', () => expect(lateNotice('cita_medica', '2026-11-19', '2026-11-17T15:00:00Z', false)).toBe(true));
  it('enfermedad no exige 3 días de aviso', () => expect(lateNotice('incapacidad', '2026-11-17', '2026-11-17T15:00:00Z', false)).toBe(false));
  it('situación imprevista marcada no es aviso tardío', () => expect(lateNotice('cita_medica', '2026-11-18', '2026-11-17T15:00:00Z', true)).toBe(false));
  it('la justificación vence 48 horas después del último día', () => expect(justificationDeadline('2026-11-20').toISOString()).toBe('2026-11-23T06:00:00.000Z'));
  it('sin comprobante pasadas las 48 horas queda sin justificar a tiempo', () => expect(justificationState({ kind: 'cita_medica', ends_on: '2026-11-20', justified_at: null, attachment_path: null }, Date.parse('2026-11-23T06:00:01Z'))).toBe('vencida'));
  it('comprobante dentro de las 48 horas queda a tiempo', () => expect(justificationState({ kind: 'cita_medica', ends_on: '2026-11-20', justified_at: '2026-11-22T20:00:00Z', attachment_path: null })).toBe('a_tiempo'));
  it('comprobante después de 48 horas queda tardío', () => expect(justificationState({ kind: 'cita_medica', ends_on: '2026-11-20', justified_at: '2026-11-23T07:00:00Z', attachment_path: null })).toBe('tardia'));
});
