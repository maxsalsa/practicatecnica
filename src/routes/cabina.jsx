import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { useAccount } from "@/components/AccountProvider";
import { readAttempts } from "@/lib/cloud-progress";
import { aggregateAttempts } from "@/lib/progress-data";
export const Route = createFileRoute("/cabina")({ staticData: { sitemap: false },
    head: () => ({ meta: [{ title: "Cabina de mando · Misiones de estudio · practicatecnica.com" },
            { name: "description", content: "Explore los planetas Primaria, Colegio, CTP, Universidad y Empresas; complete misiones y gane XP." },
            { property: "og:title", content: "Cabina de mando · practicatecnica.com" },
            { property: "og:description", content: "Misiones de estudio con XP y rangos de piloto." },
            { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
        ] }),
    component: Cabina,
});
const PLANETS = [
    { id: "primaria", e: "🪐", name: "Planeta Primaria", who: "Preescolar a 6.º", missions }, { id: "p1", t: "Leer el libro de Preescolar", xp: 10, to: "/libros" }, { id: "p2", t: "Repasar mapas de 1.º a 5.º", xp: 20, to: "/resumen-primaria" }, { id: "p3", t: "Practicar 6.º grado", xp: 30, to: "/sexto" }
];
{
    id: "colegio", e;
    "🌍", name;
    "Planeta Colegio", who;
    "7.º a 11.º", missions;
    {
        id: "c1", t;
        "Elegir mi colegio de ingreso", xp;
        10, to;
        "/ingreso";
    }
    {
        id: "c2", t;
        "Escuchar y pronunciar en inglés", xp;
        20, to;
        "/idiomas";
    }
    {
        id: "c3", t;
        "Lanzar un simulacro", xp;
        30, to;
        "/simulacro";
    }
}
{
    id: "ctp", e;
    "🔴", name;
    "Planeta CTP", who;
    "Talleres y especialidades", missions;
    {
        id: "t1", t;
        "Explorar talleres CTP", xp;
        10, to;
        "/libros";
    }
    {
        id: "t2", t;
        "Curso de metrología", xp;
        20, to;
        "/metrologia";
    }
    {
        id: "t3", t;
        "Temario técnico", xp;
        30, to;
        "/temario";
    }
}
{
    id: "uni", e;
    "🌕", name;
    "Planeta Universidad", who;
    "UCR · TEC · UNA · UTN · UNED", missions;
    {
        id: "u1", t;
        "Hábitos universitarios", xp;
        10, to;
        "/habitos";
    }
    {
        id: "u2", t;
        "Simulacro de admisión", xp;
        30, to;
        "/simulacro";
    }
}
{
    id: "empresa", e;
    "🛰️", name;
    "Estación Empresas", who;
    "Ingenieros, docentes y equipos", missions;
    {
        id: "e1", t;
        "Panel docente de estudiantes", xp;
        10, to;
        "/estudiantes";
    }
    {
        id: "e2", t;
        "Trivia rápida en la ruleta", xp;
        20, to;
        "/ruleta";
    }
}
;
const RANKS = [[0, "🧑‍🚀 Cadete"], [30, "✈️ Piloto"], [600, "🚀 Comandante"], [1500, "⭐ Almirante"]];
function Cabina() {
    const [done, setDone] = useState({});
    const [planet, setPlanet] = useState("primaria");
    const { user, ready } = useAccount();
    const [xp, setXp] = useState(0);
    useEffect(() => { setDone(JSON.parse(localStorage.getItem("pt-missions") || "{}")); }, []);
    useEffect(() => {
        if (!ready || !user) {
            setXp(0);
            return;
        }
        void readAttempts(user.id).then((rows) => setXp(aggregateAttempts(rows).points)).catch(() => setXp(0));
    }, [ready, user]);
    const mark = (id) => { const n = { ...done, [id]: true }; setDone(n); localStorage.setItem("pt-missions", JSON.stringify(n)); };
    const next = RANKS.find(([min]) => min > xp);
    const total = next ? next[0] : xp || 1;
    const rank = [...RANKS].reverse().find(([min]) => xp >= min)[1];
    const P = PLANETS.find((p) => p.id === planet);
    return (<main className="min-h-screen bg-hero">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-5 pb-16">
        <div className="mt-6 rounded-3xl border border-primary bg-card p-6 shadow-card">
          <p className="text-xs font-bold tracking-widest text-accent">CABINA DE MANDO</p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-4xl font-black md:text-5xl">{rank}</h1>
            <p className="text-2xl font-black text-primary">{xp} XP verificada{next ? ` · ${next[0] - xp} para ${next[1]}` : ""}</p>
          </div>
          <div className="mt-4 h-4 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.min(100, (xp / total) * 100)}%` }}/>
          </div>
          <p className="mt-2 text-right text-2xl" style={{ paddingRight: `${100 - Math.min(100, (xp / total) * 100)}%` }}>🚀</p>
        </div>
        <h2 className="mt-10 text-2xl font-black">Elija su planeta</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
          {PLANETS.map((p) => {
            const c = p.missions.filter((m) => done[m.id]).length;
            return (<button key={p.id} onClick={() => setPlanet(p.id)} className={`rounded-2xl border p-4 text-center transition hover:-translate-y-1 ${planet === p.id ? "border-primary bg-primary text-primary-foreground" : "bg-card"}`}>
                <div className="text-5xl">{p.e}</div>
                <div className="mt-2 font-black">{p.name}</div>
                <div className="text-xs">{p.who}</div>
                <div className="mt-1 text-xs font-bold">{c}/{p.missions.length} misiones</div>
              </button>);
        })}
        </div>
        <h2 className="mt-10 text-2xl font-black">{P.e} Misiones de {P.name}</h2>
        <div className="mt-4 grid gap-3">
          {P.missions.map((m) => (<div key={m.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-card p-4">
              <div><p className="font-bold">{done[m.id] ? "✅" : "🛸"} {m.t}</p><p className="text-xs text-accent">Gane hasta {m.xp} XP por ejercicio aprobado</p></div>
              <div className="flex gap-2">
                <Link to={m.to} className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Despegar →</Link>
                {!done[m.id] && <button onClick={() => mark(m.id)} className="rounded-full border px-4 py-2 text-sm font-bold">Visitada ✓</button>}
              </div>
            </div>))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">{user ? "Su rango sube solo con XP verificada (10, 20 o 30 XP según dificultad)." : "Ingrese a su cuenta para sumar XP verificada y subir de rango."}</p>
      </section>
    </main>);
}
