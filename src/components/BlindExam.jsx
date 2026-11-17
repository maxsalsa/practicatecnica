import {isEnglishBank,questionAudio,englishSupport,speakQuestion} from "@/lib/english-audio";
import { AuthorizedContent } from "./AuthorizedContent";
import { useEffect, useMemo, useRef, useState, forwardRef, type HTMLAttributes } from "react";
import type { Deck } from "@/lib/questions";
import { Button } from "./ui/button";
import { useAccount } from './AccountProvider';
import { useServerFn } from '@tanstack/react-start';
import { recordAttempt } from '@/lib/student.functions';
import { draftKey, useAssessmentDraft, writeDraft } from '@/lib/assessment-draft';
import { examHasRequiredSize } from '@/lib/assessment-size';



const L = ["A", "B", "C", "D", "E"];
type Filter = "todas" | "fallos" | "dudas" | "blanco";

function BlindExamBody({ deck, onExit }: { deck: Deck; onExit: () => void }) {
  const { user } = useAccount();
  const record = useServerFn(recordAttempt);
  const saved = useRef(false);
  const attemptId = useRef<string | undefined>(undefined);
  useEffect(()=>()=>{if(typeof speechSynthesis!=="undefined")speechSynthesis.cancel();},[]);
  const [saveStatus, setSaveStatus] = useState('');
  const [qs, setQs] = useState(deck.questions);
  const [i, setI] = useState(0);
  const [marks, setMarks] = useState<(number | null)[]>(() => qs.map(() => null));
  const [doubt, setDoubt] = useState<boolean[]>(() => qs.map(() => false));
  const [done, setDone] = useState(false);
  const [left, setLeft] = useState(qs.length * 90);
  const [paused, setPaused] = useState(false);
  const [filter, setFilter] = useState<Filter>("todas");
  const key = draftKey(user?.id, deck.id, 'exam');
  const {ready,draft} = useAssessmentDraft<ExamDraft>(key);
  const [restored,setRestored] = useState(false);
  const sessionId = useRef(deck.examSessionId);
  const signature = JSON.stringify(deck.questions.map(q => [q.q,q.options]));
  useEffect(() => {
    if (!ready || restored) return;
    if (draft?.signature === signature) {
      const s = draft.state;
      setI(s.i); setMarks(s.marks); setDoubt(s.doubt); setLeft(s.left); setPaused(s.paused);
      sessionId.current = draft.session;
    }
    setRestored(true);
  }, [ready,restored,draft,signature]);
  useEffect(() => {
    if (!restored) return;
    writeDraft(key, done ? null : {request:deck.id,signature,session:sessionId.current,state:{i,marks,doubt,left,paused}});
  }, [restored,key,done,signature,deck.id,i,marks,doubt,left,paused]);
  useEffect(() => {
    if (done || paused || !restored) return;
    const t = setInterval(() => setLeft((s) => { if (s <= 1) { setDone(true); return 0; } return s - 1; }), 1000);
    return () => clearInterval(t);
  }, [done, paused, restored]);
  const score = useMemo(() => marks.filter((m, k) => m === qs[k]?.answer).length, [marks, qs]);
  const answered = marks.filter((m) => m !== null).length;
  const wrong = answered - score;
  const blank = qs.length - answered;
  const doubts = doubt.filter(Boolean).length;
  const doubtOk = doubt.filter((d, k) => d && marks[k] === qs[k]?.answer).length;
  const pct = Math.round((score / qs.length) * 100);
  const pctAnswered = answered ? Math.round((score / answered) * 100) : 0;
  const band = pct >= 80 ? "Dominado" : pct >= 50 ? "En proceso" : "Reforzamiento";
  const q = qs[i];
  const setMark = (n: number, o: number) => setMarks((m) => m.map((v, k) => (k === n ? o : v)));
  const toggleDoubt = (n: number) => setDoubt((d) => d.map((v, k) => (k === n ? !v : v)));
  const visible = qs.map((_, n) => n).filter((n) =>
    filter === "todas" ? true : filter === "dudas" ? doubt[n] : filter === "blanco" ? marks[n] === null : done && marks[n] !== null && marks[n] !== qs[n]?.answer);

  async function saveResult() {
    if (!user || qs.length !== deck.questions.length || marks.some(m => m === null)) return;
    attemptId.current ??= crypto.randomUUID();
    setSaveStatus('Guardando resultado…');
    try {
      await record({ data: { id: attemptId.current, deckId: deck.id, title: deck.title, answers: marks.flatMap((pick,index) => pick === null ? [] : [{index,pick}]), reportedScore: pct, examSessionId:sessionId.current } });
      setSaveStatus('Resultado guardado por área.');
    } catch { setSaveStatus('No se pudo guardar el resultado.'); }
  }
  useEffect(() => {
    if (!done || saved.current || !deck.examSessionId) return;
    saved.current = true;
    if (marks.some(m => m === null)) setSaveStatus('Resultado incompleto: no se guarda como intento verificado.');
    else if (!user) setSaveStatus('Ingrese a su cuenta para guardar resultados.');
    else if (qs.length === deck.questions.length) void saveResult();
  }, [done]);

  function retryWrong() {
    const bad = qs.filter((x, k) => marks[k] !== x.answer);
    if (!bad.length) return;
    setQs(bad); setMarks(bad.map(() => null)); setDoubt(bad.map(() => false));
    setI(0); setDone(false); setLeft(bad.length * 90); setFilter("todas");
  }

  if (!restored) return <p role="status">Recuperando avance…</p>;
  if (!q) return null;
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16">
      <div className="hidden print:block">
        <h1 className="text-2xl font-black">{deck.title} · Simulacro</h1>
        <ol className="mt-4 space-y-4">{qs.map((x, n) => (<li key={n} className="break-inside-avoid"><p className="font-bold">{n + 1}) {x.q}</p>{x.options.map((o, k) => <p key={k} className="ml-4">{L[k]}) {o}</p>)}</li>))}</ol>
        <h2 className="mt-8 break-before-page text-xl font-black">Hoja de respuestas</h2>
        <div className="mt-2 grid grid-cols-3 gap-1 text-sm">{qs.map((_, n) => <p key={n}>{n + 1}. Ⓐ Ⓑ Ⓒ Ⓓ</p>)}</div>
        {done && <>
          <h2 className="mt-8 break-before-page text-xl font-black">Resultados y referencias</h2>
          <p>{score} de {qs.length} correctas · {pct}% · {band}</p>
          {qs.map((x, n) => <div key={n} className="mt-4 break-inside-avoid"><p>{n + 1}. Su respuesta: {marks[n] === null ? 'En blanco' : L[marks[n] ?? 0]} · Correcta: {L[x.answer]}</p><p>{x.why}</p><p className="break-words">{x.source}</p></div>)}
        </>}
      </div>
      <div className="print:hidden">
      <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-2 rounded-xl border bg-card p-3">
        <strong>{deck.title}</strong>{q&&isEnglishBank(deck.id)&&<><Button variant="outline" className="min-h-11" onClick={()=>{if(!speakQuestion(questionAudio(q),'en-US'))setSaveStatus('Su navegador no dispone de lectura por voz.');}}>🔊 English</Button><Button variant="outline" className="min-h-11" onClick={()=>{if(!speakQuestion(englishSupport(q),'es-CR'))setSaveStatus('Su navegador no dispone de lectura por voz.');}}>🔊 Apoyo en español</Button></>}
        <span className="font-bold">⏱ {String(Math.floor(left / 60)).padStart(2, "0")}:{String(left % 60).padStart(2, "0")}</span>
        {!done && <Button variant="outline" onClick={() => setPaused((p) => !p)}>{paused ? "Reanudar" : "Pausar"}</Button>}
        <Button variant="outline" onClick={() => window.print()}>🖨️ Imprimir / PDF</Button>
        <Button variant="ghost" onClick={onExit}>Salir</Button>
      </div>

      {/* Hoja de seguimiento */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-center sm:grid-cols-4 lg:grid-cols-6">
        <Stat label="Respondidas" value={`${answered}/${qs.length}`} />
        <Stat label="En blanco" value={blank} />
        <Stat label="Dudas ❓" value={doubts} />
        {done ? (<>
          <Stat label="Correctas ✅" value={score} tone="accent" />
          <Stat label="Fallos ❌" value={wrong} tone="destructive" />
          <Stat label="Nota (1-100)" value={pct} tone="primary" />
        </>) : (<>
          <Stat label="Avance" value={`${Math.round((answered / qs.length) * 100)}%`} />
          <Stat label="Tiempo por ítem" value="1,5 min" />
          <Stat label="Nota" value="al entregar" />
        </>)}
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full bg-primary transition-all" style={{ width: `${(answered / qs.length) * 100}%` }} /></div>

      {done && (
        <article className="mt-6 rounded-2xl border border-primary bg-card p-6 shadow-card">
          <div className="text-center">
            <p className="text-xs font-bold tracking-widest text-accent">RESULTADO</p>
            <p className="mt-2 text-5xl font-black text-primary">{pct}</p>
            <p className="mt-1">{score} de {qs.length} correctas · Banda: <strong>{band}</strong></p>
          </div>
          <ul className="mx-auto mt-4 max-w-xl space-y-1 text-sm">
            <li>📊 Nota proporcional: {score} ÷ {qs.length} × 100 = <strong>{pct}</strong></li>
            <li>🎯 Acierto en lo que respondió: <strong>{pctAnswered}%</strong> ({score} de {answered})</li>
            <li>❓ Dudas acertadas: <strong>{doubtOk} de {doubts}</strong></li>
            <li>⬜ Preguntas en blanco: <strong>{blank}</strong> (cuentan como no acertadas)</li>
          </ul>
          <p className="mt-3 text-center text-sm text-muted-foreground">{pct >= 80 ? "¡Excelente! Ya domina este tema. Mantenga el ritmo." : pct >= 50 ? "Va por buen camino. Repase los fallos y vuelva a intentarlo." : "Cada error es una lección. Repase los fallos con calma: usted puede."}</p>
          {saveStatus && <p role="status" className="mt-3 text-center text-sm">{saveStatus}</p>}
          {saveStatus === 'No se pudo guardar el resultado.' && <Button className="mt-3" variant="outline" onClick={() => void saveResult()}>Reintentar guardado</Button>}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {wrong + blank > 0 && <Button onClick={retryWrong}>🔁 Repetir solo fallos y blancos ({wrong + blank})</Button>}
            <Button variant="outline" onClick={() => { const esc = (t?: string) => (t ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;"); const rows = qs.map((x, k) => `<h3>${k + 1}. ${esc(x.q)}</h3><p>Su respuesta: ${marks[k] === null ? "En blanco" : esc(x.options[marks[k] as number])}</p><p>Correcta: ${esc(x.options[x.answer])}</p><p>${esc(x.why)}</p>`).join(""); const blob = new Blob([`<html><meta charset="utf-8"><body><h1>${esc(deck.title)}</h1>${rows}</body></html>`], { type: "application/msword" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "resultados.doc"; a.click(); }}>📄 Descargar Word</Button>
            <Button variant="outline" onClick={() => { setFilter("fallos"); const f = qs.findIndex((x, k) => marks[k] !== null && marks[k] !== x.answer); if (f >= 0) setI(f); }}>Ver correcciones</Button>
          </div>
        </article>
      )}

      {paused && !done ? (
        <p className="mt-10 text-center text-lg font-semibold">En pausa. Las preguntas quedan ocultas.</p>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-[1fr_300px]">
          <article className="rounded-2xl border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-bold text-primary">Pregunta {i + 1} de {qs.length}</p>
              {!done && <Button size="sm" variant={doubt[i] ? "default" : "outline"} onClick={() => toggleDoubt(i)}>❓ {doubt[i] ? "Marcada con duda" : "Marcar duda"}</Button>}
            </div>
            <h2 className="mt-2 whitespace-pre-line text-lg font-bold">{q.q}</h2>
            <div className="mt-4 grid gap-2">
              {q.options.map((o, k) => {
                const sel = marks[i] === k;
                const st = done ? (k === q.answer ? "border-accent bg-accent/15" : sel ? "border-destructive bg-destructive/10" : "") : sel ? "border-primary bg-primary/15" : "";
                return (
                  <Button variant="outline" key={k} disabled={done} onClick={() => setMark(i, k)} className={`h-auto justify-start whitespace-normal gap-3 rounded-lg border p-3 text-left ${st}`}>
                    <span className="font-bold">{L[k]})</span><span className="flex-1">{o}</span>
                    {done && k === q.answer && <span>✅</span>}{done && sel && k !== q.answer && <span>❌</span>}
                  </Button>
                );
              })}
            </div>
            {done && (
              <div className="mt-4 rounded-xl bg-muted p-3 text-sm">
                <p className="font-bold">{marks[i] === q.answer ? "✅ Correcta" : marks[i] === null ? `⬜ En blanco · Correcta: ${L[q.answer]}` : `❌ Usted marcó ${L[marks[i] ?? 0]} · Correcta: ${L[q.answer]}`}</p>
                <p className="mt-1">💡 {q.why}</p>
                <p className="mt-2 break-words text-xs text-muted-foreground">{q.source}</p>
              </div>
            )}
            <div className="mt-5 flex justify-between">
              <Button variant="outline" disabled={i === 0} onClick={() => setI(i - 1)}>← Anterior</Button>
              <Button variant="outline" disabled={i === qs.length - 1} onClick={() => setI(i + 1)}>Siguiente →</Button>
            </div>
          </article>
          <aside className="rounded-2xl border bg-card p-4">
            <h3 className="font-black">Hoja de respuestas</h3>
            <p className="text-xs text-muted-foreground">Puede cambiar su opción y marcar dudas hasta entregar.</p>
            <div className="mt-2 flex flex-wrap gap-1 text-xs">
              {(["todas", "dudas", "blanco", ...(done ? ["fallos"] : [])] as Filter[]).map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`rounded-full border px-2 py-1 font-bold ${filter === f ? "bg-primary text-primary-foreground" : ""}`}>{f === "todas" ? "Todas" : f === "dudas" ? "❓ Dudas" : f === "blanco" ? "⬜ Blanco" : "❌ Fallos"}</button>
              ))}
            </div>
            <div className="mt-3 max-h-[60vh] space-y-1 overflow-auto pr-1">
              {visible.length === 0 && <p className="text-xs text-muted-foreground">Nada en este filtro.</p>}
              {visible.map((n) => { const qq = qs[n]; if (!qq) return null; return (
                <div key={n} className={`flex items-center gap-1 rounded-lg px-1 ${n === i ? "bg-muted" : ""}`}>
                  <button onClick={() => setI(n)} className="w-7 text-right text-xs font-bold">{n + 1}</button>
                  {qq.options.map((_, k) => {
                    const on = marks[n] === k;
                    const c = done ? (k === qq.answer ? "bg-accent text-accent-foreground" : on ? "bg-destructive text-destructive-foreground" : "") : on ? "bg-primary text-primary-foreground" : "";
                    return <button key={k} disabled={done} aria-label={`Pregunta ${n + 1} opción ${L[k]}`} onClick={() => { setI(n); setMark(n, k); }} className={`h-6 w-6 rounded-full border text-[10px] font-bold ${c}`}>{L[k]}</button>;
                  })}
                  <button disabled={done} onClick={() => toggleDoubt(n)} aria-label={`Duda en pregunta ${n + 1}`} className={`ml-1 text-xs ${doubt[n] ? "" : "opacity-25"}`}>❓</button>
                  {done && <span className="text-xs">{marks[n] === qq.answer ? "✅" : marks[n] === null ? "⬜" : "❌"}</span>}
                </div>
              ); })}
            </div>
            {!done && (
              <Button className="mt-4 w-full" onClick={() => { if (answered === qs.length || confirm(`Le faltan ${blank} preguntas${doubts ? ` y tiene ${doubts} dudas` : ""}. ¿Entregar de todos modos?`)) setDone(true); }}>Entregar prueba</Button>
            )}
          </aside>
        </div>
      )}
      </div>
    </section>
  );
}

function Stat({ label, value, tone }: { label: string; value: string | number; tone?: "accent" | "destructive" | "primary" }) {
  const c = tone === "accent" ? "text-accent" : tone === "destructive" ? "text-destructive" : tone === "primary" ? "text-primary" : "";
  return <div className="rounded-xl border bg-card p-2"><p className={`text-xl font-black ${c}`}>{value}</p><p className="text-[11px] text-muted-foreground">{label}</p></div>;
}

export interface BlindExamProps extends HTMLAttributes<HTMLDivElement> {deck:Deck;onExit:()=>void}
export const BlindExam=forwardRef<HTMLDivElement,BlindExamProps>(({deck,onExit,className,...rest},ref)=>{const render=(loaded)=>examHasRequiredSize(loaded.questions.length)?<BlindExamBody deck={loaded} onExit={onExit}/>:<section className="mx-auto max-w-2xl px-5 py-8"><h2 className="text-xl font-bold">Simulacro en preparación</h2><p className="mt-3 text-muted-foreground">Este banco tiene {loaded.questions.length} preguntas; el simulacro requiere exactamente 60 preguntas de la misma materia.</p><Button className="mt-4" variant="outline" onClick={onExit}>Volver</Button></section>;return <div ref={ref} className={className} {...rest}>{deck.questions.length?render(deck):<AuthorizedContent id={deck.id} exam>{render}</AuthorizedContent>}</div>;});
BlindExam.displayName='BlindExam';

