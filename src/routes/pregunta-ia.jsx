import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LockKeyhole, ReceiptText } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { aiBudget } from "@/lib/ai-budget";
export const Route = createFileRoute("/pregunta-ia")({staticData:{sitemap:false},
  head: () => ({ meta { title: "Mi pregunta a la IA · pracTICAtecnica.com" },
    { name: "description", content: "Prepare su propia pregunta de estudio con control de gasto de IA." },
    { property: "og:title", content: "Mi pregunta a la IA · pracTICAtecnica.com" },
    { property: "og:description", content: "Preguntas de estudio propias y presupuesto de IA controlado." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }), component,
});
function OwnQuestion() {
  const [question, setQuestion] = useState("");
  const [english, setEnglish] = useState(false);
  return <main className="min-h-screen bg-hero"><SiteHeader /><section className="mx-auto max-w-3xl px-5 pb-16">
    <div className="flex justify-end"><select aria-label="Idioma / Language" value={english ? "en" : "es"} onChange={e => setEnglish(e.target.value === "en")} className="rounded-md border bg-background p-2"><option value="es">Español</option><option value="en">English</option></select></div>
    <h1 className="mt-6 text-3xl font-black">{english ? "My question for AI" : "Mi pregunta a la IA"}</h1>
    <label htmlFor="own-question" className="mt-6 block font-bold">{english ? "Your study question" : "Su pregunta de estudio"}</label>
    <textarea id="own-question" value={question} onChange={e => setQuestion(e.target.value)} maxLength={2000} rows={7} placeholder={english ? "Why does water expand when it freezes?" : "¿Por qué el agua se expande al congelarse?"} className="mt-3 w-full rounded-md border bg-background p-3" />
    <p className="mt-2 text-sm text-muted-foreground">{question.length} / 2.000</p>
    <div className="mt-6 border-y py-5 text-sm">
      <p className="font-bold">{english ? "Authorized spending" : "Gasto autorizado"}: {aiBudget.monthlyCredits} {english ? "credits" : "créditos"}</p>
      <p className="mt-3 text-muted-foreground">{english ? "AI is paused until a real spending cap is authorized. Payment approval does not authorize AI spending. No answer has been generated." : "La IA está pausada hasta autorizar un límite real de gasto. La aprobación de pagos no autoriza gasto de IA. No se ha generado una respuesta."}</p>
      <p className="mt-3 text-muted-foreground">{english ? "Do not include personal information about minors." : "No incluya datos personales de menores de edad."}</p>
    </div>
    <Button disabled className="mt-5"><LockKeyhole />{english ? "Generate answer" : "Generar respuesta"}</Button>
    <Button asChild variant="outline" className="mt-5 ml-2"><Link to="/gastos-ia"><ReceiptText />{english ? "My AI spending" : "Mis gastos de IA"}</Link></Button>
  </section></main>;
}