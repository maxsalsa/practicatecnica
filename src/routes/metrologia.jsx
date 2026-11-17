import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, Printer, Ruler, CheckCircle2 } from "lucide-react";
import { metrologySheets, metrologyDecks, metrologySources } from "@/lib/metrology";
import { SiteHeader } from "@/components/SiteHeader";
import { Quiz } from "@/components/Quiz";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/metrologia")({ staticData: { sitemap: true },
    head: () => ({
        meta: [{ title: "Curso de metrología · pracTICAtecnica.com" },
            {
                name: "description",
                content, "Ocho fichas de metrología: SI, conversiones, Vernier, micrómetro, error, calibración e incertidumbre; ejercicios y rúbricas.": ,
            },
            { property: "og:title", content: "Curso de metrología · pracTICAtecnica.com" },
            {
                property: "og:description",
                content: "Objetivos, secuencias didácticas y prácticas explicadas.",
            },
            { property: "og:type", content: "website" },
            { name: "twitter:card", content: "summary_large_image" },
        ],
    }),
    component: Course,
});
function Course() {
    const [lang, setLang] = useState("es");
    const [active, setActive] = useState(0);
    const [practice, setPractice] = useState(false);
    const sheet = metrologySheets[active];
    const deck = metrologyDecks[active];
    if (!sheet || !deck)
        return null;
    return (<main className="min-h-screen bg-hero">
      <SiteHeader />
      {practice ? (<Quiz key={deck.id} deck={deck} lang={lang} onExit={() => setPractice(false)}/>) : (<section className="mx-auto max-w-5xl px-5 pb-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-accent">CTP · FUNDAMENTOS</p>
              <h1 className="mt-2 text-4xl font-black">Metrología</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setLang(lang === "es" ? "en" : "es")}>
                {lang === "es" ? "Exercises: English" : "Ejercicios: Español"}
              </Button>
              <Ruler className="size-16 text-primary" aria-hidden="true"/>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Curso introductorio · 8 fichas · 24 preguntas explicadas
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-[240px_1fr]">
            <nav aria-label="Fichas de metrología" className="grid content-start gap-2 print:hidden">
              {metrologySheets.map((s, i) => (<Button key={s.id} variant={active === i ? "secondary" : "ghost"} className="h-auto justify-start whitespace-normal py-3 text-left" onClick={() => setActive(i)}>
                  <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </Button>))}
            </nav>
            <article className="min-w-0">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-2xl font-bold">{sheet.title}</h2>
                <Button variant="outline" size="icon" className="print shrink-0" title="Imprimir ficha" aria-label="Imprimir ficha" onClick={() => window.print()}>
                  <Printer />
                </Button>
              </div>
              <h3 className="mt-6 flex items-center gap-2 font-bold">
                <CheckCircle2 className="size-4 text-accent"/>
                Objetivo
              </h3>
              <p className="mt-2">{sheet.objective}</p>
              <h3 className="mt-6 flex items-center gap-2 font-bold">
                <BookOpen className="size-4 text-primary"/>
                Resumen de estudio
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{sheet.summary}</p>
              <h3 className="mt-6 font-bold">Secuencia de aula</h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5">
                {sheet.sequence.map((s) => (<li key={s}>{s}</li>))}
              </ol>
              <h3 className="mt-6 font-bold">Evidencia de aprendizaje</h3>
              <p className="mt-2">{sheet.task}</p>
              <h3 className="mt-6 font-bold">Rúbrica docente · 0–8 puntos</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Por criterio: 0 = sin evidencia; 1 = parcial; 2 = correcto y justificado. La rúbrica
                se valora en clase, separada de la nota automática.
              </p>
              <ul className="mt-3 grid gap-2">
                {sheet.rubric.map((s) => (<li key={s} className="border-b py-2 text-sm">
                    {s}
                  </li>))}
              </ul>
              <Button className="mt-6 print:hidden" onClick={() => setPractice(true)}>
                Resolver ejercicios →
              </Button>
            </article>
          </div>
          <div className="mt-10 border-t pt-5 text-sm text-muted-foreground">
            <p>
              Referencias:{" "}
              {metrologySources.map((s) => (<a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="mr-4 text-primary underline">
                  {s.title}
                </a>))}
            </p>
            <p className="mt-2">
              Material didáctico propio basado en referencias públicas. No sustituye prácticas
              supervisadas, certificación oficial ni validación psicométrica.
            </p>
          </div>
        </section>)}
    </main>);
}
