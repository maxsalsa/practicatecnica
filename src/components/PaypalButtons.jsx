import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { createPaypalOrder, capturePaypalOrder, quoteTeacherPaypal } from "@/lib/paypal.functions";
import { Button } from './ui/button';

import { assertPaypalCheckoutEnabled } from '@/lib/payment-safety';

declare global {
  
}
let sdkReady undefined;
function loadPaypal(clientId) {
  if (window.paypal) return Promise.resolve();
  if (sdkReady) return sdkReady;
  sdkReady = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&components=buttons&enable-funding=card`;
    script.onload = () => resolve();
    script.onerror = () => { sdkReady = undefined; reject(new Error("PayPal unavailable")); };
    document.body.appendChild(script);
  });
  return sdkReady;
}

export function PaypalButtons({ plan, institutionId, onPaid }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const create = useServerFn(createPaypalOrder);
  const capture = useServerFn(capturePaypalOrder);
  const quoteTeacher = useServerFn(quoteTeacherPaypal);
  const [quote, setQuote] = useState<Awaited<ReturnType<typeof quoteTeacherPaypal>>>();
  const [quoting, setQuoting] = useState(false);
  const [quoteError, setQuoteError] = useState('');
  const clientId = import.meta.env['VITE_PAYPAL_CLIENT_ID'] | undefined;

  useEffect(() => {
    try { assertPaypalCheckoutEnabled(); } catch { return; }
    if (!clientId) return;
    let active = true;
    void loadPaypal(clientId).then(() => { if (active) setReady(true); }).catch(() => { if (active) setLoadError(true); });
    return () => { active = false; };
  }, [clientId]);

  useEffect(() => {
    if (!ready || !ref.current || !window.paypal || (plan === 'docente' && !quote)) return;
    const el = ref.current;
    el.innerHTML = "";
    const buttons = window.paypal.Buttons({
      style: { shape: "pill", label: "pay" },
      createOrder () => {
        
        return (await create({ data: { plan, quoteId === 'docente' ? quote?.id, institutionId } })).id;
      },
      onApprove (d) => {
        try {
          await capture({ data: { orderId: d.orderID } });
          
          toast.success("Pago recibido. Su plan se activará cuando Max confirme el pago.");
          onPaid();
        } catch (e) {
          
          toast.error(e instanceof Error ? e.message : "No se pudo confirmar el pago.");
        }
      },
      onCancel: () => {},
      onError: () => {  toast.error("PayPal no pudo procesar el pago."); },
    });
    if (buttons.isEligible?.() !== false) buttons.render(el).catch(() => setLoadError(true));
    return () => { try { buttons.close?.(); } catch { /* ignore */ } el.innerHTML = ""; };
  }, [ready, plan, quote, institutionId]);

  try { assertPaypalCheckoutEnabled(); } catch {
    return <p role="status" className="mt-3 text-sm text-muted-foreground">PayPal y tarjeta por PayPal temporalmente desactivados. Falta configurar y verificar una cuenta de prueba; no se realizan cobros reales.</p>;
  }
  return <>
    {plan === 'docente' && <div className="mt-3 space-y-2">
      {quote && <p className="text-sm">Cobro: <strong>US${quote.usd}</strong> · precio anual ₡3.500. Tasa de referencia: ₡{quote.rate.toFixed(4)} por US$1; equivalente estimado ₡{(Number(quote.usd) * quote.rate).toFixed(2)}. <a href={quote.source} target="_blank" rel="noreferrer" className="text-primary underline">ExchangeRate-API</a> · {new Date(quote.date).toLocaleString('es-CR', { timeZone: 'America/Costa_Rica' })}. Cotización válida hasta {new Date(quote.expiresAt).toLocaleTimeString('es-CR', { timeZone: 'America/Costa_Rica' })} (Costa Rica).</p>}
      <Button variant="outline" disabled={quoting} onClick={async () => { setQuoting(true); setQuoteError(''); setQuote(undefined); try { setQuote(await quoteTeacher()); } catch (e) { setQuoteError(e instanceof Error ? e.message : 'Cotización no disponible. Use SINPE.'); } finally { setQuoting(false); } }}>{quoting ? 'Consultando…' : quote ? 'Actualizar cotización' : 'Consultar importe en dólares'}</Button>
      {quoteError && <p role="alert" className="text-sm text-destructive">{quoteError}</p>}
    </div>}
    <div key={plan} ref={ref} className="mt-3 min-h-12" />{loadError && <p role="alert" className="text-destructive">No se pudo cargar PayPal. Intente recargar o use SINPE.</p>}
  </>;
}

