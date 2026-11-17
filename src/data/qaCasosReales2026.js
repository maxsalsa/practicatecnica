export const QA_CASOS_REALES_2026 = {
  version: "2026.5.0-QAMaster",
  descripcion: "Datos de prueba parametrizados para QA, validación de horarios, asistencia QR/NFC, cálculo REAC 2026 y expedientes institucionales en Costa Rica.",
  casosInstituciones: [
    {
      id: 1,
      provincia: "Alajuela",
      institucion: "Colegio Técnico Profesional (CTP) Mercedes Norte",
      modalidad: "Educación Técnica Profesional",
      seccionEjemplo: "11-1",
      especialidadTecnica: "Desarrollo Web (Subgrupo A - Frontend React / Subgrupo B - Backend Supabase)",
      estudiantePrueba: {
        nombre: "Alejandro Salazar Mora",
        cedula: "208930412",
        promedioPonderado: 94.5,
        estadoAsistencia: "Presente - Validado por NFC / QR en Portón"
      }
    },
    {
      id: 2,
      provincia: "San José",
      institucion: "Colegio Científico de Costa Rica (Sede Central)",
      modalidad: "Colegio Científico / Académico Avanzado",
      seccionEjemplo: "12-A",
      enfasis: "Matemática Pura y Física Universitaria",
      estudiantePrueba: {
        nombre: "Lucía Fernández Blanco",
        cedula: "109230844",
        promedioPonderado: 98.2,
        estadoAsistencia: "Presente - Bloque Extendido de Física"
      }
    },
    {
      id: 3,
      provincia: "Cartago",
      institucion: "Colegio Humanístico Costarricense (Campus Cartago)",
      modalidad: "Colegio Humanístico",
      seccionEjemplo: "10-2",
      enfasis: "Filosofía, Literatura y Pensamiento Crítico",
      estudiantePrueba: {
        nombre: "Mateo Quirós Rojas",
        cedula: "305120987",
        promedioPonderado: 92.8,
        estadoAsistencia: "Presente - Cuaderno de Comunicaciones Firmado (SHA-256)"
      }
    },
    {
      id: 4,
      provincia: "Heredia",
      institucion: "Liceo de Heredia",
      modalidad: "Secundaria Académica Diurna",
      seccionEjemplo: "8-3",
      talleresExploratorios: "Artes Industriales e Informática Educativa",
      estudiantePrueba: {
        nombre: "Valeria Gómez Solís",
        cedula: "407890123",
        promedioPonderado: 89.1,
        estadoAsistencia: "Presente - Control de Comedor Escolar Ración #412"
      }
    },
    {
      id: 5,
      provincia: "Puntarenas",
      institucion: "CTP de Puntarenas",
      modalidad: "Educación Técnica y Náutica",
      seccionEjemplo: "12-Técnico",
      especialidadTecnica: "Gestión Portuaria y Acuicultura",
      estudiantePrueba: {
        nombre: "Carlos Mena Castro",
        cedula: "604560789",
        promedioPonderado: 91.0,
        estadoAsistencia: "Presente - Subgrupo B Práctica de Campo"
      }
    }
  ],
  verificacionQa: "Todos los casos responden al marco REAC 2026, generación de reportes PDF, autenticación por roles y trivias aleatorias."
};
"// Casos reales de QA inicializados correctamente";