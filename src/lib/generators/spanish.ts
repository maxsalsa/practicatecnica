import { type Generator, pick, shuffle } from './core';

const stress: Record<'aguda' | 'llana' | 'esdrújula' | 'sobresdrújula', string[]> = {
  aguda: ['canción', 'café', 'reloj', 'pared', 'ciudad', 'salud', 'papel', 'camión', 'sofá', 'jabón', 'maní', 'feliz', 'nariz', 'comer', 'vivir', 'amor', 'color', 'francés', 'compás', 'ratón', 'corazón', 'país', 'hotel', 'mantel', 'algodón', 'anís', 'balcón', 'colibrí', 'jamás', 'motor'],
  llana: ['árbol', 'lápiz', 'casa', 'mesa', 'cárcel', 'fácil', 'útil', 'azúcar', 'carácter', 'débil', 'examen', 'joven', 'origen', 'imagen', 'libro', 'cuaderno', 'ventana', 'mármol', 'césped', 'túnel', 'móvil', 'difícil', 'escuela', 'cráter', 'dócil', 'huésped', 'tórax', 'resumen', 'crisis', 'virus'],
  esdrújula: ['música', 'teléfono', 'pájaro', 'brújula', 'lámpara', 'química', 'matemáticas', 'sílaba', 'válvula', 'cámara', 'médico', 'número', 'océano', 'plátano', 'rápido', 'término', 'último', 'público', 'década', 'máquina', 'científico', 'eléctrico', 'gramática', 'murciélago', 'círculo'],
  sobresdrújula: ['dígamelo', 'explícaselo', 'cómpratelo', 'entrégueselo', 'devuélvemelo', 'cuéntamelo', 'escríbeselo', 'llévatelo', 'demuéstraselo', 'tráiganoslo'],
};
const stressWhy = { aguda: 'la sílaba tónica es la última', llana: 'la sílaba tónica es la penúltima', esdrújula: 'la sílaba tónica es la antepenúltima', sobresdrújula: 'la sílaba tónica está antes de la antepenúltima' } as const;

type Verb = { inf: string; stem: string; g: 'ar' | 'er' | 'ir' };
const verb = (inf: string): Verb => ({ inf, stem: inf.slice(0, -2), g: inf.slice(-2) as Verb['g'] });
const verbs = ['hablar', 'cantar', 'estudiar', 'trabajar', 'caminar', 'cocinar', 'dibujar', 'escuchar', 'limpiar', 'mirar', 'nadar', 'ayudar', 'preparar', 'participar', 'comer', 'beber', 'aprender', 'correr', 'vender', 'comprender', 'responder', 'temer', 'vivir', 'escribir', 'abrir', 'recibir', 'decidir', 'subir', 'compartir', 'permitir'].map(verb);
const persons = ['yo', 'tú', 'ella', 'nosotros', 'ellas'] as const;
const endings: Record<string, Record<Verb['g'], string[]>> = {
  presente: { ar: ['o', 'as', 'a', 'amos', 'an'], er: ['o', 'es', 'e', 'emos', 'en'], ir: ['o', 'es', 'e', 'imos', 'en'] },
  'pretérito imperfecto': { ar: ['aba', 'abas', 'aba', 'ábamos', 'aban'], er: ['ía', 'ías', 'ía', 'íamos', 'ían'], ir: ['ía', 'ías', 'ía', 'íamos', 'ían'] },
  futuro: { ar: ['é', 'ás', 'á', 'emos', 'án'], er: ['é', 'ás', 'á', 'emos', 'án'], ir: ['é', 'ás', 'á', 'emos', 'án'] },
};
const form = (v: Verb, tense: string, p: number) => (tense === 'futuro' ? v.inf : v.stem) + (endings[tense]?.[v.g][p] ?? '');

const subjects = ['El grupo de décimo', 'La directora del colegio', 'Mi hermana menor', 'El equipo de robótica', 'La profesora de Química', 'Un estudiante de sétimo', 'El comité de la feria', 'La biblioteca municipal', 'Nuestro entrenador', 'La banda del colegio', 'El técnico de redes', 'Una agricultora de Zarcero', 'El jurado del festival', 'La orquesta juvenil', 'El conserje de la escuela'];
const predicates: [string, string][] = [
  ['presentó', 'el proyecto de la feria científica'], ['organizó', 'una campaña de reciclaje'], ['revisó', 'los informes del período'], ['ganó', 'el primer lugar regional'],
  ['preparó', 'una exposición sobre volcanes'], ['visitó', 'la empresa de alimentos'], ['donó', 'libros a la comunidad'], ['reparó', 'la red del laboratorio'],
  ['explicó', 'la teoría celular'], ['sembró', 'árboles nativos en el patio'], ['publicó', 'el horario de exámenes'], ['interpretó', 'el himno nacional'],
];
const pairs: [string, string, 'sinónimo' | 'antónimo'][] = [
  ['veloz', 'rápido', 'sinónimo'], ['hermoso', 'bello', 'sinónimo'], ['comenzar', 'iniciar', 'sinónimo'], ['difícil', 'complicado', 'sinónimo'], ['alegre', 'contento', 'sinónimo'],
  ['enorme', 'gigantesco', 'sinónimo'], ['conversar', 'dialogar', 'sinónimo'], ['vivienda', 'hogar', 'sinónimo'], ['valiente', 'audaz', 'sinónimo'], ['antiguo', 'viejo', 'sinónimo'],
  ['observar', 'mirar', 'sinónimo'], ['cansado', 'fatigado', 'sinónimo'], ['erróneo', 'equivocado', 'sinónimo'], ['obtener', 'conseguir', 'sinónimo'], ['sencillo', 'fácil', 'sinónimo'],
  ['generoso', 'tacaño', 'antónimo'], ['ascender', 'descender', 'antónimo'], ['abundante', 'escaso', 'antónimo'], ['claro', 'oscuro', 'antónimo'], ['aceptar', 'rechazar', 'antónimo'],
  ['ancho', 'estrecho', 'antónimo'], ['valiente', 'cobarde', 'antónimo'], ['construir', 'destruir', 'antónimo'], ['máximo', 'mínimo', 'antónimo'], ['público', 'privado', 'antónimo'],
  ['temprano', 'tarde', 'antónimo'], ['ganar', 'perder', 'antónimo'], ['interior', 'exterior', 'antónimo'], ['olvidar', 'recordar', 'antónimo'], ['moderno', 'antiguo', 'antónimo'],
];

export const spanish: Generator[] = [
  r => { const cls = pick(r, Object.keys(stress) as (keyof typeof stress)[]); const w = pick(r, stress[cls]); return { q: `Según la posición de la sílaba tónica, ¿cómo se clasifica la palabra «${w}»?`, correct: cls[0]!.toUpperCase() + cls.slice(1), wrong: shuffle(r, (Object.keys(stress) as string[]).filter(c => c !== cls)).map(c => c[0]!.toUpperCase() + c.slice(1)), why: `«${w}» es ${cls}: ${stressWhy[cls]}.` }; },
  r => { const cls = pick(r, ['aguda', 'llana', 'esdrújula'] as const); const w = pick(r, stress[cls]); const others = shuffle(r, (['aguda', 'llana', 'esdrújula', 'sobresdrújula'] as const).filter(c => c !== cls)).map(c => pick(r, stress[c])); return { q: `¿Cuál de estas palabras es ${cls}?`, correct: w, wrong: others, why: `«${w}» es ${cls} porque ${stressWhy[cls]}; las demás tienen la fuerza de voz en otra sílaba.` }; },
  (r, l) => { const v = pick(r, verbs); const tense = pick(r, l === 1 ? ['presente'] : l === 2 ? ['presente', 'futuro'] : ['pretérito imperfecto', 'futuro', 'presente']); const p = Math.floor(r() * 5); const ok = form(v, tense, p); const wrong = [0, 1, 2, 3, 4].filter(i => i !== p).map(i => form(v, tense, i)).concat(Object.keys(endings).filter(t => t !== tense).map(t => form(v, t, p))); return { q: `Conjugue «${v.inf}» en ${tense} de indicativo para «${persons[p]}».`, correct: ok, wrong: shuffle(r, wrong), why: `Verbo regular de la ${v.g === 'ar' ? 'primera' : v.g === 'er' ? 'segunda' : 'tercera'} conjugación: ${persons[p]} ${ok}.` }; },
  r => { const s = pick(r, subjects); const [vb, comp] = pick(r, predicates); const other = pick(r, subjects.filter(x => x !== s)); return { q: `¿Cuál es el sujeto de la oración «${s} ${vb} ${comp}»?`, correct: s, wrong: [comp.charAt(0).toUpperCase() + comp.slice(1), `${vb} ${comp}`.replace(/^./, c => c.toUpperCase()), other], why: `El sujeto es quien realiza la acción y concuerda con el verbo «${vb}»: ${s.charAt(0).toLowerCase()}${s.slice(1)}. El predicado es «${vb} ${comp}».` }; },
  r => { const s = pick(r, subjects); const [vb, comp] = pick(r, predicates); return { q: `En la oración «${s} ${vb} ${comp}», ¿cuál es el núcleo del predicado?`, correct: vb, wrong: [comp, s, comp.split(' ').slice(-1)[0] ?? 'feria', s.split(' ').slice(1, 2)[0] ?? 'grupo'], why: `El núcleo del predicado es el verbo conjugado: «${vb}».` }; },
  r => { const [a, b, kind] = pick(r, pairs); const related = new Set(pairs.filter(p => [a, b].some(w => p[0] === w || p[1] === w)).flatMap(p => [p[0], p[1]])); const others = shuffle(r, [...new Set(pairs.map(p => p[1]))].filter(w => !related.has(w))); return { q: `¿Cuál es un ${kind} de «${a}»?`, correct: b, wrong: others, why: `«${b}» ${kind === 'sinónimo' ? 'significa lo mismo o casi lo mismo que' : 'expresa lo contrario de'} «${a}».` }; },
];
