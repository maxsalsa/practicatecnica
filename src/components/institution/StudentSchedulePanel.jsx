import {useQuery} from '@tanstack/react-query';
import {supabase} from '@/integrations/supabase/client';
import {useAccount} from '@/components/AccountProvider';
import {DAYS,type Cell} from '@/lib/schedule';
type Visible={id:string;title:string;grid:Record<string,Cell[][]>};
export function StudentSchedulePanel({institutionId,studentId,sectionName}:{institutionId:string;studentId?:string;sectionName?:string}){
 const {user}=useAccount();
 const owner=studentId??user?.id;
 const schedules=useQuery({queryKey:['student-schedules',institutionId,user?.id,owner],enabled:!!user&&!!owner,queryFn:async()=>{if(!owner)return [];const r=await supabase.rpc('student_visible_schedules',{_inst:institutionId,_student:owner});if(r.error)throw new Error('No se pudo consultar su horario.');return r.data as unknown as Visible[];}});
 const entries=schedules.data?.flatMap(s=>Object.entries(s.grid).filter(([section])=>!sectionName||section===sectionName).map(([section,days])=>({schedule:s,section,days})))??[];
 return <section className="space-y-4"><h2 className="text-xl font-black">{studentId?'Horario del estudiante':'Mi horario'}</h2>{schedules.isPending?<p role="status">Cargando…</p>:schedules.isError?<p role="alert">{schedules.error.message}</p>:entries.map(({schedule:s,section,days})=><div key={`${s.id}-${section}`} className="space-y-3"><h3 className="font-bold">{section} · {s.title}</h3>{days.map((cells,d)=><div key={d}><h4 className="font-semibold">{DAYS[d]}</h4><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr><th>Lección</th><th>Horario</th><th>Materia</th><th>Profesor</th><th>Aula</th></tr></thead><tbody>{cells.map((c,i)=><tr key={i} className="border-t border-border"><td className="p-2">{i+1}</td><td className="p-2">{c?.startTime&&c.endTime?`${c.startTime}–${c.endTime}`:'Sin asignar'}</td><td className="p-2">{c?.subject??'Libre'}</td><td className="p-2">{c?.teacher??'—'}</td><td className="p-2">{c?.room??'Sin asignar'}</td></tr>)}</tbody></table></div></div>)}</div>)}{!schedules.isPending&&!schedules.isError&&!entries.length&&<p className="text-muted-foreground">Sin horarios habilitados.</p>}</section>;
}