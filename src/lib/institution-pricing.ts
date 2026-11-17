/** Institution price lists. Amounts are whole colones entered by each institution; nothing here invents prices. */
export type TariffService = 'matricula' | 'comedor' | 'circuito_vial' | 'otro';
export type DiscountScope = 'todos' | TariffService;
export const SERVICE_LABELS: Record<TariffService, string> = { matricula: 'Matrícula', comedor: 'Comedor', circuito_vial: 'Circuito vial', otro: 'Otro servicio' };
/** Common Costa Rican licence codes, offered only as typing suggestions; institutions confirm the category themselves. */
export const LICENSE_SUGGESTIONS = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'D1', 'D2', 'D3', 'E1', 'E2'];

export interface Tariff { id: string; service: TariffService; label: string; level: string | null; vehicle: string | null; license_category: string | null; amount: number; active: boolean }
export interface Discount { id: string; name: string; criteria: string; priority: number; kind: 'porcentaje' | 'monto'; value: number; applies_to: DiscountScope; active: boolean }

/** Dot-grouped whole colones (2.500), identical on server, browser and PDF. */
export const groupThousands = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
export const formatColones = (n: number) => `₡${groupThousands(n)}`;

/** Mirrors public.price_enrollment: only the eligible discount with the lowest priority number applies; discounts never stack. */
export function applyPriorityDiscount(base: number, discounts: Discount[], service: TariffService) {
  const discount = discounts.filter(d => d.active && (d.applies_to === 'todos' || d.applies_to === service)).sort((a, b) => a.priority - b.priority)[0] ?? null;
  const discountAmount = !discount ? 0 : discount.kind === 'porcentaje' ? Math.round(base * discount.value / 100) : Math.min(discount.value, base);
  return { discount, discountAmount, final: base - discountAmount };
}

const norm = (v: string | null | undefined) => (v ?? '').trim().toLowerCase();
/** Most specific active tariff: every filled field must match exactly; blank fields mean "any". */
export function matchTariff(tariffs: Tariff[], want: { service: TariffService; level?: string | null; vehicle?: string | null; license?: string | null }) {
  let best: Tariff | null = null; let bestScore = -1;
  for (const t of tariffs) {
    if (!t.active || t.service !== want.service) continue;
    const fields: [string | null, string | null | undefined][] = [[t.level, want.level], [t.vehicle, want.vehicle], [t.license_category, want.license]];
    if (fields.some(([have, need]) => have !== null && norm(have) !== norm(need))) continue;
    const score = fields.filter(([have]) => have !== null).length;
    if (score > bestScore) { best = t; bestScore = score; }
  }
  return best;
}
