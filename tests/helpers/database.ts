/** Real PostgreSQL/RLS. Only the Supabase Auth technical schema is a fixture. Not a multi-connection race proof. */
import { PGlite } from '@electric-sql/pglite';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
export type Claims={sub?:string;session_id?:string;aal?:'aal1'|'aal2';role?:string;[key:string]:unknown};
export const fixtureIds={student:'10000000-0000-4000-8000-000000000001',other:'10000000-0000-4000-8000-000000000002',owner:'10000000-0000-4000-8000-000000000003',temporary:'10000000-0000-4000-8000-000000000004',disabled:'10000000-0000-4000-8000-000000000005'};
export const sessionId=(user:string)=>user.replace('10000000','20000000');
export async function createDatabase(){const db=new PGlite();await db.exec(`
CREATE ROLE anon NOLOGIN; CREATE ROLE authenticated NOLOGIN; CREATE ROLE service_role NOLOGIN BYPASSRLS;
CREATE SCHEMA auth;
CREATE TABLE auth.users(id uuid PRIMARY KEY,email text UNIQUE,email_confirmed_at timestamptz,raw_user_meta_data jsonb NOT NULL DEFAULT '{}',raw_app_meta_data jsonb NOT NULL DEFAULT '{}',created_at timestamptz DEFAULT now(),updated_at timestamptz DEFAULT now());
CREATE TABLE auth.mfa_factors(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),user_id uuid NOT NULL REFERENCES auth.users(id),status text NOT NULL DEFAULT 'unverified',factor_type text NOT NULL DEFAULT 'totp');
CREATE FUNCTION auth.jwt() RETURNS jsonb LANGUAGE sql STABLE AS $$ SELECT COALESCE(NULLIF(current_setting('request.jwt.claims',true),''),'{}')::jsonb $$;
CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$ SELECT NULLIF(auth.jwt()->>'sub','')::uuid $$;
CREATE FUNCTION auth.role() RETURNS text LANGUAGE sql STABLE AS $$ SELECT COALESCE(auth.jwt()->>'role','anon') $$;
GRANT USAGE ON SCHEMA auth TO anon,authenticated,service_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA auth TO anon,authenticated,service_role;
GRANT ALL ON auth.users,auth.mfa_factors TO service_role;`);
const dir=path.join(process.cwd(),'supabase/migrations'),names=(await readdir(dir)).filter(f=>f.endsWith('.sql')).sort();if(!names.length)throw new Error('Missing migrations');for(const name of names)await db.exec(await readFile(path.join(dir,name),'utf8'));return db;}
export async function queryAs<T extends Record<string,unknown>=Record<string,unknown>>(db:PGlite,role:'anon'|'authenticated'|'service_role',claims:Claims,sql:string,values:unknown[]=[]){return db.transaction(async tx=>{await tx.exec(`SET LOCAL ROLE ${role}`);await tx.query("SELECT set_config('request.jwt.claims',$1,true)",[JSON.stringify({role,...claims})]);return tx.query<T>(sql,values);});}
export async function rpc(db:PGlite,action:string,payload:Record<string,unknown>,user=fixtureIds.student,aal:'aal1'|'aal2'='aal1'){const r=await queryAs<{result:any}>(db,'authenticated',{sub:user,session_id:sessionId(user),aal},'SELECT public.study($1,$2::jsonb) result',[action,JSON.stringify(payload)]);return r.rows[0].result;}
export async function importRpc(db:PGlite,action:string,payload:Record<string,unknown>){return(await queryAs<{result:any}>(db,'service_role',{},'SELECT public.service_import($1,$2::jsonb) result',[action,JSON.stringify(payload)])).rows[0].result;}
export async function seedIdentities(db:PGlite){for(const[label,id]of Object.entries(fixtureIds)){const email=label==='owner'?'maxi.salsa@gmail.com':`${label}@example.test`,state=label==='temporary'?'password_change':label==='disabled'?'disabled':'active',scope=label==='owner'?'owner_admin':label==='temporary'?'password_change':'student';await db.query('INSERT INTO auth.users(id,email,email_confirmed_at) VALUES($1,$2,now())',[id,email]);await db.query("INSERT INTO private.accounts(user_id,email,state,security_epoch,must_change,temporary_expires_at,verified_at) VALUES($1,$2,$3,1,$4,now()+interval '24 hours',now())",[id,email,state,label==='temporary']);await db.query("INSERT INTO public.profiles(id,name,group_name,specialty_code,theme) VALUES($1,$2,'12-QA','3006','system')",[id,`Fixture ${label}`]);await db.query("INSERT INTO private.app_sessions(session_id,user_id,security_epoch,scope,expires_at) VALUES($1,$2,1,$3,now()+interval '1 hour')",[sessionId(id),id,scope]);}await db.query('INSERT INTO private.platform_owner(singleton,user_id) VALUES(true,$1)',[fixtureIds.owner]);await db.query("INSERT INTO auth.mfa_factors(user_id,status,factor_type) VALUES($1,'verified','totp')",[fixtureIds.owner]);}
