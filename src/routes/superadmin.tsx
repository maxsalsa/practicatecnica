import { DiscountBox } from "@/components/DiscountBox";
import { InviteBox } from "@/components/InviteBox";
import { AccessCodeAdmin } from "@/components/AccessCodeBox";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { useAccount } from "@/components/AccountProvider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { getAdminTrace } from "@/lib/admin-trace.functions";
import { emptyTrace, paymentSummary } from "@/lib/admin-trace";
import { getPaddleEnvironment } from "@/lib/paddle";
import { AdminUserDetails } from "@/components/AdminUserDetails";
import { AccountRoleCorrection } from '@/components/AccountRoleCorrection';

export const Route = createFileRoute("/superadmin")({staticData:{sitemap:false},
  head: () => ({
    meta: [
      { title: "SuperAdmin · pracTICAtecnica.com" },
      { name: "description", content: "Trazabilidad de usuarios, pagos, avance y visitas." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "SuperAdmin pracTICAtecnica" },
      { property: "og:description", content: "Panel interno de control." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SuperAdmin,
});

type U = { user_id: string; email: string; display_name: string; created_at: string; last_sign_in: string | null; xp: number; attempts: number; avg_score: number | null; paid_plan: string | null; paid_until: string | null; status: string };
const ST: Record<string, string> = { active: "🟢 Activo", gift: "🎁 Cortesía", inactive: "⏸️ Inactivo", blocked: "⛔ Bloqueado" };
const d = (s: string | null) => (s ? new Date(s).toLocaleString("es-CR", {timeZone:'America/Costa_Rica',dateStyle:'medium',timeStyle:'short'}) : "—");

function SuperAdmin() {
  const { user } = useAccount();
  const [admin, setAdmin] = useState<boolean | null>(null);
  const [rows, setRows] = useState<U[]>([]);
  const [visits, setVisits] = useState({ today: 0, week: 0, total: 0, top: [] as [string, number][] });
  const [q, setQ] = useState("");
  const [f, setF] = useState("all");
  const [trace,setTrace] = useState(emptyTrace);
  const traceFn=useServerFn(getAdminTrace);

  async function load() {
    try {setTrace(await traceFn({data:{environment:getPaddleEnvironment()}}));}
    catch {toast.error("No se pudo cargar pagos y documentos.");}
    const { data, error } = await supabase.rpc("admin_user_overview");
    if (error) toast.error("No se pudo cargar usuarios");
    setRows((data as U[]) ?? []);
    const since = new Date(Date.now() - 7 * 864e5).toISOString();
    const day = new Date(); day.setHours(0, 0, 0, 0);
    const [{ count: total }, { data: wk }] = await Promise.all([
      supabase.from("page_visits").select("id", { count: "exact", head: true }),
      supabase.from("page_visits").select("path,created_at").gte("created_at", since).limit(5000),
    ]);
    const list = wk ?? [];
    const m = new Map<string, number>();
    list.forEach((v) => m.set(v.path, (m.get(v.path) ?? 0) + 1));
    setVisits({ total: total ?? 0, week: list.length, today: list.filter((v) => new Date(v.created_at) >= day).length, top: [...m].sort((a, b) => b[1] - a[1]).slice(0, 6) });
  }
  useEffect(() => {
    if (!user) { setAdmin(false); return; }
    supabase.rpc("has_role", { _user_id: user.id, _role: "admin" }).then(({ data }) => { setAdmin(!!data); if (data) load(); });
  }, [user?.id]);

  async function setStatus(id: string, status: string) {
    if(!user) return;
    const { error } = await supabase.from("account_status").upsert({ user_id: id, status, updated_by: user.id, updated_at: new Date().toISOString() });
    if (error) { toast.error("No se pudo cambiar"); return; }
    toast.success(`Estado: ${ST[status]}`);
    setRows((r) => r.map((x) => (x.user_id === id ? { ...x, status } : x)));
    await load();
  }

  const shown = useMemo(() => rows.filter((r) => (f === "all" || (f === "paid" ? paymentSummary(r.user_id,trace).active : f === "document" ? trace.documents.some(d=>d.name.startsWith(`${r.user_id}/`)) : r.status === f)) && (r.email + r.display_name).toLowerCase().includes(q.toLowerCase())), [rows, q, f,trace]);
  const k = { users: rows.length, paid: rows.filter((r) => paymentSummary(r.user_id,trace).active).length, active7: new Set(trace.activity.filter(a=>Date.now()-Date.parse(a.day)<7*864e5).map(a=>a.user_id)).size, blocked: rows.filter((r) => r.status === "blocked").length };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl p-4">
        <h1 className="text-3xl font-black">🛡️ SuperAdmin</h1>
        {admin === null && <p className="mt-4">Verificando acceso…</p>}
        {admin === false && <p className="mt-4 text-muted-foreground">Acceso solo para administradores. Inicie sesión con su cuenta autorizada.</p>}
        {admin && (
          <>
            <InviteBox />
            <DiscountBox />
            <AccessCodeAdmin />
            <section className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[["👥 Registrados", k.users], ["💳 Pagaron", k.paid], ["🔥 Activos 7 días", k.active7], ["⛔ Bloqueados", k.blocked], ["👁️ Visitas hoy", visits.today], ["📅 Visitas 7 días", visits.week], ["🌐 Visitas totales", visits.total]].map(([l, v]) => (
                <div key={l as string} className="rounded-2xl border border-border bg-card p-4"><p className="text-sm text-muted-foreground">{l}</p><p className="text-2xl font-black">{v}</p></div>
              ))}
              <div className="rounded-2xl border border-border bg-card p-4 text-sm"><p className="text-muted-foreground">Páginas más vistas (7 días)</p>{visits.top.map(([p, n]) => <p key={p}>{p} · {n}</p>)}</div>
            </section>
            <div className="mt-6 flex flex-wrap gap-2">
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar correo o nombre" className="min-w-0 flex-1 rounded-xl border border-border bg-card px-3 py-2" />
              <select value={f} onChange={(e) => setF(e.target.value)} className="rounded-xl border border-border bg-card px-3 py-2">
                <option value="all">Todos</option><option value="paid">Pago vigente</option><option value="document">Con documento</option><option value="active">Activos</option><option value="gift">Cortesía</option><option value="inactive">Inactivos</option><option value="blocked">Bloqueados</option>
              </select>
              <Button variant="outline" onClick={load}>↻ Actualizar</Button>
            </div>
            <div className="mt-4 grid gap-3">
              {shown.map((r) => (
                <article key={r.user_id} className="min-w-0 rounded-lg border border-border bg-card p-4">
                  <div className="flex flex-wrap justify-between gap-2">
                    <div className="min-w-0"><p className="break-words font-bold">{r.display_name || "Sin nombre"} · <span className="break-all font-normal text-muted-foreground">{r.email}</span></p>
                      <p className="text-sm text-muted-foreground">Registro {d(r.created_at)} · Último ingreso {d(r.last_sign_in)}</p></div>
                    <span className="font-bold">{ST[r.status] ?? r.status}</span>
                  </div>
                  <p className="mt-2 text-sm">⭐ {r.xp} XP · 📝 {r.attempts} prácticas · Nota promedio {r.avg_score ?? "—"}</p>
                  <p className="mt-2 text-sm font-semibold">💳 {paymentSummary(r.user_id,trace).label} · Hasta {d(paymentSummary(r.user_id,trace).until)}</p>
                  <p className="mt-1 text-sm">🪪 {trace.documents.some(doc=>doc.name.startsWith(`${r.user_id}/`))?'Documento subido · pendiente de revisión':'Sin carné ni libro subido'}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => setStatus(r.user_id, "active")}>Activar</Button>
                    <Button size="sm" variant="outline" onClick={() => setStatus(r.user_id, "gift")}>Regalar cuenta</Button>
                    <Button size="sm" variant="outline" disabled={r.user_id===user?.id} onClick={() => confirm("¿Desactivar el acceso de esta cuenta?") && setStatus(r.user_id, "inactive")}>Desactivar</Button>
                    <Button size="sm" variant="destructive" disabled={r.user_id === user?.id} onClick={() => confirm("¿Bloquear esta cuenta?") && setStatus(r.user_id, "blocked")}>Bloquear</Button>
                  </div>
                  <AdminUserDetails id={r.user_id} email={r.email} trace={trace} reload={load}/>
                  <AccountRoleCorrection userId={r.user_id} onChanged={() => void load()} />
                </article>
              ))}
              {!shown.length && <p className="text-muted-foreground">Sin resultados.</p>}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
