export interface MigrationBackup {format:string;version:number;institution:{id:string;name:string};users:Record<string,unknown>[];grades:Record<string,unknown>[];permissions:Record<string,unknown>[]}
export function parseMigrationBackup(text:string):MigrationBackup{
 const b=JSON.parse(text);
 if(b?.format!=='practicatecnica-institution'||b.version!==1||typeof b.institution?.id!=='string'||typeof b.institution?.name!=='string'||!['users','grades','permissions'].every(k=>Array.isArray(b[k])&&b[k].every((r:unknown)=>r!==null&&typeof r==='object'&&!Array.isArray(r))))throw new Error('El archivo no corresponde al respaldo institucional v1.');
 for(const key of ['users','grades','permissions']){const ids=b[key].map((r:Record<string,unknown>)=>r['id']);if(ids.some((id:unknown)=>typeof id!=='string')||new Set(ids).size!==ids.length)throw new Error('Hay identificadores ausentes o repetidos.');}
 return b;
}
export function unresolvedPermissionUsers(b:MigrationBackup){const ids=new Set(b.users.map(u=>u['id']));return b.permissions.flatMap(p=>['requester_id','reviewer_id'].filter(k=>p[k]&&!ids.has(p[k])).map(k=>({permission:p['id'],field:k})));}