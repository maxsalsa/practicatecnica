import { it, expect } from 'vitest';
import { curriculumCoverage } from './curriculum-coverage';
it('links only exact published first-grade math exams and does not promote mixed banks',()=>{
 const first=curriculumCoverage.find(r=>r.level==='1.º grado'&&r.subject==='Matemática');
 expect(first?.topicId).toBe('book-v1-1-matematica');
 expect(first?.examDeckIds).toEqual(['mep-math-01-e60','mep-math-01-v2','mep-math-01-v1']);
 expect(curriculumCoverage.find(r=>r.level==='2.º grado'&&r.subject==='Matemática')?.examDeckIds).toEqual([]);
 expect(curriculumCoverage.find(r=>r.level==='1.º grado'&&r.subject==='Repaso mixto del grado')?.examDeckIds).toEqual([]);
});