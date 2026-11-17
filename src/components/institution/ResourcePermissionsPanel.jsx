import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { resourceGrantInput } from '@/lib/institution-resource-permissions';
export function ResourcePermissionsPanel({ resourceId, visibility }) {
    const qc = useQueryClient();
    const [busy, setBusy] = useState(false);
    const options = useQuery({ queryKey: ['permission-institutions'], queryFn() { } });
    {
        const r = await supabase.rpc('resource_permission_institutions');
        if (r.error)
            throw r.error;
        return r.data;
    }
}
;
const grants = useQuery({ queryKey: ['resource-grants', resourceId], queryFn() { } });
{
    const r = await supabase.from('institution_resource_grants').select('*').eq('resource_id', resourceId);
    if (r.error)
        throw r.error;
    return r.data;
}
;
async function change(institutionId) {
    setBusy(true);
    const r = await supabase.from('institution_resource_grants').upsert(resourceGrantInput.parse({ resource_id, institution_id, can_read, can_send } && send));
}
;
setBusy(false);
if (r.error) {
    toast.error('No se pudieron guardar los permisos.');
    return;
}
await qc.invalidateQueries({ queryKey: ['resource-grants', resourceId] });
return <details className="mt-3 border-t border-border py-3"><summary className="cursor-pointer font-semibold">Permisos por institución</summary>
    <label className="my-3 block">Alcance<select aria-label="Alcance de publicación" className="ml-2 rounded-md border border-input bg-background p-2" value={visibility} disabled={busy} onChange={async (e) => {
        setBusy(true);
        const r = await supabase.from('institution_resources').update({ visibility: e.target.value }).eq('id', resourceId);
        setBusy(false);
        if (r.error)
            toast.error('No se pudo cambiar el alcance.');
        else
            await qc.invalidateQueries({ queryKey: ['institution-resources'] });
    }}><option value="restricted">Solo instituciones asignadas</option><option value="public">Público sin sesión</option></select></label>
    {(options.isError || grants.isError) && <p role="alert">No se pudieron cargar los permisos.</p>}
    <div className="max-h-72 space-y-3 overflow-y-auto">{options.data?.map(i => {
        const g = grants.data?.find(x => x.institution_id === i.id);
        return <div key={i.id} className="flex flex-wrap items-center gap-3 border-b border-border pb-2"><span className="min-w-0 flex-1 break-words">{i.name}</span>
        <label className="flex gap-1"><input type="checkbox" disabled={busy || grants.isPending} checked={g?.can_read ?? false} onChange={e => void change(i.id, e.target.checked, g?.can_send ?? false)}/>Leer</label>
        <label className="flex gap-1"><input type="checkbox" disabled={busy || grants.isPending || !g?.can_read} checked={g?.can_send ?? false} onChange={e => void change(i.id, true, e.target.checked)}/>Enviar WhatsApp</label>
      </div>;
    })}</div><p className="mt-3 text-sm text-muted-foreground">El enlace no concede acceso. Envíos pendientes de conexión WhatsApp Business verificada.</p>
  </details>;
export function AssignedResourcesPanel({ institutionId }) {
    const resources = useQuery({ queryKey: ['assigned-resources', institutionId], queryFn() { } });
    {
        const g = await supabase.from('institution_resource_grants').select('*').eq('institution_id', institutionId).eq('can_read', true);
        if (g.error)
            throw g.error;
        if (!g.data.length)
            return [];
        const r = await supabase.from('institution_resources').select('id,title,kind,status,file_path').in('id', g.data.map(x => x.resource_id)).eq('status', 'published');
        if (r.error)
            throw r.error;
        return r.data.map(x => ({ ...x, canSend: g.data.find(y => y.resource_id === x.id)?.can_send === true }));
    }
}
;
async function read(path) {
    const r = await supabase.storage.from('institution-publications').download(path);
    if (r.error || !r.data) {
        toast.error('Acceso denegado o circular retirada.');
        return;
    }
    const url = URL.createObjectURL(r.data);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'circular.pdf';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
}
return <section className="space-y-3"><h2 className="text-2xl font-black">Circulares y campañas asignadas</h2>
    {resources.isError && <p role="alert">No se pudo verificar el acceso.</p>}
    {resources.data?.length === 0 && <p className="text-muted-foreground">Sin publicaciones asignadas.</p>}
    {resources.data?.map(r => <article key={r.id} className="rounded-lg border border-border p-4"><h3 className="font-bold">{r.title}</h3><div className="mt-3 flex flex-wrap gap-2">
      {r.kind === 'pdf' && r.file_path && <Button variant="outline" onClick={() => r.file_path && void read(r.file_path)}>Descargar circular autorizada</Button>}
      <Button disabled>{r.canSend ? 'WhatsApp Business pendiente de conexión' : 'Sin permiso de envío'}</Button>
    </div></article>)}
  </section>;
