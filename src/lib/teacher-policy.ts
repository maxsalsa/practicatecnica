export function teacherToolsAllowed(input: { roles: string[]; trialEnds: string; payments: { plan: string; status: string; expires_at: string }[]; blocked: boolean; institutionalTeacher?: boolean }, now = Date.now()) {
  if (input.blocked) return false;
  if (input.roles.includes('admin')) return true;
  if (!input.roles.includes('teacher')) return false;
  return Date.parse(input.trialEnds) > now || input.institutionalTeacher === true || input.payments.some(p => p.plan === 'docente' && p.status === 'confirmed' && Date.parse(p.expires_at) > now);
}
