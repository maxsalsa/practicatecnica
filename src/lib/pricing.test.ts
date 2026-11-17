import { describe, expect, it } from 'vitest';
import { ANNUAL_PRICES_CRC, availablePlans, PAYPAL_USD } from './pricing';

const now = Date.parse('2026-11-14T22:00:00Z');
const active = '2027-11-14T22:00:00Z';
const expired = '2026-11-01T00:00:00Z';

describe('precios anuales 26X.2', () => {
  it('institución cuesta 10 000 colones por año', () => expect(ANNUAL_PRICES_CRC.institucion).toBe(10000));
  it('estudiante cuesta 2 500 colones por año', () => expect(ANNUAL_PRICES_CRC.estudiante).toBe(2500));
  it('estudiante con colegio activo cuesta 1 000 colones', () => expect(ANNUAL_PRICES_CRC.estudiante_colegio).toBe(1000));
  it('docente y público general siguen en 3 500 colones', () => { expect(ANNUAL_PRICES_CRC.docente).toBe(3500); expect(ANNUAL_PRICES_CRC.general).toBe(3500); });
  it('PayPal cobra US$4,99 al plan estudiante de 2 500', () => expect(PAYPAL_USD.estudiante).toBe('4.99'));
  it('PayPal cobra US$6,99 al público general', () => expect(PAYPAL_USD.general).toBe('6.99'));
  it('sin colegio no aparece el descuento', () => expect(availablePlans([], now).some(p => p.plan === 'estudiante_colegio')).toBe(false));
  it('estudiante verificado de colegio activo obtiene 1 000', () => {
    const plan = availablePlans([{ id: 'i1', name: 'Colegio', member_role: 'estudiante', paid_until: active }], now).find(p => p.plan === 'estudiante_colegio');
    expect(plan?.amount).toBe(1000);
  });
  it('colegio con plan vencido no da descuento', () => expect(availablePlans([{ id: 'i1', name: 'Colegio', member_role: 'estudiante', paid_until: expired }], now).some(p => p.plan === 'estudiante_colegio')).toBe(false));
  it('personal docente no recibe descuento estudiantil', () => expect(availablePlans([{ id: 'i1', name: 'Colegio', member_role: 'docente', paid_until: active }], now).some(p => p.plan === 'estudiante_colegio')).toBe(false));
  it('solo dirección puede pagar el plan institucional', () => {
    expect(availablePlans([{ id: 'i1', name: 'Colegio', member_role: 'docente', paid_until: null }], now).some(p => p.plan === 'institucion')).toBe(false);
    expect(availablePlans([{ id: 'i1', name: 'Colegio', member_role: 'direccion', paid_until: null }], now).find(p => p.plan === 'institucion')?.amount).toBe(10000);
  });
});
