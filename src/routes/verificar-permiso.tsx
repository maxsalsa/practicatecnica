import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SiteHeader } from '@/components/SiteHeader';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { PERMISSION_KIND_LABELS, type PermissionKind } from '@/lib/institutions';

export const Route = createFileRoute('/verificar-permiso')({
  staticData: { sitemap: true },
  validateSearch: (s: Record<string, unknown>) => ({ codigo: typeof s['codigo'] === 'string' ? s['codigo'].slice(0, 80) : '' }),
  head: () => ({
    meta: [
      { title: 'Verificar permiso institucional · pracTICAtecnica.com' },
      { name: 'description', content: 'Compruebe con el código SHA-256 o el QR si un permiso fue aprobado por la dirección de una institución en pracTICAtecnica.com.' },
      { property: 'og:title', content: 'Verificar permiso · pracTICAtecnica.com' },
      { property: 'og:description', content: 'Validación pública de permisos aprobados mediante código SHA-256 y QR.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: VerifyPermission,
});

const day = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString('es-CR', { timeZone: 'America/Costa_Rica', dateStyle: 'long' });

function VerifyPermission() {
  const { codigo } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [text, setText] = useState(codigo);
  const hash = codigo.trim().toLowerCase();
  const valid = /^[0-9a-f]{64}$/.test(hash);
  const result = useQuery({
    queryKey: ['verify-permission', hash], enabled: valid,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('verify_permission', { _hash: hash });
      if (error) throw new Error('No se pudo consultar la verificación. Intente de nuevo.');
      return data[0] ?? null;
    },
  });
  return <main className="min-h-screen bg-hero">
    <SiteHeader />
    <section className="mx-auto max-w-xl px-5 pb-16">
      <h1 className="text-3xl font-black">Verificar permiso</h1>
      <p className="mt-2 text-muted-foreground">Escanee el QR o pegue el código SHA-256 de 64 caracteres del permiso.</p>
      <form className="mt-4 flex gap-2" onSubmit={e => { e.preventDefault(); void navigate({ search: { codigo: text.trim() } }); }}>
        <input aria-label="Código de verificación" className="min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2 font-mono text-sm" value={text} onChange={e => setText(e.target.value)} placeholder="Código de 64 caracteres" />
        <Button type="submit">Verificar</Button>
      </form>
      {codigo && !valid && <p role="alert" className="mt-4 font-semibold text-destructive">El código debe tener 64 caracteres (0-9, a-f).</p>}
      {valid && (result.isPending ? <p role="status" className="mt-4">Verificando…</p> : result.isError ? <p role="alert" className="mt-4 text-destructive">{result.error.message}</p> : !result.data ?
        <div role="alert" className="mt-4 rounded-2xl border border-destructive bg-card p-5"><p className="font-bold text-destructive">No se encontró un permiso aprobado con ese código.</p><p className="mt-1 text-sm text-muted-foreground">Puede haber sido rechazado, cancelado o el código fue alterado.</p></div> :
        <div className="mt-4 rounded-2xl border border-primary bg-card p-5">
          <p className="text-lg font-black text-primary">✅ Permiso auténtico y aprobado</p>
          <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
            <dt className="font-semibold">Institución</dt><dd>{result.data.institution_name}</dd>
            <dt className="font-semibold">Persona</dt><dd>{result.data.holder}</dd>
            <dt className="font-semibold">Motivo</dt><dd>{PERMISSION_KIND_LABELS[result.data.kind as PermissionKind] ?? result.data.kind}</dd>
            <dt className="font-semibold">Fechas</dt><dd>{day(result.data.starts_on)}{result.data.ends_on !== result.data.starts_on ? ` al ${day(result.data.ends_on)}` : ''}{result.data.hours ? ` · ${result.data.hours}` : ''}</dd>
            <dt className="font-semibold">Aprobado</dt><dd>{new Date(result.data.reviewed_at).toLocaleString('es-CR', { timeZone: 'America/Costa_Rica', dateStyle: 'long', timeStyle: 'short' })}</dd>
          </dl>
          <p className="mt-3 text-xs text-muted-foreground">El código se calcula con SHA-256 sobre los datos del permiso al aprobarse; cualquier cambio invalida la verificación.</p>
        </div>)}
      <Link to="/institucion" className="mt-6 inline-block text-sm font-bold text-primary underline">Ir a Mi institución</Link>
    </section>
  </main>;
}
