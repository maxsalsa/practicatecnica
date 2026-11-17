import { useState } from 'react';
import { BookOpen, Download, ExternalLink, FileText, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mepBooks, mepPdfUrl } from '@/lib/mep-books';
import { CitedSources } from './CitedSources';

export function MepBooks() {
  const [specialty, setSpecialty] = useState('all');
  const [query, setQuery] = useState('');
  const [grade, setGrade] = useState('all');
  const [topic, setTopic] = useState('all');
  const available = mepBooks.filter(b => specialty === 'all' || b.id === specialty);
  const normalized = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const needle = normalized(query.trim());
  const books = available.map(book => ({ ...book, chapters: book.chapters.filter(c =>
    (topic === 'all' || c.id === topic) && normalized(`${book.title} ${c.title} ${c.unit} ${c.summary.join(' ')}`).includes(needle)
  ) })).filter(b => (grade === 'all' || String(b.grade) === grade) && b.chapters.length > 0);
  return <section className="mt-8 border-t border-border pt-8 print:hidden" aria-labelledby="mep-books-heading">
    <div className="flex items-start gap-3"><BookOpen className="mt-1 size-7 shrink-0 text-accent" /><div>
      <p className="text-sm font-semibold text-accent">CTP · Décimo y duodécimo</p>
      <h2 id="mep-books-heading" className="text-2xl font-black">Resúmenes por especialidad</h2>
      <p className="mt-2 text-sm text-muted-foreground">{mepBooks.reduce((n,b) => n+b.chapters.length,0)} temas disponibles en {new Set(mepBooks.map(b => b.title)).size} especialidades; cobertura parcial. Resúmenes originales con ejemplos y fuentes curriculares MEP, sin afiliación oficial.</p>
    </div></div>
    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <label className="text-sm font-semibold">Especialidad<select aria-label="Especialidad de los libros" value={specialty} onChange={e => { setSpecialty(e.target.value); setTopic('all'); }} className="mt-1 h-11 w-full rounded-md border border-input bg-background px-3 text-foreground">
        <option value="all">Todas las especialidades disponibles</option>{mepBooks.map(b => <option key={b.id} value={b.id}>{b.title} · {b.grade}.º</option>)}
      </select></label>
      <label className="text-sm font-semibold">Grado<select aria-label="Grado de los libros" value={grade} onChange={e => { setGrade(e.target.value); setTopic('all'); }} className="mt-1 h-11 w-full rounded-md border border-input bg-background px-3 text-foreground"><option value="all">Todos los grados disponibles</option><option value="10">10.º CTP</option><option value="12">12.º CTP</option></select></label>
      <label className="text-sm font-semibold">Tema<select aria-label="Tema del resumen" value={topic} onChange={e => setTopic(e.target.value)} className="mt-1 h-11 w-full rounded-md border border-input bg-background px-3 text-foreground"><option value="all">Todos los temas disponibles</option>{available.flatMap(b => b.chapters).map(c => <option key={c.id} value={c.id}>{c.title}</option>)}</select></label>
      <label className="text-sm font-semibold">Buscar<div className="relative mt-1"><Search className="absolute left-3 top-3 size-4 text-muted-foreground" /><input aria-label="Buscar resúmenes MEP" value={query} onChange={e => setQuery(e.target.value)} placeholder="Tema o palabra clave" className="h-11 w-full rounded-md border border-input bg-background pl-9 pr-3 text-foreground" /></div></label>
    </div>
    {books.length === 0 && <p role="status" className="py-8 text-muted-foreground">No hay resúmenes disponibles para esta búsqueda.</p>}
    {books.map(book => {
      const compendium = mepPdfUrl(`${book.id}-compendio`);
      return <div key={book.id} className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3"><div><h3 className="text-xl font-bold">{book.title}</h3><p className="text-sm text-muted-foreground">{book.grade}.º · Mapa curricular: pp. {book.mapPages}</p></div><div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild><a href={book.source} target="_blank" rel="noreferrer"><ExternalLink />Programa MEP</a></Button>
          {compendium && <Button asChild><a href={compendium} download={`${book.id}-compendio.pdf`}><Download />Compendio PDF</a></Button>}
        </div></div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{book.chapters.map(c => {
          const url = mepPdfUrl(`${book.id}-${c.id}`);
          const map = mepPdfUrl(`${book.id}-${c.id}-mapa`);
          return <article key={c.id} className="flex flex-col rounded-lg border border-border bg-card p-5">
            <p className="text-xs font-semibold text-accent">{c.unit}</p><h4 className="mt-2 text-lg font-bold">{c.title}</h4><p className="mt-2 text-sm text-muted-foreground">{c.objective}</p>
            <details className="mt-4 text-sm"><summary className="cursor-pointer font-semibold text-primary">Leer resumen y ejemplo</summary><div className="mt-3 space-y-3">{c.summary.map(s => <p key={s}>{s}</p>)}<p className="text-muted-foreground">{c.terms.join(' · ')}</p><p><strong>Ejemplo: </strong>{c.example}</p><p><strong>Práctica: </strong>{c.exercise}</p><details><summary className="cursor-pointer font-semibold text-primary">Respuesta razonada</summary><p className="mt-2">{c.answer}</p></details></div></details>
            <CitedSources className="mb-3" sources={[{title: `Ministerio de Educación Pública. Programa de ${book.title}, ${book.grade}.º.`, url:book.source, detail:`Fuente curricular · páginas ${c.pages}. Resumen y ejercicios independientes; no es publicación oficial.`}]} />
            {url && <Button variant="outline" className="mt-auto w-full" asChild><a href={url} download={`${book.id}-${c.id}.pdf`}><FileText />Descargar tema PDF</a></Button>}
            {map && <Button variant="secondary" className="mt-2 w-full" asChild><a href={map} download={`${book.id}-${c.id}-mapa.pdf`}><Download />Mapa y diagrama PDF</a></Button>}
          </article>;
        })}</div>
        <details className="mt-4 text-sm"><summary className="cursor-pointer font-semibold text-muted-foreground">Otras unidades del programa oficial</summary><ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">{book.units.map(unit => <li key={unit}>{unit}</li>)}</ul><p className="mt-2 text-muted-foreground">Las unidades sin ficha propia se consultan en el programa oficial; no tienen aún un resumen descargable aquí.</p></details>
      </div>;
    })}
  </section>;
}