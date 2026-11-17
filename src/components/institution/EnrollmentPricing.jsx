import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { applyPriorityDiscount, formatColones, matchTariff } from '@/lib/institution-pricing';
import { tokenRgb } from './pdf-color';
import { buildEnrollmentSummary } from '@/lib/enrollment-summary';


export function useEnrollmentPricing(inst) {
  return useQuery({ queryKey: ['enrollment-pricing', inst], queryFn () => {
    const { data, error } = await supabase.from('enrollment_pricing').select('id,request_id,tariff_label,base_amount,discount_name,discount_priority,discount_amount,final_amount,priced_at').eq('institution_id', inst).order('priced_at', { ascending });
    if (error) throw new Error('No se pudieron consultar los montos de matrícula.');
    const latest = new Map<string, PricingRow>();
    for (const row of data) if (!latest.has(row.request_id)) latest.set(row.request_id, row);
    return latest;
  } });
}

/** Browser PDF of the stored pricing; approval and amounts come from the database, never from this file. */
export async function downloadEnrollmentPdf(institutionName) {
  const { jsPDF } = await import('jspdf');
  const s = buildEnrollmentSummary(r, p);
  const doc = new jsPDF();
  const rgb = tokenRgb('--primary'); if (rgb) doc.setFillColor(rgb[0], rgb[1], rgb[2]);
  doc.rect(0, 0, 210, 40, 'F');
  let textX = 15;
  if (logoPath) {
    // Download the crest cross-origin signed link.
    const { data } = await supabase.storage.from('institution-logos').download(logoPath);
    if (data) try {
      const url = URL.createObjectURL(data); const img = new Image(); img.src = url; await img.decode();
      const c = document.createElement('canvas'); c.width = 150; c.height = 150; c.getContext('2d')?.drawImage(img, 0, 0, 150, 150); URL.revokeObjectURL(url);
      doc.addImage(c.toDataURL('image/png'), 'PNG', 12, 8, 24, 24); textX = 42;
    } catch { /* unreadable image */ }
  }
  doc.setTextColor(255); doc.setFontSize(16); doc.text(doc.splitTextToSize(institutionName, 195 - textX), textX, 17); doc.setFontSize(11); doc.text(s.title, textX, 31);
  doc.setTextColor(0); doc.setFontSize(10);
  doc.text(`Generado: ${new Date().toLocaleString('es-CR', { timeZone: 'America/Costa_Rica', dateStyle: 'medium', timeStyle: 'short' })}`, 15, 50);
  let y = 62; doc.setFontSize(11);
  for (const line of s.people) { doc.text(line, 15, y); y += 7; }
  y += 4;
  s.amounts.forEach(([label, amount], i) => {
    const last = i === s.amounts.length - 1;
    doc.rect(15, y, 130, 10); doc.rect(145, y, 50, 10);
    if (last) doc.setFont('helvetica', 'bold');
    doc.text(doc.splitTextToSize(label, 125)[0] ?? label, 18, y + 6.5); doc.text(amount, 192, y + 6.5, { align: 'right' });
    if (last) doc.setFont('helvetica', 'normal');
    y += 10;
  });
  y += 10; doc.setFontSize(10);
  for (const note of s.notes) { const lines = doc.splitTextToSize(note, 180); doc.text(lines, 15, y); y += lines.length * 5 + 3; }
  if (s.code) { y += 3; doc.setFontSize(8); doc.text('Código SHA-256 de la aprobación registrada:', 15, y); doc.setFont('courier', 'normal'); doc.text(s.code, 15, y + 5); doc.setFont('helvetica', 'normal');
    const QR = await import('qrcode'); doc.addImage(await QR.toDataURL(`https://practicatecnica.com/verificar-matricula?codigo=${s.code}`, { margin: 1, width: 240 }), 'PNG', 165, 228, 30, 30); doc.setFontSize(7); doc.text('Escanee para verificar', 180, 261, { align: 'center' }); y += 12; }
  y = Math.max(y + 18, 230); doc.setFontSize(10);
  doc.line(15, y, 110, y); doc.text('Firma manuscrita y sello de Dirección', 15, y + 6);
  doc.setFontSize(8); doc.text('pracTICAtecnica.com · GICM · No equivale a firma digital certificada.', 15, 285);
  doc.save(`matricula-${r.id.slice(0, 8)}.pdf`);
}

export function EnrollmentPricing({ inst, institutionName, logoPath, request, tariffs, discounts, latest }: { inst: string; institutionName: string; logoPath; request & { id }; tariffs: Tariff[]; discounts: Discount[]; latest }) {
  const cache = useQueryClient();
  const options = tariffs.filter(t => t.active && t.service === 'matricula');
  const suggested = matchTariff(options, { service: 'matricula', level: request.level });
  const [tariffId, setTariffId] = useState(suggested?.id ?? '');
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const eligible = discounts.filter(d => d.active && (d.applies_to === 'todos' || d.applies_to === 'matricula'));
  const tariff = options.find(t => t.id === tariffId);
  const preview = tariff ? applyPriorityDiscount(tariff.amount, eligible.filter(d => picked.has(d.id)), 'matricula') : null;
  if (request.status === 'rechazada') return null;

  async function save() {
    if (!tariff) return; setBusy(true);
    const { error } = await supabase.rpc('price_enrollment', { _id: request.id, _tariff: tariff.id, _discounts: [...picked] });
    setBusy(false);
    if (error) { toast.error(/own request/.test(error.message) ? 'No puede registrar el monto de su propia solicitud.' : 'No se pudo registrar el monto.'); return; }
    toast.success('Monto de matrícula registrado.');
    await cache.invalidateQueries({ queryKey: ['enrollment-pricing', inst] });
  }
  return <div className="mt-3 space-y-2 border-t border-border pt-3">
    <p className="font-semibold">Monto de matrícula</p>
    {!options.length ? <p className="text-muted-foreground">Registre primero una tarifa de matrícula en la pestaña «Tarifas».</p> : <>
      <label className="block">Tarifa<select className="mt-1 block w-full rounded-lg border border-border bg-background p-2" value={tariffId} onChange={e => setTariffId(e.target.value)}><option value="">Elija una tarifa</option>{options.map(t => <option key={t.id} value={t.id}>{t.label}{t.level ? ` · ${t.level}` : ''} · {formatColones(t.amount)}</option>)}</select></label>
      {suggested && tariffId === suggested.id && <p className="text-xs text-muted-foreground">Propuesta por coincidir con el nivel {request.level}.</p>}
      {eligible.length > 0 && <fieldset><legend className="text-xs text-muted-foreground">Descuentos que le corresponden (se aplica solo el de mayor prioridad)</legend><div className="mt-1 flex flex-wrap gap-3">{eligible.map(d => <label key={d.id} className="flex items-center gap-2"><input type="checkbox" checked={picked.has(d.id)} onChange={e => setPicked(old => { const n = new Set(old); if (e.target.checked) n.add(d.id); else n.delete(d.id); return n; })} />{d.priority}. {d.name} ({d.kind === 'porcentaje' ? `${d.value} %` : formatColones(d.value)})</label>)}</div></fieldset>}
      {preview && tariff && <p>{formatColones(tariff.amount)}{preview.discount ? ` − ${formatColones(preview.discountAmount)} (${preview.discount.name})` : ''} = <strong>{formatColones(preview.final)}</strong></p>}
      <Button size="sm" disabled={!tariff || busy} onClick={() => void save()}>{busy ? 'Registrando…' : 'Registrar monto'}</Button>
    </>}
    {latest && <p className="text-xs">Registrado {new Date(latest.priced_at).toLocaleString('es-CR', { timeZone: 'America/Costa_Rica' })}: {latest.tariff_label} {formatColones(latest.base_amount)}{latest.discount_name ? ` − ${formatColones(latest.discount_amount)} (${latest.discount_name})` : ''} = <strong>{formatColones(latest.final_amount)}</strong></p>}
    {latest && <Button size="sm" variant="outline" onClick={() => void downloadEnrollmentPdf(institutionName, request, latest, logoPath).catch(() => toast.error('No se pudo generar el PDF.'))}>PDF de matrícula</Button>}
  </div>;
}
