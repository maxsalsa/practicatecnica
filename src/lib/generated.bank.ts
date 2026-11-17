import type { Deck, Q } from './questions';
import { GENERATED_FAMILIES } from './generated-catalog';
import { type Generator, type Level, rng, shuffle, toQuestion } from './generators/core';
import { primaryMath, secondaryMath } from './generators/math';
import { finance, networks } from './generators/applied';
import { biology, chemistry, electricity, physics } from './generators/science';
import { spanish } from './generators/spanish';
import { english, french, portuguese, ipv6, cybersecurity } from './generators/languages';
import {frenchExpanded,portugueseExpanded,spanishExpanded,securityExpanded,networkExpanded,ipv6Expanded} from './generators/expanded';
import { normalizedStem, numericStructure } from './question-variety-audit';
import {buildReviewedLanguageDeck} from './language-reviewed.bank';

const GENERATORS: Record<string, Generator[]> = { mateprim: primaryMath, matesec: secondaryMath, espanol: spanish, fisica: physics, quimica: chemistry, biologia: biology, finanzas: finance, redes: networks, electricidad: electricity, ingles: english, frances: french, portugues: portuguese, ipvseis: ipv6, ciberseguridad: cybersecurity };
Object.assign(GENERATORS,{frvar:[...french,...frenchExpanded],ptvar:[...portuguese,...portugueseExpanded],esvar:[...spanish,...spanishExpanded],segvar:[...cybersecurity,...securityExpanded],redvar:networkExpanded,ipvar:networks,ipvvar:[...ipv6,...ipv6Expanded]});
Object.assign(GENERATORS,{frclean:[],ptclean:[]});
const ID = /^gen-([a-z]+)(-60)?(-v2-review)?(?:-s(\d{1,10}))?$/;

export function parseGeneratedId(id: string) {
  const m = ID.exec(id);
  if (!m || !m[1] || !GENERATORS[m[1]]) return null;
  if (m[2] && m[3]) return null;
  if (['frclean','ptclean'].includes(m[1])&&!m[3]) return null;
  const seed = m[4] === undefined ? null : Number(m[4]);
  if (seed !== null && (!Number.isSafeInteger(seed) || seed > 0xffffffff)) return null;
  return { key: m[1], exam: !!m[2], review: !!m[3], seed };
}
const levelFor = (i: number, n: number): Level => (i < n * 0.35 ? 1 : i < n * 0.75 ? 2 : 3);

/** Deterministic deck: same id and seed always rebuild identical items, keys and option order. */
export function buildGeneratedDeck(key: string, exam: boolean, seed: number): Deck | null {
  const gens = GENERATORS[key]; const family = GENERATED_FAMILIES.find(f => f.key === key);
  if (!gens || !family) return null;
  const r = rng(seed ^ 0x9e3779b9);
  const n = exam ? 60 : 20;
  const order = shuffle(r, gens);
  const seen = new Set<string>(); const questions: Q[] = [];
  for (let i = 0, tries = 0; questions.length < n && tries < n * 40; tries++) {
    const level = levelFor(questions.length, n);
    const gen = order[(i++) % order.length];
    if (!gen) break;
    const q = toQuestion(r, gen(r, level), level, `pracTICAtecnica.com · ítem paramétrico ${family.area} · forma ${seed}`);
    if (!q || seen.has(q.q)) continue;
    seen.add(q.q); questions.push(q);
  }
  if (questions.length < n) return null;
  return { id: `gen-${key}${exam ? '-60' : ''}-s${seed}`, title: `${family.title}${exam ? ' · simulacro de 60' : ''}`, emoji: family.emoji, level: family.level, questions };
}
export function resolveGeneratedDeck(id: string, allowNewSeed = false): Deck | null {
  const p = parseGeneratedId(id);
  if (!p) return null;
  if (p.seed === null && !allowNewSeed) return null;
  const seed = p.seed ?? crypto.getRandomValues(new Uint32Array(1))[0] ?? 0;
  return p.review ? buildDistinctReview(p.key, seed) : buildGeneratedDeck(p.key, p.exam, seed);
}

/** New forms only: keep legacy seeded scoring unchanged. One item per curated template, no padding. */
export function buildDistinctReview(key: string, seed: number): Deck | null {
  if (key==='frclean'||key==='ptclean') return buildReviewedLanguageDeck(key,seed);
  const family = GENERATED_FAMILIES.find(f => f.key === key);
  const generators = GENERATORS[key];
  if (!family || !generators) return null;
  // Repeated prefix-bit operation and arithmetic-only security inventory are not new subject concepts.
  const excluded: Record<string, number[]> = { ipvvar: [1], segvar: [3], esvar: [1], espanol: [1] };
  const r = rng(seed ^ 0x47a31d09);
  const stems = new Set<string>(), structures = new Set<string>();
  const questions: Q[] = [];
  for (const { gen, index } of shuffle(r, generators.map((gen, index) => ({ gen, index })))) {
    if (excluded[key]?.includes(index)) continue;
    for (let tries = 0; tries < 40; tries++) {
      const level = (1 + index % 3) as Level;
      const question = toQuestion(r, gen(r, level), level, `pracTICAtecnica.com · repaso diverso v2 · ${family.area}`);
      if (!question) continue;
      const stem = normalizedStem(question.q), structure = numericStructure(question.q);
      if (stems.has(stem) || structures.has(structure)) continue;
      stems.add(stem); structures.add(structure); questions.push(question); break;
    }
  }
  if (!questions.length) return null;
  return { id: `gen-${key}-v2-review-s${seed}`, title: `${family.title} · repaso diverso`, emoji: family.emoji, level: family.level, questions };
}
