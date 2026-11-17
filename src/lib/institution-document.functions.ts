import {createServerFn} from '@tanstack/react-start';
import {requireSupabaseAuth} from '@/integrations/supabase/auth-middleware';
import {z} from 'zod';

export const downloadInstitutionDocument=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(d=>z.object({path:z.string().min(1).max(300)}).parse(d)).handler(async({data,context})=>{
 const row=await context.supabase.from('institution_documents').select('id,path,institution_id').eq('path',data.path).maybeSingle();
 if(row.error||!row.data)throw new Error('Documento no disponible.');
 const {supabaseAdmin}=await import('@/integrations/supabase/client.server');
 const file=await supabaseAdmin.storage.from('institution-docs').download(row.data.path);
 if(file.error||!file.data)throw new Error('Documento no disponible.');
 // Recheck current membership after reading bytes; no reusable storage URL is returned.
 const stillAllowed=await context.supabase.from('institution_documents').select('id').eq('id',row.data.id).maybeSingle();
 if(stillAllowed.error||!stillAllowed.data)throw new Error('Acceso retirado.');
 const bytes=new Uint8Array(await file.data.arrayBuffer());let binary='';
 for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
 return {base64:btoa(binary),type:file.data.type};
});