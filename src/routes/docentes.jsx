import { IndicatorBank } from "@/components/IndicatorBank";
import { TeacherHub } from "@/components/TeacherHub";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { TeacherAccess } from '@/components/TeacherAccess';

export const Route = createFileRoute("/docentes")({staticData:{sitemap:true},
  head: () => ({ meta { title: "Docentes · Libro imprimible, reportes y registro de alumnos · pracTICAtecnica.com" },
    { name: "description", content: "Herramientas para docentes, registro de alumnos, reportes de rachas, notas y avance." },
    { property: "og:title", content: "Docentes · pracTICAtecnica.com" },
    { property: "og:description", content: "Imprima libros, registre alumnos y vea reportes de clase." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <TeacherAccess><Docentes /></TeacherAccess>,
});

function Docentes() {
  const card = "rounded-2xl border bg-card p-6 shadow-card";
  return (
    <main className="min-h-screen bg-hero">
      <SiteHeader />
      <TeacherHub />
      <IndicatorBank />
      <section className="mx-auto max-w-5xl px-5 pb-16">
        <h1 className="mt-6 text-4xl font-black md:text-5xl">👩‍🏫 Docentes</h1>
        <p className="mt-2 text-muted-foreground">Todo lo necesario para su clase en un solo lugar.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <article className={card}>
            <div className="text-5xl">📚</div>
            <h2 className="mt-2 text-2xl font-black">Libro impreso</h2>
            <p className="mt-2 text-sm text-muted-foreground">Elija el grado y pulse «Imprimir / PDF». Las respuestas se ocultan al imprimir para usarlo como práctica.</p>
            <Link to="/libros" className="mt-4 inline-block rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Abrir libros</Link>
          </article>
          <article className={card}>
            <div className="text-5xl">🧑‍🎓</div>
            <h2 className="mt-2 text-2xl font-black">Registrar alumnos</h2>
            <p className="mt-2 text-sm text-muted-foreground">Agregue alumnos con su correo, materia, nivel y avance. Solo usted ve sus listas.</p>
            <Link to="/estudiantes" className="mt-4 inline-block rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Abrir panel</Link>
          </article>
          <article className={card}>
            <div className="text-5xl">📈</div>
            <h2 className="mt-2 text-2xl font-black">Reportes de clase</h2>
            <p className="mt-2 text-sm text-muted-foreground">Rachas, notas y puntos verificados de cada alumno, más el avance que usted registre.</p>
            <Link to="/estudiantes" className="mt-4 inline-block rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Ver reportes</Link>
          </article>
        </div>
        <div className={`${card} mt-8`}>
          <h2 className="text-xl font-black">Cómo usarlo en clase</h2>
          <ol className="mt-3 ml-5 list-decimal space-y-1 text-sm">
            <li>Imprima el capítulo del día desde Libros.</li>
            <li>Pida a los alumnos practicar en Simulacros o la Ruleta (5 a 10 preguntas).</li>
            <li>Revise en el panel quién necesita refuerzo (nota menor a 70 %).</li>
            <li>Combine autoevaluación, coevaluación y evaluación docente en su rúbrica.</li>
          </ol>
          <p className="mt-3 text-xs text-muted-foreground">Para registrar alumnos debe ingresar con una cuenta autorizada como docente.</p>
        </div>
      </section>
    </main>
  );
}
