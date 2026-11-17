import {createServerFn} from '@tanstack/react-start';
import {requireSupabaseAuth} from '@/integrations/supabase/auth-middleware';
import {z} from 'zod';
export const prepareLanguageReview=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(input=>z.object({institutionId:z.string().uuid(),key:z.enum(['frclean','ptclean'])}).parse(input)).handler(async({data,context})=>{
 const [admin,role]=await Promise.all([context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'}),context.supabase.rpc('institution_role_of',{_inst:data.institutionId})]);
 if(admin.error||role.error||(!admin.data&&role.data!=='direccion'))throw new Error('Solo Dirección o Max pueden preparar la revisión.');
 const {LANGUAGE_REVIEW_BANKS}=await import('./language-review-catalog');const {reviewedLanguageItems}=await import('./language-reviewed.bank');
 const metadata=LANGUAGE_REVIEW_BANKS.find(b=>b.key===data.key);if(!metadata)throw new Error('Banco no disponible.');
 const existing=await context.supabase.from('institution_publications').select('id').eq('institution_id',data.institutionId).eq('title',metadata.title).limit(1).maybeSingle();
 if(existing.error)throw new Error('No se pudo consultar el banco.');if(existing.data)return {id:existing.data.id,created:false};
 const result=await context.supabase.from('institution_publications').insert({institution_id:data.institutionId,author_id:context.userId,title:metadata.title,subject:metadata.subject,kind:'practica',status:'draft',level:'Introductorio · 8 habilidades; no banco de 1.000',body:'Banco v3: una pregunta canónica por habilidad, sin variaciones cosméticas ni operaciones numéricas. Pendiente de revisión institucional y publicación.',questions:reviewedLanguageItems(data.key).map(i=>i.question)}).select('id').single();
 if(result.error||!result.data)throw new Error('No se pudo preparar el banco para revisión.');return {id:result.data.id,created:true};
});