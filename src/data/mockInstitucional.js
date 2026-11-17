export const MOCK_INSTITUCIONAL_MEP = {
  region: "Dirección Regional de Educación de Alajuela",
  institucion: "Colegio Técnico Profesional (CTP) Mercedes Norte",
  ofertasEducativas: [
    {
      ciclo: "Tercer Ciclo",
      niveles: ["7mo", "8vo", "9no"],
      tipo: "Académico y Talleres Exploratorios",
      materiasBase: ["Español", "Matemática", "Estudios Sociales", "Ciencias", "Inglés", "Artes Industriales", "Hogar"]
    },
    {
      ciclo: "IV Ciclo Técnico",
      niveles: ["10mo", "11mo", "12mo"],
      tipo: "Educación Técnica Profesional",
      especialidades: [
        {
          nombre: "Desarrollo Web",
          subgrupos: ["Subgrupo A - Frontend React", "Subgrupo B - Backend Supabase"],
          modulos: ["Diseño de Interfaces", "Programación de Aplicaciones Web", "Bases de Datos Relacionales"]
        },
        {
          nombre: "Ciberseguridad",
          subgrupos: ["Subgrupo A - Redes y Firewalls", "Subgrupo B - Hardening y Auditoría"],
          modulos: ["Fundamentos de Redes", "Seguridad en Sistemas Operativos", "Gestión de Incidentes"]
        }
      ]
    }
  ]
};
"// Mock institucional inyectado correctamente para pruebas reales";