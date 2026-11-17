import { describe, expect, it } from 'vitest';
import { teacherUsd, TEACHER_ANNUAL_CRC, verifiedRate } from './paypal-pricing';
describe('Plan docente anual', () => {
  it('cuesta 3500 colones', () => expect(TEACHER_ANNUAL_CRC).toBe(3500));
  it('convierte 3500 colones a 7 dólares con tasa 500', () => expect(teacherUsd(500)).toBe('7.00'));
  it('redondea al centavo sin cobrar menos del precio', () => expect(teacherUsd(453.237093)).toBe('7.73'));
  it('rechaza tasas inexistentes', () => expect(() => teacherUsd(0)).toThrow());
  it('rechaza cotizaciones antiguas', () => expect(() => verifiedRate(500, 0, 172800001)).toThrow());
});