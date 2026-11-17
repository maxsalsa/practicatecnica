export const PRACTICE_SIZE = 20;
export const EXAM_SIZE = 60;
export function isBriefPractice(id:string){return /-(review|trivia)(?:-v\d+)?(?:~f\d+)?$/.test(id)||/^gen-[a-z]+-v2-review(?:-s\d+)?(?:~f\d+)?$/.test(id)||id.startsWith('arena-');}
export function practiceQuestionIndices(length:number,indices:number[]) {
 if(length<PRACTICE_SIZE) return [];
 return indices.slice(0,PRACTICE_SIZE);
}
export function examHasRequiredSize(length:number){return length===EXAM_SIZE;}