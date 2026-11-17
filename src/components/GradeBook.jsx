import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { gradeAverages, GRADE_KINDS } from "@/lib/grades";
import { REA_SOURCE, officialGradeWeights } from '@/lib/rea-weights';


const field = "rounded-md border border-input bg-background p-3";
export function GradeBook({ studentId, editable = false, ownerUserId }: Props) {
  const cache = useQueryClient();
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [kind, setKind] = useState<(typeof GRADE_KINDS)[number]>("cotidiano");
  const [weight, setWeight] = useState("");
  const [title, setTitle] = useState("");
  const [score, setScore] = useState("");
  const officialWeight = officialGradeWeights(subject, level)?.weights[kind];
  const [editing, setEditing] = useState<{ id: string; score: string } | null>(null);
  const key = ["grades", studentId ?? ownerUserId ?? "none"];
  const grades = useQuery({ queryKey: key, queryFn: async () => {
    let q = supabase.from("student_grades").select("id,subject,level,kind,title,score,weight,created_at,students!inner(user_id)").order("created_at", { ascending: false });
    q = studentId ? q.eq("student_id", studentId) : q.eq("students.user_id", ownerUserId ?? "");
    const { data, error } = await q; if (error) throw error; return data;
  } });
  const refresh = () => void cache.invalidateQueries({ queryKey: key });
  const add = useMutation({ mutationFn: async () => {
    const n = Number(score), w = officialWeight ?? Number(weight);
    if (!studentId || !subject.trim() || !title.trim() || score === "" || !(n >= 0 && n <= 100) || (officialWeight === undefined && weight === "") || !(w >= 0 && w <= 100)) throw new Error("Complete materia, descripción, porcentaje del rubro (0–100) y nota (0–100).");
    const { error } = await supabase.from("student_grades").insert({ student_id: studentId, subject: subject.trim(), level: level.trim(), kind, title: title.trim(), score: n, weight: w });
    if (error) throw new Error("No se pudo guardar la nota. Solo el docente a cargo del estudiante puede registrarla.");
  }, onSuccess: () => { setTitle(""); setScore(""); refresh(); } });
  const update = useMutation({ mutationFn: async (e: { id: string; score: string }) => {
    const n = Number(e.score); if (e.score === "" || !(n >= 0 && n <= 100)) throw new Error("La nota debe estar entre 0 y 100.");
    const { error } = await supabase.from("student_grades").update({ score: n }).eq("id", e.id); if (error) throw new Error("No se pudo cambiar la nota.");
  }, onSuccess: () => { setEditing(null); refresh(); } });
  const del = useMutation({ mutationFn: async (id: string) => { const { error } = await supabase.from("student_grades").delete().eq("id", id); if (error) throw error; }, onSuccess: refresh });
  const rows = grades.data ?? [];
  const { bySubject } = gradeAverages(rows.map(r => ({ subject: r.subject, level: r.level, kind: r.kind, score: Number(r.score), weight: Number(r.weight) })));
  return (
    <section className="mt-6 rounded-xl border border-border bg-card p-4" aria-labelledby="gb-title">
      <h3 id="gb-title" className="text-lg font-bold">Calificaciones</h3>
      <p className="mt-1 text-xs text-muted-foreground">Privadas: solo las ven el docente a cargo, el estudiante y su encargado vinculado. Los porcentajes de cada rubro los define el docente según el Reglamento de Evaluación de los Aprendizajes para la materia y el nivel.</p>
      <p className="mt-2 text-xs text-muted-foreground">REAC 45509-MEP: porcentajes verificados para materias comunes con grado explícito (1.º–12.º). Especialidades, modalidades particulares y niveles sin identificar conservan los porcentajes registrados, pendientes de revisión. <a href={REA_SOURCE} target="_blank" rel="noreferrer" className="text-primary underline">Reglamento oficial · artículos 40–42</a></p>
      {editable && <form className="mt-3 grid gap-2 sm:grid-cols-4" onSubmit={e => { e.preventDefault(); add.mutate(); }}>
        <input aria-label="Materia" placeholder="Materia" maxLength={80} value={subject} onChange={e => setSubject(e.target.value)} className={field} />
        <input aria-label="Nivel de la materia" placeholder="Nivel (ej. 7.º)" maxLength={40} value={level} onChange={e => setLevel(e.target.value)} className={field} />
        <select aria-label="Rubro" value={kind} onChange={e => setKind(e.target.value as typeof kind)} className={`${field} capitalize`}>{GRADE_KINDS.map(k => <option key={k} value={k}>{k}</option>)}</select>
        <input aria-label="Porcentaje del rubro" placeholder="% del rubro" type="number" min={0} max={100} step="0.01" value={officialWeight ?? weight} readOnly={officialWeight !== undefined} onChange={e => setWeight(e.target.value)} className={field} />
        <input aria-label="Descripción" placeholder="Descripción" maxLength={120} value={title} onChange={e => setTitle(e.target.value)} className={`${field} sm:col-span-2`} />
        <input aria-label="Nota" placeholder="Nota 0–100" type="number" min={0} max={100} step="0.01" value={score} onChange={e => setScore(e.target.value)} className={field} />
        <Button type="submit" disabled={add.isPending} className="h-12">Registrar nota</Button>
      </form>}
      {(add.isError || update.isError) && <p role="alert" className="mt-2 text-sm text-destructive">{(add.error ?? update.error)?.message}</p>}
      {grades.isError ? <p role="alert" className="mt-3">No se pudieron leer las notas.</p> : !rows.length ? <p className="mt-3 text-sm text-muted-foreground">Sin calificaciones registradas.</p> : <>
        <div className="mt-4 space-y-4">{bySubject.map(s => <div key={s.subject}>
          <p className="font-bold">{s.subject} · Nota {s.grade}</p>
          {!s.complete && <p className="text-xs font-semibold text-accent">Rubros registrados suman {s.totalWeight} % de 100 %; la nota es parcial.</p>}
          <div className="mt-1 h-3 rounded-full bg-muted" role="img" aria-label={`Nota ${s.grade}`}><div className="h-3 rounded-full bg-primary" style={{ width: `${Math.min(100, s.grade)}%` }} /></div>
          <p className="mt-1 text-xs text-muted-foreground">{s.parts.map(p => `${p.kind} ${p.avg} × ${p.weight} %`).join(" · ")}</p>
        </div>)}</div>
        <ul className="mt-4 divide-y divide-border text-sm">{rows.map(r => <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
          <span><strong>{r.subject}</strong>{r.level ? ` ${r.level}` : ""} · <span className="capitalize">{r.kind}</span> ({officialGradeWeights(r.subject,r.level)?.weights[r.kind] ?? Number(r.weight)} %) · {r.title}{officialGradeWeights(r.subject,r.level) ? ` · REAC art. ${officialGradeWeights(r.subject,r.level)?.article}` : ' · Porcentaje docente, pendiente de cotejo'}</span>
          {editing?.id === r.id ? <span className="flex gap-2"><input aria-label="Nueva nota" type="number" min={0} max={100} step="0.01" value={editing.score} onChange={e => setEditing({ id: r.id, score: e.target.value })} className={`${field} w-24 p-2`} /><Button size="sm" onClick={() => update.mutate(editing)}>Guardar</Button><Button size="sm" variant="outline" onClick={() => setEditing(null)}>Cancelar</Button></span>
          : <span className="flex items-center gap-2 font-bold">{Number(r.score)}{editable && <><Button size="sm" variant="outline" onClick={() => setEditing({ id: r.id, score: String(Number(r.score)) })}>Cambiar</Button><Button size="sm" variant="outline" onClick={() => del.mutate(r.id)}>Borrar</Button></>}</span>}
        </li>)}</ul>
      </>}
    </section>
  );
}

