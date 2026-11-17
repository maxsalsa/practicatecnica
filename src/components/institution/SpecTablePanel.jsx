import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { InstitutionDocumentHeader, InstitutionDocumentFooter } from './InstitutionDocumentHeader';
import { SPEC_LEVELS, SPEC_LEVEL_LABELS, buildSpecTable } from '@/lib/spec-table';

const blank = (): SpecRow => ({ indicator: '', lessons: 1, split: { conocimiento: 1, aplicacion: 1, razonamiento: 1 } });
const input = 'w-full rounded-md border border-border bg-background p-2';

export function SpecTablePanel({ name, logoPath }) {
  const [subject, setSubject] = useState('');
  const [level, setLevel] = useState('');
  const [teacher, setTeacher] = useState('');
  const [date] = useState(() => new Date().toISOString());
  const [total, setTotal] = useState(40);
  const [rows, setRows] = useState([blank()]);
  const result = useMemo(() => buildSpecTable(rows, total), [rows, total]);
  const lessons = rows.reduce((a, r) => a + r.lessons, 0);
  const set = (i) => setRows(rows.map((x, j) => (j === i ? r)));

  return <section className="space-y-4">
    <div className="rounded-2xl border border-border bg-card p-4 print:hidden">
      <h2 className="text-xl font-black">Tabla de especificaciones</h2>
      <p className="mt-1 text-sm text-muted-foreground">Puntos por indicador = lecciones del indicador ÷ lecciones totales × puntos totales. Se reparten por nivel según la proporción que indique. No se guarda PDF.</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-4">
        <label className="text-sm font-semibold">Asignatura<input className={input} value={subject} onChange={e => setSubject(e.target.value)} maxLength={80} /></label>
        <label className="text-sm font-semibold">Nivel<input className={input} value={level} onChange={e => setLevel(e.target.value)} maxLength={40} /></label>
        <label className="text-sm font-semibold">Docente<input className={input} value={teacher} onChange={e => setTeacher(e.target.value)} maxLength={80} /></label>
        <label className="text-sm font-semibold">Puntos totales<input type="number" min={1} max={200} className={input} value={total} onChange={e => setTotal(Math.max(1, Math.min(200, Number(e.target.value) || 1)))} /></label>
      </div>
      <div className="mt-4 space-y-3">{rows.map((r, i) => <fieldset key={i} className="grid gap-2 rounded-xl border border-border p-3 sm:grid-cols-6">
        <legend className="px-1 text-xs font-bold">Indicador {i + 1}</legend>
        <label className="text-xs sm:col-span-2">Indicador o aprendizaje esperado<input className={input} value={r.indicator} maxLength={200} onChange={e => set(i, { ...r, indicator: e.target.value })} /></label>
        <label className="text-xs">Lecciones<input type="number" min={0} max={99} className={input} value={r.lessons} onChange={e => set(i, { ...r, lessons: Math.max(0, Number(e.target.value) || 0) })} /></label>
        {SPEC_LEVELS.map(l => <label key={l} className="text-xs">{SPEC_LEVEL_LABELS[l]} (proporción)<input type="number" min={0} max={10} className={input} value={r.split[l]} onChange={e => set(i, { ...r, split: { ...r.split, [l]: Math.max(0, Number(e.target.value) || 0) } })} /></label>)}
        {rows.length > 1 && <Button type="button" size="sm" variant="outline" className="sm:col-span-6 justify-self-start" onClick={() => setRows(rows.filter((_, j) => j !== i))}>Quitar indicador</Button>}
      </fieldset>)}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button type="button" variant="outline" onClick={() => setRows([...rows, blank()])}>Agregar indicador</Button>
        <Button type="button" onClick={() => window.print()}>Imprimir o guardar PDF</Button>
      </div>
    </div>

    <article aria-label="Vista para imprimir" className="rounded-2xl border border-border bg-card p-5 print:border-0">
      <InstitutionDocumentHeader name={name} logoPath={logoPath} title={`Prueba escrita · ${subject || 'Asignatura'} · ${level || 'Nivel'}`} date={date} />
      <p className="mt-2 text-xs text-muted-foreground">Docente: {teacher || '—'} · Total: {total} puntos</p>
      <div className="mt-3 overflow-x-auto"><table className="w-full text-left text-sm">
        <thead><tr className="border-b border-border"><th className="p-2">Indicador</th><th>Lecciones</th>{SPEC_LEVELS.map(l => <th key={l}>{SPEC_LEVEL_LABELS[l]}</th>)}<th>Puntos</th></tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i} className="border-b border-border"><td className="p-2">{r.indicator || `Indicador ${i + 1}`}</td><td>{r.lessons}</td>{SPEC_LEVELS.map(l => <td key={l}>{result[i]?.byLevel[l] ?? 0}</td>)}<td className="font-bold">{result[i]?.points ?? 0}</td></tr>)}</tbody>
        <tfoot><tr><td className="p-2 font-bold">Total</td><td>{lessons}</td>{SPEC_LEVELS.map(l => <td key={l}>{result.reduce((a, x) => a + x.byLevel[l], 0)}</td>)}<td className="font-black">{result.reduce((a, x) => a + x.points, 0)}</td></tr></tfoot>
      </table></div>
      <InstitutionDocumentFooter />
    </article>
  </section>;
}
