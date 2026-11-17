import { describe, it, expect } from 'vitest';
import { applyPriorityDiscount, matchTariff, type Discount, type Tariff } from './institution-pricing';

const d = (over: Partial<Discount>): Discount => ({ id: 'd', name: 'Beca', criteria: '', priority: 1, kind: 'porcentaje', value: 50, applies_to: 'todos', active: true, ...over });
const t = (over: Partial<Tariff>): Tariff => ({ id: 't', service: 'circuito_vial', label: 'Base', level: null, vehicle: null, license_category: null, amount: 1000, active: true, ...over });

describe('descuentos por prioridad', () => {
  it('aplica solo el descuento de prioridad 1 aunque haya varios, sin acumularlos', () => {
    const r = applyPriorityDiscount(10000, [d({ id: 'b', priority: 2, value: 90 }), d({ id: 'a', priority: 1, value: 25 })], 'matricula');
    expect(r.discount?.id).toBe('a'); expect(r.discountAmount).toBe(2500); expect(r.final).toBe(7500);
  });
  it('un descuento de monto fijo nunca deja el precio bajo cero', () => {
    expect(applyPriorityDiscount(700, [d({ kind: 'monto', value: 1000 })], 'comedor').final).toBe(0);
  });
  it('ignora descuentos inactivos o de otro servicio', () => {
    expect(applyPriorityDiscount(5000, [d({ applies_to: 'comedor' }), d({ active: false, applies_to: 'matricula' })], 'matricula')).toMatchObject({ discount: null, final: 5000 });
  });
});

describe('tarifa según circuito, vehículo y licencia', () => {
  const list = [t({ id: 'general', amount: 500 }), t({ id: 'moto', vehicle: 'moto', amount: 800 }), t({ id: 'moto-av', vehicle: 'moto', level: 'avanzado', license_category: 'A2', amount: 1200 }), t({ id: 'off', vehicle: 'taxi', active: false })];
  it('elige la tarifa más específica que coincide', () => {
    expect(matchTariff(list, { service: 'circuito_vial', level: 'avanzado', vehicle: 'moto', license: 'a2' })?.id).toBe('moto-av');
    expect(matchTariff(list, { service: 'circuito_vial', level: 'inicial', vehicle: 'moto' })?.id).toBe('moto');
  });
  it('usa la tarifa general si no hay una del vehículo, y nunca una inactiva', () => {
    expect(matchTariff(list, { service: 'circuito_vial', level: 'inicial', vehicle: 'taxi' })?.id).toBe('general');
  });
  it('sin tarifas registradas no hay precio', () => {
    expect(matchTariff([], { service: 'circuito_vial', vehicle: 'carro' })).toBeNull();
  });
});

describe('formato de colones', () => {
  it('agrupa miles con punto', async () => {
    const { formatColones } = await import('./institution-pricing');
    expect(formatColones(2500)).toBe('₡2.500'); expect(formatColones(1234567)).toBe('₡1.234.567'); expect(formatColones(700)).toBe('₡700');
  });
});
