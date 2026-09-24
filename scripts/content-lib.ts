import { readFile } from 'node:fs/promises';
import { resolve,relative } from 'node:path';
import { validatePdf } from '../src/lib/server/pdf-safety';
import { json,source,sha } from './shared';
export interface Question{id:string;number:number;area:number;level:string|number;indicator:string;page:number;indicatorText:string;stem:string;options:string[];answer:number;explanation:string;difficulty:string;origin:string;language?:string;distractors?:Record<string,string>;official_indicator?:string;}
export interface Specialty{code:string;name:string;slug:string;initials:string;areas:string[];version:string;forms:{id:string;title:string;mode:string;total:number}[];materials:{id:string;title:string;file:string}[];}
export interface Blueprint{code:string;source_bank_sha256:string;forms:{form:string;quotas:{area:number;indicator:string;difficulty:string;count:number}[]}[];}
export async function validateContent(){
 const hashes=await json<Record<string,string>>(resolve(source,'SHA256SUMS.json'));
 const catalog=await json<Record<string,Specialty>>(resolve(source,'catalogo_original.json'));
 const blueprint=await json<{specialties:Blueprint[]}>(resolve(source,'blueprints.json'));
 const errors:string[]=[];let questions=0,forms=0,pdfs=0,distractors=0;const allowed=new Set(['2017','3002','3006','3010','3016','3019','3001']);
 for(const[path,hash]of Object.entries(hashes)){const absolute=resolve(source,path);if(relative(source,absolute).startsWith('..'))throw new Error('Ruta de contenido fuera del directorio.');const bytes=await readFile(absolute);if(sha(bytes)!==hash)errors.push(`Hash distinto: ${path}`);if(path.endsWith('.pdf')){pdfs++;try{await validatePdf(bytes);}catch{errors.push(`PDF no analizable o con acción/adjunto que requiere revisión: ${path}`);}}}
 for(const[code,spec]of Object.entries(catalog)){
  if(!allowed.has(code)||spec.code!==code)errors.push(`Especialidad inesperada ${code}`);
  const bank=await json<Record<string,Question[]>>(resolve(source,`especialidades/${code}/bank.json`));const bp=blueprint.specialties.find(b=>b.code===code);
  if(!bp||bp.source_bank_sha256!==hashes[`especialidades/${code}/bank.json`])errors.push(`Blueprint de otra versión: ${code}`);
  if(Object.keys(bank).sort().join('')!=='ABCDE')errors.push(`Formas incorrectas ${code}`);const ids=new Set<string>();
  for(const form of['A','B','C','D','E']){const list=bank[form]??[];forms++;if(list.length!==60)errors.push(`${code}/${form}: se requieren 60 ítems`);const quotas=new Map<string,number>();
   for(const[position,q]of list.entries()){questions++;const id=`${code}/${form}/${q.id}`;
    if(!q.id||ids.has(q.id))errors.push(`ID repetido/inválido ${id}`);ids.add(q.id);if(q.number!==position+1)errors.push(`Número incoherente ${id}`);
    for(const key of['indicator','indicatorText','stem','explanation','difficulty','origin']as const)if(typeof q[key]!=='string'||!q[key].trim())errors.push(`Campo ${key} vacío ${id}`);
    if(!Number.isInteger(q.area)||q.area<0||q.area>=spec.areas.length)errors.push(`Área inválida ${id}`);
    if(!Number.isInteger(q.page)||q.page<1)errors.push(`Página inválida ${id}`);
    if(![10,11,12,'Décimo','Undécimo','Duodécimo'].includes(q.level))errors.push(`Nivel inválido ${id}`);
    if(!['Básica','Media','Alta'].includes(q.difficulty))errors.push(`Dificultad inválida ${id}`);
    if(!Array.isArray(q.options)||q.options.length!==4||q.options.some(o=>typeof o!=='string'||!o.trim())||new Set(q.options).size!==4)errors.push(`Opciones inválidas ${id}`);
    if(!Number.isInteger(q.answer)||q.answer<0||q.answer>3)errors.push(`Clave inválida ${id}`);
    if(q.language&&!['es','en'].includes(q.language))errors.push(`Idioma inválido ${id}`);
    if(q.distractors){distractors++;for(const[key,value]of Object.entries(q.distractors))if(!['0','1','2','3'].includes(key)||+key===q.answer||typeof value!=='string'||!value.trim())errors.push(`Distractor inválido ${id}`);}
    const key=JSON.stringify([q.area,q.indicator,q.difficulty]);quotas.set(key,(quotas.get(key)??0)+1);
   }
   const declared=bp?.forms.find(f=>f.form===form)?.quotas??[];
   if(declared.reduce((n,q)=>n+q.count,0)!==60||declared.length!==quotas.size||declared.some(q=>quotas.get(JSON.stringify([q.area,q.indicator,q.difficulty]))!==q.count))errors.push(`Cuotas incompatibles ${code}/${form}`);
  }
 }
 if(Object.keys(catalog).length!==7||forms!==35||questions!==2100||pdfs!==14||Object.keys(hashes).length!==22)errors.push('Inventario distinto de 7 especialidades, 35 pruebas, 2.100 ítems y 14 PDF (22 archivos fuente).');
 if(errors.length)throw new Error(errors.slice(0,30).join('\n'));
 return{catalog,blueprint,hashes,result:{ok:true,specialties:7,forms,questions,pdfs,sourceFiles:Object.keys(hashes).length,itemsWithDistractors:distractors,validatedAt:new Date().toISOString(),note:'Integridad y estructura verificadas; no equivale a validación pedagógica independiente ni detección exhaustiva de malware.'}};
}
