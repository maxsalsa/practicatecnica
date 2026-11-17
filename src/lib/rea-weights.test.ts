import { expect, it } from 'vitest';
import { officialGradeWeights } from './rea-weights';
it('primary mathematics uses article 40 weights',()=>expect(officialGradeWeights('Matemática','6.º')?.weights).toEqual({cotidiano:50,tarea:10,examen:35,proyecto:0,asistencia:5}));
it('third-cycle mathematics uses article 41 weights',()=>expect(officialGradeWeights('Matemática','7.º')?.weights).toEqual({cotidiano:45,tarea:10,examen:40,proyecto:0,asistencia:5}));
it('stored plural Matemáticas resolves to the same official subject',()=>expect(officialGradeWeights('Matemáticas','7.º')).toEqual(officialGradeWeights('Matemática','7.º')));
it('diversified civic education includes test and project',()=>expect(officialGradeWeights('Educación Cívica','10.º')?.weights).toEqual({cotidiano:35,tarea:10,examen:20,proyecto:30,asistencia:5}));
it('does not infer specialty modality or preschool numeric weights',()=>{expect(officialGradeWeights('Redes','10.º')).toBeNull();expect(officialGradeWeights('Matemática','preescolar')).toBeNull();});