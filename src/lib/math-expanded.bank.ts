import type {Deck,Q} from './questions';
import {mathFirstGradeDeck} from './math-first-grade.bank';
const extra:Q[]=[];
const objects=['semillas','fichas','lápices','cuentas','libros','tazas','piedras','hojas'];
for(let i=0;i<20;i++){
 const a=2+i%7,b=1+Math.floor(i/7),total=a+b,object=objects[i%objects.length]??'fichas';
 extra.push({q:`En la mesa ${i+1} hay ${a} ${object}. Se agregan ${b}. ¿Cuántas hay ahora?`,options:[String(total),String(total+1),String(a-b),String(total+2)],answer:0,why:`Empiece en ${a} y avance ${b} unidades: ${a} + ${b} = ${total}. Restar confunde agregar con quitar; las otras opciones cuentan unidades adicionales.`,source:mathFirstGradeDeck.questions[0]?.source??'',difficulty:1});
 const start=6+i%9,remove=1+Math.floor(i/9),remaining=start-remove;
 extra.push({q:`La caja ${i+1} tiene ${start} ${object}. Se retiran ${remove}. ¿Cuántas quedan?`,options:[String(start+remove),String(remaining),String(remaining+1),String(remaining-1)],answer:1,why:`Separe ${remove} de ${start}: ${start} − ${remove} = ${remaining}. Sumar aumenta en lugar de retirar; las otras opciones quitan una unidad de menos o de más.`,source:mathFirstGradeDeck.questions[0]?.source??'',difficulty:1});
 const tens=1+Math.floor(i/9),units=1+i%9,value=tens*10+units;
 extra.push({q:`Un registro muestra ${tens} decena${tens===1?'':'s'} y ${units} unidad${units===1?'':'es'}. ¿Qué número representa?`,options:[String(value+1),String(value-1),String(value),String(value+10)],answer:2,why:`Cada decena contiene 10 unidades: ${tens} × 10 + ${units} = ${value}. Mantenga separadas las posiciones de decenas y unidades.`,source:mathFirstGradeDeck.questions[0]?.source??'',difficulty:1});
 const initial=1+i,step=1+i%3,next=initial+step*3;
 extra.push({q:`Continúe la serie: ${initial}, ${initial+step}, ${initial+step*2}, __.`,options:[String(next-1),String(next+1),String(next+step+1),String(next)],answer:3,why:`La cantidad aumenta ${step} cada vez. Desde ${initial+step*2}, agregue ${step} para obtener ${next}; no cambie el salto.`,source:mathFirstGradeDeck.questions[0]?.source??'',difficulty:2});
}
export const mathExpandedDeck:Deck={...mathFirstGradeDeck,id:'mep-math-01-v2',level:'1.º · 100 variantes originales; cotejo integral pendiente',questions:[...mathFirstGradeDeck.questions,...extra]};export const mathExamDeck:Deck={...mathFirstGradeDeck,id:'mep-math-01-e60',title:'Matemática · 1.º · Simulacro oficial de 60',level:'1.º · 60 preguntas originales para simulacro',questions:mathExpandedDeck.questions.slice(0,60)};
