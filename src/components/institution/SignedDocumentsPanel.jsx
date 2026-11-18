import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { InstitutionDocumentHeader, InstitutionDocumentFooter } from './InstitutionDocumentHeader';
import { tokenRgb } from './pdf-color';
export function SignedDocumentsPanel({ institutionId, name, logoPath }) {
    const cache = useQueryClient();
    const [kind, setKind] = useState('grades');
    const [title, setTitle] = useState('Constancia de notas');
    const [holder, setHolder] = useState('');
    const [body, setBody] = useState('');
    const [rows, setRows] = useState([{ subject: '', score: 0 }]);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const list = useQuery({ queryKey: ['signed-documents', institutionId], queryFn() { } });
    {
        const r = await supabase.from('institution_signed_documents').select('*').eq('institution_id', institutionId).order('issued_at', { ascending });
        if (r.error)
            throw new Error('No se pudieron consultar los comprobantes.');
        return r.data;
    }
}
;
async function issue(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
        const r = await supabase.rpc('issue_institution_document', { _inst, _kind, _title, _body, _holder, _grades } === 'grades' ? rows : );
    }
    finally { }
    ;
    if (r.error)
        throw new Error(r.error.message);
    await cache.invalidateQueries({ queryKey: ['signed-documents', institutionId] });
}
try { }
catch (e) {
    setError(e instanceof Error ? e.message : 'No se pudo emitir.');
}
finally {
    setBusy(false);
}
async function pdf(d) {
    setError('');
    try {
        const [{ jsPDF }, qr] = await Promise.all([import('jspdf'), import('qrcode')]);
        const doc = new jsPDF();
        const rgb = tokenRgb('--primary');
        if (rgb)
            doc.setFillColor(rgb[0], rgb[1], rgb[2]);
        doc.rect(0, 0, 210, 40, 'F');
        const logo = document.querySelector('[data-signed-document] header img');
        if (logo?.complete && logo.naturalWidth) {
            const canvas = document.createElement('canvas');
            canvas.width = 150;
            canvas.height = 150;
            canvas.getContext('2d')?.drawImage(logo, 0, 0, 150, 150);
            doc.addImage(canvas.toDataURL('image/png'), 'PNG', 12, 8, 24, 24);
        }
        doc.setTextColor(255);
        doc.setFontSize(16);
        doc.text(doc.splitTextToSize(name, 155), 42, 17);
        doc.setFontSize(11);
        doc.text(d.title, 42, 31);
        doc.setTextColor(0);
        doc.text(new Date(d.issued_at).toLocaleString('es-CR', { timeZone: 'America/Costa_Rica' }), 15, 50);
        doc.text(`Titular: ${d.holder}`, 15, 60);
        let y = 72;
        const grades = d.grades[];
        for (const g of grades) {
            doc.rect(15, y, 145, 9);
            doc.rect(160, y, 35, 9);
            doc.text(g.subject, 18, y + 6);
            doc.text(String(g.score), 165, y + 6);
            y += 9;
        }
        const lines = doc.splitTextToSize(d.body, 175);
        doc.text(lines, 15, y + 12);
        y += lines.length * 5 + 25;
        if (y > 220) {
            doc.addPage();
            y = 30;
        }
        doc.text(`${d.signer_name} · ${d.signer_role === 'direccion' ? 'Dirección' : 'Subdirección'}`, 15, y);
        doc.text('Aprobación registrada · espacio para firma manuscrita', 15, y + 8);
        doc.line(15, y + 22, 120, y + 22);
        const url = `${window.location.origin}/verificar-documento?codigo=${d.verification_hash}`;
        doc.addImage(await qr.toDataURL(url), 'PNG', 155, y, 35, 35);
        doc.setFontSize(8);
        doc.text('practicatecnica.com · GICM · No equivale a firma digital certificada.', 15, 282);
        doc.save(`documento-${d.id}.pdf`);
    }
    catch {
        setError('No se pudo generar el PDF.');
    }
}
return <section className="space-y-5" data-signed-document>
    <InstitutionDocumentHeader name={name} logoPath={logoPath} title="Notas y órdenes institucionales"/>
    <form onSubmit={issue} className="grid gap-3">
      <label>Documento<select value={kind} onChange={e => { const k = e.target.value; setKind(k); setTitle(k === 'grades' ? 'Constancia de notas' : 'Orden institucional'); }} className="ml-3 border border-border bg-background p-2"><option value="grades">Constancia de notas</option><option value="order">Orden institucional</option></select></label>
      <label>Título<input required maxLength={120} value={title} onChange={e => setTitle(e.target.value)} className="block w-full border border-border bg-background p-2"/></label>
      <label>Titular o destinatario<input required maxLength={120} value={holder} onChange={e => setHolder(e.target.value)} className="block w-full border border-border bg-background p-2"/></label>
      {kind === 'grades' && <><div className="grid gap-2">{rows.map((r, i) => <div key={i} className="grid grid-cols-[1fr_100px] gap-2"><input aria-label={`Materia ${i + 1}`} required maxLength={120} placeholder="Materia" value={r.subject} onChange={e => setRows(old => old.map((v, j) => j === i ? { ...v, subject: e.target.value } : v))} className="border border-border bg-background p-2"/><input aria-label={`Nota ${i + 1}`} type="number" min={0} max={100} required value={r.score} onChange={e => setRows(old => old.map((v, j) => j === i ? { ...v, score: Number(e.target.value) } : v))} className="border border-border bg-background p-2"/></div>)}</div><Button variant="outline" type="button" disabled={rows.length >= 30} onClick={() => setRows(old => [...old, { subject: '', score: 0 }])}>Añadir materia</Button></>}
      <label>Texto<textarea required={kind === 'order'} maxLength={10000} value={body} onChange={e => setBody(e.target.value)} className="block w-full border border-border bg-background p-2"/></label>
      <Button disabled={busy} type="submit">{busy ? 'Registrando…' : 'Aprobar y emitir comprobante'}</Button>
    </form>
    {error && <p role="alert" className="text-destructive">{error}</p>}
    {list.isError ? <p>{list.error.message}</p> : <ul className="divide-y divide-border">{list.data?.map(d => <li key={d.id} className="flex flex-wrap items-center gap-3 py-3"><span className="flex-1"><strong>{d.title}</strong><small className="block">{d.signer_name} · {new Date(d.issued_at).toLocaleDateString('es-CR')}</small></span><Button onClick={() => void pdf(d)}>PDF y QR</Button></li>)}</ul>}
    <InstitutionDocumentFooter />
  </section>;
