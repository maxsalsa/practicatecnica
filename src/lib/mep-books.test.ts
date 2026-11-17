import { describe, expect, it } from 'vitest';
import { exampleResult, mepBooks, mepPdfUrl } from './mep-books';

describe('MEP source-backed books', () => {
  for (const book of mepBooks) {
    it(`keeps ${book.title} at its referenced grade with downloads`, () => {
      expect(book.grade).toBe(book.id.endsWith('-12') ? 12 : 10);
      expect(new URL(book.source).hostname).toMatch(/(^|\.)mep\.go\.cr$/);
      expect(mepPdfUrl(`${book.id}-compendio`)).toMatch(/^\/__l5e\/assets-v1\//);
      for (const chapter of book.chapters) expect(mepPdfUrl(`${book.id}-${chapter.id}`)).toMatch(/^\/__l5e\/assets-v1\//);
    });
    for (const chapter of book.chapters) {
      it(`recomputes the worked example ${book.id}/${chapter.id}`, () => {
        expect(exampleResult(chapter.check.kind, chapter.check.inputs)).toBeCloseTo(chapter.check.result, 8);
      });
    }
  }
  it('does not divide by a zero comparison base or liability', () => {
    expect(exampleResult('change', [0, 100])).toBeUndefined();
    expect(exampleResult('ratio', [100, 0])).toBeUndefined();
    expect(exampleResult('breakeven', [100, 20, 20])).toBeUndefined();
  });
  it('recomputes the three cybersecurity practice answers', () => {
    expect(exampleResult('subtract', [9, 3])).toBe(6);
    expect(exampleResult('subtract', [11, 9])).toBe(2);
    expect(exampleResult('ratio', [8, 40])).toBe(0.2);
  });
});