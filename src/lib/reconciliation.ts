export type ReconRow = { user_id: string | null; email: string | null; plan: string; amount: number; status: string; expires_at: string; created_at: string };
const DAY = 86_400_000;
/** Cobros confirmados vs renovaciones anuales. Saldo pendiente = por revisar + renovaciones que vencen en 30 días sin pago nuevo. */
export function reconcile(rows: ReconRow[], now = Date.now()) {
  const confirmed = rows.filter(r => r.status === 'confirmed');
  const pendingReview = rows.filter(r => r.status === 'active');
  const latest = new Map<string, ReconRow>();
  for (const r of confirmed) { const k = `${r.user_id ?? r.email}|${r.plan}`; const p = latest.get(k); if (!p || new Date(r.expires_at) > new Date(p.expires_at)) latest.set(k, r); }
  const due: ReconRow[] = [], lapsed: ReconRow[] = [];
  for (const r of latest.values()) { const t = new Date(r.expires_at).getTime(); if (t > now && t - now <= 30 * DAY) due.push(r); else if (t <= now && now - t <= 90 * DAY) lapsed.push(r); }
  const sum = (a: ReconRow[]) => a.reduce((n, r) => n + r.amount, 0);
  const yearAgo = now - 365 * DAY;
  return {
    collected: sum(confirmed), collected12m: sum(confirmed.filter(r => new Date(r.created_at).getTime() >= yearAgo)),
    renewals: confirmed.length - latest.size,
    pendingReview: sum(pendingReview), pendingReviewCount: pendingReview.length,
    dueSoon: due.sort((a, b) => a.expires_at.localeCompare(b.expires_at)), dueSoonAmount: sum(due),
    lapsed, lapsedAmount: sum(lapsed),
    outstanding: sum(pendingReview) + sum(due),
  };
}

export type CardRow = { email: string | null; price_id: string; product_id: string; status: string; current_period_end: string | null; cancel_at_period_end: boolean; created_at: string };
/** Precio anual con tarjeta en US$ según el plan (estudiante 4,99; general/docente 6,99). */
export const cardUsd = (r: Pick<CardRow, 'price_id' | 'product_id'>) => /estudiante/i.test(`${r.price_id} ${r.product_id}`) ? 4.99 : 6.99;
/** Cobros con tarjeta: activos ya pagados; saldo pendiente = cobros fallidos (past_due) por recuperar. */
export function reconcileCards(rows: CardRow[]) {
  const paid = rows.filter(r => ['active', 'trialing', 'canceled'].includes(r.status) && r.status !== 'trialing');
  const due = rows.filter(r => r.status === 'past_due');
  const sum = (a: CardRow[]) => Math.round(a.reduce((n, r) => n + cardUsd(r), 0) * 100) / 100;
  return { collectedUsd: sum(paid), paidCount: paid.length, activeCount: rows.filter(r => r.status === 'active').length, outstandingUsd: sum(due), dueCount: due.length };
}
