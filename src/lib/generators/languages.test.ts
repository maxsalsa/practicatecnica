import { expect, it } from 'vitest';
import { buildGeneratedDeck } from '../generated.bank';
it('English uses to be, past, continuous, future and did with canonical keys',()=>{
 const d=buildGeneratedDeck('ingles',true,42);expect(d).not.toBeNull();
 const qs=d?.questions??[];
 expect(qs.some(q=>q.q.includes('Yesterday'))).toBe(true);
 expect(qs.some(q=>q.q.includes('Right now'))).toBe(true);
 expect(qs.some(q=>q.q.includes('Tomorrow'))).toBe(true);
 expect(qs.some(q=>q.q.startsWith('Did '))).toBe(true);
 for(const q of qs.filter(q=>q.q.startsWith('Did ')))expect(q.options[q.answer]).not.toMatch(/ed$|ing$/);
});
it('fresh seeds change substantive language and technical questions',()=>{
 for(const key of ['ingles','frances','portugues','ipvseis','ciberseguridad']){
  const a=buildGeneratedDeck(key,false,41),b=buildGeneratedDeck(key,false,42);
  expect(a?.questions).toHaveLength(20);expect(b?.questions).toHaveLength(20);
  expect(a?.questions.map(q=>q.q)).not.toEqual(b?.questions.map(q=>q.q));
 }
});