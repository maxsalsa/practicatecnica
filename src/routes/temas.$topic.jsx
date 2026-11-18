import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { useState } from 'react';
import { bookTopics } from '@/lib/book-topics';
import { primaryBooks, secondaryBooks, ctpBook } from '@/lib/primary-books';
import { SiteHeader } from '@/components/SiteHeader';
import { Button } from '@/components/ui/button';
import { BookTopicProgress } from '@/components/BookTopicProgress';
import { CitedSources } from '@/components/CitedSources';
import { sourcesForMaterial } from '@/lib/material-sources';
export const Route = createFileRoute('/temas/$topic')({
  staticData: { sitemap },
  loader: ({ params }) => {
    const topic = bookTopics.find(t => t.id === params.topic);
    const book = [...primaryBooks, ...secondaryBooks, ctpBook].find(b => b.grade === topic?.grade);
    const chapter = book?.chapters.find(c => c.subject === topic?.subject);
    if (!topic || !chapter) throw notFound();
    return { topic, chapter };
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.topic.title ?? 'Tema no disponible'} · Repaso gratuito · practicatecnica.com` },
    { name: 'description', content: 'Repaso gratuito independiente con resumen, ejemplos, ejercicios y actividad de clase. Bloque inicial, no programa completo.' },
    { property: 'og:title', content: `${loaderData?.topic.title ?? 'Tema no disponible'} · Repaso gratuito` },
    { property: 'og:description', content: 'Material original de repaso con ejercicios y actividad, sin pago para consultarlo.' },
    { property: 'og:type', content: 'article' }, { name: 'twitter:card', content: 'summary' },
  ] }), component: FreeTopic,
});
function FreeTopic() {
  const { topic, chapter } = Route.useLoaderData();
  const [open, setOpen] = useState([]);
  const [reflection, setReflection] = useState('');
  return <main className="min-h-screen bg-hero"><SiteHeader /><section className="mx-auto max-w-4xl px-5 pb-24"><Button asChild variant="outline"><Link to="/libros">← Biblioteca</Link></Button><p className="mt-5 text-sm font-semibold text-accent">Gratuito · Bloque inicial</p><h1 className="mt-2 text-3xl font-black">{chapter.emoji} {topic.title}</h1><p className="mt-3 text-muted-foreground">Preparación independiente. Este repaso no cubre todo el programa del grado.</p><h2 className="mt-8 text-xl font-bold">Resumen</h2><ul className="mt-3 list-inside list-disc space-y-2">{chapter.contenidos.map(c => <li key={c}>{c}</li>)}</ul><h2 className="mt-6 text-xl font-bold">Ejemplo</h2><p className="mt-3">{chapter.ejemplo}</p><h2 className="mt-6 text-xl font-bold">Ejercicios</h2>{chapter.ejercicios.map((e, i) => <article key={i} className="mt-4 border-b border-border pb-4"><h3 className="font-semibold">{i + 1}. {e.q}</h3><Button variant="outline" size="sm" className="mt-3" onClick={() => setOpen(v => v.includes(i) ? v.filter(n => n !== i) : [...v, i])}>{open.includes(i) ? 'Ocultar respuesta' : 'Ver respuesta'}</Button>{open.includes(i) && <p className="mt-3">{e.a}</p>}</article>)}<h2 className="mt-8 text-xl font-bold">Dinámica · Explique y compare</h2><p className="mt-3">Elija uno de estos conceptos: {chapter.saberes.join(' · ')}. Explíquelo con un ejemplo diferente al del repaso. Compare su explicación con los ejercicios y comente qué corregiría.</p><label className="mt-4 grid gap-2">Mi ejemplo<textarea value={reflection} onChange={e => setReflection(e.target.value)} maxLength={2000} className="min-h-28 rounded-md border border-border bg-card p-3" /></label><p className="mt-2 text-xs text-muted-foreground">Reflexión temporal; sin nota automática.</p><BookTopicProgress topicId={topic.id} /><CitedSources sources={sourcesForMaterial(chapter.subject, topic.grade)} /></section></main>;
}