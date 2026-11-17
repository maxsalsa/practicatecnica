import {expect,it} from 'vitest';
import {assignmentResult} from './assignment-progress';
import type {Attempt} from './progress-data';
const row:Attempt={id:'1',deck_id:'study-finance-b1-v1~f15',title:'Finanzas',question_count:20,score:90,verified_scoring:true,assessment_mode:'exam',created_at:'2026-11-14T00:00:00Z'};
it('requires a verified same-bank exam after assignment',()=>{expect(assignmentResult('study-finance-b1-v1','2026-11-13T00:00:00Z',[row])?.score).toBe(90);expect(assignmentResult('study-finance-b1-v1','2026-11-15T00:00:00Z',[row])).toBeUndefined();expect(assignmentResult('study-costs-b1-v1','2026-11-13T00:00:00Z',[row])).toBeUndefined();expect(assignmentResult('study-finance-b1-v1','2026-11-13T00:00:00Z',[{...row,assessment_mode:'practice'}])).toBeUndefined()});
