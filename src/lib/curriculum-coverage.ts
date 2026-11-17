import { malla, deckScopeNotice } from './malla';
import { decks } from './questions';
import { bookTopics } from './book-topics';
export interface CoverageRow { modality:string;level:string;subject:string;blocks:number;questions:number;shared:boolean;pdf?:string|undefined;missingIds:string[];topicId?:string|undefined;examDeckIds:string[];chapterCount:number;downloadCount:number;practice20Count:number;exam60Count:number;pendingTypes:string[] }
export const curriculumCoverage:CoverageRow[]=malla.flatMap(mod=>mod.niveles.flatMap(level=>level.materias.map(subject=>{
  const banks=subject.decks.flatMap(id=>{const deck=decks.find(d=>d.id===id);return deck?[deck]:[]});
  const topic = ['primaria','academica'].includes(mod.id) ? bookTopics.find(t=>t.grade===Number.parseInt(level.name,10)&&t.subject===subject.name) : undefined;
  const specificBanks=banks.filter(d=>!deckScopeNotice(d.id));
  const chapterCount=topic?1:0;
  const downloadCount=subject.pdf?1:0;
  const practice20Count=specificBanks.filter(d=>(d.questionCount??d.questions.length)===20).length;
  const exam60Count=specificBanks.filter(d=>(d.questionCount??d.questions.length)===60).length;
  const pendingTypes=[...(!chapterCount?['Capítulo específico']:[]),...(!downloadCount?['Descarga específica']:[]),...(!practice20Count?['Práctica de 20']:[]),...(!exam60Count?['Simulacro de 60']:[])];
  return {modality:mod.name,level:level.name,subject:subject.name,blocks:banks.length,questions:banks.reduce((n,d)=>n+(d.questionCount??d.questions.length),0),shared:subject.decks.some(id=>!!deckScopeNotice(id)),pdf:subject.pdf,missingIds:subject.decks.filter(id=>!decks.some(d=>d.id===id)),topicId:topic?.id,examDeckIds:specificBanks.map(d=>d.id),chapterCount,downloadCount,practice20Count,exam60Count,pendingTypes};
})));