import {expect,it} from 'vitest';
import {studentResults} from './student-results';
import type {Attempt} from './progress-data';
const row=(id:string,deck:string,score:number,verified=true):Attempt=>({id,deck_id:deck,title:deck,score,verified_scoring:verified,question_count:8,created_at:`2026-11-${id}T12:00:00Z`,earned_points:20});
it('groups French seeds under the same practice and excludes self-reported scores',()=>{
 const result=studentResults([row('01','gen-frclean-v2-review-s1',25),row('02','gen-frclean-v2-review-s2',75),row('03','gen-frclean-v2-review-s3',100,false),row('04','gen-ptclean-v2-review-s1',50)]);
 expect(result).toHaveLength(2);expect(result[0]?.title).toBe('Francés');expect(result[0]?.practices).toHaveLength(1);expect(result[0]?.practices[0]).toMatchObject({attempts:2,first:25,last:75,best:75,change:50,points:40});
});