import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
export const Route = createFileRoute("/reset-password")({staticData:{sitemap:false},
  head: () => ({
    meta: [{ title: "Nueva contraseña · pracTICAtecnica.com" },
      { name: "description", content: "Recupere el acceso a su cuenta de práctica." },
      { property: "og:title", content: "Nueva contraseña · pracTICAtecnica.com" },
      { property: "og:description", content: "Restablezca su contraseña de forma segura." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Reset,
});
function Reset() {
  const [valid, setValid] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    setValid(
      window.location.hash.includes("type=recovery") || window.location.search.includes("code="),
    );
  }, []);
  return (
    <main>
      <SiteHeader />
      <section className="mx-auto max-w-md px-5 py-10">
        <h1 className="text-3xl font-black">Nueva contraseña</h1>
        {valid ? (
          <form
            className="mt-5 grid gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setBusy(true);
              const { error } = await supabase.auth.updateUser({ password });
              setMessage(
                error
                  ? "El enlace expiró o no es válido. Solicite uno nuevo."
                  : "Contraseña actualizada.",
              );
              setBusy(false);
            }}
          >
            <label>
              Contraseña nueva
              <input
                required
                minLength={8}
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-md border bg-background p-3"
              />
            </label>
            <Button disabled={busy}>Guardar contraseña</Button>
          </form>
        ) : (
          <p className="mt-4">Abra el enlace de recuperación enviado a su correo.</p>
        )}
        <p role="status" className="mt-4">
          {message}
        </p>
        <Link to="/auth" className="text-primary">
          Volver a ingresar
        </Link>
      </section>
    </main>
  );
}
