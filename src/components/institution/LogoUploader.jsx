import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { logoExtension } from '@/lib/institutions';

/** Dirección (o Max) cambia el logo o escudo de su propia institución. */
export function LogoUploader({ inst, oldPath }: { inst: string; oldPath }) {
  const qc = useQueryClient();
  const [busy, setBusy] = useState(false);
  async function upload(file) {
    if (!file) return;
    const check = logoExtension(file);
    if (check.error) { toast.error(check.error); return; }
    setBusy(true);
    const path = `${inst}/logo-${Date.now()}.${check.ext}`;
    const up = await supabase.storage.from('institution-logos').upload(path, file, { contentType: file.type, upsert });
    if (up.error) { setBusy(false); toast.error('No se pudo subir el logo.'); return; }
    const { error } = await supabase.rpc('set_institution_logo', { _inst, _path });
    if (!error && oldPath) await supabase.storage.from('institution-logos').remove([oldPath]);
    setBusy(false);
    if (error) { toast.error('No se pudo guardar el logo.'); return; }
    toast.success('Logo o escudo actualizado.');
    void qc.invalidateQueries();
  }
  return <label className="mt-1 inline-block cursor-pointer text-sm font-bold text-primary underline">
    {busy ? 'Subiendo…' : 'Cambiar logo o escudo (PNG, JPG o WebP, máx. 1 MB)'}
    <input type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" disabled={busy} onChange={e => void upload(e.target.files?.[0])} />
  </label>;
}
