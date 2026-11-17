import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import { splitQuestionForm } from "./question-forms";

/** Teacher-only review: question text, options, key and the student's pick for one attempt of an owned, linked student. */
export const getAttemptReview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ attemptId: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const [t, a] = await Promise.all([
      context.supabase.rpc("has_role", { _user_id: context.userId, _role: "teacher" }),
      context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" }),
    ]);
    if (!t.data && !a.data) throw new Error("Solo docentes.");
    const access = await context.supabase.rpc('can_use_teacher_tools');
    if (access.error || !access.data) throw new Error('Acceso docente vigente requerido.');
    const { data: attempt } = await context.supabase.from("practice_attempts").select("user_id,deck_id,answers").eq("id", data.attemptId).maybeSingle();
    if (!attempt) throw new Error("Intento no disponible.");
    const { data: owned } = await context.supabase.from("students").select("id").eq("user_id", attempt.user_id).eq("teacher_id", context.userId).limit(1);
    if (!owned?.length) throw new Error("Este estudiante no está en su lista.");
    const requested = splitQuestionForm(attempt.deck_id);
    const { decks } = await import("./questions.bank");
    const { metrologyDecks } = await import("./metrology.bank");
    const { schoolDecks } = await import("./school-practice.bank");
    const { topicDecks, resolveVariantDeck } = await import("./practice-library.bank");
    const { resolveGrade6Deck } = await import("./grade6.bank");
    let bank = [...decks, ...metrologyDecks, ...schoolDecks, ...topicDecks].find((d) => d.id === requested.baseId) ?? resolveVariantDeck(requested.baseId) ?? resolveGrade6Deck(requested.baseId);
    if (!bank) throw new Error("Banco no disponible para revisión.");
    if (requested.form) { const { applyQuestionForm } = await import("./question-forms.bank"); bank = applyQuestionForm(bank, requested.form); }
    const picks = Array.isArray(attempt.answers) ? (attempt.answers as { index: number; pick: number }[]) : [];
    return picks.map((p) => { const q = bank.questions[p.index]; return { n: p.index + 1, q: q?.q ?? "", options: q?.options ?? [], answer: q?.answer ?? -1, pick: p.pick }; });
  });

/** Teacher-only block preview for planning: full question text, options, key and explanation. */
export const getDeckReview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ deckId: z.string().min(1).max(100) }).parse(input))
  .handler(async ({ data, context }) => {
    const [t, a] = await Promise.all([
      context.supabase.rpc("has_role", { _user_id: context.userId, _role: "teacher" }),
      context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" }),
    ]);
    if (!t.data && !a.data) throw new Error("Solo docentes.");
    const access = await context.supabase.rpc('can_use_teacher_tools');
    if (access.error || !access.data) throw new Error('Acceso docente vigente requerido.');
    const { decks } = await import("./questions.bank");
    const { metrologyDecks } = await import("./metrology.bank");
    const { schoolDecks } = await import("./school-practice.bank");
    const { topicDecks, resolveVariantDeck } = await import("./practice-library.bank");
    const { resolveGrade6Deck } = await import("./grade6.bank");
    const bank = [...decks, ...metrologyDecks, ...schoolDecks, ...topicDecks].find((d) => d.id === data.deckId) ?? resolveVariantDeck(data.deckId) ?? resolveGrade6Deck(data.deckId);
    if (!bank) throw new Error("Bloque no disponible.");
    return bank.questions.map((q, i) => ({ n: i + 1, q: q.q, options: q.options, answer: q.answer, why: q.why, source: q.source }));
  });
