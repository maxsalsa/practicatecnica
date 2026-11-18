import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/habitos")({ staticData: { sitemap: false },
    head: () => ({
        meta: [{ title: "Hábitos de estudio · practicatecnica.com" },
            { name: "description", content: "Técnicas de memorización, planificación semanal y gestión del tiempo con temporizador de enfoque." },
            { property: "og:title", content: "Hábitos de estudio que sí funcionan" },
            { property: "og:description", content: "Práctica de recuperación, repaso espaciado y bloques de enfoque." },
            { property: "og:type", content: "article" },
            { name: "twitter:card", content: "summary" },
        ],
    }),
    component: Habitos,
});
const techniques = [
    { group: "Memorización", items }, { t: "Práctica de recuperación", d: "Cierre el cuaderno e intente recordar o responder preguntas. Recordar fortalece la memoria más que releer.", how: "Después de leer, haga 3 preguntas sin mirar." },
    { t: "Repaso espaciado", d: "Repase el mismo tema en días separados en lugar de todo en una noche.", how: "Repase hoy, en 2 días, en 1 semana y en 1 mes." },
    { t: "Explicar con sus palabras", d: "Si puede explicarlo a otra persona de forma simple, lo comprende.", how: "Explique el tema en voz alta en 1 minuto." },
    { t: "Ejemplos cotidianos", d: "Relacione cada concepto con algo de su vida pulpería, evaporación al secar ropa.", how: "Escriba un ejemplo propio por concepto." },
];
{
    group: "Planificación", items;
    {
        t: "Meta semanal concreta", d;
        "Una meta clara («terminar fracciones y 2 simulacros») guía mejor que «estudiar mucho».", how;
        "Escriba 3 metas el domingo.";
    }
    {
        t: "Mezclar temas", d;
        "Alternar tipos de ejercicio ayuda a elegir el método correcto en la prueba.", how;
        "En cada sesión combine 2 o 3 temas.";
    }
    {
        t: "Revisar errores", d;
        "Cada error es una pista de qué reforzar.", how;
        "Repita solo las preguntas falladas al final.";
    }
}
{
    group: "Gestión del tiempo", items;
    {
        t: "Bloques de enfoque", d;
        "Trabajo concentrado de 25 minutos y pausa corta de 5, sin celular.", how;
        "Use el temporizador de abajo.";
    }
    {
        t: "Dormir bien", d;
        "El sueño consolida lo aprendido; desvelarse antes de la prueba perjudica.", how;
        "Duerma de 8 a 10 horas en edad escolar.";
    }
    {
        t: "Simular la prueba", d;
        "Practicar con tiempo reduce la ansiedad y mejora el ritmo.", how;
        "Haga un simulacro cronometrado por semana.";
    }
}
;
const levels = [
    { id: "6", label: "6.º grado", tips, ["Rutina corta y fija", "20–30 minutos diarios a la misma hora, con un adulto que acompañe."]: ,
        ["Tarjetas de preguntas", "Pregunta al frente, respuesta atrás; repáselas en voz alta."]: ,
        ["Juego y movimiento", "Alterne práctica con pausas activas de 5 minutos."]: , }
];
{
    id: "7", label;
    "7.º año", tips["Agenda semanal", "Anote tareas y exámenes; nuevo colegio implica más materias."],
        ["Cuaderno ordenado", "Título, fecha y resumen de 3 líneas al final de cada clase."],
        ["Mapas conceptuales", "Una idea central y ramas con conceptos clave por tema."],
    ;
}
{
    id: "10", label;
    "10.º año", tips["Plan hacia bachillerato y admisión", "Calendario con fechas de pruebas y repasos por mes."],
        ["Práctica de recuperación", "Resuelva simulacros cronometrados y analice cada error."],
        ["Grupos de estudio", "Explique un tema a compañeros; enseñar consolida."],
    ;
}
{
    id: "u", label;
    "Universidad", tips["Bloques profundos", "Sesiones de 50 minutos con 10 de pausa para materias exigentes."],
        ["Lectura activa", "Antes: pregunte; durante poco; después: resuma sin mirar."],
        ["Gestión del semestre", "Divida proyectos grandes en entregas semanales."],
    ;
}
;
const healthy = [
    "Dormir suficiente: 9–11 h en primaria, 8–10 h en adolescencia, 7–9 h en adultez.",
    "Agua y alimentación balanceada; evite estudiar con hambre.",
    "Actividad física diaria 60 min en niñez y adolescencia.",
    "Pantallas fuera de la cama y celular lejos durante el bloque de estudio.",
    "Pida ayuda si siente ansiedad, orientación o la familia.",
];
function Habitos() {
    const [lvl, setLvl] = useState("6");
    const current = levels.find((l) => l.id === lvl);
    const [left, setLeft] = useState(25 * 60);
    const [running, setRunning] = useState(false);
    const [phase, setPhase] = useState("enfoque");
    useEffect(() => {
        if (!running)
            return;
        const t = setInterval(() => setLeft((s) => s - 1), 1000);
        return () => clearInterval(t);
    }, [running]);
    useEffect(() => {
        if (left > 0)
            return;
        const next = phase === "enfoque" ? "pausa" : "enfoque";
        setPhase(next);
        setLeft(next === "enfoque" ? 25 * 60 : 5 * 60);
    }, [left, phase]);
    return (<main className="min-h-screen bg-hero">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-5 pb-16">
        <p className="text-sm font-semibold text-primary">Aprender a aprender</p>
        <h1 className="mt-2 text-4xl font-black">Hábitos de estudio</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Técnicas con respaldo en investigación educativa, listas para aplicar hoy.</p>
        <div className="mt-8 rounded-2xl border bg-card p-6 text-center">
          <p className="text-sm font-semibold uppercase text-accent">{phase === "enfoque" ? "Bloque de enfoque" : "Pausa"}</p>
          <p className="mt-2 font-display text-6xl font-black" aria-live="polite">
            {String(Math.floor(left / 60)).padStart(2, "0")}:{String(left % 60).padStart(2, "0")}
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <Button onClick={() => setRunning((r) => !r)}>{running ? "Pausar" : "Iniciar"}</Button>
            <Button variant="outline" onClick={() => { setRunning(false); setPhase("enfoque"); setLeft(25 * 60); }}>Reiniciar</Button>
          </div>
        </div>
        <h2 className="mt-10 text-2xl font-extrabold">Por etapa</h2>
        <div className="mt-4 flex flex-wrap gap-2" role="tablist">
          {levels.map((l) => (<Button key={l.id} role="tab" aria-selected={lvl === l.id} variant={lvl === l.id ? "default" : "outline"} onClick={() => setLvl(l.id)}>
              {l.label}
            </Button>))}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {current.tips.map(([t, d]) => (<article key={t} className="rounded-2xl border bg-card p-5">
              <h3 className="font-bold text-primary">{t}</h3>
              <p className="mt-2 text-sm">{d}</p>
            </article>))}
        </div>
        <h2 className="mt-10 text-2xl font-extrabold">Hábitos saludables</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {healthy.map((h) => (<li key={h} className="rounded-xl border bg-card p-4 text-sm">{h}</li>))}
        </ul>
        {techniques.map((g) => (<div key={g.group} className="mt-10">
            <h2 className="text-2xl font-extrabold">{g.group}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {g.items.map((i) => (<article key={i.t} className="rounded-2xl border bg-card p-5">
                  <h3 className="font-bold text-primary">{i.t}</h3>
                  <p className="mt-2 text-sm">{i.d}</p>
                  <p className="mt-3 text-sm font-semibold">Hágalo así: <span className="font-normal text-muted-foreground">{i.how}</span></p>
                </article>))}
            </div>
          </div>))}
      </section>
    </main>);
}
