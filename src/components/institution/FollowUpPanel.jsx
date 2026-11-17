import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAccount } from '@/components/AccountProvider';
import { MODE_LABELS, summarizeFollowUp, type Band } from '@/lib/family-progress';
import type { Attempt } from '@/lib/progress-data';
import { GradeBook } from '@/components/GradeBook';
import { StudentSchedulePanel } from './StudentSchedulePanel';
import {StudentResults} from './StudentResults';
import {institutionResultAttempts} from '@/lib/institution-results';

const field = 'mt-1 w-full rounded-xl border border-border bg-background px-3 py-2';
const bandClass: Record<Band, string> = { Dominado: 'bg-accent text-accent-foreground', 'En proceso': 'bg-primary text-primary-foreground', 'Requiere reforzamiento': 'bg-destructive text-destructive-foreground' };
const date = (d: string) => new Date(d).toLocaleDateString('es-CR', { timeZone: 'America/Costa_Rica', day: 'numeric', month: 'short' });


/** Families see their linked students; direccion, administración/orientación and guides see the students they may follow. */
export function FollowUpPanel({ institutionId, role, manager }: { institutionId: string; role: string; manager: boolean }) {
  const { user } = useAccount();
  const options = useQuery({
    queryKey: ['follow-options', institutionId, role, user?.id],
    queryFn: async (): Promise<Followed[]> => {
      if (role === 'encargado') {
        const { data, error } = await supabase.rpc('my_guardian_links', { _inst: institutionId });
        if (error) throw new Error('No se pudo cargar su vínculo familiar.');
        return data.filter(l => l.consented_at).map(l => ({ id: l.student_id, name: l.student_name }));
      }
      const [people, sections] = await Promise.all([
        supabase.rpc('institution_people', { _inst: institutionId }),
        supabase.from('institution_sections').select('id,guide_id').eq('institution_id', institutionId),
      ]);
      if (people.error || sections.error) throw new Error('No se pudo cargar la lista de estudiantes.');
      const mine = new Set(sections.data.filter(s => s.guide_id === user?.id).map(s => s.id));
      return people.data.filter(p => p.member_role === 'estudiante' && (manager || (p.section_id && mine.has(p.section_id))))
        .map(p => ({ id: p.user_id, name: `${p.display_name || 'Estudiante'}${p.section_name ? ` · ${p.section_name}` : ''}` }));
    },
  });
  const [picked, setPicked] = useState('');
  const student = picked || options.data?.[0]?.id || '';
  if (options.isPending) return <p role="status">Cargando…</p>;
  if (options.isError) return <p role="alert" className="text-destructive">{options.error.message}</p>;
  if (!options.data.length) return <p className="text-muted-foreground">{role === 'encargado' ? 'Aún no tiene estudiantes vinculados con aviso aceptado.' : 'No tiene estudiantes a cargo para dar seguimiento.'}</p>;
  return <div className="space-y-4">
    {options.data.length > 1 && <label className="block max-w-md text-sm font-semibold">Estudiante<select className={field} value={student} onChange={e => setPicked(e.target.value)}>{options.data.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}</select></label>}
    {student && <FollowUp key={student} institutionId={institutionId} studentId={student} />}
    {student && role === 'encargado' && <GradeBook key={`grades-${student}`} ownerUserId={student} />}
    {student && role === 'encargado' && <StudentSchedulePanel institutionId={institutionId} studentId={student} />}
  </div>;
}

function FollowUp({ institutionId, studentId }: { institutionId: string; studentId: string }) {
  const q = useQuery({
    queryKey: ['follow-up', institutionId, studentId],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('student_follow_up', { _inst: institutionId, _student: studentId });
      if (error) throw new Error(error.code === '42501' ? 'No tiene permiso para ver este seguimiento.' : 'No se pudo cargar el seguimiento.');
      const results=await supabase.from('institution_practice_results').select('id,publication_id,publication_version,subject,title,score,question_count,created_at').eq('institution_id',institutionId).eq('user_id',studentId).gte('created_at',new Date(Date.now()-365*86400000).toISOString()).order('created_at');
      if(results.error)throw new Error('No se pudieron cargar los resultados institucionales.');
      return {...data as { student_name: string; attempts: Attempt[]; visit_days: string[]; last_seen: string | null },institutionAttempts:institutionResultAttempts(results.data)};
    },
  });
  if (q.isPending) return <p role="status">Cargando seguimiento…</p>;
  if (q.isError) return <p role="alert" className="text-destructive">{q.error.message}</p>;
  const s = summarizeFollowUp(q.data.attempts, q.data.visit_days);
  const stats: [string, string][] = [
    ['Días de uso (30 días)', String(s.activeDays30)], ['Racha actual', `${s.streak} día(s)`], ['Puntos', String(s.points)],
    ['Prácticas y simulacros', String(s.verifiedCount)], ['Promedio verificado', s.average === null ? '—' : `${s.average}`], ['Última conexión', q.data.last_seen ? date(q.data.last_seen) : '—'],
  ];
  return <section className="space-y-4" aria-label={`Seguimiento de ${q.data.student_name}`}>
    <h3 className="text-xl font-black">📈 {q.data.student_name}</h3>
    <StudentResults attempts={q.data.attempts}/>
    <StudentResults attempts={q.data.institutionAttempts} heading="Prácticas institucionales · resultados guardados"/>
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">{stats.map(([k, v]) => <div key={k} className="rounded-2xl border border-border bg-card p-3"><dt className="text-xs text-muted-foreground">{k}</dt><dd className="text-2xl font-black">{v}</dd></div>)}</dl>
    {s.toReinforce.length > 0 && <p className="rounded-2xl border border-destructive bg-card p-3 text-sm"><strong>Conviene reforzar:</strong> {s.toReinforce.join(', ')}. Anímele a repasar las habilidades pendientes.</p>}
    <div className="rounded-2xl border border-border bg-card p-4">
      <h4 className="font-extrabold">Saberes y habilidades por materia</h4>
      {!s.subjects.length ? <p className="mt-2 text-sm text-muted-foreground">Aún no hay prácticas con nota verificada.</p> :
        <ul className="mt-3 space-y-2">{s.subjects.map(x => <li key={x.title} className="flex flex-wrap items-center gap-2 text-sm"><span className="min-w-0 flex-1 font-bold">{x.title}</span><span className="text-muted-foreground">{x.attempts} intento(s) · última {x.last} · mejor {x.best}</span><span className={`rounded-full px-2 py-0.5 text-xs font-black ${bandClass[x.band]}`}>{x.band}</span></li>)}</ul>}
    </div>
    <div className="rounded-2xl border border-border bg-card p-4">
      <h4 className="font-extrabold">Últimos resultados</h4>
      {!s.recent.length ? <p className="mt-2 text-sm text-muted-foreground">Sin resultados todavía.</p> :
        <ul className="mt-3 divide-y divide-border text-sm">{s.recent.map(r => <li key={r.id} className="flex flex-wrap justify-between gap-2 py-2"><span>{date(r.created_at)} · {MODE_LABELS[r.assessment_mode ?? ''] ?? 'Práctica'} · {r.title}</span><strong>{r.score}/100</strong></li>)}</ul>}
    </div>
    <p className="text-xs text-muted-foreground">Solo se muestran notas calculadas por la plataforma; los juegos no cuentan como nota. Datos de los últimos 12 meses, visibles para la familia vinculada, la dirección, orientación y la persona guía.</p>
  </section>;
}

