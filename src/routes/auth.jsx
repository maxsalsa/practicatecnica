import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { useAccount } from "@/components/AccountProvider";
import { GMAIL_ONLY_MESSAGE, isAllowedAccountEmail } from "@/lib/account-email";

const GOOGLE_CLIENT_ID = "669679702279-ldlbgldda2hi0meid6kfp4v5aaltdsct.apps.googleusercontent.com";

export const Route = createFileRoute("/auth")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Ingresar · practicatecnica.com · GICM" },
      { name: "description", content: "Ingrese con su cuenta oficial para sincronizar prácticas y progreso en practicatecnica.com." },
      { property: "og:title", content: "Ingresar · practicatecnica.com" },
      { property: "og:description", content: "Plataforma Educativa y Técnica de Costa Rica · GICM." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" }
    ]
  }),
  component: Auth
});

function Auth() {
  const { user } = useAccount();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) void navigate({ to: "/panel" });
  }, [user, navigate]);

  function loginGoogleDirectGicm() {
    setBusy(true);
    setMessage("");
    const redirectUri = window.location.origin;
    const nonce = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const authUrl =
      "https://accounts.google.com/o/oauth2/v2/auth" +
      "?client_id=" + encodeURIComponent(GOOGLE_CLIENT_ID) +
      "&redirect_uri=" + encodeURIComponent(redirectUri) +
      "&response_type=id_token" +
      "&scope=" + encodeURIComponent("openid email profile") +
      "&nonce=" + encodeURIComponent(nonce) +
      "&prompt=select_account";
    window.location.href = authUrl;
  }

  async function submit(e) {
    e.preventDefault();
    if (mode !== "forgot" && !isAllowedAccountEmail(email)) {
      setMessage(GMAIL_ONLY_MESSAGE);
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const r =
        mode === "signup"
          ? await supabase.auth.signUp({
              email,
              password,
              options: { emailRedirectTo: window.location.origin + "/auth" }
            })
          : mode === "forgot"
            ? await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + "/reset-password"
              })
            : await supabase.auth.signInWithPassword({ email, password });

      if (r.error) {
        setMessage(
          mode === "login"
            ? "Revise su correo, contraseña y confirmación de cuenta."
            : "No se pudo enviar la solicitud. Intente de nuevo."
        );
      } else if (mode !== "login") {
        setMessage(
          mode === "signup"
            ? "Revise su correo para confirmar la cuenta antes de ingresar."
            : "Si el correo está registrado, recibirá un enlace para cambiar su contraseña."
        );
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-hero">
      <SiteHeader />
      <section className="mx-auto max-w-md px-5 py-8">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
          Identidad Oficial GICM · practicatecnica.com
        </span>
        <h1 className="text-4xl font-black mt-1">
          {mode === "signup" ? "Crear cuenta" : mode === "forgot" ? "Recuperar acceso" : "Bienvenido"}
        </h1>
        <p className="mt-2 text-muted-foreground">Su avance, siempre sincronizado con usted.</p>

        <div className="mt-6 grid gap-3">
          <Button disabled={busy} className="google-auth h-11" onClick={loginGoogleDirectGicm}>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 mr-2">
              <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
              <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
            </svg>
            Continuar con Google · GICM
          </Button>
        </div>

        <form onSubmit={submit} className="mt-6 grid gap-4">
          <p className="text-sm text-muted-foreground">{GMAIL_ONLY_MESSAGE}</p>
          <label className="grid gap-1 text-sm font-semibold">
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
            <label className="grid gap-1 text-sm font-semibold">
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
            {busy ? "Espere..." : mode === "signup" ? "Registrarse" : mode === "forgot" ? "Enviar enlace" : "Ingresar"}
          </Button>
        </form>

        {message && (
          <p role="status" className="mt-4 text-sm font-medium text-indigo-700">
            {message}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-3 items-center">
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
          <Link to="/" className="text-sm font-semibold underline">
            Practicar sin cuenta
          </Link>
        </div>
      </section>
    </main>
  );
}