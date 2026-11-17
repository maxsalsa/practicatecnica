import {expect,it} from 'vitest';
import {distinctSkillQuestions} from './editorial-skills';
it('keeps one operation per skill and requires an explicit skill for unknown content',()=>{
 const base={options:['1','2','3','4'],answer:0};
 const result=distinctSkillQuestions([{...base,q:'Resuelva: 2 + 3 = ?'},{...base,q:'Resuelva: 5 + 6 = ?'},{...base,q:'Resuelva: 9 − 4 = ?'},{...base,q:'Pregunta sin etiqueta'}]);
 expect(result.map(q=>q.skill)).toEqual(['Suma','Resta']);
});