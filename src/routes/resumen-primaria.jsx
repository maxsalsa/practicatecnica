import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Printer } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/resumen-primaria")({staticData:{sitemap:true},
  head: () => ({
    meta: [
      { title: "Resúmenes y mapas conceptuales 1.º a 5.º · pracTICAtecnica.com" },
      { name: "description", content: "Mapas conceptuales imprimibles de Matemática, Español, Ciencias y Estudios Sociales de 1.º a 5.º grado." },
      { property: "og:title", content: "Resúmenes y mapas 1.º a 5.º grado" },
      { property: "og:description", content: "Repase lo esencial de primaria y descárguelo en PDF." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Resumen,
});



const B = (t: string, ...c: string[]): Node => ({ t, c: c.map((x) => ({ t: x })) });
const grades: Record<string, Map[]> = {
  "1": [
    { title: "Matemática", emoji: "➕", root: "Matemática 1.º", branches: [B("Números", "Contar del 0 al 100", "Antes y después: 9 → 10"), B("Operaciones", "Sumar es juntar: 3 + 4 = 7", "Restar es quitar: 10 − 2 = 8"), B("Figuras", "Círculo, cuadrado, triángulo")], keys: ["Use los dedos o dibujos para contar.", "Lea el número en voz alta."] },
    { title: "Español", emoji: "🔤", root: "Español 1.º", branches: [B("Letras", "Vocales: a, e, i, o, u", "Consonantes: m, p, s, l…"), B("Palabras", "Sílabas: ma-sa", "Mayúscula al inicio y en nombres")], keys: ["Lea un cuento corto cada día."] },
    { title: "Ciencias", emoji: "🌱", root: "Ciencias 1.º", branches: [B("Cuerpo", "5 sentidos: vista, oído, olfato, gusto, tacto"), B("Seres vivos", "Nacen, crecen, se reproducen y mueren"), B("Higiene", "Lavarse las manos", "Cepillarse los dientes")], keys: ["Relacione cada sentido con su órgano."] },
    { title: "Estudios Sociales", emoji: "🏠", root: "Estudios Sociales 1.º", branches: [B("Mi familia y escuela", "Normas de convivencia"), B("Tiempo", "7 días de la semana", "Ayer, hoy, mañana")], keys: ["Repita los días en orden."] },
  ],
  "2": [
    { title: "Matemática", emoji: "➕", root: "Matemática 2.º", branches: [B("Valor posicional", "46 = 4 decenas y 6 unidades", "Números hasta 999"), B("Operaciones", "Suma y resta con llevar", "Multiplicar = sumar repetido: 5 × 2 = 10"), B("Medidas", "Metro, hora y colón")], keys: ["Ordene unidades bajo unidades al sumar."] },
    { title: "Español", emoji: "🔤", root: "Español 2.º", branches: [B("Palabras", "Plural: flor → flores", "Sustantivos: nombran cosas"), B("Escritura", "Punto final", "Oraciones con sentido")], keys: ["Agregue -s o -es para el plural."] },
    { title: "Ciencias", emoji: "🌿", root: "Ciencias 2.º", branches: [B("Plantas", "Raíz, tallo, hojas, flor", "Necesitan agua, luz y aire"), B("Animales", "Domésticos y silvestres")], keys: ["Dibuje una planta y nombre sus partes."] },
    { title: "Estudios Sociales", emoji: "🏘️", root: "Estudios Sociales 2.º", branches: [B("Comunidad", "Servicios: escuela, EBAIS, bomberos"), B("Tiempo", "12 meses del año")], keys: ["Ubique su casa y su escuela en un croquis."] },
  ],
  "3": [
    { title: "Matemática", emoji: "✖️", root: "Matemática 3.º", branches: [B("Tablas", "Tablas del 1 al 10", "7 × 8 = 56"), B("División", "Repartir en partes iguales", "Mitad de 18 = 9"), B("Números hasta 9999")], keys: ["Practique una tabla por día."] },
    { title: "Español", emoji: "🔤", root: "Español 3.º", branches: [B("Gramática", "Verbo: acción (corre)", "Sustantivo y adjetivo"), B("Lectura", "Idea principal", "Personajes y lugar")], keys: ["Pregunte: ¿qué hace? para hallar el verbo."] },
    { title: "Ciencias", emoji: "💧", root: "Ciencias 3.º", branches: [B("Estados del agua", "Sólido (hielo), líquido, gas (vapor)", "Hierve a 100 °C, se congela a 0 °C"), B("Ambiente", "Reducir, reutilizar, reciclar")], keys: ["Asocie cada estado con un ejemplo de la cocina."] },
    { title: "Estudios Sociales", emoji: "🗺️", root: "Estudios Sociales 3.º", branches: [B("Costa Rica", "7 provincias", "Puntos cardinales: N, S, E, O"), B("Mi provincia", "Cantones y símbolos")], keys: ["Memorice las provincias con una frase."] },
  ],
  "4": [
    { title: "Matemática", emoji: "📐", root: "Matemática 4.º", branches: [B("Fracciones", "Igual numerador: menor denominador es mayor", "1/2 > 1/3 > 1/4"), B("Geometría", "Perímetro = suma de lados", "Cuadrado: 4 × lado"), B("División larga", "144 ÷ 12 = 12")], keys: ["No confunda perímetro (cm) con área (cm²)."] },
    { title: "Español", emoji: "✍️", root: "Español 4.º", branches: [B("Acentuación", "Aguda: canción", "Grave: árbol", "Esdrújula: siempre tilde"), B("Texto", "Inicio, desarrollo y final")], keys: ["Separe en sílabas y busque la más fuerte."] },
    { title: "Ciencias", emoji: "🦁", root: "Ciencias 4.º", branches: [B("Alimentación animal", "Herbívoros, carnívoros, omnívoros"), B("Ecosistemas", "Productores y consumidores")], keys: ["Clasifique animales que conoce."] },
    { title: "Estudios Sociales", emoji: "🇨🇷", root: "Estudios Sociales 4.º", branches: [B("Historia", "15 de septiembre de 1821: Independencia", "Época colonial"), B("Símbolos patrios", "Bandera, escudo, himno")], keys: ["Haga una línea de tiempo sencilla."] },
  ],
  "5": [
    { title: "Matemática", emoji: "🔢", root: "Matemática 5.º", branches: [B("Decimales", "0,50 + 0,25 = 0,75", "Alinee la coma"), B("Porcentaje", "25% = la cuarta parte", "50% = la mitad"), B("Área", "Rectángulo = base × altura (m²)")], keys: ["Escriba los decimales con igual cantidad de cifras."] },
    { title: "Español", emoji: "✍️", root: "Español 5.º", branches: [B("Vocabulario", "Sinónimos: alegre = contento", "Antónimos: alegre ≠ triste"), B("Textos", "Narrativo, descriptivo, instructivo")], keys: ["Lea y resuma cada párrafo en una frase."] },
    { title: "Ciencias", emoji: "❤️", root: "Ciencias 5.º", branches: [B("Cuerpo humano", "Corazón: bombea sangre", "Pulmones: respiración", "Estómago: digestión"), B("Salud", "Alimentación balanceada", "Actividad física")], keys: ["Relacione cada órgano con su sistema."] },
    { title: "Estudios Sociales", emoji: "⚔️", root: "Estudios Sociales 5.º", branches: [B("Campaña de 1856", "Santa Rosa: 20 de marzo", "Rivas: 11 de abril", "Juan Santamaría incendió el mesón"), B("Regiones", "Valle Central, Pacífico, Caribe, Norte")], keys: ["Asocie cada batalla con su fecha y lugar."] },
  ],
};

function Resumen() {
  const [g, setG] = useState("1");
  const maps = grades[g]!;
  return (
    <main className="min-h-screen bg-hero [print-color-adjust:exact] print:bg-background">
      <div className="print:hidden"><SiteHeader /></div>
      <section className="mx-auto max-w-5xl px-5 pb-16">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary">Primaria 1.º a 5.º · Repaso</p>
            <h1 className="mt-2 text-4xl font-black">Resúmenes y mapas conceptuales</h1>
            <p className="mt-3 text-muted-foreground print:hidden">
              Pulse «Descargar PDF» y elija «Guardar como PDF» en la ventana de impresión.
            </p>
          </div>
          <div className="flex gap-2 print:hidden">
            <Button onClick={() => window.print()}><Printer className="h-4 w-4" /> Descargar PDF</Button>
            <Button variant="outline" asChild><Link to="/simulacro">Simulacro</Link></Button>
            <Button variant="outline" asChild><Link to="/resumen-sexto">6.º grado</Link></Button>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2 print:hidden" role="tablist">
          {["1", "2", "3", "4", "5"].map((x) => (
            <Button key={x} role="tab" aria-selected={g === x} variant={g === x ? "default" : "outline"} onClick={() => setG(x)}>{x}.º grado</Button>
          ))}
        </div>
        <p className="mt-4 hidden text-lg font-bold print:block">{g}.º grado</p>
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

