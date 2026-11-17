// Motor paramétrico de reactivos MEP: 3 opciones (A, B, C), contexto obligatorio,
// Mulberry32 + Fisher-Yates y claves balanceadas por bloques de 3.
import { crearPRNGMulberry32, barajarFisherYates } from './catalogoReactivos';

export const LETRAS = ['A', 'B', 'C'];
export const XP_DUA = { Gatear: 10, Correr: 20, 'Al Espacio': 30 };
const DUA = ['Gatear', 'Correr', 'Al Espacio'];

const CONTEXTOS = {
  laboral: [
    { actor: 'La persona técnica del taller', unidad: 'piezas', g: 'a', periodo: 'turno' },
    { actor: 'El equipo de mantenimiento', unidad: 'equipos', g: 'o', periodo: 'jornada' },
    { actor: 'La brigada de salud ocupacional', unidad: 'inspecciones', g: 'a', periodo: 'semana' },
    { actor: 'El área de soporte', unidad: 'tickets', g: 'o', periodo: 'día' },
  ],
  cotidiano: [
    { actor: 'La familia de Daniela', unidad: 'litros', g: 'o', periodo: 'semana' },
    { actor: 'El comité estudiantil', unidad: 'cuadernos', g: 'o', periodo: 'mes' },
    { actor: 'La feria del barrio', unidad: 'kilogramos', g: 'o', periodo: 'sábado' },
    { actor: 'El grupo de ciencias', unidad: 'muestras', g: 'a', periodo: 'sesión' },
  ],
};

// Cada plantilla: correcta + dos errores frecuentes, con explicación por opción.
const PLANTILLAS = {
  Gatear: (r, c) => { const a = 3 + r(12), b = 2 + r(8);
    return { enunciado: `${c.actor} registra ${a} ${c.unidad} por ${c.periodo}. Si mantiene ese ritmo durante ${b} periodos, ¿cuánt${c.g}s ${c.unidad} registra en total?`,
      op: [[a * b, `Correcto: ritmo constante implica multiplicar ${a} × ${b} = ${a * b}.`], [a + b, `Error frecuente: sumar ${a} + ${b} mezcla el ritmo con la cantidad de periodos.`], [a * (b - 1), `Error frecuente: omitir un periodo al contar; se calcularon ${b - 1} y no ${b}.`]] }; },
  Correr: (r, c) => { const total = (4 + r(16)) * 20, p = [10, 15, 20, 25, 30, 40][r(6)], v = (total * p) / 100;
    return { enunciado: `${c.actor} dispone de ${total} ${c.unidad} y destina el ${p} % a una tarea prioritaria. ¿Cuánt${c.g}s ${c.unidad} corresponden a esa tarea?`,
      op: [[v, `Correcto: ${p} % de ${total} = ${total} × ${p} ÷ 100 = ${v}.`], [total - p, `Error frecuente: restar el porcentaje como si fuera una cantidad absoluta (${total} − ${p}).`], [(total * p) / 10, `Error frecuente: dividir entre 10 en lugar de 100 al convertir el porcentaje.`]] }; },
  'Al Espacio': (r, c) => { const a = 2 + r(6), b = 3 + r(6), k = 2 + r(4), v = a * b * k;
    return { enunciado: `${c.actor} completa ${a * b} ${c.unidad} con ${a} integrantes en un ${c.periodo}. Con el mismo rendimiento por integrante, ¿cuánt${c.g}s ${c.unidad} completan ${a * k} integrantes?`,
      op: [[v, `Correcto: cada integrante rinde ${b}; con ${a * k} integrantes se obtiene ${b} × ${a * k} = ${v}.`], [a * b + a * k - a, `Error frecuente: sumar los integrantes nuevos como si cada uno aportara una sola unidad.`], [a * b * a * k, `Error frecuente: multiplicar el total por todas las personas sin calcular primero el rendimiento individual.`]] }; },
};

/** Genera `cantidad` ítems para un indicador; reproducible con la misma semilla. */
export function generarItemsMep({ indicador, tema = '', tipo = 'cotidiano', semilla = 1, cantidad = 30, prefijo = 'mep' }) {
  const prng = crearPRNGMulberry32(semilla);
  const r = (n) => Math.floor(prng() * n);
  const ctxs = CONTEXTOS[tipo] ?? CONTEXTOS.cotidiano;
  const items = [];
  let claves = [];
  for (let i = 0; i < cantidad; i++) {
    if (i % 3 === 0) claves = barajarFisherYates([0, 1, 2], prng); // balance exacto por bloque
    const nivelDua = DUA[i % 3];
    const c = ctxs[r(ctxs.length)];
    let p = PLANTILLAS[nivelDua](r, c);
    // Garantiza tres valores distintos (opción única inequívoca).
    while (new Set(p.op.map((o) => o[0])).size < 3) p = PLANTILLAS[nivelDua](r, c);
    const clave = claves[i % 3];
    const distractores = barajarFisherYates(p.op.slice(1), prng);
    const orden = [...distractores];
    orden.splice(clave, 0, p.op[0]);
    items.push({
      id: `${prefijo}-s${semilla}-i${i}`,
      indicador, tema, nivelDua, puntosXP: XP_DUA[nivelDua],
      enunciado: `${tema ? `${tema}. ` : ''}${p.enunciado}`,
      opciones: orden.map(([v], k) => ({ letra: LETRAS[k], texto: `${v} ${c.unidad}` })),
      explicaciones: Object.fromEntries(orden.map(([, e], k) => [LETRAS[k], e])),
      clave: LETRAS[clave],
    });
  }
  return items;
}

export const calificarItem = (item, letra) => ({ correcta: item.clave === letra, xp: item.clave === letra ? item.puntosXP : 0, explicacion: item.explicaciones[letra] ?? '' });
