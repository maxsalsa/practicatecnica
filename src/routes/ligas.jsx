import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { readAttempts } from "@/lib/cloud-progress";
import { aggregateAttempts } from "@/lib/progress-data";

export const Route = createFileRoute("/ligas")({staticData:{sitemap:false},
  head: () => ({ meta: [
    { title: "Ligas Técnicas semanales · pracTICAtecnica.com" },
    { name: "description", content: "Compita cada semana en las Ligas Bronce, Plata, Oro y Diamante: ascienda, gane cofres y nuevos avatares." },
    { property: "og:title", content: "Ligas Técnicas semanales · pracTICAtecnica.com" },
    { property: "og:description", content: "Ascenso, descenso y cofres de recompensa cada semana." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Ligas,
});

const TIERS = ["🥉 Bronce", "🥈 Plata", "🥇 Oro", "💎 Diamante"];
type Row = { name: string; avatar: string; points: number; is_me: boolean; my_tier: number; chest: string | null; chest_claimed: boolean | null };

function daysLeft() {
  const cr = new Date(Date.now() - 6 * 3600e3); const d = cr.getUTCDay(); return d === 0 ? 1 : 8 - d;
}

function Ligas() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [won, setWon] = useState<string | null>(null);
  const [stats, setStats] = useState({ total: 0, streak: 0 });
  const [hist, setHist] = useState<{ closed_at: string; from_tier: number; to_tier: number; points: number; rank: number }[]>([]);
  const [admin, setAdmin] = useState(false);
  const [msg, setMsg] = useState("");

  const load = async () => {
    const { data: s } = await supabase.auth.getSession();
    if (!s.session) { setSignedIn(false); return; }
    setSignedIn(true);
    const { data } = await supabase.rpc("league_standings");
    setRows((data ?? []) as Row[]);
    const uid = s.session.user.id;
    const [att, h, a] = await Promise.all([
      readAttempts(uid),
      supabase.from("league_history").select("closed_at,from_tier,to_tier,points,rank").eq("user_id", uid).order("closed_at", { ascending: false }).limit(20),
      supabase.rpc("has_role", { _user_id: uid, _role: "admin" }),
    ]);
    setStats({ total: att.reduce((t, r) => t + (r.earned_points ?? 0), 0), streak: aggregateAttempts(att).streak.count });
    setHist((h.data ?? []) as typeof hist);
    setAdmin(a.data === true);
  };
  useEffect(() => { void load(); }, []);

  const me = rows?.find((r) => r.is_me);
  const n = rows?.length ?? 0;
  const closeWeek = async () => {
    if (!confirm("¿Cerrar la semana ahora? Se aplicarán ascensos, descensos y cofres a todas las ligas.")) return;
    const { error } = await supabase.rpc("league_close_now");
    setMsg(error ? "No se pudo cerrar la semana." : "✅ Semana cerrada: ascensos, descensos y cofres aplicados.");
    setWon(null); void load();
  };
  const claim = async () => { const { data } = await supabase.rpc("league_claim_chest"); if (data) { setWon(data as string); void load(); } };

  return (
    <main className="min-h-screen bg-hero">
      <SiteHeader />
      <section className="mx-auto max-w-3xl px-5 pb-16">
        <h1 className="mt-6 text-4xl font-black">🏆 Ligas Técnicas</h1>
        <p className="mt-2 text-muted-foreground">Cada ejercicio correcto suma XP. Al cerrar la semana (domingo), los 5 primeros suben de liga y ganan un cofre; los 3 últimos bajan si la liga tiene 8 o más personas. Solo se muestra primer nombre e inicial.</p>
        {signedIn === false && <p className="mt-6 rounded-2xl border bg-card p-5">Para competir, <Link to="/auth" className="font-bold text-primary">inicie sesión</Link>.</p>}
        {rows && me && (
          <>
            <div className="mt-6 grid grid-cols-4 gap-2 text-center text-sm">
              {TIERS.map((t, i) => <div key={t} className={`rounded-xl border p-2 ${i === me.my_tier ? "bg-primary font-black text-primary-foreground" : "bg-card"}`}>{t}</div>)}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-center md:grid-cols-4">
              <div className="rounded-2xl border bg-card p-3"><div className="text-xs text-muted-foreground">Liga</div><div className="font-black">{TIERS[me.my_tier]}</div></div>
              <div className="rounded-2xl border bg-card p-3"><div className="text-xs text-muted-foreground">XP esta semana</div><div className="font-black text-primary">{me.points}</div></div>
              <div className="rounded-2xl border bg-card p-3"><div className="text-xs text-muted-foreground">XP total</div><div className="font-black">{stats.total}</div></div>
              <div className="rounded-2xl border bg-card p-3"><div className="text-xs text-muted-foreground">Racha</div><div className="font-black">🔥 {stats.streak} días</div></div>
            </div>
            {admin && <div className="mt-4 rounded-2xl border bg-card p-4"><button onClick={closeWeek} className="rounded-full bg-destructive px-5 py-2 font-black text-destructive-foreground">🔒 Cerrar la semana ahora (admin)</button>{msg && <p className="mt-2 font-bold">{msg}</p>}</div>}
            <p className="mt-4 font-bold">⏳ Faltan {daysLeft()} día(s) para el cierre. {me.points === 0 && "🔥 ¡Practique hoy para no quedarse atrás!"}</p>
            {me.chest && (
              <div className="mt-4 rounded-2xl border bg-card p-5 text-center">
                {me.chest_claimed || won ? <p className="text-lg font-black">🎁 Cofre abierto: nuevo avatar {won ?? me.chest} ya está en su perfil.</p>
                  : <button onClick={claim} className="rounded-full bg-accent px-6 py-3 font-black text-accent-foreground">🎁 Abrir cofre de la semana pasada</button>}
              </div>
            )}
            <ol className="mt-6 space-y-2">
              {rows.map((r, i) => {
                const zone = i < 5 && r.points > 0 ? "border-accent" : n >= 8 && i >= n - 3 ? "border-destructive" : "";
                return (
                  <li key={i} className={`flex items-center gap-3 rounded-2xl border-2 bg-card p-3 ${zone} ${r.is_me ? "ring-2 ring-primary" : ""}`}>
                    <span className="w-6 text-center font-black">{i + 1}</span><span className="text-2xl">{r.avatar}</span>
                    <span className="flex-1 font-bold">{r.name}{r.is_me && " (usted)"}</span><span className="font-black text-primary">{r.points} XP</span>
                  </li>
                );
              })}
            </ol>
            <h2 className="mt-8 text-2xl font-black">📜 Historial de ascensos y descensos</h2>
            {hist.length === 0 ? <p className="mt-2 text-muted-foreground">Aún no hay semanas cerradas.</p> : (
              <ul className="mt-3 space-y-2">{hist.map((x, i) => (
                <li key={i} className="flex flex-wrap items-center gap-2 rounded-xl border bg-card p-3 text-sm">
                  <span className="font-bold">{new Date(x.closed_at).toLocaleDateString("es-CR")}</span>
                  <span>{TIERS[x.from_tier]} → {TIERS[x.to_tier]}</span>
                  <span className="font-black">{x.to_tier > x.from_tier ? "⬆️ Ascendió" : x.to_tier < x.from_tier ? "⬇️ Descendió" : "➖ Se mantuvo"}</span>
                  <span className="ml-auto text-muted-foreground">#{x.rank} · {x.points} XP</span>
                </li>))}</ul>
            )}
            <p className="mt-3 text-xs text-muted-foreground">Borde verde: zona de ascenso · Borde rojo: zona de descenso.</p>
          </>
        )}
      </section>
    </main>
  );
}
