export type Vehicle = 'carro' | 'moto' | 'trailer' | 'bicicleta' | 'bicimoto' | 'taxi' | 'autobus' | 'especial';
export type DrivingBand='inicial'|'intermedio'|'avanzado';
export function circuitForBand(c:RoadCircuit,band:DrivingBand):RoadCircuit {
 if(band==='inicial')return c;
 const extra=band==='intermedio'?[{x:0,y:1}]:[{x:0,y:1},{x:8,y:7}];
 return {...c,goals:[...c.goals,...extra],cones:[...c.cones,...(band==='avanzado'?[{x:0,y:0},{x:8,y:8}]:[])]};
}
export type Maneuver = 'avanzar' | 'retroceder' | 'izquierda' | 'derecha';
export interface Position { x:number; y:number }
export interface RoadCircuit { id:string; title:string; start:Position; direction:number; goals:Position[]; cones:Position[]; island:Position[]; vehicles:Vehicle[] }
export const roadCircuits:RoadCircuit[] = [
 {id:'conos',title:'Zigzag entre conos',start:{x:1,y:7},direction:0,goals:[{x:1,y:5},{x:3,y:5},{x:3,y:3},{x:5,y:3},{x:5,y:1}],cones:[{x:2,y:6},{x:2,y:4},{x:4,y:4},{x:4,y:2}],island:[],vehicles:['carro','moto','trailer','bicicleta','bicimoto']},
 {id:'rotonda',title:'Vuelta a la rotonda',start:{x:1,y:7},direction:0,goals:[{x:1,y:3},{x:1,y:1},{x:5,y:1},{x:7,y:1},{x:7,y:5},{x:7,y:7},{x:3,y:7}],cones:[{x:0,y:4},{x:8,y:4}],island:[{x:3,y:3},{x:4,y:3},{x:5,y:3},{x:3,y:4},{x:4,y:4},{x:5,y:4},{x:3,y:5},{x:4,y:5},{x:5,y:5}],vehicles:['carro','moto','trailer','bicicleta','bicimoto']},
 {id:'parqueo',title:'Parqueo de precisión',start:{x:1,y:7},direction:0,goals:[{x:1,y:2},{x:5,y:2},{x:5,y:6}],cones:[{x:4,y:5},{x:6,y:5},{x:4,y:6},{x:6,y:6},{x:4,y:7},{x:6,y:7}],island:[],vehicles:['carro','moto','trailer','bicicleta','bicimoto']},
];
export interface DriveState {position:Position;direction:number;trailer:Position|null;goal:number;moves:number;collisions:number;done:boolean}
export const startDrive=(c:RoadCircuit,v:Vehicle):DriveState=>({position:{...c.start},direction:c.direction,trailer:v==='trailer'?{x:c.start.x,y:c.start.y+1}:null,goal:0,moves:0,collisions:0,done:false});
const same=(a:Position,b:Position)=>a.x===b.x&&a.y===b.y;
export function driveStep(s:DriveState,c:RoadCircuit,action:Maneuver):DriveState {
 if(s.done)return s;
 if(action==='izquierda'||action==='derecha')return {...s,direction:(s.direction+(action==='derecha'?1:3))%4,moves:s.moves+1};
 const vectors=[{x:0,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0}];const d=vectors[s.direction];if(!d)return s;
 const sign=action==='avanzar'?1:-1;const p={x:s.position.x+d.x*sign,y:s.position.y+d.y*sign};
 const blocked=p.x<0||p.x>8||p.y<0||p.y>8||[...c.cones,...c.island].some(o=>same(o,p))||(s.trailer!==null&&same(s.trailer,p));
 if(blocked)return {...s,moves:s.moves+1,collisions:s.collisions+1};
 const goal=c.goals[s.goal];const nextGoal=goal&&same(goal,p)?s.goal+1:s.goal;
 return {...s,position:p,trailer:s.trailer?s.position:null,goal:nextGoal,moves:s.moves+1,done:nextGoal===c.goals.length};
}
export function roadPoints(s:DriveState,goalCount=5){return s.done?Math.max(1,100-s.collisions*10-Math.max(0,s.moves-goalCount*6)):0;}
export function roadRunLevel(s:DriveState){return !s.done?null:s.collisions===0?'Oro':s.collisions<=2?'Plata':'Bronce';}
export function roadLevel(points:number){return points>=600?'Oro':points>=300?'Plata':'Bronce';}
export const drivingBands:DrivingBand[]=['inicial','intermedio','avanzado'];
export const bandLabels:Record<DrivingBand,string>={inicial:'Inicial',intermedio:'Intermedio',avanzado:'Avanzado'};
export const roadVehicles:{id:Vehicle;label:string}[]=[{id:'carro',label:'Carro'},{id:'moto',label:'Moto'},{id:'trailer',label:'Tráiler'},{id:'bicicleta',label:'Bicicleta'},{id:'bicimoto',label:'Bicimoto'},{id:'taxi',label:'Taxi'},{id:'autobus',label:'Autobús'},{id:'especial',label:'Especial'}];
export interface RoadRecord {circuit:string;vehicle:Vehicle;band:DrivingBand}
export const roadSteps=drivingBands.flatMap(band=>roadCircuits.map((circuit,index)=>({band,index,circuit:circuit.id})));
export const roadKey=(circuit:string,vehicle:Vehicle,band:DrivingBand)=>`${circuit}:${vehicle}:${band}`;
export function parseRoadSubject(subject:string):RoadRecord|null{
 const m=/^vial-v([12]):([a-z]+):([a-z]+)(?::([a-z]+))?$/.exec(subject);if(!m)return null;
 const band=(m[1]==='1'?'inicial':m[4]) as DrivingBand;const vehicle=m[3] as Vehicle;const circuit=m[2] as string;
 if(!drivingBands.includes(band)||!roadVehicles.some(v=>v.id===vehicle)||!roadCircuits.some(c=>c.id===circuit))return null;
 return {circuit,vehicle,band};
}
/** Each vehicle advances through the circuits in order: all Inicial circuits, then Intermedio, then Avanzado. */
export function roadStepUnlocked(completed:Set<string>,vehicle:Vehicle,index:number,band:DrivingBand){
 const pos=roadSteps.findIndex(s=>s.band===band&&s.index===index);if(pos<0)return false;if(pos===0)return true;
 const here=roadSteps[pos];const prev=roadSteps[pos-1];
 return !!(here&&completed.has(roadKey(here.circuit,vehicle,band)))||!!(prev&&completed.has(roadKey(prev.circuit,vehicle,prev.band)));
}
export function nextRoadStep(completed:Set<string>,vehicle:Vehicle){
 return roadSteps.find(s=>!completed.has(roadKey(s.circuit,vehicle,s.band)))??roadSteps[roadSteps.length-1]??{band:'inicial' as DrivingBand,index:0,circuit:'conos'};
}
export function vehicleStepsDone(completed:Set<string>,vehicle:Vehicle){return roadSteps.filter(s=>completed.has(roadKey(s.circuit,vehicle,s.band))).length;}
