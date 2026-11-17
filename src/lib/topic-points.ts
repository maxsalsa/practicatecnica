import type {Attempt} from './progress-data';
import {splitQuestionForm} from './question-forms';
export function topicPoints(rows:Attempt[]){
 const out:Record<string,{title:string;points:number;attempts:number;best:number}>={};
 for(const row of rows){
  if(!row.verified_scoring)continue;
  const key=splitQuestionForm(row.deck_id).baseId.replace(/^(gen-[a-z]+)(?:-60)?-s\d+$/,'$1');
  const s=out[key]??{title:row.title.replace(/ · simulacro de 60$/,''),points:0,attempts:0,best:0};
  s.points+=row.earned_points??0;s.attempts++;s.best=Math.max(s.best,row.score);out[key]=s;
 }
 return out;
}