import {splitQuestionForm} from './question-forms';
import { supabase } from '@/integrations/supabase/client';
export interface RecreationalSession { id: string; subject: string; questions: number; correct: number; created_at: string }
export async function saveRecreationalSession(userId: string | undefined, session: RecreationalSession) {
 if (userId) {
  const { error } = await supabase.from('recreational_sessions').insert({...session, user_id:userId});
  if (error && error.code !== '23505') throw new Error('No se pudo guardar la partida. Puede volver a intentarlo.');
 } else {
  const key='pt-anonymous-recreation';
  const rows: RecreationalSession[] = JSON.parse(localStorage.getItem(key) ?? '[]');
  if (!rows.some(row => row.id===session.id)) localStorage.setItem(key, JSON.stringify([...rows, session]));
 }
}
export function summarizeRecreation(rows: RecreationalSession[]) {
 const result: Record<string, {partidas:number; questions:number; correct:number}> = {};
 for (const row of rows) {const subject=splitQuestionForm(row.subject).baseId;const stat=result[subject] ?? {partidas:0,questions:0,correct:0}; stat.partidas++; stat.questions+=row.questions; stat.correct+=row.correct; result[subject]=stat;}
 return result;
}