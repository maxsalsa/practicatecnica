export type ImportedQuestion={q:string;options:string[];answer:number};
export function importQuestions(text:string):ImportedQuestion[]{
 let raw:unknown;try{raw=JSON.parse(text);}catch{throw new Error('El archivo debe ser JSON válido.');}
 if(!Array.isArray(raw)||raw.length<1||raw.length>1000)throw new Error('Se requieren entre 1 y 1000 preguntas.');
 const seen=new Set<string>();
 return raw.map((value:unknown,index)=>{
  if(!value||typeof value!=='object')throw new Error(`Pregunta ${index+1} inválida.`);
  const row=value as Record<string,unknown>;
  if(typeof row['q']!=='string'||!row['q'].trim()||row['q'].length>3000||!Array.isArray(row['options'])||row['options'].length!==4||row['options'].some(o=>typeof o!=='string'||!o.trim()||o.length>1000)||typeof row['answer']!=='number'||!Number.isInteger(row['answer'])||row['answer']<0||row['answer']>3)throw new Error(`Pregunta ${index+1}: enunciado, cuatro opciones y respuesta de 0 a 3 requeridos.`);
  const q=row['q'].trim(),options=(row['options'] as string[]).map(o=>o.trim());
  if(seen.has(q)||new Set(options).size!==4)throw new Error(`Pregunta ${index+1}: enunciado repetido u opciones duplicadas.`);
  seen.add(q);return {q,options,answer:row['answer']};
 });
}