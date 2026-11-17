import { useState } from "react";



const bank = [
  { component: "Trabajo cotidiano", text: "Describe los conceptos básicos del tema estudiado a partir de situaciones de su entorno.", levels: ["Menciona conceptos aislados del tema.", "Caracteriza los conceptos con ejemplos generales.", "Describe los conceptos y los relaciona con situaciones de su entorno."] },
  { component: "Trabajo cotidiano", text: "Aplica procedimientos en la resolución de ejercicios propuestos en clase.", levels: ["Identifica los pasos del procedimiento.", "Ejecuta el procedimiento con apoyo.", "Aplica el procedimiento de forma autónoma y verifica el resultado."] },
  { component: "Tareas", text: "Resuelve problemas cotidianos utilizando los saberes trabajados en la lección.", levels: ["Plantea el problema sin resolverlo.", "Resuelve parcialmente el problema.", "Resuelve el problema y justifica la respuesta."] },
  { component: "Tareas", text: "Organiza información relevante sobre el tema mediante esquemas o resúmenes.", levels: ["Enumera datos sin orden.", "Ordena la información de forma parcial.", "Organiza la información de forma jerárquica y coherente."] },
  { component: "Proyecto", text: "Planifica las etapas de un proyecto vinculado con una necesidad de su comunidad.", levels: ["Menciona la necesidad a atender.", "Esboza etapas generales del proyecto.", "Planifica etapas, recursos y tiempos del proyecto."] },
  { component: "Proyecto", text: "Comunica los resultados del proyecto mediante una presentación oral o escrita.", levels: ["Menciona algunos resultados.", "Presenta los resultados con apoyo.", "Comunica los resultados con claridad y argumenta conclusiones."] },
  { component: "Prueba corta", text: "Identifica los elementos principales del contenido evaluado.", levels: ["Reconoce algunos elementos.", "Identifica la mayoría de los elementos.", "Identifica todos los elementos y su función."] },
  { component: "Prueba corta", text: "Resuelve ítems de selección única relacionados con el saber evaluado.", levels: ["Resuelve menos de la mitad de los ítems.", "Resuelve la mayoría de los ítems.", "Resuelve todos los ítems correctamente."] },
];
const comps = ["Trabajo cotidiano", "Tareas", "Proyecto", "Prueba corta"];
const names = ["Inicial", "Intermedio", "Avanzado"];

export function IndicatorBank() {
  const [c, setC] = useState("Trabajo cotidiano");
  const [copied, setCopied] = useState("");
  const copy = (i) => {
    const t = `${i.text}\n${i.levels.map((l, k) => `${names[k]}: ${l}`).join("\n")}`;
    void navigator.clipboard.writeText(t).then(() => setCopied(i.text));
  };
  return (
    <section aria-label="Indicadores de evaluación" className="mx-auto mt-6 max-w-5xl px-5">
      <h2 className="text-xl font-black">Indicadores de evaluación con niveles de desempeño</h2>
      <p className="text-xs text-muted-foreground">Plantillas en formato MEP (verbo + contenido + condición). Ajuste el contenido a su programa de estudio oficial.</p>
      <div role="tablist" className="mt-3 flex flex-wrap gap-2">
        {comps.map((k) => (
          <button key={k} role="tab" aria-selected={c === k} onClick={() => setC(k)} className={`rounded-full border px-3 py-1 text-sm font-bold ${c === k ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`}>{k}</button>
        ))}
      </div>
      <ul className="mt-3 grid gap-3">
        {bank.filter((i) => i.component === c).map((i) => (
          <li key={i.text} className="rounded-2xl border border-border bg-card p-4">
            <p className="font-bold">{i.text}</p>
            <dl className="mt-2 grid gap-1 text-sm sm:grid-cols-3">
              {i.levels.map((l, k) => (<div key={names[k]}><dt className="font-black text-primary">{names[k]}</dt><dd>{l}</dd></div>))}
            </dl>
            <button onClick={() => copy(i)} className="mt-2 rounded-full border border-border px-3 py-1 text-xs font-bold">{copied === i.text ? "✓ Copiado" : "Copiar"}</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

