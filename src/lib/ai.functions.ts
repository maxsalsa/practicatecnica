import { createServerFn } from "@tanstack/react-start";
import type { Q } from "./questions";
import { canGenerateWithAI } from "./ai-budget";

type In = { topic: string; subject: string; lang: "es" | "en"; count: number };

const schema = {
  type: "object",
  additionalProperties: false,
  required: ["questions"],
  properties: {
    questions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["q", "options", "answer", "why", "source"],
        properties: {
          q: { type: "string" },
          options: { type: "array", items: { type: "string" } },
          answer: { type: "integer" },
          why: { type: "string" },
          source: { type: "string" },
        },
      },
    },
  },
};

export const generateQuestions = createServerFn({ method: "POST" })
  .inputValidator((d: In) => {
    const topic = String(d.topic ?? "").trim().slice(0, 500);
    if (topic.length < 3) throw new Error("Describa el tema con más detalle.");
    return {
      topic,
      subject: String(d.subject ?? "General").slice(0, 60),
      lang: d.lang === "en" ? "en" : "es",
      count: Math.min(8, Math.max(3, Number(d.count) || 5)),
    } as In;
  })
  .handler(async ({ data }) => {
    if (!canGenerateWithAI()) return { error: "Generación con IA pausada para evitar gastos: falta un límite de cobertura gratuita verificado.", questions: [] as Q[] };
    const { generateResponse, GatewayError } = await import("@lovable.dev/ai-gateway");
    const { decks } = await import("./questions.bank");
    const language = data.lang === "en" ? "English (clear, natural, correct grammar)" : "español de Costa Rica, trato de usted, ortografía y tildes impecables (normas RAE)";
    const prompt = `Eres un diseñador experto de ítems de evaluación para estudiantes costarricenses (MEP, CTP, admisión UCR/TEC, MOPT).
Genera ${data.count} preguntas de selección única sobre: "${data.topic}" (asignatura: ${data.subject}).
Materiales del sitio (úsalos como base de contenido, nivel, estilo y fuentes; amplía con conocimiento verificado del mismo nivel):
${decks.map((d) => `## ${d.title}\n` + d.questions.map((x) => `- ${x.q} → ${x.options[x.answer]} (${x.why} Fuente: ${x.source})`).join("\n")).join("\n")}
Reglas de calidad:
- Idioma: ${language}.
- Exactamente 4 opciones plausibles, una sola correcta, sin "todas las anteriores".
- "answer" es el índice 0-3 de la correcta; varía su posición.
- Dificultad progresiva (de recordar a aplicar/analizar).
- "why": explicación pedagógica breve de por qué es correcta y por qué las otras no.
- "source": referencia real y general (p. ej. "Ley 9078", "Programa MEP Matemática", "RAE"). No inventes artículos específicos si no estás seguro.
- Verifica cada dato antes de responder; si un dato es dudoso, no lo uses.
Devuelve solo JSON válido según el esquema.`;
    try {
      const res = await generateResponse({
        model: "openai/gpt-6-astra",
        input: [{ role: "user", content: prompt }],
        text: { format: { type: "json_schema", name: "quiz", strict: true, schema } },
      });
      const out = res as unknown as { output?: { content?: { type?: string; text?: string }[] }[] };
      const text = (out.output ?? []).flatMap((o) => o.content ?? []).map((c) => c.text ?? "").join("");
      const parsed = JSON.parse(text) as { questions: Q[] };
      const questions = parsed.questions.filter(
        (q) => q.options?.length === 4 && q.answer >= 0 && q.answer < 4 && q.q && q.why,
      );
      if (!questions.length) return { error: "No se generaron preguntas válidas. Intente de nuevo.", questions: [] as Q[] };
      return { error: null, questions };
    } catch (e) {
      console.error("AI generate failed", e);
      if (e instanceof GatewayError && e.httpStatus === 429) return { error: "Demasiadas solicitudes; espere un momento.", questions: [] as Q[] };
      if (e instanceof GatewayError && e.httpStatus === 402) return { error: "Créditos de IA agotados.", questions: [] as Q[] };
      return { error: "No se pudo generar la práctica. Intente de nuevo.", questions: [] as Q[] };
    }
  });
