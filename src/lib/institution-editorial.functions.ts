import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { editorialInput,approvalIssues } from './institution-editorial';
export const saveEditorialResource=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(d=>editorialInput.parse(d)).handler(async({data,context})=>{
 if(data.status==='published'&&approvalIssues(data.content).length)throw new Error(approvalIssues(data.content).join(' '));
 const row={institution_id:data.institutionId,kind:data.kind,title:data.title,content:data.content,file_path:data.filePath,status:data.status};
 const r=data.id?await context.supabase.from('institution_resources').update(row).eq('id',data.id).select('id').single():await context.supabase.from('institution_resources').insert({...row,status:data.status==='published'?'draft':data.status,author_id:context.userId}).select('id').single();
 if(r.error)throw new Error('No se pudo guardar; verifique sus permisos y la revisión.');
 if(!data.id&&data.status==='published'){const approval=await context.supabase.from('institution_resources').update({status:'published'}).eq('id',r.data.id).select('id').single();if(approval.error)throw new Error('Borrador guardado, pero no autorizado para publicar.');}
 return r.data;
});