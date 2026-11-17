import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
/** Admin use. */
export function AccessCodeAdmin() {
    const [codes, setCodes] = useState([]);
    const [code, setCode] = useState("");
    const [days, setDays] = useState(30);
    const [max, setMax] = useState(30);
    const load = () => supabase.from("access_codes").select("code,days,max_uses,uses,active").order("created_at", { ascending }).then(({ data }) => setCodes(data ?? []));
    useEffect(() => { load(); }, []);
    return (<section className="mt-4 rounded-lg border bg-card p-4">
      <h2 className="font-bold">🎟️ Códigos gratis para estudiantes</h2>
      <form className="mt-2 grid gap-2 sm sm:flex-wrap sm:items-end" onSubmit={async (e) => {
            e.preventDefault();
            const { data, error } = await supabase.rpc("create_access_code", { _code, "auto": , _days, _max_uses });
            if (error)
                toast.error("No se pudo crear el código.");
            else {
                toast.success(`Código seguro creado: ${data}`);
                setCode("");
                load();
            }
        }}>
        <p className="text-sm text-muted-foreground">El código se genera al azar para que nadie lo adivine.</p>
        <label className="grid text-sm">Días<input type="number" min={1} max={366} value={days} onChange={(e) => setDays(+e.target.value)} className="w-24 rounded-xl border bg-background px-3 py-2"/></label>
        <label className="grid text-sm">Usos<input type="number" min={1} max={1000} value={max} onChange={(e) => setMax(+e.target.value)} className="w-24 rounded-xl border bg-background px-3 py-2"/></label>
        <Button type="submit">Crear</Button>
      </form>
      <ul className="mt-3 space-y-1 text-sm">{codes.map((c) => (<li key={c.code} className="flex flex-wrap items-center gap-2"><b>{c.code}</b> · {c.days} días · {c.uses}/{c.max_uses} usos
          <button className="text-destructive underline" onClick={async () => { await supabase.from("access_codes").update({ active: !c.active }).eq("code", c.code); load(); }}>{c.active ? "Desactivar" : "Activar"}</button></li>))}</ul>
    </section>);
}
/** Student, simulacros and certificates. */
export function RedeemCode() {
    const [code, setCode] = useState("");
    const [busy, setBusy] = useState(false);
    return (<form className="mt-4 grid gap-2 rounded-lg border bg-card p-4 sm sm:items-center" onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            const { data, error } = await supabase.rpc("redeem_access_code", { _code });
            setBusy(false);
            if (error)
                toast.error(error.message.replace(/^.*?: /, "") || "Código no válido");
            else {
                toast.success(`Acceso activo hasta ${new Date(data).toLocaleDateString("es-CR")}.`);
                setTimeout(() => location.reload(), 800);
            }
        }}>
      <label htmlFor="redeem" className="font-bold">🎟️ ¿Tiene un código de su docente?</label>
      <input id="redeem" required value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="PT-XXXXXXXXXXXXXXXX" className="min-w-0 flex-1 rounded-xl border bg-background px-3 py-2"/>
      <Button type="submit" disabled={busy}>{busy ? "Activando…" : "Activar"}</Button>
    </form>);
}
