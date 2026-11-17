import specScene from '@/assets/illustrations/specialties-campus.jpg';
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Quiz } from "@/components/Quiz";
import { cuadernillos } from "@/lib/cuadernillos";
import { decks } from "@/lib/questions";
import { specialtyDeckIds } from "@/lib/specialty-decks";
import { Button } from "@/components/ui/button";
import { findSpecialties, specialtyFamily } from "@/lib/material-search";

const DECK_BY_CODE = specialtyDeckIds;

export const Route = createFileRoute("/especialidades")({staticData:{sitemap:true},
  validateSearch: (search: Record<string, unknown>) => ({ code: typeof search['code'] === "string" ? search['code'] : undefined }),
  head: () => ({
    meta: [
      { title: "Elegir materia o especialidad | pracTICAtecnica.com" },
      { name: "description", content: "Elija su materia o especialidad CTP, descargue el cuadernillo PDF y practique." },
      { property: "og:title", content: "Elegir materia o especialidad | pracTICAtecnica.com" },
      { property: "og:description", content: "58 cuadernillos CTP 2026 con práctica guiada." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Especialidades,
});

function Especialidades() {
  const { code } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [q, setQ] = useState("");
  const [family, setFamily] = useState("Todas");
  const [practicing, setPracticing] = useState(false);
  const selectedPanel = useRef<HTMLElement>(null);
  useEffect(() => { if (code) selectedPanel.current?.scrollIntoView({ block: 'start', behavior: 'instant' }); }, [code]);
  const c = code ? cuadernillos.find((x) => x.code === code || x.title === code) : undefined;
  const deck = decks.find((d) => d.id === DECK_BY_CODE[c?.code ?? ""]);
  const list = findSpecialties(q).filter(x => family === "Todas" || specialtyFamily(x) === family);
  return (
    <main className="min-h-screen bg-hero">
      <SiteHeader />
      <img src={specScene} alt="Talleres de especialidades técnicas: electricidad, redes, software, contabilidad, turismo y cocina" width={1536} height={1024} loading="lazy" className="mx-auto mt-4 max-h-64 w-full max-w-5xl rounded-2xl object-cover px-5" />
      <section className="mx-auto max-w-4xl space-y-5 px-5 pb-16">
        <h1 className="mt-6 text-4xl font-black">🎯 Elija su materia o especialidad</h1>
        <input type="search" aria-label="Buscar especialidad" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Accounting, agroindustria, banca, contabilidad…" className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground" />
        <div className="flex flex-wrap gap-2" aria-label="Familias de especialidades">
          {["Todas", "Agropecuaria", "Industrial", "Comercial y servicios", "Académica CTP"].map(name => <Button key={name} variant={family === name ? "default" : "outline"} aria-pressed={family === name} onClick={() => setFamily(name)}>{name}</Button>)}
        </div>
        <p className="text-sm text-muted-foreground">{list.length} cuadernillos disponibles</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map(book => <Button key={book.url} variant="outline" aria-pressed={c?.url === book.url} onClick={() => { setPracticing(false); void navigate({ search: { code: book.code || book.title } }); }} className="h-auto min-h-24 items-start justify-start whitespace-normal p-4 text-left">
            <span aria-hidden="true" className="text-2xl">{specialtyFamily(book) === "Agropecuaria" ? "🌱" : specialtyFamily(book) === "Industrial" ? "🔧" : "📘"}</span>
            <span className="min-w-0"><span className="block font-bold">{book.title}</span><span className="mt-1 block text-xs text-muted-foreground">{specialtyFamily(book)} · PDF{DECK_BY_CODE[book.code] ? " · Práctica y simulacro" : " · Ejercicios pendientes"}</span></span>
          </Button>)}
        </div>
        {!list.length && <p className="text-muted-foreground">No hay coincidencias. Pruebe otro nombre o seleccione «Todas».</p>}
        {c && <article ref={selectedPanel} tabIndex={-1} className="scroll-mt-4 rounded-lg border border-primary bg-card p-6 shadow-card">
          <p className="text-xs font-bold tracking-widest text-accent">{c.area}</p>
          <h2 className="mt-1 text-2xl font-black">{c.title}</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={c.url} download={`${c.title}.pdf`} target="_blank" rel="noreferrer" className="rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground">📥 Descargar cuadernillo PDF</a>
            {deck ? (
              <Button variant="outline" onClick={() => setPracticing(true)}>✏️ Práctica guiada · {(deck.questionCount ?? deck.questions.length)} preguntas</Button>
            ) : (
              <Button variant="outline" disabled>Práctica en preparación</Button>
            )}
            {deck ? <Button asChild variant="outline"><Link to="/simulacro" search={{ deck: deck.id }}>📝 Simulacro · {deck.title}</Link></Button> : <Button variant="outline" disabled>Simulacro en preparación</Button>}
          </div>
          {!deck && <p className="mt-3 text-sm text-muted-foreground">Las preguntas propias de esta especialidad están en preparación. Mientras tanto, estudie con el cuadernillo.</p>}
        </article>}
        {practicing && deck && <Quiz key={deck.id} deck={deck} onExit={() => setPracticing(false)} />}
      </section>
    </main>
  );
}
