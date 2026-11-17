import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, forwardRef } from "react";
import { loadStreak } from "@/lib/profile";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "@/components/AccountProvider";
import { readAttempts } from "@/lib/cloud-progress";
import { aggregateAttempts, costaRicaDay } from "@/lib/progress-data";
import { findSpecialties } from "@/lib/material-search";
import { findStudyPaths } from "@/lib/study-paths";
import { findOfficialPrograms, searchedGrade } from "@/lib/official-programs";
import { matchesMoptSource, officialMoptSource } from '@/lib/official-mopt-source';
import { findCurriculumBlocks } from '@/lib/curriculum-search';
import { findLearningSubjects } from '@/lib/learning-paths';
import { useNavigationAccess } from './useNavigationAccess';
import { BackButton } from './BackButton';

type Dest = "/juegos" | "/arena" | "/sexto" | "/especialidades" | "/explorar" | "/simulacro" | "/idiomas" | "/docentes" | "/libros" | "/ruleta" | "/habilidades" | "/planeamiento" | "/examenes-docentes" | "/estudiantes" | "/ligas" | "/certificados" | "/temario" | "/metrologia" | "/practicas";

const entries: Entry[] = [
  { to: "/sexto", label: "🏫 Escolar y Secundaria", keys: "primaria sexto septimo 7 matematica español ciencias estudios sociales" },
  { to: "/especialidades", label: "⚙️ Especialidades CTP", keys: "ctp tecnico decimo web programacion redes contabilidad electrotecnia agroecologia" },
  { to: "/explorar", label: "🚗 Teórica MOPT", keys: "mopt licencia carro moto manejo teorico conducir explorar buscar" },
  { to: "/simulacro", label: "🏛️ Simulacros y admisión", keys: "ucr tec una utn admision simulacro simulacros examen examenes prueba pruebas cronometrado bachillerato" },
  { to: "/idiomas", label: "🌍 Idiomas", keys: "ingles frances portugues aleman mandarin mcer" },
  { to: "/libros", label: "📚 Libros y resúmenes", keys: "libros material materiales resumen resumenes guia cuadernillo pdf filosofia musica fisica quimica biologia deportes" },
  { to: "/juegos", label: "🎮 Juegos del saber", keys: "juegos juego bingo gato ranas puente palabras logica misterio rol duelo pc reto retos desafio jugar competir ciberseguridad redes soporte agropecuaria industrial infraestructura accounting costos finanzas empresa" },
  { to: "/ruleta", label: "Ruleta del saber", keys: "ruleta trivia" },
  { to: "/habilidades", label: "🏆 Mi progreso", keys: "progreso habilidades destrezas" },
  { to: "/ligas", label: "🥇 Ligas", keys: "liga ranking puntos" },
  { to: "/certificados", label: "📜 Certificados", keys: "certificado verificar" },
  { to: "/docentes", label: "👨‍🏫 Zona Docente", keys: "docente profesor" },
  { to: "/planeamiento", label: "🗂️ Planeamiento DUA", keys: "planeamiento dua docente" },
  { to: "/examenes-docentes", label: "📝 Generador de exámenes", keys: "examen generar docente prueba" },
  { to: "/estudiantes", label: "👥 Grupos y estudiantes", keys: "grupos estudiantes notas asistencia" },
  { to: "/temario", label: "📋 Temario", keys: "temario temas" },
  { to: "/practicas", label: "✍️ Prácticas guiadas", keys: "practica practicas ejercicios ejercicio repasar" },
  { to: "/metrologia", label: "📏 Metrología", keys: "metrologia medicion" },
];
const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export interface QuickBarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const QuickBar = forwardRef<HTMLDivElement, QuickBarProps>(function QuickBar({ className = "", ...props }, ref) {
  const [q, setQ] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [localStreak, setLocalStreak] = useState({ count: 0, xp: 0 });
  const { user } = useAccount();
  const access = useNavigationAccess();
  useEffect(() => { const s = loadStreak(); setLocalStreak({ count: s.count, xp: s.xpDay === costaRicaDay() ? s.xp : 0 }); }, []);
  const cloud = useQuery({
    queryKey: ["header-streak", user?.id], enabled: !!user, staleTime: 60_000,
    queryFn: async () => { if (!user) return { count: 0, xp: 0 }; const st = aggregateAttempts(await readAttempts(user.id)).streak; return { count: st.count, xp: st.xp }; },
  });
  const streak = user ? cloud.data ?? { count: 0, xp: 0 } : localStreak;
  const hits = useMemo(() => {
    const t = norm(q.trim());
    if (!t) return [];
    const words = t.split(/\s+/).filter((w) => w.length > 1 && !["de", "la", "el", "en", "para", "los", "las", "un", "una"].includes(w));
    return entries
      .filter(e => access.teaching || !['/docentes', '/planeamiento', '/examenes-docentes', '/estudiantes'].includes(e.to))
      .map((e) => { const hay = norm(e.label + " " + e.keys); return { e, n: words.filter((w) => hay.includes(w) || hay.includes(w.slice(0, -1))).length }; })
      .filter((x) => x.n > 0)
      .sort((a, b) => b.n - a.n)
      .slice(0, 6)
      .map((x) => x.e);
  }, [q, access.teaching]);
  const specialties = q.trim() ? findSpecialties(q).filter(book => book.code).slice(0, 6) : [];
  const paths = q.trim() ? findStudyPaths(q) : [];
  const programs = q.trim() ? findOfficialPrograms(q).slice(0, 3) : [];
  const showMopt = matchesMoptSource(q);
  const blocks=findCurriculumBlocks(q);
  const learning=scopedQuerySafe(q) ? [] : findLearningSubjects(q);
  const scopedQuery = /\b(tec|ucr|utn|mep)\b/i.test(q) || searchedGrade(q) !== undefined;
  const permissionMatch = access.institution && /permiso|justifica|comprobante|loxium|jefatura|director/i.test(norm(q));
  return (
    <div ref={ref} {...props} className={`mx-auto max-w-5xl px-5 print:hidden ${className}`} onKeyDown={(event) => { props.onKeyDown?.(event); if (event.key === "Escape") setExpanded(false); }}>
      <div className="flex flex-wrap items-center gap-2">
        <BackButton />
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Buscar materia, idioma o simulacro</span>
          <input type="search" value={q} onFocus={() => setExpanded(true)} onChange={(e) => { setQ(e.target.value); setExpanded(true); }} aria-expanded={expanded && Boolean(q.trim())} aria-controls="study-search-results" placeholder="🔎 Buscar materia, idioma o simulacro…" className="w-full rounded-full border border-border bg-card px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring" />
          {expanded && q.trim() && (
            <ul id="study-search-results" aria-label="Resultados de búsqueda" onClick={(event) => { if ((event.target as HTMLElement).closest("a")) setExpanded(false); }} className="absolute inset-x-0 top-full z-50 mt-1 max-h-80 overflow-y-auto overscroll-contain rounded-lg border border-border bg-card shadow-card">
              {permissionMatch && <>
                <li><Link to="/institucion" search={{vista:'permisos'}} onClick={()=>setQ('')} className="block px-4 py-2 text-sm font-semibold hover:bg-muted">Permisos y justificaciones · Mis solicitudes</Link></li>
                {(access.leadership || access.administration) && <li><Link to="/institucion" search={{vista:'revision'}} onClick={()=>setQ('')} className="block px-4 py-2 text-sm font-semibold hover:bg-muted">Jefatura · Revisar permisos y comprobantes</Link></li>}
              </>}
              {learning.map(subject=><li key={subject.id}><Link to="/aprender" search={{materia:subject.id}} onClick={()=>setQ('')} className="block px-4 py-2 text-sm font-semibold hover:bg-muted focus-visible:bg-muted">{subject.emoji} {subject.title} · 3 prácticas y 3 simulacros</Link></li>)}
              {blocks.map(block=><li key={block.id}><Link to="/explorar" search={{banco:block.id}} onClick={()=>setQ('')} className="block px-4 py-2 text-sm font-semibold hover:bg-muted focus-visible:bg-muted">{block.title} · {block.questionCount} ejercicios originales</Link></li>)}
              {showMopt && <li><a href={officialMoptSource.url} target="_blank" rel="noreferrer" className="block px-4 py-2 text-sm font-semibold text-primary hover:bg-muted focus-visible:bg-muted">MOPT · Manuales 2026: información oficial de adquisición (no PDF)</a></li>}
              {paths.map(path => <li key={path.id}><Link to="/admision" search={{universidad:path.id}} onClick={()=>setQ('')} className="block px-4 py-2 text-sm font-semibold hover:bg-muted focus-visible:bg-muted">🏛️ Su camino · {path.name}</Link></li>)}
              {programs.map(program => <li key={program.id}><Link to="/programas-mep" search={{q:program.subject,grado:searchedGrade(q)}} onClick={()=>setQ('')} className="block px-4 py-2 text-sm font-semibold hover:bg-muted focus-visible:bg-muted">📚 {program.title} · Fuente; cotejo pendiente</Link></li>)}
              {specialties.map(book => <li key={book.code}><Link to="/especialidades" search={{ code: book.code }} onClick={() => setQ("")} className="block px-4 py-2 text-sm font-semibold hover:bg-muted focus-visible:bg-muted focus-visible:outline-none">📘 {book.title}</Link></li>)}
              {!scopedQuery && hits.slice(0, specialties.length ? 2 : 6).map((h) => (<li key={h.to}><Link to={h.to} onClick={() => setQ("")} className="block px-4 py-2 text-sm font-semibold hover:bg-muted focus-visible:bg-muted focus-visible:outline-none">{h.label}</Link></li>))}
              {!permissionMatch && !scopedQuery && !hits.length && !specialties.length && !paths.length && !programs.length && !blocks.length && !showMopt && <li className="px-4 py-3 text-sm text-muted-foreground" role="status">Sin resultados. Pruebe otra materia o actividad.</li>}
              {!permissionMatch && scopedQuery && !paths.length && !programs.length && !specialties.length && !blocks.length && <li className="px-4 py-3 text-sm text-muted-foreground" role="status">No hay material catalogado para esa selección; no se sustituye por otro grado o universidad.</li>}
            </ul>
          )}
        </label>
        <Link to="/habilidades" aria-label={`Racha de ${streak.count} días y ${streak.xp} puntos hoy`} className="flex shrink-0 gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-black">
          <span>🔥 {streak.count}</span><span>⚡ {streak.xp} XP</span>
        </Link>
      </div>
    </div>
  );
});
function scopedQuerySafe(q:string){return /\b(tec|ucr|utn|mep)\b/i.test(q)||searchedGrade(q)!==undefined;}

