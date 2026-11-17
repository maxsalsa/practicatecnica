import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({ send: vi.fn(), auth: {} }));
vi.mock('@tanstack/react-start', () => ({
  createServerFn: () => ({
    middleware(items: unknown[]) { expect(items).toContain(mocks.auth); return this; },
    inputValidator(validate: (data: unknown) => unknown) { return { handler: (fn: (input: { data: unknown; context: unknown }) => unknown) => async (input: { data: unknown; context: unknown }) => fn({ ...input, data: validate(input.data) }) }; },
  }),
}));
vi.mock('@/integrations/supabase/auth-middleware', () => ({ requireSupabaseAuth: mocks.auth }));
vi.mock('@/lib/email-templates/send-email', () => ({ sendTemplateEmail: mocks.send }));
import { sendInvite } from './invite.functions';

const invoke = sendInvite as unknown as (input: unknown) => Promise<unknown>;
function request({ admin = true, roleError = null, student = [], teacher = [], studentError = null, teacherError = null, email = 'registered@example.invalid' }: {
  admin?: boolean | null; roleError?: unknown; student?: { email: string }[]; teacher?: { email: string }[];
  studentError?: unknown; teacherError?: unknown; email?: string;
} = {}) {
  const rpc = vi.fn().mockResolvedValue({ data: admin, error: roleError });
  const eq = vi.fn();
  const from = vi.fn((table: string) => ({ select: () => ({ eq: (column: string, value: string) => {
    eq(table, column, value);
    return { limit: async () => table === 'students' ? { data: student, error: studentError } : { data: teacher, error: teacherError } };
  } }) }));
  return { input: { data: { email }, context: { userId: 'caller', supabase: { rpc, from } } }, rpc, from, eq };
}
beforeEach(() => { mocks.send.mockReset().mockResolvedValue({ sent: true }); });
describe('invitation recipient authorization', () => {
  it.each([false, null])('rejects a caller without a verified admin role (%s)', async admin => {
    const r = request({ admin });
    await expect(invoke(r.input)).rejects.toThrow('Solo administradores');
    expect(r.from).not.toHaveBeenCalled();
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it('fails closed on role lookup errors even if data says admin', async () => {
    await expect(invoke(request({ roleError: {} }).input)).rejects.toThrow('Solo administradores');
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it('rejects arbitrary addresses supplied by an admin', async () => {
    await expect(invoke(request().input)).rejects.toThrow('previamente registrados');
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it.each(['studentError', 'teacherError'] as const)('fails closed on %s', async field => {
    await expect(invoke(request({ student: [{ email: 'registered@example.invalid' }], [field]: {} }).input)).rejects.toThrow('previamente registrados');
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it('rejects unrelated stored recipients', async () => {
    await expect(invoke(request({ student: [{ email: 'other@example.invalid' }] }).input)).rejects.toThrow('previamente registrados');
    expect(mocks.send).not.toHaveBeenCalled();
  });
  it.each(['student', 'teacher'] as const)('allows a registered %s and sends only to the matched stored address', async field => {
    const r = request({ [field]: [{ email: 'registered@example.invalid' }], email: ' Registered@Example.Invalid ' });
    await expect(invoke(r.input)).resolves.toEqual({ sent: true });
    expect(r.rpc).toHaveBeenCalledWith('has_role', { _user_id: 'caller', _role: 'admin' });
    expect(r.eq).toHaveBeenCalledWith('students', 'email', 'registered@example.invalid');
    expect(r.eq).toHaveBeenCalledWith('teacher_access', 'email', 'registered@example.invalid');
    expect(mocks.send).toHaveBeenCalledExactlyOnceWith('invitacion', 'registered@example.invalid', {
      templateData: { inviter: 'pracTICAtecnica.com' },
      idempotencyKey: `invitacion-registered@example.invalid-${new Date().toISOString().slice(0, 10)}`,
    });
  });
  it.each(['not-an-email', 'a'.repeat(256) + '@example.invalid'])('rejects invalid or oversized input', async email => {
    const r = request({ email });
    await expect(invoke(r.input)).rejects.toThrow();
    expect(r.rpc).not.toHaveBeenCalled();
    expect(mocks.send).not.toHaveBeenCalled();
  });
});