import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { pickupIsAuthorized } from '@/lib/enrollment-document';
import { Link } from '@tanstack/react-router';
import { PickupQr } from './PickupQr';

export function PickupAuthorizations({ requestId, enrollmentStatus, reviewer = false }) {
  const query = useQuery({ queryKey: ['pickup-authorizations', requestId], queryFn () => {
    const { data, error } = await supabase.from('student_pickup_authorizations').select('id,name,identification,relation,status,note,reviewed_at').eq('request_id', requestId).order('created_at');
    if (error) throw error;
    return data;
  } });
  async function decide(id) {
    const note = window.prompt(status === 'autorizada' ? 'Indique la comprobación de identidad y vínculo realizada por la institución:' : 'Motivo de la decisión:');
    if (!note?.trim()) return;
    const { error } = await supabase.rpc('review_pickup_authorization', { _id, _status, _note });
    if (error) { toast.error('No se pudo registrar matrícula aprobada, permiso de revisión y no puede aprobar su propia solicitud.'); return; }
    toast.success('Decisión registrada.');
    void query.refetch();
  }
  if (query.isError) return <p role="alert" className="text-sm">No se pudieron consultar las personas propuestas para retiro.</p>;
  if (!query.data?.length) return null;
  return <details className="mt-3 border-t border-border pt-2"><summary className="font-semibold">Personas propuestas para retiro ({query.data.length})</summary>
    <ul className="mt-3 space-y-3">{query.data.map(a => <li key={a.id} className="text-sm">
      <p className="font-semibold">{a.name} · {a.relation} · {a.status}</p>
      <p className="text-xs">{pickupIsAuthorized(enrollmentStatus, a.status) ? 'Autorización registrada; compruebe la identidad antes del retiro.' : 'No habilita retiro.'}</p>
      <p>Identificación: {a.identification}</p>
      {a.note && <p className="text-muted-foreground">{a.note}</p>}
      {a.reviewed_at && <p className="text-xs">{new Date(a.reviewed_at).toLocaleString('es-CR', { timeZone: 'America/Costa_Rica' })}</p>}
      {pickupIsAuthorized(enrollmentStatus, a.status) && <PickupQr id={a.id} />}
      {reviewer && <div className="mt-2 flex flex-wrap gap-2">
        {a.status === 'pendiente' && <><Button size="sm" onClick={() => decide(a.id, 'autorizada')}>Autorizar tras verificar</Button><Button size="sm" variant="outline" onClick={() => decide(a.id, 'rechazada')}>Rechazar</Button></>}
        {a.status === 'autorizada' && <Button size="sm" variant="destructive" onClick={() => decide(a.id, 'revocada')}>Revocar</Button>}
      </div>}
    </li>)}</ul>
    <Button asChild variant="outline" className="mt-3"><Link to="/verificar-retiro">Escanear QR o código de barras</Link></Button>
    <p className="mt-3 text-xs text-muted-foreground">Una foto, carné o QR no autoriza por sí solo el retiro. Compruebe identidad y autorización institucional vigente.</p>
  </details>;
}