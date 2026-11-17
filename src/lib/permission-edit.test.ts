import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
const sql = readFileSync('drizzle/migrations/0088_edit_pending_permission.sql','utf8');
it('requires caller ownership before allowing pending edits',()=>{
  expect(sql).toMatch(/r\.requester_id IS DISTINCT FROM auth\.uid\(\)/);
  expect(sql).toMatch(/r\.status<>'pendiente'/);
});
it('records previous and new values before updating the request',()=>{
  expect(sql.indexOf('INSERT INTO public.permission_edit_history')).toBeGreaterThan(0);
  expect(sql.indexOf('UPDATE public.staff_permission_requests')).toBeGreaterThan(sql.indexOf('INSERT INTO public.permission_edit_history'));
  expect(sql).toContain('FROM PUBLIC,anon');
});