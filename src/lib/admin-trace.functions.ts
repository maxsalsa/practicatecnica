import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { z } from 'zod';
import type { Trace } from './admin-trace';
export const getAdminTrace = createServerFn({method:'POST'})
  .middleware([requireSupabaseAuth])
  .inputValidator((data:unknown) => z.object({environment:z.enum(['live','sandbox'])}).parse(data))
  .handler(async ({data,context}) => {
    const result = await context.supabase.rpc('admin_user_trace',{_environment:data.environment});
    if(result.error) throw new Error('No se pudo cargar el seguimiento.');
    return result.data as unknown as Trace;
  });