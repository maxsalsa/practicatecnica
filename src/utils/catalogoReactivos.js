// Reactivos deterministas: Mulberry32 + Fisher-Yates, escalera DUA Gatear/Correr/Al Espacio.
export function crearPRNGMulberry32(semilla) {
  let a = (Number(semilla) >>> 0) || 123456789;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function barajarFisherYates(arr, prng) {
  const c = [...arr];
  for (let i = c.length - 1; i > 0; i--) { const j = Math.floor(prng() * (i + 1)); [c[i], c[j]] = [c[j], c[i]]; }
  return c;
}
export const NIVELES_DUA = { Gatear: 10, Correr: 20, "Al Espacio": 30 };
export function determinarNivelDua(i) {
  const m = ((i % 1000) + 1000) % 1000;
  return m < 350 ? "Gatear" : m < 800 ? "Correr" : "Al Espacio";
}
function plantilla(prng, nivel) {
  const a = Math.floor(prng() * 15) + 2, b = Math.floor(prng() * 12) + 1;
  if (nivel === "Gatear") return { enunciado: `Una máquina produce ${a} piezas por hora. ¿Cuántas produce en ${b} horas?`, correcta: `${a * b}`, distractores: [`${a * b + a}`, `${a + b}`, `${a * b + b + 1}`], porQue: `${a} × ${b} = ${a * b}.` };
  if (nivel === "Correr") { const c = a + 1; return { enunciado: `Resuelva ${c}x − ${b * c} = 0.`, correcta: `x = ${b}`, distractores: [`x = ${b + 1}`, `x = ${b + 2}`, `x = −${b}`], porQue: `x = ${b * c} ÷ ${c} = ${b}.` }; }
  const h = a * a + b * b;
  return { enunciado: `Catetos de ${a} m y ${b} m. ¿Cuánto vale d²?`, correcta: `${h} m²`, distractores: [`${(a + b) ** 2} m²`, `${h + 2 * a} m²`, `${h + 1} m²`], porQue: `${a}² + ${b}² = ${h}.` };
}
export function generarReactivosParametricos(asignaturaId, seed, cantidad = 1000) {
  const prng = crearPRNGMulberry32(seed);
  const out = [];
  for (let i = 0; i < cantidad; i++) {
    const nivelDua = determinarNivelDua(i);
    const p = plantilla(prng, nivelDua);
    const ops = barajarFisherYates([{ t: p.correcta, ok: true }, ...p.distractores.map((t) => ({ t, ok: false }))], prng);
    out.push({ id: `${asignaturaId}-s${seed}-i${i}`, nivelDua, puntosXP: NIVELES_DUA[nivelDua], enunciado: p.enunciado, opciones: ops.map((o) => o.t), indiceRespuestaCorrecta: ops.findIndex((o) => o.ok), porQue: p.porQue });
  }
  return out;
}
export function calificarReactivo(r, sel) {
  const ok = Number(sel) === r.indiceRespuestaCorrecta;
  return { esCorrecta: ok, puntosGanados: ok ? r.puntosXP : 0, porQue: r.porQue };
}
