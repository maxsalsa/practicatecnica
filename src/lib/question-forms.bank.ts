import type {Deck,Q} from './questions';
import {optionPermutation,questionFormId} from './question-forms';
function numericFirstGrade(q:Q,index:number,form:number):Q {
 if(index<20)return q;
 const family=(index-20)%4;const row=Math.floor((index-20)/4);const source=q.source;
 const objects=['semillas','fichas','lápices','libros','hojas'];const object=objects[(row+form)%objects.length]??'fichas';
 const a=2+(row+form)%15,b=1+(row+form)%5;
 let text='',value=0,why='';
 if(family===0){value=a+b;text=`Hay ${a} ${object}. Se agregan ${b}. ¿Cuántas hay ahora?`;why=`Agregar aumenta la cantidad: ${a} + ${b} = ${value}.`;}
 else if(family===1){const start=a+b;value=a;text=`Una caja tiene ${start} ${object}. Se retiran ${b}. ¿Cuántas quedan?`;why=`Retirar disminuye la cantidad: ${start} − ${b} = ${value}.`;}
 else if(family===2){const tens=1+(row+form)%3,units=(row+form)%10;value=tens*10+units;text=`Un registro tiene ${tens} decenas y ${units} unidades. ¿Qué número representa?`;why=`Cada decena contiene diez: ${tens} × 10 + ${units} = ${value}.`;}
 else {const start=1+(row+form)%10,step=1+(row+form)%4;value=start+3*step;text=`Continúe: ${start}, ${start+step}, ${start+2*step}, __.`;why=`El salto es ${step}: ${start+2*step} + ${step} = ${value}.`;}
 return {...q,q:text,options:[String(value),String(value+1),String(value+2),String(value+3)],answer:0,why,source};
}
export function applyQuestionForm(deck:Deck,form:number):Deck {const permutation=optionPermutation(form);return {...deck,id:questionFormId(deck.id,form),questions:deck.questions.map((original,index)=>{const q=deck.id==='mep-math-01-v2'?numericFirstGrade(original,index,form):original;if(q.options.length!==4)return {...q,options:[...q.options]};const rotated=permutation.map(k=>(k+index)%4);return {...q,options:rotated.map(k=>q.options[k]??''),answer:rotated.indexOf(q.answer)};})};}