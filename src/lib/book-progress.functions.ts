import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { z } from 'zod';
import { bookTopics } from './book-topics';
export const saveBookProgress = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator(d => z.object({ topicId: z.string().max(160), readDone: z.boolean(), exercisesDone: z.boolean() }).parse(d))
  .handler(async ({ data, context }) => {
    if (!bookTopics.some(t => t.id === data.topicId)) throw new Error('Tema no disponible.');
    const { error } = await context.supabase.from('book_topic_progress').upsert({ user_id: context.userId, topic_id: data.topicId, read_done: data.readDone, exercises_done: data.exercisesDone, updated_at: new Date().toISOString() });
    if (error) throw new Error('No se pudo guardar el avance.');
    return { ok: true };
  });
export const readBookProgress = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator(d => z.object({ studentId: z.string().uuid().optional() }).parse(d))
  .handler(async ({ data, context }) => {
    let owner = context.userId;
    if (data.studentId) {
      const { data: roles, error: roleError } = await context.supabase.from('user_roles').select('role').eq('user_id', context.userId);
      if (roleError || !roles?.some(r => r.role === 'admin' || r.role === 'teacher')) throw new Error('Acceso docente requerido.');
      const access = await context.supabase.rpc('can_use_teacher_tools');
      if (access.error || !access.data) throw new Error('Acceso docente vigente requerido.');
      const { data: student, error } = await context.supabase.from('students').select('user_id').eq('id', data.studentId).eq('teacher_id', context.userId).maybeSingle();
      if (error || !student) throw new Error('Estudiante fuera de su lista.');
      if (!student.user_id) return [];
      owner = student.user_id;
    }
    const { data: rows, error } = await context.supabase.from('book_topic_progress').select('topic_id,read_done,exercises_done,updated_at').eq('user_id', owner).order('updated_at', { ascending: false });
    if (error) throw new Error('No se pudo consultar el avance.');
    return rows ?? [];
  });