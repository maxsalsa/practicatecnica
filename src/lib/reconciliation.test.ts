import { expect, it } from 'vitest';
import { reconcile, type ReconRow } from './reconciliation';
const now = Date.parse('2026-11-16T12:00:00Z');
const r = (o: Partial<ReconRow>): ReconRow => ({ user_id: 'u1', email: 'a@x', plan: 'estudiante', amount: 2500, status: 'confirmed', expires_at: '2027-06-01T00:00:00Z', created_at: '2026-06-01T00:00:00Z', ...o });
it('cuenta una renovación cuando la misma persona paga dos años', () => {
  expect(reconcile([r({}), r({ expires_at: '2028-06-01T00:00:00Z' })], now).renewals).toBe(1);
});
it('saldo pendiente suma comprobantes por revisar y renovaciones que vencen en 30 días', () => {
  const s = reconcile([r({ status: 'active', amount: 1000 }), r({ user_id: 'u2', expires_at: '2026-12-01T00:00:00Z' })], now);
  expect(s.pendingReview).toBe(1000); expect(s.dueSoonAmount).toBe(2500); expect(s.outstanding).toBe(3500);
});
it('anulados no suman como cobrados y una renovación ya pagada no queda pendiente', () => {
  const s = reconcile([r({ status: 'rejected' }), r({ expires_at: '2026-12-01T00:00:00Z' }), r({ expires_at: '2027-12-01T00:00:00Z' })], now);
  expect(s.collected).toBe(5000); expect(s.dueSoon.length).toBe(0);
});
import { reconcileCards, type CardRow } from './reconciliation';
const c = (o: Partial<CardRow>): CardRow => ({ email: 'a@x', price_id: 'estudiante_anual', product_id: 'p', status: 'active', current_period_end: null, cancel_at_period_end: false, created_at: '2026-06-01', ...o });
it('tarjeta: cobrados suman US$4,99 estudiante y 6,99 docente; fallidos quedan como saldo pendiente', () => {
  const s = reconcileCards([c({}), c({ price_id: 'docente_anual' }), c({ status: 'past_due' })]);
  expect(s.collectedUsd).toBe(11.98); expect(s.outstandingUsd).toBe(4.99); expect(s.dueCount).toBe(1);
});
