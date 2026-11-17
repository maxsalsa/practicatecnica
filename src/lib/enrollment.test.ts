import { describe, it, expect } from 'vitest';
import { classifyId, parseEnrollmentCsv } from './enrollment';
describe('enrollment', () => {
  it('reconoce cédula nacional de 9 dígitos', () => expect(classifyId('1-2345-6789')).toBe('cedula'));
  it('reconoce DIMEX de 12 dígitos', () => expect(classifyId('155812345678')).toBe('dimex'));
  it('rechaza cédula con símbolos', () => expect(classifyId('12#45')).toBeNull());
  it('solo acepta Gmail y omite encabezado', () => {
    const r = parseEnrollmentCsv('nombre;correo;cedula;nivel\nAna Mora;ana@gmail.com;112345678;10\nLuis;luis@yahoo.com;;10');
    expect(r.rows).toHaveLength(1); expect(r.rows[0]!.idKind).toBe('cedula'); expect(r.errors).toHaveLength(1);
  });
});
