import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { SiteHeader } from '@/components/SiteHeader';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/Quiz';
import { BlindExam } from '@/components/BlindExam';
import { malla } from '@/lib/malla';
import { decks } from '@/lib/questions';
export const Route = createFileRoute('/generador')({ staticData: { sitemap }, head: () => ({ meta: [{ title: 'Generador por materia · practicatecnica.com' }, { name: 'description', content: 'Seleccione nivel y materia para preparar prácticas y simulacros con bancos disponibles.' }, { property: 'og:title', content: 'Generador por materia · practicatecnica.com' }, { property: 'og:description', content: 'Práctica guiada y examen con selección curricular y cobertura explícita.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }] }), component });
function Generator() {
  const [mi, setMi] = useState(0); const [ni, setNi] = useState(0); const [si, setSi] = useState(0);
  const [run, setRun] = useState(null);
  const mod = malla[mi]; const level = mod?.niveles[ni]; const subject = level?.materias[si];
  const banks = decks.filter(d => subject?.decks.includes(d.id));
  if (run) return <main className="min-h-screen bg-hero"><SiteHeader />{run.exam ? <BlindExam deck={run.deck} onExit={() => setRun(null)} /> : <Quiz deck={run.deck} onExit={() => setRun(null)} />}</main>;
  return <main className="min-h-screen bg-hero"><SiteHeader /><section className="mx-auto max-w-4xl space-y-5 px-5 pb-16"><h1 className="text-3xl font-black">Generador por materia</h1><div className="grid gap-3 sm:grid-cols-3">
    <label>Modalidad<select value={mi} onChange={e => { setMi(Number(e.target.value)); setNi(0); setSi(0); }} className="block w-full border border-border bg-background p-2">{malla.map((m, i) => <option key={m.id} value={i}>{m.name}</option>)}</select></label>
    <label>Nivel<select value={ni} onChange={e => { setNi(Number(e.target.value)); setSi(0); }} className="block w-full border border-border bg-background p-2">{mod?.niveles.map((n, i) => <option key={n.name} value={i}>{n.name}</option>)}</select></label>
    <label>Materia<select value={si} onChange={e => setSi(Number(e.target.value))} className="block w-full border border-border bg-background p-2">{level?.materias.map((s, i) => <option key={s.name} value={i}>{s.name}</option>)}</select></label>
  </div><h2 className="text-xl font-bold">{subject?.name}</h2>{!banks.length ? <p>Contenido pendiente para esta materia y nivel.</p> : <ul className="divide-y divide-border">{banks.map(d => <li key={d.id} className="flex flex-wrap items-center gap-3 py-4"><span className="min-w-0 flex-1"><strong>{d.title}</strong><small className="block text-muted-foreground">{d.questionCount ?? d.questions.length} preguntas disponibles</small></span><Button disabled={(d.questionCount ?? d.questions.length) < 20} onClick={() => setRun({ deck, exam })}>Práctica guiada</Button><Button variant="outline" disabled={(d.questionCount ?? d.questions.length) !== 60} onClick={() => setRun({ deck, exam })}>Examen / simulacro</Button></li>)}</ul>}</section></main>;
}