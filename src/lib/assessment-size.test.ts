import {expect,it} from 'vitest';
import {practiceQuestionIndices,examHasRequiredSize,isBriefPractice} from './assessment-size';
it('academic practice uses exactly 20 canonical indices',()=>{
 expect(practiceQuestionIndices(100,Array.from({length:100},(_,i)=>99-i))).toEqual(Array.from({length:20},(_,i)=>99-i));
});
it('a five-question bank cannot supply a twenty-question practice',()=>{
 expect(practiceQuestionIndices(5,[0,1,2,3,4])).toEqual([]);
});
it('an exam requires exactly sixty questions',()=>{
 expect(examHasRequiredSize(60)).toBe(true);
 for(const n of [5,20,59,61,100])expect(examHasRequiredSize(n)).toBe(false);
});
it('keeps explicitly identified reviews and trivia separate from academic practice',()=>{
 expect(isBriefPractice('topic-v2-fracciones-7-trivia~f03')).toBe(true);
 expect(isBriefPractice('topic-v2-fracciones-7-review-v2')).toBe(true);
 expect(isBriefPractice('topic-v2-fracciones-7-practice')).toBe(false);
});