import { describe, expect, it } from 'vitest';
import { matchesConfirmedPayment, matchesRecordedCapture, CAPTURE_REVIEW_STATUS } from './payment-confirmation';

const expected = { userId: 'synthetic-owner', plan: 'estudiante', amount: 2500 };
const stored = { user_id: 'synthetic-owner', plan: 'estudiante', amount: 2500, status: 'confirmed', institution_id: null, paypal_quote_id: null };
describe('PayPal repeated confirmation', () => {
  it('records PayPal captures for manual review without activating access', () => {
    expect(CAPTURE_REVIEW_STATUS).toBe('active');
    expect(matchesRecordedCapture({...stored,status:CAPTURE_REVIEW_STATUS},expected)).toBe(true);
    expect(matchesConfirmedPayment({...stored,status:CAPTURE_REVIEW_STATUS},expected)).toBe(false);
  });
  it('accepts the same persisted confirmed student payment of 2500 CRC', () => expect(matchesConfirmedPayment(stored, expected)).toBe(true));
  it('rejects another owner', () => expect(matchesConfirmedPayment({ ...stored, user_id: 'other-synthetic-owner' }, expected)).toBe(false));
  it('never activates a pending payment', () => expect(matchesConfirmedPayment({ ...stored, status: 'pending' }, expected)).toBe(false));
  it('rejects an amount mismatch', () => expect(matchesConfirmedPayment({ ...stored, amount: 1000 }, expected)).toBe(false));
  it('rejects a missing persisted payment', () => expect(matchesConfirmedPayment(null, expected)).toBe(false));
  it('rejects a different plan or institution or quote', () => {
    expect(matchesConfirmedPayment({ ...stored, plan: 'docente' }, expected)).toBe(false);
    expect(matchesConfirmedPayment({ ...stored, institution_id: 'other-institution' }, expected)).toBe(false);
    expect(matchesConfirmedPayment({ ...stored, paypal_quote_id: 'other-quote' }, expected)).toBe(false);
  });
});