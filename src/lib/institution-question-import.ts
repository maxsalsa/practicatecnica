import {importQuestions} from './question-import';
import {institutionQuestion} from './institution-publication';
export function importInstitutionQuestions(text:string){
 const rows=importQuestions(text);if(rows.length>60)throw new Error('Cada práctica institucional admite hasta 60 preguntas.');
 return rows.map((row,i)=>{const parsed=institutionQuestion.safeParse({...row,why:''});if(!parsed.success)throw new Error(`Pregunta ${i+1}: enunciado hasta 1000 caracteres y opciones hasta 500.`);return parsed.data;});
}