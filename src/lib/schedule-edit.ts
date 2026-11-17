import type {Cell,ScheduleOption} from './schedule';
export function editScheduleCell(o:ScheduleOption,group:string,day:number,period:number,cell:Cell):ScheduleOption{
 if(!o.grid[group]?.[day]||period<0||period>=o.grid[group][day].length)throw new Error('Lección desconocida.');
 if(cell){
  if(!cell.subject.trim()||!cell.teacher.trim())throw new Error('Materia y profesor son obligatorios.');
  if([cell.subject,cell.teacher,cell.room??''].some(x=>x.length>120))throw new Error('Máximo 120 caracteres por campo.');
  if(!!cell.startTime!==!!cell.endTime)throw new Error('Indique ambas horas o deje ambas vacías.');
  if(cell.startTime&&cell.endTime&&(!/^\d{2}:\d{2}$/.test(cell.startTime)||!/^\d{2}:\d{2}$/.test(cell.endTime)||cell.startTime>=cell.endTime))throw new Error('La hora final debe ser posterior a la inicial.');
  for(const [other,days] of Object.entries(o.grid)){
   if(other===group)continue;const at=days[day]?.[period];
   if(at?.teacher.trim().toLowerCase()===cell.teacher.trim().toLowerCase())throw new Error(`Profesor ya asignado a ${other} en esta lección.`);
   if(cell.room?.trim()&&at?.room?.trim().toLowerCase()===cell.room.trim().toLowerCase())throw new Error(`Aula ya asignada a ${other} en esta lección.`);
  }
 }
 return {...o,grid:{...o.grid,[group]:o.grid[group].map((row,d)=>d===day?row.map((v,p)=>p===period?cell:v):row)}};
}