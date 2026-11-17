import { useState } from "react";
import { toast } from "sonner";
import { createDiscountCode } from "@/lib/discount.functions";
import { getPaddleEnvironment } from "@/lib/paddle";

export function DiscountBox() {
  const [code, setCode] = useState("");
  const [percent, setPercent] = useState(20);
  const [audience, setAudience] = useState<"estudiante" | "general" | "todos">("todos");
  const [uses, setUses] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <form
      className="mt-4 flex flex-wrap items-end gap-2 rounded-2xl border bg-card p-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        try {
          const r = await createDiscountCode({ data: { code, percent, audience, uses: uses ? Number(uses) : undefined, environment: getPaddleEnvironment() } });
          toast.success(`Código ${r.code} creado. Se escribe al pagar con tarjeta o PayPal.`);
          setCode("");
        } catch (err) { toast.error(err instanceof Error ? err.message : "No se pudo crear."); }
        setBusy(false);
      }}
    >
      <p className="w-full font-bold">🏷️ Crear código de descuento</p>
      <input required value={code} onChange={(e) => setCode(e.target.value.replace(/[^A-Za-z0-9]/g, ""))} placeholder="REGRESO2027" aria-label="Código" className="rounded-xl border bg-background px-3 py-2" />
      <label className="text-sm">% <input type="number" min={1} max={100} value={percent} onChange={(e) => setPercent(Number(e.target.value))} className="w-20 rounded-xl border bg-background px-3 py-2" /></label>
      <select value={audience} onChange={(e) => setAudience(e.target.value as typeof audience)} aria-label="Para quién" className="rounded-xl border bg-background px-3 py-2">
        <option value="todos">Todos</option><option value="estudiante">Estudiantes</option><option value="general">Público general (adultos)</option>
      </select>
      <input type="number" min={1} value={uses} onChange={(e) => setUses(e.target.value)} placeholder="Usos máx. (opcional)" aria-label="Usos máximos" className="w-44 rounded-xl border bg-background px-3 py-2" />
      <button disabled={busy} className="rounded-xl bg-primary px-4 py-2 font-bold text-primary-foreground">{busy ? "Creando…" : "Crear"}</button>
    </form>
  );
}
