import { groupThousands } from './institution-pricing';

export interface EnrollmentForSummary { student_name: string; student_id_number: string; level: string; relation: string; status: string; reviewed_at: string | null; verification_hash: string | null }
export interface PricingForSummary { tariff_label: string; base_amount: number; discount_name: string | null; discount_priority: number | null; discount_amount: number; final_amount: number; priced_at: string }

/** Keeps only the last four characters so a printed copy does not expose the full identification. */
export function maskIdentification(id: string) {
  const clean = id.replace(/\s+/g, '');
  return clean.length <= 4 ? '••••' : `${'•'.repeat(Math.min(clean.length - 4, 8))}${clean.slice(-4)}`;
}
const crc = (n: number) => `CRC ${groupThousands(n)}`;
const crDate = (iso: string) => new Date(iso).toLocaleString('es-CR', { timeZone: 'America/Costa_Rica', dateStyle: 'medium', timeStyle: 'short' });

/** Text content of the enrollment PDF. Only an approved request is labeled as a receipt; amounts come from the stored server pricing. */
export function buildEnrollmentSummary(r: EnrollmentForSummary, p: PricingForSummary) {
  const approved = r.status === 'aprobada';
  return {
    approved,
    title: approved ? 'Comprobante de matrícula' : 'Resumen de matrícula · pendiente de aprobación',
    people: [`Estudiante: ${r.student_name}`, `Identificación: ${maskIdentification(r.student_id_number)}`, `Nivel: ${r.level}`, `Solicitud presentada por: ${r.relation}`, `Estado: ${approved ? 'Aprobada' : r.status === 'rechazada' ? 'Rechazada' : 'Pendiente de revisión'}`],
    amounts: [
      [p.tariff_label, crc(p.base_amount)],
      ...(p.discount_name ? [[`Descuento: ${p.discount_name} (prioridad ${p.discount_priority ?? '-'})`, `- ${crc(p.discount_amount)}`]] : []),
      ['Total a pagar', crc(p.final_amount)],
    ] as [string, string][],
    notes: [
      `Montos registrados por la institución (${crDate(p.priced_at)}). El pago se realiza por los medios que la institución autorice; este documento no confirma un pago.`,
      approved && r.reviewed_at ? `Matrícula aprobada: ${crDate(r.reviewed_at)}` : 'Este resumen no es comprobante de matrícula hasta que la institución apruebe la solicitud.',
    ],
    code: approved ? r.verification_hash : null,
  };
}
