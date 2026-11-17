import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { InstitutionDocumentHeader } from './InstitutionDocumentHeader';
import { useServerFn } from '@tanstack/react-start';
import { downloadInstitutionDocument } from '@/lib/institution-document.functions';
const TYPES, string;
 > ;
{
    'application/pdf';
    'pdf', 'image/png';
    'png', 'image/jpeg';
    'jpg', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    'docx';
}
;
/** Documentos de la institución (políticas, reglamentos). Dirección sube y borra; miembros leen. */
export function DocumentsPanel({ inst, canManage, name, logoPath }) {
    const download = useServerFn(downloadInstitutionDocument);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [busy, setBusy] = useState(false);
    const docs = useQuery({
        queryKey: ['inst-docs', inst],
        queryFn() { }
    });
    {
        const { data, error } = await supabase.from('institution_documents').select('id,title,path,created_at').eq('institution_id', inst).order('created_at', { ascending });
        if (error)
            throw error;
        return data;
    }
}
;
async function add(e) {
    e.preventDefault();
    if (!file)
        return;
    const ext = TYPES[file.type];
    if (!ext) {
        toast.error('Use PDF, Word, PNG o JPG.');
        return;
    }
    if (file.size > 10 * 1024 * 1024) {
        toast.error('Máximo 10 MB.');
        return;
    }
    setBusy(true);
    const path = `${inst}/${crypto.randomUUID()}.${ext}`;
    const up = await supabase.storage.from('institution-docs').upload(path, file, { contentType: file.type });
    if (up.error) {
        setBusy(false);
        toast.error('No se pudo subir el archivo.');
        return;
    }
    const { error } = await supabase.from('institution_documents').insert({ institution_id, title: title.trim(), path });
    if (error)
        await supabase.storage.from('institution-docs').remove([path]);
    setBusy(false);
    if (error) {
        toast.error('No se pudo guardar. El título debe tener entre 3 y 150 caracteres.');
        return;
    }
    toast.success('Documento publicado.');
    setTitle('');
    setFile(null);
    void docs.refetch();
}
async function open(path) {
    try {
        const data = await download({ data: { path } });
        const bytes = Uint8Array.from(atob(data.base64), c => c.charCodeAt(0));
        const url = URL.createObjectURL(new Blob([bytes], { type: data.type }));
        window.open(url, '_blank', 'noopener,noreferrer');
        setTimeout(() => URL.revokeObjectURL(url), 60_000);
    }
    catch {
        toast.error('No se pudo abrir. Revise su acceso actual.');
    }
}
async function remove(id) {
    const { error } = await supabase.from('institution_documents').delete().eq('id', id);
    if (error) {
        toast.error('No se pudo borrar.');
        return;
    }
    await supabase.storage.from('institution-docs').remove([path]);
    void docs.refetch();
}
return <section className="mt-4 space-y-4">
    <InstitutionDocumentHeader name={name} logoPath={logoPath} title="Documentos institucionales"/>
    {canManage && <form onSubmit={add} className="grid gap-3 rounded-2xl border border-border bg-card p-4">
      <label className="grid gap-1 text-sm font-semibold">Título del documento
        <input required minLength={3} maxLength={150} value={title} onChange={e => setTitle(e.target.value)} placeholder="Política educativa 2026" className="rounded-md border border-border bg-background p-3"/>
      </label>
      <label className="grid gap-1 text-sm font-semibold">Archivo (PDF, Word, PNG o JPG, máx. 10 MB)
        <input required type="file" accept=".pdf,.docx,image/png,image/jpeg" onChange={e => setFile(e.target.files?.[0] ?? null)}/>
      </label>
      <Button type="submit" disabled={busy}>{busy ? 'Subiendo…' : 'Publicar documento'}</Button>
    </form>}
    {docs.isError ? <p role="alert">No se pudieron leer los documentos.</p> : !docs.data?.length ? <p className="text-muted-foreground">Todavía no hay documentos.</p> :
        <ul className="space-y-2">{docs.data.map(d => <li key={d.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-card p-3">
        <span className="font-semibold">📄 {d.title} <span className="text-xs font-normal text-muted-foreground">· {new Date(d.created_at).toLocaleDateString('es-CR')}</span></span>
        <span className="flex gap-2"><Button size="sm" variant="outline" onClick={() => void open(d.path)}>Abrir</Button>{canManage && <Button size="sm" variant="ghost" onClick={() => void remove(d.id, d.path)}>Borrar</Button>}</span>
      </li>)}</ul>}
  </section>;
