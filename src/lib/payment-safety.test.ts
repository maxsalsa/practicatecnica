import { expect, it } from 'vitest';
import { assertPaypalCheckoutEnabled, assertSandboxCheckout } from './payment-safety';
it('blocks live card checkout', () => expect(() => assertSandboxCheckout('live')).toThrow());
it('allows sandbox card checkout', () => expect(() => assertSandboxCheckout('sandbox')).not.toThrow());
it('PayPal checkout is enabled', () => expect(() => assertPaypalCheckoutEnabled()).not.toThrow());
it('PayPal blocks when switched off', () => expect(() => assertPaypalCheckoutEnabled(false)).toThrow());