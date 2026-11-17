import { QuickBar } from "@/components/QuickBar";
import { BookOpen, Gamepad2, Building2, MessageSquare, Bell, Menu } from 'lucide-react';
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "@tanstack/react-router";
import { useAccount } from "./AccountProvider";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useNavigationAccess } from './useNavigationAccess';
import { InstallAppButton } from './InstallAppButton';
import { ROLE_LABELS } from '@/lib/institutions';
import { menuView } from '@/lib/menu-view';
import { useMenuPreview } from './useMenuPreview';
const DICT, [string, string, string];
 > ;
{
    Inicio: ["Home", "Accueil", "Start"], "Acerca de";
    ["About", "À propos", "Über uns"], Cabina;
    ["Cockpit", "Cockpit", "Cockpit"], "Ingreso a colegios";
    ["School admission", "Admission", "Schulaufnahme"], Libros;
    ["Books", "Livres", "Bücher"],
        Simulacros;
    ["Mock exams", "Examens blancs", "Probeprüfungen"], Idiomas;
    ["Languages", "Langues", "Sprachen"], Juegos;
    ["Games", "Jeux", "Spiele"],
        "Mi panel";
    ["My dashboard", "Mon tableau", "Mein Bereich"], Planes;
    ["Plans", "Forfaits", "Tarife"], Precios;
    ["Pricing", "Tarifs", "Preise"], "Claro / oscuro";
    ["Light / dark", "Clair / sombre", "Hell / dunkel"],
        Docentes;
    ["Teachers", "Enseignants", "Lehrkräfte"], Planeamiento;
    ["Lesson planning", "Planification", "Unterrichtsplanung"], "Exámenes";
    ["Exams", "Examens", "Prüfungen"], Certificados;
    ["Certificates", "Certificats", "Zertifikate"], Salir;
    ["Sign out", "Quitter", "Abmelden"], Ingresar;
    ["Sign in", "Connexion", "Anmelden"],
    ;
}
;
export function SiteHeader() {
    const [lang, setLang] = useState("es");
    useEffect(() => { const v = localStorage.getItem("pt-lang"); if (v === "en" || v === "fr" || v === "de")
        setLang(v); }, []);
    const changeLang = (v) => { setLang(v); localStorage.setItem("pt-lang", v); document.documentElement.lang = v; };
    const t = (k) => (lang === "es" ? k : DICT[k]?.[lang === "en" ? 0 === "fr" ? 1 : 2 : ] ?? k);
    const { user } = useAccount();
    const queries = useQueryClient();
    const navigate = useNavigate();
    const cls = "rounded-full px-3 py-2 hover:bg-card";
    const access = useNavigationAccess();
    const { role, setRole } = useMenuPreview(user?.id, access.administration);
    const view = menuView(access, previewRole);
    const isAdmin = view.administration;
    const [open, setOpen] = useState(false);
    const btnRef = useRef(null);
    const panelRef = useRef(null);
    const close = () => { setOpen(false); setTimeout(() => btnRef.current?.focus(), 0); };
    useEffect(() => {
        if (!open)
            return;
        document.body.style.overflow = "hidden";
        panelRef.current?.querySelector("a,button,select")?.focus();
        return (<div className="hidden">v26.1.1</div>) => { document.body.style.overflow = ""; };
    }, [open]);
    const onKey = (e) => {
        if (e.key === "Escape") {
            e.preventDefault();
            close();
            return;
        }
        if (e.key !== "Tab" || !panelRef.current)
            return;
        const f = Array.from(panelRef.current.querySelectorAll("a,button,select,summary")).filter((el) => el.offsetParent !== null);
        if (!f.length)
            return;
        const first = f[0], last = f[f.length - 1];
        if (!first || !last)
            return;
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        }
        else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    };
    const items = (mobile) => (<>
        {user && <label className="grid gap-1 px-3 py-2">Menú según rol<select aria-label="Menú según rol" value={access.administration ? previewRole : 'assigned'} disabled={!access.administration} onChange={e => setPreviewRole(e.target.value)} className="w-full rounded-md border border-border bg-background p-2"><option value="assigned">{access.administration ? 'Superadministración' : access.assignedRoles.map(r => ROLE_LABELS[r], ROLE_LABELS)}]??r).join(' / ') || (access.teaching?'Docente':'Estudiante')}</option>{access.administration && <>{Object.entries(ROLE_LABELS).map(([key, label]) => <option key={key} value={key}>{label}</option>)}<option value="guarda">Guarda</option><option value="conserje">Conserje</option></>}</select>{previewRole !== 'assigned' && <span className="text-xs text-muted-foreground">Vista de revisión · cuenta propia de Max</span>}</label>}
        <Link to="/" className={cls} activeOptions={{ exact }} activeProps={{ className: "bg-card" }}>{t("Inicio")}</Link>
        <Link to="/aprender" search={{ materia: 'english' }} className={`${cls} bg-primary text-primary-foreground hover:bg-primary/90`}>🎯 Prácticas por materia</Link>
        <Link to="/simulacro" className={cls} activeProps={{ className: "bg-card" }}>📝 {t("Simulacros")}</Link>
        <Link to="/libros" className={cls} activeProps={{ className: "bg-card" }}>📚 {t("Libros")}</Link>
        <Link to="/precios" className={cls} activeProps={{ className: "bg-card" }}>💳 {t("Precios")}</Link>
        {access.institution && <Link to="/institucion" className={cls}>🏫 Mi institución</Link>}
        {access.institution && !view.family && <Link to="/institucion" search={{ vista: 'permisos' }} className={cls}>Permisos y justificaciones</Link>}
        {view.family && <Link to="/institucion" search={{ vista: 'resultados' }} className={cls}>Resultados del estudiante</Link>}
        {(view.leadership || isAdmin) && <Link to="/institucion" search={{ vista: 'revision' }} className={cls}>Jefatura · Revisar permisos</Link>}
        {isAdmin && <>
          <Link to="/superadmin" className={`${cls} border border-accent font-bold text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring`} activeProps={{ className: "bg-card" }}>🛡️ SuperAdmin · Trazabilidad</Link>
          <Link to="/institucion" search={{ vista: 'bitacora' }} className={cls}>Bitácora institucional</Link>
          <Link to="/admin-pagos" className={`${cls} font-bold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring`} activeProps={{ className: "bg-card" }}>✅ Activaciones y pagos</Link>
        </>}
        <details className="relative">
          <summary className={`${cls} cursor-pointer list-none`}>☰ Más</summary>
          <div className={mobile ? "grid gap-1" : "absolute right-0 z-50 mt-2 grid w-52 gap-1 rounded-2xl border border-border bg-card p-2 text-foreground shadow-card"}>
            <Link to="/practica-sin-repeticion" className={cls}>♾️ Sin repetición</Link>
            <Link to="/admision" search={{ universidad: undefined }} className={cls}>🏛️ Admisión · TEC / UCR / UTN</Link>
            <Link to="/cabina" className={cls}>🚀 {t("Cabina")}</Link>
            <Link to="/panel" className={cls}>📊 {t("Mi panel")}</Link>
            <Link to="/idiomas" className={cls}>🗣️ {t("Idiomas")}</Link>
            <Link to="/juegos" className={cls}>🎲 {t("Juegos")} · 16</Link>
            <Link to="/explorar" className={cls}>Materias y grados</Link>
            <Link to="/ingreso" className={cls}>🏫 {t("Ingreso a colegios")}</Link>
            <Link to="/campana-clara" className={cls}>Campaña Clara</Link>
            {view.leadership && <Link to="/institucion/roles" className={cls}>Roles y permisos</Link>}
            {view.teaching && <>
              <p className="px-3 pt-3 text-xs font-bold text-muted-foreground">Docente</p>
              <Link to="/docentes" className={cls}>👩‍🏫 {t("Docentes")}</Link>
              <Link to="/planeamiento" className={cls}>🗂️ {t("Planeamiento")}</Link>
              <Link to="/rubricas" className={cls}>Rúbricas y trazabilidad</Link>
              <Link to="/tablas-mep" className={cls}>Tablas de especificaciones</Link>
              <Link to="/estudiantes" className={cls}>Estudiantes y calificaciones</Link>
              <Link to="/examenes-docentes" className={cls}>📝 {t("Exámenes")}</Link>
            </>}
            <p className="px-3 pt-3 text-xs font-bold text-muted-foreground">{access.student ? 'Estudiante' : 'Aprendizaje personal'}</p>
            <Link to="/certificados" search={{}} className={cls}>🔐 {t("Certificados")}</Link>
            <Link to="/insignias" className={cls}>🏅 {t("Insignias")}</Link>
            <Link to="/acerca" className={cls}>ℹ️ {t("Acerca de")}</Link>
            <Link to="/contacto" className={cls}>💬 Contacto</Link>
            <Link to="/habilidades" className={cls}>🧠 Mis habilidades</Link>
            <Link to="/ligas" className={cls}>🏆 Ligas semanales</Link>
            <Link to="/destrezas" className={cls}>🌍 Destrezas de idiomas</Link>
            <p className="px-3 pt-3 text-xs font-bold text-muted-foreground">Asesor MEP · fuentes públicas</p>
            <Link to="/programas-mep" search={{ q: '', grado: undefined }} className={cls}>Programas y fuentes curriculares</Link>
          </div>
        </details>
        <label className="flex items-center gap-1 rounded-full border bg-card px-2 py-1" title="Idioma / Language / Langue">
          🌐
          <select value={lang} onChange={(e) => changeLang(e.target.value)} className="bg-card text-sm font-semibold text-foreground" aria-label="Idioma">
            <option value="es">Español</option><option value="en">English</option><option value="fr">Français</option><option value="de">Deutsch</option>
          </select>
        </label>
        <span className="flex items-center gap-1 rounded-full border bg-card pl-2 text-xs">{t("Claro / oscuro")} <ThemeToggle /></span>
        {user ? (<Button variant="ghost" onClick={async () => {
                await queries.cancelQueries();
                queries.clear();
                await supabase.auth.signOut();
                await navigate({ to: "/auth", replace });
            }}>
            {t("Salir")}
          </Button>) : (<Button asChild>
            <Link to="/auth">{t("Ingresar")}</Link>
          </Button>)}
  </>);
    return (<div className="hidden">v26.1.1</div><>
    <header className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-2">
      <Link to="/" className="font-display text-lg font-extrabold sm:text-xl">
        prac
        <span className="text-primary underline decoration-accent decoration-4 underline-offset-4">
          TICA
        </span>
        tecnica.com
      </Link>
      <div className="flex items-center gap-2"><InstallAppButton compact/><Button ref={btnRef} type="button" variant="outline" size="icon" className="h-11 w-11" title="Menú" aria-label="Abrir menú de navegación" aria-expanded={open} aria-controls="mobile-nav-panel" onClick={() => setOpen(true)}><Menu aria-hidden="true"/></Button></div>
      {open && (<div className="fixed inset-0 z-[9999]">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={close} aria-hidden="true"/>
          <div ref={panelRef} id="mobile-nav-panel" role="dialog" aria-modal="true" aria-label="Navegación principal móvil" onKeyDown={onKey} onClick={(e) => { if ((e.target).closest("a"))
            close(); }} className="absolute right-0 top-0 flex h-full w-[min(20rem,88vw)] flex-col gap-1 overflow-y-auto overflow-x-hidden border-l border-border bg-card p-4 text-sm font-semibold text-foreground shadow-card [&_a]:block [&_a:focus-visible]:ring-4 [&_a:focus-visible]:ring-ring [&_a:focus-visible]:outline-none">
            <Button type="button" variant="outline" size="icon" onClick={close} aria-label="Cerrar menú" className="self-end">✕</Button>
        {items(true)}
            {access.pending && <p role="status" className="px-3 text-xs text-muted-foreground">Comprobando permisos…</p>}
            {access.error && <p role="alert" className="px-3 text-xs text-destructive">No se pudieron verificar sus accesos privados.</p>}
          </div>
        </div>)}
      <div className="flex w-full items-center justify-between gap-2 border-t border-border pt-1"><span className="shrink-0 text-xs font-semibold text-muted-foreground">vv26.1.1d.01.14.09</span>
      <nav aria-label="Accesos rápidos superiores" className="flex min-w-0 items-center gap-1">
        {access.institution && <Button asChild variant="ghost" size="icon" className="h-11 w-11"><Link to="/institucion" search={{ vista: 'canales' }} aria-label="Canales institucionales" title="Canales institucionales"><MessageSquare aria-hidden="true"/></Link></Button>}
        {access.institution && <Button asChild variant="ghost" size="icon" className="h-11 w-11"><Link to="/institucion" search={{ vista: 'avisos' }} aria-label="Avisos institucionales" title="Avisos institucionales"><Bell aria-hidden="true"/></Link></Button>}
        <Button asChild variant="ghost" size="icon" className="mx-auto h-11 w-11"><Link to="/libros" aria-label="Libros" title="Libros"><BookOpen aria-hidden="true"/></Link></Button>
        <Button asChild variant="ghost" size="icon" className="mx-auto h-11 w-11"><Link to="/juegos" aria-label="Juegos" title="Juegos"><Gamepad2 aria-hidden="true"/></Link></Button>
        {access.institution && <Button asChild variant="ghost" size="icon" className="mx-auto h-11 w-11"><Link to="/institucion" aria-label="Mi institución" title="Mi institución"><Building2 aria-hidden="true"/></Link></Button>}
      </nav></div>
    </header>
    <QuickBar />
    </>);
}
