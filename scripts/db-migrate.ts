import {readdir,readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {main,authorizeWrite,database,sha,flag,report} from './shared';
main(async()=>{
 if(flag('help')){console.log('pnpm db:migrate --apply --project-ref=REF. Aplica solo migraciones pendientes; nunca borra tablas.');return;}
 authorizeWrite();const db=database();await db.connect();const applied:string[]=[];
 try{
  await db.query("select pg_advisory_lock(hashtext('practicatecnica_schema_v11'))");await db.query('create schema if not exists migration_meta');await db.query('revoke all on schema migration_meta from public');await db.query('create table if not exists migration_meta.applied(name text primary key,sha256 text not null,applied_at timestamptz not null default now())');
  const directory=resolve('supabase/migrations');const files=(await readdir(directory)).filter(n=>/^\d.*\.sql$/.test(n)).sort();if(!files.length)throw new Error('No se encontraron migraciones.');
  for(const name of files){const sql=await readFile(resolve(directory,name),'utf8'),hash=sha(sql);const existing=await db.query('select sha256 from migration_meta.applied where name=$1',[name]);if(existing.rowCount){if(existing.rows[0].sha256!==hash)throw new Error(`La migración ${name} cambió después de aplicarse. No se sobrescribe el historial.`);console.log(`${name}: ya aplicada.`);continue;}
   await db.query('begin');try{await db.query(sql);await db.query('insert into migration_meta.applied(name,sha256) values($1,$2)',[name,hash]);await db.query('commit');applied.push(name);console.log(`${name}: aplicada.`);}catch(e){await db.query('rollback');throw e;}
  }
  await report('migraciones.json',{project:process.env.SUPABASE_PROJECT_REF,applied,checkedAt:new Date().toISOString()});
 }finally{await db.query("select pg_advisory_unlock(hashtext('practicatecnica_schema_v11'))").catch(()=>{});await db.end();}
});
