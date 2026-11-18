import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shuffle } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Quiz } from "@/components/Quiz";
import { Button } from "@/components/ui/button";
import { GRADE6_VERSIONS, grade6Deck, grade6Subjects } from "@/lib/grade6";

export const Route = createFileRoute("/sexto")({staticData:{sitemap:true},
  head: () => ({
    meta: [{ title: "Preparación 6.º grado MEP · practicatecnica.com" },
      {
        name: "description",
        content: "Matemática, Ciencias, Español y Estudios Sociales de 6.º grado: 500 versiones por materia con explicaciones.",
      },
      { property: "og:title", content: "Preparación 6.º grado MEP · practicatecnica.com" },
      { property: "og:description", content: "Practique 6.º grado con versiones distintas cada vez y respuestas explicadas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Sexto,
});

function Sexto() {
  const [active, setActive] = useState(null);
  const start = (s) => setActive({ s, v: Math.floor(Math.random() * GRADE6_VERSIONS) });
  return (
    <main className="min-h-screen bg-hero">
      <SiteHeader />
      {active ? (
        <section className="mx-auto max-w-3xl px-5 pb-16">
          <div className="mb-2 flex justify-end">
            <Button variant="outline" onClick={() => start(active.s)}>
              <Shuffle className="h-4 w-4" /> Otra versión
            </Button>
          </div>
          <Quiz key={`${active.s}-${active.v}`} deck={grade6Deck(active.s, active.v)} onExit={() => setActive(null)} />
        </section>
      ) : (
        <section className="mx-auto max-w-5xl px-5 pb-16">
          <p className="text-sm font-semibold text-primary">Primaria · MEP</p>
          <h1 className="mt-2 text-4xl font-black">Preparación de 6.º grado</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {GRADE6_VERSIONS} versiones por materia. En Matemática y parte de Ciencias cambian los datos y
            la respuesta se calcula sola; en Español y Estudios Sociales cambia la selección y el orden de
            preguntas revisadas.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {grade6Subjects.map((s) => (
              <article key={s.id} className="rounded-2xl border bg-card p-5">
                <div className="text-3xl" aria-hidden>{s.emoji}</div>
                <h2 className="mt-3 text-xl font-extrabold">{s.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">6 preguntas por versión · explicadas</p>
                <Button className="mt-4" onClick={() => start(s.id)}>Comenzar</Button>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
