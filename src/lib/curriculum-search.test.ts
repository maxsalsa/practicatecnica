import { expect,it } from 'vitest';
import { findCurriculumBlocks } from './curriculum-search';
it('finds only the original first-grade Spanish block',()=>expect(findCurriculumBlocks('español primer grado').map(b=>b.id)).toEqual(['mep-spanish-01-v1']));
it('never substitutes a mixed bank when a second-grade subject bank is absent',()=>expect(findCurriculumBlocks('español segundo grado')).toEqual([]));
it('finds the expanded mathematics block while preserving the original',()=>expect(findCurriculumBlocks('matemática 1ero').map(b=>b.id)).toEqual(['mep-math-01-e60','mep-math-01-v2','mep-math-01-v1']));