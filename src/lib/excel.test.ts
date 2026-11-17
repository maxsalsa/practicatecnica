import { expect, it } from 'vitest';
import { excelDeck } from './excel.bank';
it('validates the sum and multiplication scenarios',()=>{
 expect(excelDeck.questions[0]?.options[excelDeck.questions[0].answer]).toBe(String(12+8+5));
 expect(excelDeck.questions[4]?.options[excelDeck.questions[4].answer]).toBe('=B2*C2');
 expect(400*3).toBe(1200);
});
