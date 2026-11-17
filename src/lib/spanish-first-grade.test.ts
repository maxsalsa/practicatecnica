import { expect,it } from 'vitest';
import { spanishFirstGradeDeck } from './spanish-first-grade.bank';
it('has twenty original questions with four distinct options and a valid key',()=>{
 expect(spanishFirstGradeDeck.questions).toHaveLength(20);
 for(const q of spanishFirstGradeDeck.questions){expect(q.options).toHaveLength(4);expect(new Set(q.options).size).toBe(4);expect(q.answer>=0&&q.answer<4).toBe(true);}
});
it('correctly counts two syllables in mano and identifies the written fact',()=>{
 const syllables=spanishFirstGradeDeck.questions[2];const text=spanishFirstGradeDeck.questions[19];
 expect(syllables?.options[syllables.answer]).toBe('2');expect(text?.options[text.answer]).toBe('Marta abrió la ventana');
});