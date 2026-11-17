import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { primaryBooks, secondaryBooks, ctpBook, bookReferences } from "@/lib/primary-books";
import { cuadernillos } from "@/lib/cuadernillos";
import heroImg from "@/assets/hero-niveles.jpg";
import { MepBooks } from "@/components/MepBooks";
import { CitedSources } from '@/components/CitedSources';
import { sourcesForMaterial } from '@/lib/material-sources';
import { Button } from '@/components/ui/button';
import { findSpecialties } from '@/lib/material-search';
import { learningGuides } from '@/lib/learning-guides';
import { BookTopicProgress } from '@/components/BookTopicProgress';
import { bookTopicId } from '@/lib/book-topics';
import { platformManuals } from '@/lib/platform-manuals';
import { LibraryLogoUpload } from '@/components/institution/LibraryLogoUpload';
import { LibraryEditorial } from '@/components/institution/LibraryEditorial';

export const Route = createFileRoute("/libros")({staticData:{sitemap:true},
  validateSearch:(s:Record<string,unknown>):{q?:string}=>typeof s['q']==='string'?{q:s['q']}:{},
  head: () => ({ meta: [
    { title: "Biblioteca y manuales de usuario e ingeniería · pracTICAtecnica.com" },
    { name: "description", content: "Biblioteca de cuadernillos y resúmenes independientes con fuentes MEP, ejemplos resueltos y PDF de Desarrollo Web, Contabilidad, Contabilidad y Costos y Ciberseguridad; bloques de décimo y duodécimo." },
    { property: "og:title", content: "Libros digitales y resúmenes MEP · pracTICAtecnica.com" },
    { property: "og:description", content: "Lea y descargue diez manuales de usuario, ingeniería y gestión institucional junto a los materiales de estudio." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Libros,
});

function Libros() {
  const [g, setG] = useState(0);
  const all = [...primaryBooks, ...secondaryBooks, ctpBook];
  const book = all.find((b) => b.grade === g) ?? primaryBooks[0];
  const [q, setQ] = useState(Route.useSearch().q??'');
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [view, setView] = useState<{ title: string; url: string } | null>(null);
  const day = Math.floor((Date.now() - 6 * 3600e3) / 86400e3);
  const tip = MOTIVA[day % MOTIVA.length] ?? MOTIVA[0];
  const list = findSpecialties(q);
  return (
    <main className="min-h-screen bg-hero">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-5 pb-16">
        <h1 className="mt-6 text-4xl font-black md:text-5xl">📚 Libros de 1.º a 11.º y CTP</h1>
        <p className="mt-2 text-muted-foreground">Para estudiar en clase o en casa con mamá, papá, abuelos y abuelas. Cada capítulo trae ejemplos y ejercicios con respuesta.</p>
        <p className="mt-4 rounded-2xl border border-accent bg-card p-4 font-semibold print:hidden">🌅 Motivación del día: <span className="text-accent">{tip}</span></p>
        <nav className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 print:hidden">
          <Button asChild variant="outline"><Link to="/redes">🔌 Resúmenes de Redes</Link></Button>
          <Link to="/cobertura" className="rounded-2xl border bg-card p-4 font-bold hover:border-primary">Cobertura por materia y grado</Link>
          <Link to="/resumen-primaria" className="rounded-2xl border bg-card p-4 font-bold hover:border-primary">📝 Resúmenes 1.º–5.º</Link>
          <Link to="/resumen-sexto" className="rounded-2xl border bg-card p-4 font-bold hover:border-primary">🗺️ Mapas conceptuales 6.º</Link>
          <Link to="/juegos" className="rounded-2xl border bg-card p-4 font-bold hover:border-primary">🎮 Los 12 juegos</Link>
          <Link to="/habitos" className="rounded-2xl border bg-card p-4 font-bold hover:border-primary">⏱️ Hábitos y racha diaria</Link>
          <Link to="/programas-mep" search={{q:'',grado:undefined}} className="rounded-2xl border bg-card p-4 font-bold hover:border-primary">📚 Programas oficiales MEP por grado</Link>
        </nav>
        <div className="mt-4 flex flex-wrap gap-2"><Button asChild variant="outline"><Link to="/institucion">Administrar mi institución</Link></Button><Button asChild variant="outline"><Link to="/instituciones">Instituciones · materias y simulacros</Link></Button></div>
        <LibraryLogoUpload />
        <LibraryEditorial />
        <section className="mt-6 border-y border-border py-5" aria-labelledby="manuals-title">
          <h2 id="manuals-title" className="text-2xl font-black">Manuales de la plataforma · PDF</h2>
          <details className="mt-3" open>
            <summary className="cursor-pointer font-semibold">Usuario, ingeniería y gestión institucional · {platformManuals.length} manuales</summary>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">{platformManuals.map(manual => <article key={manual.id} className="rounded-lg border border-border p-4"><h3 className="font-bold">{manual.title}</h3><p className="mt-1 text-sm text-muted-foreground">{manual.audience}</p><div className="mt-3 flex flex-wrap gap-2"><Button asChild variant="outline"><a href={manual.url} target="_blank" rel="noreferrer" aria-label={`Leer ${manual.title}`}>Leer PDF</a></Button><Button asChild><a href={manual.url} download={`${manual.id}.pdf`} aria-label={`Descargar ${manual.title}`}>Descargar PDF</a></Button></div></article>)}</div>
          </details>
        </section>
        <section className="mt-6 border-y border-border py-5">
          <h2 className="text-2xl font-black">Guías originales · Descargar PDF</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">{learningGuides.map(guide=><article key={guide.id} className="rounded-lg border border-border p-4"><h3 className="font-bold">{guide.title}</h3><p className="mt-1 text-sm text-muted-foreground">Resumen inicial con ejemplos y fuentes; no sustituye un curso completo.</p><div className="mt-3 flex flex-wrap gap-2"><Button asChild variant="outline"><a href={guide.url} target="_blank" rel="noreferrer">Leer PDF</a></Button><Button asChild><a href={guide.url} download={`${guide.id}.pdf`}>Descargar PDF</a></Button></div></article>)}</div>
        </section>
        <section className="mt-6 rounded-2xl border bg-card p-6 shadow-card print:hidden">
          <h2 className="text-2xl font-black">📥 Cuadernillos 2026 en PDF ({cuadernillos.length})</h2>
          <p className="mt-1 text-sm text-muted-foreground">Busque su materia o especialidad. Toque «Ver» para leerlo aquí mismo o «Descargar» para guardarlo e imprimirlo.</p>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Escriba código o nombre, por ejemplo 3016 o Agro" className="mt-4 w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground" />
          <ul className="mt-4 grid max-h-[28rem] gap-2 overflow-auto sm:grid-cols-2">
            {list.map((c) => (
              <li key={c.url} className="flex items-center gap-2 rounded-xl border bg-muted p-3 text-sm">
                <span>📄</span><span className="flex-1 font-semibold">{c.title}<span className="block text-xs text-accent">{c.area}</span></span>
                <button onClick={() => setView(c)} className="rounded-lg border border-primary px-2 py-1 text-xs font-bold text-primary">👁️ Ver</button>
                <a href={c.url} download={`${c.title}.pdf`} className="rounded-lg bg-primary px-2 py-1 text-xs font-bold text-primary-foreground">⬇️ Descargar</a>
              </li>
            ))}
          </ul>
        </section>
        {view && (
          <div className="fixed inset-0 z-50 flex flex-col bg-background/95 p-3 print:hidden" role="dialog" aria-label={view.title}>
            <div className="flex items-center gap-2 pb-2"><strong className="flex-1 truncate">{view.title}</strong>
              <a href={view.url} target="_blank" rel="noreferrer" className="rounded-lg border px-3 py-1 text-sm font-bold">Abrir aparte</a>
              <a href={view.url} download={`${view.title}.pdf`} className="rounded-lg bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">Descargar</a>
              <button onClick={() => setView(null)} className="rounded-lg border px-3 py-1 text-sm font-bold">Cerrar ✕</button></div>
            <iframe src={view.url} title={view.title} className="w-full flex-1 rounded-xl border bg-card" />
          </div>
        )}
        <MepBooks />
        <img src={heroImg} alt="Familia y estudiantes aprendiendo juntos" width={1536} height={864} className="mt-6 w-full rounded-3xl border shadow-card print:hidden" />
        <div className="mt-6 flex flex-wrap gap-2 print:hidden">
          {all.map((b) => (
            <button key={b.grade} onClick={() => setG(b.grade)} className={`rounded-full border px-5 py-2 font-bold ${g === b.grade ? "bg-primary text-primary-foreground" : "bg-card hover:border-primary"}`}>{b.grade === 12 ? "🛠️ CTP y talleres" : b.grade === 0 ? "🧸 Preescolar" : `${b.grade}.º`}</button>
          ))}
          <button onClick={() => window.print()} className="ml-auto rounded-full border border-accent px-5 py-2 font-bold">🖨️ Imprimir / PDF</button>
        </div>
        <h2 className="mt-8 text-3xl font-black text-primary">{book?.title}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {book?.chapters.map((c) => (
            <article key={c.subject} className="rounded-2xl border bg-card p-6 shadow-card">
              <div className="flex items-center gap-3"><span className="text-5xl">{c.emoji}</span><h3 className="text-2xl font-black">{c.subject}</h3></div>
              <Block t="🎯 Saberes" items={c.saberes} />
              <Block t="📖 Contenidos" items={c.contenidos} />
              <Block t="💪 Habilidades" items={c.habilidades} />
              <p className="mt-4 rounded-xl border border-accent p-3 text-sm"><strong>💡 Ejemplo:</strong> {c.ejemplo}</p>
              <h4 className="mt-4 font-bold">✏️ Ejercicios</h4>
              {c.ejercicios.map((e, i) => {
                const k = `${g}-${c.subject}-${i}`;
                return (
                  <div key={k} className="mt-2 rounded-xl bg-muted p-3 text-sm">
                    <p>{e.q}</p>
                    <button onClick={() => setOpen({ ...open, [k]: !open[k] })} className="mt-1 font-semibold text-primary underline print:hidden">{open[k] ? "Ocultar" : "Ver respuesta"}</button>
                    {open[k] && <p className="mt-1 font-bold">✅ {e.a}</p>}
                  </div>
                );
              })}
              <CitedSources sources={sourcesForMaterial(c.subject, book.grade)} />
              <Button asChild variant="outline" className="mt-4"><Link to="/temas/$topic" params={{ topic: bookTopicId(book.grade, c.subject) }}>Repaso gratuito y dinámica</Link></Button>
              <BookTopicProgress topicId={bookTopicId(book.grade, c.subject)} />
            </article>
          ))}
        </div>
        <h3 className="mt-10 text-xl font-black">Referencias (APA 7)</h3>
        <ul className="mt-2 space-y-1 text-xs text-muted-foreground">{bookReferences.map((r) => {const url=r.match(/https:\/\/\S+/)?.[0];return <li key={r} className="pl-6 -indent-6 break-words">{url?<a className="text-primary underline" href={url} target="_blank" rel="noreferrer">{r}</a>:r}</li>;})}</ul>
        <p className="mt-8 text-xs text-muted-foreground">Contenido de preparación independiente, organizado según los temas de los programas de estudio de primaria. Sin afiliación oficial.</p>
      </section>
    </main>
  );
}
function Block({ t, items }: { t: string; items: string[] }) {
  return (<div className="mt-3"><h4 className="text-sm font-bold">{t}</h4><ul className="ml-5 list-disc text-sm text-muted-foreground">{items.map((x) => <li key={x}>{x}</li>)}</ul></div>);
}

const MOTIVA = [
  "Un poco cada día vence a mucho de vez en cuando.",
  "Equivocarse es parte de aprender: revise el fallo y siga.",
  "Hoy 15 minutos de práctica valen más que mañana dos horas.",
  "Su esfuerzo de hoy es su título de mañana.",
  "Lea la pregunta dos veces y descarte primero lo imposible.",
  "La disciplina le lleva donde la motivación no alcanza.",
  "Cada pregunta resuelta es un paso hacia su meta.",
];
