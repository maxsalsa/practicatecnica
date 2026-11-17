import {useEffect,useRef,useState} from 'react';
import {useQuery,useQueryClient} from '@tanstack/react-query';
import {ArrowUp,ArrowDown,RotateCcw,RotateCw,Lock} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {roadKeyboardAction} from '@/lib/game-controls';
import {useAccount} from '@/components/AccountProvider';
import {supabase} from '@/integrations/supabase/client';
import {saveRecreationalSession,type RecreationalSession} from '@/lib/recreational-progress';
import {matchTariff,formatColones,type Tariff} from '@/lib/institution-pricing';
import {roadCircuits,startDrive,driveStep,roadPoints,roadLevel,roadRunLevel,circuitForBand,drivingBands,bandLabels,roadVehicles,roadSteps,roadKey,parseRoadSubject,roadStepUnlocked,nextRoadStep,vehicleStepsDone,type DrivingBand,type Vehicle,type Maneuver,type DriveState} from '@/lib/road-circuits';

import carImage from '@/assets/road-carro.jpg';
import motoImage from '@/assets/road-moto.jpg';
import truckImage from '@/assets/road-trailer.jpg';
import bikeImage from '@/assets/road-bicicleta.jpg';
import mopedImage from '@/assets/road-bicimoto.jpg';
import taxiImage from '@/assets/road-taxi.jpg';
import busImage from '@/assets/road-autobus.jpg';
import specialImage from '@/assets/road-especial.jpg';
const vehicleImages:Record<Vehicle,string>={carro:carImage,moto:motoImage,trailer:truckImage,bicicleta:bikeImage,bicimoto:mopedImage,taxi:taxiImage,autobus:busImage,especial:specialImage};
const LOCAL_KEY='pt-anonymous-recreation';
type RoadRow=Pick<RecreationalSession,'subject'|'correct'>;

/** Personal road results: Cloud rows for signed-in people, this browser only otherwise. */
function useRoadRows(){
 const {user}=useAccount();
 const [localRows,setLocalRows]=useState<RoadRow[]>([]);
 const readLocal=()=>{try{const rows:RecreationalSession[]=JSON.parse(localStorage.getItem(LOCAL_KEY)??'[]');setLocalRows(rows.filter(r=>r.subject.startsWith('vial-v')))}catch{setLocalRows([])}};
 useEffect(()=>{if(user)return;readLocal();const on=()=>readLocal();window.addEventListener('pt-road-progress',on);window.addEventListener('storage',on);return ()=>{window.removeEventListener('pt-road-progress',on);window.removeEventListener('storage',on)}},[user]);
 const query=useQuery({queryKey:['road-progress',user?.id],enabled:!!user,queryFn:async()=>{if(!user)return [];const {data,error}=await supabase.from('recreational_sessions').select('id,subject,correct,questions,created_at').eq('user_id',user.id).like('subject','vial-v%:%').order('created_at',{ascending:false});if(error)throw error;return data??[];}});
 const rows:RoadRow[]=user?(query.data??[]):localRows;
 const best=new Map<string,number>();
 for(const r of rows){const rec=parseRoadSubject(r.subject);if(!rec)continue;const k=roadKey(rec.circuit,rec.vehicle,rec.band);best.set(k,Math.max(best.get(k)??0,r.correct))}
 return {user,best,completed:new Set(best.keys()),error:query.error,loading:!!user&&query.isLoading,refreshLocal:()=>window.dispatchEvent(new Event('pt-road-progress'))};
}

export function RoadProgress(){
 const {user,best,error}=useRoadRows();
 const total=[...best.values()].reduce((a,b)=>a+b,0);
 const completed=new Set(best.keys());
 const order=(k:string)=>{const [circuit,vehicle,band]=k.split(':');return roadVehicles.findIndex(v=>v.id===vehicle)*100+roadSteps.findIndex(s=>s.circuit===circuit&&s.band===band)};
 const rows=[...best].sort((a,b)=>order(a[0])-order(b[0]));
 return <section className="mt-6 border-t border-border pt-5">
  <h2 className="text-xl font-bold">Mi clasificación vial</h2>
  <p className="mt-2">{total} puntos · Nivel {roadLevel(total)} · {best.size} de {roadSteps.length*roadVehicles.length} pasos completados</p>
  {!user&&<p className="mt-1 text-sm text-muted-foreground">Sin sesión, el progreso se conserva solo en este navegador. Ingrese para guardarlo en su perfil.</p>}
  {error&&<p role="alert" className="mt-2 text-destructive">No se pudo consultar su progreso.</p>}
  <ul className="mt-3 flex flex-wrap gap-2 text-sm" aria-label="Avance por vehículo">{roadVehicles.map(v=><li key={v.id} className="rounded-full border border-border px-3 py-1">{v.label} {vehicleStepsDone(completed,v.id)}/{roadSteps.length}</li>)}</ul>
  {rows.length>0&&<div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><caption className="sr-only">Mejores resultados personales por circuito, vehículo y nivel; no son notas académicas</caption><thead><tr><th className="py-2">Circuito</th><th>Vehículo</th><th>Nivel</th><th className="text-right">Puntos</th></tr></thead><tbody>{rows.map(([k,points])=>{const [circuit,vehicle,band]=k.split(':') as [string,Vehicle,DrivingBand];return <tr key={k} className="border-t border-border"><td className="py-2">{roadCircuits.find(c=>c.id===circuit)?.title??circuit}</td><td>{roadVehicles.find(v=>v.id===vehicle)?.label??vehicle}</td><td>{bandLabels[band]}</td><td className="text-right font-semibold">{points}</td></tr>})}</tbody></table></div>}
  <p className="mt-3 text-sm text-muted-foreground">Recompensas personales: Bronce, Plata (300) y Oro (600). Sin premios monetarios ni certificación.</p>
 </section>;
}

/** Tariffs that the player's own institutions registered for circuits (RLS limits rows to their memberships). */
function useCircuitTariffs(userId:string|undefined){
 return useQuery({queryKey:['circuit-tariffs',userId],enabled:!!userId,staleTime:60_000,queryFn:async()=>{const {data,error}=await supabase.from('institution_tariffs').select('id,institution_id,service,label,level,vehicle,license_category,amount,active').eq('service','circuito_vial').eq('active',true);if(error)throw error;return (data??[]) as (Tariff&{institution_id:string})[];}});
}
function CircuitPrice({userId,band,vehicle}:{userId:string|undefined;band:DrivingBand;vehicle:Vehicle}){
 const q=useCircuitTariffs(userId);const [license,setLicense]=useState('');
 const rows=q.data??[];if(!rows.length)return null;
 const licenses=[...new Set(rows.filter(t=>t.license_category&&(!t.vehicle||t.vehicle===vehicle)&&(!t.level||t.level===band)).map(t=>t.license_category as string))].sort();
 const byInst=new Map<string,(Tariff&{institution_id:string})[]>();for(const t of rows)byInst.set(t.institution_id,[...(byInst.get(t.institution_id)??[]),t]);
 const lic=licenses.includes(license)?license:'';
 const matches=[...byInst.values()].map(list=>matchTariff(list,{service:'circuito_vial',level:band,vehicle,license:lic||null})).filter((t):t is Tariff=>!!t);
 return <div className="mt-3 rounded-xl border border-border bg-card p-3 text-sm">
  {licenses.length>0&&<label className="mb-2 block font-semibold">Tipo de licencia<select className="ml-2 rounded-lg border border-border bg-background p-1" value={lic} onChange={e=>setLicense(e.target.value)}><option value="">Sin especificar</option>{licenses.map(l=><option key={l} value={l}>{l}</option>)}</select></label>}
  {matches.length?matches.map(t=><p key={t.id}>Tarifa institucional: <strong>{formatColones(t.amount)}</strong> · {t.label}</p>):<p>Su institución no registró tarifa para esta combinación.</p>}
  <p className="mt-1 text-xs text-muted-foreground">Precio informativo definido por su institución; la app no cobra este circuito.</p>
 </div>;
}

export function RoadCircuits(){
 const cache=useQueryClient();
 const {user,completed,loading,refreshLocal}=useRoadRows();
 const [circuit,setCircuit]=useState(0);const [vehicle,setVehicle]=useState<Vehicle>('carro');const [band,setBand]=useState<DrivingBand>('inicial');
 const base=roadCircuits[circuit]??roadCircuits[0];const c=base?circuitForBand(base,band):undefined;
 const [state,setState]=useState<DriveState|null>(()=>{const first=roadCircuits[0];return first?startDrive(first,'carro'):null});
 const [save,setSave]=useState('');const [busy,setBusy]=useState(false);const sessionId=useRef<string|null>(null);
 const started=useRef<number|null>(null);const [elapsed,setElapsed]=useState(0);
 if(!c||!state)return null;
 const unlocked=(n:number,b:DrivingBand,v:Vehicle=vehicle)=>roadStepUnlocked(completed,v,n,b);
 const reset=(n:number,v:Vehicle,b:DrivingBand)=>{const next=roadCircuits[n];if(!next||!unlocked(n,b,v))return;setCircuit(n);setVehicle(v);setBand(b);setState(startDrive(circuitForBand(next,b),v));setSave('');sessionId.current=null;started.current=null;setElapsed(0)};
 const chooseVehicle=(v:Vehicle)=>{const step=nextRoadStep(completed,v);reset(step.index,v,step.band)};
 const chooseBand=(b:DrivingBand)=>{const n=roadCircuits.findIndex((_,i)=>unlocked(i,b)&&!completed.has(roadKey(roadCircuits[i]?.id??'',vehicle,b)));reset(n>=0?n:0,vehicle,b)};
 const persist=async(done:DriveState)=>{setBusy(true);const id=sessionId.current??crypto.randomUUID();sessionId.current=id;try{await saveRecreationalSession(user?.id,{id,subject:`vial-v2:${c.id}:${vehicle}:${band}`,questions:100,correct:roadPoints(done,c.goals.length),created_at:new Date().toISOString()});setSave(user?'Guardado en su perfil. Siguiente paso desbloqueado.':'Guardado en este navegador. Siguiente paso desbloqueado.');if(user)await cache.invalidateQueries({queryKey:['road-progress',user.id]});else refreshLocal()}catch{setSave('No se pudo guardar. Reintente.')}finally{setBusy(false)}};
 const move=(a:Maneuver)=>{if(state.done)return;const now=performance.now();if(started.current===null)started.current=now;const next=driveStep(state,c,a);if(next.done){setElapsed(Math.floor((now-started.current)/1000));void persist(next)}setState(next)};
 const goal=c.goals[state.goal];
 const stepNumber=roadSteps.findIndex(s=>s.band===band&&s.index===circuit)+1;
 const next=nextRoadStep(completed,vehicle);const nextIsNew=state.done&&!(next.band===band&&next.index===circuit);
 const lockedHint='Complete el circuito anterior con este vehículo para desbloquear.';
 return <div className="mt-5">
  <fieldset><legend className="text-sm font-semibold">Vehículo</legend><div className="mt-2 flex flex-wrap gap-2">{roadVehicles.map(v=><Button key={v.id} aria-pressed={vehicle===v.id} variant={vehicle===v.id?'default':'outline'} onClick={()=>chooseVehicle(v.id)}><img src={vehicleImages[v.id]} alt="" width={320} height={544} className="h-10 w-6 object-contain"/>{v.label}<span className="text-xs opacity-80">{vehicleStepsDone(completed,v.id)}/{roadSteps.length}</span></Button>)}</div></fieldset>
  <fieldset className="mt-3"><legend className="text-sm font-semibold">Nivel</legend><div className="mt-2 flex flex-wrap gap-2">{drivingBands.map(b=>{const open=unlocked(0,b);return <Button key={b} variant={band===b?'default':'outline'} aria-pressed={band===b} disabled={!open} title={open?undefined:lockedHint} onClick={()=>chooseBand(b)}>{!open&&<Lock aria-hidden="true"/>}{bandLabels[b]}{!open&&<span className="sr-only"> (bloqueado)</span>}</Button>})}</div></fieldset>
  <fieldset className="mt-3"><legend className="text-sm font-semibold">Circuito</legend><div className="mt-2 flex flex-wrap gap-2">{roadCircuits.map((r,n)=>{const open=unlocked(n,band);const done=completed.has(roadKey(r.id,vehicle,band));return <Button key={r.id} variant={n===circuit?'default':'outline'} aria-pressed={n===circuit} disabled={!open} title={open?undefined:lockedHint} onClick={()=>reset(n,vehicle,band)}>{!open&&<Lock aria-hidden="true"/>}{done&&<span aria-hidden="true">✓</span>}{r.title}{!open&&<span className="sr-only"> (bloqueado)</span>}{done&&<span className="sr-only"> (completado)</span>}</Button>})}</div></fieldset>
  <CircuitPrice userId={user?.id} band={band} vehicle={vehicle}/>
  <p className="mt-3 text-sm text-muted-foreground">Paso {stepNumber} de {roadSteps.length} con {roadVehicles.find(v=>v.id===vehicle)?.label}. Cada circuito se desbloquea al completar el anterior con el mismo vehículo{loading?' · cargando su progreso…':''}. Categorías recreativas, sin equivalencia oficial de licencia ni habilitación de transporte público. Recorra las metas numeradas en orden; evite conos y la isla. El tráiler arrastra una segunda casilla.</p>
  <div tabIndex={0} role="group" aria-label="Circuito vial. Flechas o WASD para conducir." onPointerDown={e=>e.currentTarget.focus()} onKeyDown={e=>{const action=roadKeyboardAction(e.key);if(action&&!e.repeat){e.preventDefault();move(action)}}} className="mt-4 grid aspect-square w-full max-w-lg grid-cols-9 border border-border bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
   {Array.from({length:81},(_,i)=>{const x=i%9,y=Math.floor(i/9);const at=(p:{x:number;y:number})=>p.x===x&&p.y===y;const g=c.goals.findIndex(at);const car=at(state.position);const trailer=state.trailer&&at(state.trailer);const island=c.island.some(at);const cone=c.cones.some(at);return <div key={i} aria-hidden="true" className={`flex aspect-square items-center justify-center border border-border text-lg font-bold ${car?'bg-primary text-primary-foreground':trailer?'bg-accent text-accent-foreground':island?'bg-card':g===state.goal?'bg-success text-background':'bg-muted'}`}>{car?<img src={vehicleImages[vehicle]} alt="" width={320} height={544} className={`h-full w-full object-contain ${['rotate-0','rotate-90','rotate-180','-rotate-90'][state.direction]}`}/>:trailer?'▣':cone?'🚧':island?'●':g>=0?g+1:''}</div>})}
  </div>
  <p role="status" className="mt-3">{state.done?'¡Lo logró!':`Meta ${state.goal+1}/${c.goals.length}${goal?` · columna ${goal.x+1}, fila ${goal.y+1}`:''}`} · Posición {state.position.x+1},{state.position.y+1} · Dirección {['norte','este','sur','oeste'][state.direction]} · {state.moves} maniobras · {state.collisions} colisiones</p>
  <div className="mt-4 flex flex-wrap gap-2">{([{a:'izquierda',icon:RotateCcw,text:'Girar izquierda'},{a:'avanzar',icon:ArrowUp,text:'Avanzar'},{a:'retroceder',icon:ArrowDown,text:'Retroceder'},{a:'derecha',icon:RotateCw,text:'Girar derecha'}] as const).map(({a,icon:Icon,text})=><Button key={a} aria-label={text} title={text} disabled={state.done} className="min-h-11 min-w-11" onClick={()=>move(a)}><Icon aria-hidden="true"/></Button>)}<Button variant="outline" onClick={()=>reset(circuit,vehicle,band)}>Reiniciar</Button></div>
  {state.done&&<section aria-label="Resultado del circuito" className="mt-5 border-t border-border pt-5">
   <h2 className="text-xl font-bold">Circuito completado · {c.title} · {bandLabels[band]}</h2>
   <dl className="mt-4 grid grid-cols-3 gap-3"><div><dt className="text-sm text-muted-foreground">Tiempo</dt><dd className="text-xl font-bold">{Math.floor(elapsed/60)}:{String(elapsed%60).padStart(2,'0')}</dd></div><div><dt className="text-sm text-muted-foreground">Errores</dt><dd className="text-xl font-bold">{state.collisions}</dd></div><div><dt className="text-sm text-muted-foreground">Nivel</dt><dd className="text-xl font-bold">{roadRunLevel(state)}</dd></div></dl>
   <p className="mt-4 font-bold">{roadPoints(state,c.goals.length)} puntos recreativos · {state.moves} maniobras</p>
   <p className="mt-2 text-sm text-muted-foreground">Nivel de la partida: Oro sin errores, Plata con 1–2 y Bronce con más. El nivel acumulado aparece en su clasificación personal. Sin límite de tiempo.</p>
   <p role="status" className="mt-2">{busy?'Guardando…':save}</p>
   <div className="mt-3 flex flex-wrap gap-2">{save.startsWith('No se pudo')&&<Button disabled={busy} onClick={()=>void persist(state)}>Reintentar guardado</Button>}{nextIsNew&&!busy&&!save.startsWith('No se pudo')&&unlocked(next.index,next.band)&&<Button onClick={()=>reset(next.index,vehicle,next.band)}>Siguiente: {roadCircuits[next.index]?.title} · {bandLabels[next.band]}</Button>}</div>
  </section>}
  <RoadProgress/>
 </div>;
}
