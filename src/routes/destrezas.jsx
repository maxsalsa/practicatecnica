import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { LANGS, similarity, type Lang, type MC } from "@/lib/lang-skills";

export const Route = createFileRoute("/destrezas")({staticData:{sitemap:false},
  head: () => ({
    meta: [
      { title: "Idiomas: escuchar, hablar, gramática y escritura | pracTICAtecnica.com" },
      { name: "description", content: "Inglés, francés y portugués por niveles MCER con audio, micrófono y retroalimentación inmediata." },
      { property: "og:title", content: "Destrezas de idiomas | pracTICAtecnica.com" },
      { property: "og:description", content: "Listening, speaking, grammar y writing en inglés, francés y portugués." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Destrezas,
});

type Skill = "listen" | "speak" | "grammar" | "write";
const SK: [Skill, string][] = [["listen", "🎧 Escuchar"], ["speak", "🎤 Hablar"], ["grammar", "📐 Gramática"], ["write", "✍️ Escribir"]];
const pill = (on: boolean) => `rounded-xl border px-4 py-2 font-bold ${on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`;
function tone(ok: boolean) { try { const c = new AudioContext(); const o = c.createOscillator(); const g = c.createGain(); o.frequency.value = ok ? 660 : 180; if (ok) o.frequency.linearRampToValueAtTime(990, c.currentTime + 0.15); g.gain.value = 0.08; o.connect(g).connect(c.destination); o.start(); o.stop(c.currentTime + 0.2); } catch { /* sin audio */ } }
function say(text: string, voice: string, rate = 0.9) { const u = new SpeechSynthesisUtterance(text); u.lang = voice; u.rate = rate; speechSynthesis.cancel(); speechSynthesis.speak(u); }

function Destrezas() {
  const [lang, setLang] = useState<Lang>("en");
  const [skill, setSkill] = useState<Skill>("listen");
  const [i, setI] = useState(0);
  const [score, setScore] = useState({ ok: 0, n: 0 });
  const [fb, setFb] = useState<{ ok: boolean; msg: string } | null>(null);
  const [text, setText] = useState("");
  const [rec, setRec] = useState(false);
  const L = LANGS[lang];
  const list = L[skill];
  const item = list[i % list.length]!;
  const order = useMemo(() => { const o = [0, 1, 2, 3]; for (let k = 3; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [o[k], o[j]] = [o[j]!, o[k]!]; } return o; }, [lang, skill, i]);

  function reset(l: Lang, s: Skill) { setLang(l); setSkill(s); setI(0); setFb(null); setText(""); setScore({ ok: 0, n: 0 }); }
  function grade(ok: boolean, msg: string) { tone(ok); setFb({ ok, msg }); setScore((s) => ({ ok: s.ok + (ok ? 1 : 0), n: s.n + 1 })); }
  function next() { setI(i + 1); setFb(null); setText(""); }
  function listenMic(expected: string) {
    const SR = (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike; webkitSpeechRecognition?: new () => SpeechRecognitionLike });
    const C = SR.SpeechRecognition ?? SR.webkitSpeechRecognition;
    if (!C) { setFb({ ok: false, msg: "Su navegador no permite el micrófono. Use Chrome o Edge, o escriba la frase." }); return; }
    const r = new C(); r.lang = L.voice; r.interimResults = false; setRec(true);
    r.onresult = (e) => { const got = e.results[0]?.[0]?.transcript ?? ""; setText(got); const p = similarity(expected, got); grade(p >= 75, `Dijo: «${got}» · ${p}% de coincidencia. ${p >= 75 ? "¡Excelente pronunciación!" : "Escuche el modelo y repita más despacio."}`); };
    r.onend = () => setRec(false); r.onerror = () => setRec(false); r.start();
  }

  return (
    <main className="min-h-screen bg-hero"><SiteHeader />
      <section className="mx-auto max-w-3xl space-y-5 px-5 pb-16">
        <h1 className="mt-6 text-4xl font-black">🌍 Destrezas de idiomas</h1>
        <p className="text-muted-foreground">Practique las 4 destrezas del MCER con audio real del navegador, micrófono y retroalimentación al instante.</p>
        <div className="flex flex-wrap gap-2">{(Object.keys(LANGS) as Lang[]).map((l) => <button key={l} className={pill(l === lang)} onClick={() => reset(l, skill)}>{LANGS[l].flag} {LANGS[l].name}</button>)}</div>
        <div className="flex flex-wrap gap-2">{SK.map(([s, n]) => <button key={s} className={pill(s === skill)} onClick={() => reset(lang, s)}>{n}</button>)}</div>
        <article className="rounded-2xl border border-primary bg-card p-6 shadow-card">
          <div className="flex justify-between text-sm font-bold text-muted-foreground"><span>Nivel {item.level} · {(i % list.length) + 1}/{list.length}</span><span>✅ {score.ok}/{score.n}</span></div>
          {(skill === "listen" || skill === "grammar") && (() => { const q = item as MC; return (<>
            {skill === "listen" ? (<div className="mt-4 flex gap-2"><button className="rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground" onClick={() => say(q.q, L.voice)}>🔊 Escuchar</button><button className="rounded-xl border px-4 py-3 font-bold" onClick={() => say(q.q, L.voice, 0.6)}>🐢 Lento</button></div>) : <p className="mt-4 text-xl font-semibold">{q.q}</p>}
            {skill === "listen" && <p className="mt-3 text-sm text-muted-foreground">¿Qué escuchó?</p>}
            <div className="mt-3 grid gap-2">{order.map((k, pos) => <button key={k} disabled={!!fb} onClick={() => grade(k === q.answer, q.why)} className={`rounded-xl border px-4 py-3 text-left ${fb && k === q.answer ? "border-accent" : "border-border"}`}>{"ABCD"[pos]}) {q.options[k]}</button>)}</div>
            {fb && skill === "listen" && <p className="mt-2 text-sm italic">Texto: «{q.q}»</p>}
          </>); })()}
          {skill === "speak" && (() => { const s = item as { text: string; es: string }; return (<>
            <p className="mt-4 text-2xl font-black">{s.text}</p><p className="text-muted-foreground">{s.es}</p>
            <div className="mt-4 flex flex-wrap gap-2"><button className="rounded-xl border px-4 py-3 font-bold" onClick={() => say(s.text, L.voice)}>🔊 Modelo</button>
              <button disabled={rec || !!fb} className="rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground" onClick={() => listenMic(s.text)}>{rec ? "🎙️ Escuchando…" : "🎤 Hablar ahora"}</button></div>
          </>); })()}
          {skill === "write" && (() => { const w = item as { es: string; answer: string }; return (<>
            <p className="mt-4 text-lg">Escriba en {L.name.toLowerCase()}:</p><p className="text-2xl font-black">«{w.es}»</p>
            <input value={text} disabled={!!fb} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && text && grade(similarity(w.answer, text) === 100, `Modelo: «${w.answer}» · ${similarity(w.answer, text)}% correcto.`)} className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-3" placeholder="Su respuesta…" />
            <button disabled={!text || !!fb} className="mt-3 rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground disabled:opacity-50" onClick={() => grade(similarity(w.answer, text) === 100, `Modelo: «${w.answer}» · ${similarity(w.answer, text)}% correcto.`)}>Revisar</button>
          </>); })()}
          {fb && (<div className={`mt-4 rounded-xl border p-4 ${fb.ok ? "border-accent" : "border-destructive"}`}><p className="font-bold">{fb.ok ? "✅ ¡Correcto!" : "💡 Casi, aprendamos"}</p><p className="text-sm">{fb.msg}</p>
            <button className="mt-3 rounded-xl bg-primary px-5 py-2 font-bold text-primary-foreground" onClick={next}>Siguiente →</button></div>)}
        </article>
      </section>
    </main>);
}

 | undefined } | undefined } }) => void; onend: () => void; onerror: () => void };

