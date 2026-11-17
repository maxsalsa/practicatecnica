export const BADGE_TOPICS: { key: string; label: string; icon: string; match: RegExp }[] = [
  { key: "web", label: "Desarrollo Web", icon: "🌐", match: /web|html|css|javascript/i },
  { key: "security", label: "Ciberseguridad", icon: "🛡️", match: /seguridad|cyber|security/i },
  { key: "support", label: "Soporte TI", icon: "🧰", match: /soporte|support|hardware/i },
  { key: "python", label: "Python", icon: "🐍", match: /python/i },
  { key: "iot", label: "IoT", icon: "📡", match: /iot|internet de las cosas/i },
  { key: "network", label: "Redes", icon: "🔌", match: /red(es)?\b|network|ipv|subnet/i },
  { key: "software", label: "Diseño de software", icon: "🧩", match: /software|arquitect|architecture|qa\b/i },
  { key: "accounting", label: "Contabilidad", icon: "📒", match: /contab|accounting|costos|costs/i },
  { key: "finance", label: "Finanzas", icon: "💹", match: /finanz|finance|banca|banking/i },
  { key: "tourism", label: "Turismo y Hotelería", icon: "🏝️", match: /turismo|hotel|tourism/i },
  { key: "food", label: "Alimentos", icon: "🍽️", match: /aliment|food|cocina/i },
  { key: "electrical", label: "Electricidad", icon: "⚡", match: /electric/i },
  { key: "english", label: "Inglés", icon: "🇬🇧", match: /ingl|english/i },
  { key: "math", label: "Matemáticas", icon: "📐", match: /matem|math/i },
  { key: "science", label: "Ciencias", icon: "🔬", match: /cienc|science/i },
];
export function badgeTopic(title: string) {
  return BADGE_TOPICS.find(t => t.match.test(title)) ?? { key: "general", label: "General", icon: "🏅", match: /.*/ };
}
