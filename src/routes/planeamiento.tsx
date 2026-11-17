import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Printer } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { mepBooks } from "@/lib/mep-books";
import { TeacherTemplates } from '@/components/TeacherTemplates';
import { TeacherAccess } from '@/components/TeacherAccess';
import { SpecTablePanel } from '@/components/institution/SpecTablePanel';
import { AutoPlan } from '@/components/plan/AutoPlan';
import { buildBinomio } from '@/lib/binomio';
import { RUBRIC_LEVELS, RUBRIC_DESCRIPTORS, lessonMinutes } from '@/lib/teaching-rubric';

export const Route = createFileRoute("/planeamiento")({staticData:{sitemap:false},
  head: () => ({
    meta: [
      { title: "Planeamiento docente | pracTICAtecnica.com" },
      { name: "description", content: "Planeamiento por especialidad y unidad con indicadores, rúbricas, trabajo cotidiano, tareas y proyectos." },
      { property: "og:title", content: "Planeamiento docente | pracTICAtecnica.com" },
      { property: "og:description", content: "Indicadores, rúbricas, cotidianos, tareas y proyectos listos para imprimir." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <TeacherAccess><Planeamiento /></TeacherAccess>,
});

const levels = RUBRIC_LEVELS.map(value => [String(value), RUBRIC_DESCRIPTORS[value]]);

function Planeamiento() {
  const [bookId, setBookId] = useState(mepBooks[0]?.id ?? "");
  const [subject, setSubject] = useState('');
  const [level, setLevel] = useState('');
  const [lessons, setLessons] = useState(1);
  const [kind, setKind] = useState<'academica' | 'especialidad'>('academica');
  const book = mepBooks.find((b) => b.id === bookId) ?? mepBooks[0];
  if (!book) return null;
  return (
    <main className="min-h-screen overflow-x-hidden bg-hero">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-5 pb-16">
        <div className="flex flex-wrap items-end justify-between gap-4 print:hidden">
          <div>
            <p className="text-sm font-semibold text-accent">Docentes · Plan docente ₡3.500/año</p>
            <h1 className="mt-2 text-4xl font-black">Planeamiento docente</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">Indicadores y rúbricas 3/2/1/0. Preparación independiente, sin afiliación oficial al MEP. Ejemplos curriculares disponibles: {mepBooks.reduce((n, b) => n + b.chapters.length, 0)} temas.</p>
          </div>
          <div className="flex w-full flex-wrap gap-2 sm:w-auto">
            <select aria-label="Especialidad" value={book.id} onChange={(e) => setBookId(e.target.value)} className="h-11 w-full min-w-0 rounded-md border border-input bg-background px-3 text-foreground sm:w-auto">
              {mepBooks.map((b) => <option key={b.id} value={b.id}>{b.title} · {b.grade}.º</option>)}
            </select>
            <Button onClick={() => window.print()}><Printer />Imprimir o guardar PDF</Button>
          </div>
        </div>
        <TeacherTemplates />
        <section className="my-6 border-y border-border py-5">
          <h2 className="text-xl font-bold">Materia, nivel y horario</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            <label className="grid gap-1 text-sm">Materia<input aria-label="Materia del planeamiento" value={subject} onChange={e => setSubject(e.target.value)} className="rounded-md border border-input bg-background p-2" /></label>
            <label className="grid gap-1 text-sm">Nivel<input aria-label="Nivel del planeamiento" value={level} onChange={e => setLevel(e.target.value)} className="rounded-md border border-input bg-background p-2" /></label>
            <label className="grid gap-1 text-sm">Tipo<select value={kind} onChange={e => setKind(e.target.value === 'especialidad' ? 'especialidad' : 'academica')} className="rounded-md border border-input bg-background p-2"><option value="academica">Académica · 40 minutos</option><option value="especialidad">Especialidad · 60 minutos</option></select></label>
            <label className="grid gap-1 text-sm">Lecciones<input type="number" min={1} max={100} value={lessons} onChange={e => setLessons(Math.max(1, Math.min(100, Number(e.target.value) || 1)))} className="rounded-md border border-input bg-background p-2" /></label>
          </div>
          <p className="mt-3 font-semibold">{subject || 'Materia'} · {level || 'Nivel'} · {lessonMinutes(kind, lessons)} minutos</p>
          <div className="mt-3 flex flex-wrap gap-3 print:hidden"><Button asChild variant="outline"><Link to="/institucion">Horarios institucionales</Link></Button><Button asChild variant="outline"><Link to="/rubricas">Rúbricas por estudiante</Link></Button></div>
        </section>
        <AutoPlan subject={subject} level={level} />
        <SpecTablePanel name={`${subject || 'Planeamiento'} · ${level || 'Nivel'}`} logoPath={null} />
        <section aria-labelledby="macro" className="mt-8 rounded-xl border border-border bg-card p-5 print:hidden">
          <p className="text-xs font-semibold text-accent">Macro evaluación</p>
          <h2 id="macro" className="mt-1 text-2xl font-black">Pruebas estandarizadas</h2>
          <p className="mt-2 text-sm text-muted-foreground">Simulacros cronometrados con resultados, distintos de la evaluación de aula. Son prácticas propias, no exámenes oficiales.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button asChild variant="secondary"><a href="/simulacro">Simulacros de 60 ítems</a></Button>
            <Button asChild variant="secondary"><a href="/idiomas">Idiomas A1–B2</a></Button>
            <Button asChild variant="secondary"><a href="/practicas">Moto y carro</a></Button>
          </div>
        </section>
        <p className="mt-10 text-xs font-semibold text-accent">Micro evaluación · aula</p>
        <h2 className="mt-1 text-2xl font-black">Rúbricas, cotidianos y tareas · {book.title} · {book.grade}.º CTP</h2>
        <p className="text-sm text-muted-foreground">Fuente curricular: <a className="text-primary underline" href={book.source} target="_blank" rel="noreferrer">programa MEP</a>, mapa pp. {book.mapPages}</p>
        {book.chapters.map((c, ci) => (
          <article key={c.id} className="mt-6 break-inside-avoid rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-semibold text-accent">Unidad: {c.unit} · pp. {c.pages}</p>
            <h3 className="mt-1 text-xl font-bold">{c.title}</h3>
            <p className="mt-3"><strong>Indicador de aprendizaje: </strong>{c.objective}</p>
            <section className="mt-4">
              <h4 className="font-semibold">Mediación pedagógica · binomio docente–estudiante (verbos de Bloom)</h4>
              {buildBinomio(c.title, c.objective, c.example, ci).map(m => <div key={m.momento} className="mt-2 grid gap-1 border-t border-border pt-2 text-sm sm:grid-cols-[8rem_1fr_1fr] sm:gap-3"><p className="font-bold">{m.momento}<span className="block text-xs font-normal capitalize text-accent">{m.nivel}</span></p><p>{m.docente}</p><p>{m.estudiante}</p></div>)}
            </section>
            <table className="mt-3 w-full border-collapse text-sm">
              <caption className="text-left font-semibold">Rúbrica</caption>
              <tbody>{levels.map(([l, d]) => <tr key={l} className="border-t border-border"><th className="w-40 py-2 pr-3 text-left align-top">{l}</th><td className="py-2">{d}</td></tr>)}</tbody>
            </table>
            <p className="mt-3"><strong>Trabajo cotidiano (clase): </strong>En parejas, expliquen con sus palabras: «{c.summary[0]}» y resuelvan el ejemplo: {c.example}</p>
            <p className="mt-2"><strong>Tarea: </strong>{c.exercise} <span className="text-muted-foreground">(Respuesta para el docente: {c.answer})</span></p>
            <p className="mt-2"><strong>Proyecto: </strong>Elaboren un caso real de su comunidad o empresa sobre «{c.title}», con datos propios, procedimiento, verificación y presentación de 5 minutos. Se evalúa con la rúbrica anterior.</p>
            <p className="mt-2 text-sm text-muted-foreground">Vocabulario ES/EN: {c.terms.join(" · ")}</p>
          </article>
        ))}
        <p className="mt-6 text-sm text-muted-foreground print:hidden">Para otras materias y unidades consulte el <a className="text-primary underline" href={book.source} target="_blank" rel="noreferrer">programa oficial</a>. ¿Aún no tiene el plan docente? <Link to="/pagos" className="text-primary underline">Actívelo aquí</Link>.</p>
      </section>
    </main>
  );
}
