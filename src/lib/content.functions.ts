import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { z } from 'zod';
import { requireContentAccess } from './content-access';
import { certificationSubject } from './certification-policy';
import {splitQuestionForm} from './question-forms';
import { assertAttemptAvailable, assessmentBankKey } from './assessment-limits';

export const getAuthorizedContent = createServerFn({method:'POST'})
 .middleware([requireSupabaseAuth])
 .inputValidator(input => z.object({id:z.string().min(1).max(100),lang:z.enum(['es','en']).default('es'),exam:z.boolean().default(false)}).parse(input))
 .handler(async ({data,context}) => {
   const access = await context.supabase.rpc('my_access');
   requireContentAccess(access.data, !!access.error);
   const requested=splitQuestionForm(data.id);
   const baseId=requested.baseId;
   const {decks} = await import('./questions.bank');
   const {metrologyDecks} = await import('./metrology.bank');
   const {schoolDecks,schoolDeck} = await import('./school-practice.bank');
   const {topicDecks,resolveVariantDeck,topicDeck} = await import('./practice-library.bank');
   const {resolveGrade6Deck} = await import('./grade6.bank');
   let deck = [...decks,...metrologyDecks,...schoolDecks,...topicDecks].find(d=>d.id===baseId) ?? resolveVariantDeck(baseId) ?? resolveGrade6Deck(baseId);
   if (!deck && baseId.startsWith('gen-')) {
     const {parseGeneratedId,resolveGeneratedDeck}=await import('./generated.bank');
     const parsed=parseGeneratedId(baseId);
     // Certification exams always draw a fresh server seed; a client seed is accepted only to resume an open exam session.
     if (parsed?.seed!=null && data.exam) {
       const {data:open}=await context.supabase.from('exam_sessions').select('id').eq('user_id',context.userId).eq('deck_id',baseId).is('consumed_at',null).limit(1);
       if(!open?.length) throw new Error('Inicie un simulacro nuevo.');
     }
     deck = resolveGeneratedDeck(baseId,true) ?? undefined;
   }
   if (data.id==='mixto-60') {
     const pool=decks.filter(d=>!d.id.startsWith("arena-")&&!d.id.startsWith("language-")).flatMap(d=>d.questions); const shuffled=[...pool];
     for(let i=shuffled.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));const a=shuffled[i],b=shuffled[j];if(a&&b){shuffled[i]=b;shuffled[j]=a;}}
     deck={id:'mixto-60',title:'Simulacro general de 60 ítems',emoji:'🧭',level:'General',questions:shuffled.slice(0,60)};
   }
   if (!deck) throw new Error('Práctica no disponible.');
   if(data.lang==='en') {
     if(baseId.startsWith('school-')) deck=schoolDeck(baseId.slice(7),deck.level,'en');
     else if(baseId.startsWith('topic')) {
       const m=/^(topic-v2|topic)-([a-z]+)-(\d+)-(practice|review|trivia)(?:-v(\d+))?$/.exec(baseId);
       if(m && (m[4]==='practice'||m[4]==='review'||m[4]==='trivia')) deck=topicDeck(m[2]??'',`${m[3]}.º`,'en',m[4],m[1]==='topic'?1:2,Number(m[5]??0));
     } else if(baseId.startsWith('metro-')) {
       const {englishMetrologyQuestions}=await import('./metrology-en');
       deck={...deck,questions:englishMetrologyQuestions(deck.questions,metrologyDecks.findIndex(d=>d.id===baseId))};
     }
   }
   const subject=certificationSubject(deck.id,deck.questions.length);
   const currentBankKey = assessmentBankKey(deck.id);
   if (!deck.id.startsWith('arena-')) {
     const attempts = await context.supabase.from('practice_attempts').select('deck_id,assessment_mode,certification_subject').eq('user_id',context.userId).eq('verified_scoring',true);
     if (attempts.error) throw new Error('No se pudieron verificar los intentos disponibles.');
     const used = attempts.data.filter(a => data.exam && subject ? a.assessment_mode === 'exam' && a.certification_subject === subject : a.assessment_mode === 'practice' && assessmentBankKey(a.deck_id) === currentBankKey).length;
     assertAttemptAvailable(used, data.exam && !!subject);
   }
   if(requested.form){const {applyQuestionForm}=await import('./question-forms.bank');deck=applyQuestionForm(deck,requested.form);}
   if(data.exam && subject) {
    const {supabaseAdmin}=await import('@/integrations/supabase/client.server');
    const {data:session,error}=await supabaseAdmin.from('exam_sessions').insert({user_id:context.userId,deck_id:deck.id,subject,question_count:deck.questions.length}).select('id').single();
    if(error||!session) throw new Error('No se pudo iniciar el simulacro.');
    return {...deck,examSessionId:session.id};
   }
   return {...deck,examSessionId:undefined};
 });