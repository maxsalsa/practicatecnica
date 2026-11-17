import { officialPrograms } from './official-programs';
export interface MaterialSource { title: string; url: string; detail: string }
export function sourcesForMaterial(subject: string, grade: number): MaterialSource[] {
  const programs = officialPrograms.filter(p => p.subject === subject && p.grades.includes(grade));
  return programs.length ? programs.map(p => ({ title: `Ministerio de Educación Pública. ${p.title}.`, url: p.url, detail: p.status })) : [{
    title: 'Ministerio de Educación Pública. Catálogo de programas de estudio.',
    url: 'https://www.mep.go.cr/programas-de-estudio',
    detail: 'Referencia general: el documento específico de esta materia y grado todavía requiere identificación y cotejo. No acredita validación de estos ejercicios.',
  }];
}