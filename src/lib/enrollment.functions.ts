import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { documentMime, enrollmentPathOwned, enrollmentSubmissionSchema } from './enrollment-document';

export const submitEnrollment = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => enrollmentSubmissionSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: institutions, error: institutionError } = await context.supabase.rpc('enrollment_institutions');
    if (institutionError || !institutions?.some(i => i.id === data.institution)) throw new Error('Institución no disponible.');
    const documents = [];
    for (const item of data.documents) {
      if (!enrollmentPathOwned(item.path, data.institution, context.userId)) throw new Error('Archivo no autorizado.');
      const { data: file, error } = await context.supabase.storage.from('enrollment-files').download(item.path);
      if (error || !file || file.size === 0 || file.size > 5 * 1024 * 1024) throw new Error('Archivo inválido o mayor de 5 MB.');
      const bytes = await file.arrayBuffer();
      const type = documentMime(new Uint8Array(bytes));
      if (!type) throw new Error('Use fotografías PNG/JPG/WEBP o PDF válidos.');
      const digest = await crypto.subtle.digest('SHA-256', bytes);
      const sha256 = Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
      documents.push({ ...item, sha256, size: file.size, type, publication: 'no_autorizada', consentVersion: 'imagenes-2026-1', submittedBy: context.userId, submittedAt: new Date().toISOString() });
    }
    const identification = documents.find(d => d.category === 'identificacion');
    if (!identification) throw new Error('Adjunte una identificación.');
    // Ownership, institution and stored bytes have been checked as the caller before privileged insertion.
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { data: row, error } = await supabaseAdmin.from('enrollment_requests').insert({
      institution_id: data.institution, guardian_id: context.userId, relation: data.relation,
      student_name: data.name, student_id_number: data.identification, level: data.level,
      student_email: data.studentEmail || null, birth_date: data.birth || null,
      id_photo_path: identification.path, fee_receipt_path: documents.find(d => d.category === 'recibo')?.path ?? null,
      consent_version: 'matricula-2026-2',
      family_contact: { name: data.guardianName, email: data.email, phone: data.phone, address: data.address, pickup: data.pickup, pickupConsent: data.pickupConsent, pickupConsentVersion: 'retiro-2026-1' },
      documents,
    }).select('id').single();
    if (error || !row) throw new Error('No se pudo guardar la matrícula. Conserve los datos e intente nuevamente.');
    return { id: row.id };
  });