import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAccount } from '@/components/AccountProvider';
import { Button } from '@/components/ui/button';
import { isAllowedAccountEmail, GMAIL_ONLY_MESSAGE } from '@/lib/account-email';
import {institutionSectionLinks} from '@/lib/institution-links';

const field = 'mt-1 w-full rounded-xl border border-border bg-background px-3 py-2';
const RELATIONS = [['madre', 'Madre'], ['padre', 'Padre'], ['encargado', 'Encargado(a)']];
const friendly = (m) => (/Gmail|rol|estudiante|guía|personal|Solo|existe/.test(m) ? m : 'No se pudo guardar el cambio.');

/** Sections with a guide teacher, their students and linked families. Managers edit everything; guides link families of their own students. */
export function SectionsPanel({ institutionId, manager }) {
  const { user } = useAccount();
  const queries = useQueryClient();
  const people = useQuery({
    queryKey: ['institution-people', institutionId],
    queryFn () => { const { data, error } = await supabase.rpc('institution_people', { _inst }); if (error) throw new Error('No se pudo cargar el personal y estudiantes.'); return data; },
  });
  const sections = useQuery({
    queryKey: ['institution-sections', institutionId],
    queryFn () => { const { data, error } = await supabase.from('institution_sections').select('id,name,guide_id').eq('institution_id', institutionId).order('name'); if (error) throw new Error('No se pudieron cargar las secciones.'); return data; },
  });
  const refresh = () => { for (const k of ['institution-people', 'institution-sections', 'channels']) void queries.invalidateQueries({ queryKey, institutionId] }); };
  const [name, setName] = useState('');
  const [guide, setGuide] = useState('');
  const staff = (people.data ?? []).filter(p => p.member_role === 'docente' || p.member_role === 'direccion' || p.member_role === 'administrativo');
  const students = (people.data ?? []).filter(p => p.member_role === 'estudiante');
  const label = (p) => p.display_name || p.email || 'Sin nombre registrado';

  async function create(e) {
    e.preventDefault();
    const { error } = await supabase.rpc('save_section', { _inst, _id, _name, _guide: (guide || null) });
    if (error) { toast.error(error.message.includes('duplicate') ? 'Ya existe una sección con ese nombre.' : friendly(error.message)); return; }
    toast.success('Sección creada.'); setName(''); setGuide(''); refresh();
  }
  async function setSectionGuide(id) {
    const { error } = await supabase.rpc('save_section', { _inst, _id, _name, _guide: (guideId || null) });
    if (error) { toast.error(friendly(error.message)); return; }
    toast.success('Profesor(a) guía actualizado.'); refresh();
  }
  async function assign(section) {
    if (!student) return;
    const { error } = await supabase.rpc('assign_student_section', { _section, _student });
    if (error) { toast.error(friendly(error.message)); return; }
    toast.success('Estudiante asignado.'); refresh();
  }
  async function remove(section) {
    const { error } = await supabase.rpc('remove_student_section', { _section, _student });
    if (error) { toast.error(friendly(error.message)); return; }
    refresh();
  }

  if (people.isPending || sections.isPending) return <p role="status">Cargando secciones…</p>;
  if (people.isError || sections.isError) return <p role="alert" className="text-destructive">{(people.error ?? sections.error)?.message}</p>;
  const visible = manager ? sections.data : sections.data.filter(s => s.guide_id === user?.id);
  return <div className="space-y-6">
    <p className="text-sm text-muted-foreground">Cada sección puede tener un(a) profesor(a) guía. Las familias se vinculan con su cuenta Gmail confirmada y solo ven los recados de la sección y su conversación privada con el personal. Los estudiantes no tienen chat.</p>
    {manager && <form onSubmit={create} className="grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
      <label className="text-sm font-semibold">Nueva sección<input required maxLength={40} className={field} value={name} onChange={e => setName(e.target.value)} placeholder="Ej.: 10-2" /></label>
      <label className="text-sm font-semibold">Profesor(a) guía (opcional)<select className={field} value={guide} onChange={e => setGuide(e.target.value)}><option value="">Sin asignar</option>{staff.map(p => <option key={p.user_id} value={p.user_id}>{label(p)}</option>)}</select></label>
      <Button type="submit">Crear sección</Button>
    </form>}
    {!visible.length ? <p className="text-muted-foreground">{manager ? 'Aún no hay secciones.' : 'No es guía de ninguna sección.'}</p> :
      visible.map(s => {
        const roster = students.filter(p => p.section_id === s.id);
        const available = students.filter(p => p.section_id !== s.id);
        return <article key={s.id} className="rounded-2xl border border-border bg-card p-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h3 className="text-lg font-black">🏷️ Sección {s.name}</h3>
            <details className="w-full"><summary className="cursor-pointer font-semibold">Enlaces de acceso · {s.name}</summary><div className="space-y-2 py-3">{Object.entries(institutionSectionLinks(institutionId,s.name)).map(([key,url])=><label key={key} className="block text-sm">{key==='student'?'Estudiante':key==='family'?'Familia vinculada':'Canales'}<input aria-label={`Enlace ${key} · ${s.name}`} className={field} readOnly value={url}/><Button size="sm" variant="outline" onClick={async()=>{try{await navigator.clipboard.writeText(url);toast.success('Enlace copiado');}catch{toast.error('No se pudo copiar el enlace.');}}}>Copiar enlace</Button></label>)}</div></details>
            {manager ? <label className="text-sm font-semibold">Profesor(a) guía<select className={field} value={s.guide_id ?? ''} onChange={e => void setSectionGuide(s.id, s.name, e.target.value)}><option value="">Sin asignar</option>{staff.map(p => <option key={p.user_id} value={p.user_id}>{label(p)}</option>)}</select></label>
              : <p className="text-sm text-primary">Usted es guía de esta sección</p>}
          </div>
          {manager && <label className="mt-3 block text-sm font-semibold">Agregar estudiante<select className={field} value="" onChange={e => void assign(s.id, e.target.value)}><option value="">Seleccione…</option>{available.map(p => <option key={p.user_id} value={p.user_id}>{label(p)}{p.section_name ? ` (hoy en ${p.section_name})` : ''}</option>)}</select></label>}
          {!roster.length ? <p className="mt-3 text-sm text-muted-foreground">Sin estudiantes asignados.</p> :
            <ul className="mt-3 space-y-2">{roster.map(p => <StudentRow key={p.user_id} institutionId={institutionId} student={p} manager={manager} onRemove={() => void remove(s.id, p.user_id)} onChange={refresh} />)}</ul>}
        </article>;
      })}
  </div>;
}

function StudentRow({ institutionId, student, manager, onRemove, onChange }: { institutionId: string; student: { user_id: string; display_name: string; email null; guardians }; manager: boolean; onRemove: () => void; onChange: () => void }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [relation, setRelation] = useState('madre');
  const guardians = useQuery({
    queryKey: ['student-guardians', institutionId, student.user_id], enabled,
    queryFn () => { const { data, error } = await supabase.rpc('student_guardians', { _inst, _student: student.user_id }); if (error) throw new Error('No se pudieron cargar las familias.'); return data; },
  });
  async function link(e) {
    e.preventDefault();
    if (!isAllowedAccountEmail(email)) { toast.error(GMAIL_ONLY_MESSAGE); return; }
    const { error } = await supabase.rpc('link_guardian', { _inst, _student: student.user_id, _email: email.trim(), _relation });
    if (error) { toast.error(friendly(error.message)); return; }
    toast.success('Familia vinculada.'); setEmail(''); void guardians.refetch(); onChange();
  }
  async function unlink(guardianId) {
    const { error } = await supabase.rpc('unlink_guardian', { _inst, _guardian, _student: student.user_id });
    if (error) { toast.error(friendly(error.message)); return; }
    void guardians.refetch(); onChange();
  }
  return <li className="rounded-xl border border-border bg-background p-3 text-sm">
    <div className="flex flex-wrap items-center gap-2">
      <span className="min-w-0 flex-1 font-bold">{student.display_name || student.email || 'Estudiante sin nombre'}<span className="ml-2 text-xs font-normal text-muted-foreground">{Number(student.guardians)} familia(s)</span></span>
      <Button size="sm" variant="outline" onClick={() => setOpen(o => !o)}>{open ? 'Cerrar' : '👪 Familias'}</Button>
      {manager && <Button size="sm" variant="ghost" onClick={onRemove}>Quitar de la sección</Button>}
    </div>
    {open && <div className="mt-3 space-y-2">
      {guardians.isPending ? <p role="status">Cargando…</p> : guardians.isError ? <p role="alert" className="text-destructive">{guardians.error.message}</p> : !guardians.data.length ? <p className="text-muted-foreground">Sin familia vinculada.</p> :
        <ul className="space-y-1">{guardians.data.map(g => <li key={g.guardian_id} className="flex flex-wrap items-center gap-2"><span className="flex-1">{RELATIONS.find(r => r[0] === g.relation)?.[1]}: {g.display_name || g.email}</span>{manager && <Button size="sm" variant="ghost" onClick={() => void unlink(g.guardian_id)}>Desvincular</Button>}</li>)}</ul>}
      <form onSubmit={link} className="grid gap-2 sm:grid-cols-[1fr_auto_auto] sm:items-end">
        <label className="text-xs font-semibold">Correo Gmail de la familia<input type="email" required className={field} value={email} onChange={e => setEmail(e.target.value)} placeholder="nombre@gmail.com" /></label>
        <label className="text-xs font-semibold">Relación<select className={field} value={relation} onChange={e => setRelation(e.target.value)}>{RELATIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
        <Button type="submit" size="sm">Vincular</Button>
      </form>
      <p className="text-xs text-muted-foreground">La familia debe haber creado antes su cuenta con ese Gmail y confirmado el correo.</p>
    </div>}
  </li>;
}
