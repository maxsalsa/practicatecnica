import { existsSync } from 'node:fs';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import pg from 'pg';
for (const file of ['.env.local','.env']) if(existsSync(file)) process.loadEnvFile(file);
export const root=process.cwd();
export const source=resolve(root,'content-source');
export function flag(name:string){return process.argv.includes(`--${name}`);}
export function option(name:string){return process.argv.find(a=>a.startsWith(`--${name}=`))?.slice(name.length+3);}
export function need(name:string){const value=process.env[name];if(!value||/^(reemplazar|YOUR_|CHANGE_ME)/i.test(value))throw new Error(`Falta ${name}. Complete .env.local; no publique ese archivo.`);return value;}
export function sha(bytes:string|Buffer){return createHash('sha256').update(bytes).digest('hex');}
export async function json<T>(path:string):Promise<T>{return JSON.parse(await readFile(path,'utf8')) as T;}
export async function report(name:string,data:unknown){await mkdir(resolve(root,'qa'),{recursive:true});await writeFile(resolve(root,'qa',name),JSON.stringify(data,null,2)+'\n');}
export function admin(){return createClient(need('NEXT_PUBLIC_SUPABASE_URL'),need('SUPABASE_SECRET_KEY'),{auth:{persistSession:false,autoRefreshToken:false}});}
export function destination(){const url=new URL(need('NEXT_PUBLIC_SUPABASE_URL'));const ref=need('SUPABASE_PROJECT_REF');if(url.hostname!==`${ref}.supabase.co`&&!['localhost','127.0.0.1'].includes(url.hostname))throw new Error('La URL Supabase no corresponde a SUPABASE_PROJECT_REF. Revise el destino.');return{url,ref};}
export function assertDatabaseDestination(connection:string,expectedRef:string){
 const parsed=new URL(connection);
 if(['localhost','127.0.0.1','::1','[::1]'].includes(parsed.hostname)){if(!['development','test'].includes(process.env.APP_ENV??''))throw new Error('Una base local requiere APP_ENV=development o test.');return;}
 const direct=parsed.hostname===`db.${expectedRef}.supabase.co`;
 const pooler=/\.pooler\.supabase\.com$/.test(parsed.hostname)&&decodeURIComponent(parsed.username)===`postgres.${expectedRef}`;
 if(!direct&&!pooler)throw new Error('DATABASE_URL no corresponde al proyecto Supabase confirmado. Use conexión directa o session pooler de ese proyecto.');
}
export function authorizeWrite(){const d=destination();if(!flag('apply')||option('project-ref')!==d.ref)throw new Error(`Operación sin ejecutar. Revise el proyecto y repita con --apply --project-ref=${d.ref}.`);if(process.env.DATABASE_URL)assertDatabaseDestination(process.env.DATABASE_URL,d.ref);console.log(`Destino confirmado: proyecto ${d.ref}; entorno ${process.env.APP_ENV??'sin definir'}.`);return d;}
export function database(url=need('DATABASE_URL')){const parsed=new URL(url);if(process.env.SUPABASE_PROJECT_REF)assertDatabaseDestination(url,process.env.SUPABASE_PROJECT_REF);const local=['localhost','127.0.0.1','::1','[::1]'].includes(parsed.hostname);parsed.searchParams.delete('sslmode');return new pg.Client({connectionString:parsed.toString(),ssl:local?false:{rejectUnauthorized:true},connectionTimeoutMillis:15000,application_name:'practicatecnica-ops'});}
export async function rpc(action:string,payload:unknown){const{data,error}=await admin().rpc('service_import',{action,payload});if(error)throw new Error(`Importación ${action}: ${error.code??'error'} ${error.message}`);return data;}
export async function main(run:()=>Promise<void>){try{await run();}catch(e){console.error(`No se completó: ${e instanceof Error?e.message:'error inesperado'}`);process.exitCode=1;}}
