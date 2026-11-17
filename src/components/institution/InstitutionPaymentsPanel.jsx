import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export function InstitutionPaymentsPanel({ name, paidUntil }) {
  const active = paidUntil !== null && Date.parse(paidUntil) > Date.now();
  return <section className="space-y-5 border-t border-border py-6">
    <h2 className="text-2xl font-black">Pagos · {name}</h2>
    <dl className="grid gap-4 sm:grid-cols-2">
      <div><dt className="text-sm text-muted-foreground">Plan institucional anual</dt><dd className="text-2xl font-bold">₡10.000 CRC</dd></div>
      <div><dt className="text-sm text-muted-foreground">Vigencia registrada</dt><dd className="font-semibold">{active ? `Vigente hasta ${new Date(paidUntil ?? '').toLocaleDateString('es-CR')}` : 'Sin periodo vigente'}</dd></div>
    </dl>
    <p className="text-sm text-muted-foreground">La suscripción de la plataforma es distinta de las tarifas de matrícula, comedor y circuitos de su colegio. SINPE requiere comprobante y confirmación de Max.</p>
    <Button asChild><Link to="/pagos"><CreditCard aria-hidden="true" />Planes y comprobantes</Link></Button>
    <p role="status" className="text-sm text-muted-foreground">Cobros automáticos pendientes de verificación; no se activan suscripciones por una referencia ni por pagos de prueba.</p>
  </section>;
}