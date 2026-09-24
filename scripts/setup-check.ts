import {main,flag,need,destination,database,admin,report} from './shared';
import {validateContent} from './content-lib';
main(async()=>{
 if(flag('help')){console.log('pnpm setup:check [--offline]. Comprueba el contenido y, sin --offline, configuración y conexiones.');return;}
 if(Number(process.versions.node.split('.')[0])<24)throw new Error('Instale Node.js 24 LTS o posterior compatible.');const{result}=await validateContent();console.log('Contenido íntegro: 7 especialidades, 2.100 ítems y 14 PDF.');
 if(flag('offline')){console.log('Revisión local terminada. Supabase, correo y DNS NO se comprobaron.');return;}
 const{ref}=destination();for(const name of['APP_URL','NEXT_PUBLIC_SUPABASE_URL','NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY','SUPABASE_SECRET_KEY','DATABASE_URL','MAIL_ENCRYPTION_KEY','MAIL_WORKER_SECRET','RESEND_API_KEY','MAIL_FROM'])need(name);
 const app=new URL(need('APP_URL'));if(app.protocol!=='https:'&&app.hostname!=='localhost')throw new Error('APP_URL debe usar HTTPS en el sitio publicado.');if(Buffer.from(need('MAIL_ENCRYPTION_KEY'),'base64').length!==32)throw new Error('MAIL_ENCRYPTION_KEY debe ser base64 de exactamente 32 bytes aleatorios.');if(need('MAIL_WORKER_SECRET').length<32)throw new Error('MAIL_WORKER_SECRET requiere al menos 32 caracteres aleatorios.');
 const db=database();await db.connect();try{await db.query('select 1');}finally{await db.end();}
 const{error}=await admin().auth.admin.listUsers({page:1,perPage:1});if(error)throw new Error('La clave administrativa no permite acceder a Auth de este proyecto.');
 const response=await fetch(new URL('/auth/v1/settings',need('NEXT_PUBLIC_SUPABASE_URL')),{headers:{apikey:need('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY')},signal:AbortSignal.timeout(10000)});if(!response.ok)throw new Error('La clave publishable no permite consultar Auth. URL y ambas claves deben pertenecer al mismo proyecto.');
 const{data:settings,error:settingsError}=await admin().rpc('service_platform',{action:'status',payload:{}});
 if(settingsError)console.log('Migraciones pendientes o configuración de inscripciones aún no disponible. Continúe con db:migrate; no se declara listo el registro.');else console.log(`Inscripciones: ${settings?.registrationOpen?'abiertas':'cerradas'}; revisión de privacidad: ${settings?.privacyReady?'registrada':'pendiente'}. Complete acceso/MFA propietario y los gates antes de abrirlas.`);
 await report('configuracion.json',{ok:true,project:ref,content:result,checkedAt:new Date().toISOString(),note:'Conexiones verificadas; esto no prueba recepción de correo ni toda la seguridad de producción.'});console.log(`Proyecto ${ref}: conexión SQL y Auth correctas. No se envió ningún correo.`);
});
