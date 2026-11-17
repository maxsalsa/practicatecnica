import { createServerFn } from "@tanstack/react-start";
import { gatewayFetch, type PaddleEnv } from "@/lib/paddle.server";
import { assertSandboxCheckout } from '@/lib/payment-safety';

export const resolvePaddlePrice = createServerFn({ method: "GET" })
  .inputValidator((data: { priceId: string; environment: PaddleEnv }) => {
    const allowed = ["estudiante_anual", "general_anual", "docente_anual"];
    if (!allowed.includes(data.priceId) || !["sandbox", "live"].includes(data.environment)) throw new Error("Precio no disponible");
    return data;
  })
  .handler(async ({ data }) => {
    assertSandboxCheckout(data.environment);
    const response = await gatewayFetch(data.environment, `/prices?external_id=${encodeURIComponent(data.priceId)}`);
    const result = await response.json();
    if (!result.data?.length) throw new Error("Price not found");
    return result.data[0].id as string;
  });

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
export const openBillingPortal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { environment: PaddleEnv }) => {
    if (!["sandbox", "live"].includes(data.environment)) throw new Error("Entorno inválido");
    return data;
  })
  .handler(async ({ data, context }) => {
    const { data: sub } = await context.supabase.from("subscriptions").select("paddle_customer_id,paddle_subscription_id")
      .eq("user_id", context.userId).eq("environment", data.environment).order("created_at", { ascending: false }).limit(1).maybeSingle();
    if (!sub) throw new Error("No tiene una suscripción con tarjeta.");
    const res = await gatewayFetch(data.environment, `/customers/${sub.paddle_customer_id}/portal-sessions`, { method: "POST", body: JSON.stringify({ subscription_ids: [sub.paddle_subscription_id] }) });
    const json = await res.json();
    if (!res.ok) throw new Error(`No se pudo abrir el portal (${res.status})`);
    return json.data.urls.general.overview as string;
  });
