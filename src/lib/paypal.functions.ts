import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import { teacherUsd, verifiedRate, TEACHER_ANNUAL_CRC } from './paypal-pricing';
import { ANNUAL_PRICES_CRC, PAYPAL_USD, needsInstitution, type AnnualPlan } from './pricing';
import { matchesRecordedCapture, CAPTURE_REVIEW_STATUS } from './payment-confirmation';
import { assertPaypalCheckoutEnabled } from './payment-safety';

// PayPal does not settle in colones, so plans are charged in fixed USD amounts.
type FixedPlan = Exclude<AnnualPlan, 'docente'>;
const PAID_PLANS = ['estudiante', 'estudiante_colegio', 'general', 'docente', 'institucion'] as const;

type RpcClient = { rpc: (fn: any, args?: any) => PromiseLike<{ data: unknown; error: unknown }> };
/** Re-checks institutional eligibility on the server with the caller's own session (RLS/RPC as the user). */
async function assertInstitutionEligible(client: RpcClient, plan: AnnualPlan, institutionId: string | undefined) {
  if (!needsInstitution(plan)) { if (institutionId) throw new Error('Este plan no lleva institución.'); return; }
  if (!institutionId) throw new Error('Seleccione la institución del plan.');
  if (plan === 'estudiante_colegio') {
    const { data, error } = await client.rpc('student_discount_eligible', { _inst: institutionId });
    if (error || data !== true) throw new Error('El descuento requiere matrícula verificada en un colegio con plan institucional vigente.');
  } else {
    const { data, error } = await client.rpc('institution_role_of', { _inst: institutionId });
    if (error || data !== 'direccion') throw new Error('Solo la dirección de la institución puede pagar el plan institucional.');
  }
}

const PAYPAL_BASE_URL =
  process.env["PAYPAL_MODE"] === "sandbox"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com";

async function obtenerTokenPaypal(): Promise<string> {
  const clientId = process.env["PAYPAL_CLIENT_ID"] || process.env["VITE_PAYPAL_CLIENT_ID"];
  const secret = process.env["PAYPAL_CLIENT_SECRET"] || process.env["PAYPAL_API_KEY"];
  if (!clientId || !secret) throw new Error("PayPal no está configurado en el servidor.");

  const basic = Buffer.from(`${clientId}:${secret}`).toString("base64");
  const tokenRes = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  });
  if (!tokenRes.ok) {
    throw new Error("No se pudo autenticar con PayPal.");
  }
  const tokenData = (await tokenRes.json()) as { access_token: string };
  return tokenData.access_token;
}

async function paypal(path: string, init: RequestInit & { requestId?: string } = {}) {
  const accessToken = await obtenerTokenPaypal();
  const res = await fetch(`${PAYPAL_BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init.requestId ? { "PayPal-Request-Id": init.requestId } : {})
    }
  });
  const body = await res.text();
  if (!res.ok) {
    console.error(`PayPal ${res.status}: ${body}`);
    throw new Error(`PayPal no pudo procesar la solicitud [${res.status}]: ${body}`);
  }
  return JSON.parse(body) as Record<string, any>;
}

const planInput = z.object({ plan: z.enum(PAID_PLANS), quoteId: z.string().uuid().optional(), institutionId: z.string().uuid().optional() });

export const quoteTeacherPaypal = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    if (!response.ok) throw new Error('No se pudo obtener la cotización. Use SINPE.');
    const result = await response.json() as { result: string; time_last_update_unix: number; rates: { CRC: number } };
    if (result.result !== 'success') throw new Error('Cotización no disponible. Use SINPE.');
    const { rate, date } = verifiedRate(result.rates.CRC, result.time_last_update_unix * 1000);
    const usd = teacherUsd(rate);
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { data, error } = await supabaseAdmin.from('paypal_quotes').insert({ user_id: context.userId, plan: 'docente', crc_amount: TEACHER_ANNUAL_CRC, usd_amount: Number(usd), crc_per_usd: rate, rate_source: 'https://www.exchangerate-api.com', rate_date: date }).select('id,expires_at').single();
    if (error || !data) throw new Error('No se pudo guardar la cotización. Use SINPE.');
    return { id: data.id, usd, rate, date, source: 'https://www.exchangerate-api.com', expiresAt: data.expires_at };
  });

export const createPaypalOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => planInput.parse(d))
  .handler(async ({ data, context }) => {
    assertPaypalCheckoutEnabled();
    let usd: string;
    let quoteId: string | undefined;
    if (data.plan === 'docente') {
      if (!data.quoteId) throw new Error('Solicite la cotización docente.');
      const { data: quote, error } = await context.supabase.from('paypal_quotes').select('*').eq('id', data.quoteId).eq('user_id', context.userId).single();
      if (error || !quote || Date.parse(quote.expires_at) <= Date.now()) throw new Error('La cotización venció. Actualícela.');
      if (quote.order_id) return { id: quote.order_id };
      usd = Number(quote.usd_amount).toFixed(2);
      quoteId = quote.id;
    } else {
      await assertInstitutionEligible(context.supabase as unknown as RpcClient, data.plan, data.institutionId);
      usd = PAYPAL_USD[data.plan as FixedPlan];
    }
    const scope = quoteId ?? data.institutionId;
    const order = await paypal("/v2/checkout/orders", {
      method: "POST",
      requestId: quoteId ?? crypto.randomUUID(),
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{
          custom_id: `${context.userId}:${data.plan}${scope ? ':' + scope : ''}`,
          description: `pracTICAtecnica.com plan anual ${data.plan}`,
          amount: { currency_code: "USD", value: usd },
        }],
      }),
    });
    if (quoteId) {
      const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
      const { error } = await supabaseAdmin.from('paypal_quotes').update({ order_id: order['id'] as string }).eq('id', quoteId).eq('user_id', context.userId);
      if (error) throw new Error('No se pudo registrar el pedido. No se efectuó ningún cobro.');
    }
    return { id: order["id"] as string };
  });

export const capturePaypalOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ orderId: z.string().min(5).max(64).regex(/^[A-Z0-9]+$/) }).parse(d))
  .handler(async ({ data, context }) => {
    assertPaypalCheckoutEnabled();
    const existing = await paypal(`/v2/checkout/orders/${data.orderId}`);
    const unit = existing["purchase_units"]?.[0];
    const [uid, rawPlan, scope] = String(unit?.custom_id ?? "").split(":");
    if (uid !== context.userId || !(PAID_PLANS as readonly string[]).includes(rawPlan ?? '')) throw new Error("Pedido no válido.");
    const plan = rawPlan as AnnualPlan;
    const quoteId = plan === 'docente' ? scope : undefined;
    const institutionId = needsInstitution(plan) ? scope : undefined;
    let usd: string;
    let crc: number;
    if (plan === 'docente') {
      if (!quoteId) throw new Error('Pedido sin cotización.');
      const { data: quote, error } = await context.supabase.from('paypal_quotes').select('*').eq('id', quoteId).eq('user_id', context.userId).single();
      if (error || !quote || quote.order_id !== data.orderId) throw new Error('Cotización no válida.');
      usd = Number(quote.usd_amount).toFixed(2); crc = quote.crc_amount;
    } else {
      await assertInstitutionEligible(context.supabase as unknown as RpcClient, plan, institutionId);
      usd = PAYPAL_USD[plan as FixedPlan]; crc = ANNUAL_PRICES_CRC[plan];
    }
    if (unit?.amount?.value !== usd || unit?.amount?.currency_code !== 'USD') throw new Error('El importe del pedido no coincide.');
    if (existing['status'] !== 'COMPLETED' && existing['status'] !== 'APPROVED') throw new Error('Apruebe el pedido en PayPal antes del cobro.');
    if (existing["status"] !== "COMPLETED")
      await paypal(`/v2/checkout/orders/${data.orderId}/capture`, { method: "POST", requestId: `cap-${data.orderId}` });
    // Confirm the charge by reading the order back from PayPal, never from the browser.
    const check = await paypal(`/v2/checkout/orders/${data.orderId}`);
    const capture = check["purchase_units"]?.[0]?.payments?.captures?.[0];
    if (check["status"] !== "COMPLETED" || capture?.status !== "COMPLETED" || capture?.amount?.value !== usd || capture?.amount?.currency_code !== "USD") {
      throw new Error("El pago no se completó.");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const email = (context.claims as { email?: string }).email ?? null;
    const { error } = await supabaseAdmin.from("payments").insert(
      { user_id: context.userId, email, plan, amount: crc, method: "paypal", payer_phone: "PayPal", reference: capture.id, status: CAPTURE_REVIEW_STATUS, reviewed_at: null, paypal_quote_id: quoteId ?? null, institution_id: institutionId ?? null },
    );
    if (error?.code === "23505") {
      const persisted = await context.supabase.from('payments')
        .select('user_id,plan,amount,status,institution_id,paypal_quote_id')
        .eq('user_id', context.userId).eq('method', 'paypal').eq('reference', capture.id).maybeSingle();
      if (persisted.error || !matchesRecordedCapture(persisted.data, { userId: context.userId, plan, amount: crc, institutionId, quoteId })) {
        throw new Error('Pago recibido, pero su confirmación requiere revisión. Escríbanos por WhatsApp.');
      }
    } else if (error) {
      console.error(error);
      throw new Error("Pago recibido, pero no se pudo activar. Escríbanos por WhatsApp.");
    }
    return { ok: true, awaitingReview: true };
  });
