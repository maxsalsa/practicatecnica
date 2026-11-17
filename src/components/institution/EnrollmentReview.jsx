import { openPrivateFile } from '@/lib/open-private-file';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { EnrollmentDocuments } from './EnrollmentDocuments';
import { z } from 'zod';
import { PickupAuthorizations } from './PickupAuthorizations';
import { EnrollmentPricing, useEnrollmentPricing } from './EnrollmentPricing';
import { useInstitutionPrices } from './TariffsPanel';
import { InstitutionDocumentHeader } from './InstitutionDocumentHeader';

const contactSchema = z.object({ name: z.string(), email: z.string(), phone: z.string(), address: z.string() });
function FamilyContact({ value }) {
  const result = contactSchema.safeParse(value);
  if (!result.success) return null;
  const c = result.data;
  return <p className="mt-2 text-sm">Contacto familiar: {c.name} · {c.email} · {c.phone}{c.address && ` · ${c.address}`}</p>;
}

/** Revisión de matrículas digitales hechas por familias. Solo dirección/administración/Max. */
export function EnrollmentReview({ inst, name, logoPath }) {
  const prices = useInstitutionPrices(inst);
  const pricing = useEnrollmentPricing(inst);
  const q = useQuery({
    queryKey: ['enroll-review', inst],
    queryFn () => {
      const { data, error } = await supabase.from('enrollment_requests').select('*').eq('institution_id', inst).order('created_at', { ascending });
      if (error) throw error; return data;
    },
  });
  async function open(path) {
    if (!(await openPrivateFile('enrollment-files', path))) toast.error('No se pudo abrir el archivo.');
  }
  async function review(id) {
    const note = approve ? '' : (window.prompt('Motivo del rechazo (la familia lo verá):') ?? '');
    const { data, error } = await supabase.rpc('review_enrollment', { _id, _approve, _note });
    if (error) { toast.error('No se pudo registrar la decisión.'); return; }
    toast.success(data === 'aprobada_sin_cuenta' ? 'Aprobada. El estudiante aparecerá en la lista cuando entre con su Gmail.' : approve ? 'Matrícula aprobada.' : 'Solicitud rechazada.');
    q.refetch(); void pricing.refetch();
  }
  if (q.isLoading) return <p className="text-sm text-muted-foreground">Cargando…</p>;
  if (!q.data?.length) return <p className="text-sm text-muted-foreground">No hay solicitudes de matrícula. Las familias las envían desde «Matrícula digital».</p>;
  return (
    <div className="space-y-3" data-enrollment-document>
    <InstitutionDocumentHeader name={name} logoPath={logoPath} title="Matrículas digitales" />
    <ul className="space-y-3">
      {q.data.map((r) => (
        <li key={r.id} className="rounded-2xl border border-border bg-card p-4 text-sm">
          <p className="font-bold">{r.student_name} · nivel {r.level} <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs">{r.status}</span></p>
          <p className="text-muted-foreground">Identificación {r.student_id_number} · {r.relation} · {r.student_email ?? 'sin correo del estudiante'}</p>
          <p className="text-xs text-muted-foreground">Consentimiento {r.consent_version} firmado {new Date(r.consented_at).toLocaleString('es-CR')}</p>
          {r.verification_hash && <p className="break-all font-mono text-xs">SHA-256: {r.verification_hash}</p>}
          {r.review_note && <p className="text-xs">Nota: {r.review_note}</p>}
          <FamilyContact value={r.family_contact} />
          <EnrollmentDocuments documents={r.documents} />
          <PickupAuthorizations requestId={r.id} enrollmentStatus={r.status} reviewer />
          <EnrollmentPricing inst={inst} institutionName={name} logoPath={logoPath} request={r} tariffs={prices.tariffs.data ?? []} discounts={prices.discounts.data ?? []} latest={pricing.data?.get(r.id)} />
          <div className="mt-2 flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => open(r.id_photo_path)}>Ver cédula</Button>
            {r.fee_receipt_path && <Button size="sm" variant="outline" onClick={() => { if (r.fee_receipt_path) void open(r.fee_receipt_path); }}>Ver comprobante</Button>}
            {r.status === 'pendiente' && <><Button size="sm" onClick={() => review(r.id, true)}>Aprobar</Button><Button size="sm" variant="destructive" onClick={() => review(r.id, false)}>Rechazar</Button></>}
          </div>
        </li>
      ))}
    </ul>
    </div>
  );
}
