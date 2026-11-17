import { describe, expect, it } from 'vitest';
import { emptyTrace, paymentSummary } from './admin-trace';
describe('administrative payment trace', () => {
  const now = Date.parse('2026-11-12T17:00:00Z');
  it('does not activate a SINPE student plan of 1500 before confirmation', () => {
    expect(paymentSummary('student', {...emptyTrace, payments: [{user_id:'student', plan:'estudiante', amount:1500, status:'active', expires_at:'2027-11-12',created_at:'2026-11-12',method:'sinpe',reference:'test'}]}, now).active).toBe(false);
  });
  it('activates a confirmed SINPE student plan of 1500', () => {
    expect(paymentSummary('student', {...emptyTrace, payments: [{user_id:'student', plan:'estudiante', amount:1500, status:'confirmed', expires_at:'2027-11-12',created_at:'2026-11-12',method:'sinpe',reference:'test'}]}, now).active).toBe(true);
  });
  it('does not count expired payments as active', () => {
    expect(paymentSummary('student', {...emptyTrace, payments: [{user_id:'student', plan:'estudiante', amount:1500, status:'active', expires_at:'2026-11-01',created_at:'2025-11-01',method:'sinpe',reference:'test'}]}, now).active).toBe(false);
  });
});