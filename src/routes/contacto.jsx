import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

const EMAIL = "maxi.salsa@gmail.com";
const WA = "https://wa.me/50660906359?text=" + encodeURIComponent("Hola, les escribo desde pracTICAtecnica.com. Deseo información para mi familia o colegio.");

export const Route = createFileRoute("/contacto")({staticData:{sitemap:true},
  head: () => ({
    meta: [{ title: "Contacto | pracTICAtecnica.com" },
      { name: "description", content: "Contacte a GICM por WhatsApp o correo, colegios y docentes." },
      { property: "og:title", content: "Contacto | pracTICAtecnica.com" },
      { property: "og:description", content: "WhatsApp y correo de GICM para familias y colegios." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  return (
    <main className="min-h-screen bg-hero">
      <SiteHeader />
      <section className="mx-auto max-w-3xl space-y-5 px-5 pb-16">
        <h1 className="mt-6 text-4xl font-black">Contáctenos</h1>
        <p className="text-muted-foreground">Familias, colegios y docentes atendemos. GICM Desarrollo de Sistemas Digitales y Constructivos ICM.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <a href={WA} target="_top" rel="noreferrer" className="rounded-2xl border bg-card p-6 shadow-card hover:border-primary">
            <p className="text-4xl">💬</p><h2 className="mt-2 text-xl font-black">WhatsApp</h2><p className="mt-1 font-bold text-primary">+506 6090 6359</p><p className="text-sm text-muted-foreground">Max Salazar Sánchez · Solo SINPE Móvil y WhatsApp. No llamadas.</p>
          </a>
          <a href={`mailto:${EMAIL}`} className="rounded-2xl border bg-card p-6 shadow-card hover:border-primary">
            <p className="text-4xl">✉️</p><h2 className="mt-2 text-xl font-black">Correo</h2><p className="mt-1 break-all font-bold text-primary">{EMAIL}</p><p className="text-sm text-muted-foreground">Respuesta en horario hábil</p>
          </a>
        </div>
        <p className="text-xs text-muted-foreground">Preparación independiente, sin afiliación oficial.</p>
      </section>
    </main>
  );
}
