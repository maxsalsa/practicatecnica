/** Annual prices in colones approved by Max (26X.2). Server policies enforce the same amounts. */
export const ANNUAL_PRICES_CRC = {
  estudiante: 2500,
  estudiante_colegio: 1000,
  general: 3500,
  docente: 3500,
  institucion: 10000,
} as const;
export type AnnualPlan = keyof typeof ANNUAL_PRICES_CRC;

export const PLAN_LABELS: Record<AnnualPlan, string> = {
  estudiante: 'Estudiantes',
  estudiante_colegio: 'Estudiantes de colegio afiliado',
  general: 'Público general',
  docente: 'Docentes',
  institucion: 'Institución educativa',
};

export const PLAN_NOTES: Record<AnnualPlan, string> = {
  estudiante: 'Todas las materias, prácticas, simulacros y certificados por un año.',
  estudiante_colegio: 'Mismo acceso estudiantil con descuento cuando su colegio tiene plan institucional vigente y su matrícula está verificada.',
  general: 'Para personas particulares que estudian por su cuenta.',
  docente: 'Herramientas docentes para personas autorizadas como docentes.',
  institucion: 'Personal del colegio, avisos institucionales y solicitudes de permisos. Cada estudiante paga su plan con descuento.',
};

/** PayPal settles in USD; these are fixed charge amounts, not exact conversions. Docente uses a live quote. */
export const PAYPAL_USD: Record<Exclude<AnnualPlan, 'docente'>, string> = {
  estudiante: '4.99',
  estudiante_colegio: '1.99',
  general: '6.99',
  institucion: '19.99',
};

export const INSTITUTION_PLANS: AnnualPlan[] = ['estudiante_colegio', 'institucion'];
export const needsInstitution = (plan: AnnualPlan) => INSTITUTION_PLANS.includes(plan);

export interface Membership { id: string; name: string; member_role: string; paid_until: string | null }

export function institutionActive(m: Pick<Membership, 'paid_until'>, now = Date.now()) {
  return !!m.paid_until && Date.parse(m.paid_until) > now;
}

export interface PlanOption { key: string; plan: AnnualPlan; amount: number; label: string; institutionId?: string; institutionName?: string }

/** Plans a signed-in person may register. Discount only for verified students of an active institution; institution plan only for its direction. */
export function availablePlans(memberships: Membership[], now = Date.now()): PlanOption[] {
  const base: PlanOption[] = (['estudiante', 'general', 'docente'] as const).map(plan => ({ key: plan, plan, amount: ANNUAL_PRICES_CRC[plan], label: PLAN_LABELS[plan] }));
  const discounts = memberships.filter(m => m.member_role === 'estudiante' && institutionActive(m, now)).map(m => ({ key: `estudiante_colegio:${m.id}`, plan: 'estudiante_colegio' as const, amount: ANNUAL_PRICES_CRC.estudiante_colegio, label: PLAN_LABELS.estudiante_colegio, institutionId: m.id, institutionName: m.name }));
  const institutions = memberships.filter(m => m.member_role === 'direccion').map(m => ({ key: `institucion:${m.id}`, plan: 'institucion' as const, amount: ANNUAL_PRICES_CRC.institucion, label: PLAN_LABELS.institucion, institutionId: m.id, institutionName: m.name }));
  return [...discounts, ...base, ...institutions];
}

export const formatCrc = (amount: number) => `₡${amount.toLocaleString('es-CR')}`;
