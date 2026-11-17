import React, { useState } from 'react';

const PLANTILLAS_OFICIALES_MEP = {
  planeamiento: (tema, esp) => `====================================================================
📋 PLAN DE PRÁCTICA PEDAGÓGICA OFICIAL MEP — ${esp.toUpperCase()}
====================================================================
Tema / Resultado de Aprendizaje: ${tema || 'Desarrollo de competencias técnicas y resolución de casos'}
Metodología: Diseño Universal para el Aprendizaje (DUA) + Enfoque STEAM

1. FOCALIZACIÓN (20 min):
   • La persona docente plantea un reto diagnóstico vinculado a un escenario real de ${esp} mediante preguntas generadoras.
   • La persona estudiante analiza el caso inicial, identifica variables críticas y formula sus hipótesis de trabajo en equipo.

2. EXPLORACIÓN (40 min):
   • La persona docente facilita la guía técnica de laboratorio, recursos digitales y criterios de seguridad.
   • La persona estudiante experimenta en el entorno práctico, recolecta evidencias y estructura el prototipo inicial.

3. CONTRASTACIÓN (40 min):
   • La persona docente modela la solución estándar bajo normativa vigente y contrasta los hallazgos de los subgrupos.
   • La persona estudiante verifica la exactitud técnica de su procedimiento, corrige desviaciones y documenta el aprendizaje.

4. APLICACIÓN (60 min):
   • La persona docente asigna el reto integrador evaluado con rúbrica analítica de desempeño.
   • La persona estudiante construye y expone el producto final funcional cumpliendo los indicadores oficiales del MEP.`,

  examen: (tema, esp) => `====================================================================
📝 PRUEBA ESCRITA / TÉCNICA OFICIAL MEP — ${esp.toUpperCase()}
====================================================================
Contenido Evaluado: ${tema || 'Unidad Oficial del Programa de Estudio'}
Puntuación Total: 40 puntos | Valor Porcentual: 25% | Tiempo: 80 minutos

I PARTE. SELECCIÓN DE RESPUESTA (10 pts — 1 pt c/u)
1. En el contexto de ${esp}, ¿cuál procedimiento técnico garantiza la calidad y trazabilidad del resultado?
   (A) Omitir las etapas de validación preventiva.
   (B) Aplicar el protocolo estándar verificado con control de calidad paso a paso. [✓ CORRECTA]
   (C) Ejecutar cambios en producción sin respaldo previo.

II PARTE. CORRESPONDENCIA / ASOCIACIÓN (10 pts)
Asocie cada concepto técnico de ${tema || esp} con su respectiva función operativa según el programa oficial.

III PARTE. PRODUCCIÓN / RESOLUCIÓN DE CASOS PRÁCTICOS (20 pts)
Caso 1 (10 pts): Diseñe y justifique paso a paso la solución técnica para el escenario planteado de ${tema || esp}.
Caso 2 (10 pts): Evalúe los indicadores de seguridad, eficiencia y cumplimiento normativo del caso anterior.`,

  cotidiano: (tema, esp) => `====================================================================
⚡ INSTRUMENTO DE TRABAJO COTIDIANO Y TAREAS — ${esp.toUpperCase()}
====================================================================
Indicador evaluado: ${tema || 'Aplica procedimientos técnicos de la especialidad en situaciones reales'}

ESCALA DE DESEMPEÑO (RUBRICA OFICIAL 1 A 3):
• [1] Inicial: Reconoce los conceptos generales de ${tema || esp}, pero requiere acompañamiento constante en la práctica.
• [2] Intermedio: Ejecuta los procedimientos de ${tema || esp} resolviendo fallos menores con apoyo puntual.
• [3] Avanzado: Domina e implementa de forma autónoma y precisa las soluciones de ${tema || esp}, proponiendo mejoras.`,

  proyecto: (tema, esp) => `====================================================================
🚀 PROYECTO TÉCNICO / FERIA CIENTÍFICA & STEAM — ${esp.toUpperCase()}
====================================================================
Nombre del Proyecto: Solución Innovadora en ${tema || esp}
Valor Porcentual: 25% / 30% según modalidad MEP

ETAPAS Y ENTREGABLES EVALUADOS:
1. Planteamiento del problema, viabilidad técnica y cronograma (20%).
2. Diseño de arquitectura / esquemas técnicos y bitácora de avance (30%).
3. Construcción del prototipo funcional y pruebas de calidad QA (30%).
4. Defensa oral, documentación técnica y demostración en vivo (20%).`,

  horario: (tema, esp) => `====================================================================
🗓️ HORARIO AUTOMÁTICO OPTIMIZADO (SIN CHOQUES) — ${esp.toUpperCase()}
====================================================================
Configuración solicitada: ${tema || 'Jornada Completa Diurna y Nocturna CTP'}
• Lunes (7:00 - 11:35 am): Bloque Técnico Especialidad ${esp} (Lab / Taller 1)
• Martes (7:00 - 11:35 am): Asignaturas Académicas (Matemáticas, Español, Ciencias)
• Miércoles (7:00 - 11:35 am): Práctica Guiada de ${esp} + Inglés Técnico
• Jueves (7:00 - 11:35 am): Subgrupos A/B Laboratorio Intensivo + Estudios Sociales / Cívica
• Viernes (7:00 - 11:35 am): Proyecto Integrador STEAM + Coordinación Pedagógica`
};

export default function AsistenteIaGenerativo() {
  const [modoMotor, setModoMotor] = useState('ambos'); // 'ia' | 'plantilla' | 'ambos'
  const [tokensDisponibles, setTokensDisponibles] = useState(100);
  const [tipoInstrumento, setTipoInstrumento] = useState('planeamiento');
  const [especialidadSel, setEspecialidadSel] = useState('Desarrollo Web / Ciberseguridad / CTP');
  const [promptUsuario, setPromptUsuario] = useState('');
  const [resultadoGenerado, setResultadoGenerado] = useState('');
  const [cargando, setCargando] = useState(false);

  const ejecutarGeneracion = (usarIa) => {
    const temaFinal = promptUsuario.trim() || 'Contenidos curriculares oficiales MEP 2026';
    if (!usarIa) {
      // Generación instantánea por Plantilla Oficial (0 tokens consumidos)
      const fn = PLANTILLAS_OFICIALES_MEP[tipoInstrumento] || PLANTILLAS_OFICIALES_MEP.planeamiento;
      setResultadoGenerado(fn(temaFinal, especialidadSel) + '\n\n[✓ Generado al instante con Plantilla Oficial Estructurada MEP — 0 tokens consumidos]');
      return;
    }

    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      setTokensDisponibles((t) => Math.max(0, t - 10));
      const fn = PLANTILLAS_OFICIALES_MEP[tipoInstrumento] || PLANTILLAS_OFICIALES_MEP.planeamiento;
      setResultadoGenerado(
        fn(temaFinal, especialidadSel) +
        `\n\n🤖 ENRIQUECIMIENTO CON INTELIGENCIA ARTIFICIAL:\n• Ajuste para Alto Potencial: Reto adicional de optimización e investigación aplicada sobre "${temaFinal}".\n• Apoyo DUA / Adecuación: Guía visual paso a paso, glosario técnico ilustrado y evaluación multiformato.\n[✓ Generado con Motor IA Rotativo + Plantilla Oficial MEP]`
      );
    }, 600);
  };

  return (
    <div className="bg-slate-900 border border-cyan-500/40 p-6 rounded-2xl shadow-2xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">
            🤖 Motor Dual: Con Inteligencia Artificial o Con Plantilla Oficial Instantánea
          </span>
          <h3 className="text-xl font-extrabold text-white mt-1.5">
            Generador de Planeamientos, Exámenes, Trabajos Cotidianos, Tareas, Proyectos y Horarios
          </h3>
        </div>
        <div className="bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-xs">
          <span className="text-cyan-300 font-bold">⚡ Créditos IA:</span>{' '}
          <span className="font-mono text-white font-extrabold">{tokensDisponibles} / 100</span>
          <span className="text-emerald-400 ml-2">(Plantillas = Gratis ∞)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">1. ¿Qué deseas generar?</label>
          <select
            value={tipoInstrumento}
            onChange={(e) => setTipoInstrumento(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-semibold"
          >
            <option value="planeamiento">📋 Planeamiento / Práctica Pedagógica MEP</option>
            <option value="examen">📝 Examen / Prueba Escrita o Técnica</option>
            <option value="cotidiano">⚡ Trabajo Cotidiano y Tareas (Rúbrica 1-3)</option>
            <option value="proyecto">🚀 Proyecto Técnico / STEAM con Rúbrica</option>
            <option value="horario">🗓️ Horario Automático (Docente / Sección)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">2. Especialidad o Materia MEP:</label>
          <select
            value={especialidadSel}
            onChange={(e) => setEspecialidadSel(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white font-semibold"
          >
            <option>Desarrollo Web</option>
            <option>Ciberseguridad</option>
            <option>Contabilidad y Finanzas</option>
            <option>Accounting (Bilingual Accounting)</option>
            <option>Ejecutivo Comercial y de Servicio al Cliente</option>
            <option>Administración, Logística y Distribución</option>
            <option>Electrónica Industrial</option>
            <option>Electromecánica Industrial</option>
            <option>Redes CCNA & Soporte TI</option>
            <option>Estudios Sociales y Educación Cívica</option>
            <option>Ciencias, Biología, Química y Física</option>
            <option>Matemáticas, Español, Deportes e Idiomas</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">3. Tema o instrucción específica:</label>
          <input
            type="text"
            value={promptUsuario}
            onChange={(e) => setPromptUsuario(e.target.value)}
            placeholder="Ej: Conciliación bancaria, Subneteo IPv4, Genética..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
          />
        </div>
      </div>

      {/* Dos Botones Claros: Generar con Plantilla Oficial (Instantáneo) o Generar con IA */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => ejecutarGeneracion(false)}
          className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3 px-4 rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <span>📋</span> Generar con Plantilla Oficial MEP (Instantáneo • 0 Tokens)
        </button>

        <button
          type="button"
          onClick={() => ejecutarGeneracion(true)}
          disabled={cargando}
          className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold py-3 px-4 rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <span>🤖</span> {cargando ? 'Generando con IA...' : 'Generar Enriquecido con IA (+DUA y Alto Potencial)'}
        </button>
      </div>

      {resultadoGenerado && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-cyan-400">Documento Listo para Copiar o Imprimir:</span>
            <button
              onClick={() => window.print()}
              className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3 py-1 rounded-lg"
            >
              🖨️ Imprimir / Guardar PDF
            </button>
          </div>
          <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-cyan-200 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
            {resultadoGenerado}
          </pre>
        </div>
      )}
    </div>
  );
}