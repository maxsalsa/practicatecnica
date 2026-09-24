import { beforeEach, describe, expect, it } from 'vitest';
import { createHmac, randomBytes } from 'node:crypto';
import { seal, unseal, temporaryPassword, normalizeEmail, canonicalUrl, canonicalTokenUrl, verifyWebhookSignature, escapeHtml } from '../src/lib/server/auth-crypto';
beforeEach(() => { process.env.MAIL_ENCRYPTION_KEY = randomBytes(32).toString('base64'); process.env.APP_URL = 'https://practicatecnica.example'; });
describe('credential encryption and safe links', () => {
  it('encrypts, authenticates and round trips temporary credentials', () => {
    const ciphertext = seal({ password: 'temporary-fixture-only' }, 'registration'); expect(ciphertext).not.toContain('temporary-fixture-only'); expect(unseal(ciphertext, 'registration')).toEqual({ password: 'temporary-fixture-only' });
  });
  it('binds ciphertext to purpose; mail ciphertext cannot become a credential', () => { const value = seal({ password: 'fixture' }, 'outbox'); expect(() => unseal(value, 'registration')).toThrow(); });
  it('rejects modified authentication tags', () => { const parts = seal({ password: 'fixture' }, 'registration').split('.'); parts[2] = randomBytes(16).toString('base64url'); expect(() => unseal(parts.join('.'), 'registration')).toThrow(); });
  it('rejects a missing encryption key', () => { delete process.env.MAIL_ENCRYPTION_KEY; expect(() => seal({}, 'outbox')).toThrow(); });
  it('generates independent 144-bit temporary credentials', () => { const values = Array.from({ length: 100 }, temporaryPassword); expect(new Set(values).size).toBe(100); expect(values.every(value => /^[A-Za-z0-9_-]{24}$/.test(value))).toBe(true); });
  it('normalizes spacing and case without changing dot or plus semantics', () => { expect(normalizeEmail('  Max.Salazar+QA@MEP.GO.CR ')).toBe('max.salazar+qa@mep.go.cr'); });
  it('uses fragments so verification tokens never reach GET access logs', () => { const url = new URL(canonicalTokenUrl('/verificar', { token_hash: 'fixture-secret', registration_id: 'fixture-id' })); expect(url.search).toBe(''); expect(url.hash).toContain('token_hash=fixture-secret'); });
  it('refuses external redirect origins and insecure production origins', () => { expect(() => canonicalUrl('https://attacker.example')).toThrow(); process.env.APP_URL = 'http://practicatecnica.example'; expect(() => canonicalUrl('/')).toThrow(); });
  it('escapes personal names and URL text in email HTML', () => { expect(escapeHtml('<img onerror="x">&')).toBe('&lt;img onerror=&quot;x&quot;&gt;&amp;'); });
});
describe('signed email delivery evidence', () => {
  const body = JSON.stringify({ type: 'email.delivered', data: { email_id: 'fixture' } });
  function fixture(timestamp: number) { const secret = randomBytes(32); const id = 'msg_fixture'; const signature = createHmac('sha256', secret).update(`${id}.${timestamp}.${body}`).digest('base64'); return { secret: `whsec_${secret.toString('base64')}`, headers: new Headers({ 'svix-id': id, 'svix-timestamp': String(timestamp), 'svix-signature': `v1,${signature}` }) }; }
  it('accepts valid signed raw bytes', () => { const now = Date.now(); const { secret, headers } = fixture(Math.floor(now / 1000)); expect(verifyWebhookSignature(body, headers, secret, now)).toBe('msg_fixture'); });
  it('rejects a changed body even if its JSON meaning is identical', () => { const now = Date.now(); const { secret, headers } = fixture(Math.floor(now / 1000)); expect(() => verifyWebhookSignature(`${body} `, headers, secret, now)).toThrow(); });
  it('rejects replay beyond five minutes and unsigned events', () => { const now = Date.now(); const { secret, headers } = fixture(Math.floor(now / 1000) - 301); expect(() => verifyWebhookSignature(body, headers, secret, now)).toThrow(); expect(() => verifyWebhookSignature(body, new Headers(), secret, now)).toThrow(); });
});
