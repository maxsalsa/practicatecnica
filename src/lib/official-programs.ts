import { normalizeSearch } from './material-search';
export interface OfficialProgram { id:string; subject:string; grades:number[]; title:string; url:string; status:string }
export const officialPrograms:OfficialProgram[]=[
 {id:'matematica',subject:'Matemática',grades:[1,2,3,4,5,6,7,8,9,10,11],title:'Programas de estudio de Matemáticas · I, II, III ciclos y Diversificada',url:'https://www.mep.go.cr/sites/default/files/media/matematica.pdf',status:'Fuente oficial identificada; cotejo por grado pendiente. No acredita programa específico de 12.º CTP.'},
 {id:'espanol-i',subject:'Español',grades:[1,2,3],title:'Programa de estudio de Español · I ciclo',url:'https://ddc.mep.go.cr/dpsc/asignaturaspsc/espanol/informaciongeneral/pdfs/Programa_de_Estudio_de_Espanol_I_Ciclo.pdf',status:'Fuente oficial identificada; lectura completa y cotejo de ejercicios pendientes.'},
 {id:'espanol-ii',subject:'Español',grades:[4,5,6],title:'Programa de estudio de Español · II ciclo',url:'https://ddc.mep.go.cr/dpsc/asignaturaspsc/espanol/informaciongeneral/pdfs/Programa_de_Estudio_de_Espanol_II_Ciclo.pdf',status:'Fuente oficial identificada; lectura completa y cotejo de ejercicios pendientes.'},
 {id:'religion',subject:'Educación Religiosa',grades:[1,2,3,4,5,6,7,8,9,10,11],title:'Educación Religiosa · Programa aprobado AC-CSE-0476-67-2024',url:'https://drea.mep.go.cr/educacion-religiosa/programa-de-estudio-de-la-asignatura-educacion-religiosa-i-ii-iii-ciclos-de-la',status:'Acuerdo de aprobación identificado; contenido por grado pendiente de lectura completa.'},
 {id:'orientaciones-2026',subject:'Orientaciones curriculares',grades:[1,2,3,4,5,6],title:'Orientaciones técnico-curriculares 2026 · I y II ciclos',url:'https://ddc.mep.go.cr/cursolectivo/documentos/pdfs/PRIMERO_Y_SEGUNDO_CICLOS_ORIENTACIONES_TECNICO_CURRICULARES_06-02-2026.pdf',status:'Documento complementario: no sustituye los programas de estudio. Incluye orientaciones de Educación Física, Hogar y Artes Industriales.'},
];
const gradeNames: Record<string, number> = {primer:1,primero:1,segundo:2,tercer:3,tercero:3,cuarto:4,quinto:5,sexto:6,septimo:7,octavo:8,noveno:9,decimo:10,undecimo:11,duodecimo:12};
export function searchedGrade(query:string):number|undefined {
  const normalized=normalizeSearch(query).replace(/(\d+)\s*\.?\s*[º°]/g,'$1').replace(/\b(\d+)(?:ero|ro|do|to|mo|vo|no)\b/g,'$1');
  const words=normalized.split(/\s+/);
  for(const word of words){const grade=gradeNames[word]??(/^\d+$/.test(word)?Number(word):undefined);if(grade!==undefined&&grade>=1&&grade<=12)return grade;}
  return undefined;
}
export function findOfficialPrograms(query:string,grade?:number) {
  const queryGrade=searchedGrade(query);
  const text=normalizeSearch(query).replace(/(\d+)\s*\.?\s*[º°]/g,'$1').replace(/\b(\d+)(?:ero|ro|do|to|mo|vo|no)\b/g,'$1');
  const words=text.split(/\s+/).filter(w=>w&&!gradeNames[w]&&!/^\d+$/.test(w)&&!['programa','programas','oficial','oficiales','mep','de','la','grado','nivel'].includes(w));
  return officialPrograms.filter(p=>(grade===undefined||p.grades.includes(grade))&&(queryGrade===undefined||p.grades.includes(queryGrade))&&words.every(w=>normalizeSearch(`${p.title} ${p.subject}`).includes(w)));
}
