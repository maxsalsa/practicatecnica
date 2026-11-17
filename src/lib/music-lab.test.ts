import { describe, it, expect } from 'vitest';
import { buildRound, detectPitch, nearestNote, matchesPitchClass, midiToFreq, MUSIC_MODES, MUSIC_LEVELS, INTERVALS, ROUND_SIZE } from './music-lab';

const sine = (freq: number, rate = 44100, n = 2048) => Float32Array.from({ length: n }, (_, i) => Math.sin(2 * Math.PI * freq * i / rate) * 0.5);

describe('laboratorio musical', () => {
  it('La4 suena a 440 Hz y Do4 a 261,63 Hz', () => {
    expect(midiToFreq(69)).toBe(440); expect(midiToFreq(60)).toBeCloseTo(261.63, 1);
  });
  it('cada ronda tiene 8 preguntas con la respuesta entre las opciones y sin opciones repetidas', () => {
    for (const m of MUSIC_MODES) for (const l of MUSIC_LEVELS) for (const seed of [1, 7, 42]) {
      const round = buildRound(m.id, l.id, seed);
      expect(round).toHaveLength(ROUND_SIZE);
      for (const q of round) { expect(q.answer).toBeGreaterThanOrEqual(0); expect(q.answer).toBeLessThan(q.options.length); expect(new Set(q.options).size).toBe(q.options.length); }
    }
  });
  it('nivel inicial usa tres opciones y los niveles superiores cuatro', () => {
    expect(buildRound('teoria', 'inicial', 3).every(q => q.options.length === 3)).toBe(true);
    expect(buildRound('teoria', 'avanzado', 3).every(q => q.options.length === 4)).toBe(true);
  });
  it('la misma semilla produce la misma ronda', () => {
    expect(buildRound('intervalos', 'intermedio', 9)).toEqual(buildRound('intervalos', 'intermedio', 9));
  });
  it('el intervalo sonado coincide con los semitonos de la respuesta', () => {
    for (const q of buildRound('intervalos', 'avanzado', 11)) {
      const [a, b] = q.play?.steps.map(s => s.notes[0] ?? 0) ?? [];
      expect(INTERVALS.find(i => i.name === q.options[q.answer])?.semitones).toBe((b ?? 0) - (a ?? 0));
    }
  });
  it('detecta la afinación de un tono puro', () => {
    expect(detectPitch(sine(440), 44100)).toBeCloseTo(440, 0);
    expect(nearestNote(detectPitch(sine(261.63), 44100) ?? 0).name).toBe('Do4');
    expect(detectPitch(new Float32Array(2048), 44100)).toBeNull();
  });
  it('al cantar acepta la misma nota en otra octava dentro de ±50 cents', () => {
    expect(matchesPitchClass(130.81, 60)).toBe(true);
    expect(matchesPitchClass(277.18, 60)).toBe(false);
  });
});
