import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
const labels={ministro:'Ministro',asesor_especialidad:'Asesor de asignatura',director_general:'Director general'};

export function AdditionalRoles({institutionId,canAssign=false}){
 const cache=useQueryClient();const [email,setEmail]=useState('');const [role,setRole]=useState('ministro');const [specialty,setSpecialty]=useState('');const [reports,setReports]=useState(false);const [busy,setBusy]=useState(false);const [message,setMessage]=useState('');
 const q=useQuery({queryKey:['additional-roles',institutionId],queryFn:async()=>{const r=await supabase.from('institution_additional_roles').select('*').eq('institution_id',institutionId);if(r.error)throw r.error;return r.data;}});
 const [report,setReport]=useState('');
 return <section className="space-y-3 border-t border-border py-5"><h2 className="text-xl font-bold">Roles adicionales</h2>
 {canAssign&&<form className="grid gap-3" onSubmit={async e=>{e.preventDefault();setBusy(true);setMessage('');try{const r=await supabase.rpc('assign_additional_institution_role',{_inst,_email,_role,_specialty,_reports:role!=='ministro'&&reports});if(r.error)throw r.error;setMessage('Asignación registrada.');await cache.invalidateQueries({queryKey:['additional-roles',institutionId]});}catch(e){setMessage(e instanceof Error?e.message:'No se pudo asignar.');}finally{setBusy(false)}}}>
 <label>Cuenta confirmada<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="block w-full rounded-md border border-border bg-background p-2"/></label>
 <label>Rol adicional<select value={role} onChange={e=>{setRole(e.target.value);setReports(false)}} className="block w-full rounded-md border border-border bg-background p-2">{Object.entries(labels).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label>
 {role==='asesor_especialidad'&&<label>Materia o especialidad exacta<input required maxLength={120} value={specialty} onChange={e=>setSpecialty(e.target.value)} className="block w-full rounded-md border border-border bg-background p-2"/></label>}
 {role!=='ministro'&&<label className="flex items-center gap-2"><input type="checkbox" checked={reports} onChange={e=>setReports(e.target.checked)}/>Autorizar informes agregados de este centro</label>}
 <Button disabled={busy} type="submit">{busy?'Guardando…':'Asignar acceso'}</Button></form>}
 {message&&<p role="status">{message}</p>}{q.isError&&<p role="alert">No se pudieron consultar los roles.</p>}
 <ul className="divide-y divide-border">{q.data?.filter(r=>r.role!=='ministro_carino').map(r=><li key={`${r.user_id}-${r.role}`} className="py-2">{labels[r.role}{r.specialty?` · ${r.specialty}`:''} · {r.can_read_reports?'Informes autorizados':'Sin informes privados'}</li>)}</ul>
 {q.data?.some(r=>r.can_read_reports)&&<Button variant="outline" onClick={async()=>{const r=await supabase.rpc('additional_institution_reports',{_inst:institutionId});setReport(r.error?'No tiene acceso a estos informes.':JSON.stringify(r.data,null,2));}}>Consultar informe agregado</Button>}
 {report&&<pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-md bg-muted p-3 text-sm">{report}</pre>}
 </section>;
}