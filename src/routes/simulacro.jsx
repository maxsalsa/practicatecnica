import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { BlindExam } from "@/components/BlindExam";
const pneDecks = decks.filter(d => d.id.startsWith("pne-"));
import { Button } from "@/components/ui/button";
import { decks, type Deck } from "@/lib/questions";
import { GRADE6_VERSIONS, grade6MixedDeck } from "@/lib/grade6";
import { EXAM_SIZE } from '@/lib/assessment-size';

export const Route = createFileRoute("/simulacro")({staticData:{sitemap:true},
  validateSearch: (search: Record<string, unknown>): { deck?: string } => {
    const id = search['deck'];
    return typeof id === "string" && decks.some(d => d.id === id) ? { deck: id } : {};
  },
  head: () => ({
    meta: [
      { title: "Simulacro cronometrado · pracTICAtecnica.com" },
      {
        name: "description",
        content: "Simulacros con tiempo, pausa y nota final: MOPT, admisión, CTP, Historia, Español y más.",
      },
      { property: "og:title", content: "Simulacro cronometrado · pracTICAtecnica.com" },
      { property: "og:description", content: "Practique como en la prueba real, con tiempo y retroalimentación." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Simulacro,
});

const SECONDS_PER_QUESTION = 90;

function mixed60(): Deck { return {id:"mixto-60",title:"Simulacro general de 60 ítems",emoji:"🧭",level:"General",questions:[]}; }

function Simulacro() {
  const search = Route.useSearch();
  const [deck, setDeck] = useState<Deck | null>(null);
  const [selected, setSelected] = useState('');
  const [blind, setBlind] = useState<Deck | null>(() => decks.find(d => d.id === search.deck) ?? null);
  function start(d: Deck) {
    setDeck(d);
  }

  if (blind) return (<main className="min-h-screen bg-hero"><SiteHeader /><BlindExam deck={blind} onExit={() => setBlind(null)} /></main>);
  return (
    <main className="min-h-screen bg-hero">
      <SiteHeader />
      {deck ? (
        <BlindExam key={deck.id} deck={deck} onExit={() => setDeck(null)} />
      ) : (
        <section className="mx-auto max-w-5xl px-5 pb-16">
          <p className="text-sm font-semibold text-primary">Modo prueba</p>
          <h1 className="mt-2 text-4xl font-black">Simulacros cronometrados</h1>
          <label className="mt-5 grid gap-2 font-semibold">Materia o prueba
            <select aria-label="Materia o prueba" value={selected} onChange={e => setSelected(e.target.value)} className="w-full rounded-md border border-border bg-card p-3">
              <option value="">Seleccione una materia o prueba</option>
              {decks.filter(d => !d.id.startsWith('arena-')).map(d => <option key={d.id} value={d.id}>{d.title} · {d.questionCount ?? d.questions.length} preguntas</option>)}
            </select>
          </label>
          {selected && (() => { const d = decks.find(d => d.id === selected); if (!d) return null; const count = d.questionCount ?? d.questions.length; return <section className="mt-5 border-y border-border py-5"><h2 className="text-xl font-bold">{d.title}</h2><p className="mt-2 text-sm text-muted-foreground">{count} preguntas disponibles</p><div className="mt-3 flex flex-wrap gap-3"><Button disabled={count !== EXAM_SIZE} onClick={() => setBlind(d)}>Iniciar simulacro</Button><Button asChild variant="outline"><Link to="/explorar" search={{ banco: d.id }}>Ver prácticas y materiales</Link></Button></div>{count !== EXAM_SIZE && <p className="mt-3 text-sm text-muted-foreground">Este banco aún no reúne las {EXAM_SIZE} preguntas requeridas para un simulacro completo.</p>}</section>; })()}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild><Link to="/aprender" search={{materia:'english'}}>Inglés · 3 bloques</Link></Button>
            <Button asChild variant="outline"><Link to="/aprender" search={{materia:'accounting'}}>Accounting · 3 bloques</Link></Button>
            <Button asChild variant="outline"><Link to="/aprender" search={{materia:'web'}}>Materias técnicas</Link></Button>
          </div>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Preguntas y opciones en orden aleatorio, {SECONDS_PER_QUESTION / 60} minutos por pregunta, pausa
            disponible y nota final con repaso de errores.
          </p>
          <details className="mt-8 border-t border-border pt-5"><summary className="cursor-pointer font-bold">Otras pruebas y catálogo completo</summary>
          <article className="mt-8 rounded-2xl border-2 border-primary bg-card p-6 shadow-card">
            <div className="text-4xl" aria-hidden>🧭</div>
            <h2 className="mt-2 text-2xl font-black">Simulacro general de 60 ítems</h2>
            <p className="mt-1 text-sm text-muted-foreground">60 preguntas al azar de las {decks.reduce((n, d) => n + (d.questionCount ?? d.questions.length), 0)} del banco · 90 min · hoja de respuestas con dudas, fallos, correcciones y nota proporcional. Cada intento sale distinto.</p>
            <Button className="mt-4" onClick={() => setBlind(mixed60())}>Empezar simulacro de 60</Button>
          </article>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {pneDecks.map((d) => (
              <article key={d.id} className="rounded-2xl border border-accent bg-card p-5 shadow-card">
                <div className="text-3xl" aria-hidden>{d.emoji}</div>
                <h2 className="mt-2 text-xl font-extrabold">Prueba Nacional · {d.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{(d.questionCount ?? d.questions.length)} ítems del cuadernillo 01-2026 · modo ciego · hoja de respuestas A-B-C-D</p>
                <Button className="mt-4" onClick={() => setBlind(d)}>Empezar simulacro ciego</Button>
              </article>
            ))}
          </div>
          <article className="mt-8 rounded-2xl border border-primary bg-card p-5">
            <div className="text-3xl" aria-hidden>🎒</div>
            <h2 className="mt-3 text-xl font-extrabold">Simulacro completo de 6.º grado</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              12 preguntas: Matemática, Ciencias, Español y Estudios Sociales · 18 min · {GRADE6_VERSIONS} versiones
            </p>
            <Button className="mt-4" onClick={() => start(grade6MixedDeck(Math.floor(Math.random() * GRADE6_VERSIONS)))}>
              Iniciar simulacro de 6.º
            </Button>
          </article>
          <h2 className="mt-10 text-lg font-bold">Por prueba o materia</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {decks.filter(d => !pneDecks.some(p => p.id === d.id) && !d.id.startsWith('arena-') && (d.questionCount??d.questions.length)>=20).map((d) => (
              <article key={d.id} className="rounded-2xl border bg-card p-5">
                <div className="text-3xl" aria-hidden>{d.emoji}</div>
                <h2 className="mt-3 text-xl font-extrabold">{d.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {(d.questionCount ?? d.questions.length)} preguntas · {Math.ceil(((d.questionCount ?? d.questions.length) * SECONDS_PER_QUESTION) / 60)} min
                </p>
                <Button className="mt-4" onClick={() => setBlind(d)}>Iniciar con hoja de respuestas</Button>
              </article>
            ))}
          </div>
          </details>
        </section>
      )}
    </main>
  );
}
