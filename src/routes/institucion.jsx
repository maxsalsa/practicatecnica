import { AuditLog } from '@/components/AuditLog';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SiteHeader } from '@/components/SiteHeader';
import { useAccount } from '@/components/AccountProvider';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InstitutionLogo } from '@/components/institution/InstitutionLogo';
import { AnnouncementsPanel } from '@/components/institution/AnnouncementsPanel';
import { MemberPermissions, PermissionReview, RoleHistory } from '@/components/institution/PermissionsPanel';
import { InstitutionAdmin } from '@/components/institution/InstitutionAdmin';
import { AgendaPanel } from '@/components/institution/AgendaPanel';
import { ChannelsPanel, useChannelList } from '@/components/institution/ChannelsPanel';
import { SectionsPanel } from '@/components/institution/SectionsPanel';
import { SchedulePanel } from '@/components/institution/SchedulePanel';
import { StudentVisibilityPanel } from '@/components/institution/StudentVisibilityPanel';
import { AreaReviewPanel } from '@/components/institution/AreaReviewPanel';
import { StudentSchedulePanel } from '@/components/institution/StudentSchedulePanel';
import { LogoUploader } from '@/components/institution/LogoUploader';
import { EnrollmentReview } from '@/components/institution/EnrollmentReview';
import { DocumentsPanel } from '@/components/institution/DocumentsPanel';
import { FollowUpPanel } from '@/components/institution/FollowUpPanel';
import { ROLE_LABELS, canLeadInstitution, type InstitutionRole, type InstitutionKind } from '@/lib/institutions';
import { PublicationsPanel } from '@/components/institution/PublicationsPanel';
import { EditorialPanel } from '@/components/institution/EditorialPanel';
import { InstitutionAnalytics } from '@/components/institution/InstitutionAnalytics';
import { InstitutionPaymentsPanel } from '@/components/institution/InstitutionPaymentsPanel';
import { AssignedResourcesPanel } from '@/components/institution/ResourcePermissionsPanel';
import { SpecTablePanel } from '@/components/institution/SpecTablePanel';
import { InstitutionWhatsAppPanel } from '@/components/institution/InstitutionWhatsAppPanel';
import { StudentRecordsPanel } from '@/components/institution/StudentRecordsPanel';
import { canReadStudentRecords } from '@/lib/student-record-policy';
import { SignedDocumentsPanel } from '@/components/institution/SignedDocumentsPanel';
import { SchoolServicesPanel } from '@/components/institution/SchoolServicesPanel';
import { TariffsPanel } from '@/components/institution/TariffsPanel';
import { Button } from '@/components/ui/button';
import { InstitutionBackup } from '@/components/institution/InstitutionBackup';
import { AdditionalRoles } from '@/components/institution/AdditionalRoles';
import { InstitutionProfile } from '@/components/institution/InstitutionProfile';
import { MessageSquare, Bell, CalendarDays, Search, Megaphone } from 'lucide-react';
import { useMenuPreview } from '@/components/useMenuPreview';
import { institutionPreviewTabs } from '@/lib/institution-menu';
import { PreviewTabs } from '@/components/institution/PreviewTabs';

export const Route = createFileRoute('/institucion')({
  validateSearch: (search: Record<string, unknown>): { vista?: string; centro?:string; seccion?:string } => ({
    ...(typeof search['vista'] === 'string' && /^[a-z-]{2,30}$/.test(search['vista']) ? { vista: search['vista'] } : {}),
    ...(typeof search['centro']==='string'&&/^[0-9a-f-]{36}$/.test(search['centro'])?{centro:search['centro']}:{}),
    ...(typeof search['seccion']==='string'&&search['seccion'].length<=120?{seccion:search['seccion']}:{}),
  }),
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: 'Mi institución · avisos y permisos · pracTICAtecnica.com' },
      { name: 'description', content: 'Avisos, agenda, canales con familias y profesor guía, permisos desde el teléfono con QR verificable y administración de colegios afiliados.' },
      { name: 'robots', content: 'noindex' },
      { property: 'og:title', content: 'Mi institución · pracTICAtecnica.com' },
      { property: 'og:description', content: 'Avisos, permisos y personal de su colegio en un solo lugar.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: InstitutionPage,
});

type Option = { id: string; name: string; logo_path: string | null; is_test: boolean; kind?: string; paid_until: string | null; role: InstitutionRole | 'admin' };

function InstitutionPage() {
  const { vista,centro,seccion } = Route.useSearch();
  const { user, ready } = useAccount();
  const flags = useQuery({
    queryKey: ['institution-flags', user?.id], enabled: !!user,
    queryFn: async () => {
      if(!user) throw new Error('Ingrese primero.');
      const [admin, approver] = await Promise.all([supabase.rpc('has_role', { _user_id: user.id, _role: 'admin' }), supabase.rpc('can_review_any_permissions')]);
      if (admin.error || approver.error) throw new Error('No se pudieron verificar sus permisos.');
      return { admin: admin.data === true, approver: approver.data === true };
    },
  });
  const mine = useQuery({
    queryKey: ['my-institutions', user?.id], enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('my_institutions');
      if (error) throw new Error('No se pudo consultar su institución.');
      return data;
    },
  });
  const all = useQuery({
    queryKey: ['admin-institutions'], enabled: flags.data?.admin === true,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('admin_institutions');
      if (error) throw new Error('No se pudieron cargar las instituciones.');
      return data;
    },
  });
  const options = useMemo<Option[]>(() => {
    const own = (mine.data ?? []).map(m => ({ id: m.id, name: m.name, logo_path: m.logo_path, is_test: m.is_test, kind: m.kind, paid_until: m.paid_until, role: m.member_role as InstitutionRole }));
    if (!flags.data?.admin) return own;
    return (all.data ?? []).map(i => own.find(o => o.id === i.id) ?? { id: i.id, name: i.name, logo_path: i.logo_path, is_test: i.is_test, kind: i.kind, paid_until: i.paid_until, role: 'admin' as const });
  }, [mine.data, all.data, flags.data?.admin]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = Route.useNavigate();
  const activeTab = vista ?? 'avisos';
  const setActiveTab = (t: string) => { if (t !== activeTab) void navigate({ search: (p: { vista?: string }) => ({ ...p, vista: t }) }); };
  const [sectionSearch, setSectionSearch] = useState('');
  useEffect(() => { if(centro&&options.some(o=>o.id===centro)){setSelectedId(centro);return;} if (!selectedId && options[0]) setSelectedId(options[0].id); }, [options, selectedId,centro]);
  const current = options.find(o => o.id === selectedId) ?? null;
  const preview = useMenuPreview(user?.id, flags.data?.admin === true);
  const allowedTabs = institutionPreviewTabs(preview.role);
  const effectiveRole: InstitutionRole | 'admin' | null = current ? (flags.data?.admin && current.role !== 'direccion' && current.role !== 'administrativo' ? 'admin' : current.role) : null;
  const memberRole = current && current.role !== 'admin' ? current.role : null;
  const leader = canLeadInstitution(current?.role) || flags.data?.admin === true;
  const manager = !!current && (current.role === 'admin' || current.role === 'direccion' || current.role === 'administrativo' || flags.data?.admin === true);
  const guide = useQuery({
    queryKey: ['is-guide', current?.id, user?.id], enabled: !!current && !!user && !manager && current.role !== 'estudiante' && current.role !== 'encargado',
    queryFn: async () => { if(!current||!user)return false; const { count } = await supabase.from('institution_sections').select('id', { count: 'exact', head: true }).eq('institution_id', current.id).eq('guide_id', user.id); return (count ?? 0) > 0; },
  });

  if (!ready || (user && (flags.isPending || mine.isPending || (flags.data?.admin && all.isPending)))) return <main className="min-h-screen bg-hero"><SiteHeader /><p role="status" className="p-8 text-center">Cargando su institución…</p></main>;
  if (!user) return <main className="min-h-screen bg-hero"><SiteHeader /><section className="mx-auto max-w-xl px-5 py-10 text-center"><h1 className="text-3xl font-black">Mi institución</h1><p className="mt-3 text-muted-foreground">Ingrese con su cuenta Gmail para ver los avisos de su colegio y las solicitudes de permisos.</p><Link to="/auth" className="mt-6 inline-block rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground">Ingresar</Link></section></main>;
  if (flags.isError || mine.isError) return <main className="min-h-screen bg-hero"><SiteHeader /><p role="alert" className="p-8 text-center text-destructive">{(flags.error ?? mine.error)?.message}</p></main>;

  return <main className="min-h-screen bg-hero">
    <SiteHeader />
    <section className="mx-auto max-w-4xl space-y-6 px-5 pb-16">
      <h1 className="text-3xl font-black">Mi institución</h1>
      {!allowedTabs && <nav aria-label="Permisos y justificaciones" className="flex flex-wrap gap-2 border-b border-border pb-4">
        {memberRole && memberRole !== 'encargado' && <Button asChild variant={activeTab === 'permisos' ? 'default' : 'outline'}><Link to="/institucion" search={{vista:'permisos'}}>Solicitar / justificar permiso</Link></Button>}
        {flags.data?.approver && <Button asChild variant={activeTab === 'revision' ? 'default' : 'outline'}><Link to="/institucion" search={{vista:'revision'}}>Jefatura · Aprobar / rechazar</Link></Button>}
      </nav>}
      <Link to="/instituciones" className="text-primary underline">Ver catálogo público institucional</Link>
      {!allowedTabs && current && canReadStudentRecords(current.role) && <Link to="/institucion/roles" className="block text-primary underline">Administrar roles institucionales</Link>}
      {!options.length && !flags.data?.admin && <div className="rounded-2xl border border-border bg-card p-5">
        <p className="font-bold">Su cuenta no está vinculada a una institución.</p>
        <p className="mt-2 text-sm text-muted-foreground">Como persona particular puede usar su plan individual normalmente. Si su colegio adquirió el plan institucional, la dirección debe solicitar su afiliación por WhatsApp al 6090 6359 indicando su correo Gmail.</p>
      </div>}
      {options.length > 1 && <label className="block text-sm font-semibold">Institución
        <select className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2" value={selectedId ?? ''} onChange={e => setSelectedId(e.target.value)}>
          {options.map(o => <option key={o.id} value={o.id}>{o.name}{o.is_test ? ' (prueba)' : ''}</option>)}
        </select>
      </label>}
      {current && <div className="flex items-center gap-4 border-b border-border py-4">
        <InstitutionLogo path={current.logo_path} name={current.name} className="h-16 w-16" />
        <div className="min-w-0">
          <p className="break-words text-xl font-black">{current.name}</p>
          <p className="text-sm text-muted-foreground">{current.role === 'admin' ? 'Superadministración' : ROLE_LABELS[current.role]}{current.is_test ? ' · Institución de prueba' : ''} · {current.paid_until && Date.parse(current.paid_until) > Date.now() ? `Plan institucional hasta ${new Date(current.paid_until).toLocaleDateString('es-CR')}` : 'Plan institucional no vigente'}</p>
          {!allowedTabs && (current.role === 'direccion' || current.role === 'admin') && <LogoUploader inst={current.id} oldPath={current.logo_path} />}
        </div>
      </div>}
      {!allowedTabs && current && <details><summary className="cursor-pointer py-2 font-semibold">Identidad y contactos de la institución</summary><InstitutionProfile key={current.id} institutionId={current.id} canEdit={current.role === 'direccion' || flags.data?.admin === true}/></details>}
      {!allowedTabs && current && <details><summary className="cursor-pointer py-2 font-semibold">Roles adicionales y accesos</summary><AdditionalRoles key={`roles-${current.id}`} institutionId={current.id} canAssign={current.role==='direccion'||flags.data?.admin === true} /></details>}
      {!allowedTabs && current && (leader || flags.data?.admin) && <details><summary className="cursor-pointer py-2 font-semibold">Respaldo para migrar</summary><InstitutionBackup key={`backup-${current.id}`} institutionId={current.id} /></details>}
      <PreviewTabs key={current?.id ?? 'none'} allowed={allowedTabs} value={activeTab} onValueChange={setActiveTab}>
        {current && <nav aria-label="Comunicación institucional" className="flex flex-wrap gap-2 border-b border-border pb-4">
          <Button variant={activeTab === 'canales' ? 'default' : 'outline'} onClick={() => setActiveTab('canales')}><MessageSquare className="h-4 w-4" aria-hidden="true"/>Canales</Button>
          <Button variant={activeTab === 'avisos' ? 'default' : 'outline'} onClick={() => setActiveTab('avisos')}><Bell className="h-4 w-4" aria-hidden="true"/>Avisos</Button>
          <Button variant={activeTab === 'agenda' ? 'default' : 'outline'} onClick={() => setActiveTab('agenda')}><CalendarDays className="h-4 w-4" aria-hidden="true"/>Agenda</Button>
          {(manager || leader || memberRole === 'docente') && <Button variant="outline" onClick={() => setActiveTab('editorial')}><Megaphone className="h-4 w-4" aria-hidden="true"/>Campañas</Button>}
        </nav>}
        <nav aria-label="Tareas institucionales" className="grid gap-3 border-y border-border py-4 sm:grid-cols-2">
          <div className="space-y-2"><h2 className="font-bold">Mi trabajo</h2><div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setActiveTab('avisos')}>Avisos</Button>
            {memberRole && memberRole !== 'encargado' && <Button onClick={() => setActiveTab('permisos')}>Solicitar permiso / justificar</Button>}
            {(memberRole === 'docente' || leader) && <Button asChild variant="outline"><Link to="/planeamiento">Planeamientos</Link></Button>}
            {current && <Button variant="outline" onClick={() => setActiveTab('asistencia')}>Asistencia</Button>}
            {current&&memberRole==='encargado'&&<Button variant="outline" onClick={()=>setActiveTab('resultados')}>Resultados del estudiante</Button>}
            {current && memberRole==='estudiante' && <Button variant="outline" onClick={()=>setActiveTab('mi-horario')}>Mi horario</Button>}
          </div></div>
          {(leader || manager || flags.data?.approver) && <div className="space-y-2"><h2 className="font-bold">Gestión del centro</h2><div className="flex flex-wrap gap-2">
            {flags.data?.approver && <Button onClick={() => setActiveTab('revision')}>Aprobar / rechazar permisos</Button>}
            {current && memberRole !== 'encargado' && memberRole !== 'estudiante' && <Button asChild variant="outline"><Link to="/institucion" search={{vista:'horarios'}}>Horarios</Link></Button>}
            {flags.data?.admin ? <Button variant="outline" onClick={() => setActiveTab('admin')}>Personal y roles</Button> : leader && <Button asChild variant="outline"><Link to="/institucion/roles">Personal y roles</Link></Button>}
            {canReadStudentRecords(current?.role) && <Button variant="outline" onClick={() => setActiveTab('notas-ordenes')}>Notas y órdenes</Button>}
            {manager && <Button variant="outline" onClick={() => setActiveTab('matriculas')}>Matrículas</Button>}
            {(current?.role==='direccion'||flags.data?.admin) && <Button variant="outline" onClick={()=>setActiveTab('accesos')}>Usuarios y permisos por área</Button>}
            {(current?.role==='direccion'||flags.data?.admin) && <Button variant="outline" onClick={()=>setActiveTab('revision-areas')}>Revisión de áreas</Button>}
            {(manager||leader||memberRole==='docente')&&<Button variant="outline" onClick={()=>setActiveTab('publicaciones')}>Cargar y revisar prácticas</Button>}
            {(manager||leader||memberRole==='docente')&&<Button variant="outline" onClick={()=>setActiveTab('editor-practicas')}>Editor de prácticas</Button>}
            {(manager||leader||memberRole==='docente')&&<Button variant="outline" onClick={()=>setActiveTab('practicas-publicadas')}>Prácticas publicadas por área</Button>}
            {(manager||guide.data)&&<Button variant="outline" onClick={()=>setActiveTab('secciones')}>Secciones y enlaces de acceso</Button>}
          </div></div>}
        </nav>
        <details className="my-4"><summary className="cursor-pointer py-2 font-semibold">Todas las secciones</summary>
        <label className="mb-3 flex items-center gap-2 rounded-md border border-border bg-background px-3"><Search className="h-4 w-4 shrink-0" aria-hidden="true"/><input aria-label="Buscar sección institucional" placeholder="Buscar sección…" value={sectionSearch} onChange={event => setSectionSearch(event.target.value)} className="min-w-0 flex-1 bg-transparent py-3 text-sm"/></label>
        <TabsList ref={element => { if (!element) return; const needle = sectionSearch.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim(); element.querySelectorAll<HTMLElement>('[role="tab"]').forEach(tab => { tab.hidden = !(tab.textContent ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(needle); }); }} className="flex h-auto flex-wrap justify-start gap-1 [&_[hidden]]:hidden">
          {current && <TabsTrigger value="avisos">📢 Avisos</TabsTrigger>}
          {current && <TabsTrigger value="comedor">Comedor</TabsTrigger>}
          {current && <TabsTrigger value="asistencia">Asistencia</TabsTrigger>}
          {current && (manager || leader || memberRole==='docente') && <TabsTrigger value="publicaciones">Publicaciones y prácticas</TabsTrigger>}
          {current && (manager || leader || memberRole==='docente') && <TabsTrigger value="editorial">Campañas y circulares</TabsTrigger>}
          {current && (manager || memberRole === 'docente') && <TabsTrigger value="asignadas">Circulares asignadas</TabsTrigger>}
          {current && (current.role === 'direccion' || flags.data?.admin) && <TabsTrigger value="whatsapp">WhatsApp Business</TabsTrigger>}
          {current && (manager || leader || memberRole==='docente') && <TabsTrigger value="especificaciones">📐 Tabla de especificaciones</TabsTrigger>}
          {current && <TabsTrigger value="agenda">📅 Agenda</TabsTrigger>}
          {current && manager && <TabsTrigger value="matriculas">📝 Matrículas</TabsTrigger>}
          {current && (manager || current.role === 'subdireccion') && <TabsTrigger value="tarifas">Tarifas</TabsTrigger>}
          {current && (current.role === 'direccion' || flags.data?.admin) && <TabsTrigger value="pagos">Pagos</TabsTrigger>}
          {current && <TabsTrigger value="documentos">📄 Documentos</TabsTrigger>}
          {current && canReadStudentRecords(current.role) && <TabsTrigger value="expedientes">Expedientes privados</TabsTrigger>}
          {current && canReadStudentRecords(current.role) && <TabsTrigger value="notas-ordenes">Notas y órdenes</TabsTrigger>}
          {current && memberRole !== 'encargado' && memberRole !== 'estudiante' && <TabsTrigger value="horarios">🗓️ Horarios</TabsTrigger>}
          {current && <ChannelsTrigger institutionId={current.id} />}
          {memberRole && memberRole !== 'encargado' && <TabsTrigger value="permisos">📝 Mis permisos</TabsTrigger>}
          {current && (manager || guide.data || current.role === 'encargado') && <TabsTrigger value="seguimiento">📈 Seguimiento</TabsTrigger>}
          {current && (manager || guide.data) && <TabsTrigger value="secciones">👥 Secciones y familias</TabsTrigger>}
          {flags.data?.approver && <TabsTrigger value="revision">✅ Aprobar permisos</TabsTrigger>}
          {flags.data?.admin && <TabsTrigger value="admin">🏫 Administrar</TabsTrigger>}
        </TabsList></details>
        {current && manager && <TabsContent value="matriculas"><EnrollmentReview key={current.id} inst={current.id} name={current.name} logoPath={current.logo_path} /></TabsContent>}
        {current && (current.role==='direccion'||flags.data?.admin) && <TabsContent value="accesos"><StudentVisibilityPanel key={current.id} institutionId={current.id}/></TabsContent>}
        {current && (current.role==='direccion'||flags.data?.admin) && <TabsContent value="revision-areas"><AreaReviewPanel key={current.id} institutionId={current.id}/></TabsContent>}
        {current && memberRole==='estudiante' && <TabsContent value="mi-horario"><StudentSchedulePanel institutionId={current.id} {...(seccion?{sectionName:seccion}:{})}/></TabsContent>}
        {current && (manager || current.role === 'subdireccion') && <TabsContent value="tarifas"><TariffsPanel key={current.id} institutionId={current.id} canEdit={flags.data?.admin === true || current.role === 'direccion' || current.role === 'subdireccion'} /></TabsContent>}
        {current && <TabsContent value="comedor"><SchoolServicesPanel key={`${current.id}-comedor`} institutionId={current.id} mode="comedor" /></TabsContent>}
        {current && <TabsContent value="asistencia"><SchoolServicesPanel key={`${current.id}-asistencia`} institutionId={current.id} mode="asistencia" /></TabsContent>}
        {current && (current.role === 'direccion' || flags.data?.admin) && <TabsContent value="pagos"><InstitutionPaymentsPanel name={current.name} paidUntil={current.paid_until} /></TabsContent>}
        {current && (manager || leader || memberRole==='docente') && <TabsContent value="publicaciones"><PublicationsPanel key={current.id} institutionId={current.id} approver={leader}/></TabsContent>}
        {current && (manager || leader || memberRole==='docente') && <TabsContent value="editor-practicas"><PublicationsPanel key={`editor-${current.id}`} institutionId={current.id} approver={leader}/></TabsContent>}
        {current && (manager || leader || memberRole==='docente') && <TabsContent value="practicas-publicadas"><PublicationsPanel key={`published-${current.id}`} institutionId={current.id} approver={leader} publishedOnly/></TabsContent>}
        {current && (manager || leader || memberRole==='docente') && <TabsContent value="editorial"><EditorialPanel key={current.id} institutionId={current.id} name={current.name} logoPath={current.logo_path} approver={leader}/></TabsContent>}
        {current && (manager || memberRole === 'docente') && <TabsContent value="asignadas"><AssignedResourcesPanel institutionId={current.id}/></TabsContent>}
        {current && (current.role === 'direccion' || flags.data?.admin) && <TabsContent value="whatsapp"><InstitutionWhatsAppPanel key={current.id} institutionId={current.id}/></TabsContent>}
        {current && (manager || leader || memberRole==='docente') && <TabsContent value="especificaciones" className="mt-4"><SpecTablePanel key={current.id} name={current.name} logoPath={current.logo_path}/></TabsContent>}
        {current && <TabsContent value="documentos"><DocumentsPanel key={current.id} inst={current.id} name={current.name} logoPath={current.logo_path} canManage={current.role === 'direccion' || current.role === 'admin'} /></TabsContent>}
        {current && canReadStudentRecords(current.role) && <TabsContent value="expedientes"><StudentRecordsPanel key={current.id} institutionId={current.id} /></TabsContent>}
        {current && canReadStudentRecords(current.role) && <TabsContent value="notas-ordenes"><SignedDocumentsPanel key={current.id} institutionId={current.id} name={current.name} logoPath={current.logo_path} /></TabsContent>}
        {current && effectiveRole && <TabsContent value="avisos" className="mt-4"><AnnouncementsPanel key={current.id} institutionId={current.id} role={effectiveRole} /></TabsContent>}
        {current && <TabsContent value="agenda" className="mt-4"><AgendaPanel key={current.id} institutionId={current.id} institutionName={current.name} reviewer={flags.data?.approver === true} /></TabsContent>}
        {current && memberRole !== 'encargado' && memberRole !== 'estudiante' && <TabsContent value="horarios" className="mt-4"><SchedulePanel key={current.id} institutionId={current.id} kind={(current.kind ?? 'ctp') as InstitutionKind} canEdit={manager || leader} /></TabsContent>}
        {current && <TabsContent value="canales" className="mt-4"><ChannelsPanel key={current.id} institutionId={current.id} role={current.role} /></TabsContent>}
        {current && (manager || guide.data || current.role==='encargado')&&<TabsContent value="resultados"><FollowUpPanel key={`results-${current.id}`} institutionId={current.id} role={current.role} manager={manager}/></TabsContent>}
        {current && (manager || guide.data || current.role === 'encargado') && <TabsContent value="seguimiento" className="mt-4"><FollowUpPanel key={current.id} institutionId={current.id} role={current.role} manager={manager} /></TabsContent>}
        {current && (manager || guide.data) && <TabsContent value="secciones" className="mt-4"><SectionsPanel key={current.id} institutionId={current.id} manager={manager} /></TabsContent>}
        {memberRole && memberRole !== 'encargado' && current && <TabsContent value="permisos" className="mt-4"><MemberPermissions key={current.id} institutionId={current.id} role={memberRole} /></TabsContent>}
        {flags.data?.approver && <TabsContent value="revision" className="mt-4"><PermissionReview />{current && <RoleHistory key={current.id} institutionId={current.id} />}</TabsContent>}
        {current && (flags.data?.admin || current.role==='direccion') && <TabsContent value="bitacora"><h2 className="text-2xl font-bold">Bitácora institucional</h2><RoleHistory institutionId={current.id}/><AuditLog institutionId={current.id}/></TabsContent>}
        {flags.data?.admin && <TabsContent value="admin" className="mt-4 min-w-0 max-w-full overflow-x-hidden"><InstitutionAnalytics/><InstitutionAdmin selectedId={selectedId} onSelect={setSelectedId} /></TabsContent>}
      </PreviewTabs>
    </section>
  </main>;
}

function ChannelsTrigger({ institutionId }: { institutionId: string }) {
  const list = useChannelList(institutionId);
  const unread = (list.data ?? []).reduce((n, r) => n + Number(r.unread ?? 0), 0);
  return <TabsTrigger value="canales">💬 Canales{unread > 0 && <span className="ml-1 rounded-full bg-accent px-1.5 text-xs font-black text-accent-foreground" aria-label={`${unread} mensajes nuevos`}>{unread}</span>}</TabsTrigger>;
}
