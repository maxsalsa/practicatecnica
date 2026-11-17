import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
const when = (s) => new Date(s).toLocaleString('es-CR', { timeZone: 'America/Costa_Rica', dateStyle: 'medium', timeStyle: 'short' });
const ES, string;
 > ;
{
    active: 'activa', inactive;
    'inactiva', gift;
    'cortesía', suspended;
    'suspendida', pending;
    'pendiente', approved;
    'aprobada', rejected;
    'rechazada', cancelled;
    'cancelada', admin;
    'administración', teacher;
    'docente', student;
    'estudiante';
}
;
const es = (v) => (v ? ES[v] ?? v : );
const str = (e) => { for (const x of k)
    if (e[x] != null)
        return String(e[x]); return null; };
/** Reads existing append-only histories under RLS; never writes or invents events. */
export function AuditLog({ institutionId }) {
    const [kind, setKind] = useState('todos');
    const log = useQuery({
        queryKey: ['audit-log', institutionId],
        queryFn() { }
    });
    {
        const q = (t) => (supabase.from(t).select('*').limit(150)), Promise;
        ;
        ;
        const [p, s, r, i] = await Promise.all([q('permission_request_history'), q('account_status_history'), q('account_role_events'),
            supabase.from('institution_permission_events').select('*').eq('institution_id', institutionId).limit(150), (Promise)]);
        const ov = await supabase.rpc('admin_user_overview');
        const people = new Map();
        ((ov.data ?? [])).forEach(u => { const id = str(u, 'user_id', 'id'); const m = str(u, 'email'); if (id && m)
            people.set(id, m); });
        const who = (id) => (id ? people.get(id) ?? 'Usuario registrado' : 'Sistema');
        const at = (e) => str(e, 'created_at', 'changed_at') ?? '';
        const rows = [
            ...(p.data ?? []).map(e => ({ at: at(e), kind: 'Permisos', action: `Solicitud ${es(str(e, 'from_status', 'previous_status')) ?? 'nueva'} → ${es(str(e, 'to_status', 'status', 'action')) ?? 'actualizada'}`, actor: who(str(e, 'changed_by', 'actor_id')), subject })),
            ...(s.data ?? []).map(e => ({ at: at(e), kind: 'Cuentas', action: `Estado ${es(str(e, 'previous_status')) ?? 'inicial'} → ${es(str(e, 'status', 'new_status')) ?? 'actualizado'}`, actor: who(str(e, 'changed_by', 'actor_id')), subject: who(str(e, 'user_id')) })),
            ...(r.data ?? []).map(e => ({ at: at(e), kind: 'Roles de cuenta', action: `Rol → ${es(str(e, 'new_role')) ?? 'actualizado'}`, actor: who(str(e, 'actor_id', 'changed_by')), subject: who(str(e, 'user_id')) })),
            ...(i.data ?? []).map(e => ({ at: at(e), kind: 'Accesos', action: `Permiso institucional ${str(e, 'permission', 'capability', 'action') ?? 'actualizado'}`, actor: who(str(e, 'actor_id', 'changed_by')), subject: who(str(e, 'user_id')) })),
        ].filter(e => e.at).sort((a, b) => b.at.localeCompare(a.at));
        return rows;
    }
}
;
const shown = (log.data ?? []).filter(e => kind === 'todos' || e.kind === kind);
return <section className="mt-6 space-y-3">
    <h3 className="text-lg font-extrabold">Permisos, accesos y cuentas</h3>
    <label className="block text-sm font-semibold">Tipo<select value={kind} onChange={e => setKind(e.target.value)} className="mt-1 w-full rounded-md border border-border bg-background p-2"><option value="todos">Todos</option><option>Permisos</option><option>Accesos</option><option>Cuentas</option><option>Roles de cuenta</option></select></label>
    {log.isPending ? <p role="status">Cargando…</p> : log.isError ? <p role="alert" className="text-destructive">No se pudo cargar la bitácora.</p> : !shown.length ? <p className="text-muted-foreground">Sin registros.</p> :
        <ul className="divide-y divide-border rounded-2xl border border-border bg-card text-sm">{shown.map((e, n) => <li key={n} className="p-3"><p className="font-semibold">{e.kind}: {e.action}</p><p className="break-words text-muted-foreground">{when(e.at)} · por {e.actor}{e.subject ? ` · cuenta ${e.subject}` : ''}</p></li>)}</ul>}
  </section>;
