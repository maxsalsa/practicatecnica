import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from '@/components/AccountProvider';
import { TeacherAccess } from '@/components/TeacherAccess';
import { SiteHeader } from '@/components/SiteHeader';
import { LearningRecords } from '@/components/LearningRecords';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
export const Route = createFileRoute('/rubricas')({
  staticData: { sitemap: false },
  head: () => ({ meta: [
    { title: 'Rúbricas y trazabilidad docente · pracTICAtecnica.com' },
    { name: 'description', content: 'Indicadores y valoraciones docentes por estudiante, materia y nivel con seguimiento privado.' },
    { property: 'og:title', content: 'Rúbricas y trazabilidad · pracTICAtecnica.com' },
    { property: 'og:description', content: 'Seguimiento privado de indicadores de logro y comentarios docentes.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex' },
  ] }),
  component: () => <TeacherAccess><RubricsPage /></TeacherAccess>,
});
function RubricsPage() {
  const { user } = useAccount();
  const [selected, setSelected] = useState('');
  const roster = useQuery({ queryKey: ['rubric-roster', user?.id], enabled: !!user, queryFn: async () => {
    if (!user) return [];
    const result = await supabase.from('students').select('id,name,level,institution').eq('teacher_id', user.id).order('name');
    if (result.error) throw new Error('No se pudo cargar su matrícula autorizada.');
    return result.data;
  } });
  const student = roster.data?.find(s => s.id === selected);
  return <main className="min-h-screen bg-hero"><SiteHeader /><section className="mx-auto max-w-5xl px-5 pb-16">
    <div className="flex flex-wrap items-center justify-between gap-3"><h1 className="text-3xl font-black">Rúbricas y trazabilidad</h1><Button onClick={() => window.print()} variant="outline" className="print:hidden">Imprimir o guardar PDF</Button></div>
    <Link to="/planeamiento" className="mt-3 block text-primary underline print:hidden">Planeamientos y especificaciones</Link>
    {roster.isPending ? <p role="status">Cargando matrícula…</p> : roster.isError ? <p role="alert">{roster.error.message}</p> : <label className="mt-5 grid gap-2 font-semibold print:hidden">Estudiante<select aria-label="Estudiante para rúbrica" value={selected} onChange={e => setSelected(e.target.value)} className="w-full min-w-0 max-w-full rounded-md border border-input bg-background p-3"><option value="">Seleccione estudiante</option>{roster.data.map(s => <option key={s.id} value={s.id}>{s.name} · {s.level}</option>)}</select></label>}
    {roster.data?.length === 0 && <p className="mt-5 text-muted-foreground">No tiene estudiantes propios registrados.</p>}
    {student && user && <><h2 className="mt-6 text-xl font-bold">{student.name} · {student.level}</h2><p className="text-sm text-muted-foreground">{student.institution}</p><LearningRecords key={student.id} studentId={student.id} userId={user.id} /><p className="mt-6 border-t border-border pt-4">Firma de la persona docente: __________________________</p><p className="text-xs text-muted-foreground">Espacio para firma manuscrita; no acredita firma oficial ni certificada.</p></>}
  </section></main>;
}