import { expect, it } from 'vitest';
import { variedIndices } from './practice-variety';
it('uses 20 unseen questions before recycling the previous 20', () => {
 const seen=Array.from({length:20},(_,i)=>i);
 const next=variedIndices(60,20,seen,()=>0.5);
 expect(next).toHaveLength(20);expect(new Set(next).size).toBe(20);
 expect(next.every(i=>i>=20)).toBe(true);
});
it('exhausts remaining questions before reusing a finite bank',()=>{
 const next=variedIndices(25,20,Array.from({length:20},(_,i)=>i),()=>0.5);
 expect(next.slice(0,5).every(i=>i>=20)).toBe(true);expect(new Set(next).size).toBe(20);
});