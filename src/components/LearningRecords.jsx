import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { schoolSubjects, schoolLevels } from "@/lib/school-practice";
import { learningInput } from "@/lib/learning-input";
import { skillAreas } from '@/lib/skill-areas';
import { RUBRIC_LEVELS, RUBRIC_DESCRIPTORS } from '@/lib/teaching-rubric';
export function LearningRecords({ studentId, userId }) {
    const cache = useQueryClient();
    const [subject, setSubject] = useState("matematica");
    const [level, setLevel] = useState(schoolLevels[0] ?? "6.º primaria");
    const [progress, setProgress] = useState(0);
    const [notes, setNotes] = useState("");
    const [indicator, setIndicator] = useState('');
    const [rating, setRating] = useState(3);
    const [reason, setReason] = useState('');
    const records = useQuery({
        queryKey: ["learning-records", studentId],
        queryFn() { }
    });
    {
        const { data, error } = await supabase
            .from("student_learning_records")
            .select("*")
            .eq("student_id", studentId)
            .order("updated_at", { ascending });
        if (error)
            throw error;
        return data;
    }
}
;
const save = useMutation({
    mutationFn() { }
});
{
    const rubricNote = indicator.trim() ? `Indicador: ${indicator.trim()}\nRúbrica ${rating}/3: ${RUBRIC_DESCRIPTORS[rating]}${rating === 0 ? `\nMotivo: ${reason.trim()}` : ''}\n${notes}` : notes;
    const input = learningInput.parse({ studentId, subject, level, progress, notes });
    const { error } = await supabase
        .from("student_learning_records")
        .upsert({
        student_id: input.studentId,
        subject: input.subject,
        level: input.level,
        progress: input.progress,
        notes: input.notes,
        recorded_by,
        updated_at, Date() { }, : .toISOString(),
    }, { onConflict: "student_id,subject,level" });
    if (error)
        throw error;
}
onSuccess: () => cache.invalidateQueries({ queryKey: ["learning-records", studentId] }),
;
;
return (<section className="mt-6 border-y py-5">
      <h3 className="text-lg font-bold">Avance registrado por el docente</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
        save.mutate();
    }} className="mt-4 grid gap-3 sm:grid-cols-3">
        <label className="grid gap-1 text-sm">
          Materia o destreza
          <select className="w-full min-w-0 max-w-full rounded-md border bg-background p-3" value={subject} onChange={(e) => setSubject(e.target.value)}>
            {schoolSubjects.map((s) => (<option value={s.id} key={s.id}>
                {s.title}
              </option>))}
            {skillAreas.map(s => <option value={s.id} key={s.id}>{s.title}</option>)}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          Nivel
          <select className="w-full min-w-0 max-w-full rounded-md border bg-background p-3" value={level} onChange={(e) => setLevel(e.target.value)}>
            {schoolLevels.map((l) => (<option key={l}>{l}</option>))}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          Avance del tema (%)
          <input className="w-full min-w-0 max-w-full rounded-md border bg-background p-3" type="number" required min={0} max={100} step={1} value={progress} onChange={(e) => setProgress(Number(e.target.value))}/>
        </label>
        <label className="grid gap-1 text-sm sm:col-span-3">
          Indicador de logro
          <input maxLength={200} value={indicator} onChange={e => setIndicator(e.target.value)} className="w-full min-w-0 max-w-full rounded-md border border-input bg-background p-3"/>
        </label>
        <label className="grid gap-1 text-sm sm:col-span-3">Valoración de rúbrica
          <select aria-label="Valoración de rúbrica" value={rating} onChange={e => { const next = Number(e.target.value); if (RUBRIC_LEVELS.some(n => n === next))
    setRating(next); }} className="w-full min-w-0 max-w-full rounded-md border border-input bg-background p-3">
            {RUBRIC_LEVELS.map(value => <option key={value} value={value}>{value} · {RUBRIC_DESCRIPTORS[value]}</option>)}
          </select>
        </label>
        {rating === 0 && <label className="grid gap-1 text-sm sm:col-span-3">Motivo de ausencia o falta de entrega<input required maxLength={150} value={reason} onChange={e => setReason(e.target.value)} className="w-full min-w-0 max-w-full rounded-md border border-input bg-background p-3"/></label>}
        <label className="grid gap-1 text-sm sm:col-span-3">
          Tema y observaciones
          <textarea maxLength={1000} value={notes} onChange={(e) => setNotes(e.target.value)} className="rounded-md border bg-background p-3"/>
        </label>
        <Button className="justify-self-start" type="submit" disabled={save.isPending}>
          {save.isPending ? "Guardando…" : "Guardar avance"}
        </Button>
      </form>
      {save.isError && (<p role="alert" className="mt-3 text-destructive">
          No se pudo guardar. Verifique sus permisos e intente de nuevo.
        </p>)}
      {save.isSuccess && (<p role="status" className="mt-3 text-success">
          Avance guardado.
        </p>)}
      {records.isPending ? (<p className="mt-3">Cargando avances…</p>) : records.isError ? (<p role="alert">No se pudieron cargar los avances.</p>) : (<ul className="mt-5 divide-y">
          {records.data.map((r) => (<li key={r.id} className="py-3 text-sm">
              <div className="flex flex-wrap justify-between gap-2">
                <strong>
                  {schoolSubjects.find((s) => s.id === r.subject)?.title ?? skillAreas.find(s => s.id === r.subject)?.title ?? r.subject} · {r.level}
                </strong>
                <span>{r.progress}% · registro docente</span>
              </div>
              <p className="mt-1 text-muted-foreground">{r.notes}</p>
              <time dateTime={r.updated_at} className="mt-1 block text-xs text-muted-foreground">{new Date(r.updated_at).toLocaleString('es-CR', { timeZone: 'America/Costa_Rica' })}</time>
            </li>))}
          {records.data.length === 0 && (<li className="text-sm text-muted-foreground">Sin avances manuales registrados.</li>)}
        </ul>)}
    </section>);
