export type ArenaMode='pc'|'local';
export interface ArenaState { round:number;player:0|1; scores:[number,number]; picks:[number|null,number|null]; stage:'answer'|'review'|'done' }
const curricularFamilies=[{id:'science',title:'Ciencias',role:'Investigación',icon:'🔬'},{id:'finance',title:'Finanzas',role:'Análisis financiero',icon:'📊'},{id:'banking',title:'Banca',role:'Servicios financieros',icon:'🏦'},{id:'costs',title:'Contabilidad de costos',role:'Análisis de producción',icon:'🧮'}];
export const arenaFamilies=[{id:'english',title:'Inglés y vocabulario',role:'Comunicación',icon:'🌍'},{id:'math',title:'Matemáticas',role:'Razonamiento',icon:'📐'},{id:'web',title:'Desarrollo web',role:'Desarrollo',icon:'💻'},{id:'architecture',title:'Arquitectura de software',role:'Diseño de sistemas',icon:'🏗️'},{id:'accounting',title:'Accounting y contabilidad',role:'Contabilidad',icon:'🧾'},{id:'digital',title:'Ciberseguridad y redes',role:'Especialista de soporte',icon:'🛡️'},{id:'business',title:'Empresa y finanzas',role:'Analista comercial',icon:'📊'},{id:'agro',title:'Agropecuaria',role:'Gestor agropecuario',icon:'🌱'},{id:'industrial',title:'Industria e infraestructura',role:'Técnico de mantenimiento',icon:'⚙️'},{id:'critical',title:'Pensamiento crítico y bienestar',role:'Razonamiento para la vida',icon:'🔎'},{id:'stress',title:'Gestión del estrés',role:'Pausas y organización',icon:'🌿'},{id:'sleep',title:'Hábitos de sueño',role:'Descanso saludable',icon:'🌙'},{id:'nutrition',title:'Alimentación',role:'Hábitos y respeto',icon:'🥗'},{id:'mindfulness',title:'Atención y meditación',role:'Pausas voluntarias',icon:'🧘'}];
arenaFamilies.push(...curricularFamilies);
export function newArena():ArenaState{return {round:0,player:0,scores:[0,0],picks:[null,null],stage:'answer'}}
export function answerArena(s:ArenaState,pick:number,answer:number,mode:ArenaMode):ArenaState{
 if(s.stage!=='answer'||!Number.isInteger(pick)||pick<0||pick>3)return s;
 const picks:[number|null,number|null]=[...s.picks];const scores:[number,number]=[...s.scores];
 picks[s.player]=pick;
 if(mode==='pc'){const pcPick=s.round%3===2?(answer+1)%4:answer;picks[1]=pcPick;scores[0]+=pick===answer?10:0;scores[1]+=pcPick===answer?10:0;return {...s,picks,scores,stage:'review'};}
 if(s.player===1){scores[0]+=picks[0]===answer?10:0;scores[1]+=pick===answer?10:0;}
 return {...s,picks,scores,player:s.player===0?1:0,stage:s.player===0?'answer':'review'};
}
export function advanceArena(s:ArenaState,count:number):ArenaState{
 if(s.stage!=='review')return s;
 return s.round+1>=count?{...s,stage:'done'}:{...s,round:s.round+1,player:0,picks:[null,null],stage:'answer'};
}