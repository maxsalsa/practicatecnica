import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { SiteHeader } from '@/components/SiteHeader';
export const Route = createFileRoute('/verificar-documento')({
  staticData: { sitemap: false },
  validateSearch: (s: Record<string, unknown>): { codigo?: string } => typeof s['codigo'] === 'string' ? { codigo: s['codigo'] } : {},
  head: () => ({ meta: [{ title: 'Verificación de documento institucional · pracTICAtecnica.com' }, { name: 'description', content: 'Consulta mínima de emisión e integridad de documentos institucionales.' }, { property: 'og:title', content: 'Verificación institucional · pracTICAtecnica.com' }, { property: 'og:description', content: 'Verifique el registro sin exponer notas ni datos de menores.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex' }] }),
  component: Verification,
});
function Verification() {
  const { codigo } = Route.useSearch();
  const q = useQuery({ queryKey: ['document-verification', codigo], enabled: /^[a-f0-9]{64}$/.test(codigo ?? ''), queryFn: async () => {
    const r = await supabase.rpc('verify_institution_document', { _hash: codigo ?? '' });
    if (r.error) throw new Error('No se pudo verificar el documento.'); return r.data[0] ?? null;
  }});
  return <main className="min-h-screen bg-hero"><SiteHeader /><section className="mx-auto max-w-xl space-y-4 px-5"><h1 className="text-3xl font-black">Verificar documento</h1>{q.isFetching ? <p>Verificando…</p> : q.data?.valid ? <><p className="font-bold text-accent">Emisión registrada e integridad verificada</p><p>{q.data.institution_name}</p><p>{q.data.kind === 'grades' ? 'Constancia de notas' : 'Orden institucional'} · {new Date(q.data.issued_at).toLocaleString('es-CR', { timeZone: 'America/Costa_Rica' })}</p></> : <p>Documento no encontrado o código inválido.</p>}<p className="text-sm text-muted-foreground">Esta consulta no acredita recepción en SEA, aval del MEP ni firma digital certificada.</p></section></main>;
}