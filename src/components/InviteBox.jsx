import { useState } from "react";
import { toast } from "sonner";
import { sendInvite } from "@/lib/invite.functions";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";

export function InviteBox() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const inviteFn=useServerFn(sendInvite);
  return (
    <form
      className="mt-4 grid gap-2 rounded-lg border bg-card p-4 sm:flex sm:flex-wrap sm:items-center"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        try {
          const r = await inviteFn({ data: { email } });
          if (r.sent) { toast.success("Invitación enviada."); setEmail(""); }
          else toast.error("Ese correo no acepta mensajes nuestros.");
        } catch { toast.error("No se pudo enviar. El correo se activa cuando termine la verificación del dominio."); }
        setBusy(false);
      }}
    >
      <label htmlFor="invite" className="font-bold">✉️ Invitar por correo</label>
      <input id="invite" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="correo@ejemplo.com" className="min-w-0 flex-1 rounded-xl border bg-background px-3 py-2" />
      <Button type="submit" disabled={busy}>{busy ? "Enviando…" : "Enviar"}</Button>
    </form>
  );
}
