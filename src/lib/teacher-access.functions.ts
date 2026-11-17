import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { teacherToolsAllowed } from './teacher-policy';

export const readTeacherAccess = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc('can_use_teacher_tools');
    if (error) throw new Error('No se pudo verificar el acceso docente.');
    if (data !== true) return false;
    const [roles, access, payments, memberships] = await Promise.all([
      context.supabase.from('user_roles').select('role').eq('user_id', context.userId),
      context.supabase.rpc('my_access'),
      context.supabase.from('payments').select('plan,status,expires_at').eq('user_id', context.userId).eq('plan', 'docente').eq('status', 'confirmed'),
      context.supabase.rpc('my_institutions'),
    ]);
    const current = access.data?.[0];
    if (roles.error || access.error || payments.error || memberships.error || !current) throw new Error('No se pudo verificar el plan docente.');
    return teacherToolsAllowed({ roles: (roles.data ?? []).map(r => r.role), trialEnds: current.trial_ends, payments: payments.data ?? [], blocked: ['blocked', 'inactive'].includes(current.status), institutionalTeacher: (memberships.data ?? []).some(m => ['docente', 'direccion'].includes(m.member_role) && !!m.paid_until && Date.parse(m.paid_until) > Date.now()) });
  });