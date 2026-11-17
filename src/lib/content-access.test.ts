import {expect,it} from 'vitest';
import {requireContentAccess} from './content-access';
import {decks} from './questions';
it('rejects expired or unpaid access',()=>expect(()=>requireContentAccess([{has_access:false}],false)).toThrow());
it('fails closed when the access lookup fails',()=>expect(()=>requireContentAccess([{has_access:true}],true)).toThrow());
it('rejects absent access',()=>expect(()=>requireContentAccess(null,false)).toThrow());
it('accepts verified current access',()=>expect(()=>requireContentAccess([{has_access:true}],false)).not.toThrow());
it('ships no question bodies in the public deck catalog',()=>{expect(decks.length).toBeGreaterThan(0);expect(decks.flatMap(d=>d.questions)).toEqual([]);expect(decks.every(d=>(d.questionCount??0)>0)).toBe(true);});