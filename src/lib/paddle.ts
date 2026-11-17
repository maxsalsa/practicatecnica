import { resolvePaddlePrice } from "@/utils/payments.functions";
import { assertSandboxCheckout } from './payment-safety';

const clientToken = import.meta.env["VITE_PAYMENTS_CLIENT_TOKEN"] as string | undefined;
declare global { interface Window { Paddle: any } }

export function getPaddleEnvironment(): "sandbox" | "live" {
  return clientToken?.startsWith("test_") ? "sandbox" : "live";
}
let ready: Promise<void> | null = null;
let checkoutResult: ((result: 'completed' | 'canceled' | 'failed') => void) | undefined;
export function initializePaddle() {
  if (ready) return ready;
  if (!clientToken) throw new Error("VITE_PAYMENTS_CLIENT_TOKEN is not set");
  ready = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    s.onload = () => {
      window.Paddle.Environment.set(getPaddleEnvironment() === "sandbox" ? "sandbox" : "production");
      window.Paddle.Initialize({ token: clientToken, eventCallback: (event: { name: string }) => {
        if (event.name === 'checkout.completed') { checkoutResult?.('completed'); checkoutResult = undefined; }
        else if (event.name === 'checkout.closed') { checkoutResult?.('canceled'); checkoutResult = undefined; }
        else if (event.name === 'checkout.error' || event.name === 'checkout.payment.failed') checkoutResult?.('failed');
      } });
      resolve();
    };
    s.onerror = (e) => { ready = null; reject(e); };
    document.head.appendChild(s);
  });
  return ready;
}
export async function openCardCheckout(priceId: string, user: { id: string; email?: string | null }, onResult?: (result: 'completed' | 'canceled' | 'failed') => void) {
  assertSandboxCheckout(getPaddleEnvironment());
  await initializePaddle();
  const paddlePriceId = await resolvePaddlePrice({ data: { priceId, environment: getPaddleEnvironment() } });
  checkoutResult = onResult;
  window.Paddle.Checkout.open({
    items: [{ priceId: paddlePriceId, quantity: 1 }],
    customer: user.email ? { email: user.email } : undefined,
    customData: { userId: user.id },
    settings: { displayMode: "overlay", locale: "es", successUrl: `${window.location.origin}/perfil?pago=ok`, allowLogout: false, showAddDiscounts: true, variant: "one-page" },
  });
}
