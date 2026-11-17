import { createServerFn } from '@tanstack/react-start';
import { setResponseHeader } from '@tanstack/react-start/server';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { z } from 'zod';
const input = z.object({ institution: z.string().uuid(), action: z.enum(['settings','credential','coverage','operator','session','attendance','correct_attendance','lookup','purchase','deliver','confirm_purchase']), values: z.record(z.union([z.string().max(250), z.number().int().nonnegative(), z.boolean()])) });
export const schoolServiceAction = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).inputValidator((data: unknown) => input.parse(data)).handler(async ({ data, context }) => {
  setResponseHeader('Cache-Control', 'no-store');
  const { data: result, error } = await context.supabase.rpc('school_service_action', { _inst: data.institution, _action: data.action, _data: data.values });
  if (error) throw new Error(error.message);
  return result;
});