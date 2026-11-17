import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAccount } from "@/components/AccountProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { TeacherAccess } from '@/components/TeacherAccess';
import {importQuestions} from '@/lib/question-import';

export const Route = createFileRoute("/examenes-docentes")({staticData:{sitemap:false},
  head: () => ({ meta: [
    { title: "Exámenes de mi docente | pracTICAtecnica.com" },
    { name: "description", content: "Docentes crean exámenes con clave de respuestas y los publican solo para sus estudiantes." },
    { property: "og:title", content: "Exámenes de mi docente | pracTICAtecnica.com" },
    { property: "og:description", content: "Exámenes propios con tiempo, calificación y clave protegida." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: Page,
});


const blank = (): Q => ({ q: "", options: ["", "", "", ""], answer: 0 });
const input = "w-full rounded-md border border-input bg-background px-3 py-2 text-foreground";

function Page() {
  const { user, ready } = useAccount();
  const roles = useQuery({ queryKey: ["roles", user?.id], enabled: !!user, queryFn: async () => (await supabase.from("user_roles").select("role").eq("user_id", user?.id ?? '')).data?.map((r) => r.role) ?? [] });
  const isTeacher = roles.data?.some((r) => r === "teacher" || r === "admin");
  return (
    <main className="min-h-screen overflow-x-hidden bg-hero">
      <SiteHeader />
      <section className="mx-auto max-w-4xl px-5 pb-16">
        <h1 className="mt-6 text-4xl font-black">📝 Exámenes de mi docente</h1>
        <p className="mt-2 text-muted-foreground">Exámenes creados por cada docente, visibles solo para sus estudiantes. La clave queda protegida y la calificación se calcula en el servidor.</p>
        {!ready ? null : !user ? <p className="mt-6">Inicie sesión para ver sus exámenes.</p> : <>
          {isTeacher && <TeacherAccess><Editor /></TeacherAccess>}
          <StudentExams />
        </>}
      </section>
    </main>
  );
}

function Editor() {
  const qc = useQueryClient();
  const mine = useQuery({ queryKey: ["teacher-exams"], queryFn: async () => (await supabase.from("teacher_exams").select("id,title,minutes,published,questions").order("created_at", { ascending: false })).data ?? [] });
  const [title, setTitle] = useState(""); const [minutes, setMinutes] = useState(20); const [qs, setQs] = useState<Q[]>([blank()]); const [msg, setMsg] = useState("");
  const set = (i: number, f: (q) => Q) => setQs((a) => a.map((q, k) => (k === i ? f(q) : q)));
  const valid = title.trim().length >= 3 && qs.every((q) => q.q.trim() && q.options.every((o) => o.trim()));
  async function save(published: boolean) {
    const { error } = await supabase.from("teacher_exams").insert({ title: title.trim(), minutes, questions: qs, published });
    setMsg(error ? "No se pudo guardar: " + error.message : published ? "Publicado para sus estudiantes." : "Guardado como borrador.");
    if (!error) { setTitle(""); setQs([blank()]); void qc.invalidateQueries({ queryKey: ["teacher-exams"] }); }
  }
  async function toggle(id: string, published: boolean) { await supabase.from("teacher_exams").update({ published }).eq("id", id); void qc.invalidateQueries({ queryKey: ["teacher-exams"] }); }
  return (
    <div className="mt-6 rounded-xl border border-border bg-card p-5">
      <h2 className="text-2xl font-black">Crear examen</h2>
      <label className="mt-4 block text-sm font-semibold">Cargar preguntas propias (JSON)
        <input type="file" accept=".json,application/json" className="mt-2 block w-full min-w-0" onChange={async event=>{const file=event.target.files?.[0];if(!file)return;try{if(file.size>5*1024*1024)throw new Error('Máximo 5 MB.');const imported=importQuestions(await file.text());setQs(imported);setMsg(`${imported.length} preguntas cargadas para revisar; todavía no están guardadas ni publicadas.`);}catch(error){setMsg(error instanceof Error?error.message:'Archivo inválido.');}event.target.value='';}}/>
      </label>
      <Button className="mt-2" variant="outline" onClick={()=>{const blob=new Blob([JSON.stringify([{q:'Enunciado de ejemplo',options:['Correcta','Distractor 1','Distractor 2','Distractor 3'],answer:0}],null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='plantilla-preguntas.json';a.click();URL.revokeObjectURL(url);}}>Descargar plantilla</Button>
      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_8rem]">
        <input aria-label="Título" placeholder="Título del examen" className={input} value={title} onChange={(e) => setTitle(e.target.value)} />
        <input aria-label="Minutos" type="number" min={1} max={180} className={input} value={minutes} onChange={(e) => setMinutes(Number(e.target.value) || 1)} />
      </div>
      {qs.map((q, i) => (
        <fieldset key={i} className="mt-4 rounded-lg border border-border p-3">
          <legend className="px-1 text-sm font-bold">Pregunta {i + 1}</legend>
          <input aria-label={`Pregunta ${i + 1}`} placeholder="Enunciado" className={input} value={q.q} onChange={(e) => set(i, (x) => ({ ...x, q: e.target.value }))} />
          {q.options.map((o, k) => (
            <label key={k} className="mt-2 flex items-center gap-2 text-sm">
              <input type="radio" name={`ans-${i}`} checked={q.answer === k} onChange={() => set(i, (x) => ({ ...x, answer: k }))} aria-label={`Opción ${k + 1} es la correcta`} />
              <input placeholder={`Opción ${k + 1}`} className={input} value={o} onChange={(e) => set(i, (x) => ({ ...x, options: x.options.map((v, j) => (j === k ? e.target.value : v)) }))} />
            </label>
          ))}
          <p className="mt-1 text-xs text-muted-foreground">Marque el círculo de la respuesta correcta (clave).</p>
        </fieldset>
      ))}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => setQs((a) => [...a, blank()])}>+ Pregunta</Button>
        <Button variant="secondary" disabled={!valid} onClick={() => save(false)}>Guardar borrador</Button>
        <Button disabled={!valid} onClick={() => save(true)}>Publicar</Button>
      </div>
      {msg && <p className="mt-2 text-sm font-semibold" role="status">{msg}</p>}
      <h3 className="mt-6 font-bold">Mis exámenes</h3>
      <ul className="mt-2 grid gap-2">{(mine.data ?? []).map((e) => (
        <li key={e.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border p-3 text-sm">
          <span>{e.title} · {(e.questions as unknown[]).length} preguntas · {e.minutes} min · {e.published ? "Publicado" : "Borrador"}</span>
          <Button size="sm" variant="secondary" onClick={() => toggle(e.id, !e.published)}>{e.published ? "Ocultar" : "Publicar"}</Button>
        </li>
      ))}</ul>
    </div>
  );
}

[] };

function StudentExams() {
  const list = useQuery({ queryKey: ["my-teacher-exams"], queryFn: async () => ((await supabase.rpc("my_teacher_exams")).data ?? []) as unknown as PubExam[] });
  const [exam, setExam] = useState<PubExam | null>(null);
  if (exam) return <Take exam={exam} onExit={() => setExam(null)} />;
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-black">Mis exámenes asignados</h2>
      {!list.data?.length ? <p className="mt-2 text-muted-foreground">Aún no hay exámenes publicados por su docente.</p> :
        <ul className="mt-3 grid gap-2">{list.data.map((e) => (
          <li key={e.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-card p-3">
            <span>{e.title} · {e.questions.length} preguntas · {e.minutes} min</span>
            <Button size="sm" onClick={() => setExam(e)}>Iniciar</Button>
          </li>
        ))}</ul>}
    </div>
  );
}

function Take({ exam, onExit }: { exam: PubExam; onExit: () => void }) {
  const [picks, setPicks] = useState<(number | null)[]>(exam.questions.map(() => null));
  const [left, setLeft] = useState(exam.minutes * 60);
  const [res, setRes] = useState<{ correct: number; total: number; answers: number[] } | null>(null);
  const [err, setErr] = useState("");
  async function finish() {
    const { data, error } = await supabase.rpc("grade_teacher_exam", { _exam: exam.id, _picks: picks.map((p) => p ?? -1) });
    if (error) setErr(error.message); else setRes((data as unknown as { correct: number; total: number; answers: number[] }[])[0] ?? null);
  }
  useEffect(() => {
    if (res) return;
    if (left <= 0) { void finish(); return; }
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [left, res]); // eslint-disable-line react-hooks/exhaustive-deps
  const pct = res ? Math.round((res.correct / Math.max(res.total, 1)) * 100) : 0;
  return (
    <div className="mt-6 rounded-xl border border-border bg-card p-5">
      <p className="text-xs font-bold text-accent">{exam.title} · ⏱ {Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}</p>
      {res && <p className="mt-2 text-3xl font-black">{pct}% · {res.correct}/{res.total}</p>}
      <ol className="mt-3 grid gap-4">{exam.questions.map((q, i) => (
        <li key={i}>
          <p className="font-semibold">{i + 1}. {q.q}</p>
          <div className="mt-2 grid gap-2">{q.options.map((o, k) => {
            const mark = res ? (k === res.answers[i] ? " ✅" : picks[i] === k ? " ❌" : "") : "";
            return <Button key={k} disabled={!!res} variant={picks[i] === k ? "default" : "secondary"} className="h-auto justify-start whitespace-normal text-left" onClick={() => setPicks((p) => p.map((v, j) => (j === i ? k : v)))}>{o}{mark}</Button>;
          })}</div>
        </li>
      ))}</ol>
      {err && <p className="mt-2 text-sm text-destructive">{err}</p>}
      <div className="mt-4 flex gap-2">
        {!res && <Button onClick={() => void finish()}>Entregar</Button>}
        <Button variant="secondary" onClick={onExit}>Volver</Button>
      </div>
    </div>
  );
}

