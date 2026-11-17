import { expect, it } from 'vitest';
import { mathFirstGradeDeck } from './math-first-grade.bank';
it('contains twenty original four-option questions for first grade',()=>{
 expect(mathFirstGradeDeck.questions).toHaveLength(20);
 for(const q of mathFirstGradeDeck.questions){expect(q.options).toHaveLength(4);expect(new Set(q.options).size).toBe(4);expect(q.answer).toBeGreaterThanOrEqual(0);expect(q.answer).toBeLessThan(4);}
});
it('scores the concrete addition and sequential subtraction correctly',()=>{
 const first=mathFirstGradeDeck.questions[0];const last=mathFirstGradeDeck.questions[19];
 expect(first?.options[first.answer]).toBe(String(3+2));expect(last?.options[last.answer]).toBe(String(9-4-2));
});