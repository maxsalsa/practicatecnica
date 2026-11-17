import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from './ui/button';
import { publishedExamTopics } from '@/lib/book-topics';
import { decks } from '@/lib/questions';

export function PublishedSubjects() {
  const [grade, setGrade] = useState('');
  const rows = publishedExamTopics.filter(t => !grade || t.grade === Number(grade));
  return <div className="mt-3">
    <label className="grid max-w-xs gap-1 text-sm font-semibold">Grado con simulacro publicado<select aria-label="Grado con simulacro publicado" value={grade} onChange={e => setGrade(e.target.value)} className="rounded-md border border-border bg-card p-2"><option value="">Todos los grados cubiertos</option>{[...new Set(publishedExamTopics.map(t => t.grade))].sort((a,b) => a-b).map(g => <option key={g} value={g}>{g}.º</option>)}</select></label>
    <ul className="mt-3 grid gap-3 sm:grid-cols-2">{rows.map(topic => <li key={topic.id} className="border-b border-border pb-3"><strong className="text-sm">{topic.title}</strong><div className="flex flex-wrap gap-1"><Button asChild variant="link" className="h-auto whitespace-normal text-left"><Link to="/temas/$topic" params={{ topic: topic.id }}>Repaso gratuito</Link></Button>{topic.deckIds.filter(id => decks.some(d => d.id === id)).map(id => <Button key={id} asChild variant="link" className="h-auto whitespace-normal text-left"><Link to="/simulacro" search={{ deck }}>Simulacro · {decks.find(d => d.id === id)?.title}</Link></Button>)}</div><p className="text-xs text-muted-foreground">Bloque inicial{!topic.deckIds.length ? ' · Sin simulacro específico publicado' : ''}</p></li>)}</ul>
  </div>;
}