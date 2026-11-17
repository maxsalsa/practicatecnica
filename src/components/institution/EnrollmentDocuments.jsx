import { openPrivateFile } from '@/lib/open-private-file';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const documentSchema = z.array(z.object({ path: z.string(), description: z.string(), sha256: z.string(), size: z.number(), type: z.string(), purpose: z.string().optional(), place: z.string().optional(), imageConsent: z.boolean().optional() }));
export function EnrollmentDocuments({ documents }: { documents }) {
  const parsed = documentSchema.safeParse(documents);
  if (!parsed.success || parsed.data.length === 0) return null;
  async function open(path) {
    if (!(await openPrivateFile('enrollment-files', path))) toast.error('No se pudo abrir el documento privado.');
  }
  return <details className="mt-3 border-t border-border pt-2"><summary className="font-semibold">Documentos recibidos ({parsed.data.length})</summary>
    <ul className="space-y-3 mt-3">{parsed.data.map(d => <li key={d.path}>
      <Button variant="outline" size="sm" onClick={() => open(d.path)}>{d.description}</Button>
      <p className="break-all font-mono text-xs mt-1">SHA-256: {d.sha256}</p>
      <p className="text-xs text-muted-foreground">{Math.ceil(d.size / 1024)} KB · {d.type}</p>
      {d.purpose && <p className="text-xs">{d.purpose === 'centro_autorizado' ? `Colegio: ${d.place ?? ''} · pendiente de revisión de uso` : d.purpose === 'identidad_privada' ? 'Identificación privada · sin permiso de publicación' : 'Matrícula'}{d.imageConsent && ' · consentimiento registrado'}</p>}
    </li>)}</ul>
    <p className="text-xs text-muted-foreground mt-2">Huella de integridad del archivo guardado; no equivale a firma digital certificada.</p>
  </details>;
}