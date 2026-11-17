import { useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { INSTITUTION_KIND_LABELS } from '@/lib/institutions';
import { DAYS, PERIODS_BY_KIND, parseDaysOff, parseLoads, scheduleOptions } from '@/lib/schedule';
import { importScheduleLoads } from '@/lib/schedule-import';
import {editScheduleCell} from '@/lib/schedule-edit';
import {Dialog,DialogContent,DialogTitle,DialogDescription} from '@/components/ui/dialog';

const EXAMPLE = '7-1 | Matemática | Ana Mora | 5\n7-1 | Español | Luis Rojas | 5\n7-2 | Matemática | Ana Mora | 5\n7-2 | Español | Luis Rojas | 5';

export function SchedulePanel({ institutionId, kind, canEdit }: { institutionId: string; kind: InstitutionKind; canEdit }) {
  const qc = useQueryClient();
  const [periods, setPeriods] = useState(PERIODS_BY_KIND[kind] ?? 8);
  const [maxDaily, setMaxDaily] = useState(PERIODS_BY_KIND[kind] ?? 8);
  const [loadsText, setLoadsText] = useState(EXAMPLE);
  const [offText, setOffText] = useState('Ana Mora | V');
  const [options, setOptions] = useState([]);
  const [pick, setPick] = useState(0);
  const [group, setGroup] = useState('');
  const [savedId,setSavedId]=useState(null);
  const [editing,setEditing]=useState(null);
  const [draft,setDraft]=useState({subject:'',teacher:'',room:'',startTime:'',endTime:''});
  const [saving,setSaving]=useState(false);
  const saved = useQuery({ queryKey: ['schedules', institutionId], queryFn () => (await supabase.from('institution_schedules').select('id,title,config,result,created_at').eq('institution_id', institutionId).order('created_at', { ascending }).limit(20)).data ?? [] });

  const generate = () => {
    const loads = parseLoads(loadsText);
    if (!loads.length) { toast.error('Escriba al menos una línea: Grupo | Materia | Docente | lecciones'); return; }
    const o = scheduleOptions(loads, periods, parseDaysOff(offText), 3, maxDaily);
    setOptions(o); setPick(0); setSavedId(null); setGroup(Object.keys(o[0]?.grid ?? {})[0] ?? '');
  };
  const current = options[pick];
  const groups = useMemo(() => (current ? Object.keys(current.grid) : []), [current]);

  const save = async () => {
    if (!current || saving) return;
    const { data } = await supabase.auth.getUser();
    if (!u.user) { toast.error('Ingrese para guardar.'); return; }
    if(!canEdit)return;setSaving(true);
    try {
    const result=savedId?await supabase.from('institution_schedules').update({result:current}).eq('id',savedId).eq('institution_id',institutionId).select('id').single():await supabase.from('institution_schedules').insert({ institution_id, created_by: u.user.id, title: `Horario ${new Date().toLocaleDateString('es-CR')} · opción ${pick + 1}`, config: { periods, maxDaily, loadsText, offText, kind }, result }).select('id').single();
    setSaving(false);
    if (result.error||!result.data) { toast.error('No se pudo guardar el horario.'); return; }
    setSavedId(result.data.id);
    toast.success('Horario guardado'); qc.invalidateQueries({ queryKey: ['schedules', institutionId] });
    } catch { toast.error('No se pudo guardar. Sus cambios permanecen en esta pantalla.'); } finally { setSaving(false); }
  };

  const show = (o) => { setOptions([o]); setPick(0);setSavedId(id); setGroup(Object.keys(o.grid)[0] ?? ''); };
  const apply=(clear=false)=>{if(!editing||!current)return;try{const next=editScheduleCell(current,group,editing.day,editing.period,clear?null:{subject:draft.subject.trim(),teacher:draft.teacher.trim(),...(draft.room.trim()?{room:draft.room.trim()}:{}),...(draft.startTime?{startTime:draft.startTime}:{}),...(draft.endTime?{endTime:draft.endTime}:{})});setOptions(all=>all.map((o,i)=>i===pick?next));setEditing(null);toast.success('Cambio preparado. Guarde los cambios para conservarlo.');}catch(error){toast.error(error instanceof Error?error.message:'No se pudo editar.');}};

  return (
    <div className="space-y-4">
      {canEdit && (
        <section className="rounded-2xl border border-border bg-card p-4 shadow-card space-y-3">
          <h2 className="text-lg font-black">🗓️ Generador de horarios · {INSTITUTION_KIND_LABELS[kind]}</h2>
          <label className="block text-sm font-semibold">Cargar cargas por sección (CSV o TXT)
            <input type="file" accept=".csv,.txt,text/csv,text/plain" className="mt-2 block w-full min-w-0 text-sm" onChange={async event=>{const file=event.target.files?.[0];if(!file)return;try {if(file.size>1024*1024)throw new Error('Máximo 1 MB.');const imported=importScheduleLoads(await file.text());setLoadsText(imported.text);const next=scheduleOptions(imported.loads,periods,parseDaysOff(offText),3,maxDaily);setSavedId(null);setOptions(next);setPick(0);setGroup(Object.keys(next[0]?.grid ?? {})[0] ?? '');toast.success(`${imported.loads.length} cargas importadas. Opciones listas para revisar y guardar.`);}catch(error){toast.error(error instanceof Error?error.message:'Archivo inválido.');}event.target.value='';}}/>
          </label>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <label>Lecciones por día<input type="number" min={3} max={14} value={periods} onChange={(e) => setPeriods(Math.max(3, Math.min(14, +e.target.value || 3)))} className="mt-1 w-full rounded-lg border border-input bg-background px-2 py-1" /></label>
            <label>Máximo por docente al día<input type="number" min={1} max={14} value={maxDaily} onChange={(e) => setMaxDaily(Math.max(1, Math.min(14, +e.target.value || 1)))} className="mt-1 w-full rounded-lg border border-input bg-background px-2 py-1" /></label>
          </div>
          <label className="block text-sm">Cargas className="text-muted-foreground">Grupo | Materia | Docente | lecciones por semana</span>
            <textarea rows={6} value={loadsText} onChange={(e) => setLoadsText(e.target.value)} className="mt-1 w-full rounded-lg border border-input bg-background p-2 font-mono text-xs" /></label>
          <label className="block text-sm">Días libres o en otra institución: <span className="text-muted-foreground">Docente | L,K,M,J,V (K = martes)</span>
            <textarea rows={3} value={offText} onChange={(e) => setOffText(e.target.value)} className="mt-1 w-full rounded-lg border border-input bg-background p-2 font-mono text-xs" /></label>
          <Button onClick={generate} className="w-full">Generar 3 opciones</Button>
        </section>
      )}
      {current && (
        <section className="rounded-2xl border border-border bg-card p-4 shadow-card space-y-3">
          <div className="flex flex-wrap gap-2">{options.map((o, i) => <Button key={i} size="sm" variant={i === pick ? 'default' : 'outline'} onClick={() => setPick(i)}>Opción {i + 1}{o.unplaced.length ? ` · ${o.unplaced.length} sin ubicar` : ' ✓'}</Button>)}</div>
          <label className="block text-sm font-semibold">Sección
            <select value={group} onChange={event => setGroup(event.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2">
              {groups.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </label>
          {current.unplaced.length > 0 && <p className="text-sm text-destructive">Sin espacio: {current.unplaced.map((u) => `${u.group} ${u.subject}`).join(', ')}. Aumente lecciones por día o revise días libres.</p>}
          {group && current.grid[group] && (
            <div className="space-y-4" aria-label={`Horario de la sección ${group}`}>
              <h2 className="text-xl font-black">Horario · sección {group}</h2>
              <p className="text-sm text-muted-foreground">Las aulas y horas no registradas aparecen sin asignación.</p>
              {DAYS.map((day, d) => <div key={day} className="space-y-2">
                <h3 className="font-bold">{day}</h3>
                <div className="overflow-x-auto"><table aria-label={`${day} · sección ${group}`} className="w-full table-fixed text-xs sm:text-sm">
                  <thead><tr className="text-left"><th className="w-16 p-2">Lección</th><th className="p-2">Materia</th><th className="p-2">Profesor</th><th className="p-2">Aula</th></tr></thead>
                  <tbody>{(current.grid[group]?.[d] ?? []).map((cell, p) => <tr key={p} className="border-t border-border">
                    <th scope="row" className="p-2 text-left align-top">{p + 1}{cell?.startTime && <span className="block break-words font-normal text-muted-foreground">{cell.startTime}{cell.endTime ? `–${cell.endTime}` : ''}</span>}</th>
                    <td className="break-words p-2 align-top">{cell?.subject ?? 'Libre'}</td>
                    <td className="break-words p-2 align-top">{cell?.teacher ?? '—'}</td>
                    <td className="break-words p-2 align-top">{cell ? cell.room || 'Sin asignar' : '—'}{canEdit&&<Button size="sm" variant="ghost" aria-label={`Editar ${day} lección ${p+1}`} onClick={()=>{setEditing({day,period:p});setDraft({subject:cell?.subject??'',teacher:cell?.teacher??'',room:cell?.room??'',startTime:cell?.startTime??'',endTime:cell?.endTime??''});}}>✎</Button>}</td>
                  </tr>)}</tbody>
                </table></div>
              </div>)}
            </div>
          )}
          <div className="flex gap-2">{canEdit && <Button size="sm" disabled={saving} onClick={save}>{savedId?'Guardar cambios':'Guardar opción'}</Button>}<Button size="sm" variant="outline" onClick={() => window.print()}>Imprimir</Button></div>
        </section>
      )}
      <section className="rounded-2xl border border-border bg-card p-4 shadow-card">
        <h3 className="font-black">Horarios guardados</h3>
        {saved.data?.length ? <ul className="mt-2 space-y-1 text-sm">{saved.data.map((s) => <li key={s.id}><Button variant="link" onClick={() => show(s.result,s.id)}>{s.title}</Button></li>)}</ul> : <p className="text-sm text-muted-foreground">Aún no hay horarios guardados.</p>}
      </section>
      <Dialog open={!!editing} onOpenChange={open=>{if(!open)setEditing(null);}}><DialogContent className="max-h-[85dvh] overflow-y-auto"><DialogTitle>Editar sección {group} · {editing?DAYS[editing.day]:''} · lección {(editing?.period??0)+1}</DialogTitle><DialogDescription>Asignación de materia, profesor, aula y horas.</DialogDescription>{(['subject','teacher','room','startTime','endTime']).map((key,i)=><label key={key} className="grid gap-1 text-sm">{['Materia','Profesor','Aula','Hora inicial','Hora final'][i]}<input type={key.includes('Time')?'time':'text'} maxLength={120} value={draft[key]} onChange={e=>setDraft({...draft,[key]:e.target.value})} className="min-w-0 rounded-md border border-input bg-background p-2"/></label>)}<div className="flex flex-wrap gap-2"><Button onClick={()=>apply()}>Aplicar cambio</Button><Button variant="outline" onClick={()=>apply(true)}>Dejar libre</Button><Button variant="ghost" onClick={()=>setEditing(null)}>Cancelar</Button></div></DialogContent></Dialog>
    </div>
  );
}
