import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { SiteHeader } from '@/components/SiteHeader';
import { Quiz } from '@/components/Quiz';
import { Button } from '@/components/ui/button';
import { GENERATED_FAMILIES, generatedDeckId, type GeneratedFamily } from '@/lib/generated-catalog';
import type { Deck } from '@/lib/questions';
import {TopicPoints} from '@/components/TopicPoints';

export const Route = createFileRoute('/practica-sin-repeticion')({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: 'Práctica sin repetición · matemática, español, ciencias y técnica · pracTICAtecnica.com' },
      { name: 'description', content: 'Repasos breves de idiomas, matemática y técnica con selección de estructuras distintas y explicaciones. Banco finito de contenido original.' },
      { property: 'og:title', content: 'Práctica sin repetición · pracTICAtecnica.com' },
      { property: 'og:description', content: 'Repasos originales con una pregunta por estructura disponible, sin rellenar sesiones con duplicados.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: UnlimitedPractice,
});

const stub = (f): Deck => ({ id: `${generatedDeckId(f.key)}-v2-review`, title: `${f.title} · repaso diverso`, emoji: f.emoji, level: f.level, questions: [] });
const AREAS = ['Idiomas', 'Matemática', 'Español', 'Ciencias', 'Técnica'];

function UnlimitedPractice() {
  const [run, setRun] = useState<{ family: GeneratedFamily; exam: boolean; n: number } | null>(null);
  if (run) return <main className="min-h-screen bg-hero">
    <SiteHeader />
    <Quiz key={`${run.family.key}-${run.n}`} deck={stub(run.family)} onExit={() => setRun(null)} />
  </main>;
  return <main className="min-h-screen bg-hero">
    <SiteHeader />
    <section className="mx-auto max-w-5xl px-5 pb-16">
      <h1 className="text-3xl font-black md:text-4xl">Repasos por área</h1>
      <TopicPoints />
      <p className="mt-3 max-w-3xl text-muted-foreground">Repasos breves, sin certificación. Contenido introductorio; no constituye un banco de 1.000 preguntas revisadas por área.</p>
      <p className="mt-2 text-xs text-muted-foreground">Ítems originales de pracTICAtecnica.com con fines de repaso; no reemplazan las pruebas oficiales del MEP.</p>
      {AREAS.map(area => <div key={area} className="mt-8">
        <h2 className="text-xl font-extrabold">{area}</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {GENERATED_FAMILIES.filter(f => f.area === area&&!['frvar','ptvar','frances','portugues'].includes(f.key)).map(f => <article key={f.key} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card">
            <p className="text-lg font-black">{f.emoji} {f.title}</p>
            <p className="text-xs font-semibold text-primary">{f.level}</p>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{f.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={() => setRun({ family: f, exam: false, n: 0 })}>Repaso variado</Button>
            </div>
          </article>)}
        </div>
      </div>)}
      <p className="mt-10 text-sm text-muted-foreground">¿Busca una materia o grado específico? <Link to="/simulacro" className="font-bold text-primary underline">Vea todos los simulacros</Link>.</p>
    </section>
  </main>;
}
