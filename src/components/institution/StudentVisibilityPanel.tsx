import {useState} from 'react';
import {useQuery,useQueryClient} from '@tanstack/react-query';
import {supabase} from '@/integrations/supabase/client';
import {Button} from '@/components/ui/button';
import {toast} from 'sonner';
import {studentAreaAllowed} from '@/lib/area-review';

export function StudentVisibilityPanel({institutionId}:{institutionId:string}){
 const qc=useQueryClient();
 const [student,setStudent]=useState('');
 const [areas,setAreas]=useState<string[]>([]),[topics,setTopics]=useState<string[]>([]),[sections,setSections]=useState<string[]>([]);
 const [busy,setBusy]=useState(false);
 const catalog=useQuery({queryKey:['visibility-catalog',institutionId],queryFn:async()=>{
  const [people,publications,visibility,reviews]=await Promise.all([supabase.rpc('institution_people',{_inst:institutionId}),supabase.from('institution_publications').select('id,title,subject,status,kind').eq('institution_id',institutionId),supabase.from('student_institution_visibility').select('*').eq('institution_id',institutionId),supabase.from('institution_area_reviews').select('subject,status').eq('institution_id',institutionId)]);
  if(people.error||publications.error||visibility.error||reviews.error)throw new Error('No se pudieron cargar los accesos.');
  return {people:people.data??[],publications:publications.data??[],visibility:visibility.data??[],reviews:reviews.data??[]};
 }});
 const students=catalog.data?.people.filter(p=>p.member_role==='estudiante')??[];
 const choose=(id:string)=>{setStudent(id);const row=catalog.data?.visibility.find(v=>v.student_id===id);setAreas(row?.areas??[]);setTopics(row?.topics??[]);setSections(row?.sections??[]);};
 const toggle=(list:string[],value:string)=>list.includes(value)?list.filter(x=>x!==value):[...list,value];
 async function save(){if(!student||busy)return;setBusy(true);try{const r=await supabase.rpc('set_student_visibility',{_inst:institutionId,_student:student,_areas:areas,_topics:topics,_sections:sections});if(r.error)throw new Error('No se pudo guardar; revise su autorización y la sección asignada.');await qc.invalidateQueries({queryKey:['visibility-catalog',institutionId]});toast.success('Accesos guardados');}catch(e){toast.error(e instanceof Error?e.message:'No se pudo guardar.');}finally{setBusy(false);}}
 if(catalog.isPending)return <p role="status">Cargando accesos…</p>;
 if(catalog.isError)return <p role="alert">{catalog.error.message}</p>;
 const subjects=[...new Set(catalog.data?.publications.filter(p=>p.status==='published'&&['practica','simulacro'].includes(p.kind)&&studentAreaAllowed(catalog.data?.reviews.find(r=>r.subject===p.subject)?.status,true)).map(p=>p.subject).filter(Boolean)??[])];
 const assignedSections=[...new Set(students.filter(p=>p.user_id===student).map(p=>p.section_name).filter((s):s is string=>!!s))];
 return <section className="space-y-5"><h2 className="text-xl font-black">Usuarios institucionales y permisos por área</h2><ul className="divide-y divide-border">{[...new Map(catalog.data.people.map(p=>[p.user_id,p])).values()].map(p=><li key={p.user_id} className="flex flex-wrap items-center justify-between gap-2 py-2"><span className="min-w-0 break-words">{p.display_name||'Cuenta registrada'} · {p.member_role}{p.section_name?` · ${p.section_name}`:''}</span>{p.member_role==='estudiante'&&<Button size="sm" variant="outline" onClick={()=>choose(p.user_id)}>Editar permisos</Button>}</li>)}</ul><label className="grid gap-2">Estudiante<select value={student} onChange={e=>choose(e.target.value)} className="min-w-0 rounded-md border border-input bg-background p-3"><option value="">Seleccione estudiante</option>{[...new Map(students.map(p=>[p.user_id,p])).values()].map(p=><option key={p.user_id} value={p.user_id}>{p.display_name||p.email||'Estudiante'}{p.section_name?` · ${p.section_name}`:''}</option>)}</select></label>{student&&<><fieldset className="space-y-2"><legend className="font-bold">Áreas publicadas</legend>{subjects.map(s=><label key={s} className="flex items-center gap-3"><input type="checkbox" checked={areas.includes(s)} onChange={()=>setAreas(toggle(areas,s))}/>{s}</label>)}</fieldset><fieldset className="space-y-2"><legend className="font-bold">Temas publicados</legend>{catalog.data?.publications.filter(p=>p.status==='published'&&['practica','simulacro'].includes(p.kind)&&studentAreaAllowed(catalog.data?.reviews.find(r=>r.subject===p.subject)?.status,true)).map(p=><label key={p.id} className="flex items-center gap-3"><input type="checkbox" checked={topics.includes(p.id)} onChange={()=>setTopics(toggle(topics,p.id))}/><span className="min-w-0 break-words">{p.title}</span></label>)}</fieldset><fieldset className="space-y-2"><legend className="font-bold">Horarios de secciones asignadas</legend>{assignedSections.map(s=><label key={s} className="flex items-center gap-3"><input type="checkbox" checked={sections.includes(s)} onChange={()=>setSections(toggle(sections,s))}/>{s}</label>)}</fieldset><Button disabled={busy} onClick={()=>void save()}>{busy?'Guardando…':'Guardar accesos'}</Button></>}</section>;
}