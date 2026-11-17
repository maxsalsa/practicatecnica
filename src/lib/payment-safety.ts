/** Live checkout stays disabled until an explicit reviewed release changes this policy. */
export function assertSandboxCheckout(environment: string) {
  if (environment !== 'sandbox') throw new Error('Cobros reales desactivados durante la verificación de seguridad.');
}
/** PayPal live enabled by Max (16-nov-2026); captures stay pending until his manual confirmation. */
export const PAYPAL_CHECKOUT_ENABLED = true;
export function assertPaypalCheckoutEnabled(enabled = PAYPAL_CHECKOUT_ENABLED) {
  if (!enabled) throw new Error('PayPal desactivado temporalmente. No se realizará ningún cobro.');
}