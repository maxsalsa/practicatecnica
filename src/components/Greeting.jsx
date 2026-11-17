import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { loadProfile, loadStreak, type Profile } from "@/lib/profile";
import { useAccount } from "./AccountProvider";
import { supabase } from "@/integrations/supabase/client";
import { readAttempts } from "@/lib/cloud-progress";
import { aggregateAttempts, costaRicaDay } from "@/lib/progress-data";

export function Greeting() {
  const { user, ready } = useAccount();
  const [p, setP] = useState<Profile | null>(null);
  const [st, setSt] = useState({ count: 0, xp: 0, xpDay: "" });
  useEffect(() => {
    if (!ready) return;
    let active = true;
    if (!user) {
      setP(loadProfile());
      setSt(loadStreak());
      return;
    }
    setP(null);
    void Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).single(),
      readAttempts(user.id),
    ])
      .then(([result, rows]) => {
        if (!active || !result.data) return;
        const d = result.data;
        setP({
          name: d.display_name,
          avatar: d.avatar,
          level: d.level,
          goal: d.goal,
          dailyXp: d.daily_xp,
        });
        setSt(aggregateAttempts(rows).streak);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [user?.id, ready]);
  if (!p) return null;
  const today = costaRicaDay();
  const xp = st.xpDay === today ? st.xp : 0;
  const pct = Math.min(100, Math.round((xp / p.dailyXp) * 100));
  return (
    <div className="mx-auto mt-4 flex max-w-xl flex-wrap items-center gap-4 rounded-2xl border bg-card p-4">
      <span className="text-3xl">{p.avatar}</span>
      <div className="min-w-40 flex-1">
        <p className="font-bold">
          {p.name ? (
            `¡Hola, ${p.name}!`
          ) : (
            <Link to="/perfil" className="text-primary">
              Cree su perfil →
            </Link>
          )}
        </p>
        <p className="text-xs text-muted-foreground">
          Meta diaria: {xp}/{p.dailyXp} XP · {p.goal}
        </p>
        <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <span className="rounded-full bg-secondary px-3 py-1 text-sm font-bold">
        🔥 {st.count} {st.count === 1 ? "día" : "días"}
      </span>
    </div>
  );
}
