import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { decks } from "@/lib/questions";
import heroImg from "@/assets/hero-niveles.jpg";
import shareImage from "@/assets/inicio-26x1.jpg.asset.json";
import { PromoBanners } from "@/components/PromoBanners";
import { InstallAppButton } from "@/components/InstallAppButton";
import gicmLogo from "@/assets/gicm-logo.jpg.asset.json";
import { AiPractice } from "@/components/AiPractice";
import { Progress } from "@/components/Progress";
import { Quiz } from "@/components/Quiz";
import { Greeting } from "@/components/Greeting";
import { SiteHeader } from "@/components/SiteHeader";
import { PortalDoors } from "@/components/PortalDoors";
import { Button } from "@/components/ui/button";
import { learningSubjects } from "@/lib/learning-paths";
import { cuadernillos } from "@/lib/cuadernillos";
import { specialtyDeckIds } from "@/lib/specialty-decks";
import { PublishedSubjects } from '@/components/PublishedSubjects';
import { CurriculumSelector } from '@/components/CurriculumSelector';

export const Route = createFileRoute("/")({staticData:{sitemap:true},
  head: () => ({
    meta { title: "pracTICAtecnica.com | Prácticas, simulacros y juegos en Costa Rica" },
      { name: "description", content: "Repase con prácticas guiadas, simulacros, juegos y materiales de primaria, secundaria y especialidades técnicas. Preparación independiente en Costa Rica." },
      { property: "og:title", content: "pracTICAtecnica.com | Prácticas, simulacros y juegos en Costa Rica" },
      { property: "og:description", content: "Repase con prácticas guiadas, simulacros, juegos y materiales de primaria, secundaria y especialidades técnicas. Preparación independiente en Costa Rica." },
      { property: "og:url", content: "https://practicatecnica.com" },
      { property: "og:image", content: `https://practicatecnica.com${shareImage.url}` },
      { name: "twitter:image", content: `https://practicatecnica.com${shareImage.url}` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Estudiantes costarricenses avanzando por una escalera de libros · pracTICAtecnica.com" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://practicatecnica.com" }],
  }),
  component,
});

function Index() {
  const [deck, setDeck] = useState(null);
  const [stage, setStage] = useState("primaria");
  const current = STAGES.find((x) => x.id === stage) ?? STAGES[0];
  const shown = current ? decks.filter(current.match) : [];
  const [best, setBest] = useState<Record<string, number>>({});
  useEffect(() => { setBest(JSON.parse(localStorage.getItem("pt-best") || "{}")); }, [deck]);

  return (
    <main className="min-h-screen bg-hero">
      <SiteHeader />
      {deck ? <Quiz deck={deck} onExit={() => setDeck(null)} /> : (
        <section className="mx-auto max-w-5xl px-5 pb-16">
          <Greeting />
          <Button asChild variant="link" className="mt-3"><Link to="/mi-avance">Mi avance por materia →</Link></Button>
          <h1 className="mt-6 text-3xl font-black">Práctica y simulacros para MEP, colegios técnicos, admisión y MOPT en Costa Rica</h1><p className="mt-2 font-bold text-accent">Repase. Practique. Prepárese. · Plataforma costarricense de aprendizaje y gestión educativa.</p>
          <details className="mt-2 text-sm text-muted-foreground"><summary className="cursor-pointer font-semibold text-foreground">Misión y visión</summary>
            <p className="mt-2"><strong>Misión:</strong> Acompañar a estudiantes, familias, docentes y centros educativos de Costa Rica con práctica original, evaluación clara y herramientas de gestión seguras, accesibles y de bajo costo.</p>
            <p className="mt-1"><strong>Visión:</strong> Ser la plataforma de referencia para aprender, enseñar y administrar la educación costarricense, de primaria a la educación técnica, con calidad pedagógica y protección de datos.</p>
          </details>
          <p className="mt-3 text-lg font-bold">¿Qué desea hacer hoy?</p>
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Button asChild variant="outline" className="h-14 whitespace-normal"><Link to="/explorar">✍️ Prácticas por materia</Link></Button>
            <Button asChild variant="outline" className="h-14 whitespace-normal"><Link to="/simulacro">⏱️ Simulacros</Link></Button>
            <Button asChild variant="outline" className="h-14 whitespace-normal"><Link to="/juegos">🎮 Juegos</Link></Button>
            <Button asChild variant="outline" className="h-14 whitespace-normal"><Link to="/libros">📚 Libros / PDF</Link></Button>
          </div>
          <CurriculumSelector />
          <div className="mt-3 flex flex-wrap gap-2">
            <Button asChild variant="link"><Link to="/explorar">Todas las materias</Link></Button>
            <Button asChild variant="link"><Link to="/especialidades" search={{ code }}>Especialidades técnicas</Link></Button>
            <Button asChild variant="link"><Link to="/libros">Material gratuito</Link></Button>
            <Button asChild variant="link"><Link to="/ligas">Ligas</Link></Button>
            <Button asChild variant="link"><Link to="/institucion">🏫 Administración de centros educativos</Link></Button>
          </div>
          <details className="mt-4 border-t border-border pt-4">
            <summary className="cursor-pointer font-bold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring">Ver materias y especialidades disponibles</summary>
            <div className="mt-3 max-h-80 overflow-y-auto overscroll-contain">
              <h2 className="text-sm font-bold">Primaria y secundaria · Simulacros cubiertos por grado</h2>
              <PublishedSubjects />
              <h2 className="text-sm font-bold">Materias · Bloques iniciales de práctica y simulacro</h2>
              <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                {learningSubjects.map(subject => <li key={subject.id}><Button asChild variant="link" className="h-auto justify-start whitespace-normal text-left"><Link to="/aprender" search={{ materia: subject.id }}>{subject.emoji} {subject.title.replace(' · Accounting', '')}</Link></Button></li>)}
              </ul>
              <h2 className="mt-4 text-sm font-bold">Especialidades · Cuadernillos disponibles</h2>
              <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                {cuadernillos.map(book => <li key={book.url}><Button asChild variant="link" className="h-auto flex-col items-start whitespace-normal text-left"><Link to="/especialidades" search={{ code: book.code || book.title }}><span>{book.title.replace('Accounting', 'Contabilidad en inglés técnico')}</span><span className="text-xs font-normal text-muted-foreground">{specialtyDeckIds[book.code] ? 'PDF · Práctica y simulacro iniciales' : 'PDF · Ejercicios pendientes'}</span></Link></Button></li>)}
              </ul>
            </div>
          </details>
          <h2 className="mt-8 text-xl font-black">Áreas de estudio</h2>
          <PortalDoors />
          <img src={heroImg} alt="Estudiantes avanzando por una escalera de libros" width={1536} height={864} className="mt-8 max-h-64 w-full rounded-lg object-cover" />
          <details className="mt-8 border-t border-border pt-5">
            <summary className="cursor-pointer text-xl font-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring">Más prácticas y herramientas</summary>
          <InstallAppButton />
          <PromoBanners />
          <h2 className="mt-12 text-center text-3xl font-black md:text-4xl">1 · ¿En qué etapa está?</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
            {STAGES.map((st) => (
              <Button key={st.id} variant="outline" aria-pressed={stage === st.id} onClick={() => setStage(st.id)}
                className={`h-auto flex-col whitespace-normal rounded-lg border p-4 text-center transition ${stage === st.id ? "border-primary bg-primary text-primary-foreground shadow-card" : "bg-card hover:border-primary"}`}>
                <div className="text-4xl">{st.emoji}</div>
                <div className="mt-2 font-black">{st.title}</div>
                <div className={`text-xs ${stage === st.id ? "" : "text-muted-foreground"}`}>{st.sub}</div>
              </Button>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {current?.links.map((l) => (
              <Link key={l.label} to={l.to as "/"} search={l.search} className="rounded-full border border-accent bg-card px-4 py-2 text-sm font-bold hover:bg-accent hover:text-accent-foreground">{l.label}</Link>
            ))}
          </div>
          <h2 className="mt-10 text-center text-2xl font-black">2 · Elija una práctica</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {shown.map((d) => (
              <div key={d.id}
                className="group flex flex-col rounded-2xl border bg-card p-6 text-left shadow-card transition hover:shadow-primary/30 hover:-translate-y-1 hover:border-primary">
                <div className="text-3xl">{d.emoji}</div>
                <h2 className="mt-3 text-xl font-bold">{d.title}</h2>
                <p className="text-sm text-muted-foreground">{d.level} · {(d.questionCount ?? d.questions.length)} preguntas</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{best[d.id] != null ? `Mejor: ${best[d.id]}%` : "Sin intentos"}</span>
                </div>
                <Button onClick={() => { setDeck(d); }} className="mt-4">
                  Comenzar práctica →
                </Button>
              </div>
            ))}
          </div>
          <AiPractice onStart={setDeck} />
          <Progress />
          </details>
        </section>
      )}
      <footer className="flex flex-col items-center gap-1 pb-8 text-center text-xs text-muted-foreground">
        <span>Preparación independiente, sin afiliación oficial.</span>
        <span>Esta plataforma no pertenece al MEP ni al MOPT y no cuenta con su afiliación oficial.</span>
        <span>Desarrollado por <strong className="text-foreground">GICM Desarrollo de Sistemas Digitales y Constructivos ICM</strong></span>
        <Link to="/acerca" className="font-semibold text-primary underline">Acerca de y pagos</Link>
        <Link to="/legal" className="underline">Términos y privacidad</Link>
        <img src={gicmLogo.url} alt="Logo GICM" className="mt-3 h-12 w-12 rounded-full object-cover" />
        <span>Proyecto en colaboración con GICM.</span>
      </footer>
    </main>
  );
}


const fichas = (level) => ({ to: "/practicas", search: { subject: "matematica", level, lang: "es", mode: "practice", variant: 0 } });
const STAGES: { id: string; emoji: string; title: string; sub: string; match: (d) => boolean; links: { label: string; to: string; search}[] }[] = [
  { id: "primaria", emoji: "🎒", title: "Primaria", sub: "1.º a 6.º grado", match: (d) => d.id.startsWith("prim"),
    links: [{ label: "📚 Libros 1.º–5.º", to: "/libros" }, { label: "📘 6.º grado (500 versiones)", to: "/sexto" }, { label: "🗺️ Mapas 1.º–5.º", to: "/resumen-primaria" }, { label: "🗺️ Mapas 6.º", to: "/resumen-sexto" }, { label: "🎡 Ruleta", to: "/ruleta" }] },
  { id: "academica", emoji: "📚", title: "Secundaria académica", sub: "7.º a 11.º · liceos", match: (d) => ["sim7", "sim10", "historia", "espanol", "religion", "civica"].includes(d.id),
    links: [{ label: "📖 Fichas por materia", ...fichas("7.º secundaria") }, { label: "⏱️ Simulacros 7.º y 10.º", to: "/simulacro" }, { label: "🧠 Hábitos", to: "/habitos" }] },
  { id: "tecnica", emoji: "🛠️", title: "Técnica CTP", sub: "7.º a 12.º · especialidades", match: (d) => d.id.startsWith("ctp"),
    links: [{ label: "📏 Metrología", to: "/metrologia" }, { label: "📋 Temario técnico", to: "/temario" }, { label: "📖 Fichas CTP", ...fichas("12.º CTP") }] },
  { id: "admision", emoji: "🎓", title: "Universidad", sub: "UCR · TEC · UNA", match: (d) => d.id === "admision",
    links: [{ label: "⏱️ Simulacro admisión", to: "/simulacro" }, { label: "🧠 Hábitos universitarios", to: "/habitos" }] },
  { id: "mopt", emoji: "🚗", title: "Licencia MOPT", sub: "Teórico carro y moto", match: (d) => d.id === "mopt",
    links: [{ label: "⏱️ Simulacro MOPT", to: "/simulacro" }] },
];
