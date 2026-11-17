import {splitQuestionForm} from './question-forms';
export function certificationSubject(deckId: string, count: number): string | undefined {
 const id=splitQuestionForm(deckId).baseId;
 if (count < 20 || /^(arena-|language-|ia-|prim\d|topic)/.test(id)) return undefined;
 const gen=/^gen-([a-z]+)-60-s\d+$/.exec(id);
 if(gen?.[1]) return count>=60?`gen-${gen[1]}`:undefined;
 const study=/^study-(english|math|security|support|physics|sports|social|web|architecture|accounting|science|finance|banking|costs|electrical|network)-(?:b[1-4]|mix)-v1$/.exec(id);
 if(study?.[1]) return `study-${study[1]}`;
 if (id.startsWith('mep-math-')) return id;
 if (id.startsWith('mep-spanish-')) return id;
 if (/^(ctp(?:-|$)|mopt(?:-|$))/.test(id)) return id;
 if (['admision','civica','historia','espanol','religion'].includes(id)) return id;
 return undefined;
}
export const CERTIFICATE_MIN_SCORE = 60;
export function eligibleScores(scores: number[]) {return scores.some(score => score >= CERTIFICATE_MIN_SCORE);}