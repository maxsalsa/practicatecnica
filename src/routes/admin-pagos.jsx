import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { useAccount } from "@/components/AccountProvider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { reconcile, reconcileCards, cardUsd, type CardRow } from "@/lib/reconciliation";
import { code128B } from "@/lib/code128";
import { PLAN_LABELS, type AnnualPlan } from "@/lib/pricing";

export const Route = createFileRoute("/admin-pagos")({staticData:{sitemap:false},
  head: () => ({
    meta: [
      { title: "Administración de pagos · pracTICAtecnica.com" },
      { name: "description", content: "Revisión y auditoría de pagos SINPE." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Administración de pagos" },
      { property: "og:description", content: "Panel interno de pagos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPagos,
});

type Row = { id: string; user_id: string | null; email: string | null; plan: string; amount: number; payer_phone: string; reference: string; status: string; expires_at: string; created_at: string; method: string; institutions: { name: string } | null };
type Seal = { id: string; email: string | null; amount: number; reference: string; status: string; folio: string; hash: string; at: string };
async function sha256(t: string) { const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t)); return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, "0")).join(""); }
function Barcode({ value }: { value: string }) {
  const w = code128B(value); let x = 10; const bars: { x: number; w: number }[] = [];
  w.forEach((m, i) => { if (i % 2 === 0) bars.push({ x, w: m }); x += m; });
  return <svg viewBox={`0 0 ${x + 10} 50`} className="h-12 w-full max-w-xs bg-background" role="img" aria-label={`Código de barras ${value}`}>{bars.map((b, i) => <rect key={i} x={b.x} y={4} width={b.w} height={42} className="fill-foreground" />)}</svg>;
}
const label: Record<string, string> = { active: "Pendiente de confirmación (sin activar)", confirmed: "Confirmado", rejected: "Anulado" };

function AdminPagos() {
  const { user } = useAccount();
  const [admin, setAdmin] = useState<boolean | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [cards, setCards] = useState<CardRow[]>([]);
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [seals, setSeals] = useState<Seal[]>([]);
  const [busy, setBusy] = useState(false);

  async function load() {
    const { data } = await supabase.from("payments").select("*, institutions(name)").order("created_at", { ascending: false });
    setRows((data as Row[]) ?? []);
    const c = await supabase.rpc("admin_card_revenue");
    setCards((c.data as CardRow[]) ?? []);
  }
  useEffect(() => {
    if (!user) { setAdmin(false); return; }
    supabase.rpc("has_role", { _user_id: user.id, _role: "admin" }).then(({ data }) => {
      setAdmin(!!data);
      if (data) load();
    });
  }, [user]);

  async function setStatus(id: string, status: "confirmed" | "rejected") {
    if (status === 'confirmed' && !window.confirm('¿Verificó el pago real y su comprobante? Confirmar activa el acceso.')) return;
    const { error } = await supabase.from("payments").update({ status, reviewed_at: new Date().toISOString() }).eq("id", id);
    if (error) { toast.error("No se pudo actualizar."); return; }
    toast.success(status === "confirmed" ? "Pago confirmado" : "Plan anulado");
    load();
  }

  async function bulk(status: "confirmed" | "rejected") {
    const ids = rows.filter((r) => sel.has(r.id) && r.status === "active");
    if (!ids.length) return;
    if (!window.confirm(status === "confirmed" ? `¿Verificó los ${ids.length} pagos reales y sus comprobantes? Confirmar activa el acceso.` : `¿Anular ${ids.length} comprobantes?`)) return;
    setBusy(true);
    const at = new Date().toISOString(); const out: Seal[] = [];
    for (const r of ids) {
      const { error } = await supabase.from("payments").update({ status, reviewed_at: at }).eq("id", r.id).eq("status", "active");
      if (error) continue;
      const hash = await sha256(`${r.id}|${r.reference}|${r.amount}|${status}|${at}`);
      out.push({ id: r.id, email: r.email, amount: r.amount, reference: r.reference, status, folio: `PT-PAG-${hash.slice(0, 12).toUpperCase()}`, hash, at });
    }
    setBusy(false); setSel(new Set()); setSeals(out);
    toast.success(`${out.length} de ${ids.length} comprobantes ${status === "confirmed" ? "confirmados" : "anulados"}`);
    load();
  }

  const now = Date.now();
  const card = reconcileCards(cards);
  const pend = rows.filter((r) => r.status === "active");
  const active = rows.filter((r) => r.status === "confirmed" && new Date(r.expires_at).getTime() > now);
  const rec = reconcile(rows, now);
  const crc = (n: number) => `₡${n.toLocaleString("es-CR")}`;
  const day = (d: string) => new Date(d).toLocaleDateString("es-CR", { timeZone: "America/Costa_Rica" });

  return (
    <main className="min-h-screen bg-hero">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-5 pb-16">
        <h1 className="text-3xl font-black">Pagos y activaciones</h1>
        <div className="mt-4 rounded-2xl border border-accent bg-card p-4 text-sm">
          <p className="font-bold">🧾 Factura electrónica oficial (gratis)</p>
          <p className="mt-1 text-muted-foreground">Al confirmar un pago, emita la factura en la herramienta gratuita de facturación de Hacienda con su usuario y firma. Hacienda asigna la clave numérica y el consecutivo oficiales.</p>
          <a href="https://www.hacienda.go.cr" target="_blank" rel="noreferrer" className="mt-2 inline-block font-bold text-primary underline">Abrir sitio de Hacienda →</a>
        </div>
        {admin === null ? <p className="mt-4">Cargando…</p> : !admin ? (
          <p className="mt-4">Esta sección es solo para administración.</p>
        ) : (
          <>
            <p className="mt-2 text-muted-foreground">
              Activos: <strong className="text-foreground">{active.length}</strong> · Por revisar: <strong className="text-foreground">{rows.filter((r) => r.status === "active").length}</strong>
            </p>
            <section aria-label="Conciliación" className="mt-6 rounded-2xl border border-primary bg-card p-4 sm:p-6">
              <h2 className="text-xl font-black">📊 Conciliación: Gratuito vs Pro</h2>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                <p className="rounded-xl border border-border p-3">Cobrado confirmado<strong className="block text-lg">{crc(rec.collected)}</strong><span className="text-muted-foreground">Últimos 12 meses: {crc(rec.collected12m)}</span></p>
                <p className="rounded-xl border border-border p-3">Renovaciones anuales<strong className="block text-lg">{rec.renewals}</strong><span className="text-muted-foreground">Pagos de un año adicional</span></p>
                <p className="rounded-xl border border-border p-3">Por revisar<strong className="block text-lg">{crc(rec.pendingReview)}</strong><span className="text-muted-foreground">{rec.pendingReviewCount} comprobantes</span></p>
                <p className="rounded-xl border border-accent p-3">Saldo pendiente<strong className="block text-lg text-accent">{crc(rec.outstanding)}</strong><span className="text-muted-foreground">Por revisar + vencen en 30 días</span></p>
              </div>
              <h3 className="mt-4 font-bold">Renovaciones que vencen en 30 días ({crc(rec.dueSoonAmount)})</h3>
              <ul className="mt-1 text-sm">{rec.dueSoon.map((r) => <li key={`${r.user_id}-${r.plan}`}>{r.email ?? "sin correo"} · {PLAN_LABELS[r.plan as AnnualPlan] ?? r.plan} · vence {day(r.expires_at)} · {crc(r.amount)}</li>)}{!rec.dueSoon.length && <li className="text-muted-foreground">Ninguna.</li>}</ul>
              <h3 className="mt-3 font-bold">Vencidos sin renovar, últimos 90 días ({crc(rec.lapsedAmount)})</h3>
              <ul className="mt-1 text-sm">{rec.lapsed.map((r) => <li key={`${r.user_id}-${r.plan}`}>{r.email ?? "sin correo"} · {PLAN_LABELS[r.plan as AnnualPlan] ?? r.plan} · venció {day(r.expires_at)}</li>)}{!rec.lapsed.length && <li className="text-muted-foreground">Ninguno.</li>}</ul>
              <h3 className="mt-4 font-bold">💳 Tarjeta (cobros reales en dólares)</h3>
              <div className="mt-1 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                <p className="rounded-xl border border-border p-3">Cobrado con tarjeta<strong className="block text-lg">US${card.collectedUsd.toFixed(2)}</strong><span className="text-muted-foreground">{card.paidCount} suscripciones · {card.activeCount} activas</span></p>
                <p className="rounded-xl border border-accent p-3">Saldo pendiente tarjeta<strong className="block text-lg text-accent">US${card.outstandingUsd.toFixed(2)}</strong><span className="text-muted-foreground">{card.dueCount} cobros fallidos por recuperar</span></p>
                <p className="col-span-2 rounded-xl border border-primary p-3 sm:col-span-1">Saldo pendiente total<strong className="block text-lg">{crc(rec.outstanding)} + US${card.outstandingUsd.toFixed(2)}</strong><span className="text-muted-foreground">Colones (SINPE/PayPal) y dólares (tarjeta)</span></p>
              </div>
              <ul className="mt-2 text-sm">{cards.slice(0, 20).map((c, i) => <li key={i}>{c.email ?? "sin correo"} · US${cardUsd(c).toFixed(2)} · {c.status}{c.current_period_end ? ` · renueva ${day(c.current_period_end)}` : ""}{c.cancel_at_period_end ? " · no renovará" : ""}</li>)}{!cards.length && <li className="text-muted-foreground">Aún no hay cobros reales con tarjeta.</li>}</ul>
              <p className="mt-3 text-xs text-muted-foreground">Los montos con tarjeta se calculan por el precio anual del plan; no se convierten a colones.</p>
            </section>
            {pend.length > 0 && (
              <section aria-label="Aprobación por lotes" className="mt-6 flex flex-wrap items-center gap-2 rounded-2xl border border-accent bg-card p-4">
                <label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" className="h-5 w-5" checked={sel.size === pend.length} onChange={(e) => setSel(e.target.checked ? new Set(pend.map((r) => r.id)) : new Set())} />Seleccionar todos ({sel.size}/{pend.length})</label>
                <Button size="sm" disabled={!sel.size || busy} onClick={() => bulk("confirmed")}>Confirmar seleccionados</Button>
                <Button size="sm" variant="outline" disabled={!sel.size || busy} onClick={() => bulk("rejected")}>Anular seleccionados</Button>
              </section>
            )}
            {seals.length > 0 && (
              <section aria-label="Sellos emitidos" className="mt-6 rounded-2xl border border-primary bg-card p-4">
                <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="text-xl font-black">🔏 Sellos del lote</h2><Button size="sm" variant="outline" onClick={() => window.print()}>Imprimir</Button></div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">{seals.map((s) => (
                  <article key={s.id} className="rounded-xl border border-border p-3 text-sm">
                    <p className="font-bold">{s.status === "confirmed" ? "✅ Confirmado" : "⛔ Anulado"} · {crc(s.amount)} · {s.email ?? "sin correo"}</p>
                    <p className="text-muted-foreground">Comprobante {s.reference} · {new Date(s.at).toLocaleString("es-CR", { timeZone: "America/Costa_Rica" })}</p>
                    <Barcode value={s.folio} /><p className="font-mono text-xs">{s.folio}</p>
                    <p className="break-all font-mono text-[10px] text-muted-foreground">SHA-256 {s.hash}</p>
                  </article>))}</div>
                <p className="mt-2 text-xs text-muted-foreground">Sello de control interno de pracTICAtecnica.com; no equivale a firma digital certificada.</p>
              </section>
            )}
            <div className="mt-6 space-y-3">
              {rows.map((r) => (
                <article key={r.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-card p-4">
                  <div className="flex items-start gap-3 text-sm">
                    {r.status === "active" && <input type="checkbox" aria-label={`Seleccionar ${r.reference}`} className="mt-1 h-5 w-5" checked={sel.has(r.id)} onChange={(e) => { const n = new Set(sel); e.target.checked ? n.add(r.id) : n.delete(r.id); setSel(n); }} />}
                    <div>
                    <p className="font-bold">{r.email ?? "sin correo"} · ₡{r.amount.toLocaleString("es-CR")} · {PLAN_LABELS[r.plan as AnnualPlan] ?? r.plan}{r.institutions ? ` · ${r.institutions.name}` : ""} · {r.method === "paypal" ? "PayPal" : "SINPE"}</p>
                    <p className="text-muted-foreground">Tel. {r.payer_phone} · Comprobante {r.reference} · {new Date(r.created_at).toLocaleString("es-CR", { timeZone: "America/Costa_Rica" })}</p>
                    <p>{label[r.status]}{r.status === "confirmed" ? ` · vence ${new Date(r.expires_at).toLocaleDateString("es-CR", { timeZone: "America/Costa_Rica" })}` : ""}</p>
                    </div>
                  </div>
                  {r.status === "active" && (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => setStatus(r.id, "confirmed")}>Confirmar</Button>
                      <Button size="sm" variant="outline" onClick={() => setStatus(r.id, "rejected")}>Anular</Button>
                    </div>
                  )}
                </article>
              ))}
              {!rows.length && <p>Aún no hay pagos registrados.</p>}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
