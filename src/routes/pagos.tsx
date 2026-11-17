import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { useAccount } from "@/components/AccountProvider";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { openCardCheckout, getPaddleEnvironment } from "@/lib/paddle";
import { openBillingPortal } from "@/utils/payments.functions";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { PaypalButtons } from "@/components/PaypalButtons";
import { MyPaymentStatus } from '@/components/MyPaymentStatus';
import { RedeemCode } from '@/components/AccessCodeBox';
import { availablePlans, formatCrc, PAYPAL_USD, PLAN_NOTES, type Membership, type PlanOption } from "@/lib/pricing";

export const Route = createFileRoute("/pagos")({staticData:{sitemap:false},
  head: () => ({
    meta: [
      { title: "Planes anuales y pagos SINPE/PayPal · pracTICAtecnica.com" },
      { name: "description", content: "Planes anuales: estudiantes ₡2.500 (₡1.000 con colegio afiliado), docentes y público general ₡3.500, instituciones ₡10.000. SINPE verificado y PayPal." },
      { property: "og:title", content: "Pagos · pracTICAtecnica.com" },
      { property: "og:description", content: "Pague por SINPE Móvil al 6090 6359 o PayPal y active su plan anual." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Pagos,
});

const NUMBER = "60906359";

function Pagos() {
  const { user } = useAccount();
  const memberships = useQuery({
    queryKey: ['my-institutions', user?.id], enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('my_institutions');
      if (error) throw new Error('No se pudo consultar su institución.');
      return (data ?? []) as Membership[];
    },
  });
  const options = useMemo(() => availablePlans(memberships.data ?? []), [memberships.data]);
  const [selected, setSelected] = useState("estudiante");
  const option: PlanOption = options.find(o => o.key === selected) ?? { key: 'estudiante', plan: 'estudiante', label: 'Estudiantes', amount: 2500 };
  const [phone, setPhone] = useState("");
  const [reference, setReference] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [paymentRevision, setPaymentRevision] = useState(0);
  const waText = `Hola, adjunto comprobante SINPE. Plan: ${option.label}${option.institutionName ? ` (${option.institutionName})` : ''} ${formatCrc(option.amount)}. Referencia: ${reference || "-"}. Correo: ${user?.email ?? "-"}`;
  const wa = `https://api.whatsapp.com/send?phone=506${NUMBER}&text=${encodeURIComponent(waText)}`;
  const paypalUsd = option.plan === 'docente' ? null : PAYPAL_USD[option.plan];
  const cardPlan = option.plan === 'estudiante' || option.plan === 'general' || option.plan === 'docente' ? option.plan : null;
  const sandbox = getPaddleEnvironment() === 'sandbox';

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    const { error } = await supabase.from("payments").insert({
      user_id: user.id, email: user.email ?? null, plan: option.plan, amount: option.amount, institution_id: option.institutionId ?? null,
      payer_phone: phone.trim(), reference: reference.trim(),
    });
    setBusy(false);
    if (error) { toast.error("No se pudo registrar el pago. Revise el plan elegido e intente de nuevo."); return; }
    setDone(true);
    setPaymentRevision(value => value + 1);
    toast.success("Pago registrado para revisión. El plan se activa al confirmar el pago.");
  }

  return (
    <main className="min-h-screen bg-hero">
      <SiteHeader />
      <section className="mx-auto max-w-3xl space-y-6 px-5 pb-16">
        <h1 className="text-4xl font-black">Active su plan anual</h1>
        {user && <RedeemCode />}
        {user && memberships.isError && <p role="alert" className="text-sm text-destructive">{memberships.error.message} Puede pagar los planes individuales.</p>}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" role="radiogroup" aria-label="Plan anual">
          {options.map((o) => (
            <Button key={o.key} type="button" variant="outline" role="radio" aria-checked={option.key === o.key} onClick={() => { setSelected(o.key); setDone(false); }}
              className={`h-auto flex-col items-start whitespace-normal rounded-lg border p-5 text-left hover:bg-card ${option.key === o.key ? "border-primary bg-card ring-2 ring-primary" : "bg-card/60"}`}>
              <span className="font-bold">{o.label}</span>
              {o.institutionName && <span className="text-xs font-semibold text-accent">{o.institutionName}</span>}
              <span className="block text-3xl font-black text-primary">{formatCrc(o.amount)}</span>
              <span className="text-xs text-muted-foreground">por año</span>
            </Button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">{PLAN_NOTES[option.plan]} {!user ? 'Ingrese para ver el descuento de su colegio o el plan de su institución.' : !options.some(o => o.plan === 'estudiante_colegio') ? 'El precio de ₡1.000 aparece cuando su colegio tiene plan institucional vigente y su matrícula está verificada.' : ''}</p>

        <article className="rounded-2xl border bg-card p-6">
          <h2 className="text-xl font-extrabold">1. Pague por SINPE Móvil</h2>
          <p className="mt-3">Número <strong className="text-2xl">6090 6359</strong> · Monto <strong className="text-2xl">{formatCrc(option.amount)}</strong></p>
          <p className="text-sm text-muted-foreground">Titular: Max Salazar Sánchez · Banco Popular · Detalle: «.»</p>
          <Button className="mt-3" variant="secondary" onClick={() => navigator.clipboard.writeText(NUMBER).then(() => toast.success("Número copiado"))}>
            Copiar número
          </Button>
        </article>

        <article className="rounded-2xl border bg-card p-6">
          <h2 className="text-xl font-extrabold">2. Registre su pago</h2>
          {!user ? (
            <p className="mt-3">Para activar el plan debe <Link to="/auth" className="font-bold text-primary underline">ingresar a su cuenta</Link>.</p>
          ) : done ? (
            <p className="mt-3 font-semibold text-primary">Comprobante registrado. Su plan queda pendiente hasta que administración confirme el pago real.</p>
          ) : (
            <form onSubmit={submit} className="mt-3 space-y-3">
              <label className="block text-sm font-semibold">Teléfono desde el que pagó
                <input required inputMode="tel" pattern="[0-9 +-]{8,15}" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-xl border bg-background px-3 py-2" />
              </label>
              <label className="block text-sm font-semibold">Número de comprobante SINPE
                <input required minLength={4} maxLength={40} value={reference} onChange={(e) => setReference(e.target.value)} className="mt-1 w-full rounded-xl border bg-background px-3 py-2" />
              </label>
              <Button type="submit" disabled={busy}>{busy ? "Registrando…" : `Registrar pago de ${formatCrc(option.amount)}`}</Button>
            </form>
          )}
        </article>

        <article className="rounded-2xl border bg-card p-6">
          <h2 className="text-xl font-extrabold">3. Envíe el comprobante</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href={wa} target="_top" rel="noreferrer" className="inline-flex rounded-xl bg-accent px-5 py-3 font-bold text-accent-foreground">Enviar por WhatsApp</a>
            <button type="button" onClick={() => { void navigator.clipboard.writeText(waText); toast.success("Mensaje copiado. Péguelo en WhatsApp al 6090 6359 con la foto del comprobante."); }} className="rounded-xl border px-5 py-3 font-bold">Copiar mensaje</button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Si WhatsApp no abre, copie el mensaje y envíelo al 6090 6359 adjuntando la captura del comprobante. Este número es solo para SINPE Móvil y WhatsApp, no recibe llamadas.</p>
          <p className="mt-3 text-xs text-muted-foreground">Una referencia no confirma el pago. Administración verificará la transferencia antes de activar el plan. El comprobante no es una factura electrónica de Hacienda.</p>
        </article>

        <article className="rounded-2xl border bg-card p-6">
          <h2 className="text-xl font-extrabold">O pague con PayPal o tarjeta (pago único)</h2>
          <p className="mt-1 text-sm text-muted-foreground">{paypalUsd ? `Cobro PayPal: US$${paypalUsd.replace('.', ',')} por un año (monto fijo en dólares, no es una conversión exacta del precio SINPE).` : 'Docentes: ₡3.500 por un año; consulte el importe en dólares antes de pagar.'} Sin renovación automática. Administración activa el plan después de verificar el cobro.</p>
          <p className="mt-2 text-sm text-muted-foreground">No añadimos recargos. PayPal o su banco pueden cobrar comisión o conversión según su cuenta y medio de pago; revise el total en PayPal antes de aprobar. Tarjetas de débito o crédito según elegibilidad de PayPal.</p>
          {option.plan === 'docente' && <p className="mt-2 text-sm text-muted-foreground">El pago concede la suscripción anual; el permiso docente lo autoriza administración por separado.</p>}
          {user ? <PaypalButtons key={option.key} plan={option.plan} institutionId={option.institutionId} onPaid={() => { setPaymentRevision(value => value + 1); void memberships.refetch(); toast.success("Pago PayPal recibido. Administración lo confirmará pronto."); }} /> : <p className="mt-3 text-sm">Ingrese a su cuenta para pagar.</p>}
        </article>
        {sandbox && cardPlan && <article className="rounded-2xl border bg-card p-6">
          <PaymentTestModeBanner />
          <h2 className="mt-2 text-xl font-extrabold">Tarjeta con renovación anual automática (modo de prueba)</h2>
          <p className="mt-1 text-sm">Estudiantes US$4,99 · Público general y docentes US$6,99 por año. El acceso se activa al instante y puede cancelar la renovación cuando quiera.</p>
          <p className="mt-1 text-sm text-muted-foreground">Solo disponible en el entorno de prueba mientras se habilita el procesador definitivo; no realiza cobros reales.</p>
          {user ? <div className="mt-3 flex flex-wrap gap-2">
            <Button onClick={() => { openCardCheckout(`${cardPlan}_anual`, user, result => { }).catch(() => { toast.error("No se pudo abrir el pago con tarjeta."); }); }}>💳 Probar pago con tarjeta</Button>
            <button type="button" className="rounded-full border border-border px-5 py-3 font-bold" onClick={() => { openBillingPortal({ data: { environment: getPaddleEnvironment() } }).then(u => window.open(u, "_blank")).catch(e => toast.error(e instanceof Error ? e.message : "No se pudo abrir.")); }}>Administrar suscripción de prueba</button>
          </div> : <p className="mt-3 text-sm">Ingrese a su cuenta para probar.</p>}
        </article>}
        <MyPaymentStatus revision={paymentRevision} />
        <p className="text-center text-xs"><Link to="/legal" className="underline">Términos, privacidad y aviso legal</Link></p>
      </section>
    </main>
  );
}
