import {expect,it} from 'vitest';
import {networkDecks} from './networks.bank';
import {certificationSubject} from './certification-policy';
it('Redes has four units and exactly 60 distinct mixed exercises',()=>{
 expect(networkDecks.slice(0,4).map(d=>d.questions.length)).toEqual([20,20,20,20]);
 const mix=networkDecks.find(d=>d.id==='study-network-mix-v1');
 expect(mix?.questions.length).toBe(60);
 expect(new Set(mix?.questions.map(q=>q.q)).size).toBe(60);
 // Practices of 20 keep the original 15 canonical items first, so earlier attempts still score against the same keys.
 networkDecks.slice(0,4).forEach((d,i)=>expect(d.questions.slice(0,15)).toEqual(mix?.questions.slice(i*15,i*15+15)));
});
it('the 60-question mixed exam shares the Redes certification subject',()=>{expect(certificationSubject('study-network-mix-v1',60)).toBe('study-network');});
it('28 computers need /27, not /28',()=>{
 const q=networkDecks[2]?.questions.find(q=>q.q.includes('28 equipos'));
 expect(q?.options[q.answer]).toBe('/27');
});
it('compressed IPv6 preserves group position and all choices have valid keys',()=>{
 const q=networkDecks[1]?.questions[0];expect(q?.options[q.answer]).toBe('2001:db8:10::20');
 for(const d of networkDecks) for(const q of d.questions){expect(q.answer).toBeGreaterThanOrEqual(0);expect(q.answer).toBeLessThan(q.options.length);expect(new Set(q.options).size).toBe(4);}
});