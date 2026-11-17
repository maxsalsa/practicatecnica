import { Link } from "@tanstack/react-router";
import logo from "@/assets/promo/logo_cuadrado.jpg.asset.json";
import trivias from "@/assets/promo/promo_trivias.jpg.asset.json";
import aprende from "@/assets/promo/promo_aprende.jpg.asset.json";
import probala from "@/assets/promo/promo_probala.jpg.asset.json";

export const promoLogo = logo.url;

const banners = [
  { src: aprende.url, to: "/explorar", alt: "Aprendé practicando: trivias, juegos, pruebas y repasos", label: "🎯 Elegir materia" },
  { src: trivias.url, to: "/simulacro", alt: "Trivias, juegos y retos con seguimiento de su progreso (el código QR es decorativo)", label: "📝 Exámenes y simulacros" },
  { src: probala.url, to: "/ingreso", alt: "Practique para el examen de ingreso a colegios científicos, humanísticos y CTP", label: "🏫 Colegios y exámenes de ingreso" },
] as const;

export function PromoBanners() {
  return (
    <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
      {banners.map((b) => (
        <Link key={b.to} to={b.to} className="group block w-[88%] shrink-0 snap-center md:w-[48%]">
          <img src={b.src} alt={b.alt} loading="lazy" width={1672} height={941} className="w-full rounded-3xl border shadow-card transition group-hover:scale-[1.01]" />
          <span className="mt-2 block text-center font-bold text-primary">{b.label} →</span>
        </Link>
      ))}
    </div>
  );
}
