import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { useAccount } from "@/components/AccountProvider";
import { GMAIL_ONLY_MESSAGE, isAllowedAccountEmail } from "@/lib/account-email";
export const Route = createFileRoute("/auth")({staticData:{sitemap:false},
  head: () => ({
    meta: [
      { title: "Ingresar · pracTICAtecnica.com" },
      {
        name: "description",
        content: "Ingrese para guardar sus prácticas y progreso entre dispositivos.",
      },
      { property: "og:title", content: "Ingresar · pracTICAtecnica.com" },
      { property: "og:description", content: "Su cuenta de aprendizaje y progreso." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Auth,
});
function Auth() {
  const { user } = useAccount();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (user) void navigate({ to: "/panel" });
  }, [user, navigate]);
  async function social(provider: "google") {
    setBusy(true);
    setMessage("");
    try {
      const r = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: window.location.origin + "/auth" } });
      if (r.error) setMessage("No se pudo ingresar. Intente de nuevo.");
    } catch {
      setMessage("No se pudo ingresar.");
    } finally {
      setBusy(false);
    }
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (mode !== "forgot" && !isAllowedAccountEmail(email)) { setMessage(GMAIL_ONLY_MESSAGE); return; }
    setBusy(true);
    setMessage("");
    try {
      const r =
        mode === "signup"
          ? await supabase.auth.signUp({
              email,
              password,
              options: { emailRedirectTo: window.location.origin + "/auth" },
            })
          : mode === "forgot"
            ? await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + "/reset-password",
              })
            : await supabase.auth.signInWithPassword({ email, password });
      if (r.error)
        setMessage(
          mode === "login"
            ? "Revise su correo, contraseña y confirmación de cuenta."
            : "No se pudo enviar la solicitud. Intente de nuevo.",
        );
      else if (mode !== "login")
        setMessage(
          mode === "signup"
            ? "Revise su correo para confirmar la cuenta antes de ingresar."
            : "Si el correo está registrado, recibirá un enlace para cambiar su contraseña.",
        );
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="min-h-screen bg-hero">
      <SiteHeader />
      <section className="mx-auto max-w-md px-5 py-8">
        <h1 className="text-4xl font-black">
          {mode === "signup"
            ? "Crear cuenta"
            : mode === "forgot"
              ? "Recuperar acceso"
              : "Bienvenido"}
        </h1>
        <p className="mt-3 text-muted-foreground">Su avance, siempre con usted.</p>
        <div className="mt-6 grid gap-3">
          <Button disabled={busy} className="google-auth h-11" onClick={() => social("google")}>
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
              />
            </svg>
            Continuar con Google
          </Button>
        </div>
        <form onSubmit={submit} className="mt-6 grid gap-4">
          <p className="text-sm text-muted-foreground">{GMAIL_ONLY_MESSAGE}</p>
          <label className="grid gap-1">
            Correo Gmail
            <input
              type="email"
              required
              placeholder="nombre@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border bg-background p-3"
              autoComplete="email"
            />
          </label>
          {mode !== "forgot" && (
            <label className="grid gap-1">
              Contraseña
              <input
                type="password"
                minLength={8}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md border bg-background p-3"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
              />
            </label>
          )}
          <Button disabled={busy} type="submit">
            {busy
              ? "Espere…"
              : mode === "signup"
                ? "Registrarse"
                : mode === "forgot"
                  ? "Enviar enlace"
                  : "Ingresar"}
          </Button>
        </form>
        {message && (
          <p role="status" className="mt-4 text-sm">
            {message}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            variant="link"
            onClick={() => {
              setMode(mode === "signup" ? "login" : "signup");
              setMessage("");
            }}
          >
            {mode === "signup" ? "Ya tengo cuenta" : "Crear cuenta"}
          </Button>
          <Button variant="link" onClick={() => setMode("forgot")}>
            Olvidé mi contraseña
          </Button>
          <Link to="/">Practicar sin cuenta</Link>
        </div>
      </section>
    </main>
  );
}
