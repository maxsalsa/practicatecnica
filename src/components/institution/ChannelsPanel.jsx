import { openPrivateFile } from '@/lib/open-private-file';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAccount } from '@/components/AccountProvider';
import { Button } from '@/components/ui/button';
import { attachmentExtension } from '@/lib/institutions';
import { stripImageMetadata } from '@/lib/image-sanitize';
import { CHANNEL_KIND_HELP, CHANNEL_KIND_LABELS, SENDER_ROLE_LABELS, canPost, messageError } from '@/lib/channels';
import {ArrowLeft,MessageSquare,FolderOpen,Send,ShieldCheck} from 'lucide-react';


const rowKey = (r) => `${r.kind}:${r.section_id ?? ''}:${r.student_id ?? ''}`;
const time = (d) => new Date(d).toLocaleString('es-CR', { timeZone: 'America/Costa_Rica', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });
const kindIcon, string> = { personal: '🧑‍🏫', seccion: '🏷️', familia: '👪' };

export function useChannelList(institutionId) {
  return useQuery({
    queryKey: ['channels', institutionId],
    refetchInterval: 30000,
    queryFn () => {
      const { data, error } = await supabase.rpc('my_channels', { _inst });
      if (error) throw new Error('No se pudieron cargar los canales.');
      return data;
    },
  });
}

export const GUARDIAN_CONSENT_VERSION = 'familia-2026-11';

export function ChannelsPanel({ institutionId, role }) {
  const links = useQuery({
    queryKey: ['guardian-links', institutionId], enabled === 'encargado',
    queryFn () => { const { data, error } = await supabase.rpc('my_guardian_links', { _inst }); if (error) throw new Error('No se pudo cargar su vínculo familiar.'); return data; },
  });
  if (role === 'encargado' && links.data?.some(l => !l.consented_at)) return <GuardianConsent institutionId={institutionId} students={links.data.map(l => l.student_name)} />;
  return <ChannelsList institutionId={institutionId} />;
}

function GuardianConsent({ institutionId, students }) {
  const queries = useQueryClient();
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);
  async function accept() {
    setBusy(true);
    const { error } = await supabase.rpc('accept_guardian_consent', { _inst, _version });
    setBusy(false);
    if (error) { toast.error('No se pudo registrar su aceptación.'); return; }
    toast.success('Aceptación registrada.');
    for (const k of ['guardian-links', 'channels']) void queries.invalidateQueries({ queryKey, institutionId] });
  }
  return <section className="max-w-2xl rounded-2xl border border-accent bg-card p-5 shadow-card" aria-labelledby="consent-title">
    <h3 id="consent-title" className="text-lg font-black">👪 Aviso para la familia</h3>
    <p className="mt-2 text-sm">La institución le vinculó como familia de <strong>{students.join(', ')}</strong>. Antes de usar los canales, lea y acepte:</p>
    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
      <li>Los canales son solo para recados, citas, agenda y asuntos del estudiante, con el personal de la institución.</li>
      <li>Los mensajes quedan registrados con fecha y autor; los insultos se bloquean y la dirección puede ocultar mensajes.</li>
      <li>Las fotos y documentos que envíe se revisan antes de mostrarse; no comparta datos de otras personas sin permiso.</li>
      <li>Puede pedir acceso, corrección o eliminación de sus datos según la Ley 8968 (detalles en Términos y privacidad).</li>
    </ul>
    <label className="mt-4 flex items-start gap-2 text-sm font-semibold"><input type="checkbox" className="mt-1" checked={ok} onChange={e => setOk(e.target.checked)} />He leído y acepto el uso de los canales y el tratamiento de mis datos y los del estudiante para estos fines.</label>
    <div className="mt-4 flex flex-wrap gap-3"><Button disabled={!ok || busy} onClick={() => void accept()}>Aceptar y continuar</Button><a href="/legal" className="self-center text-sm underline">Leer Términos y privacidad</a></div>
  </section>;
}

function ChannelsList({ institutionId }) {
  const list = useChannelList(institutionId);
  const queries = useQueryClient();
  const [selected, setSelected] = useState(null);
  const [opening, setOpening] = useState('');

  async function open(r) {
    const key = rowKey(r);
    if (r.channel_id) { setSelected({ key, id: r.channel_id, title: r.title, kind: r.kind }); return; }
    setOpening(key);
    const { data, error } = await supabase.rpc('open_channel', { _inst, _kind: r.kind, _section: r.section_id, _student: r.student_id });
    setOpening('');
    if (error || !data) { toast.error('No se pudo abrir el canal.'); return; }
    setSelected({ key, id, title: r.title, kind: r.kind });
    void queries.invalidateQueries({ queryKey: ['channels', institutionId] });
  }

  const rows = list.data ?? [];
  return <div className="overflow-hidden rounded-md border border-border bg-card">
    <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border p-4"><div><h2 className="text-xl font-black">Conversación institucional</h2><p className="text-sm font-bold text-primary">pracTICAtecnica.com</p></div><span className="flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-4 w-4 text-accent"/>Acceso autorizado</span></header>
    <div className="grid md:grid-cols-[16rem_1fr]">
    <aside className={`${selected ? 'hidden md:block' : ''} border-b border-border p-2 md:border-b-0 md:border-r`} aria-label="Canales">
      {list.isPending ? <p role="status" className="p-3">Cargando canales…</p> : list.isError ? <p role="alert" className="p-3 text-destructive">{list.error.message}</p> : !rows.length ?
        <p className="p-3 text-sm text-muted-foreground">Aún no tiene canales. La dirección crea secciones y vincula a las familias en «Secciones y familias».</p> :
        <ul className="grid gap-1">{rows.map(r => {
          const key = rowKey(r); const active = selected?.key === key;
          return <li key={key}><Button variant={active?'default':'ghost'} onClick={() => void open(r)} disabled={opening === key} className="flex h-auto w-full items-center gap-3 rounded-md px-3 py-3 text-left">
            <span aria-hidden className="text-xl">{kindIcon[r.kind ?? '#'}</span>
            <span className="min-w-0 flex-1"><span className="block truncate font-bold"># {r.title}</span><span className={`block truncate text-xs ${active ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{CHANNEL_KIND_LABELS[r.kind}{r.last_at ? ` · ${time(r.last_at)}` : ''}</span></span>
            {Number(r.unread) > 0 && <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-black text-accent-foreground" aria-label={`${r.unread} mensajes nuevos`}>{r.unread}</span>}
          </Button></li>;
        })}</ul>}
    </aside>
    {selected ? <Conversation key={selected.id} institutionId={institutionId} channel={selected} onBack={() => setSelected(null)} /> :
      <div className="hidden min-h-80 items-center justify-center p-8 text-center text-muted-foreground md:flex"><MessageSquare className="h-12 w-12" aria-label="Conversaciones"/></div>}
  </div></div>;
}

function Conversation({ institutionId, channel, onBack }: { institutionId: string; channel: { id: string; title: string; kind }; onBack: () => void }) {
  const { user } = useAccount();
  const queries = useQueryClient();
  const feedKey = useMemo(() => ['channel-feed', channel.id], [channel.id]);
  const access = useQuery({
    queryKey: ['channel-access', channel.id],
    queryFn () => { const { data, error } = await supabase.rpc('channel_access', { _ch: channel.id }); if (error) throw new Error('Sin acceso'); return data; },
  });
  const feed = useQuery({
    queryKey,
    queryFn () => { const { data, error } = await supabase.rpc('channel_feed', { _ch: channel.id }); if (error) throw new Error('No se pudieron cargar los mensajes.'); return data; },
  });
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [view,setView]=useState('messages');
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ch = supabase.channel(`channel-${channel.id}-${Math.random().toString(36).slice(2)}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'channel_messages', filter: `channel_id=eq.${channel.id}` }, () => { void queries.invalidateQueries({ queryKey }); })
      .subscribe();
    return () => { void supabase.removeChannel(ch); };
  }, [channel.id, feedKey, queries]);
  useEffect(() => {
    if (!user || !feed.data) return;
    bottom.current?.scrollIntoView({ block: 'end' });
    void supabase.from('channel_reads').upsert({ channel_id: channel.id, user_id: user.id, read_at Date().toISOString() }).then(() => queries.invalidateQueries({ queryKey: ['channels', institutionId] }));
  }, [feed.data, user, channel.id, institutionId, queries]);

  async function send(e) {
    e.preventDefault();
    if (!user) return;
    const err = messageError(text || (file ? `📎 ${file.name}` : ''));
    if (err) { toast.error(err); return; }
    setBusy(true);
    try {
      let attachment_path = null;
      if (file) {
        const clean = await stripImageMetadata(file).catch(() => file);
        const check = attachmentExtension(clean);
        if (check.error) { toast.error(check.error); return; }
        attachment_path = `${channel.id}/${crypto.randomUUID()}.${check.ext}`;
        const up = await supabase.storage.from('channel-files').upload(attachment_path, clean, { contentType: clean.type, upsert });
        if (up.error) { toast.error('No se pudo subir el archivo.'); return; }
      }
      const { error } = await supabase.from('channel_messages').insert({ channel_id: channel.id, sender_id: user.id, body: text.trim() || `📎 ${file?.name ?? 'Archivo'}`, attachment_path, attachment_name ? file.name.slice(0, 120) : null });
      if (error) { toast.error(error.message.includes('respetuoso') ? 'Mensaje bloqueado respetuoso.' : 'No se pudo enviar el mensaje.'); return; }
      setText(''); setFile(null);
      void queries.invalidateQueries({ queryKey });
    } finally { setBusy(false); }
  }
  async function openFile(path) {
    if (!(await openPrivateFile('channel-files', path))) toast.error('No se pudo abrir el archivo.');
  }
  async function review(id) {
    const { error } = await supabase.rpc('review_channel_attachment', { _id, _approve });
    if (error) { toast.error('No se pudo registrar la revisión.'); return; }
    toast.success(approve ? 'Archivo aprobado y visible para el canal.' : 'Archivo rechazado.');
    void queries.invalidateQueries({ queryKey });
  }
  async function hide(id) {
    const { error } = await supabase.rpc('hide_channel_message', { _id });
    if (error) { toast.error('No se pudo ocultar el mensaje.'); return; }
    toast.success('Mensaje ocultado; queda registrado.');
    void queries.invalidateQueries({ queryKey });
  }

  const acc = access.data ?? 'none';
  return <section className="flex h-[65dvh] min-h-96 max-h-[48rem] flex-col overflow-hidden bg-card" aria-label={`Canal ${channel.title}`}>
    <header className="flex items-center gap-2 border-b border-border p-3">
      <Button size="icon" variant="ghost" onClick={onBack} aria-label="Volver a canales"><ArrowLeft className="h-4 w-4"/></Button>
      <div className="min-w-0 flex-1"><p className="truncate font-black"># {channel.title}</p><p className="truncate text-xs text-muted-foreground">{CHANNEL_KIND_HELP[channel.kind]}</p></div>
    </header>
    <div className="flex items-center justify-end gap-2 border-b border-border px-3 py-2"><Button size="icon" variant={view==='messages'?'secondary':'ghost'} title="Mensajes" aria-label="Mensajes" onClick={()=>setView('messages')}><MessageSquare className="h-4 w-4"/></Button><Button size="sm" variant={view==='files'?'secondary':'ghost'} onClick={()=>setView('files')}><FolderOpen className="h-4 w-4"/>Archivos</Button></div>
    <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-background/60 p-4">
      {feed.isPending ? <p role="status">Cargando mensajes…</p> : feed.isError ? <p role="alert" className="text-destructive">{feed.error.message}</p> : !feed.data.length ? <p className="py-10 text-center text-muted-foreground">Aún no hay mensajes en este canal.</p> :
        feed.data.filter(m=>view==='messages'||!!m.attachment_path||m.attachment_status==='pendiente').map(m => {
          const mine = m.sender_id === user?.id;
          return <div key={m.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[88%] rounded-md px-4 py-3 text-sm shadow-card ${mine ? 'rounded-br-none bg-primary text-primary-foreground' : 'rounded-bl-none border border-border bg-secondary text-secondary-foreground'} ${m.hidden ? 'opacity-60' : ''}`}>
              {!mine && <p className="text-xs font-black text-accent">{m.sender_name} · {SENDER_ROLE_LABELS[m.sender_role] ?? m.sender_role}{m.is_guide ? ' · Guía' : ''}</p>}
              {m.hidden && <p className="text-xs font-bold">{acc === 'moderate' ? 'Oculto por moderación (visible solo para moderación)' : 'Mensaje oculto por moderación'}</p>}
              {m.body && <p className="whitespace-pre-line break-words">{m.body}</p>}
              {m.attachment_path && <Button variant="link" className="mt-2 h-auto max-w-full whitespace-normal border border-current p-2 text-left text-xs text-inherit" onClick={() => {if(m.attachment_path)void openFile(m.attachment_path);}}>📎 {m.attachment_name ?? 'Archivo adjunto'}</Button>}
              {m.attachment_status === 'pendiente' && <p className="mt-1 text-xs font-bold">{m.can_review ? '⏳ Archivo en revisión: revíselo antes de aprobarlo.' : mine ? '⏳ Archivo en revisión: la dirección o la persona guía debe aprobarlo.' : '⏳ Archivo en revisión.'}</p>}
              {m.attachment_status === 'rechazado' && <p className="mt-1 text-xs font-bold">🚫 Archivo rechazado por revisión.</p>}
              {m.can_review && <span className="mt-1 flex gap-2"><Button size="sm" onClick={() => void review(m.id, true)}>Aprobar archivo</Button><Button size="sm" variant="outline" onClick={() => void review(m.id, false)}>Rechazar</Button></span>}
              <p className={`mt-1 text-[11px] ${mine ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{time(m.created_at)}{acc === 'moderate' && !m.hidden && !mine ? <> · <button type="button" className="underline" onClick={() => void hide(m.id)}>Ocultar</button></> : null}</p>
            </div>
          </div>;
        })}
      <div ref={bottom} />
    </div>
    {canPost(acc) ? <form onSubmit={send} className="flex items-end gap-2 border-t border-border p-3">
      <label className="cursor-pointer rounded-xl border border-border px-3 py-2 text-lg" title="Adjuntar PDF o foto (máximo 5 MB; las fotos se limpian de ubicación y las de familias se revisan)">📎<span className="sr-only">Adjuntar archivo</span>
        <input type="file" className="sr-only" accept="application/pdf,image/jpeg,image/png,image/webp" onChange={e => setFile(e.target.files?.[0] ?? null)} />
      </label>
      <div className="min-w-0 flex-1">
        {file && <p className="mb-1 truncate text-xs">📎 {file.name} <button type="button" className="underline" onClick={() => setFile(null)}>quitar</button></p>}
        <p className="mb-1 text-[11px] text-muted-foreground">Comunicación institucional registrada. No comparta datos sensibles innecesarios ni fotos de terceros sin permiso (Ley 8968).</p>
        <textarea aria-label="Mensaje" rows={1} maxLength={2000} value={text} onChange={e => setText(e.target.value)} placeholder="Escriba un mensaje respetuoso…" className="max-h-32 w-full resize-y rounded-xl border border-border bg-background px-3 py-2" onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); (e.currentTarget.form | null)?.requestSubmit(); } }} />
      </div>
      <Button type="submit" size="icon" disabled={busy} aria-label="Enviar mensaje"><Send className="h-4 w-4"/></Button>
    </form> : <p className="border-t border-border p-3 text-center text-sm text-muted-foreground">{access.isPending ? 'Comprobando acceso…' : 'Canal informativo aquí.'}</p>}
  </section>;
}

