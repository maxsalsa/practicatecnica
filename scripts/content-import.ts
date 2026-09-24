import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {validateContent,type Question} from './content-lib';
import {main,flag,authorizeWrite,admin,json,source,sha,rpc,report} from './shared';
main(async()=>{
 if(flag('help')){console.log('pnpm content:import --dry-run | --apply --project-ref=REF');return;}
 const{catalog,blueprint,hashes,result}=await validateContent();if(flag('dry-run')){console.log('Simulación correcta. No se escribió en Supabase.');console.log(JSON.stringify(result,null,2));return;}
 authorizeWrite();const client=admin(),bucket='study-materials';const{data:existing}=await client.storage.getBucket(bucket);
 if(!existing){const{error}=await client.storage.createBucket(bucket,{public:false,allowedMimeTypes:['application/pdf'],fileSizeLimit:20*1024*1024});if(error)throw error;}else if(existing.public)throw new Error('El bucket study-materials es público. Ciérrelo antes de continuar.');
 const imported:string[]=[];
 for(const[code,specialty]of Object.entries(catalog)){
  await rpc('specialty',{specialty});const bank=await json<Record<string,Question[]>>(resolve(source,`especialidades/${code}/bank.json`));
  for(const form of['A','B','C','D','E']){const questions=bank[form].map(q=>({...q,source_hash:sha(JSON.stringify(q))}));for(let offset=0;offset<questions.length;offset+=50)await rpc('questions',{specialty:code,form,questions:questions.slice(offset,offset+50)});const quotas=blueprint.specialties.find(b=>b.code===code)!.forms.find(f=>f.form===form)!.quotas;await rpc('blueprint',{specialty:code,form,quotas});}
  for(const material of specialty.materials){const sourcePath=`especialidades/${code}/materials/${material.file}`;const bytes=await readFile(resolve(source,sourcePath));const hash=hashes[sourcePath],path=`${code}/${hash}/${material.file}`;
   const{error}=await client.storage.from(bucket).upload(path,bytes,{contentType:'application/pdf',upsert:true,cacheControl:'0'});if(error)throw error;
   const{data:download,error:de}=await client.storage.from(bucket).download(path);if(de||!download)throw new Error(`No se pudo verificar el PDF ${code}/${material.file}`);if(sha(Buffer.from(await download.arrayBuffer()))!==hash)throw new Error(`Hash remoto distinto para ${code}/${material.file}`);
   await rpc('material',{specialty:code,kind:material.id,title:material.title,filename:material.file,bucket,path,sha256:hash,bytes:bytes.length});
  }
  await rpc('publish',{specialty:code});imported.push(code);console.log(`${code}: 300 ítems, 5 pruebas y 2 PDF importados y comprobados.`);
 }
 await report('importacion.json',{...result,imported,project:process.env.SUPABASE_PROJECT_REF});
});
