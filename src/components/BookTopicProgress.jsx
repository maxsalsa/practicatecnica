import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { useAccount } from './AccountProvider';
import { Button } from './ui/button';
import { readBookProgress, saveBookProgress } from '@/lib/book-progress.functions';
import { bookTopics, topicExamResults } from '@/lib/book-topics';
import type { Attempt } from '@/lib/progress-data';
import { gradeSubjectProgress } from '@/lib/book-topics';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
export function BookTopicProgress({ topicId }: { topicId: string }) {
  const { user } = useAccount();
  const cache = useQueryClient();
  const read = useServerFn(readBookProgress);
  const save = useServerFn(saveBookProgress);
  const query = useQuery({ queryKey: ['book-progress', user?.id], enabled: !!user, queryFn: () => read({ data: {} }) });
  const row = query.data?.find(r => r.topic_id === topicId);
  const mutation = useMutation({ mutationFn: (data: { readDone: boolean; exercisesDone: boolean }) => save({ data: { topicId, ...data } }), onSuccess: () => cache.invalidateQueries({ queryKey: ['book-progress', user?.id] }) });
  if (!user) return <p className="mt-4 text-sm text-muted-foreground">Ingrese para guardar su lectura y ejercicios.</p>;
  return <div className="mt-4 border-t border-border pt-3"><p className="text-sm font-semibold">Mi avance · Autodeclarado</p><div className="mt-2 flex flex-wrap gap-2"><Button size="sm" variant={row?.read_done ? 'default' : 'outline'} disabled={mutation.isPending || query.isPending || query.isError} onClick={() => mutation.mutate({ readDone: !row?.read_done, exercisesDone: row?.exercises_done ?? false })}>{row?.read_done ? '✓ Leído' : 'Marcar leído'}</Button><Button size="sm" variant={row?.exercises_done ? 'default' : 'outline'} disabled={mutation.isPending || query.isPending || query.isError} onClick={() => mutation.mutate({ readDone: row?.read_done ?? false, exercisesDone: !row?.exercises_done })}>{row?.exercises_done ? '✓ Ejercicios realizados' : 'Marcar ejercicios realizados'}</Button></div>{row && <p className="mt-2 text-xs text-muted-foreground">{new Date(row.updated_at).toLocaleDateString('es-CR', { timeZone: 'America/Costa_Rica' })} · Sin nota ni XP</p>}{(query.isError || mutation.isError) && <p role="alert" className="mt-2 text-sm text-destructive">No se pudo guardar o consultar el avance.</p>}</div>;
}
export function TeacherBookProgress({ studentId, studentName, attempts = [], attemptsPending = false, attemptsError = false }: { studentId: string; studentName?: string | undefined; attempts?: Attempt[]; attemptsPending?: boolean; attemptsError?: boolean }) {
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const read = useServerFn(readBookProgress);
  const query = useQuery({ queryKey: ['student-book-progress', studentId], queryFn: () => read({ data: { studentId } }), refetchInterval: 30000 });
  const levels = gradeSubjectProgress(query.data ?? [], attempts).filter(r => (!grade || r.grade === Number(grade)) && (!subject || r.subject === subject));
  const recorded = levels.filter(r => r.recorded);
  const lastUpdate = recorded.map(r => r.updatedAt ?? '').sort().at(-1);
  const levelSummary = <div className="mt-4">
    <div className="grid gap-3 sm:grid-cols-2"><label className="grid gap-1 text-sm">Grado<select aria-label="Grado del progreso" className="rounded-md border border-border bg-card p-2" value={grade} onChange={e => setGrade(e.target.value)}><option value="">Todos los grados disponibles</option>{[...new Set(bookTopics.map(t => t.grade))].sort((a,b)=>a-b).map(g => <option key={g} value={g}>{g === 0 ? 'Preescolar' : `${g}.º`}</option>)}</select></label><label className="grid gap-1 text-sm">Asignatura<select aria-label="Asignatura del progreso" className="rounded-md border border-border bg-card p-2" value={subject} onChange={e => setSubject(e.target.value)}><option value="">Todas las asignaturas cubiertas</option>{[...new Set(bookTopics.map(t=>t.subject))].map(s=><option key={s}>{s}</option>)}</select></label></div>
    <dl className="mt-4 grid grid-cols-2 gap-3 border-y border-border py-3 text-sm"><div><dt>Capítulos con registro</dt><dd className="font-bold">{recorded.length} de {levels.length} cubiertos</dd></div><div><dt>Lecturas autodeclaradas</dt><dd className="font-bold">{recorded.filter(r=>r.reading).length}</dd></div><div><dt>Ejercicios autodeclarados</dt><dd className="font-bold">{recorded.filter(r=>r.exercises).length}</dd></div><div><dt>Último registro</dt><dd className="font-bold">{lastUpdate ? new Date(lastUpdate).toLocaleDateString('es-CR',{timeZone:'America/Costa_Rica'}) : 'Sin registros'}</dd></div></dl>
    <ul className="mt-3 divide-y divide-border">{levels.map(r => <li key={r.id} className="py-2 text-sm"><strong>{r.title}</strong><p>{r.recorded ? `${r.completed}/2 actividades del capítulo · Autodeclarado` : 'Sin registros de lectura o ejercicios'}</p><p className="text-muted-foreground">{attemptsPending ? 'Consulta de simulacros pendiente' : attemptsError ? 'No se pudieron consultar los simulacros' : !r.deckIds.length ? 'Sin simulacro específico publicado' : `${r.examCount} simulacros verificados${r.bestScore !== null ? ` · Mejor nota ${r.bestScore}%` : ' · Sin nota'}`}</p><Button asChild size="sm" variant="link" className="h-auto px-0"><Link to="/temas/$topic" params={{topic:r.id}}>Abrir repaso</Link></Button></li>)}</ul>
    {!levels.length && <p className="mt-3 text-sm">No hay capítulos publicados para esta combinación.</p>}
  </div>;
  return <section className="mt-6 border-t border-border pt-5"><h3 className="text-lg font-bold">{studentName ? `${studentName} · ` : ''}Progreso por grado y asignatura</h3>{query.isPending ? <p>Consultando…</p> : query.isError ? <p role="alert">No se pudo consultar el progreso del estudiante.</p> : levelSummary}</section>;
}