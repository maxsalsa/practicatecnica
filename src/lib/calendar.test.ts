import { describe, expect, it } from 'vitest';
import { icsEvent } from './calendar';

describe('archivo de calendario', () => {
  const ics = icsEvent({ uid: 'a1', title: 'Consejo de profesores; aula 3', start: new Date('2026-11-20T20:00:00Z') }, new Date('2026-11-14T00:00:00Z'));
  it('usa la hora del evento y dura una hora por defecto', () => {
    expect(ics).toContain('DTSTART:20261120T200000Z');
    expect(ics).toContain('DTEND:20261120T210000Z');
  });
  it('recuerda un día y una hora antes', () => {
    expect(ics).toContain('TRIGGER:-P1D');
    expect(ics).toContain('TRIGGER:-PT1H');
  });
  it('escapa el punto y coma del título', () => expect(ics).toContain('SUMMARY:Consejo de profesores\\; aula 3'));
});
