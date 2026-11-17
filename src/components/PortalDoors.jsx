import { Link } from "@tanstack/react-router";


const doors: PortalCard[] = [
  { to: "/explorar", icon: "🏫", title: "Escolar y Secundaria", desc: "Primaria, secundaria y materias MEP" },
  { to: "/especialidades", icon: "⚙️", title: "Colegios Técnicos", desc: "CTP 10.° a 12.°, especialidades y pruebas" },
  { to: "/explorar", icon: "🚗", title: "Teórica MOPT", desc: "Carro B1 y moto A1/A2" },
  { to: "/admision", icon: "🏛️", title: "Admisión Universitaria", desc: "Caminos TEC, UCR y preparación UTN" },
  { to: "/idiomas", icon: "🌍", title: "Academia de Idiomas", desc: "Niveles MCER A1–C1" },
  { to: "/docentes", icon: "👨‍🏫", title: "Zona Docente", desc: "Exámenes, planeamiento y grupos" },
];

export function PortalDoors() {
  return (
    <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
      {doors.map((d) => (
        <Link key={d.title} to={d.to} className="rounded-2xl border border-border bg-card p-4 shadow-card transition hover:border-primary focus-visible:outline-2 focus-visible:outline-primary">
          <span aria-hidden="true" className="text-3xl">{d.icon}</span>
          <p className="mt-2 font-black leading-tight">{d.title}</p>
          <p className="mt-1 text-xs text-muted-foreground">{d.desc}</p>
        </Link>
      ))}
    </div>
  );
}

