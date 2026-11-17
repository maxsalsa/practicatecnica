import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { stripImageMetadata } from '@/lib/image-sanitize';
import { RECORD_LINK_SECONDS, validateRecordFile } from '@/lib/student-record-policy';

export function StudentRecordsPanel({ institutionId }: { institutionId: string }) {
  const cache = useQueryClient();
  const [picked, setPicked] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'photo' | 'medical' | 'document'>('document');
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const people = useQuery({ queryKey: ['record-people', institutionId], queryFn: async () => {
    const result = await supabase.rpc('student_record_people', { _inst: institutionId });
    if (result.error) throw new Error('No tiene autorización para consultar estos expedientes.');
    return result.data;
  }});
  const student = picked || people.data?.[0]?.user_id || '';
  const records = useQuery({ queryKey: ['student-records', institutionId, student], enabled: !!student, queryFn: async () => {
    const result = await supabase.from('student_record_documents').select('*').eq('institution_id', institutionId).eq('student_id', student).order('created_at', { ascending: false });
    if (result.error) throw new Error('No se pudo consultar el expediente.');
    return result.data;
  }});
  async function upload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !student || !title.trim()) return;
    if (!validateRecordFile(file.type, file.size)) { setError('Seleccione PDF o imagen de hasta 5 MB.'); return; }
    setBusy(true); setError('');
    try {
      const clean = await stripImageMetadata(file);
      const ext = clean.type === 'application/pdf' ? 'pdf' : clean.type === 'image/png' ? 'png' : 'jpg';
      const path = `${institutionId}/${student}/${crypto.randomUUID()}.${ext}`;
      const up = await supabase.storage.from('student-record-files').upload(path, clean, { contentType: clean.type });
      if (up.error) throw new Error('No se pudo cargar el archivo privado.');
      const saved = await supabase.from('student_record_documents').insert({ institution_id: institutionId, student_id: student, title: title.trim(), category, path });
      if (saved.error) { await supabase.storage.from('student-record-files').remove([path]); throw new Error('No se pudo guardar el documento.'); }
      setTitle(''); setFile(null); await cache.invalidateQueries({ queryKey: ['student-records'] });
    } catch (e) { setError(e instanceof Error ? e.message : 'No se pudo guardar.'); }
    finally { setBusy(false); }
  }
  async function open(path: string) {
    const result = await supabase.storage.from('student-record-files').createSignedUrl(path, RECORD_LINK_SECONDS);
    if (result.error) { setError('No se pudo abrir el documento privado.'); return; }
    window.open(result.data.signedUrl, '_blank', 'noopener,noreferrer');
  }
  async function remove(id: string, path: string) {
    if (!window.confirm('¿Eliminar este documento del expediente?')) return;
    const stored = await supabase.storage.from('student-record-files').remove([path]);
    if (stored.error) { setError('No se pudo eliminar el archivo.'); return; }
    const deleted = await supabase.from('student_record_documents').delete().eq('id', id);
    if (deleted.error) { setError('No se pudo actualizar el expediente.'); return; }
    await cache.invalidateQueries({ queryKey: ['student-records'] });
  }
  if (people.isPending) return <p role="status">Cargando estudiantes…</p>;
  if (people.isError) return <p role="alert">{people.error.message}</p>;
  return <section className="space-y-4">
    <h2 className="text-2xl font-black">Expediente privado</h2>
    {!people.data.length ? <p>No hay estudiantes vinculados a esta institución.</p> : <>
      <label className="block">Estudiante<select aria-label="Estudiante del expediente" value={student} onChange={e => setPicked(e.target.value)} className="ml-3 rounded-md border border-border bg-background p-2">{people.data.map(p => <option key={p.user_id} value={p.user_id}>{p.display_name}</option>)}</select></label>
      <form onSubmit={upload} className="grid gap-3">
        <label>Título<input aria-label="Título del documento" required maxLength={120} value={title} onChange={e => setTitle(e.target.value)} className="block w-full rounded-md border border-border bg-background p-2" /></label>
        <label>Tipo<select value={category} onChange={e => setCategory(e.target.value as typeof category)} className="ml-3 rounded-md border border-border bg-background p-2"><option value="document">Documento</option><option value="photo">Foto</option><option value="medical">Certificado médico</option></select></label>
        <input aria-label="Archivo del expediente" type="file" accept="application/pdf,image/jpeg,image/png,image/webp" onChange={e => setFile(e.target.files?.[0] ?? null)} />
        <Button disabled={busy || !file} type="submit" className="justify-self-start">{busy ? 'Guardando…' : 'Guardar documento privado'}</Button>
      </form>
      {records.isPending ? <p role="status">Cargando documentos…</p> : records.isError ? <p role="alert">{records.error.message}</p> : <ul className="divide-y divide-border">{records.data.map(r => <li key={r.id} className="flex flex-wrap items-center gap-3 py-3"><span className="min-w-0 flex-1 break-words"><strong>{r.title}</strong><small className="block">{r.category === 'medical' ? 'Certificado médico' : r.category === 'photo' ? 'Foto' : 'Documento'} · {new Date(r.created_at).toLocaleDateString('es-CR', { timeZone: 'America/Costa_Rica' })}</small></span><Button variant="outline" onClick={() => void open(r.path)}>Abrir</Button><Button variant="ghost" onClick={() => void remove(r.id, r.path)}>Eliminar</Button></li>)}{!records.data.length && <li>Sin documentos guardados.</li>}</ul>}
    </>}
    {error && <p role="alert" className="text-destructive">{error}</p>}
  </section>;
}