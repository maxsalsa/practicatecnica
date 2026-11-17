import { openPrivateFile } from '@/lib/open-private-file';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAccount } from '@/components/AccountProvider';
import { Button } from '@/components/ui/button';
import { attachmentExtension } from '@/lib/institutions';
import { stripImageMetadata } from '@/lib/image-sanitize';

export function PermissionSupport({requestId, reviewer, pending}: {requestId:string; reviewer:boolean; pending:boolean}) {
  const {user}=useAccount(); const cache=useQueryClient();
  const [note,setNote]=useState(''); const [busy,setBusy]=useState(false); const [message,setMessage]=useState('');
  const rows=useQuery({queryKey:['permission-support',requestId],queryFn:async()=>{
    const r=await supabase.from('permission_support_requests').select('*').eq('request_id',requestId).order('requested_at');
    if(r.error) throw new Error('No se pudieron cargar los respaldos.'); return r.data;
  }});
  async function request() {
    setBusy(true);setMessage('');
    const r=await supabase.rpc('request_permission_support',{_id:requestId,_note:note.trim()});
    setBusy(false);setMessage(r.error ? r.error.message : 'Respaldo solicitado sin aprobar ni rechazar el permiso.');
    if(!r.error){setNote('');void cache.invalidateQueries({queryKey:['permission-support',requestId]});}
  }
  async function respond(id:string,original:File|undefined){
    if(!user||!original)return;setBusy(true);setMessage('');
    try{
      const file=await stripImageMetadata(original).catch(()=>original);const check=attachmentExtension(file);
      if(check.error){setMessage(check.error);return;}
      const path=`${user.id}/${crypto.randomUUID()}.${check.ext}`;
      const upload=await supabase.storage.from('permission-attachments').upload(path,file,{contentType:file.type});
      if(upload.error){setMessage('No se pudo subir el archivo.');return;}
      const r=await supabase.rpc('respond_permission_support',{_id:id,_path:path});
      setMessage(r.error ? 'No se pudo registrar el respaldo.' : 'Respaldo entregado para revisión.');
      if(!r.error)void cache.invalidateQueries({queryKey:['permission-support',requestId]});
    }finally{setBusy(false);}
  }
  async function open(path:string){if(!(await openPrivateFile('permission-attachments',path)))setMessage('No se pudo abrir el respaldo.');}
  const outstanding=rows.data?.some(r=>!r.responded_at);
  return <div className="mt-3 space-y-2 border-t border-border pt-3">
    {rows.isError&&<p role="alert">{rows.error.message}</p>}
    {rows.data?.map(r=><div key={r.id} className="space-y-1"><p className="font-semibold">Respaldo solicitado: {r.note}</p><p className="text-xs text-muted-foreground">{new Date(r.requested_at).toLocaleString('es-CR',{timeZone:'America/Costa_Rica'})} · {r.responded_at?'Entregado':'Pendiente'}</p>
      {r.response_path&&<Button size="sm" variant="outline" onClick={()=>r.response_path&&void open(r.response_path)}>Ver respaldo</Button>}
      {!reviewer&&pending&&!r.responded_at&&<label className="block text-sm font-semibold">Responder con foto o PDF<input aria-label="Archivo de respaldo" type="file" accept="application/pdf,image/jpeg,image/png,image/webp" disabled={busy} onChange={e=>void respond(r.id,e.target.files?.[0])} className="mt-1 block max-w-full"/></label>}
    </div>)}
    {reviewer&&pending&&!outstanding&&<div className="flex flex-wrap gap-2"><input aria-label="Respaldo que necesita" value={note} onChange={e=>setNote(e.target.value)} maxLength={500} placeholder="Indique qué respaldo falta" className="min-w-0 flex-1 rounded-md border border-input bg-background p-2"/><Button size="sm" variant="outline" disabled={busy||note.trim().length<5||rows.isPending||rows.isError} onClick={()=>void request()}>Pedir respaldo</Button></div>}
    {message&&<p role="status" className="text-sm">{message}</p>}
  </div>;
}