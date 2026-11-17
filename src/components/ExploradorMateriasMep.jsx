import React, { useState } from 'react';

export const CATALOGO_MATERIAS_MEP = [
  { id: 'sociales', nombre: 'Estudios Sociales', categoria: 'Académicas Básicas', icono: '🌎', color: 'from-amber-600 to-orange-900', niveles: '7° a 11° / Primaria', items: 'Historia de CR, Geografía, Geopolítica y Cartografía' },
  { id: 'civica', nombre: 'Educación Cívica', categoria: 'Académicas Básicas', icono: '🇨🇷', color: 'from-blue-600 to-indigo-950', niveles: '7° a 11°', items: 'Régimen Político, Constitución, Derechos Humanos y Ley 8968' },
  { id: 'ciencias', nombre: 'Ciencias Naturales (III Ciclo)', categoria: 'Ciencias Exactas', icono: '🔬', color: 'from-emerald-600 to-teal-950', niveles: '7°, 8° y 9°', items: 'Célula, Ecosistemas, Materia, Energía y Tierra' },
  { id: 'biologia', nombre: 'Biología', categoria: 'Ciencias Exactas', icono: '🧬', color: 'from-green-600 to-emerald-950', niveles: '10°, 11° y 12°', items: 'Genética Mendeliana, Evolución, Biodiversidad y Ecología' },
  { id: 'quimica', nombre: 'Química', categoria: 'Ciencias Exactas', icono: '⚗️', color: 'from-purple-600 to-indigo-950', niveles: '10°, 11° y 12°', items: 'Tabla Periódica, Estequiometría, Enlaces y Química Orgánica' },
  { id: 'fisica', nombre: 'Física-Matemática', categoria: 'Ciencias Exactas', icono: '⚡', color: 'from-cyan-600 to-blue-950', niveles: '10°, 11° y 12°', items: 'Cinemática, Leyes de Newton, Trabajo, Energía y Ley de Ohm' },
  { id: 'matematicas', nombre: 'Matemáticas MEP', categoria: 'Académicas Básicas', icono: '📐', color: 'from-rose-600 to-red-950', niveles: '1° a 12°', items: 'Geometría, Relaciones y Álgebra, Estadística y Probabilidad' },
  { id: 'espanol', nombre: 'Español y Literatura', categoria: 'Académicas Básicas', icono: '📖', color: 'from-sky-600 to-blue-950', niveles: '1° a 12°', items: 'Comprensión Lectora, Gramática, Redacción y Literatura Costarricense' },
  { id: 'deportes', nombre: 'Educación Física y Deportes', categoria: 'Complementarias y Arte', icono: '⚽', color: 'from-lime-600 to-green-950', niveles: '1° a 12°', items: 'Salud Integral, Fisiología del Ejercicio, Reglamentos y Recreación' },
  { id: 'musica_arte', nombre: 'Educación Musical y Artes', categoria: 'Complementarias y Arte', icono: '🎵', color: 'from-pink-600 to-rose-950', niveles: '1° a 11°', items: 'Solfeo, Círculos Armónicos, Historia del Arte y Apreciación' },
  { id: 'filosofia_psico', nombre: 'Filosofía, Psicología y Afectividad', categoria: 'Complementarias y Arte', icono: '🧠', color: 'from-violet-600 to-purple-950', niveles: '10° y 11°', items: 'Lógica Formal, Ética, Desarrollo Humano y Salud Mental' },
  { id: 'idiomas', nombre: 'Inglés Conversacional y Francés', categoria: 'Idiomas', icono: '🗣️', color: 'from-indigo-600 to-blue-900', niveles: '1° a 12° (MCER B1/B2)', items: 'Reading Comprehension, Technical Vocabulary & Listening' },
  { id: 'web_ciber', nombre: 'Desarrollo Web y Ciberseguridad', categoria: 'Especialidades CTP', icono: '🛡️', color: 'from-cyan-500 to-slate-900', niveles: '10°, 11° y 12° CTP', items: 'React, JavaScript, SQL, Redes CCNA, Hacking Ético y SHA-256' },
  { id: 'contabilidad', nombre: 'Contabilidad, Costos y Finanzas', categoria: 'Especialidades CTP', icono: '📊', color: 'from-emerald-500 to-slate-900', niveles: '10°, 11° y 12° CTP', items: 'NIIF, Ciclo Contable, Planillas, Tributación y Excel Financiero' },
  { id: 'electromecanica', nombre: 'Electrónica y Electromecánica', categoria: 'Especialidades CTP', icono: '🤖', color: 'from-amber-500 to-slate-900', niveles: '10°, 11° y 12° CTP', items: 'PLC, Automatización, Motores Trifásicos y Microcontroladores' }
];

const CATEGORIAS = ['Todas', 'Ciencias Exactas', 'Académicas Básicas', 'Complementarias y Arte', 'Idiomas', 'Especialidades CTP'];

export default function ExploradorMateriasMep({ onPracticarMateria }) {
  const [busqueda, setBusqueda] = useState('');
  const [catActiva, setCatActiva] = useState('Todas');
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);
  const [respuestaDemo, setRespuestaDemo] = useState(null);

  const filtradas = CATALOGO_MATERIAS_MEP.filter((m) => {
    const coincideTexto = (m.nombre + ' ' + m.items).toLowerCase().includes(busqueda.toLowerCase());
    const coincideCat = catActiva === 'Todas' || m.categoria === catActiva;
    return coincideTexto && coincideCat;
  });

  const generarReactivoMateria = (mat) => {
    setRespuestaDemo(null);
    const bancoRapido = {
      sociales: {
        q: '¿Cuál hecho histórico consolidó en Costa Rica la abolición del ejército en diciembre de 1948 y fortaleció la inversión en educación pública y salud?',
        ops: ['El Pacto de Concordia de 1821', 'El acto simbólico del Cuartel Bellavista promulgado en la Constitución de 1949', 'La Campaña Nacional de 1856-1857', 'La creación de la Universidad de Santo Tomás en 1843'],
        ok: 1,
        exp: 'El 1 de diciembre de 1948 se abolió el ejército en el Cuartel Bellavista, consagrando esa decisión en el artículo 12 de la Constitución Política de 1949.'
      },
      quimica: {
        q: 'Si un átomo neutro de Carbono tiene número atómico Z = 6 y número másico A = 12, ¿cuántos protones, electrones y neutrones posee respectivamente?',
        ops: ['6 protones, 6 electrones y 6 neutrones', '12 protones, 6 electrones y 12 neutrones', '6 protones, 12 electrones y 6 neutrones', '4 protones, 4 electrones y 8 neutrones'],
        ok: 0,
        exp: 'En un átomo neutro: Protones = Z = 6; Electrones = Z = 6; Neutrones = A - Z = 12 - 6 = 6.'
      },
      biologia: {
        q: 'En un cruce monohíbrido mendeliano entre dos organismos heterocigotos (Aa × Aa), ¿cuál es la probabilidad porcentual de obtener descendencia homocigota recesiva (aa)?',
        ops: ['25% (1/4)', '50% (2/4)', '75% (3/4)', '100% (4/4)'],
        ok: 0,
        exp: 'El cuadro de Punnett de Aa × Aa produce: 25% AA, 50% Aa y 25% aa (homocigoto recesivo).'
      },
      ciencias: {
        q: '¿Cuál organela celular eucariota se encarga de realizar la respiración celular para sintetizar moléculas de ATP (energía)?',
        ops: ['El aparato de Golgi', 'La mitocondria', 'El ribosoma', 'El lisosoma'],
        ok: 1,
        exp: 'La mitocondria es la central energética celular donde ocurre el ciclo de Krebs y la fosforilación oxidativa para producir ATP.'
      },
      deportes: {
        q: 'Durante una sesión de Educación Física en el colegio, ¿cuál es el beneficio fisiológico principal de realizar el calentamiento articular y aeróbico previo?',
        ops: ['Aumentar la temperatura muscular y la elasticidad para prevenir lesiones', 'Reducir el transporte de oxígeno hacia los tejidos', 'Agotar las reservas de glucógeno antes del deporte', 'Disminuir la frecuencia cardíaca por debajo de 40 lpm'],
        ok: 0,
        exp: 'El calentamiento eleva la temperatura corporal, lubrica articulaciones con líquido sinovial y previene desgarros musculares.'
      }
    };

    const reactivo = bancoRapido[mat.id] || {
      q: `[Práctica Guiada de ${mat.nombre}] En relación con los contenidos oficiales del MEP (${mat.items}), ¿cuál estrategia garantiza el dominio de la competencia?`,
      ops: [
        'La resolución sistemática de casos prácticos con retroalimentación paso a paso.',
        'Omitir los ejercicios de aplicación en el laboratorio.',
        'Responder al azar sin leer los indicadores del programa de estudio.',
        'Evitar el uso de herramientas tecnológicas de apoyo.'
      ],
      ok: 0,
      exp: `En ${mat.nombre} (${mat.niveles}), el modelo de educación basada en competencias del MEP prioriza la práctica guiada y la resolución de problemas reales.`
    };

    setMateriaSeleccionada({ ...mat, reactivo });
  };

  return (
    <div className="bg-slate-900 border border-cyan-500/40 p-6 rounded-2xl shadow-2xl space-y-5">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">
            📚 Buscador Rápido de Asignaturas MEP — Académicas, Ciencias, Deportes y Técnicas
          </span>
          <h2 className="text-2xl font-extrabold text-white mt-2">
            🧭 Explorador Amigable de Materias (Sociales, Ciencias, Química, Biología, Deportes y CTP)
          </h2>
        </div>

        <div className="w-full lg:w-80">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="🔍 Escribe: química, biología, sociales, deportes..."
            className="w-full bg-slate-950 border border-cyan-500/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Filtros por Categoría */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            onClick={() => setCatActiva(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
              catActiva === cat
                ? 'bg-cyan-600 text-white shadow-lg'
                : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-cyan-500/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Cuadrícula de Asignaturas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {filtradas.map((mat) => (
          <div
            key={mat.id}
            onClick={() => generarReactivoMateria(mat)}
            className={`bg-gradient-to-br ${mat.color} p-4 rounded-xl border border-white/15 hover:border-cyan-300 cursor-pointer transition-all hover:scale-[1.02] shadow-lg flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{mat.icono}</span>
                <span className="text-[10px] font-extrabold bg-black/40 text-cyan-200 px-2 py-0.5 rounded">
                  {mat.niveles}
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-white">{mat.nombre}</h3>
              <p className="text-[11px] text-slate-200 mt-1 line-clamp-2">{mat.items}</p>
            </div>
            <div className="mt-3 pt-2 border-t border-white/15 flex justify-between items-center text-[11px] font-bold text-cyan-200">
              <span>⚡ Práctica Directa</span>
              <span>→</span>
            </div>
          </div>
        ))}
      </div>

      {/* Visor Interactivo de la Materia Seleccionada */}
      {materiaSeleccionada && (
        <div className="bg-slate-950 border-2 border-cyan-500/60 p-5 rounded-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{materiaSeleccionada.icono}</span>
              <div>
                <h4 className="text-base font-extrabold text-white">
                  Práctica Rápida de {materiaSeleccionada.nombre} ({materiaSeleccionada.niveles})
                </h4>
                <p className="text-xs text-cyan-400">{materiaSeleccionada.items}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onPracticarMateria && onPracticarMateria(materiaSeleccionada)}
                className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs"
              >
                🎓 Ir a Simulacro Completo (20/30/40/60 Ítems)
              </button>
              <button
                onClick={() => setMateriaSeleccionada(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-3 py-1.5 rounded-xl text-xs"
              >
                ✕ Cerrar
              </button>
            </div>
          </div>

          <p className="text-sm font-semibold text-slate-100">{materiaSeleccionada.reactivo.q}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {materiaSeleccionada.reactivo.ops.map((op, idx) => {
              let clase = 'bg-slate-900 border-slate-800 text-slate-200 hover:border-cyan-500';
              if (respuestaDemo !== null) {
                if (idx === materiaSeleccionada.reactivo.ok) clase = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                else if (idx === respuestaDemo) clase = 'bg-rose-950 border-rose-500 text-rose-200';
              }
              return (
                <button
                  key={idx}
                  onClick={() => setRespuestaDemo(idx)}
                  className={`text-left p-3 rounded-xl border text-xs transition-all ${clase}`}
                >
                  <strong className="text-cyan-400 mr-2">{['A', 'B', 'C', 'D'][idx]})</strong> {op}
                </button>
              );
            })}
          </div>

          {respuestaDemo !== null && (
            <div className="bg-cyan-950/40 border border-cyan-500/40 p-3.5 rounded-xl text-xs text-slate-200">
              <strong className="text-cyan-300 block mb-1">💡 Explicación Pedagógica MEP:</strong>
              {materiaSeleccionada.reactivo.exp}
            </div>
          )}
        </div>
      )}
    </div>
  );
}