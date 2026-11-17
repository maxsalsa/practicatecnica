import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Building2, Save, Pencil, Phone, Globe, MapPin } from 'lucide-react';

const fields = [
  ['regional_direction', 'Dirección regional', 120], ['circuit', 'Circuito educativo', 40],
  ['director_name', 'Nombre de la persona directora', 160], ['phone', 'Teléfono institucional', 40],
  ['address', 'Dirección física', 400], ['website', 'Página web', 400],
  ['facebook', 'Facebook', 400], ['instagram', 'Instagram', 400],
];


const empty = { regional_direction: '', circuit: '', director_name: '', phone: '', address: '', website: '', facebook: '', instagram: '' };

export function InstitutionProfile({ institutionId, canEdit }: { institutionId: string; canEdit }) {
  const queries = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(empty);
  const [busy, setBusy] = useState(false);
  const profile = useQuery({ queryKey: ['institution-contact-profile', institutionId], queryFn () => {
    const { data, error } = await supabase.from('institution_contact_profiles').select('*').eq('institution_id', institutionId).maybeSingle();
    if (error) throw new Error('No se pudo cargar el perfil institucional.');
    return data;
  } });
  const data = profile.data;
  async function save(event) {
    event.preventDefault(); if (!canEdit) return;
    setBusy(true);
    const values = Object.fromEntries(fields.map(([key]) => [key, draft[key].trim()]));
    const { error } = await supabase.from('institution_contact_profiles').upsert({ ...values, institution_id, updated_at Date().toISOString() });
    setBusy(false);
    if (error) { toast.error('No se pudo guardar. Verifique sus permisos y use enlaces https://.'); return; }
    await queries.invalidateQueries({ queryKey: ['institution-contact-profile', institutionId] });
    setEditing(false); toast.success('Perfil institucional guardado.');
  }
  return <section className="space-y-3 border-y border-border py-4" aria-label="Perfil institucional">
    <div className="flex items-center justify-between gap-2"><h2 className="flex items-center gap-2 font-bold"><Building2 className="h-5 w-5" aria-hidden="true"/>Datos del centro</h2>
      {canEdit && !editing && <Button variant="outline" size="sm" disabled={profile.isPending || profile.isError} onClick={() => { setDraft(data ?? empty); setEditing(true); }}><Pencil className="h-4 w-4" aria-hidden="true"/>Editar perfil</Button>}
    </div>
    {profile.isPending ? <p role="status">Cargando datos…</p> : profile.isError ? <p role="alert" className="text-destructive">{profile.error.message}</p> : editing ?
      <form onSubmit={event => void save(event)} className="grid min-w-0 gap-3 sm:grid-cols-2">
        {fields.map(([key, label, max]) => <label key={key} className="min-w-0 text-sm font-semibold">{label}<input maxLength={max} type={['website','facebook','instagram'].includes(key) ? 'url' : key === 'phone' ? 'tel' : 'text'} pattern={['website','facebook','instagram'].includes(key) ? 'https://.*' : undefined} placeholder={['website','facebook','instagram'].includes(key) ? 'https://' : undefined} value={draft[key]} onChange={event => setDraft({ ...draft, [key]: event.target.value })} className="mt-1 w-full min-w-0 rounded-md border border-border bg-background px-3 py-2 text-foreground"/></label>)}
        <div className="flex gap-2 sm:col-span-2"><Button type="submit" disabled={busy}><Save className="h-4 w-4" aria-hidden="true"/>{busy ? 'Guardando…' : 'Guardar datos'}</Button><Button type="button" variant="ghost" disabled={busy} onClick={() => setEditing(false)}>Cancelar</Button></div>
      </form> : <div className="space-y-2 text-sm">
        <p className="text-muted-foreground">{data?.regional_direction || 'Dirección regional sin registrar'} · {data?.circuit ? `Circuito ${data.circuit}` : 'Circuito sin registrar'}</p>
        <p><strong>Dirección:</strong> {data?.director_name || 'Nombre sin registrar'}</p>
        {data?.address && <p className="flex items-start gap-2 break-words"><MapPin className="h-4 w-4 shrink-0" aria-hidden="true"/>{data.address}</p>}
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {data?.phone && <a className="flex items-center gap-1 text-primary underline" href={`tel:${data.phone}`}><Phone className="h-4 w-4" aria-hidden="true"/>{data.phone}</a>}
          {(['website','facebook','instagram']).map(key => data?.[key]?.startsWith('https://') && <a key={key} href={data[key]} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary underline"><Globe className="h-4 w-4" aria-hidden="true"/>{key === 'website' ? 'Página web' : key === 'facebook' ? 'Facebook' : 'Instagram'}</a>)}
        </div>
      </div>}
  </section>;
}