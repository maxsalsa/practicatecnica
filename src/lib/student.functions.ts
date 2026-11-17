import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import { scoreAnswers, earnedPoints } from "./progress-data";
import { requireContentAccess } from './content-access';
import {splitQuestionForm} from './question-forms';
const input = z.object({
  id: z.string().uuid(),
  deckId: z.string().min(1).max(100),
  title: z.string().min(1).max(200),
  answers: z
    .array(
      z.object({ index: z.number().int().min(0).max(199), pick: z.number().int().min(0).max(4) }),
    )
    .min(1)
    .max(200),
  reportedScore: z.number().int().min(0).max(100),
  examSessionId: z.string().uuid().optional(),
});
export const recordAttempt = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => input.parse(d))
  .handler(async ({ data, context }) => {
    const { error: accessError, data: access } = await context.supabase.rpc("my_access");
    requireContentAccess(access, !!accessError);
    const { decks } = await import("./questions.bank");
    const { metrologyDecks } = await import("./metrology.bank");
    const { schoolDecks } = await import("./school-practice.bank");
    const { topicDecks, resolveVariantDeck } = await import("./practice-library.bank");
    const { resolveGrade6Deck } = await import("./grade6.bank");
    const requested=splitQuestionForm(data.deckId);
    let bank =
      [...decks, ...metrologyDecks, ...schoolDecks, ...topicDecks].find(
        (d) => d.id === requested.baseId,
      ) ?? resolveVariantDeck(requested.baseId) ?? resolveGrade6Deck(requested.baseId);
    if (!bank && requested.baseId.startsWith('gen-')) bank = (await import('./generated.bank')).resolveGeneratedDeck(requested.baseId) ?? undefined;
    if(bank&&requested.form){const {applyQuestionForm}=await import('./question-forms.bank');bank=applyQuestionForm(bank,requested.form);}
    if (!bank && !data.deckId.startsWith("ia-")) throw new Error("Práctica desconocida.");
    const score = bank ? scoreAnswers(bank.questions, data.answers) : data.reportedScore;
    const points = bank ? earnedPoints(bank.questions, data.answers) : 0;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    if (data.deckId.startsWith('arena-')) throw new Error('Los juegos no crean intentos académicos.');
    let subject: string | null = null;
    if(data.examSessionId && bank) {
      if(data.answers.length !== bank.questions.length) throw new Error('El simulacro debe estar completo.');
      const {data:session,error:sessionError}=await supabaseAdmin.from('exam_sessions').update({consumed_at:new Date().toISOString()}).eq('id',data.examSessionId).eq('user_id',context.userId).eq('deck_id',bank.id).eq('question_count',bank.questions.length).is('consumed_at',null).select('subject').maybeSingle();
      if(sessionError||!session) {
        const {data:existing}=await context.supabase.from('practice_attempts').select('id').eq('id',data.id).eq('user_id',context.userId).maybeSingle();
        if(existing) return {score,points};
        throw new Error('Simulacro ya entregado o sesión inválida.');
      }
      subject=session.subject;
    }
    const { error } = await supabaseAdmin.from("practice_attempts").upsert(
      {
        id: data.id,
        user_id: context.userId,
        deck_id: data.deckId,
        title: bank?.title ?? data.title,
        score,
        question_count: data.answers.length,
        answers: data.answers,
        verified_scoring: !!bank,
        earned_points: points,
        points_version: 1,
        assessment_mode:subject ? 'exam' : 'practice',
        certification_subject:subject,
      },
      { onConflict: "id", ignoreDuplicates: true },
    );
    if (error) throw new Error("No se pudo guardar el intento.");
    return { score, points };
  });
export const grantTeacher = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ email: z.string().email(), role: z.enum(['teacher', 'student']).default('teacher') }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: admin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError || !admin) throw new Error("Solo administración puede autorizar docentes.");
    const email = data.email.trim().toLowerCase();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = data.role === 'teacher' ? await supabaseAdmin
      .from("teacher_access")
      .upsert({ email, created_by: context.userId }) : await supabaseAdmin.from('teacher_access').delete().eq('email', email);
    if (error) throw new Error("No se pudo autorizar el correo.");
    // Exact verified email only; paginate the admin directory rather than exposing it to clients.
    for (let page = 1; ; page++) {
      const { data: users, error: usersError } = await supabaseAdmin.auth.admin.listUsers({
        page,
        perPage: 100,
      });
      if (usersError) throw new Error("No se pudo verificar la cuenta.");
      const match = users.users.find(
        (u) => u.email?.toLowerCase() === email && !!u.email_confirmed_at,
      );
      if (match) {
        if (data.role === 'student') {
          const revoked = await supabaseAdmin.from('user_roles').delete().eq('user_id', match.id).eq('role', 'teacher');
          if (revoked.error) throw new Error('No se pudo retirar el permiso docente.');
        }
        const { error: e } = await supabaseAdmin
          .from("user_roles")
          .upsert({ user_id: match.id, role: data.role }, { onConflict: "user_id,role" });
        if (e) throw new Error("No se pudo asignar el permiso.");
        break;
      }
      if (users.users.length < 100) break;
    }
    return { ok: true };
  });
export const registerStudent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z
      .object({
        name: z.string().trim().min(1).max(100),
        email: z.string().email(),
        institution: z.string().max(150),
        level: z.string().max(80),
        notes: z.string().max(1000),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const { data: roles, error: rolesError } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);
    if (rolesError || !roles?.some((r) => r.role === "admin" || r.role === "teacher"))
      throw new Error("Acceso docente requerido.");
    const { data: entitled, error: entitlementError } = await context.supabase.rpc('can_use_teacher_tools');
    if (entitlementError || !entitled) throw new Error('Prueba docente o plan docente vigente requerido.');
    const email = data.email.toLowerCase().trim();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let userId: string | null = null;
    for (let page = 1; ; page++) {
      const { data: u, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 100 });
      if (error) throw new Error("No se pudo verificar la cuenta.");
      const match = u.users.find((x) => x.email?.toLowerCase() === email && x.email_confirmed_at);
      if (match) {
        userId = match.id;
        break;
      }
      if (u.users.length < 100) break;
    }
    const { error } = await supabaseAdmin
      .from("students")
      // Link happens only when the student signs in with this verified email (claim_student_registration).
      .insert({ ...data, email, user_id: null, teacher_id: context.userId });
    if (error)
      throw new Error(
        error.code === "23505"
          ? "Este correo ya está registrado."
          : "No se pudo registrar el estudiante.",
      );
    return { ok: true };
  });
