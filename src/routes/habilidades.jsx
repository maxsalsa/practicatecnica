import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Quiz } from "@/components/Quiz";
import { useAccount } from "@/components/AccountProvider";
import { supabase } from "@/integrations/supabase/client";
import { decks } from "@/lib/questions";
import { malla } from "@/lib/malla";
import { AuthorizedContent } from '@/components/AuthorizedContent';
export const Route = createFileRoute("/habilidades")({ staticData: { sitemap: false },
    head: () => ({
        meta: [{ title: "Mapa de habilidades y reto relámpago | practicatecnica.com" },
            { name: "description", content: "Vea su dominio por categoría, practique su punto débil y juegue el reto relámpago de 60 segundos." },
            { property: "og:title", content: "Mapa de habilidades | practicatecnica.com" },
            { property: "og:description", content: "Control de conocimientos por categoría con bandas de dominio y juego relámpago." },
            { property: "og:type", content: "website" },
            { name: "twitter:card", content: "summary" },
        ],
    }),
    component: Flash,
});
const CAT = {};
malla.forEach((m) => m.niveles.forEach((n) => n.materias.forEach((x) => x.decks.forEach((d) => { CAT[d] ??= `${m.emoji} ${m.name}`; }))));
const band = (p) => (p >= 80 ? ["Dominado", "bg-accent"] : p >= 50 ? ["En proceso", "bg-primary"] : ["Reforzamiento", "bg-destructive"]);
const shuffle = (a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
} return b; };
function Flash({ onExit, deck }) {
    const pool = useMemo(() => shuffle(deck.questions).slice(0, 40), [deck]);
    const [i, setI] = useState(0);
    const [ok, setOk] = useState(0);
    const [t, setT] = useState(60);
    const [streak, setStreak] = useState(0);
    const [best, setBest] = useState(0);
    const [flash, setFlash] = useState("");
    useEffect(() => { if (t <= 0)
        return; const id = setTimeout(() => setT(t - 1), 1000); return () => clearTimeout(id); }, [t]);
    const q = pool[i % pool.length];
    function pick(k) {
        const good = k === q.answer;
        setFlash(good ? "ok" : "no");
        setTimeout(() => setFlash(""), 250);
        if (good) {
            setOk(ok + 1);
            setStreak(streak + 1);
            setBest(Math.max(best, streak + 1));
        }
        else
            setStreak(0);
        setI(i + 1);
    }
    if (t <= 0)
        return (<div className="rounded-2xl border border-primary bg-card p-6 text-center shadow-card">
      <h2 className="text-3xl font-black">⚡ ¡Tiempo!</h2>
      <p className="mt-2 text-xl">{ok} aciertos de {i} · mejor racha {best} 🔥</p>
      <p className="mt-1 text-muted-foreground">{ok >= 12 ? "Nivel Diamante precisión de experto." : ok >= 7 ? "Muy bien así y sube de liga." : "Cada intento entrena su cerebro. ¡Otra vez!"}</p>
      <div className="mt-4 flex justify-center gap-2"><button className="rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground" onClick={() => { setI(0); setOk(0); setT(60); setStreak(0); }}>Jugar otra vez</button><button className="rounded-xl border px-5 py-3 font-bold" onClick={onExit}>Salir</button></div>
    </div>);
    return (<div className={`rounded-2xl border bg-card p-6 shadow-card transition ${flash === "ok" ? "border-accent" : flash === "no" ? "border-destructive" : "border-border"}`}>
      <div className="flex justify-between font-bold"><span>⏱️ {t}s</span><span>✅ {ok} · 🔥 {streak}</span></div>
      <div className="mt-2 h-2 rounded bg-muted"><div className="h-2 rounded bg-primary transition-all" style={{ width: `${(t / 60) * 100}%` }}/></div>
      <p className="mt-5 text-lg font-semibold">{q.q}</p>
      <div className="mt-4 grid gap-2">{q.options.map((o, k) => <button key={k} onClick={() => pick(k)} className="rounded-xl border border-border px-4 py-3 text-left hover:border-primary">{"ABCD"[k]}) {o}</button>)}</div>
    </div>);
}
function Habilidades() {
    const { user } = useAccount();
    const [rows, setRows] = useState([]);
    const [mode, setMode] = useState("");
    const [run, setRun] = useState(null);
    useEffect(() => { if (!user)
        return; supabase.from("practice_attempts").select("deck_id,score").eq("user_id", user.id).limit(1000).then(({ data }) => setRows(data ?? [])); }, [user?.id]);
    const byCat = useMemo(() => {
        const m = new Map < string, { sum: number };
        n: number;
        decks, { sum: number, n } > ;
    },  > ());
    rows.forEach((r) => { const c = CAT[r.deck_id] ?? "🧩 Otras"; const e = m.get(c) ?? { sum: 0, n: 0, decks }; e.sum += r.score; e.n++; const d = e.decks.get(r.deck_id) ?? { sum: 0, n: 0 }; d.sum += r.score; d.n++; e.decks.set(r.deck_id, d); m.set(c, e); });
    return [...m].map(([c, e]) => ({ c, p: Math.round(e.sum / e.n), n: e.n, decks: [...e.decks].map(([id, d]) => ({ id, p: Math.round(d.sum / d.n), n: d.n })).sort((a, b) => a.p - b.p) })).sort((a, b) => a.p - b.p);
}
[rows];
;
const weakest = byCat[0]?.decks[0];
const weakDeck = weakest && decks.find((d) => d.id === weakest.id);
return (<main className="min-h-screen bg-hero"><SiteHeader />
      <section className="mx-auto max-w-4xl space-y-6 px-5 pb-16">
        <h1 className="mt-6 text-4xl font-black">🧠 Mapa de habilidades</h1>
        {run ? <Quiz key={run.id} deck={run} onExit={() => setRun(null)}/> : mode === "flash" ? <AuthorizedContent id="mixto-60">{deck => <Flash deck={deck} onExit={() => setMode("")}/>}</AuthorizedContent> : (<>
          <div className="grid gap-3 sm:grid-cols-2">
            <button onClick={() => setMode("flash")} className="rounded-2xl border border-primary bg-card p-5 text-left shadow-card"><p className="text-2xl font-black">⚡ Reto relámpago</p><p className="text-muted-foreground">60 segundos, preguntas de todas las materias. ¿Cuántas acierta seguidas?</p></button>
            <button disabled={!weakDeck} onClick={() => weakDeck && setRun(weakDeck)} className="rounded-2xl border border-accent bg-card p-5 text-left shadow-card disabled:opacity-60"><p className="text-2xl font-black">🎯 Entrenar mi punto débil</p><p className="text-muted-foreground">{weakDeck ? `${weakDeck.title} · ${weakest.p}%` : "Haga prácticas para detectarlo automáticamente."}</p></button>
          </div>
          {!user && <p className="rounded-xl border border-border bg-card p-4">Inicie sesión para ver su dominio por categoría. <Link to="/auth" className="font-bold text-primary">Ingresar</Link></p>}
          {user && !byCat.length && <p className="rounded-xl border border-border bg-card p-4">Aún no hay prácticas. <Link to="/explorar" className="font-bold text-primary">Elegir materia</Link></p>}
          <div className="grid gap-3">{byCat.map((c) => {
            const [b, col] = band(c.p);
            return (<details key={c.c} className="rounded-2xl border border-border bg-card p-4">
              <summary className="cursor-pointer"><span className="font-bold">{c.c}</span> · {c.p}% · <span className="font-semibold">{b}</span> <span className="text-sm text-muted-foreground">({c.n} intentos)</span>
                <div className="mt-2 h-3 rounded bg-muted"><div className={`h-3 rounded ${col}`} style={{ width: `${c.p}%` }}/></div></summary>
              <ul className="mt-3 space-y-2">{c.decks.map((d) => {
                    const dk = decks.find((x) => x.id === d.id);
                    return (<li key={d.id} className="flex flex-wrap items-center justify-between gap-2 text-sm"><span>{dk?.emoji} {dk?.title ?? d.id} · {d.p}% · {band(d.p)[0]}</span>{dk && <button className="rounded-lg border px-3 py-1 font-bold" onClick={() => setRun(dk)}>Practicar</button>}</li>);
                })}</ul>
            </details>);
        })}</div>
        </>)}
      </section>
    </main>);
