export type Payment = { user_id: string; plan: string; status: string; expires_at: string; created_at: string; amount: number; method: string; reference: string };
export type Subscription = { user_id: string; status: string; current_period_end: string | null; created_at: string; product_id: string; environment: string };
export type Trace = {
  payments: Payment[]; subscriptions: Subscription[];
  documents: { name: string; created_at: string }[];
  activity: { user_id: string; day: string; attempts: number; xp: number }[];
  cases: { id: string; user_id: string; kind: string; subject: string; notes: string; status: string; created_at: string }[];
  history: { user_id: string; previous_status: string; status: string; created_at: string }[];
};
export const emptyTrace: Trace = { payments: [], subscriptions: [], documents: [], activity: [], cases: [], history: [] };
export function paymentSummary(id: string, trace: Trace, now = Date.now()) {
  const payments = trace.payments.filter(p => p.user_id === id).sort((a,b) => b.created_at.localeCompare(a.created_at));
  const subscriptions = trace.subscriptions.filter(s => s.user_id === id).sort((a,b) => b.created_at.localeCompare(a.created_at));
  const paid = payments.find(p => p.status === 'confirmed' && Date.parse(p.expires_at) > now);
  const subscription = subscriptions.find(s => ['active','trialing','canceled'].includes(s.status) && s.current_period_end && Date.parse(s.current_period_end) > now);
  if (paid) return { active: true, label: `${paid.plan} · ${paid.method === 'paypal' ? 'PayPal' : 'SINPE'} vigente`, until: paid.expires_at };
  if (subscription) return { active: true, label: `Tarjeta/PayPal · ${subscription.environment === 'sandbox' ? 'prueba' : 'vigente'}`, until: subscription.current_period_end };
  return { active: false, label: payments[0] ? `SINPE · ${payments[0].status}` : subscriptions[0] ? `Tarjeta/PayPal · ${subscriptions[0].status}` : 'Sin pago registrado', until: payments[0]?.expires_at ?? subscriptions[0]?.current_period_end ?? null };
}