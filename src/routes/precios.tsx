import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { ANNUAL_PRICES_CRC, PLAN_LABELS, PLAN_NOTES, formatCrc, type AnnualPlan } from "@/lib/pricing";

export const Route = createFileRoute("/precios")({staticData:{sitemap:true},
  head: () => ({
    meta: [
      { title: "Precios oficiales · pracTICAtecnica.com" },
      { name: "description", content: "Planes anuales: estudiantes ₡2.500 (₡1.000 con colegio afiliado), público general y docentes ₡3.500, instituciones ₡10.000. SINPE Móvil o PayPal." },
      { property: "og:title", content: "Precios oficiales · pracTICAtecnica.com" },
      { property: "og:description", content: "Un pago anual incluye todas las materias, simulacros y certificados. Instituciones: ₡10.000 por año." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Precios,
});

const INSTITUTION_INCLUDES = ["Logo propio de la institución", "Avisos para personal y estudiantes con confirmación de lectura", "Solicitudes de permisos del personal con comprobante privado", "Acceso del personal verificado", "Descuento estudiantil a ₡1.000 por año"];
const INCLUDES = ["Todas las materias de primaria, secundaria y CTP", "Inglés Técnico CTP", "Admisión UCR, TEC, UNA y UTN", "Prácticas guiadas y simulacros con reloj", "Certificados verificables con SHA-256"];

function Precios() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-4xl font-black">Precios oficiales</h1>
        <p className="mt-2 text-muted-foreground">Un solo pago al año incluye todas las materias. Sin cobros por materia.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(Object.keys(ANNUAL_PRICES_CRC) as AnnualPlan[]).map((id) => (
            <div key={id} className={`rounded-2xl border bg-card p-6 shadow-card ${id === 'institucion' ? 'border-accent' : 'border-border'}`}>
              <h2 className="text-xl font-extrabold">{PLAN_LABELS[id]}</h2>
              <p className="mt-2 text-4xl font-black text-primary">{formatCrc(ANNUAL_PRICES_CRC[id])}<span className="text-base font-semibold text-muted-foreground"> /año</span></p>
              <p className="mt-2 text-sm text-muted-foreground">{PLAN_NOTES[id]}</p>
              <ul className="mt-4 space-y-1 text-sm">{(id === 'institucion' ? INSTITUTION_INCLUDES : INCLUDES).map((i) => <li key={i}>✓ {i}</li>)}</ul>
              <div className="mt-6 grid gap-2">
                <Link to="/pagos" className="rounded-full bg-primary px-4 py-2 text-center font-bold text-primary-foreground">Pagar con SINPE Móvil</Link>
                <Link to="/pagos" className="rounded-full border border-border px-4 py-2 text-center font-bold">Pagar con PayPal o tarjeta</Link>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">SINPE Móvil: 6090 6359 · Max Salazar Sánchez · Banco Popular. El descuento de ₡1.000 requiere que su colegio tenga plan institucional vigente y que administración verifique su matrícula. ¿Tiene un código de su docente? Canjéelo en Pagos.</p>
      </main>
    </div>
  );
}
