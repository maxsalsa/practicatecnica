/** Conservative editorial signals, not proof of distinct concepts or complete curriculum. */
export function normalizedStem(stem:string){return stem.normalize('NFKC').toLocaleLowerCase().replace(/\s+/g,' ').trim();}
export function numericStructure(stem:string){return normalizedStem(stem).replace(/\b[0-9a-f]*\d[0-9a-f:.,]*\b/g,'{valor}');}
export function auditQuestionVariety(stems:string[]){
 const groups=(key:(s:string)=>string)=>{const seen=new Map<string,number[]>();stems.forEach((s,i)=>{const k=key(s);seen.set(k,[...(seen.get(k)??[]),i]);});return [...seen.values()].filter(ids=>ids.length>1);};
 return {total:stems.length,distinctStems:new Set(stems.map(normalizedStem)).size,exactDuplicates:groups(normalizedStem),numericStructureRepeats:groups(numericStructure)};
}