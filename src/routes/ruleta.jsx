import { createFileRoute,Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Quiz } from "@/components/Quiz";
import { Button } from "@/components/ui/button";
import { decks, type Deck } from "@/lib/questions";
import { GRADE6_VERSIONS, grade6Deck, grade6Subjects } from "@/lib/grade6";
import { AuthorizedContent } from '@/components/AuthorizedContent';

export const Route = createFileRoute("/ruleta")({staticData:{sitemap:false},
  head: () => ({
    meta: [
      { title: "Ruleta del saber · pracTICAtecnica.com" },
      { name: "description", content: "Gire la ruleta, responda hasta 20 preguntas de un tema al azar y sume XP y racha." },
      { property: "og:title", content: "Ruleta del saber · pracTICAtecnica.com" },
      { property: "og:description", content: "Trivia rápida con temas de estudio al azar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Ruleta,
});


const slices: Slice[] = [
  ...grade6Subjects.map((s) => ({
    label: `${s.title} 6.º`,
    emoji: s.emoji,
    make: () => grade6Deck(s.id, Math.floor(Math.random() * GRADE6_VERSIONS)),
  })),
  ...decks.map((d) => ({ label: d.title, emoji: d.emoji, make: () => d })),
];

function Ruleta() {
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [chosen, setChosen] = useState<Slice | null>(null);
  const [count, setCount] = useState(5);
  const [deck, setDeck] = useState<Deck | null>(null);
  const step = 360 / slices.length;

  function spin() {
    const idx = Math.floor(Math.random() * slices.length);
    setChosen(null);
    setSpinning(true);
    // Lands the chosen slice under the top pointer.
    setAngle((a) => a - (a % 360) + 360 * 5 + (360 - idx * step - step / 2));
    setTimeout(() => {
      setSpinning(false);
      setChosen(slices[idx]!);
    }, 3200);
  }
  function play() {
    if (!chosen) return;
    const full = chosen.make();
    // First three questions keep the bank's indices, so server scoring stays valid.
    setDeck({ ...full, title: `Ruleta · ${full.title}`, questions: full.questions.slice(0, count) });
  }

  return (
    <main className="min-h-screen bg-hero">
      <SiteHeader />
      {deck ? (
        <AuthorizedContent id={deck.id}>{full=><Quiz key={deck.id+angle} deck={{...full,title:`Ruleta · ${full.title}`,questions:full.questions.slice(0,count)}} onExit={()=>setDeck(null)} />}</AuthorizedContent>
      ) : (
        <section className="mx-auto max-w-3xl px-5 pb-16 text-center">
          <p className="text-sm font-semibold text-primary">Juego</p>
          <h1 className="mt-2 text-4xl font-black">Ruleta del saber</h1>
          <Button variant="outline" className="mt-4" asChild><Link to="/arena">Arena · Duelos técnicos</Link></Button>
          <p className="mt-3 text-muted-foreground">Gire, elija cuántas preguntas (hasta 20) del tema que salga y sume XP a su racha.</p>
          <div className="relative mx-auto mt-8 aspect-square w-full max-w-sm">
            <div aria-hidden className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1 text-3xl text-accent">▼</div>
            <div
              className="relative h-full w-full rounded-full border-8 border-primary shadow-lg transition-transform duration-[3000ms] ease-out"
              style={{
                transform: `rotate(${angle}deg)`,
                background: `conic-gradient(${slices
                  .map((_, i) => `${i % 2 ? "var(--card)" : "var(--secondary)"} ${i * step}deg ${(i + 1) * step}deg`)
                  .join(",")})`,
              }}
            >
              {slices.map((s, i) => (
                <span
                  key={s.label}
                  className="absolute left-1/2 top-1/2 origin-left text-xl"
                  style={{ transform: `rotate(${i * step + step / 2 - 90}deg) translateX(110px) translateY(-50%)` }}
                  aria-hidden
                >
                  {s.emoji}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-6 min-h-8 text-xl font-extrabold" aria-live="polite">
            {chosen ? `${chosen.emoji} ${chosen.label}` : spinning ? "Girando…" : ""}
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Button size="lg" disabled={spinning} onClick={spin}>Girar ruleta</Button>
            {chosen && (
              <>
                <select value={count} onChange={(e) => setCount(Number(e.target.value))} aria-label="Cantidad de preguntas" className="rounded-full border bg-card px-3 font-bold">
                  {[3, 5, 10, 20].map((n) => <option key={n} value={n}>{n} preguntas</option>)}
                </select>
                <Button size="lg" variant="secondary" onClick={play}>Responder</Button>
              </>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

