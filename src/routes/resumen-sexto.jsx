import { createFileRoute, Link } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/resumen-sexto")({staticData:{sitemap:true},
  head: () => ({
    meta: [
      { title: "Resúmenes y mapas conceptuales 6.º grado · pracTICAtecnica.com" },
      { name: "description", content: "Resúmenes imprimibles en PDF con mapas conceptuales de Matemática, Ciencias, Español y Estudios Sociales de 6.º grado." },
      { property: "og:title", content: "Resúmenes y mapas conceptuales 6.º grado" },
      { property: "og:description", content: "Repase lo esencial de 6.º grado y descárguelo en PDF." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Resumen,
});


const maps: { title: string; emoji: string; root: string; branches: Node[]; keys: string[] }[] = [
  {
    title: "Matemática", emoji: "➗", root: "Matemática 6.º",
    branches: [
      { t: "Números", c: [{ t: "Fracciones: igual denominador → sume numeradores" }, { t: "Porcentaje: p% de N = N × p ÷ 100" }, { t: "Jerarquía: × y ÷ antes que + y −" }] },
      { t: "Geometría y medidas", c: [{ t: "Área rectángulo = largo × ancho (m²)" }, { t: "Perímetro = suma de lados (m)" }, { t: "1 km = 1000 m · 1 m = 100 cm" }] },
      { t: "Estadística", c: [{ t: "Promedio = suma ÷ cantidad de datos" }, { t: "Moda: dato que más se repite" }] },
    ],
    keys: ["Lea el problema dos veces y subraye los datos.", "Revise unidades: el área va en unidades cuadradas.", "Compruebe si el resultado es razonable."],
  },
  {
    title: "Ciencias", emoji: "🔬", root: "Ciencias 6.º",
    branches: [
      { t: "Seres vivos", c: [{ t: "Fotosíntesis: luz + agua + CO₂ → alimento + O₂" }, { t: "Cadena: productor → consumidores → descomponedores" }] },
      { t: "Cuerpo humano", c: [{ t: "Corazón: bombea sangre" }, { t: "Pulmones: intercambian oxígeno" }] },
      { t: "Materia y energía", c: [{ t: "Evaporación: líquido → gas" }, { t: "Condensación: gas → líquido" }, { t: "Conductores (cobre) y aislantes (plástico)" }] },
      { t: "Tierra y ambiente", c: [{ t: "Mercurio, Venus, Tierra, Marte…" }, { t: "Energía renovable: agua, viento, geotermia" }] },
    ],
    keys: ["Asocie cada proceso con un ejemplo cotidiano.", "Rapidez = distancia ÷ tiempo."],
  },
  {
    title: "Español", emoji: "✍️", root: "Español 6.º",
    branches: [
      { t: "Acentuación", c: [{ t: "Aguda: última sílaba (canción) — tilde si termina en n, s o vocal" }, { t: "Grave: penúltima (lápiz) — tilde si NO termina en n, s o vocal" }, { t: "Esdrújula: antepenúltima (teléfono) — siempre tilde" }, { t: "Hiato con tilde: país, río" }] },
      { t: "Gramática", c: [{ t: "Sujeto: quién realiza la acción" }, { t: "Sustantivo, adjetivo, verbo, adverbio" }] },
      { t: "Vocabulario y lectura", c: [{ t: "Sinónimos y antónimos" }, { t: "Hipérbole: exageración" }, { t: "Carmen Lyra: «Cuentos de mi tía Panchita»" }] },
    ],
    keys: ["Separe en sílabas antes de decidir la tilde.", "Pregunte «¿quién?» al verbo para hallar el sujeto."],
  },
  {
    title: "Estudios Sociales", emoji: "🗺️", root: "Estudios Sociales 6.º",
    branches: [
      { t: "Geografía", c: [{ t: "7 provincias; Liberia, capital de Guanacaste" }, { t: "Caribe (Limón) y Pacífico" }] },
      { t: "Historia", c: [{ t: "15/9/1821 Independencia" }, { t: "25/7/1824 Anexión de Nicoya" }, { t: "1856 Santa Rosa (20/3) y Rivas (11/4)" }, { t: "1943 Garantías Sociales · 1948 abolición del ejército" }] },
      { t: "Cívica", c: [{ t: "Poderes: Ejecutivo, Legislativo, Judicial" }, { t: "TSE organiza las elecciones" }] },
    ],
    keys: ["Haga una línea de tiempo con las fechas.", "Relacione cada hecho con su lugar en el mapa."],
  },
];

function Resumen() {
  return (
    <main className="min-h-screen bg-hero [print-color-adjust:exact] print:bg-background">
      <div className="print:hidden"><SiteHeader /></div>
      <section className="mx-auto max-w-5xl px-5 pb-16">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary">6.º grado · Repaso</p>
            <h1 className="mt-2 text-4xl font-black">Resúmenes y mapas conceptuales</h1>
            <p className="mt-3 text-muted-foreground print:hidden">
              Pulse «Descargar PDF» y elija «Guardar como PDF» en la ventana de impresión.
            </p>
          </div>
          <div className="flex gap-2 print:hidden">
            <Button onClick={() => window.print()}><Printer className="h-4 w-4" /> Descargar PDF</Button>
            <Button variant="outline" asChild><Link to="/sexto">Practicar</Link></Button>
            <Button variant="outline" asChild><Link to="/resumen-primaria">1.º a 5.º grado</Link></Button>
          </div>
        </div>
        {maps.map((m) => (
          <article key={m.title} className="mt-10 break-inside-avoid rounded-2xl border bg-card p-6 print:break-before-page print:border-0">
            <h2 className="text-2xl font-extrabold">{m.emoji} {m.title}</h2>
            <div className="mt-5 flex justify-center">
              <span className="rounded-full bg-primary px-5 py-2 font-bold text-primary-foreground">{m.root}</span>
            </div>
            <div className="mx-auto h-5 w-px bg-border" />
            <div className="grid gap-4 border-t pt-5 sm:grid-cols-2 lg:grid-cols-4">
              {m.branches.map((b) => (
                <div key={b.t} className="rounded-xl border border-accent/60 p-4">
                  <h3 className="font-bold text-primary">{b.t}</h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    {b.c?.map((c) => <li key={c.t} className="border-l-2 border-accent pl-2">{c.t}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <h3 className="mt-5 font-bold">Claves para la prueba</h3>
            <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
              {m.keys.map((k) => <li key={k}>{k}</li>)}
            </ul>
          </article>
        ))}
        <p className="mt-8 text-xs text-muted-foreground">Material independiente de repaso, sin afiliación oficial al MEP.</p>
      </section>
    </main>
  );
}

