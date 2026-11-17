import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';


export function AdminUserDetails({id,email,trace,reload}) {
  const [kind,setKind] = useState('solicitud');
  const [subject,setSubject] = useState('');
  const [notes,setNotes] = useState('');
  const [busy,setBusy] = useState(false);
  const docs=trace.documents.filter(d=>d.name.startsWith(`${id}/`));
  async function openDocument(name) {
    const {data,error}=await supabase.storage.from('id-documents').createSignedUrl(name,600);
    if(error || !data) {toast.error('No se pudo abrir el documento.');return;}
    window.open(data.signedUrl,'_blank','noopener,noreferrer');
  }
  return <details className="mt-4 border-t border-border pt-3">
    <summary className="cursor-pointer font-semibold text-primary">Actividad, documentos y solicitudes</summary>
    <div className="mt-4 space-y-5">
      <a href={`mailto:${email}`} className="break-all text-primary underline">Contactar por correo</a>
      <section><h3 className="font-bold">Documentos privados ({docs.length})</h3>
        <div className="mt-2 flex flex-wrap gap-2">{docs.map(d=><Button key={d.name} variant="outline" size="sm" onClick={()=>void openDocument(d.name)}>{d.name.split('/')[1]?.startsWith('libro')?'Libro de comunicación':'Carné'} · {new Date(d.created_at).toLocaleDateString('es-CR')}</Button>)}{!docs.length&&<p className="text-sm text-muted-foreground">Sin documento subido</p>}</div>
      </section>
      <section><h3 className="font-bold">Actividad diaria · Costa Rica · últimos 30 días</h3>
        {trace.activity.filter(a=>a.user_id===id).map(a=><p className="text-sm" key={a.day}>{a.day} · {a.attempts} prácticas · {a.xp} XP</p>)}
        {!trace.activity.some(a=>a.user_id===id)&&<p className="text-sm text-muted-foreground">Sin prácticas registradas en este período</p>}
      </section>
      <section><h3 className="font-bold">Historial de pagos</h3>
        {trace.payments.filter(p=>p.user_id===id).map(p=><p className="break-words text-sm" key={p.created_at}>{new Date(p.created_at).toLocaleDateString('es-CR')} · {p.plan} · ₡{p.amount.toLocaleString('es-CR')} · {p.status} · Ref. {p.reference}</p>)}
        {trace.subscriptions.filter(s=>s.user_id===id).map(s=><p className="text-sm" key={s.created_at}>Tarjeta/PayPal · {s.status} · {s.environment==='sandbox'?'Prueba':'Real'} · Hasta {s.current_period_end?new Date(s.current_period_end).toLocaleDateString('es-CR'):'Sin fecha'}</p>)}
        {!trace.payments.some(p=>p.user_id===id)&&!trace.subscriptions.some(s=>s.user_id===id)&&<p className="text-sm text-muted-foreground">Sin pagos registrados</p>}
      </section>
      <section><h3 className="font-bold">Cambios de estado</h3>{trace.history.filter(h=>h.user_id===id).map((h,i)=><p className="text-sm" key={i}>{new Date(h.created_at).toLocaleString('es-CR',{timeZone:'America/Costa_Rica'})} · {h.previous_status} → {h.status}</p>)}</section>
      <section><h3 className="font-bold">Solicitudes e incidencias · registro interno</h3>
        {trace.cases.filter(c=>c.user_id===id).map(c=><div className="mt-3 border-b border-border pb-3" key={c.id}>
          <p className="break-words font-semibold">{c.kind} · {c.subject}</p><p className="whitespace-pre-wrap break-words text-sm text-muted-foreground">{c.notes}</p>
          <select aria-label={`Estado de ${c.subject}`} value={c.status} className="mt-2 rounded-md border border-border bg-background p-2" onChange={async e=>{
            const {error}=await supabase.from('support_cases').update({status:e.target.value,updated_at Date().toISOString()}).eq('id',c.id);
            if(error) toast.error('No se pudo actualizar.');else await reload();
          }}><option value="abierta">Abierta</option><option value="en_proceso">En proceso</option><option value="resuelta">Resuelta</option></select>
        </div>)}
        <form className="mt-3 grid gap-2" onSubmit={async e=>{
          e.preventDefault();setBusy(true);
          const {error}=await supabase.from('support_cases').insert({user_id,kind,subject:subject.trim(),notes:notes.trim()});
          if(error) toast.error('No se pudo registrar.');else {setSubject('');setNotes('');toast.success('Registro guardado.');await reload();}setBusy(false);
        }}>
          <select aria-label="Tipo de registro" className="rounded-md border border-border bg-background p-2" value={kind} onChange={e=>setKind(e.target.value)}><option value="solicitud">Solicitud</option><option value="incidencia">Incidencia</option></select>
          <input aria-label="Asunto" placeholder="Asunto" required maxLength={160} value={subject} onChange={e=>setSubject(e.target.value)} className="min-w-0 rounded-md border border-border bg-background p-2"/>
          <textarea aria-label="Notas internas" placeholder="Notas internas" maxLength={2000} value={notes} onChange={e=>setNotes(e.target.value)} className="min-w-0 rounded-md border border-border bg-background p-2"/>
          <Button disabled={busy||!subject.trim()} type="submit">{busy?'Guardando…':'Registrar'}</Button>
        </form>
      </section>
    </div>
  </details>;
}