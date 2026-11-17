import catalog from './topic-catalog.json';
import { schoolSubjects } from './school-practice';
import type { Deck } from './questions';
export type Language = 'es' | 'en';
export type PracticeMode = 'practice' | 'review' | 'trivia';
export const practiceTopics = catalog;
export function gradeNumber(level: string) { return parseInt(level,10); }
export function topicsFor(subject: string, level: string) { return catalog.filter(t => t.subject===subject && t.minGrade<=gradeNumber(level)); }
export function localText(pair: string[], lang: Language) { return pair[lang==='es'?0:1] ?? ''; }
export const numericTopicIds = ['fracciones','ecuaciones','probabilidad','rapidez','fuerza','energia','densidad','atomos','disoluciones'];
export function topicDeck(topicId:string, level:string, lang:Language, mode:PracticeMode='practice', version:1|2=2, variant=0):Deck {
 const t=catalog.find(t=>t.id===topicId); if (!t) throw new Error('Tema no disponible.');
 return {id:`${version===2?'topic-v2':'topic'}-${topicId}-${gradeNumber(level)}-${mode}${variant?`-v${variant}`:''}`,title:localText(t.title,lang),level,emoji:schoolSubjects.find(s=>s.id===t.subject)?.emoji??'📚',questions:[],progressive:version===2};
}
export const librarySources = [{title:'OpenStax · REA',url:'https://openstax.org/subjects'},{title:'MEP · Programas de estudio',url:'https://www.mep.go.cr/programas-estudio'}];