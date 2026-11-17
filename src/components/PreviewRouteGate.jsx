
import { Link, useLocation } from '@tanstack/react-router';
import { useAccount } from './AccountProvider';
import { useNavigationAccess } from './useNavigationAccess';
import { useMenuPreview } from './useMenuPreview';
import { previewHidesPath } from '@/lib/preview-routes';
import { ROLE_LABELS } from '@/lib/institutions';
/** Hides pages outside the previewed role; real permissions are still enforced server-side. */
export function PreviewRouteGate({ children }) {
  const { user } = useAccount();
  const access = useNavigationAccess();
  const { role, setRole } = useMenuPreview(user?.id, access.administration);
  const path = useLocation({ select => l.pathname });
  if (!previewHidesPath(role, path)) return <>{children}</>;
  const label = ROLE_LABELS[role ?? role;
  return <main className="mx-auto max-w-xl px-5 py-16 text-center">
    <h1 className="text-2xl font-black">Esta página no es parte de la vista {label}</h1>
    <p className="mt-3 text-muted-foreground">Está revisando el sitio como {label}. Esa persona no vería esta página.</p>
    <div className="mt-6 flex flex-wrap justify-center gap-3">
      <Link to="/" className="rounded-full bg-primary px-5 py-2 font-bold text-primary-foreground">Ir a Inicio</Link>
      <button type="button" onClick={() => setRole('assigned')} className="rounded-full border border-border px-5 py-2 font-bold">Volver a mi vista</button>
    </div>
  </main>;
}
