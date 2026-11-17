/** Original ear-training content. Pure functions: deterministic rounds from a seed, equal-temperament pitches and local pitch detection. */
export type MusicMode = 'notas' | 'intervalos' | 'escalas' | 'apreciacion' | 'pentagrama' | 'teoria';
export type MusicLevel = 'inicial' | 'intermedio' | 'avanzado';
export const MUSIC_MODES: { id: MusicMode; label: string; hint: string }[] = [
  { id: 'notas', label: 'Escuchar notas', hint: 'Oiga el Do de referencia y luego identifique la nota.' },
  { id: 'intervalos', label: 'Intervalos', hint: 'Dos notas seguidas: reconozca la distancia entre ellas.' },
  { id: 'escalas', label: 'Escalas y acordes', hint: 'Distinga escalas y acordes mayores, menores y otros.' },
  { id: 'apreciacion', label: 'Apreciación', hint: 'Dirección de la melodía, velocidad, intensidad y timbre.' },
  { id: 'pentagrama', label: 'Pentagrama', hint: 'Lea la nota escrita en clave de sol.' },
  { id: 'teoria', label: 'Teoría', hint: 'Figuras, signos, términos e instrumentos.' },
];
export const MUSIC_LEVELS: { id: MusicLevel; label: string }[] = [{ id: 'inicial', label: 'Inicial' }, { id: 'intermedio', label: 'Intermedio' }, { id: 'avanzado', label: 'Avanzado' }];

export const SOLFEGE = ['Do', 'Do♯', 'Re', 'Re♯', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'La♯', 'Si'];
export const midiToFreq = (midi: number) => 440 * 2 ** ((midi - 69) / 12);
export const noteName = (midi: number) => `${SOLFEGE[((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}`;

export type Wave = 'sine' | 'triangle' | 'square' | 'sawtooth';
export interface PlaySpec { steps: { notes: number[]; beats: number }[]; bpm: number; gain: number; wave: Wave }
export interface MusicQuestion { prompt: string; options: string[]; answer: number; play?: PlaySpec; staff?: number; why: string; highlight?: number[] }

const seq = (notes: number[], bpm = 90, extra: Partial<PlaySpec> = {}): PlaySpec => ({ steps: notes.map(n => ({ notes: [n], beats: 1 })), bpm, gain: 0.7, wave: 'triangle', ...extra });
const chord = (notes: number[]): PlaySpec => ({ steps: [{ notes, beats: 2 }], bpm: 60, gain: 0.5, wave: 'triangle' });

export function rng(seed: number) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const pick = <T,>(r: () => number, list: readonly T[]): T => list[Math.floor(r() * list.length)] as T;
function shuffle<T>(r: () => number, list: T[]) { const a = [...list]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j] as T, a[i] as T]; } return a; }
/** Builds options with the right answer at a random position (Fisher–Yates), never duplicated. */
function withOptions(r: () => number, correct: string, pool: readonly string[], count: number) {
  const distractors = shuffle(r, pool.filter(p => p !== correct)).slice(0, count - 1);
  const options = shuffle(r, [correct, ...distractors]);
  return { options, answer: options.indexOf(correct) };
}
const optionCount = (level: MusicLevel) => (level === 'inicial' ? 3 : 4);

const NATURAL = [60, 62, 64, 65, 67, 69, 71];
export const INTERVALS = [
  { name: '2.ª menor', semitones: 1, level: 'avanzado' }, { name: '2.ª mayor', semitones: 2, level: 'intermedio' }, { name: '3.ª menor', semitones: 3, level: 'intermedio' },
  { name: '3.ª mayor', semitones: 4, level: 'inicial' }, { name: '4.ª justa', semitones: 5, level: 'intermedio' }, { name: 'Tritono', semitones: 6, level: 'avanzado' },
  { name: '5.ª justa', semitones: 7, level: 'inicial' }, { name: '6.ª mayor', semitones: 9, level: 'avanzado' }, { name: '7.ª menor', semitones: 10, level: 'avanzado' }, { name: '8.ª justa', semitones: 12, level: 'inicial' },
] as const;
const rank: Record<MusicLevel, number> = { inicial: 0, intermedio: 1, avanzado: 2 };
export const SCALES = [
  { name: 'Escala mayor', steps: [0, 2, 4, 5, 7, 9, 11, 12], level: 'inicial' }, { name: 'Escala menor natural', steps: [0, 2, 3, 5, 7, 8, 10, 12], level: 'inicial' },
  { name: 'Escala pentatónica mayor', steps: [0, 2, 4, 7, 9, 12], level: 'intermedio' }, { name: 'Escala menor armónica', steps: [0, 2, 3, 5, 7, 8, 11, 12], level: 'avanzado' },
] as const;
export const CHORDS = [
  { name: 'Acorde mayor', steps: [0, 4, 7], level: 'inicial' }, { name: 'Acorde menor', steps: [0, 3, 7], level: 'inicial' },
  { name: 'Acorde disminuido', steps: [0, 3, 6], level: 'avanzado' }, { name: 'Acorde aumentado', steps: [0, 4, 8], level: 'avanzado' },
] as const;
/** Treble-clef staff positions: 0 = bottom line (Mi4); each step is a line or a space. */
export const STAFF_NOTES = [{ midi: 60, pos: -2 }, { midi: 62, pos: -1 }, { midi: 64, pos: 0 }, { midi: 65, pos: 1 }, { midi: 67, pos: 2 }, { midi: 69, pos: 3 }, { midi: 71, pos: 4 }, { midi: 72, pos: 5 }, { midi: 74, pos: 6 }, { midi: 76, pos: 7 }, { midi: 77, pos: 8 }, { midi: 79, pos: 9 }];

const THEORY: { q: string; a: string; d: string[]; why: string; level: MusicLevel }[] = [
  { q: 'En compás de 4/4, ¿cuántos tiempos dura una redonda?', a: '4 tiempos', d: ['2 tiempos', '1 tiempo', '3 tiempos'], why: 'La redonda equivale a dos blancas o cuatro negras.', level: 'inicial' },
  { q: '¿Cuántos tiempos dura una blanca en 4/4?', a: '2 tiempos', d: ['4 tiempos', '1 tiempo', 'Medio tiempo'], why: 'La blanca vale la mitad de una redonda.', level: 'inicial' },
  { q: '¿Cuántas corcheas caben en una negra?', a: '2', d: ['4', '1', '3'], why: 'Cada corchea dura medio tiempo cuando la negra es la unidad.', level: 'inicial' },
  { q: '¿Qué hace el sostenido (♯)?', a: 'Sube la nota medio tono', d: ['Baja la nota medio tono', 'Duplica la duración', 'Indica silencio'], why: 'El sostenido eleva un semitono; el bemol lo baja.', level: 'inicial' },
  { q: '¿Qué indica la palabra «forte»?', a: 'Tocar fuerte', d: ['Tocar suave', 'Acelerar', 'Repetir'], why: 'Forte es un término de dinámica; piano significa suave.', level: 'inicial' },
  { q: '¿A qué familia pertenece el violín?', a: 'Cuerda frotada', d: ['Viento metal', 'Percusión', 'Cuerda pulsada'], why: 'El arco frota las cuerdas y las hace vibrar.', level: 'inicial' },
  { q: '¿A qué familia pertenece la trompeta?', a: 'Viento metal', d: ['Viento madera', 'Cuerda frotada', 'Percusión'], why: 'El sonido nace de la vibración de los labios en la boquilla.', level: 'inicial' },
  { q: '¿Cómo se clasifica la marimba?', a: 'Percusión de láminas', d: ['Cuerda pulsada', 'Viento madera', 'Viento metal'], why: 'Se golpean láminas de madera con baquetas.', level: 'intermedio' },
  { q: '¿Qué significa «crescendo»?', a: 'Aumentar poco a poco la intensidad', d: ['Disminuir la velocidad', 'Tocar separado', 'Detenerse'], why: 'Crescendo aumenta la intensidad; diminuendo la reduce.', level: 'intermedio' },
  { q: '¿Qué tempo es más lento?', a: 'Adagio', d: ['Allegro', 'Presto', 'Vivace'], why: 'Adagio es lento; allegro, presto y vivace son rápidos.', level: 'intermedio' },
  { q: '¿Cuántos semitonos tiene una 5.ª justa?', a: '7', d: ['5', '4', '12'], why: 'Do–Sol abarca siete semitonos.', level: 'intermedio' },
  { q: 'El clarinete pertenece a la familia de…', a: 'Viento madera', d: ['Viento metal', 'Cuerda frotada', 'Percusión'], why: 'Usa una caña aunque algunos modelos no sean de madera.', level: 'intermedio' },
  { q: '¿Qué notas forman el acorde de Do mayor?', a: 'Do – Mi – Sol', d: ['Do – Mib – Sol', 'Do – Fa – La', 'Do – Re – Mi'], why: 'Fundamental, 3.ª mayor y 5.ª justa.', level: 'avanzado' },
  { q: '¿Cuál es la relativa menor de Do mayor?', a: 'La menor', d: ['Mi menor', 'Re menor', 'Fa menor'], why: 'Comparten la misma armadura, sin alteraciones.', level: 'avanzado' },
  { q: 'Una melodía con acompañamiento de acordes tiene textura…', a: 'Homofónica', d: ['Monofónica', 'Polifónica imitativa', 'Sin textura'], why: 'Una voz principal sostenida por acordes es homofonía.', level: 'avanzado' },
  { q: '¿Qué diferencia a la menor armónica de la menor natural?', a: 'El 7.º grado elevado', d: ['El 3.er grado elevado', 'No tiene 5.º grado', 'Tiene seis notas'], why: 'Elevar el séptimo grado crea la sensible.', level: 'avanzado' },
];

function question(mode: MusicMode, level: MusicLevel, r: () => number): MusicQuestion {
  const n = optionCount(level);
  if (mode === 'notas') {
    const pool = level === 'inicial' ? NATURAL.slice(0, 5) : NATURAL;
    const target = pick(r, pool); const names = pool.map(m => SOLFEGE[m % 12] as string);
    return { prompt: 'Primero suena Do. ¿Qué nota suena después?', ...withOptions(r, SOLFEGE[target % 12] as string, names, level === 'avanzado' ? 5 : n), play: seq([60, target], 80), why: `Era ${noteName(target)}.`, highlight: [60, target] };
  }
  if (mode === 'intervalos') {
    const pool = INTERVALS.filter(i => rank[i.level] <= rank[level]); const it = pick(r, pool); const root = pick(r, [57, 60, 62, 64, 65]);
    return { prompt: '¿Qué intervalo forman las dos notas?', ...withOptions(r, it.name, pool.map(i => i.name), n), play: seq([root, root + it.semitones], 80), why: `${it.name}: ${it.semitones} semitonos (${noteName(root)} → ${noteName(root + it.semitones)}).`, highlight: [root, root + it.semitones] };
  }
  if (mode === 'escalas') {
    const scales = SCALES.filter(s => rank[s.level] <= rank[level]); const chords = CHORDS.filter(c => rank[c.level] <= rank[level]); const root = pick(r, [57, 60, 62]);
    if (r() < 0.5) { const s = pick(r, scales); return { prompt: '¿Qué escala escuchó?', ...withOptions(r, s.name, scales.map(x => x.name), Math.min(n, scales.length)), play: seq(s.steps.map(x => root + x), 140), why: `${s.name}: ${s.steps.map(x => SOLFEGE[(root + x) % 12]).join(' – ')}.`, highlight: s.steps.map(x => root + x) }; }
    const c = pick(r, chords); return { prompt: '¿Qué acorde escuchó?', ...withOptions(r, c.name, chords.map(x => x.name), Math.min(n, chords.length)), play: chord(c.steps.map(x => root + x)), why: `${c.name}: ${c.steps.map(x => SOLFEGE[(root + x) % 12]).join(' – ')}.`, highlight: c.steps.map(x => root + x) };
  }
  if (mode === 'apreciacion') {
    const kinds = level === 'inicial' ? ['contorno', 'tempo', 'intensidad'] : ['contorno', 'tempo', 'intensidad', 'timbre'];
    const kind = pick(r, kinds);
    if (kind === 'contorno') { const up = r() < 0.5; const notes = up ? [60, 62, 64, 67, 69] : [69, 67, 64, 62, 60]; return { prompt: '¿Hacia dónde va la melodía?', ...withOptions(r, up ? 'Sube' : 'Baja', ['Sube', 'Baja', 'Se mantiene igual'], 3), play: seq(notes, 120), why: up ? 'Cada nota es más aguda que la anterior.' : 'Cada nota es más grave que la anterior.', highlight: notes }; }
    if (kind === 'tempo') { const fast = r() < 0.5; return { prompt: '¿El pulso es rápido o lento?', ...withOptions(r, fast ? 'Rápido (allegro)' : 'Lento (adagio)', ['Rápido (allegro)', 'Lento (adagio)', 'Sin pulso'], 3), play: seq([60, 60, 67, 67, 69, 69, 67], fast ? 180 : 60), why: fast ? 'Las notas se suceden con poca distancia: tempo rápido.' : 'Hay mucho espacio entre notas: tempo lento.' }; }
    if (kind === 'intensidad') { const loud = r() < 0.5; return { prompt: '¿Cómo es la intensidad?', ...withOptions(r, loud ? 'Fuerte (forte)' : 'Suave (piano)', ['Fuerte (forte)', 'Suave (piano)', 'Cambia de suave a fuerte'], 3), play: seq([64, 65, 67, 65, 64], 110, { gain: loud ? 0.9 : 0.15 }), why: loud ? 'Volumen alto y constante: forte.' : 'Volumen bajo y constante: piano.' }; }
    const waves: { w: Wave; name: string }[] = [{ w: 'sine', name: 'Puro y suave (como silbido)' }, { w: 'square', name: 'Hueco y nasal' }, { w: 'sawtooth', name: 'Brillante y áspero' }];
    const t = pick(r, waves); return { prompt: '¿Cómo describe el timbre de este sonido sintetizado?', ...withOptions(r, t.name, waves.map(x => x.name), 3), play: seq([60, 64, 67], 90, { wave: t.w }), why: 'El timbre depende de los armónicos que acompañan al sonido fundamental.' };
  }
  if (mode === 'pentagrama') {
    const pool = level === 'inicial' ? STAFF_NOTES.slice(0, 8) : STAFF_NOTES; const s = pick(r, pool);
    const names = [...new Set(pool.map(x => SOLFEGE[x.midi % 12] as string))];
    return { prompt: '¿Qué nota está escrita en el pentagrama?', ...withOptions(r, SOLFEGE[s.midi % 12] as string, names, n), staff: s.midi, play: seq([s.midi], 60), why: `Es ${noteName(s.midi)}${s.pos < 0 ? ', con línea adicional' : s.pos % 2 === 0 ? ', sobre una línea' : ', en un espacio'}.`, highlight: [s.midi] };
  }
  const pool = THEORY.filter(t => rank[t.level] <= rank[level]); const t = pick(r, pool);
  return { prompt: t.q, ...withOptions(r, t.a, [t.a, ...t.d], n), why: t.why };
}

export const ROUND_SIZE = 8;
/** One round without repeating the same prompt+answer consecutively. */
export function buildRound(mode: MusicMode, level: MusicLevel, seed: number): MusicQuestion[] {
  const r = rng(seed); const out: MusicQuestion[] = [];
  let guard = 0;
  while (out.length < ROUND_SIZE && guard++ < 200) {
    const q = question(mode, level, r); const prev = out[out.length - 1];
    if (prev && prev.prompt === q.prompt && prev.options[prev.answer] === q.options[q.answer]) continue;
    out.push(q);
  }
  return out;
}
export const musicSubject = (mode: MusicMode | 'cantar', level: MusicLevel) => `musica-v1:${mode}:${level}`;

/** Autocorrelation pitch estimate for a mono buffer; returns null for silence or noise. Runs locally only. */
export function detectPitch(buf: Float32Array, sampleRate: number): number | null {
  let rms = 0; for (const v of buf) rms += v * v; rms = Math.sqrt(rms / buf.length);
  if (rms < 0.01) return null;
  const minLag = Math.floor(sampleRate / 1100), maxLag = Math.min(Math.floor(sampleRate / 70), buf.length - 1);
  let bestLag = -1, best = 0;
  const corr = (lag: number) => { let s = 0; for (let i = 0; i + lag < buf.length; i++) s += (buf[i] ?? 0) * (buf[i + lag] ?? 0); return s; };
  const zero = corr(0);
  for (let lag = minLag; lag <= maxLag; lag++) { const c = corr(lag); if (c > best) { best = c; bestLag = lag; } }
  if (bestLag < 0 || best / zero < 0.5) return null;
  // Prefer the shortest lag that is nearly as strong, avoiding octave-low errors.
  for (let div = 4; div >= 2; div--) { const lag = Math.round(bestLag / div); if (lag >= minLag && corr(lag) > best * 0.9) { bestLag = lag; break; } }
  const a = corr(bestLag - 1), b = corr(bestLag), c = corr(bestLag + 1);
  const shift = (a - c) / (2 * (a - 2 * b + c) || 1);
  return sampleRate / (bestLag + (Number.isFinite(shift) ? shift : 0));
}
export function nearestNote(freq: number) {
  const midi = Math.round(69 + 12 * Math.log2(freq / 440));
  return { midi, name: noteName(midi), cents: Math.round(1200 * Math.log2(freq / midiToFreq(midi))) };
}
/** Singing check: same pitch class within ±50 cents, any octave (voices differ). */
export function matchesPitchClass(freq: number, target: number) {
  const n = nearestNote(freq); return ((n.midi - target) % 12 + 12) % 12 === 0 && Math.abs(n.cents) <= 50;
}
