import { createServerFn } from '@tanstack/react-start';
import { setResponseHeader } from '@tanstack/react-start/server';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { parsePickupCode } from './pickup-code';
import { pickupIsAuthorized } from './enrollment-document';

export const lookupPickup = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { code: string }) => {
    const code = parsePickupCode(typeof input?.code === 'string' ? input.code : '');
    if (!code) throw new Error('Código no reconocido.');
    return code;
  })
  .handler(async ({ data, context }) => {
    setResponseHeader('Cache-Control', 'no-store');
    // Both queries use the caller's RLS: only their family or authorized reviewers.
    let query = context.supabase.from('student_pickup_authorizations').select('id,request_id,name,relation,status,reviewed_at');
    if (data.kind === 'pickup') query = query.eq('id', data.value);
    else query = query.eq('identification', data.value);
    const { data: authorizations, error } = await query.limit(10);
    if (error) throw new Error('No se pudo consultar.');
    const results = [];
    for (const a of authorizations ?? []) {
      const { data: enrollment, error: readError } = await context.supabase.from('enrollment_requests').select('student_name,level,status').eq('id', a.request_id).maybeSingle();
      if (readError) throw new Error('No se pudo consultar.');
      if (!enrollment) continue;
      results.push({ id: a.id, name: a.name, relation: a.relation, student: enrollment.student_name, level: enrollment.level, status: a.status, authorized: pickupIsAuthorized(enrollment.status, a.status), reviewedAt: a.reviewed_at });
    }
    return { results, checkedAt: new Date().toISOString() };
  });