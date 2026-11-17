import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useAccount } from "@/components/AccountProvider";
import { supabase } from "@/integrations/supabase/client";

import { isFreePath } from '@/lib/free-access';
import { GMAIL_ONLY_MESSAGE, isAllowedAccountEmail } from "@/lib/account-email";

export function AccessGate({ children }: { children: ReactNode }) {
  const { user } = useAccount();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [blocked, setBlocked] = useState(false);
  const observedTrials = useRef(new Set<string>());
  const [access, setAccess] = useState<{ has: boolean; daysLeft: number; paid: boolean; trialEnds?: string } | null>(null);

  useEffect(() => {
    supabase.from("page_visits").insert({ path: path.slice(0, 200), user_id: user?.id ?? null }).then(() => {});
  }, [path, user?.id]);

  useEffect(() => {
    let active = true;
    setAccess(null);
    if (!user) { setBlocked(false); return; }
    supabase.from("account_status").select("status").eq("user_id", user.id).maybeSingle()
      .then(({ data }) => {if(active) setBlocked(data?.status === "blocked");});
    supabase.rpc("my_access").then(({ data, error }) => {
      if(!active) return;
      const a = data?.[0]; if (error || !a) {setAccess({has:false,paid:false,daysLeft:0});return;}
      const paid = (!!a.paid_until && new Date(a.paid_until) > new Date()) || a.status === "gift";
      if (a.has_access && a.status === 'active' && !paid && Date.parse(a.trial_ends) > Date.now() && !observedTrials.current.has(user.id)) {
        const eventId = window.__lovableEvents?.track?.('project.beta_activated', { duration_days: 13 });
        if (eventId) observedTrials.current.add(user.id);
      }
      setAccess({ has: a.has_access, paid, daysLeft: Math.max(0, Math.ceil((+new Date(a.trial_ends) - Date.now()) / 864e5)), trialEnds:a.trial_ends });
    });
    return ()=>{active=false;};
  }, [user?.id, path]);

  const free = isFreePath(path);
  if (user && !free && !isAllowedAccountEmail(user.email)) {
    return (
      <main className="mx-auto max-w-md p-8 text-center">
        <h1 className="text-2xl font-black">Use una cuenta Gmail</h1>
        <p className="mt-3 text-muted-foreground">{GMAIL_ONLY_MESSAGE} Salga e ingrese con su correo @gmail.com.</p>
        <Link to="/auth" className="mt-6 inline-block rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground">Cambiar de cuenta</Link>
      </main>
    );
  }
  if(user && !free && !access) return <p role="status" className="p-8 text-center">Comprobando acceso…</p>;
  if (!blocked && !free && !user) {
    return (
      <main className="mx-auto max-w-md p-8 text-center">
        <h1 className="text-2xl font-black">🎁 Pruebe gratis 13 días</h1>
        <p className="mt-3 text-muted-foreground">Cree su cuenta para practicar, hacer simulacros y guardar su avance. Luego puede suscribirse por ₡2.500/año (estudiantes; ₡1.000 si su colegio está afiliado) o ₡3.500/año (público general).</p>
        <Link to="/auth" className="mt-6 inline-block rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground">Crear cuenta gratis</Link>
        <Link to="/legal" className="mt-3 block text-sm text-primary underline">Términos y condiciones</Link>
      </main>
    );
  }
  if (!blocked && !free && access && !access.has) {
    return (
      <main className="mx-auto max-w-md p-8 text-center">
        <h1 className="text-2xl font-black">⏳ Su prueba gratis terminó</h1>
        <p className="mt-3 text-muted-foreground">Puede seguir viendo el Inicio y la Biblioteca. Para practicar, hacer simulacros y competir en ligas, active su suscripción.</p>
        <Link to="/pagos" className="mt-6 inline-block rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground">Ver planes y pagar</Link>
        <Link to="/libros" className="mt-3 block text-sm text-primary underline">Ir a la Biblioteca</Link>
      </main>
    );
  }

  if (blocked && !["/", "/contacto", "/legal", "/auth"].includes(path)) {
    return (
      <main className="mx-auto max-w-md p-8 text-center">
        <h1 className="text-2xl font-black">Cuenta suspendida</h1>
        <p className="mt-3 text-muted-foreground">Su acceso está pausado. Escríbanos por WhatsApp al +506 6090 6359 para reactivarlo.</p>
        <a className="mt-6 inline-block rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground" href="https://wa.me/50660906359">Contactar soporte</a>
      </main>
    );
  }
  return (
    <>
      {access && access.has && !access.paid && access.daysLeft > 0 && access.daysLeft <= 13 && user && (
        <div className="bg-accent px-4 py-1 text-center text-sm font-bold text-accent-foreground">
          Su prueba gratuita de 13 días está activa · vence {access.trialEnds ? new Date(access.trialEnds).toLocaleDateString('es-CR',{timeZone:'America/Costa_Rica'}) : ''} · <Link to="/pagos" className="underline">Suscribirse</Link>
        </div>
      )}
      {children}
    </>
  );
}
