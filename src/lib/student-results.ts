import type {Attempt} from './progress-data';
import {subjectOf,bandOf} from './family-progress';
import {GENERATED_FAMILIES} from './generated-catalog';
import {splitQuestionForm} from './question-forms';
export function studentResults(rows:Attempt[]){
 const areas=new Map<string,{title:string;practices:Map<string,{title:string;first:number;last:number;best:number;attempts:number;points:number;lastAt:string}>}>();
 for(const r of [...rows].filter(r=>r.verified_scoring&&r.question_count>0).sort((a,b)=>a.created_at.localeCompare(b.created_at))){
  const family=GENERATED_FAMILIES.find(f=>r.deck_id.startsWith(`gen-${f.key}-`));const subject=subjectOf(r);
  const title=r.institution_subject??(family?(family.key.startsWith('fr')?'Francés':family.key.startsWith('pt')||family.key==='portugues'?'Portugués':family.title):subject.title);
  const key=splitQuestionForm(r.deck_id).baseId.replace(/-s\d+$/,'').replace(/-60$/,'');
  const area=areas.get(title)??{title,practices:new Map()};const practice=area.practices.get(key)??{title:r.title,first:r.score,last:r.score,best:0,attempts:0,points:0,lastAt:r.created_at};
  practice.last=r.score;practice.best=Math.max(practice.best,r.score);practice.attempts++;practice.points+=r.earned_points??0;practice.lastAt=r.created_at;area.practices.set(key,practice);areas.set(title,area);
 }
 return [...areas.values()].map(area=>{const practices=[...area.practices.entries()].map(([key,p])=>({...p,key,change:p.last-p.first,band:bandOf(p.last)}));return {title:area.title,practices,attempts:practices.reduce((n,p)=>n+p.attempts,0),points:practices.reduce((n,p)=>n+p.points,0)};});
}