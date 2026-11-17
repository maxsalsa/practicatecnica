import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { canCorrectPersonalRole } from '@/lib/account-role-policy';

export function AccountRoleCorrection({userId,onChanged}:{userId:string;onChanged:()=>void}){
  const [selected,setSelected]=useState('student');const [message,setMessage]=useState('');const [busy,setBusy]=useState(false);
  const rows=useQuery({queryKey:['account-roles-admin',userId],queryFn:async()=>{const r=await supabase.from('user_roles').select('role').eq('user_id',userId);if(r.error)throw new Error('No se pudo consultar el tipo de cuenta.');return r.data;}});
  const history=useQuery({queryKey:['account-role-history',userId],queryFn:async()=>{const r=await supabase.from('account_role_events').select('*').eq('user_id',userId).order('changed_at',{ascending:false}).limit(10);if(r.error)throw new Error('No se pudo consultar el historial.');return r.data;}});
  async function change(){if(!rows.data||!canCorrectPersonalRole(rows.data.map(r=>r.role),selected))return;if(!confirm('¿Corregir el tipo de cuenta personal? No cambia pagos ni el rol de cada colegio.'))return;setBusy(true);const r=await supabase.rpc('admin_correct_account_role',{_user,_role:selected});setBusy(false);setMessage(r.error?r.error.message:'Tipo de cuenta corregido con historial.');if(!r.error){void rows.refetch();void history.refetch();onChanged();}}
  return <div className="mt-3 border-t border-border pt-3"><p className="text-sm font-semibold">Tipo de cuenta personal: {rows.data?.map(r=>r.role==='admin'?'Superadministrador':r.role==='teacher'?'Docente':'Estudiante').join(', ')||'Sin asignación'}</p>
    {!rows.data?.some(r=>r.role==='admin')&&<div className="mt-2 flex flex-wrap gap-2"><select aria-label="Tipo de cuenta personal" value={selected} onChange={e=>setSelected(e.target.value==='teacher'?'teacher':'student')} className="rounded-md border border-input bg-background p-2"><option value="student">Estudiante</option><option value="teacher">Docente</option></select><Button size="sm" variant="outline" disabled={busy||rows.isPending||rows.isError} onClick={()=>void change()}>Corregir tipo de cuenta</Button></div>}
    {message&&<p role="status" className="text-sm">{message}</p>}
    {(rows.isError||history.isError)&&<p role="alert" className="text-sm">No se pudo consultar la cuenta o su historial.</p>}
    {!!history.data?.length&&<details className="mt-2 text-sm"><summary className="cursor-pointer">Historial de correcciones</summary>{history.data.map(r=><p key={r.id}>{new Date(r.changed_at).toLocaleString('es-CR',{timeZone:'America/Costa_Rica'})} · {r.previous_roles.join(', ')} → {r.new_role}</p>)}</details>}
  </div>;
}