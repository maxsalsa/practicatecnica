import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { submitEnrollment } from '@/lib/enrollment.functions';
import { stripImageMetadata } from '@/lib/image-sanitize';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { SiteHeader } from '@/components/SiteHeader';
import { useAccount } from '@/components/AccountProvider';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { EnrollmentDocuments } from '@/components/institution/EnrollmentDocuments';
import { PickupAuthorizations } from '@/components/institution/PickupAuthorizations';
import { enrollmentSubmissionSchema } from '@/lib/enrollment-document';


const TYPES, string> = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'application/pdf': 'pdf' };

export const Route = createFileRoute('/matricula')({
  staticData: { sitemap },
  head: () => ({
    meta { title: 'Matrícula digital para familias · pracTICAtecnica.com' },
      { name: 'description', content: 'Matricule a su hijo o hija desde el teléfono: datos, foto de cédula, comprobante de cuota y consentimiento. La institución revisa y aprueba.' },
      { property: 'og:title', content: 'Matrícula digital para familias' },
      { property: 'og:description', content: 'Matrícula privada y sencilla, aprobada por la institución.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component,
});

function EnrollmentPage() {
  const { user, ready } = useAccount();
  const [busy, setBusy] = useState(false);
  const [purpose, setPurpose] = useState('matricula');
  const sendEnrollment = useServerFn(submitEnrollment);
  const insts = useQuery({ enabled: !!user, queryKey: ['enroll-insts'], queryFn () => { const { data, error } = await supabase.rpc('enrollment_institutions'); if (error) throw error; return data; } });
  const mine = useQuery({ enabled: !!user, queryKey: ['enroll-mine', user?.id], queryFn () => { const { data, error } = await supabase.from('enrollment_requests').select('id,student_name,level,status,review_note,verification_hash,created_at,documents,reviewed_at').eq('guardian_id', user?.id ?? '').order('created_at', { ascending }); if (error) throw error; return data; } });

  async function upload(inst) {
    if (!user) throw new Error('Inicie sesión.');
    const clean = await stripImageMetadata(f);
    const ext = TYPES[clean.type];
    if (!ext) throw new Error('Use foto (PNG, JPG, WEBP) o PDF.');
    if (f.size > 5 * 1024 * 1024) throw new Error('Máximo 5 MB por archivo.');
    const path = `${inst}/${user.id}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from('enrollment-files').upload(path, clean, { contentType: clean.type });
    if (error) throw new Error('No se pudo subir el archivo.');
    return path;
  }

  async function submit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const inst = String(fd.get('inst') ?? '');
    const photo = fd.get('photo');
    const fee = fd.get('fee');
    if (!inst || !photo?.size) { toast.error('Elija la institución y suba la foto de la cédula.'); return; }
    if (fd.get('consent') !== 'on') { toast.error('Debe firmar el consentimiento.'); return; }
    setBusy(true);
    try {
      const documents: { path: string; category: 'identificacion' | 'foto' | 'recibo'; description: string; purpose'matricula' | 'identidad_privada' | 'centro_autorizado'; imageConsent; place}[] = [];
      documents.push({ path upload(inst, photo), category: 'identificacion', description: 'Identificación principal' });
      if (fee?.size) documents.push({ path upload(inst, fee), category: 'recibo', description: 'Comprobante de cuota' });
      const extra = fd.getAll('extra').filter((v): v is File => v instanceof File && v.size > 0);
      if (extra.length + documents.length > 10) throw new Error('Máximo 10 documentos por solicitud.');
      if (extra.length && purpose !== 'matricula' && fd.get('imageConsent') !== 'on') throw new Error('Debe aceptar el consentimiento específico de imagen.');
      if (extra.length && purpose === 'centro_autorizado' && !String(fd.get('place') || '').trim()) throw new Error('Indique el nombre del edificio o aula.');
      for (const file of extra) documents.push({ path upload(inst, file), category: String(fd.get('category')) as 'identificacion' | 'foto' | 'recibo', description: String(fd.get('description') || 'Documento familiar'), purpose, imageConsent: fd.get('imageConsent') === 'on', place: String(fd.get('place') || '') });
      const pickup = String(fd.get('pickupName') || '').trim() ? [{ name: String(fd.get('pickupName')), identification: String(fd.get('pickupId')).replace(/[\s-]/g, ''), relation: String(fd.get('pickupRelation')) }] : [];
      const submission = enrollmentSubmissionSchema.parse({
        institution, relation: String(fd.get('relation')) as 'madre' | 'padre' | 'encargado',
        guardianName: String(fd.get('guardianName')), email: String(fd.get('guardianEmail')), phone: String(fd.get('phone')),
        address: String(fd.get('address') || ''), name: String(fd.get('name')), identification: String(fd.get('idn')).replace(/[\s-]/g, ''),
        studentEmail: String(fd.get('email') || '').trim().toLowerCase(), birth: String(fd.get('birth') || ''), level: String(fd.get('level')),
        consent, documents, pickup, pickupConsent: fd.get('pickupConsent') === 'on',
      });
      await sendEnrollment({ data });
      toast.success('Solicitud enviada. La institución la revisará.');
      (e.target).reset();
      setPurpose('matricula');
      mine.refetch();
    } catch (err) { toast.error(err instanceof Error && err.name === 'ZodError' ? 'Revise los datos, identificaciones y consentimientos antes de enviar.' : (err).message); } finally { setBusy(false); }
  }

  const field = 'w-full rounded-xl border border-input bg-background px-3 py-2';
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-3xl font-black">Matrícula digital</h1>
        <p className="mt-2 text-muted-foreground">Para madres, padres y encargados. Llene los datos, suba la foto de la cédula y, si aplica, el comprobante de la cuota voluntaria. La institución revisa y aprueba.</p>
        {!ready ? null : !user ? (
          <p className="mt-6"><Link to="/auth" className="font-bold text-primary underline">Inicie sesión con su Gmail</Link> para matricular.</p>
        ) : (
          <>
            <form onSubmit={submit} className="mt-6 space-y-3 rounded-2xl border border-border bg-card p-5">
              <label className="block text-sm font-semibold">Institución
                <select name="inst" required className={field} defaultValue="">
                  <option value="" disabled>Elija…</option>
                  {insts.data?.map((i) => <option key={i.id} value={i.id}>{i.name}{i.is_test ? ' (prueba)' : ''}</option>)}
                </select></label>
              <label className="block text-sm font-semibold">Parentesco
                <select name="relation" className={field}><option value="madre">Madre</option><option value="padre">Padre</option><option value="encargado">Encargado(a)</option></select></label>
              <fieldset className="space-y-3"><legend className="font-bold">Datos de la familia</legend>
              <label className="block text-sm font-semibold">Nombre del padre, madre o encargado<input name="guardianName" required minLength={3} maxLength={120} className={field} /></label>
              <label className="block text-sm font-semibold">Correo de contacto<input name="guardianEmail" type="email" required defaultValue={user.email ?? ''} className={field} /></label>
              <label className="block text-sm font-semibold">Teléfono de contacto<input name="phone" type="tel" required minLength={8} maxLength={25} className={field} /></label>
              <label className="block text-sm font-semibold">Domicilio familiar (opcional)<textarea name="address" maxLength={300} className={field} /></label>
              </fieldset>
              <label className="block text-sm font-semibold">Nombre completo del estudiante<input name="name" required minLength={3} maxLength={120} className={field} /></label>
              <label className="block text-sm font-semibold">Cédula o identificación del estudiante<input name="idn" required inputMode="numeric" className={field} /></label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-sm font-semibold">Nivel<input name="level" required maxLength={40} placeholder="Ej.: 7.°" className={field} /></label>
                <label className="block text-sm font-semibold">Fecha de nacimiento<input name="birth" type="date" className={field} /></label>
              </div>
              <label className="block text-sm font-semibold">Gmail del estudiante (opcional)<input name="email" type="email" pattern=".+@gmail\.com" className={field} /></label>
              <label className="block text-sm font-semibold">Foto de la cédula (obligatoria)<input name="photo" type="file" accept="image/png,image/jpeg,image/webp,application/pdf" required className={field} /></label>
              <label className="block text-sm font-semibold">Comprobante de cuota voluntaria (opcional)<input name="fee" type="file" accept="image/png,image/jpeg,image/webp,application/pdf" className={field} /></label>
              <details className="border-t border-border pt-3"><summary className="font-semibold">Más documentos de la familia</summary>
                <label className="block text-sm font-semibold mt-3">Tipo de documento<select name="category" className={field}><option value="identificacion">Identificación de familiar o estudiante</option><option value="foto">Fotografía</option><option value="recibo">Recibo</option></select></label>
                <label className="block text-sm font-semibold">Finalidad<select name="purpose" value={purpose} onChange={e => setPurpose(e.target.value)} className={field}><option value="matricula">Documento de matrícula</option><option value="identidad_privada">Foto privada de estudiante o familiar</option><option value="centro_autorizado">Fotografía autorizada del colegio</option></select></label>
                {purpose === 'centro_autorizado' && <label className="block text-sm font-semibold">Nombre del edificio o aula<input name="place" maxLength={120} className={field} /></label>}
                {purpose !== 'matricula' && <label className="flex gap-2 py-3 text-sm"><input name="imageConsent" type="checkbox" className="mt-1" /><span>{purpose === 'centro_autorizado' ? 'Declaro contar con autorización para aportar esta imagen del colegio y me comprometo a respetar los derechos de las personas que aparezcan. La institución debe revisar su uso; esto no autoriza publicación automática.' : 'Autorizo el uso privado de estas fotografías para identificación y revisión de seguridad del estudiante y su familia. No autorizo difusión pública.'}</span></label>}
                <label className="block text-sm font-semibold">Descripción<input name="description" maxLength={120} className={field} /></label>
                <label className="block text-sm font-semibold">Adjuntos adicionales<input name="extra" type="file" multiple accept="image/png,image/jpeg,image/webp,application/pdf" className={field} /></label>
              </details>
              <details className="border-t border-border pt-3"><summary className="font-semibold">Proponer una persona para retirar al estudiante</summary>
                <label className="block text-sm font-semibold mt-3">Nombre de la persona propuesta<input name="pickupName" minLength={3} maxLength={120} className={field} /></label>
                <label className="block text-sm font-semibold">Identificación de la persona propuesta<input name="pickupId" maxLength={20} className={field} /></label>
                <label className="block text-sm font-semibold">Relación con el estudiante<input name="pickupRelation" maxLength={80} className={field} /></label>
                <label className="flex gap-2 py-3 text-sm"><input name="pickupConsent" type="checkbox" className="mt-1" /><span>Declaro estar facultado para proponer a esta persona y autorizo el tratamiento privado de sus datos para revisión institucional. La propuesta queda pendiente y no concede permiso de retiro.</span></label>
              </details>
              <label className="flex gap-2 rounded-xl bg-muted p-3 text-sm">
                <input name="consent" type="checkbox" required className="mt-1" />
                <span>Declaro ser madre, padre o encargado legal y autorizo a la institución a tratar estos datos solo para la matrícula y el seguimiento académico, conforme a la Ley 8968. Las fotos son privadas y solo las ve quien revisa.</span>
              </label>
              <Button type="submit" disabled={busy}>{busy ? 'Enviando…' : 'Consentir y enviar matrícula'}</Button>
            </form>
            <h2 className="mt-8 text-xl font-extrabold">Mis solicitudes</h2>
            {mine.isError && <p role="alert">No se pudieron consultar sus solicitudes. Intente nuevamente.</p>}
            <ul className="mt-3 space-y-2">
              {mine.data?.map((r) => (
                <li key={r.id} className="rounded-xl border border-border bg-card p-3 text-sm">
                  <b>{r.student_name}</b> · {r.level} · <span className="font-semibold">{r.status}</span>
                  <p className="text-xs text-muted-foreground">Enviada: {new Date(r.created_at).toLocaleString('es-CR', { timeZone: 'America/Costa_Rica' })}</p>
                  {r.reviewed_at && <p className="text-xs">Revisión: {new Date(r.reviewed_at).toLocaleString('es-CR', { timeZone: 'America/Costa_Rica' })}</p>}
                  <EnrollmentDocuments documents={r.documents} />
                  <PickupAuthorizations requestId={r.id} enrollmentStatus={r.status} />
                  {r.review_note && <p className="text-muted-foreground">{r.review_note}</p>}
                  {r.verification_hash && <p className="break-all font-mono text-xs">SHA-256: {r.verification_hash}</p>}
                </li>
              ))}
              {mine.data?.length === 0 && <li className="text-sm text-muted-foreground">Aún no ha enviado solicitudes.</li>}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}
