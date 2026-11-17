import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { KIND_LABELS, PERMISSION_KIND_LABELS, type AnnouncementKind, type PermissionKind } from '@/lib/institutions';
import { downloadIcs, icsEvent } from '@/lib/calendar';

const dayKey = (d: string) => new Date(d).toLocaleDateString('en-CA', { timeZone: 'America/Costa_Rica' });
const dayTitle = (k: string) => { const t = new Date(`${k}T12:00:00Z`).toLocaleDateString('es-CR', { timeZone: 'America/Costa_Rica', weekday: 'long', day: 'numeric', month: 'long' }); return t.charAt(0).toUpperCase() + t.slice(1); };
const hour = (d: string) => new Date(d).toLocaleTimeString('es-CR', { timeZone: 'America/Costa_Rica', hour: 'numeric', minute: '2-digit' });

/** Upcoming dated notices (meetings, councils, activities); reviewers also see approved absences. */
export function AgendaPanel({ institutionId, institutionName, reviewer }: { institutionId: string; institutionName: string; reviewer: boolean }) {
  const events = useQuery({
    queryKey: ['agenda', institutionId],
    queryFn: async () => {
      const from = new Date(Date.now() - 12 * 3600000).toISOString();
      const { data, error } = await supabase.from('institution_announcements').select('id,kind,title,body,event_at').eq('institution_id', institutionId).gte('event_at', from).order('event_at').limit(100);
      if (error) throw new Error('No se pudo cargar la agenda.');
      return data;
    },
  });
  const absences = useQuery({
    queryKey: ['agenda-absences', institutionId], enabled: reviewer,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('permission_requests_for_review');
      if (error) throw new Error('No se pudieron cargar las ausencias.');
      const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Costa_Rica' });
      return data.filter(r => r.status === 'aprobado' && r.ends_on >= today && r.institution_name === institutionName).sort((a, b) => a.starts_on.localeCompare(b.starts_on));
    },
  });
  const groups = new Map<string, NonNullable<typeof events.data>>();
  for (const e of events.data ?? []) { if (!e.event_at) continue; const k = dayKey(e.event_at); groups.set(k, [...(groups.get(k) ?? []), e]); }

  return <div className="space-y-6">
    <section>
      <h3 className="text-lg font-extrabold">Próximos eventos</h3>
      <p className="mt-1 text-sm text-muted-foreground">Reuniones, consejos y actividades con fecha. Use «Agregar a mi calendario» para que su teléfono le recuerde un día antes y una hora antes.</p>
      {events.isPending ? <p role="status" className="mt-3">Cargando…</p> : events.isError ? <p role="alert" className="mt-3 text-destructive">{events.error.message}</p> : !groups.size ? <p className="mt-3 text-muted-foreground">No hay eventos próximos. La dirección los agrega al publicar un aviso con fecha.</p> :
        <ol className="mt-3 space-y-4">{[...groups].map(([k, list]) => <li key={k}>
          <p className="text-sm font-black text-primary">{dayTitle(k)}</p>
          <ul className="mt-2 space-y-2">{list.map(e => <li key={e.id} className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-4">
            <div className="min-w-0 flex-1">
              <p className="font-bold">{hour(e.event_at!)} · {e.title}</p>
              <p className="text-xs text-muted-foreground">{KIND_LABELS[e.kind as AnnouncementKind] ?? e.kind}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => downloadIcs(e.title, icsEvent({ uid: e.id, title: e.title, description: e.body, start: new Date(e.event_at!), location: institutionName }))}>📅 Agregar a mi calendario</Button>
          </li>)}</ul>
        </li>)}</ol>}
    </section>
    {reviewer && <section>
      <h3 className="text-lg font-extrabold">Ausencias aprobadas próximas</h3>
      {absences.isPending ? <p role="status" className="mt-3">Cargando…</p> : absences.isError ? <p role="alert" className="mt-3 text-destructive">{absences.error.message}</p> : !absences.data.length ? <p className="mt-3 text-muted-foreground">No hay ausencias aprobadas próximas.</p> :
        <ul className="mt-3 space-y-2">{absences.data.map(r => <li key={r.id} className="rounded-2xl border border-border bg-card p-3 text-sm">
          <span className="font-bold">{r.requester_name || r.requester_email}</span> · {PERMISSION_KIND_LABELS[r.kind as PermissionKind] ?? r.kind} · {dayTitle(r.starts_on)}{r.ends_on !== r.starts_on ? ` al ${dayTitle(r.ends_on)}` : ''}{r.hours ? ` · ${r.hours}` : ''}
        </li>)}</ul>}
    </section>}
  </div>;
}
