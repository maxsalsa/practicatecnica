import { describe, it, expect } from 'vitest';
import { buildEnrollmentSummary, maskIdentification } from './enrollment-summary';

const r = { student_name: 'Ana', student_id_number: '1 0234 0567', level: '10.° CTP', relation: 'madre', status: 'pendiente', reviewed_at: null, verification_hash: null };
const p = { tariff_label: 'Matrícula anual', base_amount: 10000, discount_name: 'Beca', discount_priority: 1, discount_amount: 2500, final_amount: 7500, priced_at: '2026-11-15T20:00:00Z' };

describe('PDF de matrícula', () => {
  it('muestra solo los últimos cuatro dígitos de la identificación', () => {
    expect(maskIdentification('1 0234 0567')).toBe('•••••0567');
    expect(maskIdentification('123')).toBe('••••');
  });
  it('una solicitud pendiente no se presenta como comprobante ni lleva código', () => {
    const s = buildEnrollmentSummary(r, p);
    expect(s.approved).toBe(false); expect(s.code).toBeNull(); expect(s.title).toContain('pendiente');
  });
  it('una matrícula aprobada lleva su código y los montos guardados', () => {
    const s = buildEnrollmentSummary({ ...r, status: 'aprobada', reviewed_at: '2026-11-15T21:00:00Z', verification_hash: 'abc' }, p);
    expect(s.title).toBe('Comprobante de matrícula'); expect(s.code).toBe('abc');
    expect(s.amounts).toEqual([['Matrícula anual', 'CRC 10.000'], ['Descuento: Beca (prioridad 1)', '- CRC 2.500'], ['Total a pagar', 'CRC 7.500']]);
  });
});
