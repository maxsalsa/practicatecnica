import { expect,it } from 'vitest';
import { curriculumCoverage } from './curriculum-coverage';
it('all mapped banks exist in the public metadata catalog',()=>expect(curriculumCoverage.flatMap(row=>row.missingIds)).toEqual([]));
it('keeps expanded first-grade mathematics separate from Spanish',()=>{
 const rows=curriculumCoverage.filter(r=>r.modality==='Primaria'&&r.level==='1.º grado');
 expect(rows.find(r=>r.subject==='Matemática')?.questions).toBe(180);expect(rows.find(r=>r.subject==='Español')?.questions).toBe(20);
 expect(rows.find(r=>r.subject==='Ciencias')?.questions).toBe(0);
});
it('counts only exact 20-question practices and 60-question exams',()=>{
 const spanish=curriculumCoverage.find(r=>r.modality==='Primaria'&&r.level==='1.º grado'&&r.subject==='Español');
 expect(spanish?.practice20Count).toBe(1);
 expect(spanish?.exam60Count).toBe(0);
 expect(spanish?.pendingTypes).toContain('Simulacro de 60');
});
it('does not count a general shared bank as a grade-specific assessment',()=>{
 const spanish=curriculumCoverage.find(r=>r.modality==='Secundaria académica'&&r.level==='7.º'&&r.subject==='Español');
 expect(spanish?.practice20Count).toBe(0);
 expect(spanish?.exam60Count).toBe(0);
});
it('includes twelfth-grade ETP and all three technical families',()=>{
 const levels=new Set(curriculumCoverage.filter(r=>r.modality==='Técnica CTP').map(r=>r.level));
 for(const level of ['12.º CTP (sección técnica)','Agropecuaria (1000)','Industrial (2000)','Comercial y servicios (3000)']) expect(levels.has(level)).toBe(true);
});