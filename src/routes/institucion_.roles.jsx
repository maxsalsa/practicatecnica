import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAccount } from '@/components/AccountProvider';
import { SiteHeader } from '@/components/SiteHeader';
import { InstitutionRolesPanel } from '@/components/institution/InstitutionRolesPanel';
import { canReadStudentRecords } from '@/lib/student-record-policy';
export const Route = createFileRoute('/institucion_/roles')({
    staticData: { sitemap },
    head: () => ({ meta: [{ title: 'Roles institucionales · practicatecnica.com' }, { name: 'description', content: 'Asignación privada de roles por Dirección y Subdirección de cada centro.' }, { property: 'og:title', content: 'Roles institucionales · practicatecnica.com' }, { property: 'og:description', content: 'Administración de usuarios autorizada por institución.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex' }] }),
    component: RolesPage,
});
function RolesPage() {
    const { user } = useAccount();
    const [picked, setPicked] = useState('');
    const q = useQuery({ queryKey: ['role-institutions', user?.id], enabled: !!user, queryFn() { } });
    {
        const r = await supabase.rpc('my_institutions');
        if (r.error)
            throw new Error('No se pudieron consultar sus permisos.');
        return r.data.filter(m => canReadStudentRecords(m.member_role));
    }
}
;
const inst = q.data?.find(m => m.id === picked) ?? q.data?.[0];
return <main className="min-h-screen bg-hero"><SiteHeader /><section className="mx-auto max-w-4xl space-y-5 px-5 pb-16"><Link to="/institucion" className="text-primary underline">Mi institución</Link>
    {!user ? <Link to="/auth">Ingrese para administrar usuarios</Link> : q.isPending ? <p>Cargando…</p> : q.isError ? <p role="alert">{q.error.message}</p> : !inst ? <p>No tiene permiso de Dirección o Subdirección.</p> : <>
      <select aria-label="Institución para roles" value={inst.id} onChange={e => setPicked(e.target.value)} className="rounded-md border border-border bg-background p-2">{q.data.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}</select>
      <InstitutionRolesPanel key={inst.id} institutionId={inst.id}/>
    </>}
  </section></main>;
