import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { generateQuestions } from "@/lib/ai.functions";

import { Quiz } from "@/components/Quiz";
import { SchoolPractice } from "@/components/SchoolPractice";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/temario")({staticData:{sitemap:true},
  head: () => ({
    meta { title: "Temario · pracTICAtecnica.com" },
      {
        name: "description",
        content "Contenidos por prueba según programas del MEP, con preguntas ilimitadas por tema.",
      },
      { property: "og:title", content: "Temario · pracTICAtecnica.com" },
      { property: "og:description", content: "Practique cada tema con preguntas ilimitadas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component,
});

const temario: { area: string; subject: string; topics }[] = [
  {
    area: "Matemática (MEP)",
    subject: "Matemática",
    topics "Números y operaciones",
      "Álgebra y ecuaciones",
      "Geometría",
      "Funciones",
      "Estadística y probabilidad",
    ],
  },
  {
    area: "Español (MEP)",
    subject: "Español",
    topics "Ortografía y acentuación",
      "Comprensión de lectura",
      "Gramática",
      "Literatura costarricense",
    ],
  },
  {
    area: "Ciencias (MEP)",
    subject: "Ciencias",
    topics: ["Materia y energía", "Seres vivos", "Física básica", "Química básica"],
  },
  {
    area: "Estudios Sociales y Cívica",
    subject: "Estudios Sociales",
    topics: ["Historia de Costa Rica", "Geografía", "Institucionalidad y democracia"],
  },
  { area: "Inglés", subject: "Inglés", topics: ["Reading comprehension", "Grammar", "Vocabulary"] },
  {
    area: "Especialidades CTP",
    subject: "Desarrollo de Software",
    topics: ["Programación", "Bases de datos", "Contabilidad básica", "Electrónica básica"],
  },
  {
    area: "Prueba teórica de manejo",
    subject: "Manejo (MOPT)",
    topics: ["Señales de tránsito", "Normas de circulación", "Seguridad vial"],
  },
];

function Temario() {
  const gen = useServerFn(generateQuestions);
  const [deck, setDeck] = useState(null);
  const [cur, setCur] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const load = async (subject) => {
    setLoading(topic);
    setError(null);
    try {
      const r = await gen({
        data: { topic, subject, lang === "Inglés" ? "en" : "es", count: 5 },
      });
      if (r.error) setError(r.error);
      else {
        setCur({ subject, topic });
        setDeck({
          id: `ia-${subject}`,
          title,
          emoji: "∞",
          level,
          questions: r.questions,
        });
      }
    } catch {
      setError("No se pudo generar la práctica. Intente de nuevo.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-hero">
      <SiteHeader />
      {deck ? (
        <Quiz
          key={deck.questions[0]?.q}
          deck={deck}
          onExit={() => setDeck(null)}
          {...(cur ? { onMore: () => load(cur.subject, cur.topic) } : {})}
        />
      ) : (
        <section className="mx-auto max-w-5xl px-5 pb-16">
          <h1 className="text-4xl font-black">Temario</h1>
          <p className="mt-2 text-muted-foreground">
            Elija un tema explicación.
          </p>
          <Link
            to="/metrologia"
            className="mt-6 flex items-center justify-between gap-4 rounded-lg border border-primary bg-card p-5"
          >
            <span>
              <strong className="text-xl">📏 Curso de metrología</strong>
              <span className="mt-1 block text-sm text-muted-foreground">
                8 fichas · objetivos, secuencia, rúbricas y ejercicios
              </span>
            </span>
            <span aria-hidden="true">→</span>
          </Link>
          <SchoolPractice onStart={setDeck} />
          {error && <p className="mt-3 text-destructive">{error}</p>}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {temario.map((a) => (
              <div key={a.area} className="rounded-2xl border bg-card p-5">
                <h2 className="text-lg font-bold">{a.area}</h2>
                <ul className="mt-3 grid gap-2">
                  {a.topics.map((t) => (
                    <li key={t} className="flex items-center justify-between gap-2 text-sm">
                      <span>{t}</span>
                      <button
                        disabled={!!loading}
                        onClick={() => load(a.subject, t)}
                        className="rounded-full bg-primary px-3 py-1 font-semibold text-primary-foreground disabled:opacity-50"
                      >
                        {loading === t ? "Creando…" : "Practicar ∞"}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
