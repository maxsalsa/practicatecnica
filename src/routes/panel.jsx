import { createFileRoute, Link } from "@tanstack/react-router";
import { Progress } from "@/components/Progress";
import { SiteHeader } from "@/components/SiteHeader";
import { MyAIHistory } from "@/components/MyAIHistory";

export const Route = createFileRoute("/panel")({staticData:{sitemap:false},
  head: () => ({
    meta: [{ title: "Mi panel · pracTICAtecnica.com" },
      { name: "description", content: "Su avance, liga, habilidades completadas y oportunidades de mejora." },
      { property: "og:title", content: "Mi panel · pracTICAtecnica.com" },
      { property: "og:description", content: "Control de prácticas, simulacros y preguntas generadas con IA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Panel,
});

function Panel() {
  return (
    <main className="min-h-screen bg-hero">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-5 pb-16"><h1 className="sr-only">Panel de progreso del estudiante</h1>
        <MyAIHistory />
        <Progress empty={<div className="mt-10 rounded-2xl border bg-card p-8 text-center">
          <p className="text-lg font-semibold">Aún no tiene prácticas registradas.</p>
          <Link to="/" className="mt-4 inline-block rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground">Comenzar una práctica →</Link>
        </div>} />
      </section>
    </main>
  );
}
