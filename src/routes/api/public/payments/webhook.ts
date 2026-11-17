import { createFileRoute } from "@tanstack/react-router";
import { verifyWebhook, EventName, type PaddleEnv } from "@/lib/paddle.server";

async function db() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin as any;
}

async function handleWebhook(event: any, env: PaddleEnv) {
  const d = event.data;
  const sb = await db();
  const now = new Date().toISOString();
  if (event.eventType === EventName.SubscriptionCreated) {
    const userId = d.customData?.userId;
    const item = d.items?.[0];
    const priceId = item?.price?.importMeta?.externalId;
    const productId = item?.product?.importMeta?.externalId;
    if (!userId || !priceId || !productId) { console.warn("Skipping subscription: missing userId or importMeta.externalId"); return; }
    const { error } = await sb.from("subscriptions").upsert({
      user_id: userId, paddle_subscription_id: d.id, paddle_customer_id: d.customerId,
      product_id: productId, price_id: priceId, status: d.status,
      current_period_start: d.currentBillingPeriod?.startsAt, current_period_end: d.currentBillingPeriod?.endsAt,
      environment: env, updated_at: now,
    }, { onConflict: "paddle_subscription_id" });
    if (error) throw error;
  } else if (event.eventType === EventName.SubscriptionUpdated) {
    const { error } = await sb.from("subscriptions").update({
      status: d.status, current_period_start: d.currentBillingPeriod?.startsAt, current_period_end: d.currentBillingPeriod?.endsAt,
      cancel_at_period_end: d.scheduledChange?.action === "cancel", updated_at: now,
    }).eq("paddle_subscription_id", d.id).eq("environment", env);
    if (error) throw error;
  } else if (event.eventType === EventName.SubscriptionCanceled) {
    const { error } = await sb.from("subscriptions").update({ status: "canceled", updated_at: now }).eq("paddle_subscription_id", d.id).eq("environment", env);
    if (error) throw error;
  } else {
    console.log("Unhandled event:", event.eventType);
  }
}

export const Route = createFileRoute("/api/public/payments/webhook")({staticData:{sitemap:false},
  server: {
    handlers: {
      POST: async ({ request }) => {
        const raw = new URL(request.url).searchParams.get("env");
        if (raw !== "sandbox" && raw !== "live") return new Response("Bad env", { status: 400 });
        const env = raw as PaddleEnv;
        let event: any;
        try { event = await verifyWebhook(request, env); } catch (e) { console.error("Webhook signature error:", e); return new Response("Invalid signature", { status: 400 }); }
        try { await handleWebhook(event, env); return Response.json({ received: true }); }
        catch (e) { console.error("Webhook processing error:", e); return new Response("Processing error", { status: 500 }); }
      },
    },
  },
});
