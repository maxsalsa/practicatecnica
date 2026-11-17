import {useQuery} from '@tanstack/react-query';
import {useAccount} from './AccountProvider';
import {readAttempts} from '@/lib/cloud-progress';
import {topicPoints} from '@/lib/topic-points';
export function TopicPoints(){
 const {user}=useAccount();
 const q=useQuery({queryKey:['topic-points',user?.id],enabled:!!user,queryFn:async()=>{if(!user)return {};return topicPoints(await readAttempts(user.id));}});
 if(!user)return null;
 return <section className="my-5 space-y-3 border-y border-border py-4" aria-label="Puntaje acumulado por tema"><h2 className="text-xl font-bold">Puntaje acumulado por tema</h2>{q.isPending?<p role="status">Cargando puntos…</p>:q.isError?<p role="alert">No se pudieron cargar sus puntos.</p>:Object.keys(q.data??{}).length?<ul className="grid gap-3 sm:grid-cols-2">{Object.entries(q.data??{}).map(([key,s])=><li key={key} className="min-w-0 rounded-md border border-border bg-card p-3"><p className="break-words font-bold">{s.title}</p><p className="text-primary">{s.points} XP</p><p className="text-sm text-muted-foreground">{s.attempts} intentos verificados · mejor nota {s.best}%</p></li>)}</ul>:<p className="text-sm text-muted-foreground">Aún no hay puntos verificados por tema.</p>}</section>;
}