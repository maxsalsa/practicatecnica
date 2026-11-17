/** Matrícula por archivo CSV: nombre, correo Gmail, identificación, nivel. Sin consultas a terceros. */
export type IdKind = 'cedula' | 'dimex' | 'otro';
export type EnrollRow = { name: string; email: string; id: string; idKind: IdKind; level: string };

/** Cédula nacional CR: 9 dígitos, primer dígito 1-9. DIMEX: 11 o 12 dígitos. */
export function classifyId(raw: string): IdKind | null {
  const d = raw.replace(/[\s-]/g, '');
  if (!d) return 'otro';
  if (/^[1-9]\d{8}$/.test(d)) return 'cedula';
  if (/^\d{11,12}$/.test(d)) return 'dimex';
  if (/^[A-Za-z0-9]{5,20}$/.test(d)) return 'otro';
  return null;
}

function splitLine(line: string, sep: string): string[] {
  const out: string[] = []; let cur = ''; let q = false;
  for (const ch of line) {
    if (ch === '"') q = !q;
    else if (ch === sep && !q) { out.push(cur.trim()); cur = ''; }
    else cur += ch;
  }
  out.push(cur.trim());
  return out;
}

export function parseEnrollmentCsv(text: string, max = 200): { rows: EnrollRow[]; errors: string[] } {
  const lines = text.replace(/^\uFEFF/, '').split(/\r?\n/).filter(l => l.trim());
  const errors: string[] = []; const rows: EnrollRow[] = []; const seen = new Set<string>();
  if (!lines.length) return { rows, errors: ['El archivo está vacío.'] };
  const sep = (lines[0]!.match(/;/g)?.length ?? 0) > (lines[0]!.match(/,/g)?.length ?? 0) ? ';' : ',';
  const start = /nombre|name/i.test(lines[0]!) ? 1 : 0;
  for (let i = start; i < lines.length; i++) {
    const [name = '', email = '', id = '', level = ''] = splitLine(lines[i]!, sep);
    const n = i + 1; const mail = email.toLowerCase();
    if (name.length < 2 || name.length > 100) { errors.push(`Fila ${n}: nombre inválido.`); continue; }
    if (!/^[^\s@]+@gmail\.com$/.test(mail)) { errors.push(`Fila ${n}: use un correo Gmail.`); continue; }
    const kind = classifyId(id);
    if (!kind) { errors.push(`Fila ${n}: identificación con formato inválido.`); continue; }
    if (seen.has(mail)) { errors.push(`Fila ${n}: correo repetido.`); continue; }
    seen.add(mail);
    if (rows.length >= max) { errors.push(`Máximo ${max} estudiantes por archivo.`); break; }
    rows.push({ name, email: mail, id: id.replace(/\s/g, ''), idKind: kind, level: level.slice(0, 80) });
  }
  return { rows, errors };
}
