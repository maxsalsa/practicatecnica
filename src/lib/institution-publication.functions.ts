import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { publicationInput } from './institution-publication';
export const saveInstitutionPublication = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(d=>publicationInput.parse(d)).handler(async({data,context})=>{
  const row={institution_id:data.institutionId,kind:data.kind,title:data.title,body:data.body,subject:data.subject,level:data.level,minutes:data.minutes,questions:data.questions,status:data.status};
  const result=data.id ? await context.supabase.from('institution_publications').update(row).eq('id',data.id).select('id').single() : await context.supabase.from('institution_publications').insert({...row,author_id:context.userId}).select('id').single();
  if(result.error) throw new Error('No se pudo guardar. Verifique sus permisos y los campos.');return result.data;
});