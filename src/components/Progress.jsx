import { useEffect, useState, type ReactNode } from "react";
import type { Deck } from "@/lib/questions";

import type { Stat } from "@/lib/progress-data";
import { aggregateAttempts, costaRicaDay } from "@/lib/progress-data";
import { readAttempts } from "@/lib/cloud-progress";
import { useAccount } from "./AccountProvider";
import { Link } from "@tanstack/react-router";
const KEY = "pt-stats";

export function saveAttempt(deck: Deck, pct: number, earned = 0) {
  const all: Record<string, Stat> = JSON.parse(localStorage.getItem(KEY) || "{}");
  const s = all[deck.id] ?? { title: deck.title, attempts: 0, best: 0, last: 0, history: [] };
  s.attempts += 1;
  s.last = pct;
  s.best = Math.max(s.best, pct);
  s.history = [...s.history, pct].slice(-10);
  all[deck.id] = s;
  localStorage.setItem(KEY, JSON.stringify(all));
  const today = costaRicaDay();
  const st = JSON.parse(
    localStorage.getItem("pt-streak") || '{"last":"","count":0,"xpDay":"","xp":0}',
  );
  if (st.last !== today) {
    const y = costaRicaDay(new Date(Date.now() - 864e5));
    st.count = st.last === y ? st.count + 1 : 1;
    st.last = today;
  }
  if (st.xpDay !== today) {
    st.xpDay = today;
    st.xp = 0;
  }
  st.xp += earned;
  localStorage.setItem(
    "pt-earned-points",
    String(Number(localStorage.getItem("pt-earned-points") || 0) + earned),
  );
  localStorage.setItem("pt-streak", JSON.stringify(st));
}

export function levelFor(points: number) {
  if (points >= 2000) return "Liga Diamante 💎";
  if (points >= 1000) return "Liga Oro 🥇";
  if (points >= 400) return "Liga Plata 🥈";
  return "Liga Bronce 🥉";
}

export function Progress({ empty = null }: { empty?: ReactNode }) {
  const { user, ready } = useAccount();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [cloudPoints, setCloudPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [stats, setStats] = useState<Record<string, Stat>>({});
  useEffect(() => {
    if (!ready) return;
    let active = true;
    setStats({});
    setError("");
    setLoading(true);
    if (!user) {
      setStats(JSON.parse(localStorage.getItem(KEY) || "{}"));
      setLoading(false);
      return;
    }
    void readAttempts(user.id)
      .then((rows) => {
        if (!active) return;
        const result = aggregateAttempts(rows);
        setStats(result.stats);
        setCloudPoints(result.points);
        setStreak(result.streak.count);
      })
      .catch(() => {
        if (active) setError("No se pudo cargar su avance en la nube.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [user?.id, ready]);
  const list = Object.values(stats);
  if (loading) return <p className="mt-8 text-muted-foreground">Cargando su avance…</p>;
  if (error)
    return (
      <p role="alert" className="mt-8 text-destructive">
        {error}
      </p>
    );
  if (!list.length)
    return (
      <>
        {!user && (
          <p className="mt-6 text-sm text-muted-foreground">
            Avance guardado en este navegador.{" "}
            <Link to="/auth" className="text-primary">
              Ingrese para guardar nuevas prácticas en la nube.
            </Link>
          </p>
        )}
        {empty}
      </>
    );
  const avg = Math.round(list.reduce((a, s) => a + s.last, 0) / list.length);
  const points = user ? cloudPoints : Number(localStorage.getItem("pt-earned-points") || 0);
  const mastered = list.filter((s) => s.best >= 80);
  const improve = list.filter((s) => s.best < 70);

  return (
    <section className="mt-14">
      <h2 className="text-3xl font-black">Su avance</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {user ? `Guardado en la nube · ${streak} días de racha` : "Guardado en este navegador"}
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Box label="Nota promedio" value={`${avg}`} />
        <Box label="Puntos" value={`${points}`} />
        <Box label="Liga" value={levelFor(points)} />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-card p-5">
          <h3 className="font-bold">✅ Habilidades completadas</h3>
          {mastered.length ? (
            mastered.map((s) => (
              <p key={s.title} className="mt-2 text-sm">
                {s.title} · {s.best}%
              </p>
            ))
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              Logre 80% o más en una práctica para completarla.
            </p>
          )}
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <h3 className="font-bold">📈 Oportunidades de mejora</h3>
          {improve.length ? (
            improve.map((s) => (
              <p key={s.title} className="mt-2 text-sm">
                {s.title}: {s.best}% → repase sus errores hasta superar 70.
              </p>
            ))
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              ¡Todo aprobado! Suba a 80% para dominarlo.
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 rounded-2xl border bg-card p-5">
        <h3 className="font-bold">🧠 Conocimientos adquiridos</h3>
        <div className="mt-3 grid gap-2">
          {list.map((s) => (
            <div key={s.title} className="text-sm">
              <div className="flex justify-between">
                <span>{s.title}</span>
                <span className="text-muted-foreground">{s.attempts} intentos</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-accent" style={{ width: `${s.best}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Box({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </div>
  );
}
