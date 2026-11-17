import { useState } from "react";
import { buildBinomio } from "@/lib/binomio";
import { RUBRIC_DESCRIPTORS, RUBRIC_LEVELS } from "@/lib/teaching-rubric";

// Planeamiento automático para cualquier asignatura y nivel
// esperados del programa oficial MEP (uno por línea) y se redactan indicadores, mediación Bloom y evaluación.
export function AutoPlan({ subject, level }) {
  const [text, setText] = useState("");
  const items = text.split("\n").map((s) => s.trim()).filter((s) => s.length > 3).slice(0, 30);
  return (
    <section aria-labelledby="auto-plan" className="my-6 rounded-xl border border-border bg-card p-5">
      <p className="text-xs font-semibold text-accent">Cualquier asignatura · primaria, secundaria o técnica</p>
      <h2 id="auto-plan" className="mt-1 text-2xl font-black">Planeamiento automático</h2>
      <p className="mt-2 text-sm text-muted-foreground print:hidden">Copie del programa oficial MEP los aprendizajes esperados o temas, uno por línea. El planeamiento se redacta al instante con verbos de Bloom; revíselo antes de entregarlo.</p>
      <textarea aria-label="Aprendizajes esperados, uno por línea" value={text} onChange={(e) => setText(e.target.value)} rows={5} placeholder={"Reconocer las fracciones equivalentes\nInterpretar textos narrativos"} className="mt-3 w-full rounded-md border border-input bg-background p-3 print:hidden" />
      {items.map((a, i) => {
        const obj = a.replace(/\.$/, "");
        return (
          <article key={i} className="mt-5 break-inside-avoid border-t border-border pt-4">
            <p className="text-xs font-semibold text-accent">{subject || "Asignatura"} · {level || "Nivel"} · Aprendizaje {i + 1}</p>
            <h3 className="mt-1 text-lg font-bold">{obj}</h3>
            <p className="mt-2 text-sm"><strong>Indicador: </strong>La persona estudiante demuestra «{obj.toLowerCase()}» mediante la resolución de situaciones del entorno.</p>
            {buildBinomio(obj, obj, "un caso guiado presentado en clase", i).map((m) => (
              <div key={m.momento} className="mt-2 grid gap-1 text-sm sm:grid-cols-[8rem_1fr_1fr] sm:gap-3"><p className="font-bold">{m.momento}<span className="block text-xs font-normal capitalize text-accent">{m.nivel}</span></p><p>{m.docente}</p><p>{m.estudiante}</p></div>
            ))}
            <p className="mt-2 text-sm"><strong>Rúbrica: </strong>{RUBRIC_LEVELS.map((l) => `${l}: ${RUBRIC_DESCRIPTORS[l]}`).join(" · ")}</p>
            <p className="mt-1 text-sm"><strong>Trabajo cotidiano: </strong>En grupos, resuelvan un caso de su comunidad aplicando «{obj.toLowerCase()}» y expliquen el procedimiento.</p>
            <p className="mt-1 text-sm"><strong>Tarea: </strong>Elabore un ejemplo propio relacionado con «{obj.toLowerCase()}» y justifique su respuesta.</p>
          </article>
        );
      })}
    </section>
  );
}
