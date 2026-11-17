import { openPrivateFile } from '@/lib/open-private-file';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAccount } from '@/components/AccountProvider';
import { Button } from '@/components/ui/button';
import { PermissionQr } from './PermissionQr';
import { stripImageMetadata } from '@/lib/image-sanitize';
import { PermissionSupport } from './PermissionSupport';
import {
  ADVANCE_NOTICE_DAYS, JUSTIFICATION_LABELS, PERMISSION_KIND_LABELS, PERMISSION_STATUS_LABELS, ROLE_LABELS, STAFF_PERMISSION_KINDS, STUDENT_PERMISSION_KINDS,
  attachmentExtension, justificationDeadline, justificationState, lateNotice, needsJustification, noticeDays,
  type InstitutionRole, type PermissionKind, type PermissionStatus,
} from '@/lib/institutions';

const field = 'mt-1 w-full rounded-xl border border-border bg-background px-3 py-2';
const day = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString('es-CR', { timeZone: 'America/Costa_Rica', dateStyle: 'medium' });
const when = (d: Date | string) => new Date(d).toLocaleString('es-CR', { timeZone: 'America/Costa_Rica', dateStyle: 'medium', timeStyle: 'short' });
const crToday = () => new Date().toLocaleDateString('en-CA', { timeZone: 'America/Costa_Rica' });
const statusClass: Record<PermissionStatus, string> = { pendiente: 'text-accent', aprobado: 'text-primary', rechazado: 'text-destructive', cancelado: 'text-muted-foreground' };
const kindLabel = (k: string) => PERMISSION_KIND_LABELS[k as PermissionKind] ?? k;

async function openAttachment(path: string) {
  if (!(await openPrivateFile('permission-attachments', path))) toast.error('No se pudo abrir el comprobante.');
}
async function uploadProof(userId: string, original: File): Promise<string | null> {
  const file = await stripImageMetadata(original).catch(() => original);
  const check = attachmentExtension(file);
  if (check.error) { toast.error(check.error); return null; }
  const path = `${userId}/${crypto.randomUUID()}.${check.ext}`;
  const up = await supabase.storage.from('permission-attachments').upload(path, file, { contentType: file.type, upsert: false });
  if (up.error) { toast.error('No se pudo subir el comprobante.'); return null; }
  return path;
}
type Row = { kind: string; starts_on: string; ends_on: string; created_at: string; urgent: boolean; justified_at: string | null; attachment_path: string | null; status: string };
function Deadlines({ r }: { r: Row }) {
  const kind = r.kind as PermissionKind;
  const late = lateNotice(kind, r.starts_on, r.created_at, r.urgent);
  const just = r.status === 'rechazado' || r.status === 'cancelado' ? 'no_aplica' : justificationState({ kind, ends_on: r.ends_on, justified_at: r.justified_at, attachment_path: r.attachment_path });
  return <p className="mt-1 text-xs text-muted-foreground">
    Aviso con {Math.max(0, noticeDays(r.starts_on, r.created_at))} día(s){r.urgent ? ' · Situación imprevista' : ''}{late ? <strong className="text-destructive"> · Aviso tardío (menos de {ADVANCE_NOTICE_DAYS} días)</strong> : ''}
    {just !== 'no_aplica' && <> · <strong className={just === 'vencida' || just === 'tardia' ? 'text-destructive' : just === 'a_tiempo' ? 'text-primary' : ''}>{JUSTIFICATION_LABELS[just]}</strong></>}
  </p>;
}

export function MemberPermissions({ institutionId, role }: { institutionId: string; role: InstitutionRole }) {
  const { user } = useAccount();
  const queries = useQueryClient();
  const kinds = role === 'estudiante' ? STUDENT_PERMISSION_KINDS : STAFF_PERMISSION_KINDS;
  const mine = useQuery({
    queryKey: ['my-permissions', institutionId, user?.id], enabled: !!user,
    queryFn: async () => {
      if (!user) throw new Error('Ingrese primero.');
      const { data, error } = await supabase.from('staff_permission_requests').select('*').eq('institution_id', institutionId).eq('requester_id', user.id).order('created_at', { ascending: false }).limit(100);
      if (error) throw new Error('No se pudieron cargar sus solicitudes.');
      return data;
    },
  });
  const [form, setForm] = useState({ kind: kinds[0] as PermissionKind, startsOn: crToday(), endsOn: crToday(), hours: '', reason: '', urgent: false });
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const late = lateNotice(form.kind, form.startsOn, new Date().toISOString(), form.urgent);
  const refresh = () => { void queries.invalidateQueries({ queryKey: ['my-permissions', institutionId] }); void queries.invalidateQueries({ queryKey: ['permission-review'] }); };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    if (form.endsOn < form.startsOn) { toast.error('La fecha final debe ser igual o posterior al inicio.'); return; }
    setBusy(true);
    try {
      const attachment = file ? await uploadProof(user.id, file) : null;
      if (file && !attachment) return;
      const { error } = editingId ? await supabase.rpc('edit_pending_permission', { _id: editingId, _starts_on: form.startsOn, _ends_on: form.endsOn, _hours: form.hours.trim(), _reason: form.reason.trim(), _urgent: form.urgent }) : await supabase.from('staff_permission_requests').insert({
        institution_id: institutionId, requester_id: user.id, kind: form.kind, starts_on: form.startsOn, ends_on: form.endsOn,
        hours: form.hours.trim() || null, reason: form.reason.trim(), attachment_path: attachment, urgent: form.urgent,
      });
      if (error) { toast.error(/días|estudiantes|institución/.test(error.message) ? error.message : 'No se pudo enviar la solicitud. Revise fechas y motivo.'); return; }
      toast.success(editingId ? 'Solicitud modificada. El cambio quedó registrado.' : 'Solicitud enviada. La dirección la revisará.');
      setEditingId(null);
      setForm(f => ({ ...f, hours: '', reason: '', urgent: false })); setFile(null); refresh();
    } finally { setBusy(false); }
  }
  async function justify(id: string, f: File | undefined) {
    if (!user || !f) return;
    setBusy(true);
    try {
      const path = await uploadProof(user.id, f);
      if (!path) return;
      const { error } = await supabase.rpc('attach_permission_justification', { _id: id, _path: path });
      if (error) { toast.error('No se pudo registrar la justificación.'); return; }
      toast.success('Justificación registrada con fecha y hora.'); refresh();
    } finally { setBusy(false); }
  }
  async function cancel(id: string) {
    const { error } = await supabase.rpc('cancel_permission_request', { _id: id });
    if (error) { toast.error('Solo puede cancelar solicitudes pendientes.'); return; }
    toast.success('Solicitud cancelada.'); refresh();
  }

  return <div className="space-y-6">
    <form id="my-permission-form" onSubmit={submit} className="rounded-2xl border border-border bg-card p-5">
      <h3 className="text-lg font-extrabold">{editingId ? 'Modificar permiso pendiente' : 'Solicitar permiso o justificar ausencia'}</h3>
      <p className="mt-1 text-sm text-muted-foreground">Desde cualquier lugar, sin firmar en el colegio. Avise con {ADVANCE_NOTICE_DAYS} días de anticipación; si se enfermó o fue una emergencia, márquelo. Después de la fecha tiene 48 horas para subir la justificación. Los comprobantes solo los ven usted y quien aprueba.</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-semibold">Motivo
          <select disabled={!!editingId} className={field} value={form.kind} onChange={e => setForm({ ...form, kind: e.target.value as PermissionKind })}>
            {kinds.map(k => <option key={k} value={k}>{PERMISSION_KIND_LABELS[k]}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold">Horario parcial (opcional)
          <input maxLength={60} className={field} value={form.hours} onChange={e => setForm({ ...form, hours: e.target.value })} placeholder="Ej.: 7:00 a 10:20 a. m." />
        </label>
        <label className="text-sm font-semibold">Desde
          <input type="date" required className={field} value={form.startsOn} onChange={e => setForm({ ...form, startsOn: e.target.value, endsOn: e.target.value > form.endsOn ? e.target.value : form.endsOn })} />
        </label>
        <label className="text-sm font-semibold">Hasta
          <input type="date" required min={form.startsOn} className={field} value={form.endsOn} onChange={e => setForm({ ...form, endsOn: e.target.value })} />
        </label>
        <label className="text-sm font-semibold sm:col-span-2">Detalle
          <textarea required minLength={5} maxLength={1000} rows={3} className={field} value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} placeholder={role === 'estudiante' ? 'Indique el motivo y las lecciones afectadas.' : 'Describa el motivo y cómo se cubrirán sus lecciones.'} />
        </label>
        <label className="flex items-center gap-2 text-sm sm:col-span-2"><input type="checkbox" checked={form.urgent} onChange={e => setForm({ ...form, urgent: e.target.checked })} /> Situación imprevista (enfermedad o emergencia): no pude avisar con {ADVANCE_NOTICE_DAYS} días</label>
        {late && <p role="alert" className="text-sm font-semibold text-destructive sm:col-span-2">Esta solicitud tiene menos de {ADVANCE_NOTICE_DAYS} días de anticipación y quedará marcada como aviso tardío.</p>}
        {!editingId && <label className="text-sm font-semibold sm:col-span-2">Comprobante digital (opcional: PDF o foto, máximo 5 MB)
          <input type="file" accept="application/pdf,image/jpeg,image/png,image/webp" capture="environment" className={field} onChange={e => setFile(e.target.files?.[0] ?? null)} />
        </label>}
      </div>
      <div className="mt-4 flex flex-wrap gap-2"><Button type="submit" disabled={busy}>{busy ? 'Guardando…' : editingId ? 'Guardar cambios' : 'Enviar solicitud'}</Button>{editingId && <Button variant="outline" onClick={()=>{setEditingId(null);setFile(null);setForm({kind:kinds[0] as PermissionKind, startsOn:crToday(), endsOn:crToday(),hours:'',reason:'',urgent:false});}}>Descartar cambios</Button>}</div>
    </form>
    <section>
      <h3 className="text-lg font-extrabold">Mis solicitudes</h3>
      {mine.isPending ? <p role="status" className="mt-3">Cargando…</p> : mine.isError ? <p role="alert" className="mt-3 text-destructive">{mine.error.message}</p> : !mine.data.length ? <p className="mt-3 text-muted-foreground">Aún no ha enviado solicitudes.</p> :
        <ul className="mt-3 space-y-3">{mine.data.map(r => {
          const canJustify = needsJustification(r.kind as PermissionKind) && !r.justification_path && (r.status === 'pendiente' || r.status === 'aprobado');
          return <li key={r.id} className="rounded-2xl border border-border bg-card p-4 text-sm">
            <p className="font-bold">{kindLabel(r.kind)} · {day(r.starts_on)}{r.ends_on !== r.starts_on ? ` al ${day(r.ends_on)}` : ''}{r.hours ? ` · ${r.hours}` : ''}</p>
            <p className={`mt-1 font-semibold ${statusClass[r.status as PermissionStatus] ?? ''}`}>{PERMISSION_STATUS_LABELS[r.status as PermissionStatus] ?? r.status}{r.review_note ? ` · Nota: ${r.review_note}` : ''}</p>
            <Deadlines r={r} />
            {canJustify && <p className="mt-1 text-xs">Plazo para justificar: {when(justificationDeadline(r.ends_on))}</p>}
            {r.verification_hash && <PermissionQr hash={r.verification_hash} />}
            <div className="mt-2 flex flex-wrap gap-2">
              {r.attachment_path && <Button size="sm" variant="outline" onClick={() => r.attachment_path && void openAttachment(r.attachment_path)}>Ver comprobante previo</Button>}
              {r.justification_path && <Button size="sm" variant="outline" onClick={() => r.justification_path && void openAttachment(r.justification_path)}>Ver justificación</Button>}
              {canJustify && <label className="inline-flex cursor-pointer items-center rounded-md border border-primary px-3 py-1.5 text-sm font-semibold text-primary">Subir justificación
                <input type="file" accept="application/pdf,image/jpeg,image/png,image/webp" capture="environment" className="sr-only" disabled={busy} onChange={e => void justify(r.id, e.target.files?.[0])} />
              </label>}
              {r.status === 'pendiente' && <Button size="sm" variant="outline" onClick={() => void cancel(r.id)}>Cancelar</Button>}
              {r.status === 'pendiente' && <Button size="sm" variant="outline" onClick={()=>{setEditingId(r.id);setFile(null);setForm({kind:r.kind as PermissionKind,startsOn:r.starts_on,endsOn:r.ends_on,hours:r.hours ?? '',reason:r.reason,urgent:r.urgent});document.getElementById('my-permission-form')?.scrollIntoView({block:'start'});}}>Modificar permiso</Button>}
            </div>
            <PermissionSupport requestId={r.id} reviewer={false} pending={r.status === 'pendiente'} />
          </li>;
        })}</ul>}
    </section>
  </div>;
}

export function PermissionReview() {
  const queries = useQueryClient();
  const list = useQuery({
    queryKey: ['permission-review'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('permission_requests_for_review');
      if (error) throw new Error('No se pudieron cargar las solicitudes.');
      return data;
    },
  });
  const proofs = useQuery({
    queryKey: ['permission-review', 'proofs'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('permission_justification_states');
      if (error) throw new Error('No se pudo cargar el estado de los comprobantes.');
      return new Map((data ?? []).map(x => [x.id, x]));
    },
  });
  async function reviewProof(id: string, decision: 'aceptada' | 'rechazada') {
    const { error } = await supabase.rpc('review_permission_justification', { _id: id, _decision: decision, _note: notes[id] ?? '' });
    if (error) { toast.error(error.message.includes('propio') ? 'No puede revisar su propio comprobante.' : 'No se pudo registrar la revisión del comprobante.'); return; }
    toast.success(decision === 'aceptada' ? 'Comprobante aceptado.' : 'Comprobante rechazado.');
    void queries.invalidateQueries({ queryKey: ['permission-review'] });
  }
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<'pendiente' | 'todas'>('pendiente');
  async function decide(id: string, decision: 'aprobado' | 'rechazado') {
    const { error } = await supabase.rpc('review_permission_request', { _id: id, _decision: decision, _note: notes[id] ?? '' });
    if (error) { toast.error(error.message.includes('propia') ? 'No puede resolver su propia solicitud.' : 'No se pudo registrar la decisión.'); return; }
    toast.success(decision === 'aprobado' ? 'Permiso aprobado con código de verificación.' : 'Permiso rechazado.');
    void queries.invalidateQueries({ queryKey: ['permission-review'] });
  }
  const rows = (list.data ?? []).filter(r => filter === 'todas' || r.status === 'pendiente');
  const pending = list.data?.filter(r => r.status === 'pendiente').length ?? 0;
  return <section className="space-y-3">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h3 className="text-lg font-extrabold">Solicitudes por resolver ({pending})</h3>
      <div className="flex gap-1">
        <Button size="sm" variant={filter === 'pendiente' ? 'default' : 'outline'} onClick={() => setFilter('pendiente')}>Pendientes</Button>
        <Button size="sm" variant={filter === 'todas' ? 'default' : 'outline'} onClick={() => setFilter('todas')}>Historial</Button>
      </div>
    </div>
    <p className="text-sm text-muted-foreground">La dirección resuelve los permisos de su institución y Max los de todas. Nadie resuelve su propia solicitud; cada decisión queda registrada y los aprobados reciben un código SHA-256 con QR.</p>
    {list.isPending ? <p role="status">Cargando…</p> : list.isError ? <p role="alert" className="text-destructive">{list.error.message}</p> : !rows.length ? <p className="text-muted-foreground">{filter === 'pendiente' ? 'No hay solicitudes pendientes.' : 'No hay solicitudes.'}</p> :
      <ul className="space-y-3">{rows.map(r => <li key={r.id} className="rounded-2xl border border-border bg-card p-4 text-sm">
        <p className="font-bold">{r.requester_name || r.requester_email} · {r.requester_role ? ROLE_LABELS[r.requester_role as InstitutionRole] : ''} · {r.institution_name}</p>
        <p className="mt-1">{kindLabel(r.kind)} · {day(r.starts_on)}{r.ends_on !== r.starts_on ? ` al ${day(r.ends_on)}` : ''}{r.hours ? ` · ${r.hours}` : ''}</p>
        <Deadlines r={r} />
        <p className="mt-1 whitespace-pre-line text-muted-foreground">{r.reason}</p>
        <p className={`mt-1 font-semibold ${statusClass[r.status as PermissionStatus] ?? ''}`}>{PERMISSION_STATUS_LABELS[r.status as PermissionStatus] ?? r.status}{r.review_note ? ` · ${r.review_note}` : ''}{r.reviewed_at ? ` · ${when(r.reviewed_at)}` : ''}</p>
        {r.verification_hash && <PermissionQr hash={r.verification_hash} />}
        <div className="mt-2 flex flex-wrap items-end gap-2">
          {r.attachment_path && <Button size="sm" variant="outline" onClick={() => r.attachment_path && void openAttachment(r.attachment_path)}>Ver comprobante</Button>}
          {r.justification_path && <Button size="sm" variant="outline" onClick={() => r.justification_path && void openAttachment(r.justification_path)}>Ver justificación</Button>}
          {r.status === 'pendiente' && <>
            <input aria-label="Nota para la persona solicitante" maxLength={500} placeholder="Nota (opcional)" className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2" value={notes[r.id] ?? ''} onChange={e => setNotes({ ...notes, [r.id]: e.target.value })} />
            <Button size="sm" onClick={() => void decide(r.id, 'aprobado')}>Aprobar</Button>
            <Button size="sm" variant="outline" onClick={() => void decide(r.id, 'rechazado')}>Rechazar</Button>
          </>}
        </div>
        {(r.attachment_path || r.justification_path) && (() => { const p = proofs.data?.get(r.id); return <div className="mt-2 flex flex-wrap items-center gap-2 rounded-xl border border-border p-2">
          <span className="font-semibold">Comprobante médico o justificación: {p?.justification_status === 'aceptada' ? <span className="text-primary">aceptado</span> : p?.justification_status === 'rechazada' ? <span className="text-destructive">rechazado</span> : <span className="text-accent">sin revisar</span>}{p?.justification_reviewed_at ? ` · ${when(p.justification_reviewed_at)}` : ''}{p?.justification_note ? ` · ${p.justification_note}` : ''}</span>
          <Button size="sm" variant="outline" onClick={() => void reviewProof(r.id, 'aceptada')}>Aceptar comprobante</Button>
          <Button size="sm" variant="outline" onClick={() => void reviewProof(r.id, 'rechazada')}>Rechazar comprobante</Button>
        </div>; })()}
        <PermissionSupport requestId={r.id} reviewer={true} pending={r.status === 'pendiente'} />
      </li>)}</ul>}
  </section>;
}

export function RoleHistory({ institutionId }: { institutionId: string }) {
  const list = useQuery({
    queryKey: ['role-history', institutionId],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('institution_role_history', { _inst: institutionId });
      if (error) throw new Error('No se pudo cargar el historial de roles.');
      return data ?? [];
    },
  });
  const label = (r: string | null) => r ? ROLE_LABELS[r as InstitutionRole] ?? r : 'Sin rol';
  return <section className="mt-6 space-y-2">
    <h3 className="text-lg font-extrabold">Historial de cambios de rol</h3>
    {list.isPending ? <p role="status">Cargando…</p> : list.isError ? <p role="alert" className="text-destructive">{list.error.message}</p> : !list.data.length ? <p className="text-muted-foreground">Aún no hay cambios de rol registrados.</p> :
      <ul className="divide-y divide-border rounded-2xl border border-border bg-card text-sm">{list.data.map((e, i) => <li key={i} className="p-3">
        <p className="font-semibold">{e.person_email ?? 'Persona'}: {label(e.previous_role)} → {label(e.new_role)}</p>
        <p className="text-muted-foreground">{when(e.created_at)} · por {e.actor_email ?? 'sistema'}</p>
      </li>)}</ul>}
  </section>;
}
