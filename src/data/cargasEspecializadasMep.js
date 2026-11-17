export const CARGAS_ESPECIALIZADAS_MEP = {
  version: "2026.1.1-CargasEspeciales",
  modalidadesEspecificas: [
    {
      tipo: "I y II Ciclos (Primaria MEP)",
      duracionLeccion: "40 o 60 minutos según jornada",
      cargaParticular: "Español, Matemáticas, Estudios Sociales, Ciencias, Inglés, Educación Física, Música, Artes Plásticas y Hogar integradas."
    },
    {
      tipo: "Colegios Científicos Costarricenses (CCC)",
      duracionLeccion: "Bloques extendidos de 60 a 90 minutos",
      cargaParticular: "Profundización avanzada en Matemática Pura, Física Universitaria, Química Orgánica, Biología Celular y Metodología de Investigación."
    },
    {
      tipo: "Colegios Humanísticos",
      duracionLeccion: "Bloques de 60 a 80 minutos",
      cargaParticular: "Filosofía, Literatura Universal, Historia de la Cultura, Latín/Griego o Idiomas Extranjeros avanzados y Pensamiento Crítico."
    },
    {
      tipo: "Colegios Ambientales y Ecológicos",
      duracionLeccion: "Lecciones estándar con bloques de campo de 80+ minutos",
      cargaParticular: "Gestión Ambiental, Ecología Aplicada, Sostenibilidad, Ciencias de la Tierra y Proyectos de Proyección Comunitaria."
    },
    {
      tipo: "Colegios Deportivos",
      duracionLeccion: "Bloques duales (Académico mañanas / Entrenamiento tardes)",
      cargaParticular: "Anatomía y Fisiología del Deporte, Nutrición Deportiva, Psicología del Rendimiento y Bloques masivos de Entrenamiento Físico Especializado."
    }
  ],
  motorCalculoHorarioDiferenciado: {
    activo: true,
    regla: "Adaptación automática de marcas de tiempo, duraciones de lección (40m, 60m, 90m) y asignación de espacios físicos exclusivos según el perfil institucional."
  }
};
"// Módulo de cargas especializadas inicializado correctamente";