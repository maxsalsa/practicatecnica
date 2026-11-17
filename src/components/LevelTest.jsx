import { useEffect, useMemo, useState } from "react";
import { LANGS, type MC } from "@/lib/lang-skills";
import { Button } from "@/components/ui/button";

const SECONDS_PER_ITEM = 60;
const PASS = 70;

function shuffle<T>(a) { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j]!, b[i]!]; } return b; }

export function levelItems(level: string): MC[] {
  const en = LANGS.en;
  return [...en.grammar, ...en.listen].filter((q) => q.level === level);
}

export function LevelTest({ level }: { level: "B2" | "C1" }) {
  const [started, setStarted] = useState(false);
  const items = useMemo(() => (started ? shuffle(levelItems(level)) : []), [started, level]);
  const [i, setI] = useState(0);
  const [picks, setPicks] = useState<(number | null)[]>([]);
  const [left, setLeft] = useState<number | null>(null);
  const done = started && i >= items.length;

  useEffect(() => { if (started) { setLeft(items.length * SECONDS_PER_ITEM); setPicks([]); setI(0); } }, [started, items.length]);
  useEffect(() => {
    if (!started || done || left === null) return;
    if (left <= 0) { setI(items.length); return; }
    const t = setTimeout(() => setLeft((s) => (s ?? 1) - 1), 1000);
    return () => clearTimeout(t);
  }, [started, done, left, items.length]);

  const total = levelItems(level).length;
  if (!started) return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-xs font-bold text-accent">Prueba completa · Inglés {level}</p>
      <p className="mt-1 text-sm text-muted-foreground">{total} preguntas · {total} min · aprobación {PASS}%. Práctica original, no examen oficial.</p>
      <Button className="mt-3" onClick={() => setStarted(true)}>Iniciar prueba {level}</Button>
    </div>
  );
  if (done) {
    const ok = items.filter((q, k) => picks[k] === q.answer).length;
    const pct = Math.round((ok / items.length) * 100);
    return (
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-bold text-accent">Resultado · Inglés {level}</p>
        <p className="mt-1 text-3xl font-black">{pct}% · {ok}/{items.length}</p>
        <p className="font-bold">{pct >= PASS ? "✅ Aprobado" : "❌ Repase y vuelva a intentar"}</p>
        <ol className="mt-3 grid gap-2 text-sm">{items.map((q, k) => (
          <li key={k}>{picks[k] === q.answer ? "✅" : "❌"} {q.q} — <strong>{q.options[q.answer]}</strong>. {q.why}</li>
        ))}</ol>
        <Button className="mt-3" variant="secondary" onClick={() => { setStarted(false); setLeft(null); }}>Volver</Button>
      </div>
    );
  }
  const q = items[i]!;
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-xs font-bold text-accent">Inglés {level} · {i + 1}/{items.length} · ⏱ {Math.floor((left ?? 0) / 60)}:{String((left ?? 0) % 60).padStart(2, "0")}</p>
      <p className="mt-2 font-semibold">{q.q}</p>
      <div className="mt-3 grid gap-2">{q.options.map((o, k) => (
        <Button key={k} variant={picks[i] === k ? "default" : "secondary"} className="h-auto justify-start whitespace-normal text-left" onClick={() => setPicks((p) => { const n = [...p]; n[i] = k; return n; })}>{o}</Button>
      ))}</div>
      <Button className="mt-3" disabled={picks[i] == null} onClick={() => setI(i + 1)}>{i + 1 === items.length ? "Terminar" : "Confirmar y seguir"}</Button>
    </div>
  );
}
