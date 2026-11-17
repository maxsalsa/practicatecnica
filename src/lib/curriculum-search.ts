import { malla, deckScopeNotice } from './malla';
import { decks } from './questions';
import { normalizeSearch } from './material-search';
import { searchedGrade } from './official-programs';
export interface CurriculumHit { id:string;title:string;grade:number;questionCount:number }
export function findCurriculumBlocks(query:string):CurriculumHit[]{
 const grade=searchedGrade(query);
 if(grade===undefined)return [];
 const normalized=normalizeSearch(query);
 const subject=normalized.includes('espanol')?'Español':/matematic[ao]/.test(normalized)?'Matemática':undefined;
 if(!subject)return [];
 const ids=malla.filter(m=>m.id==='primaria'||m.id==='academica').flatMap(m=>m.niveles.filter(n=>Number.parseInt(n.name,10)===grade).flatMap(n=>n.materias.filter(s=>s.name===subject).flatMap(s=>s.decks)));
 return [...new Set(ids)].flatMap(id=>{const bank=decks.find(d=>d.id===id);return bank&&!deckScopeNotice(id)?[{id,title:bank.title,grade,questionCount:bank.questionCount??bank.questions.length}]:[]});
}