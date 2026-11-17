// Motor de horarios por minutos absolutos: choques de docente, sección y taller; bloques 40/60/120 indivisibles.
export function horaAMinutos(h) { const [a, b] = String(h).split(":").map(Number); return (a || 0) * 60 + (b || 0); }
export function hayTraslape(iA, fA, iB, fB) { return iA < fB && iB < fA; }
export function detectarColision(nueva, existentes) {
  const i = horaAMinutos(nueva.horaInicio), f = horaAMinutos(nueva.horaFin);
  for (const e of existentes) {
    if (e.diaSemana !== nueva.diaSemana) continue;
    if (!hayTraslape(i, f, horaAMinutos(e.horaInicio), horaAMinutos(e.horaFin))) continue;
    if (e.docenteId === nueva.docenteId) return { hayChoque: true, motivo: "docente" };
    if (e.seccionId === nueva.seccionId) return { hayChoque: true, motivo: "seccion" };
    if (nueva.espacioFisicoId && e.espacioFisicoId === nueva.espacioFisicoId) return { hayChoque: true, motivo: "espacio" };
  }
  return { hayChoque: false, motivo: null };
}
// Un bloque técnico no puede atravesar recesos (recreo, almuerzo, cambio de jornada).
export function bloqueRespetaRecesos(bloque, recesos) {
  const i = horaAMinutos(bloque.horaInicio), f = horaAMinutos(bloque.horaFin);
  return !recesos.some((r) => hayTraslape(i, f, horaAMinutos(r.horaInicio), horaAMinutos(r.horaFin)));
}
export function contarVentanasDocentes(horario, umbral = 20) {
  const g = {};
  for (const l of horario) (g[`${l.docenteId}|${l.diaSemana}`] ||= []).push([horaAMinutos(l.horaInicio), horaAMinutos(l.horaFin)]);
  let v = 0;
  for (const lista of Object.values(g)) {
    lista.sort((a, b) => a[0] - b[0]);
    for (let k = 0; k < lista.length - 1; k++) if (lista[k + 1][0] - lista[k][1] > umbral) v++;
  }
  return v;
}
