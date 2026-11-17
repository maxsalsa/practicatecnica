import type {Attempt} from './progress-data';
import {splitQuestionForm} from './question-forms';
export function assignmentResult(deckId:string,createdAt:string,attempts:Attempt[]){return attempts.filter(a=>a.verified_scoring&&a.assessment_mode==='exam'&&splitQuestionForm(a.deck_id).baseId===deckId&&a.created_at>=createdAt).sort((a,b)=>b.created_at.localeCompare(a.created_at))[0];}
