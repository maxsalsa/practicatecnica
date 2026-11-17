import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { InstitutionLogo } from './InstitutionLogo';
import { INSTITUTION_KIND_LABELS, ROLE_LABELS, logoExtension } from '@/lib/institutions';
const field = 'mt-1 min-w-0 w-full max-w-full rounded-xl border border-border bg-background px-3 py-2';
export function InstitutionAdmin({ selectedId, onSelect }) {
    const queries = useQueryClient();
    const list = useQuery({
        queryKey: ['admin-institutions'],
        queryFn() { }
    });
    {
        const { data, error } = await supabase.rpc('admin_institutions');
        if (error)
            throw new Error('No se pudieron cargar las instituciones.');
        return data;
    }
}
;
const selected = list.data?.find(i => i.id === selectedId) ?? null;
const members = useQuery({
    queryKey: ['admin-institution-members', selectedId], enabled: !!selectedId,
    queryFn() { }
});
{
    if (!selectedId)
        throw new Error('Seleccione una institución.');
    const { data, error } = await supabase.rpc('admin_institution_members', { _inst });
    if (error)
        throw new Error('No se pudieron cargar los miembros.');
    return data;
}
;
const [name, setName] = useState('');
const [isTest, setIsTest] = useState(false);
const [kind, setKind] = useState('ctp');
const [email, setEmail] = useState('');
const [role, setRole] = useState('docente');
const [busy, setBusy] = useState(false);
const refresh = () => { void queries.invalidateQueries({ queryKey: ['admin-institutions'] }); void queries.invalidateQueries({ queryKey: ['admin-institution-members'] }); void queries.invalidateQueries({ queryKey: ['my-institutions'] }); };
async function create(e) {
    e.preventDefault();
    setBusy(true);
    const { data, error } = await supabase.rpc('admin_create_institution', { _name: name.trim(), _is_test, _kind });
    setBusy(false);
    if (error || !data) {
        toast.error('No se pudo crear la institución. Use entre 3 y 120 caracteres.');
        return;
    }
    toast.success('Institución creada.');
    setName('');
    setIsTest(false);
    refresh();
    onSelect(data);
}
async function uploadLogo(file) {
    if (!file || !selected)
        return;
    const check = logoExtension(file);
    if (check.error) {
        toast.error(check.error);
        return;
    }
    setBusy(true);
    const path = `${selected.id}/logo-${Date.now()}.${check.ext}`;
    const up = await supabase.storage.from('institution-logos').upload(path, file, { contentType: file.type, upsert });
    if (up.error) {
        setBusy(false);
        toast.error('No se pudo subir el logo.');
        return;
    }
    const { error } = await supabase.rpc('admin_set_institution_logo', { _inst: selected.id, _path });
    if (!error && selected.logo_path)
        await supabase.storage.from('institution-logos').remove([selected.logo_path]);
    setBusy(false);
    if (error) {
        toast.error('No se pudo guardar el logo.');
        return;
    }
    toast.success('Logo actualizado.');
    refresh();
}
async function addMember(e) {
    e.preventDefault();
    if (!selected)
        return;
    setBusy(true);
    const { error } = await supabase.rpc('admin_set_institution_member', { _inst: selected.id, _email: email.trim(), _role });
    setBusy(false);
    if (error) {
        toast.error(error.message.includes('confirmada') ? 'No existe una cuenta confirmada con ese correo. La persona debe ingresar primero con su Gmail.' : 'No se pudo asignar el rol.');
        return;
    }
    toast.success(`Rol ${ROLE_LABELS[role]} asignado.`);
    setEmail('');
    refresh();
}
async function removeMember(userId) {
    if (!selected || !window.confirm('¿Quitar a esta persona de la institución?'))
        return;
    const { error } = await supabase.rpc('admin_remove_institution_member', { _inst: selected.id, _user });
    if (error) {
        toast.error('No se pudo quitar.');
        return;
    }
    toast.success('Persona retirada de la institución.');
    refresh();
}
return <div className="min-w-0 space-y-6 [&_form]:min-w-0 [&_label]:min-w-0 [&_section]:min-w-0">
    <form onSubmit={create} className="rounded-2xl border border-border bg-card p-5">
      <h3 className="text-lg font-extrabold">Nueva institución</h3>
      <label className="mt-3 block text-sm font-semibold">Nombre oficial
        <input required minLength={3} maxLength={120} className={field} value={name} onChange={e => setName(e.target.value)} placeholder="Ej.: CTP Mercedes Norte"/>
      </label>
      <label className="mt-3 block text-sm font-semibold">Tipo
        <select className={field} value={kind} onChange={e => setKind(e.target.value)}>
          {(Object.keys(INSTITUTION_KIND_LABELS)).map(k => <option key={k} value={k}>{INSTITUTION_KIND_LABELS[k]}</option>)}
        </select>
      </label>
      <label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" checked={isTest} onChange={e => setIsTest(e.target.checked)}/> Institución de prueba (se identifica como prueba en todas las pantallas)</label>
      <Button type="submit" className="mt-4" disabled={busy}>Crear institución</Button>
    </form>

    <section>
      <h3 className="text-lg font-extrabold">Instituciones</h3>
      {list.isPending ? <p role="status" className="mt-3">Cargando…</p> : list.isError ? <p role="alert" className="mt-3 text-destructive">{list.error.message}</p> : !list.data.length ? <p className="mt-3 text-muted-foreground">Aún no hay instituciones.</p> :
        <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">{list.data.map(i => <li key={i.id} className="min-w-0">
          <button type="button" onClick={() => onSelect(i.id)} className={`flex w-full items-center gap-3 rounded-2xl border bg-card p-3 text-left ${i.id === selectedId ? 'border-primary ring-2 ring-primary' : 'border-border'}`}>
            <InstitutionLogo path={i.logo_path} name={i.name} className="h-12 w-12"/>
            <span className="min-w-0">
              <span className="block truncate font-bold">{i.name}{i.is_test ? ' · PRUEBA' : ''}</span>
              <span className="block text-xs font-semibold text-accent">{INSTITUTION_KIND_LABELS[i.kind ?? i.kind]}</span>
              <span className="block text-xs text-muted-foreground">Personal {i.staff} · Estudiantes {i.students} · {i.paid_until && Date.parse(i.paid_until) > Date.now() ? `Plan hasta ${new Date(i.paid_until).toLocaleDateString('es-CR')}` : 'Sin plan institucional vigente'}</span>
            </span>
          </button>
        </li>)}</ul>}
    </section>

    {selected && <section className="rounded-2xl border border-border bg-card p-5">
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <InstitutionLogo path={selected.logo_path} name={selected.name} className="h-16 w-16"/>
        <div className="min-w-0 flex-1 break-words">
          <h3 className="text-lg font-extrabold">{selected.name}</h3>
          <label className="mt-1 inline-block cursor-pointer text-sm font-bold text-primary underline">Cambiar logo (PNG, JPG o WebP, máx. 1 MB)
            <input type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" disabled={busy} onChange={e => void uploadLogo(e.target.files?.[0])}/>
          </label>
        </div>
      </div>
      <form onSubmit={addMember} className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_auto] sm:items-end">
        <label className="text-sm font-semibold">Correo Gmail de la cuenta confirmada
          <input required type="email" className={field} value={email} onChange={e => setEmail(e.target.value)} placeholder="nombre@gmail.com"/>
        </label>
        <label className="text-sm font-semibold">Rol
          <select className={field} value={role} onChange={e => setRole(e.target.value)}>
            {(Object.keys(ROLE_LABELS)).map(r => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
          </select>
        </label>
        <Button type="submit" disabled={busy}>Asignar</Button>
      </form>
      <p className="mt-2 text-xs text-muted-foreground">El rol de este colegio es independiente del tipo de cuenta personal y de su suscripción.</p>
      {members.isPending ? <p role="status" className="mt-3">Cargando miembros…</p> : members.isError ? <p role="alert" className="mt-3 text-destructive">{members.error.message}</p> : !members.data.length ? <p className="mt-3 text-muted-foreground">Sin miembros todavía.</p> :
            <ul className="mt-3 divide-y divide-border">{members.data.map(m => <li key={m.user_id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
          <span><strong>{m.display_name || m.email}</strong> · {ROLE_LABELS[m.member_role]}<span className="block text-xs text-muted-foreground">{m.email}</span></span>
          <div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => { setEmail(m.email); setRole(m.member_role); }}>Editar rol</Button><Button size="sm" variant="outline" onClick={() => void removeMember(m.user_id)}>Quitar</Button></div>
        </li>)}</ul>}
    </section>}
  </div>;
