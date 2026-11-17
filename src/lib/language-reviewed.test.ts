import {expect,it} from 'vitest';
import {reviewedLanguageItems,buildReviewedLanguageDeck} from './language-reviewed.bank';
import {normalizedStem,numericStructure} from './question-variety-audit';
for(const key of ['frclean','ptclean']){
 it(`${key}: eight distinct objectives, stems and structures, no numeric operations`,()=>{
  const items=reviewedLanguageItems(key);expect(items).toHaveLength(8);expect(new Set(items.map(i=>i.skill)).size).toBe(8);
  expect(new Set(items.map(i=>normalizedStem(i.question.q))).size).toBe(8);expect(new Set(items.map(i=>numericStructure(i.question.q))).size).toBe(8);
  for(const {question} of items){expect(question.q).not.toMatch(/\d|[+×÷=]/);expect(new Set(question.options).size).toBe(4);expect(question.options[question.answer]).toBeTruthy();}
 });
 it(`${key}: seeds shuffle only, never claim substituted text as new content`,()=>{
  const a=buildReviewedLanguageDeck(key,1),b=buildReviewedLanguageDeck(key,42);expect(a?.questions.map(q=>q.q).sort()).toEqual(b?.questions.map(q=>q.q).sort());
  for(const deck of [a,b])for(const q of deck?.questions??[]){const canonical=reviewedLanguageItems(key).find(i=>i.question.q===q.q)?.question;expect(q.options[q.answer]).toBe(canonical?.options[canonical.answer]);}
 });
}