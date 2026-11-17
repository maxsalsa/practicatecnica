export const MOTOR_GAMIFICADO_CTP = {
  version: "2026.1.1-GamificacionTotal",
  filosofiaPedagogica: "Diseño Universal para el Aprendizaje (DUA), desarrollo de competencias, razonamiento lógico y habilidades blandas.",
  miniProcesadorTextos: {
    activo: true,
    subArea: "Producción de Documentos (Word y Procesadores)",
    caracteristicas: "Editor minimalista rápido para práctica de formatos, sangrías, viñetas y normas de redacción técnica institucional."
  },
  triviasYRetosExcel: {
    activo: true,
    subArea: "Hoja Electrónica",
    bancoPreguntas: [
      {
        pregunta: "¿Cuál función de Excel se utiliza para buscar un valor en la primera columna de una tabla y devolver un valor en la misma fila desde otra columna?",
        opciones: ["=SUMA()", "=BUSCARV()", "=PROMEDIO()", "=SI()"],
        respuestaCorrecta: "=BUSCARV()",
        explicacionDUA: "Permite relacionar datos estructurados mediante una búsqueda vertical exacta o aproximada."
      },
      {
        pregunta: "Si desea obtener el valor más alto de un rango de notas entre B2 y B10, ¿qué fórmula debe aplicar?",
        opciones: ["=MIN(B2:B10)", "=MAX(B2:B10)", "=ALTO(B2:B10)", "=CONTAR(B2:B10)"],
        respuestaCorrecta: "=MAX(B2:B10)",
        explicacionDUA: "La función MAX evalúa el rango numérico y extrae el valor máximo."
      }
    ]
  },
  gamificacionYRecompensas: {
    sistemaXp: "Acumulación de puntos de experiencia (XP) por cada reto superado sin publicidad ni distracciones.",
    enfoqueInclusivo: "Adaptaciones de lectura clara, alto contraste y navegación intuitiva para todo el alumnado."
  }
};
"// Motor Gamificado CTP inicializado correctamente";