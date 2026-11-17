/** A duplicate insert is successful only when the stored payment is the same confirmed capture. */
export function matchesConfirmedPayment(
  stored: { user_id: string; plan: string; amount: number; status: string; institution_id: string | null; paypal_quote_id: string | null } | null,
  expected: { userId: string; plan: string; amount: number; institutionId?: string | undefined; quoteId?: string | undefined },
) {
  return stored !== null && stored.user_id === expected.userId && stored.plan === expected.plan
    && stored.amount === expected.amount && stored.status === 'confirmed'
    && stored.institution_id === (expected.institutionId ?? null)
    && stored.paypal_quote_id === (expected.quoteId ?? null);
}

/** Provider receipt is evidence, not administrative activation. */
export const CAPTURE_REVIEW_STATUS = 'active' as const;
export function matchesRecordedCapture(stored: Parameters<typeof matchesConfirmedPayment>[0], expected: Parameters<typeof matchesConfirmedPayment>[1]) {
  return stored !== null && (stored.status === CAPTURE_REVIEW_STATUS || stored.status === 'confirmed')
    && matchesConfirmedPayment({ ...stored, status: 'confirmed' }, expected);
}