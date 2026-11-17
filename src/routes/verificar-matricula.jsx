import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { SiteHeader } from '@/components/SiteHeader';
export const Route = createFileRoute('/verificar-matricula')({
  staticData: { sitemap: false },
  validateSearch: (s: Record<string, unknown>): { codigo?: string } => typeof s['codigo'] === 'string' ? { codigo: s['codigo'] } : {},
  head: () => ({ meta: [{ title: 'Verificar matrícula · pracTICAtecnica.com' }, { name: 'description', content: 'Compruebe que un comprobante de matrícula fue aprobado por la institución.' }, { property: 'og:title', content: 'Verificar matrícula · pracTICAtecnica.com' }, { property: 'og:description', content: 'Verificación del comprobante sin exponer datos del estudiante.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex' }] }),
  component: VerifyEnrollment,
});
function VerifyEnrollment() {
  const { codigo } = Route.useSearch();
  const q = useQuery({ queryKey: ['enrollment-verification', codigo], enabled: /^[a-f0-9]{64}$/.test(codigo ?? ''), queryFn: async () => {
    const r = await supabase.rpc('verify_enrollment', { _hash: codigo ?? '' });
    if (r.error) throw new Error('No se pudo verificar.'); return r.data[0] ?? null;
  } });
  const d = q.data;
  return <main className="min-h-screen bg-hero"><SiteHeader /><section className="mx-auto max-w-xl space-y-4 px-5 py-6"><h1 className="text-3xl font-black">Verificar matrícula</h1>
    {q.isFetching ? <p>Verificando…</p> : d?.valid ? <div className="space-y-2 rounded-2xl border border-border bg-card p-5">
      <p className="font-bold text-accent">Matrícula aprobada y registrada</p><p>{d.institution_name} · nivel {d.level}</p>
      {d.reviewed_at && <p className="text-sm text-muted-foreground">Aprobada {new Date(d.reviewed_at).toLocaleString('es-CR', { timeZone: 'America/Costa_Rica' })}</p>}
      {d.is_mine ? <Link to="/institucion" className="inline-block rounded-full bg-primary px-4 py-2 font-bold text-primary-foreground">Abrir el portal de mi estudiante</Link>
        : <p className="text-sm">Si usted es la persona encargada, <Link to="/auth" className="text-primary underline">inicie sesión</Link> con su cuenta y vuelva a escanear para abrir el portal.</p>}
    </div> : <p>Comprobante no encontrado o código inválido.</p>}
    <p className="text-sm text-muted-foreground">Por privacidad, esta página no muestra el nombre ni los datos del estudiante.</p></section></main>;
}
