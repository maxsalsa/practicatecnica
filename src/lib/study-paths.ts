import { normalizeSearch } from './material-search';
export interface StudyPath { id: string; name: string; summary: string; source: string; deckId: string }
export const studyPaths: StudyPath[] = [
 { id:'tec',name:'TEC',summary:'Razonamiento matemático y verbal. Banco independiente compartido: 20 ejercicios; aún no reproduce el examen completo.',source:'https://www.tec.ac.cr/sites/default/files/media/doc/cuaderno_de_ejercicios_para_la_paa_tec-2026.pdf',deckId:'admision' },
 { id:'ucr',name:'UCR',summary:'Razonamiento en contextos verbales y matemáticos. Banco independiente compartido: 20 ejercicios; aún no reproduce el examen completo.',source:'https://www.ucr.ac.cr/estudiantes/admision.html',deckId:'admision' },
 { id:'utn',name:'UTN',summary:'La UTN no realiza examen de admisión. Refuerzo académico independiente de lectura, lógica y matemática; consulte los requisitos de ingreso.',source:'https://utn.ac.cr/admision',deckId:'admision' },
];
export function findStudyPaths(query:string) { const words=normalizeSearch(query).split(/\s+/).filter(w=>w&&!['de','la','para','universidad','admision','practica','simulacro'].includes(w));return words.length ? studyPaths.filter(p=>words.every(w=>normalizeSearch(`${p.name} ${p.summary}`).includes(w))) : []; }
