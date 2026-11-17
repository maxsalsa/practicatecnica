import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ROLE_LABELS } from '@/lib/institutions';

export function InstitutionRolesPanel({ institutionId }: { institutionId }) {
  const cache = useQueryClient();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('docente');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const members = useQuery({ queryKey: ['lead-members', institutionId], queryFn () => {
    const r = await supabase.rpc('lead_institution_members', { _inst });
    if (r.error) throw new Error('No tiene permiso para administrar estos usuarios.');
    return r.data;
  }});
  async function assign(e) {
    e.preventDefault(); setBusy(true); setMessage('');
    try {
      const r = await supabase.rpc('lead_set_institution_member', { _inst, _email: email.trim(), _role });
      if (r.error) throw new Error(r.error.message);
      setMessage('Rol institucional asignado y registrado.'); setEmail('');
      await cache.invalidateQueries({ queryKey: ['lead-members', institutionId] });
    } catch (e) { setMessage(e instanceof Error ? e.message : 'No se pudo asignar.'); }
    finally { setBusy(false); }
  }
  return <section className="space-y-4"><h2 className="text-2xl font-black">Roles institucionales</h2>
    <form onSubmit={assign} className="grid gap-3 sm:grid-cols-[1fr_auto_auto] sm:items-end">
      <label>Gmail confirmado<input aria-label="Gmail del usuario" type="email" required value={email} onChange={e => setEmail(e.target.value)} className="block w-full rounded-md border border-border bg-background p-2" /></label>
      <label>Rol<select aria-label="Rol institucional" value={role} onChange={e => setRole(e.target.value)} className="block rounded-md border border-border bg-background p-2">{(Object.keys(ROLE_LABELS)).map(r => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}</select></label>
      <Button type="submit" disabled={busy}>{busy ? 'Asignando…' : 'Asignar rol'}</Button>
    </form>
    {message && <p role="status">{message}</p>}
    {members.isPending ? <p>Cargando usuarios…</p> : members.isError ? <p role="alert">{members.error.message}</p> : <ul className="divide-y divide-border">{members.data.map(m => <li key={m.user_id} className="py-3"><strong>{m.display_name || m.email}</strong><span className="block text-sm text-muted-foreground">{m.email} · {ROLE_LABELS[m.member_role]}</span></li>)}</ul>}
  </section>;
}