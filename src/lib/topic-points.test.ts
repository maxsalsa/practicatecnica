import {expect,it} from 'vitest';import {topicPoints} from './topic-points';
it('sums only verified points and groups generated forms by topic',()=>{
 const base={id:'1',deck_id:'gen-ingles-s1',title:'English',score:80,question_count:20,created_at:'2026-11-16',verified_scoring:true,earned_points:100};
 expect(topicPoints([base,{...base,id:'2',deck_id:'gen-ingles-s2',earned_points:200},{...base,id:'3',verified_scoring:false,earned_points:999}])['gen-ingles']).toEqual({title:'English',points:300,attempts:2,best:80});
});