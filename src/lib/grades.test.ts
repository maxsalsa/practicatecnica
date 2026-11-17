import { it, expect } from 'vitest';
import { gradeAverages } from './grades';
it('nota ponderada por rubro: promedio del rubro × porcentaje', () => {
  const [m] = gradeAverages([
    { subject: 'Mate', kind: 'tarea', score: 80, weight: 40 }, { subject: 'Mate', kind: 'tarea', score: 100, weight: 40 },
    { subject: 'Mate', kind: 'examen', score: 70, weight: 60 },
  ]).bySubject;
  expect(m!.grade).toBe(78); // 90×0,4 + 70×0,6
  expect(m!.complete).toBe(true);
});
it('marca incompleta si los porcentajes no suman 100', () => {
  const [m] = gradeAverages([{ subject: 'Español', kind: 'proyecto', score: 90, weight: 30 }]).bySubject;
  expect(m!.grade).toBe(27); expect(m!.complete).toBe(false);
});
it('recalculates seventh-grade mathematics using REAC, ignoring legacy weights', () => {
  const result = gradeAverages([
    {subject:'Matemática',level:'7.º',kind:'cotidiano',score:100,weight:30},
    {subject:'Matemática',level:'7.º',kind:'tarea',score:80,weight:40},
    {subject:'Matemática',level:'7.º',kind:'examen',score:70,weight:30},
    {subject:'Matemática',level:'7.º',kind:'asistencia',score:100,weight:0},
  ]).bySubject[0];
  expect(result?.grade).toBe(86);
  expect(result?.complete).toBe(true);
});
it('existing plural-name student grades recalculate to 81 partial points without inventing attendance',()=>{
  const result=gradeAverages([
    {subject:'Matemáticas',level:'7.º',kind:'cotidiano',score:100,weight:30},
    {subject:'Matemáticas',level:'7.º',kind:'tarea',score:80,weight:40},
    {subject:'Matemáticas',level:'7.º',kind:'examen',score:70,weight:30},
  ]).bySubject[0];
  expect(result?.grade).toBe(81);
  expect(result?.totalWeight).toBe(95);
  expect(result?.complete).toBe(false);
});
