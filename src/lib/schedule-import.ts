import { parseLoads } from './schedule';

/** Strict weekly-load import: never silently drop or clamp malformed rows. */
export function importScheduleLoads(text: string) {
  const lines = text.replace(/^\uFEFF/, '').trim().split(/\r?\n/).filter(line => line.trim());
  if (!lines.length || lines.length > 1000) throw new Error('El archivo debe contener entre 1 y 1000 filas.');
  const parsed = lines.map(line => line.split(line.includes('|') ? '|' : line.includes(';') ? ';' : ',').map(value => value.trim()));
  if (/^(grupo|seccion|sección)$/i.test(parsed[0]?.[0] ?? '')) parsed.shift();
  if (!parsed.length) throw new Error('El archivo no contiene cargas.');
  for (const [index, row] of parsed.entries()) {
    if (row.length !== 4 || row.slice(0, 3).some(value => !value || value.length > 120) || !/^\d+$/.test(row[3] ?? '') || Number(row[3]) < 1 || Number(row[3]) > 40) throw new Error(`Fila ${index + 1}: se requiere Grupo, Materia, Docente y lecciones enteras de 1 a 40.`);
  }
  const canonical = parsed.map(row => row.join(' | ')).join('\n');
  return { text: canonical, loads: parseLoads(canonical) };
}