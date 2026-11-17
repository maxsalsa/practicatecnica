import { describe, expect, it } from 'vitest';
import { INITIAL_MEAL_PRICES, ticketTotal, creditedTickets } from './school-services';
describe('tiquetes de comedor', () => {
  it('estudiante paga 700', () => expect(INITIAL_MEAL_PRICES.student).toBe(700));
  it('docente paga 1400', () => expect(INITIAL_MEAL_PRICES.teacher).toBe(1400));
  it.each([3, 4, 5])('total estudiantil de %i tiquetes', q => expect(ticketTotal(q, 700)).toBe(q * 700));
  it.each([3, 4, 5])('total docente de %i tiquetes', q => expect(ticketTotal(q, 1400)).toBe(q * 1400));
  it('SINPE pendiente no acredita saldo', () => expect(creditedTickets(5, 'pendiente')).toBe(0));
  it('efectivo confirmado acredita cantidad', () => expect(creditedTickets(3, 'confirmado')).toBe(3));
  it('rechaza cantidad fraccionaria', () => expect(() => ticketTotal(2.5, 700)).toThrow());
});