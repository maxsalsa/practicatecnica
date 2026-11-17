// Verificación documental MEP: folios Code-128B, SHA-256, plazo REA y resumen anonimizado (Ley 8968).
export const FERIADOS_Y_RECESOS_CR_2026 = [
  "2026-01-01","2026-04-02","2026-04-03","2026-04-11","2026-05-01",
  "2026-07-06","2026-07-07","2026-07-08","2026-07-09","2026-07-10",
  "2026-07-25","2026-08-02","2026-08-15","2026-08-31","2026-09-15","2026-12-01","2026-12-25",
];
const REGEX_SHA256 = /^[a-f0-9]{64}$/;
const REGEX_FOLIO = /^MEP-(?:PER|REA)-[A-F0-9]{16}$/;

export function sanitizarCode128B(cadena) {
  if (!cadena) return "";
  return String(cadena).replace(/[\u2010-\u2015]/g, "-").replace(/[^\x20-\x7E]/g, "").trim();
}
export function normalizarCodigoVerificacion(valor) {
  const limpio = sanitizarCode128B(valor);
  if (!limpio) return "";
  return /^mep-(per|rea)-[a-f0-9]{16}$/i.test(limpio) ? limpio.toUpperCase() : limpio.toLowerCase();
}
export function analizarCodigoVerificacion(codigo) {
  const normalizado = normalizarCodigoVerificacion(codigo);
  if (REGEX_SHA256.test(normalizado)) return { valido: true, tipo: "SHA256", normalizado };
  if (REGEX_FOLIO.test(normalizado)) return { valido: true, tipo: "FOLIO_BARRAS", normalizado };
  return { valido: false, tipo: null, normalizado };
}
// Fecha ISO (YYYY-MM-DD) en America/Costa_Rica para cualquier instante.
export function fechaCR(instante) {
  if (typeof instante === "string" && /^\d{4}-\d{2}-\d{2}$/.test(instante)) return instante;
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Costa_Rica" }).format(new Date(instante));
}
function sumarDia(iso) {
  const d = new Date(iso + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}
export function esDiaHabilCR(iso, feriados = FERIADOS_Y_RECESOS_CR_2026) {
  const dia = new Date(iso + "T12:00:00Z").getUTCDay();
  return dia !== 0 && dia !== 6 && !feriados.includes(iso);
}
// 3 días hábiles contados desde el día hábil siguiente a la reincorporación.
export function calcularFechaLimiteREA(reincorporacion, feriados = FERIADOS_Y_RECESOS_CR_2026) {
  let actual = fechaCR(reincorporacion);
  let n = 0;
  while (n < 3) { actual = sumarDia(actual); if (esDiaHabilCR(actual, feriados)) n++; }
  return actual;
}
// Consulta pública: sin nombres ni iniciales; solo folio, sello truncado, dictamen y fechas.
export function construirResumenCertificado(rpc) {
  if (!rpc || rpc.valido !== true) {
    return { valido: false, mensajeError: rpc?.mensaje || "El código no corresponde a un documento activo o fue revocado." };
  }
  const personal = rpc.tipo_documento === "PERMISO_PERSONAL_MEP";
  return {
    valido: true,
    tipoDocumento: rpc.tipo_documento,
    tituloOficial: personal ? "Licencia o permiso de personal" : "Boleta de justificación de ausencia estudiantil (REA)",
    folioBarras: sanitizarCode128B(rpc.folio_barras),
    selloTruncado: rpc.sha256 ? `${String(rpc.sha256).slice(0, 8)}…${String(rpc.sha256).slice(-8)}` : null,
    dictamen: rpc.estado || rpc.dictamen || "VERIFICADO",
    esFavorable: rpc.estado === "APROBADO" || rpc.dictamen === "JUSTIFICADA",
    fechaEmision: rpc.fecha_emision || null,
    fechaLimite: rpc.fecha_limite || null,
  };
}
