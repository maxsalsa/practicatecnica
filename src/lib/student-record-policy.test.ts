import { describe, it, expect } from 'vitest';
import { canReadStudentRecords, RECORD_LINK_SECONDS, validateRecordFile } from './student-record-policy';
describe('private student records', () => {
  it('allows direction', () => expect(canReadStudentRecords('direccion')).toBe(true));
  it('allows subdirection', () => expect(canReadStudentRecords('subdireccion')).toBe(true));
  it.each(['admin','docente','encargado','estudiante','administrativo','orientacion','asistente','auxiliar'])('denies %s', role => expect(canReadStudentRecords(role)).toBe(false));
  it('links expire after 30 seconds', () => expect(RECORD_LINK_SECONDS).toBe(30));
  it('rejects executable attachments', () => expect(validateRecordFile('text/html', 100)).toBe(false));
});