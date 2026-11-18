import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/ingreso")({staticData:{sitemap:false},
  head: () => ({ meta: [{ title: "Ingreso a colegios científicos, humanistas, bilingües y CTP · practicatecnica.com" },
    { name: "description", content: "Prepárese para el ingreso a colegios científicos, humanistas, bilingües, CTP de 7.º y especialidades de 10.º, y liceos académicos." },
    { property: "og:title", content: "Ingreso a colegios · practicatecnica.com" },
    { property: "og:description", content: "Qué estudiar, cómo practicar y simulacros para cada tipo de colegio en Costa Rica." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Ingreso,
});

const TIPOS = [
  { e: "🏫", t: "Liceos y colegios académicos", d: "7.º a 11.º. Matemática, Español, Ciencias, Estudios Sociales, Cívica e Inglés, hasta las pruebas nacionales.", temas: ["Libros 7.º–11.º", "Simulacro de 10.º"] },
  { e: "🔬", t: "Colegios científicos", d: "Ingreso a 10.º. Suelen evaluar razonamiento matemático, ciencias y comprensión lectora.", temas: ["Álgebra y geometría de 9.º", "Biología, química y física básica"] },
  { e: "📜", t: "Colegios humanistas", d: "Ingreso a 10.º. Suelen evaluar comprensión lectora, redacción, razonamiento y cultura general.", temas: ["Textos argumentativos", "Historia de Costa Rica"] },
  { e: "🇬🇧", t: "Colegios y liceos bilingües", d: "Ingreso a 7.º. Suelen incluir comprensión de lectura y escucha en inglés, más Matemática y Español.", temas: ["Inglés: grammar, listening, writing", "Matemática de 6.º"] },
  { e: "🛠️", t: "CTP · ingreso a 7.º", d: "Talleres exploratorios en 7.º, 8.º y 9.º. Suelen pedir notas de 6.º y, en algunos casos, prueba o entrevista.", temas: ["Repaso de 6.º", "Talleres, informática, turismo"] },
  { e: "⚙️", t: "CTP · especialidad en 10.º", d: "Elección de especialidad técnica (10.º a 12.º). Suele considerar notas de 9.º y afinidad con la especialidad.", temas: ["Simulacro de 10.º", "Libro de especialidades CTP"] },
];

function Ingreso() {
  return (
    <main className="min-h-screen bg-hero">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-5 pb-16">
        <h1 className="mt-6 text-4xl font-black md:text-5xl">🎓 Ingreso a colegios</h1>
        <p className="mt-2 text-muted-foreground">Elija el tipo de colegio. Cada institución publica sus propios requisitos y fechas: confírmelos siempre con el colegio.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {TIPOS.map((x) => (
            <article key={x.t} className="rounded-2xl border bg-card p-6 shadow-card">
              <div className="text-5xl">{x.e}</div>
              <h2 className="mt-2 text-2xl font-black">{x.t}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{x.d}</p>
              <ul className="mt-3 ml-5 list-disc text-sm">{x.temas.map((m) => <li key={m}>{m}</li>)}</ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to="/simulacro" className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">⏱️ Simulacro</Link>
                <Link to="/libros" className="rounded-full border px-4 py-2 text-sm font-bold">📚 Libro</Link>
                <Link to="/idiomas" className="rounded-full border px-4 py-2 text-sm font-bold">🗣️ Idiomas</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
