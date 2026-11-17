import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAccount } from '@/components/AccountProvider';
import { Button } from '@/components/ui/button';
import { AUDIENCE_LABELS, KIND_LABELS, canPublish } from '@/lib/institutions';
const field = 'mt-1 w-full rounded-xl border border-border bg-background px-3 py-2';
const fmt = (d) => new Date(d).toLocaleString('es-CR', { timeZone: 'America/Costa_Rica', dateStyle: 'medium', timeStyle: 'short' });
export function AnnouncementsPanel({ institutionId, role }) {
    const { user } = useAccount();
    const queries = useQueryClient();
    const publisher = canPublish(role);
    const list = useQuery({
        queryKey: ['announcements', institutionId], enabled: !!user,
        queryFn() { }
    });
    {
        const { data, error } = await supabase.from('institution_announcements').select('*').eq('institution_id', institutionId).order('created_at', { ascending }).limit(60);
        if (error)
            throw new Error('No se pudieron cargar los avisos.');
        return data;
    }
}
;
const ids = (list.data ?? []).map(a => a.id);
const reads = useQuery({
    queryKey: ['announcement-reads', institutionId, user?.id, ids.join(',')], enabled: !!user && ids.length > 0,
    queryFn() { }
});
{
    const { data, error } = await supabase.from('announcement_reads').select('announcement_id').eq('user_id', user.id).in('announcement_id', ids);
    if (error)
        throw new Error('No se pudo consultar la lectura.');
    return new Set(data.map(r => r.announcement_id));
}
;
const delivery = useQuery({
    queryKey: ['announcement-delivery', institutionId], enabled: !!user && publisher,
    queryFn() { }
});
{
    const { data, error } = await supabase.rpc('announcement_delivery', { _inst });
    if (error)
        throw new Error('No se pudo consultar la entrega.');
    return new Map(data.map(d => [d.announcement_id, d]));
}
;
const [form, setForm] = useState({ kind: 'actividad', audience: 'todos', title: '', body: '', eventAt: '' });
const [busy, setBusy] = useState(false);
async function publish(e) {
    e.preventDefault();
    if (!user)
        return;
    setBusy(true);
    const { error } = await supabase.from('institution_announcements').insert({
        institution_id, kind: form.kind, audience: form.audience, title: form.title.trim(), body: form.body.trim(),
        event_at: form.eventAt ? new Date(`${form.eventAt}:00-06:00`).toISOString() : null, created_by: user.id,
    });
    setBusy(false);
    if (error) {
        toast.error('No se pudo publicar el aviso. Revise los campos.');
        return;
    }
    toast.success('Aviso publicado para ' + AUDIENCE_LABELS[form.audience].toLowerCase() + '.');
    setForm(f => ({ ...f, title: '', body: '', eventAt: '' }));
    void queries.invalidateQueries({ queryKey: ['announcements', institutionId] });
    void queries.invalidateQueries({ queryKey: ['announcement-delivery', institutionId] });
}
async function confirmRead(id) {
    if (!user)
        return;
    const { error } = await supabase.from('announcement_reads').insert({ announcement_id, user_id: user.id });
    if (error && error.code !== '23505') {
        toast.error('No se pudo confirmar la lectura.');
        return;
    }
    void queries.invalidateQueries({ queryKey: ['announcement-reads', institutionId] });
    void queries.invalidateQueries({ queryKey: ['announcement-delivery', institutionId] });
}
async function remove(id) {
    if (!window.confirm('¿Eliminar este aviso para todas las personas?'))
        return;
    const { error } = await supabase.from('institution_announcements').delete().eq('id', id);
    if (error) {
        toast.error('No se pudo eliminar.');
        return;
    }
    void queries.invalidateQueries({ queryKey: ['announcements', institutionId] });
}
return <div className="space-y-6">
    {publisher && <form onSubmit={publish} className="rounded-2xl border border-border bg-card p-5">
      <h3 className="text-lg font-extrabold">Publicar aviso</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-semibold">Tipo
          <select className={field} value={form.kind} onChange={e => setForm({ ...form, kind: e.target.value })}>
            {(Object.keys(KIND_LABELS)).map(k => <option key={k} value={k}>{KIND_LABELS[k]}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold">Destinatarios
          <select className={field} value={form.audience} onChange={e => setForm({ ...form, audience: e.target.value })}>
            {(Object.keys(AUDIENCE_LABELS)).map(k => <option key={k} value={k}>{AUDIENCE_LABELS[k]}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold sm:col-span-2">Título
          <input required minLength={3} maxLength={140} className={field} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Ej.: Festival de las Artes"/>
        </label>
        <label className="text-sm font-semibold sm:col-span-2">Mensaje
          <textarea required minLength={3} maxLength={2000} rows={4} className={field} value={form.body} onChange={e => setForm({ ...form, body: e.target.value })}/>
        </label>
        <label className="text-sm font-semibold">Fecha y hora del evento, hora de Costa Rica (opcional)
          <input type="datetime-local" className={field} value={form.eventAt} onChange={e => setForm({ ...form, eventAt: e.target.value })}/>
        </label>
      </div>
      <Button type="submit" className="mt-4" disabled={busy}>{busy ? 'Publicando…' : 'Publicar aviso'}</Button>
      <p className="mt-2 text-xs text-muted-foreground">El aviso aparece en la bandeja de cada destinatario dentro del sitio. La confirmación de lectura muestra quién ya lo abrió; no es una notificación al teléfono.</p>
    </form>}

    <section aria-labelledby="inbox-title">
      <h3 id="inbox-title" className="text-lg font-extrabold">Bandeja de avisos</h3>
      {list.isPending ? <p role="status" className="mt-3">Cargando avisos…</p> : list.isError ? <p role="alert" className="mt-3 text-destructive">{list.error.message}</p> : !list.data.length ? <p className="mt-3 text-muted-foreground">No hay avisos publicados para usted.</p> :
        <ul className="mt-3 space-y-3">{list.data.map(a => {
                const read = reads.data?.has(a.id);
                const d = delivery.data?.get(a.id);
                return <li key={a.id} className={`rounded-2xl border bg-card p-4 ${read ? 'border-border' : 'border-primary'}`}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-xs font-bold text-accent">{KIND_LABELS[a.kind ?? a.kind]} · {AUDIENCE_LABELS[a.audience ?? a.audience]}</p>
                <h4 className="mt-1 text-lg font-black">{a.title}</h4>
              </div>
              {!read && <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">Nuevo</span>}
            </div>
            <p className="mt-2 whitespace-pre-line text-sm">{a.body}</p>
            <p className="mt-2 text-xs text-muted-foreground">{a.event_at ? `Evento: ${fmt(a.event_at)} · ` : ''}Publicado: {fmt(a.created_at)}</p>
            {d && <p className="mt-2 text-xs font-semibold">Lectura confirmada {d.staff_reads}/{d.staff_recipients} · estudiantes {d.student_reads}/{d.student_recipients}</p>}
            <div className="mt-3 flex flex-wrap gap-2">
              {read ? <span className="text-sm font-semibold text-primary">✓ Lectura confirmada</span> : <Button size="sm" onClick={() => void confirmRead(a.id)}>Confirmar lectura</Button>}
              {publisher && <Button size="sm" variant="outline" onClick={() => void remove(a.id)}>Eliminar</Button>}
            </div>
          </li>;
            })}</ul>}
    </section>
  </div>;
