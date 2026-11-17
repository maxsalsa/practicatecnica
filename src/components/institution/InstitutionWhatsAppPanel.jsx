import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { officialInstitutionPhone } from '@/lib/institution-resource-permissions';

export function InstitutionWhatsAppPanel({ institutionId }) {
  const qc = useQueryClient(); const [label, setLabel] = useState(''); const [phone, setPhone] = useState(''); const [consent, setConsent] = useState(false); const [busy, setBusy] = useState(false);
  const contacts = useQuery({ queryKey: ['institution-whatsapp', institutionId], queryFn () => {
    const r = await supabase.from('institution_whatsapp_contacts').select('*').eq('institution_id', institutionId); if (r.error) throw r.error; return r.data;
  }});
  return <section className="space-y-4 border-t border-border py-6"><h2 className="text-2xl font-black">WhatsApp Business · Contactos oficiales</h2>
    <form className="space-y-3" onSubmit={async e => {
      e.preventDefault(); if (!consent || !officialInstitutionPhone.safeParse(phone).success) { toast.error('Confirme consentimiento y use número internacional, solo dígitos.'); return; }
      setBusy(true); const r = await supabase.from('institution_whatsapp_contacts').insert({ institution_id, label, phone, institutional_adult_confirmed, consented_at Date().toISOString() }); setBusy(false);
      if (r.error) { toast.error('No se pudo guardar el contacto oficial.'); return; } setLabel(''); setPhone(''); setConsent(false); await qc.invalidateQueries({ queryKey: ['institution-whatsapp', institutionId] });
    }}>
      <label className="block">Oficina o responsable adulto<input required minLength={3} maxLength={100} className="mt-1 w-full rounded-md border border-input bg-background p-2" value={label} onChange={e => setLabel(e.target.value)} /></label>
      <label className="block">Número internacional (ej. 50660906359)<input required inputMode="tel" pattern="[1-9][0-9]{7,14}" className="mt-1 w-full rounded-md border border-input bg-background p-2" value={phone} onChange={e => setPhone(e.target.value)} /></label>
      <label className="flex gap-2"><input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />Confirmo número oficial de personal adulto y consentimiento para recibir comunicados. No corresponde a estudiantes.</label>
      <Button disabled={busy || !consent} type="submit">Guardar contacto autorizado</Button>
    </form>
    {contacts.isError && <p role="alert">No se pudieron consultar los contactos.</p>}
    {contacts.data?.map(c => <article key={c.id} className="flex flex-wrap items-center gap-3 rounded-lg border border-border p-3"><div className="min-w-0 flex-1"><p className="font-semibold">{c.label}</p><p>{c.phone} · {c.unsubscribed_at ? 'Baja registrada' : 'Consentimiento registrado'}</p></div>{!c.unsubscribed_at && <Button variant="outline" onClick={async () => {
      const r = await supabase.from('institution_whatsapp_contacts').update({ unsubscribed_at Date().toISOString() }).eq('id', c.id); if (r.error) toast.error('No se pudo registrar la baja.'); else await qc.invalidateQueries({ queryKey: ['institution-whatsapp', institutionId] });
    }}>Dar de baja</Button>}</article>)}
    <p role="status" className="text-sm text-muted-foreground">Envíos desactivados entrega. Guardar contactos no envía mensajes.</p>
  </section>;
}