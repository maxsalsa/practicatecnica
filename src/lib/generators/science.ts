import { type Generator, int, near, num, pick, shuffle, smart } from './core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const u = (n: number, unit: string, _dec?: number) => `${smart(n)} ${unit}`;
export const physics: Generator[] = [
  (r, l) => { const t = int(r, 2, [10, 30, 120][l - 1]!), v = int(r, 2, [15, 30, 90][l - 1]!); const d = v * t; return { q: `Un móvil recorre ${num(d)} m en ${t} s con rapidez constante. ¿Cuál es su rapidez?`, correct: u(v, 'm/s'), wrong: near(r, v, x => u(x, 'm/s'), [d * t, t, v * 2]), why: `v = d ÷ t = ${num(d)} m ÷ ${t} s = ${v} m/s.` }; },
  (r) => { const ms = pick(r, [5, 10, 15, 20, 25, 30, 35]); const kmh = ms * 3.6; return { q: `Convierta ${ms} m/s a km/h.`, correct: u(kmh, 'km/h', Number.isInteger(kmh) ? 0 : 1), wrong: [u(ms / 3.6, 'km/h', 1), u(ms * 60, 'km/h'), u(ms * 1000, 'km/h'), u(kmh + 10, 'km/h', Number.isInteger(kmh) ? 0 : 1)], why: `1 m/s = 3,6 km/h, entonces ${ms} × 3,6 = ${num(kmh, Number.isInteger(kmh) ? 0 : 1)} km/h.` }; },
  (r, l) => { const m = int(r, 2, [20, 200, 1500][l - 1]!), a = int(r, 1, [5, 10, 20][l - 1]!); const F = m * a; return { q: `¿Qué fuerza neta acelera ${num(m)} kg a ${a} m/s²?`, correct: u(F, 'N'), wrong: near(r, F, x => u(x, 'N'), [m + a, m / a > 1 ? Math.round(m / a) : F + m, F * 10]), why: `Segunda ley de Newton: F = m × a = ${num(m)} × ${a} = ${num(F)} N.` }; },
  (r, l) => { const m = int(r, 2, [10, 80, 500][l - 1]!); const w = m * 9.8; return { q: `¿Cuál es el peso de un cuerpo de ${num(m)} kg en la Tierra (g = 9,8 m/s²)?`, correct: u(w, 'N', 1), wrong: [u(m, 'N', 1), u(m * 98, 'N', 1), u(w / 2, 'N', 1), u(m / 9.8, 'N', 1)], why: `Peso = m × g = ${num(m)} × 9,8 = ${smart(w)} N. La masa (${m} kg) no cambia; el peso depende de g.` }; },
  (r, l) => { const m = int(r, 1, [10, 60, 1200][l - 1]!), v = int(r, 2, [6, 20, 30][l - 1]!); const E = m * v * v / 2; return { q: `Calcule la energía cinética de ${num(m)} kg que se mueven a ${v} m/s.`, correct: u(E, 'J', Number.isInteger(E) ? 0 : 1), wrong: [u(m * v, 'J'), u(m * v * v, 'J'), u(m * v / 2, 'J', 1), u(E * 2 + m, 'J')], why: `Ec = ½ m v² = ½ × ${num(m)} × ${v}² = ${num(E, Number.isInteger(E) ? 0 : 1)} J.` }; },
  (r, l) => { const F = int(r, 5, [50, 300, 2000][l - 1]!), d = int(r, 2, [10, 40, 100][l - 1]!), t = pick(r, [2, 4, 5, 10]); const W = F * d; const P = W / t; return l === 1 ? { q: `Una fuerza de ${num(F)} N desplaza una caja ${d} m en su misma dirección. ¿Qué trabajo realiza?`, correct: u(W, 'J'), wrong: near(r, W, x => u(x, 'J'), [F + d, F / d > 1 ? Math.round(F / d) : W + F, W * 2]), why: `W = F × d = ${num(F)} × ${d} = ${num(W)} J.` } : { q: `Una máquina realiza ${num(W)} J de trabajo en ${t} s. ¿Cuál es su potencia?`, correct: u(P, 'W', Number.isInteger(P) ? 0 : 1), wrong: [u(W * t, 'W'), u(P * 2, 'W', Number.isInteger(P) ? 0 : 1), u(W, 'W'), u(P / 2, 'W', 1)], why: `P = W ÷ t = ${num(W)} J ÷ ${t} s = ${num(P, Number.isInteger(P) ? 0 : 1)} W.` }; },
  (r, l) => { const rho = pick(r, [0.8, 1, 1.2, 2.7, 7.8, 11.3]); const V = int(r, 2, [20, 100, 500][l - 1]!); const m = rho * V; return { q: `Un objeto tiene masa de ${smart(m)} g y volumen de ${V} cm³. ¿Cuál es su densidad?`, correct: u(rho, 'g/cm³', 1), wrong: [u(V / m, 'g/cm³', 1), u(m * V, 'g/cm³', 0), u(rho + 1, 'g/cm³', 1), u(rho * 10, 'g/cm³', 1)], why: `ρ = m ÷ V = ${smart(m)} g ÷ ${V} cm³ = ${smart(rho)} g/cm³.` }; },
  (r, l) => { const A = pick(r, [0.5, 1, 2, 4, 5]); const P = int(r, 2, [20, 100, 900][l - 1]!) * 100; const F = P * A; return { q: `Una fuerza de ${num(F)} N actúa sobre ${smart(A)} m². ¿Qué presión ejerce?`, correct: u(P, 'Pa'), wrong: [u(F * A, 'Pa'), u(P * 2, 'Pa'), u(P / 10, 'Pa'), u(F, 'Pa')], why: `Presión = F ÷ A = ${num(F)} N ÷ ${smart(A)} m² = ${num(P)} Pa.` }; },
];

export const electricity: Generator[] = [
  (r, l) => { const I = pick(r, [0.5, 1, 1.5, 2, 2.5, 3, 4, 5]), R = int(r, 2, [20, 100, 470][l - 1]!); const V = I * R; return { q: `Una resistencia de ${R} Ω conduce ${smart(I)} A. ¿Qué tensión hay entre sus terminales?`, correct: u(V, 'V', Number.isInteger(V) ? 0 : 1), wrong: [u(R / I, 'V', 1), u(I / R, 'V', 3), u(V * 2, 'V', 1), u(R + I, 'V', 1)], why: `Ley de Ohm: V = I × R = ${smart(I)} × ${R} = ${num(V, Number.isInteger(V) ? 0 : 1)} V.` }; },
  (r, l) => { const V = pick(r, [5, 9, 12, 24, 48, 120, 240]), I = pick(r, [0.5, 1, 2, 3, 4, 6]); const R = V / I; return { q: `Con ${V} V se mide una corriente de ${smart(I)} A. ¿Cuál es la resistencia?`, correct: u(R, 'Ω', Number.isInteger(R) ? 0 : 1), wrong: [u(V * I, 'Ω', 1), u(I / V, 'Ω', 3), u(R * 2, 'Ω', 1), u(R + 1, 'Ω', 1)], why: `R = V ÷ I = ${V} ÷ ${smart(I)} = ${num(R, Number.isInteger(R) ? 0 : 1)} Ω.` }; },
  (r) => { const V = pick(r, [12, 24, 120, 240]), I = pick(r, [0.5, 1, 2, 5, 8, 10, 15]); const P = V * I; return { q: `Un equipo trabaja a ${V} V y consume ${smart(I)} A. ¿Qué potencia demanda?`, correct: u(P, 'W', Number.isInteger(P) ? 0 : 1), wrong: [u(V / I, 'W', 1), u(P / 2, 'W', 1), u(P * 2, 'W', 1), u(V + I, 'W', 1)], why: `P = V × I = ${V} × ${smart(I)} = ${num(P, Number.isInteger(P) ? 0 : 1)} W.` }; },
  (r, l) => { const n = [2, 3, 4][l - 1]!; const rs = Array.from({ length: n }, () => int(r, 1, 100)); const s = rs.reduce((a, b) => a + b, 0); return { q: `Resistencias de ${rs.map(x => `${x} Ω`).join(', ')} se conectan en serie. ¿Cuál es la resistencia equivalente?`, correct: u(s, 'Ω'), wrong: [u(Math.max(...rs), 'Ω'), u(Math.round(s / n), 'Ω'), u(s + 10, 'Ω'), u(Math.round(1 / rs.reduce((a, b) => a + 1 / b, 0)), 'Ω')], why: `En serie las resistencias se suman: ${rs.join(' + ')} = ${s} Ω.` }; },
  (r) => { const [a, b] = pick(r, [[6, 3], [12, 6], [20, 20], [10, 15], [30, 60], [4, 12], [40, 10], [100, 25], [18, 9], [24, 8]] as const); const k = pick(r, [1, 2, 10]); const ra = a * k, rb = b * k; const eq = ra * rb / (ra + rb); return { q: `Dos resistencias de ${ra} Ω y ${rb} Ω se conectan en paralelo. ¿Cuál es la resistencia equivalente?`, correct: u(eq, 'Ω', Number.isInteger(eq) ? 0 : 1), wrong: [u(ra + rb, 'Ω'), u((ra + rb) / 2, 'Ω', 1), u(Math.min(ra, rb), 'Ω'), u(eq * 2, 'Ω', 1)], why: `Paralelo de dos: (R₁ × R₂) ÷ (R₁ + R₂) = ${ra * rb} ÷ ${ra + rb} = ${num(eq, Number.isInteger(eq) ? 0 : 1)} Ω; siempre es menor que la menor.` }; },
  (r, l) => { const W = pick(r, [100, 200, 500, 800, 1000, 1500, 2000]), h = int(r, 1, [6, 12, 24][l - 1]!), days = pick(r, [1, 10, 30]), tariff = int(r, 70, 140); const kwh = W / 1000 * h * days; const cost = kwh * tariff; return { q: `Un equipo de ${num(W)} W funciona ${h} h diarias durante ${days} día(s). Con tarifa de ₡${tariff}/kWh, ¿cuánto cuesta la energía? (cálculo idealizado)`, correct: `₡${num(Math.round(cost))}`, wrong: [`₡${num(Math.round(W * h * days * tariff))}`, `₡${num(Math.round(cost / days))}`, `₡${num(Math.round(cost * 1.13 + tariff))}`, `₡${num(Math.round(kwh))}`], why: `Energía = ${smart(W / 1000)} kW × ${h} h × ${days} = ${smart(kwh)} kWh; costo = ${smart(kwh)} × ₡${tariff} ≈ ₡${num(Math.round(cost))}.` }; },
];

const atoms: Record<string, number> = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, Cl: 35.5, K: 39, Ca: 40 };
const compounds: [string, string, [string, number][]][] = [
  ['agua', 'H₂O', [['H', 2], ['O', 1]]], ['dióxido de carbono', 'CO₂', [['C', 1], ['O', 2]]], ['cloruro de sodio', 'NaCl', [['Na', 1], ['Cl', 1]]],
  ['amoníaco', 'NH₃', [['N', 1], ['H', 3]]], ['metano', 'CH₄', [['C', 1], ['H', 4]]], ['glucosa', 'C₆H₁₂O₆', [['C', 6], ['H', 12], ['O', 6]]],
  ['ácido sulfúrico', 'H₂SO₄', [['H', 2], ['S', 1], ['O', 4]]], ['carbonato de calcio', 'CaCO₃', [['Ca', 1], ['C', 1], ['O', 3]]], ['hidróxido de sodio', 'NaOH', [['Na', 1], ['O', 1], ['H', 1]]],
  ['ácido clorhídrico', 'HCl', [['H', 1], ['Cl', 1]]], ['óxido de magnesio', 'MgO', [['Mg', 1], ['O', 1]]], ['cloruro de potasio', 'KCl', [['K', 1], ['Cl', 1]]],
  ['dióxido de azufre', 'SO₂', [['S', 1], ['O', 2]]], ['óxido de aluminio', 'Al₂O₃', [['Al', 2], ['O', 3]]], ['etanol', 'C₂H₆O', [['C', 2], ['H', 6], ['O', 1]]],
];
const molar = (parts: [string, number][]) => parts.reduce((s, [e, n]) => s + (atoms[e] ?? 0) * n, 0);
const table = (parts: [string, number][]) => parts.map(([e]) => `${e} = ${num(atoms[e] ?? 0, Number.isInteger(atoms[e]) ? 0 : 1)}`).join(', ');
export const chemistry: Generator[] = [
  (r) => { const [name, f, parts] = pick(r, compounds); const M = molar(parts); const d = Number.isInteger(M) ? 0 : 1; return { q: `¿Cuál es la masa molar ${name === 'glucosa' ? 'de la' : 'del'} ${name} (${f})? Use ${table(parts)} g/mol.`, correct: u(M, 'g/mol', d), wrong: [u(parts.reduce((s, [e]) => s + (atoms[e] ?? 0), 0), 'g/mol', d), u(M + 16, 'g/mol', d), u(M - 1, 'g/mol', d), u(M * 2, 'g/mol', d)], why: `Se suman las masas atómicas por la cantidad de átomos: ${parts.map(([e, n]) => `${n} × ${num(atoms[e] ?? 0, Number.isInteger(atoms[e]) ? 0 : 1)}`).join(' + ')} = ${num(M, d)} g/mol.` }; },
  (r, l) => { const [name, f, parts] = pick(r, compounds); const M = molar(parts); const n = pick(r, [[0.5, 1, 2, 3], [0.25, 1.5, 2.5, 4], [0.2, 0.75, 5, 10]][l - 1]!); const m = M * n; return { q: `¿Cuántos moles hay en ${num(m, Number.isInteger(m) ? 0 : 2)} g de ${name} (${f}, M = ${num(M, Number.isInteger(M) ? 0 : 1)} g/mol)?`, correct: u(n, 'mol', Number.isInteger(n) ? 0 : 2), wrong: [u(m * M, 'mol', 0), u(n * 2, 'mol', 2), u(n / 2, 'mol', 2), u(n + 1, 'mol', 2)], why: `n = m ÷ M = ${smart(m)} g ÷ ${smart(M)} g/mol = ${smart(n)} mol.` }; },
  (r, l) => { const n = pick(r, [0.1, 0.2, 0.25, 0.5, 1, 1.5, 2]), V = pick(r, [0.25, 0.5, 1, 2, 4]); const M = n / V; return { q: `Se disuelven ${smart(n)} mol de soluto hasta ${smart(V)} L de disolución. ¿Cuál es la molaridad?`, correct: u(M, 'mol/L', Number.isInteger(M) ? 0 : 2), wrong: [u(n * V, 'mol/L', 2), u(V / n, 'mol/L', 2), u(M * 2, 'mol/L', 2), u(M + 1, 'mol/L', 2)].concat(l > 2 ? [u(M / 10, 'mol/L', 3)] : []), why: `M = n ÷ V = ${smart(n)} ÷ ${smart(V)} = ${smart(M)} mol/L.` }; },
  (r) => { const C1 = pick(r, [1, 2, 3, 4, 6]), V1 = pick(r, [50, 100, 200, 250]), factor = pick(r, [2, 4, 5, 10]); const V2 = V1 * factor; const C2 = C1 / factor; return { q: `Se diluyen ${V1} mL de una disolución ${C1} M hasta ${V2} mL. ¿Cuál es la nueva concentración?`, correct: u(C2, 'M', Number.isInteger(C2) ? 0 : 2), wrong: [u(C1 * factor, 'M', 0), u(C1 - C2, 'M', 2), u(C2 * 2, 'M', 2), u(C1, 'M', 0)], why: `C₁V₁ = C₂V₂ → C₂ = ${C1} × ${V1} ÷ ${V2} = ${smart(C2)} M.` }; },
];

type Trait = { trait: string; dom: string; rec: string; L: string };
const traits: Trait[] = [
  { trait: 'color de la semilla de guisante', dom: 'amarilla', rec: 'verde', L: 'A' }, { trait: 'forma de la semilla de guisante', dom: 'lisa', rec: 'rugosa', L: 'R' },
  { trait: 'altura de la planta de guisante', dom: 'alta', rec: 'enana', L: 'T' }, { trait: 'color de la flor de guisante', dom: 'púrpura', rec: 'blanca', L: 'P' },
  { trait: 'color del pelaje en un modelo de cobayos', dom: 'negro', rec: 'blanco', L: 'B' }, { trait: 'forma de la vaina de guisante', dom: 'inflada', rec: 'comprimida', L: 'I' },
];
const pctLabel = (x: number) => `${num(x)} %`;
const organelles: [string, string][] = [
  ['Núcleo', 'Contiene el ADN y coordina las actividades celulares'], ['Mitocondria', 'Realiza la respiración celular y produce ATP'], ['Ribosoma', 'Sintetiza proteínas'],
  ['Cloroplasto', 'Realiza la fotosíntesis'], ['Membrana plasmática', 'Regula el paso de sustancias'], ['Aparato de Golgi', 'Modifica, empaca y distribuye proteínas'],
  ['Lisosoma', 'Digiere materiales con enzimas'], ['Pared celular', 'Da soporte y protección a la célula vegetal'], ['Vacuola central', 'Almacena agua y sustancias en la célula vegetal'],
  ['Retículo endoplasmático rugoso', 'Participa en la síntesis y transporte de proteínas'],
];
const systems: [string, string][] = [
  ['Digestivo', 'Transforma los alimentos y absorbe nutrientes'], ['Respiratorio', 'Intercambia oxígeno y dióxido de carbono'], ['Circulatorio', 'Transporta sangre, nutrientes y gases'],
  ['Nervioso', 'Recibe estímulos y coordina respuestas'], ['Urinario', 'Filtra la sangre y elimina desechos en la orina'], ['Endocrino', 'Regula funciones mediante hormonas'],
  ['Inmunológico', 'Defiende el cuerpo de agentes patógenos'], ['Esquelético', 'Sostiene el cuerpo y protege órganos'], ['Muscular', 'Permite el movimiento'],
];
function factItem(r: () => number, rows: [string, string][], label: string) {
  const [name, fn] = pick(r, rows); const others = shuffle(r, rows.filter(x => x[0] !== name));
  return r() < 0.5
    ? { q: `¿Qué ${label} cumple esta función: «${fn}»?`, correct: name, wrong: others.map(x => x[0]), why: `${name}: ${fn.charAt(0).toLowerCase()}${fn.slice(1)}.` }
    : { q: `¿Cuál es la función principal de: ${name.toLowerCase()}?`, correct: fn, wrong: others.map(x => x[1]), why: `${name}: ${fn.charAt(0).toLowerCase()}${fn.slice(1)}.` };
}
export const biology: Generator[] = [
  (r, l) => {
    const t = pick(r, traits); const g = [`${t.L}${t.L}`, `${t.L}${t.L.toLowerCase()}`, `${t.L.toLowerCase()}${t.L.toLowerCase()}`];
    const p1 = pick(r, l === 1 ? [g[0]!, g[2]!] : g), p2 = pick(r, l === 1 ? [g[1]!, g[2]!] : g);
    const kids = [...p1].flatMap(a => [...p2].map(b => a + b));
    const recessive = kids.filter(k => k === k.toLowerCase()).length / 4 * 100;
    const askRec = r() < 0.5; const v = askRec ? recessive : 100 - recessive; const ph = askRec ? t.rec : t.dom;
    return { q: `En el ${t.trait}, ${t.dom} (${t.L}) domina sobre ${t.rec} (${t.L.toLowerCase()}). Si se cruzan ${p1} × ${p2}, ¿qué porcentaje de la descendencia se espera con fenotipo ${ph}?`, correct: pctLabel(v), wrong: [0, 25, 50, 75, 100].filter(x => x !== v).map(pctLabel), why: `Cuadro de Punnett: ${kids.join(', ')}. El fenotipo ${t.rec} requiere dos alelos recesivos; ${num(recessive)} % es ${t.rec} y ${num(100 - recessive)} % es ${t.dom}.` };
  },
  r => factItem(r, organelles, 'estructura celular'),
  r => factItem(r, systems, 'sistema del cuerpo humano'),
  (r, l) => { const energy = int(r, 1, [10, 50, 100][l - 1]!) * 1000; const level = int(r, 2, [3, 4, 4][l - 1]!); const v = energy / 10 ** (level - 1); const names = ['productores', 'consumidores primarios', 'consumidores secundarios', 'consumidores terciarios']; return { q: `Según la regla aproximada del 10 %, si los productores fijan ${num(energy)} kcal, ¿cuánta energía llega a los ${names[level - 1]}?`, correct: `${num(v, v < 1 ? 1 : 0)} kcal`, wrong: [`${num(energy / 2)} kcal`, `${num(v * 10)} kcal`, `${smart(v / 10)} kcal`, `${num(energy * 0.9)} kcal`], why: `En cada nivel trófico pasa cerca del 10 %: ${num(energy)} × 0,1^${level - 1} = ${num(v, v < 1 ? 1 : 0)} kcal.` }; },
];
