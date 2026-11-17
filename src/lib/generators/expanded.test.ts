import {expect,it} from 'vitest';
import {buildGeneratedDeck} from '../generated.bank';
it('expanded families yield 20 distinct stems with four canonical choices',()=>{
 for(const key of ['frvar','ptvar','esvar','segvar','redvar','ipvar','ipvvar'])for(const seed of [41,42]){
  const d=buildGeneratedDeck(key,false,seed);expect(d?.questions).toHaveLength(20);
  expect(new Set(d?.questions.map(q=>q.q)).size).toBe(20);
  for(const q of d?.questions??[]){expect(new Set(q.options).size).toBe(4);expect(q.answer).toBeGreaterThanOrEqual(0);expect(q.answer).toBeLessThan(4);}
 }
});
it('IPv6 subdivision keys follow exponent difference, not IPv4 host subtraction',()=>{
 const d=buildGeneratedDeck('ipvvar',true,42);const qs=d?.questions.filter(q=>q.q.startsWith('¿Cuántos prefijos'))??[];expect(qs.length).toBeGreaterThan(0);
 for(const q of qs){const m=q.q.match(/\/(\d+).*\/(\d+)/);if(!m)throw new Error('Missing prefixes');expect(q.options[q.answer]).toBe(String(2**(Number(m[1])-Number(m[2]))));}
});