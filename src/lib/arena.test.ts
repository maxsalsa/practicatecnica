import { expect,it } from 'vitest';
import { answerArena,advanceArena,newArena } from './arena';
import { arenaDecks } from './arena.bank';
it('local mode alternates two players before showing feedback',()=>{const a=answerArena(newArena(),1,1,'local');expect(a.player).toBe(1);expect(a.stage).toBe('answer');expect(a.scores).toEqual([0,0]);const b=answerArena(a,0,1,'local');expect(b.stage).toBe('review');expect(b.scores).toEqual([10,0])});
it('PC uses a predictable rival without remote AI calls',()=>{const state=answerArena(newArena(),0,0,'pc');expect(state.scores).toEqual([10,10]);expect(state.stage).toBe('review')});
it('ends exactly after five rounds and prevents duplicate answers',()=>{let s=newArena();for(let n=0;n<5;n++){s=answerArena(s,0,0,'pc');expect(answerArena(s,0,0,'pc')).toBe(s);s=advanceArena(s,5)}expect(s.stage).toBe('done');expect(s.scores[0]).toBe(50)});
it('covers eighteen families with five four-option short challenges',()=>{expect(arenaDecks).toHaveLength(18);for(const d of arenaDecks){expect(d.questions).toHaveLength(5);for(const q of d.questions){expect(q.options).toHaveLength(4);expect(new Set(q.options).size).toBe(4)}}});