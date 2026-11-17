import { useState } from 'react';
import { Button } from './ui/button';
import mepLogo from '@/assets/mep-logo.png.asset.json';
import schoolCrest from '@/assets/ctp-mercedes-norte.png.asset.json';

const guidance = 'https://drea.mep.go.cr/sites/default/files/publicaciones-anexos-2026/Orientaciones%20planificaci%C3%B3n%20pedag%C3%B3gica%20ETP%202026.pdf';
const regulation = 'https://www.mep.go.cr/sites/default/files/2026-05/ReglamentoEvalAprendizajesConducta.pdf';
const fields = ['Centro educativo','Persona docente','Nivel','Curso lectivo','Carrera técnica','Modalidad','Campo detallado','Subárea','Unidad de estudio','Tiempo estimado','Competencias para el desarrollo humano','Eje de la política educativa'];
const columns = ['Resultados de aprendizaje','Saberes esenciales','Estrategias para la mediación pedagógica','Evidencias de aprendizaje','Tiempo estimado'];

export function TeacherTemplates() {
  const [mode,setMode] = useState('ppp');
  const [values,setValues] = useState<Record<string,string>>({'Curso lectivo':'2026'});
  const [mercedes,setMercedes] = useState(false);
  const [customCrest,setCustomCrest] = useState('');
  const [rowCount,setRowCount] = useState(1);
  const [cells,setCells] = useState<Record<string,string>>({});
  const title = mode==='ppp' ? 'Plan de práctica pedagógica' : mode==='cotidiano' ? 'Registro de trabajo cotidiano' : 'Consulta institucional del reglamento';
  async function loadCrest(file: File | undefined) {
    if (!file || !['image/png','image/jpeg','image/webp'].includes(file.type) || file.size > 2_000_000) return;
    const reader = new FileReader();
    reader.onload = () => { if (typeof reader.result === 'string') { setCustomCrest(reader.result); setMercedes(false); } };
    reader.readAsDataURL(file);
  }
  return <section data-teacher-template className="mt-8 border-y border-border py-6" aria-label="Plantillas docentes">
    <style>{`@media print { body * { visibility: hidden; } [data-teacher-template], [data-teacher-template] * { visibility: visible; } [data-teacher-template] { position: absolute; inset: 0; width: 100%; margin: 0; } [data-teacher-template] table { min-width: 0; table-layout: fixed; } [data-teacher-template] .print-value { white-space: pre-wrap; overflow-wrap: anywhere; } }`}</style>
    <div className="print:hidden">
      <h2 className="text-2xl font-bold">Plantillas docentes</h2>
      <select aria-label="Tipo de plantilla" value={mode} onChange={e=>setMode(e.target.value)} className="mt-3 w-full rounded-md border border-input bg-background p-3">
        <option value="ppp">PPP técnico · cinco columnas</option><option value="cotidiano">Instrumento de trabajo cotidiano</option><option value="reglamento">Portada y reglamento MEP</option>
      </select>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <label className="text-sm"><input type="checkbox" checked={mercedes} onChange={e=>{setMercedes(e.target.checked);if(e.target.checked){setCustomCrest('');setValues(v=>({...v,'Centro educativo':'CTP Mercedes Norte'}));}}} /> Escudo CTP Mercedes Norte</label>
        <label className="text-sm">Escudo propio · PNG/JPG/WebP, hasta 2 MB<input aria-label="Escudo propio" type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>void loadCrest(e.target.files?.[0])} className="mt-1 block max-w-full" /></label>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Adaptación editable basada en sus ejemplos; no emitida ni avalada por el MEP. El escudo propio se utiliza solo en esta sesión.</p>
    </div>
    <div className="mt-5 flex items-center justify-between gap-4">
      <img src={mepLogo.url} alt="Ministerio de Educación Pública · Gobierno de Costa Rica" width={208} height={58} className="h-auto w-40 max-w-[65%] bg-foreground" />
      {(customCrest || mercedes) && <img src={customCrest || schoolCrest.url} alt="Escudo del centro educativo" className="h-20 w-16 object-contain" />}
    </div>
    <h3 className="mt-4 text-2xl font-bold">{title}</h3>
    <div className="mt-4 grid gap-3 sm:grid-cols-2">{(mode==='reglamento' ? fields.slice(0,4) : fields).map(field=><label key={field} className="grid gap-1 text-sm font-semibold">{field}<input value={values[field]??''} onChange={e=>setValues(v=>({...v,[field]:e.target.value}))} className="w-full rounded-md border border-input bg-background p-2 font-normal" /></label>)}</div>
    {mode==='reglamento' ? <div className="mt-5 space-y-3">
      <h4 className="text-lg font-bold">Reglamento de Evaluación de los Aprendizajes y de la Conducta · N.º 45509-MEP</h4>
      <p>Portada de consulta. El texto normativo se consulta en la copia publicada por el MEP, sin modificaciones.</p>
      <Button asChild variant="outline"><a href={regulation} target="_blank" rel="noreferrer">Consultar documento MEP</a></Button>
      <p className="break-all text-xs text-muted-foreground">Fuente: {regulation}</p>
    </div> : <>
      <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[850px] border-collapse text-sm"><thead><tr>{(mode==='ppp' ? columns : ['Indicador de aprendizaje','Actividad / evidencia observada','Criterio de valoración','Registro de logro','Retroalimentación']).map(column=><th key={column} className="border border-border bg-muted p-2 text-left align-top">{column}</th>)}</tr></thead><tbody>{Array.from({length:rowCount},(_,r)=><tr key={r}>{columns.map((_,c)=><td key={c} className="border border-border p-2 align-top"><textarea aria-label={`Fila ${r+1}, ${mode==='ppp' ? columns[c] : ['Indicador','Actividad','Criterio','Logro','Retroalimentación'][c]}`} value={cells[`${mode}-${r}-${c}`]??''} onChange={e=>setCells(v=>({...v,[`${mode}-${r}-${c}`]:e.target.value}))} rows={7} placeholder={mode==='ppp'&&c===2?'D/ …\nE/ …':mode==='ppp'&&c===3?'Conocimiento: …\nDesempeño: …\nProducto: …':''} className="w-full resize-y bg-background text-foreground" /></td>)}</tr>)}</tbody></table></div>
      <Button variant="outline" className="mt-3 print:hidden" onClick={()=>setRowCount(n=>n+1)}>Añadir fila</Button>
      <p className="mt-3 text-sm text-muted-foreground">{mode==='ppp' ? 'Fuente de referencia: Orientaciones para la planificación pedagógica ETP 2026, sección PPP. No sustituye la plantilla específica de otras modalidades.' : 'Instrumento docente editable; los criterios y la escala deben definirse según el aprendizaje y las disposiciones aplicables.'}</p>
      {mode==='ppp'&&<a className="text-sm text-primary underline" href={guidance} target="_blank" rel="noreferrer">Consultar orientaciones ETP 2026</a>}
    </>}
    <p className="mt-4 text-xs text-muted-foreground">Preparación independiente, sin afiliación oficial. Revise antes de aplicar. Logo MEP original de baja resolución.</p>
  </section>;
}