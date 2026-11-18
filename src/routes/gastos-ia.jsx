import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { MyAIHistory } from "@/components/MyAIHistory";
export const Route = createFileRoute("/gastos-ia")({staticData:{sitemap:false},
  head: () => ({ meta: [{ title: "Mis gastos de IA · practicatecnica.com" },
    { name: "description", content: "Su historial privado de preguntas, respuestas, modelo y créditos de IA confirmados." },
    { property: "og:title", content: "Mis gastos de IA · practicatecnica.com" },
    { property: "og:description", content: "Consulte sus generaciones y gasto confirmado de IA." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: () => <main className="min-h-screen bg-hero"><SiteHeader /><div className="mx-auto max-w-3xl px-5 pb-16"><MyAIHistory title="Mis gastos de IA" /></div></main>,
});