import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { generateQuestions } from "@/lib/ai.functions";
import type { Deck } from "@/lib/questions";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const subjects = ["Matemática", "Español", "Inglés", "Ciencias", "Estudios Sociales", "Desarrollo de Software", "Contabilidad", "Electrónica", "Turismo", "Manejo (MOPT)"];

export function AiPractice({ onStart }: { onStart: (d: Deck) => void }) {
  const gen = useServerFn(generateQuestions);
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState(subjects[0] ?? "Matemática");
  const [lang, setLang] = useState<"es" | "en">("es");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setLoading(true); setError(null);
    try {
      const r = await gen({ data: { topic, subject, lang, count: 5 } });
      if (r.error) setError(r.error);
      else { onStart({ id: `ia-${subject}`, title: `IA · ${subject}`, emoji: "✨", level: topic.slice(0, 40), questions: r.questions }); }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error inesperado.");
    } finally { setLoading(false); }
  };

  return (
    <section className="mt-14 rounded-3xl border border-primary bg-card p-6 shadow-card md:p-8">
      <span className="rounded-full bg-accent px-3 py-1 text-xs font-extrabold text-accent-foreground">NUEVO · IA</span>
      <h2 className="mt-3 text-3xl font-black">Practique su propia duda</h2>
      <Button asChild variant="outline" className="mt-4"><Link to="/pdf-preguntas">📄 Preguntas desde PDF</Link></Button>
      <Button asChild variant="outline" className="ml-3 mt-4"><Link to="/generador">Generador por materia</Link></Button>
      <p className="mt-1 text-muted-foreground">Describa un tema o una duda y le crearemos preguntas con respuestas explicadas.</p>
      <textarea value={topic} onChange={(e) => setTopic(e.target.value)} maxLength={500} rows={3}
        placeholder="Ej.: No entiendo cuándo se usa tilde en las palabras agudas"
        className="mt-4 w-full rounded-xl border bg-background p-3 outline-none focus:border-primary" />
      <div className="mt-3 flex flex-wrap gap-3">
        <select value={subject} onChange={(e) => setSubject(e.target.value)} className="rounded-xl border bg-background px-3 py-2">
          {subjects.map((s) => <option key={s}>{s}</option>)}
        </select>
        <div className="flex overflow-hidden rounded-xl border">
          {(["es", "en"] as const).map((l) => (
            <button key={l} onClick={() => setLang(l)} className={`px-4 py-2 font-semibold ${lang === l ? "bg-primary text-primary-foreground" : ""}`}>
              {l === "es" ? "Español" : "English"}
            </button>
          ))}
        </div>
        <button disabled={loading || topic.trim().length < 3} onClick={submit}
          className="ml-auto rounded-full bg-primary px-6 py-2 font-bold text-primary-foreground disabled:opacity-50">
          {loading ? "Generando…" : "Generar práctica ✨"}
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      <p className="mt-3 text-xs text-muted-foreground">Contenido generado por IA: revise la fuente indicada en cada respuesta.</p>
    </section>
  );
}
