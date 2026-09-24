import { beforeEach, describe, expect, it, vi } from 'vitest';
import { randomBytes } from 'node:crypto';
const mocks = vi.hoisted(() => ({ store: vi.fn(), enqueue: vi.fn(), welcome: vi.fn(), dispatch: vi.fn(), generateLink: vi.fn(), listUsers: vi.fn(), getUserById: vi.fn(), verifyOtp: vi.fn(), signOut: vi.fn(), platform: vi.fn(), userClient: vi.fn() }));
vi.mock('../src/lib/server/auth-store', () => ({ authStore: mocks.store }));
vi.mock('../src/lib/server/mail', () => ({ enqueueMail: mocks.enqueue, enqueueWelcome: mocks.welcome, tryDispatchMail: mocks.dispatch, buildMail: (_kind: string, value: any) => value }));
vi.mock('../src/lib/server/supabase', () => ({
  createAdminClient: () => ({ rpc: mocks.platform, auth: { admin: { generateLink: mocks.generateLink, listUsers: mocks.listUsers, getUserById: mocks.getUserById } } }),
  createIsolatedClient: () => ({ auth: { verifyOtp: mocks.verifyOtp, signOut: mocks.signOut } }),
  createUserClient: mocks.userClient, isConfigured: () => true, env: (key: string, fallback?: string) => process.env[key] ?? fallback,
}));
import { handleAuth, reconcileRegistrations } from '../src/lib/server/auth';
import { seal, tokenDigest, unseal } from '../src/lib/server/auth-crypto';
const registrationId = '30000000-0000-4000-8000-000000000001'; const userId = '10000000-0000-4000-8000-000000000001'; const lease = '40000000-0000-4000-8000-000000000001'; const token = 'fixture-token-hash-long-enough';
const fixtureInput = { email: 'max.salazar.sanchez@mep.go.cr', name: 'Max Salazar', group: '12-3', specialty: '3006', consent: true };
const request = (body: unknown, method = 'POST') => new Request('http://localhost:3000/api/auth/register', { method, headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:3000' }, ...(method === 'POST' ? { body: JSON.stringify(body) } : {}) });
beforeEach(() => {
  vi.clearAllMocks(); process.env.APP_URL = 'http://localhost:3000'; process.env.MAIL_ENCRYPTION_KEY = randomBytes(32).toString('base64');
  mocks.platform.mockResolvedValue({ data: { registrationOpen: true, privacyReady: true }, error: null }); mocks.listUsers.mockResolvedValue({ data: { users: [] }, error: null });
  mocks.generateLink.mockResolvedValue({ data: { user: { id: userId }, properties: { hashed_token: token } }, error: null });
  mocks.enqueue.mockResolvedValue({ id: 'job', state: 'queued' }); mocks.dispatch.mockResolvedValue({ processed: 1, accepted: 1 }); mocks.signOut.mockResolvedValue({ error: null });
});
describe('registration and verification transitions', () => {
  it('sends only verification before confirmation, keeping the assigned password stable', async () => {
    const credential = seal({ password: 'Same-temporary-fixture' }, 'registration');
    const registration = { id: registrationId, email: fixtureInput.email, name: fixtureInput.name, group_name: fixtureInput.group, specialty_code: fixtureInput.specialty, credential_cipher: credential, lease_token: lease, state: 'provisioning', user_id: null };
    mocks.store.mockImplementation(async (action: string) => action === 'rate' ? { allowed: true } : action === 'registration_reserve' ? registration : action === 'registration_link' ? { ...registration, user_id: userId, verification_expires_at: new Date(Date.now()+3600000).toISOString() } : {});
    const response = await handleAuth('register', request(fixtureInput)); expect(response.status).toBe(202);
    expect(mocks.generateLink).toHaveBeenCalledWith(expect.objectContaining({ type: 'signup', password: 'Same-temporary-fixture', email: fixtureInput.email }));
    expect(mocks.enqueue).toHaveBeenCalledWith(expect.objectContaining({ kind: 'verification' })); expect(mocks.welcome).not.toHaveBeenCalled();
    const link = mocks.enqueue.mock.calls[0][0].payload.url; expect(new URL(link).search).toBe(''); expect(new URL(link).hash).toContain('token_hash=');
  });
  it('retains existing registered data and does not rotate an active account', async () => {
    mocks.store.mockImplementation(async (action: string) => action === 'rate' ? { allowed: true } : action === 'registration_reserve' ? { existing: true, state: 'active' } : {});
    await handleAuth('register', request(fixtureInput)); expect(mocks.generateLink).not.toHaveBeenCalled(); expect(mocks.enqueue).not.toHaveBeenCalled();
  });
  it('does not adopt a preexisting unknown native identity', async () => {
    mocks.store.mockImplementation(async (action: string) => action === 'rate' ? { allowed: true } : action === 'registration_reserve' ? { id: registrationId, user_id: null, lease_token: lease } : {});
    mocks.listUsers.mockResolvedValue({ data: { users: [{ id: userId, email: fixtureInput.email }] }, error: null });
    await expect(handleAuth('register', request(fixtureInput))).rejects.toMatchObject({ code: 'REGISTRATION_RECONCILIATION' }); expect(mocks.generateLink).not.toHaveBeenCalled();
  });
  it('reconciles its own interrupted Auth creation using a MAC-bound durable intent without rotating the password', async () => {
    const credential = seal({ password: 'Stable-password-before-timeout' }, 'registration');
    const registration = { id: registrationId, email: fixtureInput.email, name: fixtureInput.name, group_name: fixtureInput.group, specialty_code: fixtureInput.specialty, credential_version: 1, credential_cipher: credential, lease_token: lease, state: 'provisioning', user_id: null };
    let failLink = true;
    mocks.store.mockImplementation(async (action: string) => { if (action === 'rate') return { allowed: true }; if (action === 'registration_reserve') return registration; if (action === 'registration_link') { if (failLink) throw new Error('Database response interrupted after Auth creation'); return { ...registration, user_id: userId, verification_expires_at: new Date(Date.now()+3600000).toISOString() }; } return {}; });
    await expect(handleAuth('register', request(fixtureInput))).rejects.toThrow('interrupted'); const proof = mocks.generateLink.mock.calls[0][0].options.data;
    mocks.listUsers.mockResolvedValue({ data: { users: [{ id: userId, email: fixtureInput.email, email_confirmed_at: null, user_metadata: proof }] }, error: null }); failLink = false;
    await expect(handleAuth('register', request(fixtureInput))).resolves.toHaveProperty('status', 202);
    expect(mocks.generateLink.mock.calls.map(call => call[0].password)).toEqual(['Stable-password-before-timeout','Stable-password-before-timeout']); expect(mocks.enqueue).toHaveBeenCalledTimes(1);
  });
  it('rejects forged metadata markers when an unknown Auth user collides', async () => {
    const registration = { id: registrationId, email: fixtureInput.email, credential_version: 1, credential_cipher: seal({ password: 'fixture-password' }, 'registration'), lease_token: lease, user_id: null };
    mocks.store.mockImplementation(async (action: string) => action === 'rate' ? { allowed: true } : action === 'registration_reserve' ? registration : {});
    mocks.listUsers.mockResolvedValue({ data: { users: [{ id: userId, email: fixtureInput.email, user_metadata: { practicatecnica_registration: registrationId, practicatecnica_receipt: 'forged' } }] }, error: null });
    await expect(handleAuth('register', request(fixtureInput))).rejects.toMatchObject({ code: 'REGISTRATION_RECONCILIATION' }); expect(mocks.generateLink).not.toHaveBeenCalled();
  });
  it('requires both production readiness flags before public registration', async () => {
    mocks.store.mockResolvedValue({ allowed: true }); mocks.platform.mockResolvedValue({ data: { registrationOpen: true, privacyReady: false }, error: null });
    await expect(handleAuth('register', request(fixtureInput))).rejects.toMatchObject({ code: 'REGISTRATION_CLOSED' }); expect(mocks.generateLink).not.toHaveBeenCalled();
  });
  it('accepts whitespace-trimmed institutional emails', async () => {
    mocks.store.mockImplementation(async (action: string) => action === 'rate' ? { allowed: true } : { existing: true });
    await handleAuth('register', request({ ...fixtureInput, email: '  Max.Salazar.Sanchez@MEP.GO.CR  ' }));
    const reservation = mocks.store.mock.calls.find(call => call[0] === 'registration_reserve')![1]; expect(reservation.email).toBe(fixtureInput.email); expect(unseal<{ password: string }>(reservation.credential_cipher, 'registration').password.length).toBe(24);
  });
  it('consumes verification only with correct context and enqueues the stable welcome afterward', async () => {
    const registration = { id: registrationId, user_id: userId, email: fixtureInput.email, state: 'pending_email', verification_digest: tokenDigest(token), verification_expires_at: new Date(Date.now()+3600000).toISOString() };
    mocks.store.mockImplementation(async (action: string) => action === 'rate' ? { allowed: true } : action === 'registration_get' ? registration : action === 'registration_verified' ? { ...registration, state: 'verified' } : {});
    mocks.verifyOtp.mockResolvedValue({ data: { user: { id: userId, email: fixtureInput.email, email_confirmed_at: new Date().toISOString() }, session: { fixture: true } }, error: null });
    await handleAuth('verify-email', request({ token_hash: token, registration_id: registrationId })); expect(mocks.verifyOtp).toHaveBeenCalledWith({ token_hash: token, type: 'email' });
    expect(mocks.welcome).toHaveBeenCalledWith(expect.objectContaining({ state: 'verified' })); expect(mocks.signOut).toHaveBeenCalledWith({ scope: 'local' }); expect(mocks.userClient).not.toHaveBeenCalled();
  });
  it('does not consume a mismatched verification token', async () => {
    mocks.store.mockImplementation(async (action: string) => action === 'rate' ? { allowed: true } : { verification_digest: 'different' });
    await expect(handleAuth('verify-email', request({ token_hash: token, registration_id: registrationId }))).rejects.toMatchObject({ code: 'LINK_INVALID' }); expect(mocks.verifyOtp).not.toHaveBeenCalled();
  });
  it('does not allow a GET to trigger verification or signup', async () => { await expect(handleAuth('verify-email', request({}, 'GET'))).rejects.toMatchObject({ code: 'METHOD_NOT_ALLOWED' }); expect(mocks.verifyOtp).not.toHaveBeenCalled(); });
  it('the combined recovery entry resends verification for a still-pending account', async () => {
    const registration = { id: registrationId, user_id: userId, email: fixtureInput.email, name: fixtureInput.name, group_name: fixtureInput.group, specialty_code: fixtureInput.specialty, credential_cipher: seal({ password: 'Stable-pending-temporary' }, 'registration'), credential_version: 1, lease_token: lease, state: 'pending_email' };
    mocks.store.mockImplementation(async (action: string) => { if (action === 'rate') return { allowed: true }; if (action === 'account_get') return { user_id: userId, state: 'pending_email' }; if (action === 'registration_get' || action === 'registration_reserve') return registration; if (action === 'registration_link') return { ...registration, verification_expires_at: new Date(Date.now()+3600000).toISOString() }; return {}; });
    const response = await handleAuth('recover', request({ email: fixtureInput.email })); expect(response.status).toBe(202);
    expect(mocks.generateLink).toHaveBeenCalledWith(expect.objectContaining({ type: 'signup', password: 'Stable-pending-temporary' })); expect(mocks.enqueue).toHaveBeenCalledWith(expect.objectContaining({ kind: 'verification' }));
  });
  it('a broken registration does not poison reconciliation of other mail recipients', async () => {
    mocks.store.mockImplementation(async (action: string, payload: any) => { if (action === 'reconcile_registrations') return [{ id: 'first', user_id: 'first', email: 'one@example.test' }, { id: 'second', user_id: 'second', email: 'two@example.test' }]; if (action === 'email_reconcile') return []; if (action === 'registration_verified' && payload.id === 'first') throw new Error('Concurrent disable'); return { id: payload.id, state: 'verified' }; });
    mocks.getUserById.mockImplementation(async (id: string) => ({ data: { user: { id, email: id === 'first' ? 'one@example.test' : 'two@example.test', email_confirmed_at: '2026-09-24' } }, error: null }));
    await expect(reconcileRegistrations()).resolves.toBeUndefined(); expect(mocks.welcome).toHaveBeenCalledWith(expect.objectContaining({ id: 'second' }));
  });
});
