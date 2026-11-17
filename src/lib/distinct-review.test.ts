import { describe, expect, it } from 'vitest';
import { buildDistinctReview, buildGeneratedDeck, resolveGeneratedDeck } from './generated.bank';
import { GENERATED_FAMILIES } from './generated-catalog';
import { normalizedStem, numericStructure } from './question-variety-audit';
import { isBriefPractice } from './assessment-size';

describe('distinct versioned reviews', () => {
  for (const family of GENERATED_FAMILIES) {
    it(`${family.key} has no duplicate stems or numeric structures`, () => {
      for (const seed of [1, 42, 99]) {
        const deck = buildDistinctReview(family.key, seed);
        expect(deck).not.toBeNull();
        if (!deck) return;
        expect(new Set(deck.questions.map(q => normalizedStem(q.q))).size).toBe(deck.questions.length);
        expect(new Set(deck.questions.map(q => numericStructure(q.q))).size).toBe(deck.questions.length);
        expect(resolveGeneratedDeck(deck.id)).toEqual(deck);
        expect(isBriefPractice(deck.id)).toBe(true);
      }
    });
  }
  it('French retains eight distinct templates instead of padding to twenty', () => {
    expect(buildDistinctReview('frvar', 42)?.questions).toHaveLength(8);
  });
  it('Portuguese retains eight distinct templates instead of padding to twenty', () => {
    expect(buildDistinctReview('ptvar', 42)?.questions).toHaveLength(8);
  });
  it('IPv6 retains only one outside-prefix calculation', () => {
    expect(buildDistinctReview('ipvvar', 42)?.questions.filter(q => q.q.includes('fuera del prefijo'))).toHaveLength(1);
  });
  it('security excludes the unrelated inventory subtraction', () => {
    expect(buildDistinctReview('segvar', 42)?.questions.some(q => q.q.startsWith('Un inventario'))).toBe(false);
  });
  it('legacy seeded form resolution is unchanged', () => {
    expect(resolveGeneratedDeck('gen-frvar-s42')).toEqual(buildGeneratedDeck('frvar', false, 42));
  });
});