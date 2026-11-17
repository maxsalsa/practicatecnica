import { createServerFn } from "@tanstack/react-start";
import type { Q } from "./questions";
import { canGenerateWithAI } from "./ai-budget";

type In = { topic: string; subject: string; lang: "es" | "en"; count: number };

export const generateQuestions = createServerFn({ method: "POST" })
  .inputValidator((d: In) => {
    const topic = String(d.topic ?? "").trim().slice(0, 500);
    if (topic.length < 3) throw new Error("Describa el tema con más detalle.");
    return {
      topic,
      subject: String(d.subject ?? "General").slice(0, 60),
      lang: d.lang === "en" ? "en" : "es",
      count: Math.min(8, Math.max(3, Number(d.count) || 5))
    } as In;
  })
  .handler(async ({ data }) => {
    if (!canGenerateWithAI()) {
      return {
        error: "Generación con IA pausada para evitar gastos: use los bancos paramétricos integrados.",
        questions: [] as Q[]
      };
    }

    const geminiKey = process.env["GEMINI_API_KEY"];
    if (!geminiKey) {
      return { error: "GEMINI_API_KEY no configurada en el servidor.", questions: [] as Q[] };
    }

    const language =
      data.lang === "en"
        ? "English (clear, natural, correct grammar)"
        : "español de Costa Rica, trato de usted, ortografía y tildes impecables (normas RAE)";

    const prompt = `Diseña ${data.count} preguntas de selección única sobre "${data.topic}" (asignatura: ${data.subject}) en ${language}. Devuelve JSON con estructura {"questions":[{"q":"...","options":["...","...","...","..."],"answer":0,"why":"...","source":"..."}]}.`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const payload = await res.json();
      const rawText = payload?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
      const parsed = JSON.parse(rawText) as { questions?: Q[] };
      const questions = (parsed.questions ?? []).filter(
        (q) => q.options?.length === 4 && q.answer >= 0 && q.answer < 4 && q.q && q.why
      );
      return { error: questions.length ? null : "No se generaron preguntas válidas.", questions };
    } catch (e) {
      console.error("AI generate failed", e);
      return { error: "No se pudo generar la práctica. Intente de nuevo.", questions: [] as Q[] };
    }
  });