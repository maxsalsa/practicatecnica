// Extrae indicadores de logro de una Tabla de Especificaciones (texto plano, CSV o JSON).
const limpiar = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();
const valido = (s) => s.length >= 5 && /[a-záéíóúñ]{3}/i.test(s);
const HEADER = /^(indicador(es)?( de logro)?|tema|aprendizaje|unidad|ítems?|items?|puntos|porcentaje|total)$/i;

function desdeJson(data) {
  const out = [];
  const visit = (v, tema = '') => {
    if (typeof v === 'string') return out.push({ indicador: limpiar(v), tema });
    if (Array.isArray(v)) return v.forEach((x) => visit(x, tema));
    if (v && typeof v === 'object') {
      const t = limpiar(v.tema ?? v.aprendizaje ?? tema);
      const ind = v.indicador ?? v.indicadorLogro ?? v.indicador_logro ?? v.indicadores;
      if (ind !== undefined) visit(ind, t); else Object.values(v).forEach((x) => typeof x === 'object' && visit(x, t));
    }
  };
  visit(data);
  return out;
}

function desdeTexto(txt) {
  const lines = txt.split(/\r?\n/).map(limpiar).filter(Boolean);
  const first = lines[0] ?? '';
  const sep = first.includes('|') ? '|' : first.includes('\t') ? '\t' : first.split(';').length > first.split(',').length ? ';' : ',';
  const cells = (l) => l.split(sep).map(limpiar).filter((c) => c && !/^-+$/.test(c));
  const head = cells(first);
  const col = head.findIndex((h) => /indicador/i.test(h));
  const temaCol = head.findIndex((h) => /tema|aprendizaje/i.test(h));
  if (col >= 0 && head.length > 1) {
    return lines.slice(1).map(cells).filter((c) => c[col]).map((c) => ({ indicador: c[col], tema: temaCol >= 0 ? c[temaCol] ?? '' : '' }));
  }
  let tema = '';
  const out = [];
  for (const l of lines) {
    const m = l.match(/^tema\s*[:\-]\s*(.+)$/i);
    if (m) { tema = m[1]; continue; }
    const ind = l.match(/^(?:indicador(?:es)?(?: de logro)?\s*\d*\s*[:\-.)]\s*|[-•*]\s+|\d+[.)]\s+)(.+)$/i);
    if (ind) out.push({ indicador: limpiar(ind[1]), tema });
  }
  return out;
}

export function parsearTablaMep(entrada) {
  const txt = String(entrada ?? '').trim();
  let rows = [];
  if (/^[[{]/.test(txt)) { try { rows = desdeJson(JSON.parse(txt)); } catch { rows = desdeTexto(txt); } } else rows = desdeTexto(txt);
  const seen = new Set();
  return rows.map((r) => ({ indicador: limpiar(r.indicador), tema: limpiar(r.tema) }))
    .filter((r) => valido(r.indicador) && !HEADER.test(r.indicador) && !seen.has(r.indicador.toLowerCase()) && seen.add(r.indicador.toLowerCase()));
}
