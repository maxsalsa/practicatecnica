import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

export const sendInvite = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ email: z.string().trim().email().max(255) }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (roleError || isAdmin !== true) throw new Error("Solo administradores pueden invitar.");
    const email = data.email.toLowerCase();
    const [student, teacher] = await Promise.all([
      context.supabase.from('students').select('email').eq('email', email).limit(1),
      context.supabase.from('teacher_access').select('email').eq('email', email).limit(1),
    ]);
    const recipient = [...(student.data ?? []), ...(teacher.data ?? [])].find(row => row.email === email)?.email;
    if (student.error || teacher.error || !recipient) throw new Error('Solo puede invitar correos previamente registrados en matrícula o autorizados como docentes.');
    const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
    const r = await sendTemplateEmail("invitacion", recipient, {
      templateData: { inviter: "pracTICAtecnica.com" },
      idempotencyKey: `invitacion-${recipient}-${new Date().toISOString().slice(0, 10)}`,
    });
    return { sent: r.sent };
  });
