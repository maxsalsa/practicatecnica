import {createServerFn} from '@tanstack/react-start';
import {requireSupabaseAuth} from '@/integrations/supabase/auth-middleware';
import {z} from 'zod';
import {GENERATED_FAMILIES} from './generated-catalog';
export const prepareAreaBank=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(input=>z.object({institutionId:z.string().uuid(),key:z.string().min(1).max(30)}).parse(input)).handler(async({data,context})=>{
 const [admin,role]=await Promise.all([context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'}),context.supabase.rpc('institution_role_of',{_inst:data.institutionId})]);
 if(admin.error||role.error||(!admin.data&&role.data!=='direccion'))throw new Error('Solo Dirección o Max pueden preparar bancos.');
 const meta=GENERATED_FAMILIES.find(f=>f.key===data.key);if(!meta)throw new Error('Área no disponible.');
 const {buildDistinctReview}=await import('./generated.bank');
 const deck=buildDistinctReview(meta.key,20261116);if(!deck)throw new Error('No hay práctica disponible.');
 const {distinctSkillQuestions}=await import('./editorial-skills');const questions=distinctSkillQuestions(deck.questions);if(!questions.length)throw new Error('Este banco requiere etiquetar habilidades antes de prepararlo.');
 const title=`${meta.title} · revisión por habilidad v4`;
 const existing=await context.supabase.from('institution_publications').select('id').eq('institution_id',data.institutionId).eq('title',title).limit(1).maybeSingle();
 if(existing.error)throw new Error('No se pudo consultar el borrador.');if(existing.data)return {id:existing.data.id,created:false};
 const subject=meta.key.startsWith('fr')?'Francés':meta.key.startsWith('pt')||meta.key==='portugues'?'Portugués':meta.area==='Matemática'?'Matemática':meta.title.split(' · ')[0]??meta.title;
 const result=await context.supabase.from('institution_publications').insert({institution_id:data.institutionId,author_id:context.userId,title,subject,kind:'practica',status:'draft',level:meta.level.slice(0,80),body:'Selección editorial v4: una pregunta por habilidad identificada; excluye preguntas sin etiqueta y operaciones repetidas. Pendiente revisión de distractores y aprobación; no 1.000 ítems ni cobertura completa.',questions:questions.map(q=>({q:q.q,options:q.options,answer:q.answer,why:q.why,skill:q.skill}))}).select('id').single();
 if(result.error||!result.data)throw new Error('No se pudo guardar la práctica privada.');return {id:result.data.id,created:true};
});