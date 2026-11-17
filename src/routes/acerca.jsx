import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/acerca")({staticData:{sitemap:true},
  head: () => ({
    meta { title: "Acerca de y pagos · pracTICAtecnica.com" },
      { name: "description", content: "Quiénes somos, planes anuales y cómo pagar por SINPE Móvil en pracTICAtecnica.com." },
      { property: "og:title", content: "Acerca de y pagos · pracTICAtecnica.com" },
      { property: "og:description", content: "Planes anuales ₡2.500, Público General ₡3.500 e instituciones ₡10.000. SINPE Móvil o PayPal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component,
});

const wa = "https://api.whatsapp.com/send?phone=50660906359&text=" + encodeURIComponent("Hola, realicé un pago SINPE en pracTICAtecnica.com y deseo activar mi plan.");

function Acerca() {
  return (
    <main className="min-h-screen bg-hero">
      <SiteHeader />
      <section className="mx-auto max-w-3xl space-y-8 px-5 pb-16">
        <header>
          <p className="text-sm font-semibold text-primary">Acerca de</p>
          <h1 className="mt-2 text-4xl font-black">Repase. Practique. Prepárese.</h1>
          <p className="mt-3 text-muted-foreground">
            pracTICAtecnica.com es una plataforma independiente de preparación para pruebas MEP, admisión universitaria, CTP y MOPT.
            Desarrollado por <strong className="text-foreground">GICM Desarrollo de Sistemas Digitales y Constructivos ICM</strong>. Sin afiliación oficial al MEP ni al MOPT.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          {[["Estudiantes", "₡2.500"], ["Con colegio afiliado", "₡1.000"], ["Público general", "₡3.500"], ["Institución", "₡10.000"]].map(([n, p]) => (
            <article key={n} className="rounded-2xl border bg-card p-6">
              <h2 className="font-bold">{n}</h2>
              <p className="mt-2 text-4xl font-black text-primary">{p}</p>
              <p className="text-sm text-muted-foreground">por año</p>
            </article>
          ))}
        </div>

        <article className="rounded-2xl border bg-card p-6">
          <h2 className="text-2xl font-extrabold">Cómo pagar por SINPE Móvil</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5">
            <li>Abra la aplicación de su banco y elija SINPE Móvil.</li>
            <li>Número: <strong>6090 6359</strong> · Titular Sánchez</strong> (Banco Popular).</li>
            <li>Monto según su plan. En el detalle escriba: <strong>.</strong></li>
            <li>Envíe el comprobante por WhatsApp con el correo de su cuenta.</li>
          </ol>
          <a href={wa} target="_top" rel="noreferrer" className="mt-5 inline-flex rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground">
            Enviar comprobante por WhatsApp
          </a>
        </article>

        <article className="rounded-2xl border bg-card p-6">
          <h2 className="text-xl font-extrabold">Tarjeta y PayPal</h2>
          <p className="mt-2 text-sm text-muted-foreground">Disponible en la página Planes al ingresar a su cuenta. Se cobra un monto fijo en dólares (US$4,99 estudiante, US$1,99 con colegio afiliado, US$6,99 público general/docente, US$19,99 institución).</p>
          <Link to="/pagos" className="mt-3 inline-block font-bold text-primary underline">Activar mi plan</Link>
        </article>
        <article id="gicm" className="rounded-2xl border border-primary bg-card p-6 shadow-card">
          <p className="text-xs font-bold tracking-widest text-accent">QUIÉNES SOMOS</p>
          <h2 className="mt-1 text-2xl font-extrabold">GICM Desarrollo de Sistemas Digitales y Constructivos ICM</h2>
          <p className="mt-3 text-sm">pracTICAtecnica.com es una plataforma costarricense de preparación independiente, creada para que estudiantes, familias y docentes repasen, practiquen y se preparen con información clara y verificable.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-muted p-4"><p className="text-3xl">👨‍🏫</p><p className="mt-1 font-black">Max Salazar Sánchez</p><p className="text-sm text-muted-foreground">Fundador y director educativo</p></div>
            <div className="rounded-xl bg-muted p-4"><p className="text-3xl">👨‍💻</p><p className="mt-1 font-black">Steven Corrales</p><p className="text-sm text-muted-foreground">Cofundador y docente</p></div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Preparación independiente, sin afiliación oficial al MEP, al MOPT ni a las universidades.</p>
          <Link to="/contacto" className="mt-4 inline-flex rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground">Contáctenos</Link>
        </article>
      </section>
    </main>
  );
}
