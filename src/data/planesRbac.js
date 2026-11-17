export const SUPERADMIN_EMAILS = [
  "maxi.salsa@gmail.com",
  "max.salazar.sanchez@mep.go.cr"
];

export const PLANES_OFICIALES = {
  superadmin: {
    id: "superadmin",
    nombre: "SuperAdmin Absoluto (Ing. Max Salazar Sánchez)",
    precio: "Control Total Soberano",
    badge: "bg-amber-500/15 text-amber-400 border-amber-500/40",
    descripcion: "Acceso total irrestricto a todos los módulos, delegación de roles, auditoría QA y activación de planes.",
    modulosPermitidos: [
      "superadmin_panel", "arena9m", "plans", "driving", "games",
      "certs", "aioffline", "wallet", "services", "announcements", "dashboard", "qa"
    ]
  },
  institucion_anual: {
    id: "institucion_anual",
    nombre: "Plan Institución / Centro Educativo (Anualidad)",
    precio: "₡250,000 / año (Cobertura Institucional)",
    badge: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    descripcion: "Para Colegios Técnicos (CTP), Liceos y Escuelas: habilita Analíticas, Comunicados, Comedor, Billetera, Docencia y Práctica.",
    modulosPermitidos: [
      "arena9m", "plans", "certs", "wallet", "services",
      "announcements", "dashboard", "driving", "games", "aioffline"
    ]
  },
  docente_particular: {
    id: "docente_particular",
    nombre: "Plan Docente Particular",
    precio: "₡6,500 / mes o ₡55,000 / año",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    descripcion: "Acceso a la Fábrica Pedagógica Automática (Planeamientos, Trabajos Cotidianos, Proyectos, Exámenes), Certificados y Banco 9M.",
    modulosPermitidos: ["plans", "arena9m", "certs", "aioffline", "games"]
  },
  estudiante_centro: {
    id: "estudiante_centro",
    nombre: "Plan Estudiante de Centro Educativo (Anualidad)",
    precio: "Incluido en Anualidad Institucional (₡12,000 / año)",
    badge: "bg-sky-500/15 text-sky-400 border-sky-500/30",
    descripcion: "Acceso a Banco 9M, Simulacros, Juegos, Tutor IA, Certificados, más Comedor Estudiantil, Horarios, Comunicados y CoopePago.",
    modulosPermitidos: [
      "arena9m", "driving", "games", "certs", "aioffline",
      "wallet", "services", "announcements"
    ]
  },
  estudiante_particular: {
    id: "estudiante_particular",
    nombre: "Plan Estudiante Particular",
    precio: "₡3,500 / mes o ₡25,000 / año",
    badge: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    descripcion: "Acceso individual a Aprender/Repasar/Simular (Banco 9M), Licencias MOPT, Juegos Lógicos, Tutor IA Offline y Certificados.",
    modulosPermitidos: ["arena9m", "driving", "games", "certs", "aioffline"]
  }
};

export function esSuperAdmin(user) {
  if (!user || !user.email) return false;
  return SUPERADMIN_EMAILS.includes(user.email.trim().toLowerCase()) || user.planId === "superadmin";
}

export function obtenerPlanUsuario(user) {
  if (esSuperAdmin(user)) return PLANES_OFICIALES.superadmin;
  const planKey = user?.planId || "estudiante_particular";
  return PLANES_OFICIALES[planKey] || PLANES_OFICIALES.estudiante_particular;
}

export function tienePermisoModulo(user, moduloId) {
  if (esSuperAdmin(user)) return true;
  const plan = obtenerPlanUsuario(user);
  return plan.modulosPermitidos.includes(moduloId);
}