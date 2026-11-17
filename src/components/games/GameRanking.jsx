import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAccount } from '@/components/AccountProvider';
export const gameLevel = (xp) => ({ level: Math.floor(xp / 200) + 1, toNext: 200 - (xp % 200) });
export function GameRanking() {
    const { user } = useAccount();
    const q = useQuery({ queryKey: ['recreation-ranking', user?.id], enabled: !!user, queryFn() { } });
    {
        const { data, error } = await supabase.rpc('my_recreation_rank', { _days: 7 });
        if (error)
            throw new Error('No se pudo leer el ranking.');
        return data ?? [];
    }
}
;
if (!user)
    return null;
const me = q.data?.[0];
const xp = Number(me?.points ?? 0);
const lv = gameLevel(xp);
return <section className="mt-6 rounded-2xl border border-border bg-card p-4 sm:p-6" aria-label="Juegos ranking">
    <h2 className="text-xl font-black">🎮 Juegos de la semana</h2>
    <div className="mt-3 flex flex-wrap gap-2 text-sm">
      <span className="rounded-lg border border-primary px-3 py-2">⚡ {xp} puntos</span>
      <span className="rounded-lg border border-accent px-3 py-2">⭐ Nivel {lv.level} · faltan {lv.toNext} XP</span>
      <span className="rounded-lg border border-border px-3 py-2">🎯 {Number(me?.games ?? 0)} partidas</span>
    </div>
    <p className="mt-2 text-xs text-muted-foreground">10 puntos por respuesta correcta en juegos. Son puntos recreativos certificados.</p>
    {q.isPending ? <p role="status" className="mt-3">Cargando posición…</p> : q.error ? <p role="alert" className="mt-3">{q.error.message}</p> :
        <p className="mt-4 text-lg font-bold text-primary">{me ? `🏆 Su posición: ${me.rank} de ${me.players} jugadores` : 'Aún no tiene partidas esta semana. ¡Juegue para entrar al ranking!'}</p>}
    <p className="mt-1 text-xs text-muted-foreground">Por privacidad, solo usted ve su posición; no se muestran nombres de otras personas.</p>
  </section>;
