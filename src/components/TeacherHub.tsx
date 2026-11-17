import { Link } from "@tanstack/react-router";

interface Tool { to: "/examenes-docentes" | "/planeamiento" | "/estudiantes" | "/insignias"; icon: string; title: string; desc: string }
const tools: Tool[] = [
  { to: "/examenes-docentes", icon: "📝", title: "Generar exámenes", desc: "Cree pruebas cronometradas de 4 opciones" },
  { to: "/planeamiento", icon: "🗂️", title: "Planeamiento DUA", desc: "Planes por nivel, materia y especialidad" },
  { to: "/insignias", icon: "🏅", title: "Insignias de estudiantes", desc: "Insignias por tema, simulacro aprobado y estado" },
  { to: "/estudiantes", icon: "👥", title: "Grupos y notas", desc: "Estudiantes, progreso y reportes" },
];

export function TeacherHub() {
  return (
    <section aria-label="Panel Zona Docente PRO" className="mx-auto mt-4 grid max-w-5xl gap-3 px-5 sm:grid-cols-3">
      {tools.map((t) => (
        <Link key={t.to} to={t.to} className="rounded-2xl border border-primary bg-card p-4 shadow-card focus-visible:outline-2 focus-visible:outline-primary">
          <span aria-hidden="true" className="text-3xl">{t.icon}</span>
          <p className="mt-1 font-black">{t.title}</p>
          <p className="text-xs text-muted-foreground">{t.desc}</p>
        </Link>
      ))}
    </section>
  );
}
