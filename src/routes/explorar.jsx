import subjectsScene from '@/assets/illustrations/subjects-campus.jpg';
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Quiz } from "@/components/Quiz";
import { BlindExam } from "@/components/BlindExam";
import { decks } from "@/lib/questions";
import { malla, deckScopeNotice } from "@/lib/malla";
import { promoLogo } from "@/components/PromoBanners";
import roadScene from '@/assets/illustrations/road-safety-campus.jpg';
import { validCurriculumSearch } from '@/lib/curriculum-selection';
import { Button } from '@/components/ui/button';
import { PRACTICE_SIZE, EXAM_SIZE } from '@/lib/assessment-size';

export const Route = createFileRoute("/explorar")({staticData:{sitemap:true},
  validateSearch: (s) => ({ ...validCurriculumSearch(s), ...(typeof s['banco']==='string'&&decks.some(d=>d.id===s['banco'])?{banco:s['banco']}) }),
  head: () => ({
    meta: [{ title: "Explorar la malla MEP | pracTICAtecnica.com" },
      { name: "description", content: "Elija modalidad, nivel y materia, secundaria, CTP, ingreso, admisión y MOPT, con prácticas, simulacros y libros." },
      { property: "og:title", content: "Explorar la malla MEP | pracTICAtecnica.com" },
      { property: "og:description", content: "Catálogo parcial por nivel y materia con bancos disponibles y cobertura explícita." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Explorar,
});

const pill = (on) => `rounded-xl border px-4 py-2 text-sm font-bold transition ${on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"}`;

function Explorar() {
  const {banco,modalidad,nivel,materia}=Route.useSearch();
  const selection=malla.flatMap((mod,mi)=>mod.niveles.flatMap((level,ni)=>level.materias.flatMap((subject,ma)=>(modalidad ? mod.id===modalidad && (!nivel||level.name===nivel) && (!materia||subject.name===materia) : subject.decks.includes(banco??''))?[{mi,ni,ma}]:[])))[0];
  const [mi, setMi] = useState(selection?.mi??0);
  const [ni, setNi] = useState(selection?.ni??0);
  const [ma, setMa] = useState(selection?.ma??0);
  const [run, setRun] = useState(null);
  const mod = malla[mi];
  if (!mod) return null;
  const niv = mod.niveles[ni] ?? mod.niveles[0];
  if (!niv) return null;
  const mat = niv.materias[ma] ?? niv.materias[0];
  if (!mat) return null;
  const ds = mat.decks.map((id) => decks.find((d) => d.id === id)).filter(Boolean);
  const total = ds.reduce((s, d) => s + (d.questionCount ?? d.questions.length), 0);

  if (run) return (
    <main className="min-h-screen bg-hero"><SiteHeader />
      <section className="mx-auto max-w-4xl px-5 pb-16">
        {run.blind ? <BlindExam deck={run.deck} onExit={() => setRun(null)} /> : <Quiz key={run.deck.id} deck={run.deck} onExit={() => setRun(null)} />}
      </section>
    </main>
  );

  return (
    <main className="min-h-screen bg-hero">
      <SiteHeader />
      <section className="mx-auto max-w-5xl space-y-6 px-5 pb-16">
        <header className="mt-6"><img src={promoLogo} alt="Logo pracTICAtecnica.com" width={96} height={96} className="mb-3 h-24 w-24 rounded-2xl border shadow-card" /><h1 className="text-4xl font-black">🧭 Explorar la malla</h1><img src={subjectsScene} alt="Colegio con aulas de matemáticas, ciencias, español, inglés y estudios sociales" width={1536} height={1024} loading="lazy" className="mt-3 max-h-56 w-full rounded-2xl object-cover" />
          <p className="mt-1 text-muted-foreground">1 · Modalidad → 2 · Nivel → 3 · Materia. Luego practique, haga un simulacro o descargue el libro.</p></header>
        <div><p className="mb-2 text-xs font-bold tracking-widest text-accent">1 · MODALIDAD</p>
          <div className="flex flex-wrap gap-2">{malla.map((m, i) => <Button variant="outline" aria-pressed={i===mi} key={m.id} className={`h-auto min-h-11 whitespace-normal ${pill(i === mi)}`} onClick={() => { setMi(i); setNi(0); setMa(0); }}>{m.emoji} {m.name}</Button>)}</div></div>
        <div><p className="mb-2 text-xs font-bold tracking-widest text-accent">2 · NIVEL</p>
          <div className="flex flex-wrap gap-2">{mod.niveles.map((n, i) => <Button variant="outline" aria-pressed={i===ni} key={n.name} className={`h-auto min-h-11 whitespace-normal ${pill(i === ni)}`} onClick={() => { setNi(i); setMa(0); }}>{n.name}</Button>)}</div></div>
        <div><p className="mb-2 text-xs font-bold tracking-widest text-accent">3 · MATERIA ({niv.materias.length})</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{niv.materias.map((m, i) => (
            <Button variant="outline" aria-pressed={i===ma} key={m.name} className={`h-auto min-h-11 justify-start whitespace-normal ${pill(i === ma)} text-left`} onClick={() => setMa(i)}>{m.emoji} {m.name}{m.decks.length ? " ✅" : ""}</Button>))}</div></div>
        <article className="rounded-2xl border border-primary bg-card p-6 shadow-card">
          {mod.id==='mopt'&&<figure className="mb-5"><img src={roadScene} alt="Ilustración de escuela vial con carro, moto y rotonda" width={1536} height={1024} loading="lazy" className="w-full"/><figcaption className="mt-2 text-xs text-muted-foreground">Escena ilustrativa de aprendizaje; no es un diagrama de circulación ni una instrucción oficial MOPT.</figcaption></figure>}
          <p className="text-xs font-bold tracking-widest text-accent">{mod.name} · {niv.name}</p>
          <h2 className="mt-1 text-2xl font-black">{mat.emoji} {mat.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{total ? `${total} preguntas disponibles en ${ds.length} bloque(s) de práctica; no constituye cobertura completa del programa.` : "No hay un banco propio disponible para esta selección. Los enlaces generales no sustituyen material de esta materia y grado."}</p>
          <div className="mt-4 grid gap-3">
            {ds.map((d) => (
              <div key={d.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border p-3">
                <div><span className="font-semibold">{d.emoji} {d.title} <span className="text-sm text-muted-foreground">· {(d.questionCount ?? d.questions.length)} ítems</span></span>{deckScopeNotice(d.id)&&<p className="mt-1 text-sm text-muted-foreground">{deckScopeNotice(d.id)}</p>}</div>
                <span className="flex gap-2">
                  <Button size="sm" disabled={(d.questionCount ?? d.questions.length) < PRACTICE_SIZE} onClick={() => setRun({ deck, blind })}>✏️ Práctica guiada</Button>
                  <Button size="sm" variant="outline" disabled={(d.questionCount ?? d.questions.length) !== EXAM_SIZE} onClick={() => setRun({ deck, blind })}>📝 Simulacro</Button>
                </span>
                {(d.questionCount ?? d.questions.length) < PRACTICE_SIZE && <p className="w-full text-xs text-muted-foreground">Práctica pendiente {PRACTICE_SIZE} preguntas de esta materia.</p>}
                {(d.questionCount ?? d.questions.length) !== EXAM_SIZE && <p className="w-full text-xs text-muted-foreground">Simulacro pendiente {EXAM_SIZE} preguntas de esta materia.</p>}
              </div>))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/cobertura" className="rounded-xl border border-border px-4 py-2 text-sm font-bold">Cobertura por materia y nivel</Link>
            {mat.pdf && <a href={mat.pdf} download className="rounded-xl border border-primary px-4 py-2 text-sm font-bold">📥 Descargar libro PDF</a>}
            {mat.links?.map((l) => <a key={l.to} href={l.to} className="rounded-xl border border-border px-4 py-2 text-sm font-bold">{l.label}</a>)}
            <Link to="/ruleta" className="rounded-xl border border-border px-4 py-2 text-sm font-bold">🎡 Trivia saber</Link>
            <Link to="/libros" className="rounded-xl border border-border px-4 py-2 text-sm font-bold">📚 Biblioteca</Link>
          </div>
        </article>
      </section>
    </main>
  );
}
