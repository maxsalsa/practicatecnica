import React, { useState } from 'react';

export const MODALIDADES_OFICIALES_MEP = [
  {
    id: 'ctp_diurno',
    nombre: 'CTP Diurno (Colegio Técnico Profesional)',
    icono: '⚙️',
    horario: '7:00 am – 4:20 pm | Décimo, Undécimo y Duodécimo',
    color: 'from-cyan-600 to-blue-900',
    ofertas: [
      'Desarrollo Web y Ciberseguridad',
      'Contabilidad, Finanzas y Costos',
      'Electrónica Industrial y Electromecánica',
      'Ejecutivo para Centros de Servicio (Bilingüe)',
      'Configuración y Soporte de Redes CCNA',
      'Agroecología, Turismo e Inteligencia Artificial'
    ]
  },
  {
    id: 'ctp_nocturno',
    nombre: 'CTP Nocturno / Sección Técnica Nocturna',
    icono: '🌙',
    horario: '5:45 pm – 10:00 pm | Educación Técnica de Adultos',
    color: 'from-indigo-600 to-slate-900',
    ofertas: [
      'Informática Empresarial y Desarrollo de Software',
      'Contabilidad y Gestión Tributaria Nocturna',
      'Secretariado Ejecutivo y Servicio al Cliente',
      'Mantenimiento Industrial y Electricidad',
      'Práctica Supervisada y Proyecto de Graduación'
    ]
  },
  {
    id: 'academico_diurno',
    nombre: 'Colegio Académico Diurno (Liceos MEP)',
    icono: '🏛️',
    horario: '7:00 am – 3:10 pm | III Ciclo (7°, 8°, 9°) y Diversificada (10°, 11°)',
    color: 'from-sky-600 to-cyan-950',
    ofertas: [
      'Matemáticas, Español, Estudios Sociales y Cívica',
      'Biología, Física-Matemática y Química',
      'Inglés Conversacional y Francés',
      'Educación Física, Música, Artes Plásticas y Psicología',
      'Filosofía, Afectividad y Tecnología'
    ]
  },
  {
    id: 'academico_nocturno',
    nombre: 'Colegio Nocturno Académico',
    icono: '🦉',
    horario: '6:00 pm – 10:00 pm | Jóvenes y Adultos',
    color: 'from-purple-700 to-slate-900',
    ofertas: [
      'Bachillerato y Pruebas Nacionales Estandarizadas Nocturnas',
      'Nivelación en Matemática, Español, Ciencias y Cívica',
      'Inglés Aplicado y Computación Básica'
    ]
  },
  {
    id: 'cindea_ipec',
    nombre: 'CINDEA / IPEC / CONED (Módulos y Cursos Libres)',
    icono: '📘',
    horario: 'Horarios Flexibles Diurnos, Vespertinos y Nocturnos',
    color: 'from-emerald-600 to-teal-950',
    ofertas: [
      'Módulos Integrados I, II y III Nivel (Créditos CINDEA)',
      'Cursos Libres de Emprendimiento, Ofimática y Gastronomía (IPEC)',
      'Educación Abierta, Bachillerato por Madurez y EDAD'
    ]
  },
  {
    id: 'cientifico_humanista',
    nombre: 'Colegios Científicos, Humanísticos, Deportivos y Ambientales',
    icono: '🔬',
    horario: 'Jornada Intensiva Especializada',
    color: 'from-amber-600 to-rose-950',
    ofertas: [
      'Cálculo Diferencial, Física Avanzada, Biotecnología y Robótica',
      'Lógica Filosófica, Literatura Universal e Investigación',
      'Preparación Intensiva Olimpiadas y Admisión UCR / TEC / UNA'
    ]
  },
  {
    id: 'primaria_mep',
    nombre: 'Educación Primaria (I y II Ciclos — 1° a 6° Grado)',
    icono: '🎒',
    horario: 'I y II Ciclo de la Educación General Básica',
    color: 'from-teal-600 to-emerald-900',
    ofertas: [
      'Lectoescritura, Matemática Recreativa y Ciencias Naturales',
      'Estudios Sociales, Cívica Infantil e Informática Educativa',
      'Pruebas Comprensivas y Diagnósticos Gamificados DUA'
    ]
  }
];

export default function HubModalidadesMep({ modalidadActiva, onSeleccionarModalidad, onIrASimuladores }) {
  const [busquedaServicio, setBusquedaServicio] = useState('');

  const modActual = MODALIDADES_OFICIALES_MEP.find((m) => m.id === modalidadActiva) || MODALIDADES_OFICIALES_MEP[0];

  const modalidadesFiltradas = MODALIDADES_OFICIALES_MEP.filter((m) => {
    const texto = (m.nombre + ' ' + m.ofertas.join(' ')).toLowerCase();
    return texto.includes(busquedaServicio.toLowerCase());
  });

  return (
    <div className="bg-slate-900 border border-cyan-500/40 p-6 rounded-2xl shadow-2xl space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">
            🇨🇷 Cobertura Nacional MEP — Todas las Modalidades Diurnas y Nocturnas Activas
          </span>
          <h2 className="text-2xl font-extrabold text-white mt-2">
            🏫 Catálogo Completo de Servicios Educativos MEP (CTPs, Académicos, Nocturnos, CINDEA, IPEC y Primaria)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Selecciona tu modalidad educativa para filtrar especialidades, materias académicas, planeamientos, cotidianos y simulacros.
          </p>
        </div>

        <div className="w-full md:w-72">
          <input
            type="text"
            value={busquedaServicio}
            onChange={(e) => setBusquedaServicio(e.target.value)}
            placeholder="🔍 Buscar modalidad o materia (ej. nocturno, cindea, web)..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Tarjetas de las 7 grandes modalidades del MEP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {modalidadesFiltradas.map((mod) => {
          const esActiva = mod.id === modActual.id;
          return (
            <button
              key={mod.id}
              onClick={() => onSeleccionarModalidad && onSeleccionarModalidad(mod)}
              className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                esActiva
                  ? `bg-gradient-to-br ${mod.color} border-cyan-400 shadow-lg scale-[1.01]`
                  : 'bg-slate-950 border-slate-800 hover:border-slate-600'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{mod.icono}</span>
                  {esActiva && (
                    <span className="text-[10px] font-extrabold bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full">
                      ACTIVA ✓
                    </span>
                  )}
                </div>
                <h3 className="text-xs sm:text-sm font-extrabold text-white leading-snug">{mod.nombre}</h3>
                <p className="text-[10px] text-cyan-300 font-semibold mt-1">{mod.horario}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-white/10">
                <p className="text-[10px] text-slate-300 line-clamp-2">
                  {mod.ofertas.join(' • ')}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detalle expandido de la modalidad seleccionada con botones de acción rápida */}
      <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="text-base font-extrabold text-cyan-400 flex items-center gap-2">
              <span>{modActual.icono}</span> {modActual.nombre}
            </h4>
            <p className="text-xs text-slate-400">{modActual.horario}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onIrASimuladores && onIrASimuladores()}
              className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow transition-all"
            >
              🎯 Abrir Simulacros de esta Modalidad (20, 30, 40, 60 Ítems)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {modActual.ofertas.map((of, i) => (
            <div
              key={i}
              onClick={() => onIrASimuladores && onIrASimuladores()}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 p-3 rounded-lg flex items-center justify-between cursor-pointer transition-all"
            >
              <span className="text-xs font-semibold text-slate-200">✓ {of}</span>
              <span className="text-[10px] text-cyan-400 font-bold">Practicar →</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}