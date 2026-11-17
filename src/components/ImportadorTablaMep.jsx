import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { InstitutionDocumentHeader } from '@/components/institution/InstitutionDocumentHeader';
import { modalidades, niveles, asignaturas, subareas, tipoContexto, filtrarIndicadores } from '@/data/taxonomiaMep';
import { parsearTablaMep } from '@/utils/parserTablaMep';
import { generarItemsMep, calificarItem } from '@/utils/generadorItemsMep';

const sel = 'h-12 w-full min-w-0 rounded-xl border border-input bg-card px-3 text-base';

export default function ImportadorTablaMep() {
  const [modalidad, setModalidad] = useState('Secundaria Técnica CTP');
  const [nivel, setNivel] = useState('10.°');
  const [materia, setMateria] = useState('Salud Ocupacional');
  const [subarea, setSubarea] = useState('');
  const [texto, setTexto] = useState('');
  const [indicadores, setIndicadores] = useState([]);
  const [colegio, setColegio] = useState('');
  const [semilla, setSemilla] = useState(1);
  const [resp, setResp] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => { const n = niveles(modalidad); if (!n.includes(nivel)) setNivel(n[0] ?? ''); const a = asignaturas(modalidad); if (!a.includes(materia)) setMateria(a[0] ?? ''); }, [modalidad]);
  useEffect(() => { setSubarea(subareas(modalidad, materia)[0] ?? ''); }, [modalidad, materia]);

  const tipo = tipoContexto(modalidad);
  const items = useMemo(() => indicadores.flatMap((r, k) => generarItemsMep({ indicador: r.indicador, tema: r.tema, tipo, semilla: semilla * 97 + k, cantidad: 3, prefijo: `tabla-${k}` })), [indicadores, tipo, semilla]);
  const xp = items.reduce((n, it) => n + (resp[it.id] ? calificarItem(it, resp[it.id]).xp : 0), 0);

  const leerArchivo = async (e) => { const f = e.target.files?.[0]; if (f) setTexto(await f.text()); };
  const extraer = () => { const r = parsearTablaMep(texto); setIndicadores(r); setResp({}); toast[r.length ? 'success' : 'error'](r.length ? `${r.length} indicadores extraídos.` : 'No se encontraron indicadores de logro.'); };
  const usarCatalogo = () => { setIndicadores(filtrarIndicadores({ modalidad, nivel, asignatura: materia, subarea }).map(({ indicador, tema }) => ({ indicador, tema }))); setResp({}); };
  const guardar = async () => {
    setSaving(true);
    const { error } = await supabase.from('mep_spec_indicators').insert(indicadores.map((r) => ({ modalidad, nivel, materia, subarea, tema: r.tema, indicador: r.indicador.slice(0, 600) })));
    setSaving(false);
    toast[error ? 'error' : 'success'](error ? 'No se pudo guardar: solo cuentas docentes o administración con sesión iniciada.' : 'Indicadores guardados.');
  };

  return <div className="mx-auto grid max-w-3xl grid-cols-[minmax(0,1fr)] gap-5 px-4 py-6">
    <section className="grid gap-3 rounded-2xl border border-border bg-card p-4 shadow-card print:hidden">
      <h1 className="font-display text-2xl font-black">Tabla de especificaciones → práctica</h1>
      <p className="text-sm text-muted-foreground">Pegue o suba la tabla (texto, CSV o JSON). Se extraen los indicadores de logro y se genera una batería de 3 opciones.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <select aria-label="Modalidad" className={sel} value={modalidad} onChange={(e) => setModalidad(e.target.value)}>{modalidades().map((m) => <option key={m}>{m}</option>)}</select>
        <select aria-label="Nivel" className={sel} value={nivel} onChange={(e) => setNivel(e.target.value)}>{niveles(modalidad).map((m) => <option key={m}>{m}</option>)}</select>
        <select aria-label="Materia" className={sel} value={materia} onChange={(e) => setMateria(e.target.value)}>{asignaturas(modalidad).map((m) => <option key={m}>{m}</option>)}</select>
        <select aria-label="Subárea" className={sel} value={subarea} onChange={(e) => setSubarea(e.target.value)}>{subareas(modalidad, materia).map((m) => <option key={m}>{m}</option>)}</select>
      </div>
      <textarea aria-label="Tabla de especificaciones" className="min-h-40 w-full rounded-xl border border-input bg-background p-3 text-base" placeholder={'Tema: Proporcionalidad\nIndicador 1: Resuelve problemas…'} value={texto} onChange={(e) => setTexto(e.target.value)} />
      <input aria-label="Subir archivo" type="file" accept=".txt,.csv,.json,.tsv" onChange={leerArchivo} className="text-sm" />
      <div className="grid gap-2 sm:grid-cols-2">
        <Button size="lg" className="h-12" onClick={extraer} disabled={!texto.trim()}>Extraer indicadores</Button>
        <Button size="lg" variant="outline" className="h-12" onClick={usarCatalogo}>Usar catálogo base</Button>
      </div>
    </section>

    {indicadores.length > 0 && <section className="grid gap-3 rounded-2xl border border-border bg-card p-4 print:border-0 print:shadow-none">
      <div className="grid gap-2 print:hidden sm:grid-cols-[1fr_auto_auto_auto]">
        <input aria-label="Nombre del colegio" className={sel} placeholder="Nombre del colegio para el membrete" value={colegio} onChange={(e) => setColegio(e.target.value)} />
        <Button size="lg" variant="outline" className="h-12" onClick={() => { setSemilla((s) => s + 1); setResp({}); }}>Otra versión</Button>
        <Button size="lg" variant="outline" className="h-12" onClick={guardar} disabled={saving}>Guardar</Button>
        <Button size="lg" className="h-12" onClick={() => window.print()}>Imprimir</Button>
      </div>
      <InstitutionDocumentHeader name={colegio || 'Centro educativo'} title={`${materia} · ${nivel} · ${modalidad}${subarea ? ` · ${subarea}` : ''}`} date={new Date().toISOString()} />
      <p className="text-sm font-semibold print:hidden">{indicadores.length} indicadores · {items.length} ítems · {xp} XP de práctica (no es calificación oficial)</p>
      <ol className="grid gap-4">
        {items.map((it, n) => { const r = resp[it.id]; const res = r && calificarItem(it, r);
          return <li key={it.id} className="break-inside-avoid rounded-xl border border-border p-3">
            <p className="text-xs font-bold text-muted-foreground">{n + 1}. {it.nivelDua} · {it.puntosXP} XP · {it.indicador}</p>
            <p className="mt-1 font-semibold">{it.enunciado}</p>
            <div className="mt-2 grid gap-2">{it.opciones.map((o) => <button key={o.letra} type="button" disabled={!!r} onClick={() => setResp((p) => ({ ...p, [it.id]: o.letra }))}
              className={`min-h-12 rounded-xl border px-3 py-2 text-left ${r && o.letra === it.clave ? 'border-success bg-success/15' : r === o.letra ? 'border-destructive bg-destructive/15' : 'border-border bg-background'}`}><b>{o.letra})</b> {o.texto}</button>)}</div>
            {res && <p className={`mt-2 text-sm ${res.correcta ? 'text-success' : 'text-destructive'}`}>{res.explicacion}{!res.correcta && ` Respuesta: ${it.clave}. ${it.explicaciones[it.clave]}`}</p>}
          </li>; })}
      </ol>
    </section>}
  </div>;
}
