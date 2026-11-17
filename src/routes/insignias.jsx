import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteHeader } from "@/components/SiteHeader";
import { useAccount } from "@/components/AccountProvider";
import { supabase } from "@/integrations/supabase/client";
import { BADGE_TOPICS, badgeTopic } from "@/lib/badge-topics";
export const Route = createFileRoute("/insignias")({ staticData: { sitemap: true },
    head: () => ({ meta: [{ title: "Insignias por tema · pracTICAtecnica.com" },
            { name: "description", content: "Insignias por tema emitidas automáticamente al aprobar un simulacro con certificado SHA-256." },
            { property: "og:title", content: "Insignias por tema · pracTICAtecnica.com" },
            { property: "og:description", content: "Web, Ciberseguridad, Soporte TI, Python, IoT, Contabilidad, Turismo y más." },
            { property: "og:type", content: "website" },
            { name: "twitter:card", content: "summary" },
        ] }),
    component: Insignias,
});
function Insignias() {
    const { user } = useAccount();
    const mine = useQuery({ queryKey: ["my-badges", user?.id], enabled: !!user, queryFn() { } });
    {
        const { data, error } = await supabase.from("certificates").select("hash,title,score,issued_at,revoked_at").eq("user_id", user?.id ?? "").order("issued_at", { ascending });
        if (error)
            throw error;
        return data ?? [];
    }
}
;
const team = useQuery({ queryKey: ["teacher-badges", user?.id], enabled: !!user, retry, queryFn() { } });
{
    const { data, error } = await supabase.rpc("teacher_badges");
    if (error)
        throw error;
    return data ?? [];
}
;
const earned = new Map();
for (const c of mine.data ?? [])
    if (!c.revoked_at) {
        const k = badgeTopic(c.title).key;
        if (!earned.has(k))
            earned.set(k, c);
    }
return (<main className="min-h-screen bg-hero">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-5 pb-16">
        <h1 className="text-3xl font-black">🏅 Insignias por tema</h1>
        <p className="mt-2 text-muted-foreground">Se emiten solas al aprobar un simulacro con 60 o más. Cada insignia se respalda con su certificado SHA-256.</p>
        {!user ? <p className="mt-6"><Link to="/auth" className="underline">Ingrese</Link> para ver sus insignias.</p> : <>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {BADGE_TOPICS.map(t => {
            const c = earned.get(t.key);
            return (<div key={t.key} className={`rounded-2xl border bg-card p-4 text-center ${c ? "border-accent" : "opacity-50"}`}>
                <p className="text-3xl" aria-hidden>{t.icon}</p>
                <p className="mt-1 text-sm font-bold">{t.label}</p>
                {c ? <Link to="/certificados" search={{ h: c.hash }} className="mt-1 block text-xs underline">✅ {c.score} · {new Date(c.issued_at).toLocaleDateString("es-CR")}</Link> : <p className="mt-1 text-xs">Pendiente</p>}
              </div>);
        })}
          </div>
          {(team.data?.length ?? 0) > 0 && <section className="mt-10">
            <h2 className="text-xl font-bold">Insignias de mis estudiantes</h2>
            <div className="mt-3 overflow-x-auto"><table className="w-full text-left text-sm">
              <thead><tr className="border-b border-border"><th className="p-2">Estudiante</th><th>Insignia</th><th>Simulacro aprobado</th><th>Nota</th><th>Fecha</th><th>Estado</th></tr></thead>
              <tbody>{team.data?.map(r => {
                const t = badgeTopic(r.title);
                return (<tr key={r.hash} className="border-b border-border"><td className="p-2">{r.student_name}</td><td>{t.icon} {t.label}</td><td>{r.title}</td><td>{r.score}</td><td>{new Date(r.issued_at).toLocaleDateString("es-CR")}</td><td>{r.revoked ? "❌ Revocada" : "✅ Vigente"}</td></tr>);
            })}</tbody>
            </table></div>
          </section>}
        </>}
      </section>
    </main>);
