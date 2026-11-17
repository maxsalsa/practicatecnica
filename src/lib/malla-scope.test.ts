import { expect, it } from 'vitest';
import { deckScopeNotice, malla } from './malla';
it('identifies primary mixed banks rather than treating them as subject-specific',()=>expect(deckScopeNotice('prim1')).toBeDefined());
it('identifies shared institutional banks',()=>expect(deckScopeNotice('admision')).toBeDefined());
it('does not label a dedicated Excel bank as mixed',()=>expect(deckScopeNotice('excel-fundamentos')).toBeUndefined());
it('never places mixed primary questions under a specific subject',()=>{for(const level of malla.find(m=>m.id==='primaria')?.niveles??[])for(const subject of level.materias)if(subject.name!=='Repaso mixto del grado')expect(subject.decks.some(id=>/^prim\d$/.test(id))).toBe(false)});