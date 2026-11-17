import { it, expect } from 'vitest';
import { electricalEnglishDecks } from './electrical-english.bank';
import { certificationSubject } from './certification-policy';
it('three 20-item units, 60 distinct questions with 4 options', () => {
  expect(electricalEnglishDecks).toHaveLength(4);
  const all = electricalEnglishDecks.slice(0,3).flatMap(d => d.questions);
  expect(new Set(all.map(q => q.q)).size).toBe(60);
  for (const q of all) { expect(new Set(q.options).size).toBe(4); expect(q.why.length).toBeGreaterThan(30); }
});
it('Ohm and power keys are correct', () => {
  const all = electricalEnglishDecks.flatMap(d => d.questions);
  const ohm = all.find(q => q.q.includes('R = 4 Ω'))!; expect(ohm.options[ohm.answer]).toBe(`${12 / 4} A`);
  const p = all.find(q => q.q.includes('V = 120 V'))!; expect(p.options[p.answer]).toBe(`${120 * 5} W`);
});
it('units share one certificate subject', () => {
  for (const b of [1, 2, 3]) expect(certificationSubject(`study-electrical-b${b}-v1`, 20)).toBe('study-electrical');
});

it('mixed simulacro has all 60 and same certificate', () => {
  const mix = electricalEnglishDecks.find(d => d.id === 'study-electrical-mix-v1')!;
  expect(new Set(mix.questions.map(q => q.q)).size).toBe(60);
  expect(certificationSubject('study-electrical-mix-v1', 60)).toBe('study-electrical');
});
