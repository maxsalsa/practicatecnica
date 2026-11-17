import { useQueryClient } from "@tanstack/react-query";
import {isEnglishBank,questionAudio,englishSupport,speakQuestion} from "@/lib/english-audio";
import { AuthorizedContent } from "./AuthorizedContent";
import { useEffect, useState, useRef, forwardRef } from "react";

import { saveAttempt } from "@/components/Progress";
import { useAccount } from "./AccountProvider";
import { useServerFn } from "@tanstack/react-start";
import { recordAttempt } from "@/lib/student.functions";
import { Button } from "./ui/button";
import { earnedPoints, exercisePoints } from "@/lib/progress-data";
import { draftKey, useAssessmentDraft, writeDraft } from '@/lib/assessment-draft';
import { practiceQuestionIndices, PRACTICE_SIZE, isBriefPractice } from '@/lib/assessment-size';
import { variedIndices, readSeen, rememberSeen } from '@/lib/practice-variety';
import { splitQuestionForm } from '@/lib/question-forms';

[]; optionOrder }

function shuffle<T>(a) {
  const copy = [...a];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const x = copy[i];
    const y = copy[j];
    if (x !== undefined && y !== undefined) {
      copy[i] = y;
      copy[j] = x;
    }
  }
  return copy;
}

function QuizBody({
  deck,
  onExit,
  onMore,
  lang = "es",
}) {
  const en = lang === "en";
  const { user } = useAccount();
  const record = useServerFn(recordAttempt);
  const queryClient = useQueryClient();
  const [saveStatus, setSaveStatus] = useState("");
  const [audioStatus, setAudioStatus] = useState("");
  const questionHeading = useRef<HTMLHeadingElement>(null);
  const [responses, setResponses] = useState([]);
  const attemptId = useRef<string | null>(null);
  const persisted = useRef(false);
  useEffect(()=>()=>{if(typeof speechSynthesis!=="undefined")speechSynthesis.cancel();},[]);
  const [optionOrder, setOptionOrder] = useState(() => shuffle([0, 1, 2, 3]));
  const [moreLoading, setMoreLoading] = useState(false);
  const [order, setOrder] = useState(() =>
    isBriefPractice(deck.id) ? shuffle(deck.questions.map((_,i)=>i)) : practiceQuestionIndices(deck.questions.length,deck.progressive ? deck.questions.map((_, i) => i) : shuffle(deck.questions.map((_, i) => i))),
  );
  const [i, setI] = useState(0);
  const [pick, setPick] = useState(null);
  const [sel, setSel] = useState(null);
  const [wrong, setWrong] = useState([]);
  const [score, setScore] = useState(0);
  const done = i >= order.length;
  const q = deck.questions[order[i] ?? 0];
  const key = draftKey(user?.id, deck.id, 'practice', lang);
  const {ready, draft} = useAssessmentDraft<PracticeDraft>(key);
  const [restored, setRestored] = useState(false);
  useEffect(() => {
    if (!restored) return;
    questionHeading.current?.focus();
    setAudioStatus("");
    if (typeof speechSynthesis !== "undefined") speechSynthesis.cancel();
  }, [i, restored]);
  const signature = JSON.stringify(deck.questions.map(q => [q.q,q.options]));
  const seenKey = `pt-seen-v1:${user?.id ?? 'anonymous'}:${splitQuestionForm(deck.id).baseId}:${lang}:${deck.questions.length}`;
  useEffect(() => {
    if (!ready || restored) return;
    if (draft?.signature === signature) {
      const s = draft.state;
      if(!isBriefPractice(deck.id)&&s.order.length!==PRACTICE_SIZE){setRestored(true);return;}
      setOrder(s.order); setI(s.i); setPick(s.pick); setSel(s.sel); setWrong(s.wrong);
      setScore(s.score); setResponses(s.responses); setOptionOrder(s.optionOrder);
    } else if (!deck.progressive) {
      setOrder(variedIndices(deck.questions.length, isBriefPractice(deck.id) ? deck.questions.length, readSeen(seenKey)));
    }
    setRestored(true);
  }, [ready, restored, draft, signature]);
  useEffect(() => {
    if (!restored) return;
    writeDraft(key, done ? null : {request:deck.id,signature,state:{order,i,pick,sel,wrong,score,responses,optionOrder}});
  }, [restored,key,done,signature,deck.id,order,i,pick,sel,wrong,score,responses,optionOrder]);

  useEffect(() => {
    if (!done || persisted.current) return;
    persisted.current = true;
    const pct = Math.round((score / order.length) * 100);
    const b = JSON.parse(localStorage.getItem("pt-best") || "{}");
    if (!(b[deck.id] >= pct))
      localStorage.setItem("pt-best", JSON.stringify({ ...b, [deck.id]: pct }));
    if (user) {
      const id = attemptId.current ?? crypto.randomUUID();
      attemptId.current = id;
      setSaveStatus("Guardando en la nube…");
      void record({
        data: { id, deckId: deck.id, title: deck.title, answers, reportedScore },
      })
        .then(() => { setSaveStatus("✓ Avance guardado en la nube."); void queryClient.invalidateQueries({ queryKey: ["header-streak"] }); void queryClient.invalidateQueries({queryKey:['topic-points']}); })
        .catch(() =>
          setSaveStatus("No se pudo guardar. Mantenga esta pantalla y vuelva a intentar."),
        );
    } else
      saveAttempt(
        {
          ...deck,
          questions .map((index) => deck.questions[index])
            .filter((x): x is NonNullable<typeof x> => !!x),
        },
        pct,
        deck.id.startsWith("ia-") ? 0 : earnedPoints(deck.questions, responses),
      );
    }, [done]);

  const answer = (k) => {
    if (pick !== null || !q) return;
    setPick(k);
    const index = order[i];
    if (index === undefined) return;
    rememberSeen(seenKey, index, deck.questions.length);
    setResponses((r) => [...r, { index, pick }]);
    if (k === q.answer) setScore((s) => s + 1);
    else setWrong((w) => [...w, index]);
  };
  const restart = (ids) => {
    setOrder(deck.progressive ? [...ids].sort((a, b) => a - b) : shuffle(ids));
    setI(0);
    setPick(null);
    setSel(null);
    setWrong([]);
    setScore(0);
    setResponses([]);
    setSaveStatus("");
    attemptId.current = null;
    persisted.current = false;
    setOptionOrder(shuffle([0, 1, 2, 3]));
  };

  if (!restored) return <p role="status">Recuperando avance…</p>;
  if (done) {
    const pct = Math.round((score / order.length) * 100);
    return (
      <section className="mx-auto max-w-xl px-5 py-10 text-center">
        <div className="text-6xl">{pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "📚"}</div>
        <h2 className="mt-4 text-4xl font-extrabold">{pct}%</h2>
        <p className="mt-2 font-bold text-accent">
          {deck.id.startsWith("ia-") ? 0 : earnedPoints(deck.questions, responses)} XP ·{" "}
          {en ? "correct answers" : "respuestas correctas"}
        </p>
        <p className="text-muted-foreground">
          {score} {en ? "of" : "de"} {order.length} {en ? "correct" : "correctas"} ·{" "}
          {pct >= 70
            ? en
              ? "Passed!"
              : "¡Aprobado!"
            : en
              ? "Keep practising; the practice target is 70%"
              : "Siga practicando; la nota mínima es 70"}
        </p>
        {user ? (
          <>
            <p role="status" className="mt-3 text-sm text-muted-foreground">
              {saveStatus}
            </p>
            {saveStatus.startsWith("No se") && (
              <Button
                className="mt-3"
                onClick={async () => {
                  setSaveStatus("Guardando…");
                  try {
                    await record({
                      data: {
                        id: attemptId.current ?? crypto.randomUUID(),
                        deckId: deck.id,
                        title: deck.title,
                        answers,
                        reportedScore,
                      },
                    });
                    setSaveStatus("✓ Avance guardado en la nube.");
                    void queryClient.invalidateQueries({ queryKey: ["header-streak"] });
                  } catch {
                    setSaveStatus("No se pudo guardar. Intente de nuevo.");
                  }
                }}
              >
                Reintentar guardado
              </Button>
            )}
          </>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            Guardado en este navegador. Ingrese para guardar futuras prácticas en la nube.
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {wrong.length > 0 && (
            <Button
              variant="ghost"
              onClick={() => {
                restart(wrong);
              }}
              className="rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground"
            >
              Repasar {wrong.length} errores
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={() => restart(variedIndices(deck.questions.length, isBriefPractice(deck.id) ? deck.questions.length, readSeen(seenKey)))}
            className="rounded-full border bg-card px-5 py-3 font-semibold"
          >
            Repetir todo
          </Button>
          {onMore && (
            <Button
              variant="ghost"
              disabled={moreLoading}
              onClick={async () => {
                setMoreLoading(true);
                try {
                  await onMore();
                } finally {
                  setMoreLoading(false);
                }
              }}
              className="rounded-full bg-accent px-5 py-3 font-bold text-accent-foreground disabled:opacity-50"
            >
              {moreLoading ? "Creando…" : "∞ Más preguntas"}
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={onExit}
            className="rounded-full px-5 py-3 font-semibold text-muted-foreground"
          >
            Otros temas
          </Button>
        </div>
      </section>
    );
  }

  if (!q) return null;
  return (
    <section className="mx-auto max-w-2xl px-5 py-6">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <Button
          variant="ghost"
          className="h-auto min-w-0 whitespace-normal text-left"
          onClick={onExit}
        >
          ← {deck.title}
        </Button>
        <span className="shrink-0">
          {i + 1}/{order.length}
        </span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${(i / order.length) * 100}%` }}
        />
      </div>
      <div className="mt-6 rounded-2xl border bg-card p-6 shadow-card">
        <p className="mb-3 text-sm font-semibold text-primary">
          {en
            ? ["Foundation", "Application", "Reasoning"][(q.difficulty ?? 1) - 1]
            : ["Fundamentos", "Aplicación", "Razonamiento"][(q.difficulty ?? 1) - 1]}{" "}
          · {deck.id.startsWith("ia-") ? 0 : exercisePoints(q)} XP
        </p>
        <h2 ref={questionHeading} tabIndex={-1} className="text-2xl font-bold focus-visible focus-visible:outline-2 focus-visible:outline-ring">{q.q}</h2>
        {!isEnglishBank(deck.id) && <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="outline" className="min-h-11" onClick={() => {
            const options = optionOrder.flatMap(k => q.options[k] === undefined ? [] : [q.options[k]]);
            if (!speakQuestion(questionAudio({...q, options}), en ? 'en-US' : 'es-CR')) setAudioStatus(en ? 'Speech is unavailable in this browser.' : 'Su navegador no dispone de lectura por voz.');
          }}>{en ? 'Leer en voz alta · Read aloud' : 'Leer en voz alta'}</Button>
          <Button variant="outline" className="min-h-11" onClick={() => {if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();}}>{en ? 'Stop audio' : 'Detener audio'}</Button>
        </div>}
        <p role="status" className="mt-2 text-sm text-muted-foreground">{audioStatus}</p>
        {isEnglishBank(deck.id)&&<div className="mt-3 flex flex-wrap gap-2"><Button variant="outline" className="min-h-11" onClick={()=>{if(!speakQuestion(questionAudio(q),'en-US'))setSaveStatus('Su navegador no dispone de lectura por voz.');}}>🔊 English</Button><Button variant="outline" className="min-h-11" onClick={()=>{if(!speakQuestion(englishSupport(q),'es-CR'))setSaveStatus('Su navegador no dispone de lectura por voz.');}}>🔊 Apoyo en español</Button></div>}
        <div className="mt-5 grid gap-3">
          {optionOrder.map((k, position) => {
            const o = q.options[k];
            const state =
              pick === null
                ? sel === k
                  ? "border-primary bg-primary/15"
                  : "border-border hover:border-primary"
                : k === q.answer
                  ? "border-success bg-success/10"
                  : k === pick
                    ? "border-destructive bg-destructive/10"
                    : "border-border opacity-60";
            return (
              <Button
                variant="ghost"
                key={k}
                onClick={() => pick === null && setSel(k)}
                aria-pressed={sel === k}
                className={`h-auto min-h-11 justify-start whitespace-normal rounded-xl border-2 px-4 py-3 text-left font-medium transition ${state}`}
              >
                <span className="mr-2 text-muted-foreground">{"ABCD"[position]}.</span>
                {o}
              </Button>
            );
          })}
        </div>
        {pick === null && (
          <Button
            variant="ghost"
            disabled={sel === null}
            onClick={() => sel !== null && answer(sel)}
            className="mt-5 w-full rounded-full bg-primary px-5 py-3 font-bold text-primary-foreground disabled:opacity-40"
          >
            {sel === null
              ? en
                ? "Select an option"
                : "Seleccione una opción"
              : `${en ? "Confirm answer" : "Confirmar respuesta"} ${"ABCD"[optionOrder.indexOf(sel)]}`}
          </Button>
        )}
        {pick !== null && (
          <div role="status" aria-live="polite" aria-atomic="true" className="mt-5 rounded-xl bg-muted p-4">
            <p className="font-semibold">
              {pick === q.answer
                ? en
                  ? "✅ Correct!"
                  : "✅ ¡Correcto!"
                : en
                  ? "❌ Not quite."
                  : "❌ Casi."}{" "}
              <span className="font-normal">{q.why}</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {en ? "Source:" : "Fuente:"} {q.source}
            </p>
            <Button
              variant="ghost"
              onClick={() => {
                setI(i + 1);
                setPick(null);
                setSel(null);
                setOptionOrder(shuffle([0, 1, 2, 3]));
              }}
              className="mt-4 rounded-full bg-primary px-5 py-2 font-semibold text-primary-foreground"
            >
              {i + 1 < order.length
                ? en
                  ? "Next"
                  : "Siguiente"
                : en
                  ? "View result"
                  : "Ver resultado"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export const Quiz=forwardRef<HTMLDivElement,QuizProps>(({deck,onExit,onMore,lang,className,...rest},ref)=>{const props={deck,onExit,lang:lang??'es',...(onMore?{onMore}:{})};const render=(loaded)=>loaded.questions.length<PRACTICE_SIZE&&!isBriefPractice(loaded.id)?<section className="mx-auto max-w-2xl px-5 py-8"><h2 className="text-xl font-bold">Práctica en preparación</h2><p className="mt-3 text-muted-foreground">Este banco tiene {loaded.questions.length} preguntas; la práctica requiere 20 preguntas de la misma materia.</p><Button className="mt-4" variant="outline" onClick={onExit}>Volver</Button></section>:<QuizBody {...props} deck={loaded}/>;return <div ref={ref} className={className} {...rest}>{deck.questions.length?render(deck):<AuthorizedContent id={deck.id} lang={lang??'es'}>{render}</AuthorizedContent>}</div>;});
Quiz.displayName='Quiz';

