import { useQuery } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import { useAccount } from './AccountProvider';
import { Button } from './ui/button';
import { supabase } from '@/integrations/supabase/client';
import { PLAN_LABELS } from '@/lib/pricing';

export function MyPaymentStatus({ revision }) {
  const { user } = useAccount();
  const query = useQuery({
    queryKey: ['my-payments', user?.id, revision], enabled: !!user,
    queryFn () => {
      if (!user) return [];
      const result = await supabase.from('payments')
        .select('id,plan,amount,method,status,created_at,expires_at')
        .eq('user_id', user.id).order('created_at', { ascending }).limit(20);
      if (result.error) throw new Error('No se pudo consultar su estado de pago.');
      return result.data;
    },
  });
  if (!user) return null;
  return <section className="border-y border-border py-5" aria-labelledby="payment-status-heading">
    <div className="flex items-center justify-between gap-3">
      <h2 id="payment-status-heading" className="text-xl font-bold">Mis pagos</h2>
      <Button variant="outline" size="icon" aria-label="Actualizar estado de pagos" title="Actualizar estado de pagos" disabled={query.isFetching} onClick={() => void query.refetch()}><RefreshCw /></Button>
    </div>
    {query.isPending ? <p role="status" className="mt-3">Consultando pagos…</p> : query.error ? <p role="alert" className="mt-3 text-destructive">{query.error.message}</p> : <>
      {!query.data?.length && <p className="mt-3 text-muted-foreground">No hay pagos registrados en su cuenta.</p>}
      <ul className="mt-3 divide-y divide-border">{query.data?.map(payment => <li key={payment.id} className="py-3 text-sm">
        <p className="font-semibold">{PLAN_LABELS[payment.plan ?? payment.plan} · ₡{payment.amount.toLocaleString('es-CR')} · {payment.method === 'paypal' ? 'PayPal' : 'SINPE'}</p>
        <p className="mt-1">{payment.status === 'confirmed' ? 'Pago confirmado' : payment.status === 'pending' || payment.status === 'active' ? 'Pendiente de revisión; no activa el plan' : payment.status === 'rejected' ? 'Pago rechazado' : 'Estado no reconocido; consulte soporte'}</p>
        <p className="mt-1 text-muted-foreground">Registrado: {new Date(payment.created_at).toLocaleString('es-CR', { timeZone: 'America/Costa_Rica' })}{payment.status === 'confirmed' && ` · Período hasta: ${new Date(payment.expires_at).toLocaleDateString('es-CR', { timeZone: 'America/Costa_Rica' })}`}</p>
        {payment.status === 'confirmed' && payment.expires_at && Date.parse(payment.expires_at) > Date.now() && Date.parse(payment.expires_at) - Date.now() < 30 * 864e5 && <p role="status" className="mt-1 font-semibold text-accent">Su plan vence en menos de 30 días. Renueve para no perder el acceso.</p>}
      </li>)}</ul>
    </>}
  </section>;
}