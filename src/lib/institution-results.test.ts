import {expect,it} from 'vitest';
import {institutionResultAttempts} from './institution-results';
import {studentResults} from './student-results';
it('shows saved institutional scores by area and exact practice version without academic XP',()=>{
 const base={publication_id:'practice-a',publication_version:'v1',subject:'Francés',title:'Pasado compuesto',question_count:8};
 const rows=institutionResultAttempts([{...base,id:'1',score:25,created_at:'2026-11-16T12:00:00Z'},{...base,id:'2',score:75,created_at:'2026-11-16T13:00:00Z'}]);
 expect(studentResults(rows)[0]).toMatchObject({title:'Francés',attempts:2,points:0});
 expect(studentResults(rows)[0]?.practices[0]).toMatchObject({first:25,last:75,best:75,change:50,attempts:2,points:0});
});