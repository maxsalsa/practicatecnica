import { expect, it } from 'vitest';
import { importScheduleLoads } from './schedule-import';
it('imports section, subject, teacher and weekly lessons from CSV', () => {
  expect(importScheduleLoads('Sección;Materia;Docente;Lecciones\n7-1;Matemática;Ana Mora;5').loads).toEqual([{group:'7-1',subject:'Matemática',teacher:'Ana Mora',lessons:5}]);
});
it('rejects malformed rows instead of silently truncating lessons', () => {
  expect(()=>importScheduleLoads('7-1,Matemática,Ana,41')).toThrow();
});