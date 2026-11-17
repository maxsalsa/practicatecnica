import { useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { Button } from '@/components/ui/button';
import { registerStudent } from '@/lib/student.functions';
import { parseEnrollmentCsv, type EnrollRow } from '@/lib/enrollment';

const KIND = { cedula: 'Cédula', dimex: 'DIMEX', otro: 'Identificación' } as const;

/** Matrícula masiva: el docente sube un CSV; cada fila se registra con la misma validación del alta individual. */
export function CsvEnrollment({ institution, onDone }: { institution: string; onDone: () => void }) {
  const register = useServerFn(registerStudent);
  const [rows, setRows] = useState<EnrollRow[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  async function read(file: File | undefined) {
    if (!file) return;
    if (file.size > 500_000) { setErrors(['El archivo supera 500 KB.']); return; }
    const r = parseEnrollmentCsv(await file.text());
    setRows(r.rows); setErrors(r.errors); setStatus('');
  }
  async function save() {
    setBusy(true); let ok = 0; const fails: string[] = [];
    for (const r of rows) {
      try {
        await register({ data: { name: r.name, email: r.email, institution, level: r.level, notes: r.id ? `${KIND[r.idKind]}: ${r.id}` : '' } });
        ok++; setStatus(`Matriculando… ${ok}/${rows.length}`);
      } catch (e) { fails.push(`${r.name}: ${e instanceof Error ? e.message : 'no se pudo guardar'}`); }
    }
    setBusy(false); setRows([]); setErrors(fails); setStatus(`${ok} estudiantes matriculados.`); onDone();
  }
  return <section className="mt-6 rounded-2xl border border-border bg-card p-4">
    <h2 className="text-xl font-bold">Matricular con archivo (Excel o CSV)</h2>
    <p className="mt-1 text-sm text-muted-foreground">En Excel use 4 columnas: <b>nombre; correo Gmail; cédula o DIMEX; nivel</b> y guarde como «CSV». Máximo 200 por archivo. La identificación queda privada en sus notas (Ley 8968); no se consulta a terceros.</p>
    <input type="file" accept=".csv,text/csv" className="mt-3 block" onChange={e => void read(e.target.files?.[0])} aria-label="Archivo CSV de estudiantes" />
    {rows.length > 0 && <><p className="mt-3 font-semibold">{rows.length} estudiantes listos:</p>
      <ul className="mt-1 max-h-48 overflow-y-auto text-sm">{rows.map(r => <li key={r.email}>{r.name} · {r.email}{r.id ? ` · ${KIND[r.idKind]} ${r.id}` : ''}</li>)}</ul>
      <Button className="mt-3" disabled={busy} onClick={() => void save()}>Matricular {rows.length}</Button></>}
    {status && <p role="status" className="mt-2 text-sm">{status}</p>}
    {errors.length > 0 && <ul role="alert" className="mt-2 max-h-32 overflow-y-auto text-sm text-destructive">{errors.map((x, i) => <li key={i}>{x}</li>)}</ul>}
  </section>;
}
