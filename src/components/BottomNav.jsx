import { Link } from "@tanstack/react-router";


const items = [
  { to: "/", icon: "🏠", label: "Inicio" },
  { to: "/libros", icon: "📚", label: "Libros" },
  { to: "/juegos", icon: "🎮", label: "Juegos" },
  { to: "/mi-avance", icon: "🏆", label: "Mi avance" },
];

export function BottomNav() {
  return (
    <nav aria-label="Navegación inferior" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-border bg-card/95 backdrop-blur md print:hidden">
      {items.map((i) => (
        <Link key={i.to} to={i.to} activeOptions={{ exact: i.to === "/" }} className="flex flex-col items-center gap-0.5 py-2 text-xs font-bold text-muted-foreground focus-visible:outline-2 focus-visible:outline-primary [&.active]:text-primary">
          <span aria-hidden="true" className="text-xl">{i.icon}</span>{i.label}
        </Link>
      ))}
    </nav>
  );
}

