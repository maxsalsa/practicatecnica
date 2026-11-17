import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, Printer, Play } from "lucide-react";
import { exercisePoints } from "@/lib/progress-data";
import { z } from "zod";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/Quiz";
import { AuthorizedContent } from '@/components/AuthorizedContent';
import {TopicPoints} from '@/components/TopicPoints';
import { mat07TopicDecks, loteDecks } from "@/lib/lote-decks";
import type { Deck } from "@/lib/questions";
import { schoolLevels, schoolSubjects } from "@/lib/school-practice";
import {
  topicsFor,
  topicDeck,
  localText,
  librarySources,
  type Language,
  numericTopicIds,
} from "@/lib/practice-library";

const searchSchema = z.object({
  subject: z.string().catch("matematica").default("matematica"),
  level: z.string().catch("6.º primaria").default("6.º primaria"),
  topic: z.string().optional(),
  lang: z.enum(["es", "en"]).catch("es").default("es"),
  mode: z.enum(["practice", "review", "trivia"]).catch("practice").default("practice"),
  variant: z.coerce.number().int().min(0).max(49).catch(0).default(0),
});
export const Route = createFileRoute("/practicas")({staticData:{sitemap:true},
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Fichas y prácticas por nivel · pracTICAtecnica.com" },
      {
        name: "description",
        content:
          "Fichas bilingües de seis materias: objetivos, secuencia, ejercicios explicados y rúbricas por tema y nivel.",
      },
      { property: "og:title", content: "Fichas y prácticas por nivel · pracTICAtecnica.com" },
      {
        property: "og:description",
        content: "Estudie y practique por tema con respuestas explicadas y evaluación docente.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PracticeLibrary,
});
function PracticeLibrary() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const lang: Language = search.lang;
  const en = lang === "en";
  const subject = schoolSubjects.find((s) => s.id === search.subject) ?? schoolSubjects[4];
  const level = schoolLevels.includes(search.level)
    ? search.level
    : (schoolLevels[0] ?? "6.º primaria");
  const topics = topicsFor(subject?.id ?? "matematica", level);
  const topic = topics.find((t) => t.id === search.topic) ?? topics[0];
  const [active, setActive] = useState(false);
  const [lote, setLote] = useState<Deck | null>(null);
  const change = (patch: Partial<typeof search>) => {
    setActive(false);
    void navigate({ search: { ...search, ...patch } });
  };
  const deck = topic ? topicDeck(topic.id, level, lang, search.mode, 2, search.variant) : null;
  return (
    <main className="min-h-screen bg-hero">
      <SiteHeader />
      {lote ? (
        <Quiz key={lote.id} deck={lote} onExit={() => setLote(null)} />
      ) : active && deck ? (
        <Quiz key={deck.id + lang} deck={deck} lang={lang} onExit={() => setActive(false)} />
      ) : (
        <section className="mx-auto max-w-5xl px-5 pb-16">
          <TopicPoints />
          <article className="mb-8 rounded-2xl border border-primary bg-card p-5 shadow-card">
            <h2 className="text-xl font-black">➗ Matemática 7.º · Lote 1 por temas</h2>
            <p className="mt-1 text-sm text-muted-foreground">Las mismas 50 preguntas de Simulacros, separadas por tema, con explicación paso a paso.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {mat07TopicDecks.map((d) => (
                <Button key={d.id} variant="outline" onClick={() => setLote(d)}>{d.emoji} {d.title.replace("Matemática 7.º · ", "")} ({d.questions.length})</Button>
              ))}
              <Button onClick={() => setLote(loteDecks[0]!)}>Todas (50)</Button>
              <Button variant="secondary" onClick={() => setLote(loteDecks[1]!)}>📐 Matemática 8.º (50)</Button>
            </div>
          </article>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary">
                {en ? "Learning library" : "Biblioteca de aprendizaje"}
              </p>
              <h1 className="mt-2 text-4xl font-black">
                {en ? "Study sheets & practice" : "Fichas y prácticas"}
              </h1>
              <p className="mt-3 text-muted-foreground">
                {en
                  ? "Six subjects · 18 topics · foundations, application and reasoning"
                  : "Seis materias · 18 temas · fundamentos, aplicación y razonamiento"}
              </p>
            </div>
            <BookOpen aria-hidden className="h-12 w-12 text-accent" />
          </div>
          <div className="my-7 grid gap-4 border-y py-5 sm:grid-cols-2 lg:grid-cols-4 print:hidden">
            <label className="grid gap-2 text-sm font-semibold">
              {en ? "Subject" : "Materia"}
              <select
                className="min-w-0 rounded-md border bg-background p-3"
                value={subject?.id}
                onChange={(e) => change({ subject: e.target.value, topic: undefined })}
              >
                {schoolSubjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {en ? s.en : s.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              {en ? "Grade" : "Nivel"}
              <select
                className="min-w-0 rounded-md border bg-background p-3"
                value={level}
                onChange={(e) => change({ level: e.target.value, topic: undefined })}
              >
                {schoolLevels.map((l) => (
                  <option key={l} value={l}>
                    {en ? `Grade ${parseInt(l, 10)}` : l}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              {en ? "Practice type" : "Tipo de práctica"}
              <select
                className="min-w-0 rounded-md border bg-background p-3"
                value={search.mode}
                onChange={(e) =>
                  change({
                    mode:
                      e.target.value === "review"
                        ? "review"
                        : e.target.value === "trivia"
                          ? "trivia"
                          : "practice",
                  })
                }
              >
                <option value="practice">
                  {en ? "Interactive practice" : "Práctica interactiva"}
                </option>
                <option value="review">{en ? "Study review" : "Repaso con respuestas"}</option>
                <option value="trivia">
                  {en ? "Quick trivia · 3 questions" : "Trivia rápida · 3 preguntas"}
                </option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              {en ? "Language" : "Idioma"}
              <select
                className="min-w-0 rounded-md border bg-background p-3"
                value={lang}
                onChange={(e) => change({ lang: e.target.value === "en" ? "en" : "es" })}
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </label>
          </div>
          <div className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)]">
            <aside className="print:hidden">
              <h2 className="mb-3 font-bold">{en ? "Topics" : "Temas"}</h2>
              <div className="grid gap-2">
                {topics.map((t) => (
                  <Button
                    key={t.id}
                    variant={topic?.id === t.id ? "secondary" : "ghost"}
                    aria-pressed={topic?.id === t.id}
                    className="h-auto justify-start whitespace-normal py-3 text-left"
                    onClick={() => change({ topic: t.id })}
                  >
                    {localText(t.title, lang)}
                  </Button>
                ))}
              </div>
              <Link to="/metrologia" className="mt-6 block text-sm font-semibold text-primary">
                {en ? "Metrology course →" : "Curso de metrología →"}
              </Link>
            </aside>
            {topic && deck && <AuthorizedContent key={deck.id+lang} id={deck.id} lang={lang}>{deck => (
              <article className="min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {en
                      ? `Grade ${parseInt(level, 10)} · ${deck.questions.length} exercises`
                      : `${level} · ${deck.questions.length} ejercicios`}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label={en ? "Print sheet" : "Imprimir ficha"}
                    title={en ? "Print sheet" : "Imprimir ficha"}
                    onClick={() => window.print()}
                    className="print:hidden"
                  >
                    <Printer className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="mt-4 text-3xl font-extrabold">{localText(topic.title, lang)}</h2>
                <h3 className="mt-6 font-bold text-primary">
                  {en ? "Learning objective" : "Objetivo de aprendizaje"}
                </h3>
                <p className="mt-2 leading-relaxed">{localText(topic.objective, lang)}</p>
                <h3 className="mt-6 font-bold">{en ? "Study summary" : "Resumen de estudio"}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {localText(topic.summary, lang)}
                </p>
                <h3 className="mt-6 font-bold">{en ? "Class sequence" : "Secuencia de aula"}</h3>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm">
                  {(en
                    ? [
                        "Read the summary and identify the key concept.",
                        "Work through a question and justify each step.",
                        "Solve the remaining exercises individually.",
                        "Compare your reasoning with the explanations and revise errors.",
                      ]
                    : [
                        "Lea el resumen e identifique el concepto central.",
                        "Resuelva una pregunta y justifique cada paso.",
                        "Complete individualmente los ejercicios restantes.",
                        "Compare su razonamiento con las explicaciones y corrija los errores.",
                      ]
                  ).map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
                <Button className="my-6 print:hidden" onClick={() => setActive(true)}>
                  <Play className="h-4 w-4" />
                  {en ? "Start practice" : "Comenzar práctica"}
                </Button>
                <h3 className="font-bold">
                  {en ? "Exercises and explanations" : "Ejercicios y explicaciones"}
                </h3>
                {numericTopicIds.includes(topic.id) && (
                  <Button
                    variant="outline"
                    className="my-3 print:hidden"
                    onClick={() =>
                      change({
                        variant: (search.variant + 1 + Math.floor(Math.random() * 49)) % 50,
                      })
                    }
                  >
                    {en
                      ? `New variant · ${search.variant + 1}/50`
                      : `Otra variante · ${search.variant + 1}/50`}
                  </Button>
                )}
                <div className="mt-3 divide-y border-y">
                  {deck.questions.map((q, i) => (
                    <details key={q.q} open={search.mode === "review"} className="py-4">
                      <summary className="cursor-pointer font-semibold leading-relaxed">
                        {i + 1}. {q.q}
                        <span className="mt-1 block text-xs text-primary">
                          {en
                            ? ["Foundation", "Application", "Reasoning"][(q.difficulty ?? 1) - 1]
                            : ["Fundamentos", "Aplicación", "Razonamiento"][
                                (q.difficulty ?? 1) - 1
                              ]}{" "}
                          · {exercisePoints(q)} XP
                        </span>
                      </summary>
                      <ol className="mt-3 list-[upper-alpha] space-y-1 pl-6 text-sm">
                        {q.options.map((o) => (
                          <li key={o}>{o}</li>
                        ))}
                      </ol>
                      <p className="mt-3 text-sm font-bold text-success">
                        {en ? "Answer" : "Respuesta"}: {q.options[q.answer]}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{q.why}</p>
                    </details>
                  ))}
                </div>
                <h3 className="mt-6 font-bold">{en ? "Written task" : "Tarea de aplicación"}</h3>
                <p className="mt-2 text-sm">
                  {en
                    ? "Choose two exercises. Write your reasoning, check the answer and explain one possible error."
                    : "Elija dos ejercicios. Escriba su razonamiento, compruebe la respuesta y explique un error posible."}
                </p>
                <h3 className="mt-6 font-bold">
                  {en ? "Teacher rubric · 0–8" : "Rúbrica docente · 0–8"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {en
                    ? "Each criterion: 0 = not demonstrated, 1 = partial, 2 = demonstrated. This rubric is assessed by the teacher, separately from the quiz percentage."
                    : "Cada criterio: 0 = no demostrado, 1 = parcial, 2 = demostrado. El docente evalúa esta rúbrica por separado de la nota porcentual de práctica."}
                </p>
                <ul className="mt-3 grid gap-2 text-sm">
                  {(en
                    ? [
                        "Identifies the relevant concept.",
                        "Applies the correct procedure or supports the choice.",
                        "Checks the result against the question.",
                        "Explains and corrects an error.",
                      ]
                    : [
                        "Identifica el concepto pertinente.",
                        "Aplica el procedimiento correcto o fundamenta la elección.",
                        "Comprueba el resultado según la pregunta.",
                        "Explica y corrige un error.",
                      ]
                  ).map((r) => (
                    <li key={r} className="flex justify-between gap-3 border-b py-2">
                      <span>{r}</span>
                      <span className="shrink-0">0 / 1 / 2</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-muted-foreground">
                  {en ? "Reference" : "Referencia"}: {topic.source}
                </p>
              </article>
            )}</AuthorizedContent>}
          </div>
          <footer className="mt-10 border-t pt-5 text-xs text-muted-foreground">
            <p>
              {en
                ? "Independent review material. Grade pathways are suggested; not a complete MEP curriculum or an internationally validated assessment. Higher grades add topics and numerical complexity; foundational concepts remain available."
                : "Material independiente de repaso. Las rutas por grado son orientativas; no constituyen el currículo MEP completo ni una prueba validada internacionalmente. Los grados superiores añaden temas y complejidad numérica; los fundamentos siguen disponibles."}
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {librarySources.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="underline">
                  {s.title}
                </a>
              ))}
            </div>
          </footer>
        </section>
      )}
    </main>
  );
}
