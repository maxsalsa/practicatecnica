import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {Button} from '@/components/ui/button';
import {useAccount} from '@/components/AccountProvider';
import {supabase} from '@/integrations/supabase/client';
import {subjectMissions,selectedMissionCorrect,orderedMissionCorrect} from '@/lib/subject-games';
import {formatColones} from '@/lib/institution-pricing';
import {saveRecreationalSession} from '@/lib/recreational-progress';
import scene from '@/assets/illustrations/technical-arena.jpg';
export function SubjectMissions(){
 const {user}=useAccount();const [id,setId]=useState('matematicas');const [cells,setCells]=useState([]);const [order,setOrder]=useState([]);const [result,setResult]=useState('');const [busy,setBusy]=useState(false);const [sessionId,setSessionId]=useState(()=>crypto.randomUUID());
 const mission=subjectMissions.find(m=>m.id===id)??subjectMissions[0];
 const tariffs=useQuery({queryKey:['subject-game-tariffs',user?.id],enabled:!!user,queryFn:async()=>{const r=await supabase.from('institution_tariffs').select('id,label,amount,level,institution_id').eq('service','otro').eq('active',true);if(r.error)throw r.error;return r.data;}});
 const reset=()=>{setCells([]);setOrder([]);setResult('');setSessionId(crypto.randomUUID())};
 const check=async()=>{const ok=mission.kind==='order'?orderedMissionCorrect(order,mission.items):selectedMissionCorrect(cells,mission.targets);if(!ok){setResult('Revise el mapa o la secuencia; puede cambiar su respuesta.');return;}setBusy(true);try{await saveRecreationalSession(user?.id,{id,subject:`materia-juego-v1:${mission.id}`,questions:1,correct:1,created_at Date().toISOString()});setResult('¡Lo logró! Resultado recreativo guardado.');}catch{setResult('Resuelto, pero no se pudo guardar. Pulse Comprobar para reintentar.');}finally{setBusy(false)}};
 const prices=tariffs.data?.filter(t=>t.level===`juego:${mission.id}`)??[];
 return <section className="mt-6 space-y-4 border-y border-border py-5"><h2 className="text-2xl font-bold">Misiones por materia</h2>
 <label className="block font-semibold">Materia<select className="mt-2 block w-full rounded-md border border-border bg-background p-3" value={id} onChange={e=>{setId(e.target.value);reset()}}>{subjectMissions.map(m=><option key={m.id} value={m.id}>{m.subject}</option>)}</select></label>
 <img src={scene} alt="Campus ilustrado con espacios de aprendizaje" className="max-h-48 w-full object-cover"/>
 <h3 className="text-xl font-bold">{mission.title}</h3><p>{mission.task}</p>
 <p className="text-sm text-muted-foreground">{prices.length?prices.map(t=>`${t.label}: ${formatColones(t.amount)}`).join(' · '):'Tarifa por juego no registrada por su institución. Sin cobro desde esta pantalla.'}</p>
 {tariffs.isError&&<p role="alert">No se pudieron consultar las tarifas.</p>}
 {mission.kind==='order'?<><div className="grid gap-2 sm:grid-cols-2">{[...mission.items].reverse().map(item=><Button key={item} disabled={order.includes(item)} variant="outline" className="h-auto min-h-12 justify-start whitespace-normal text-left" onClick={()=>setOrder([...order,item])}>{item}</Button>)}</div><ol className="list-inside list-decimal space-y-2" aria-label="Secuencia elegida">{order.map(item=><li key={item}>{item}</li>)}</ol></>:<div><p className="mb-2 text-sm">N ↑ · Biblioteca: 📚 · Escuela: 🏫 · Centro de salud: ✚</p><div className="grid aspect-square w-full max-w-sm grid-cols-5 gap-1" role="group" aria-label="Mapa de cinco filas y cinco columnas">{Array.from({length:25},(_,i)=><Button key={i} aria-label={`Fila ${Math.floor(i/5)+1}, columna ${i%5+1}`} aria-pressed={cells.includes(i)} variant={cells.includes(i)?'default':'outline'} className="aspect-square h-auto min-w-0 p-1 text-xl" onClick={()=>{setCells(cells.includes(i)?cells.filter(n=>n!==i):[...cells,i]);setResult('')}}>{mission.kind==='grid'?'▦':i===2?'📚':i===12?'🏫':i===14?'✚':'·'}</Button>)}</div></div>}
 <div className="flex gap-2"><Button disabled={busy} onClick={()=>void check()}>{busy?'Guardando…':'Comprobar'}</Button><Button variant="outline" onClick={reset}>Reiniciar</Button></div><p role="status">{result}</p>
 <details><summary className="cursor-pointer font-semibold">Resumen de la materia</summary><p className="mt-2">{mission.summary}</p></details>
 <p className="text-xs text-muted-foreground">{subjectMissions.length} misiones introductorias; mapas esquemáticos, no geografía real. No cubren toda la malla ni emiten notas o certificados.</p>
 </section>;
}