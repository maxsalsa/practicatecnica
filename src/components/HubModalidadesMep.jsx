import React, { useState } from 'react';

export const MODALIDADES_OFICIALES_MEP = [
  {
    id: 'ctp_diurno',
    nombre: 'CTP Diurno (Colegio Técnico Profesional)',
    icono: '⚙️',
    horario: '7:00 am – 4:20 pm | Décimo, Undécimo y Duodécimo',
    color: 'from-cyan-600 to-blue-900',
    ofertas: [
      'Desarrollo Web (Full-Stack React / JS / SQL)',
      'Ciberseguridad (Hacking Ético, SOC, Redes y Ley 8968)',
      'Contabilidad y Finanzas (NIIF, Costos y Tributación)',
      'Accounting (Bilingual Accounting — US GAAP & IFRS)',
      'Ejecutivo Comercial y de Servicio al Cliente (CRM & Bilingüe)',
      'Administración, Logística y Distribución (Supply Chain & Aduanas)',
      'Electrónica Industrial (Microcontroladores, Sensores e IoT)',
      'Electromecánica Industrial (Motores Trifásicos, PLC y Neumática)',
      'Configuración y Soporte de Redes CCNA & Agroecología'
    ]
  },
  {
    id: 'ctp_nocturno',
    nombre: 'CTP Nocturno / Sección Técnica Nocturna',
    icono: '🌙',
    horario: '5:45 pm – 10:00 pm | Educación Técnica Nocturna',
    color: 'from-indigo-600 to-slate-900',
    ofertas: [
      'Desarrollo Web Nocturno',
      'Ciberseguridad y Redes Nocturno',
      'Contabilidad y Finanzas / Accounting Nocturno',
      'Ejecutivo Comercial y de Servicio al Cliente Nocturno',
      'Administración, Logística y Distribución Nocturno',
      'Electrónica Industrial y Electromecánica Nocturna'
    ]
  },
  {
    id: 'academico_diurno',
    nombre: 'Colegio Académico Diurno (Liceos MEP)',
    icono: '🏛️',
    horario: '7:00 am – 3:10 pm | III Ciclo (7°, 8°, 9°) y Diversificada (10°, 11°)',
    color: 'from-sky-600 to-cyan-950',
    ofertas: [
      'Matemáticas, Español, Estudios Sociales y Educación Cívica',
      'Ciencias Naturales (7°-9°), Biología, Química y Física-Matemática',
      'Educación Física y Deportes, Música, Artes Plásticas y Psicología',
      'Inglés Conversacional, Francés y Filosofía'
    ]
  },
  {
    id: 'cindea_ipec',
    nombre: 'CINDEA / IPEC / Liceo Nocturno / CONED',
    icono: '📘',
    horario: 'Horarios Flexibles Diurnos, Vespertinos y Nocturnos',
    color: 'from-emerald-600 to-teal-950',
    ofertas: [
      'Módulos Integrados CINDEA (I, II y III Nivel)',
      'Cursos Técnicos y Libres IPEC (Contabilidad, Inglés, Ofimática)',
      'Bachillerato por Madurez y Educación Abierta'
    ]
  }
];

export default function HubModalidadesMep({ modalidadActiva, onSeleccionarModalidad, onIrASimuladores }) {
  const modActual = MODALIDADES_OFICIALES_MEP.find((m) => m.id === modalidadActiva) || MODALIDADES_OFICIALES_MEP[0];

  return (
    <div className="bg-slate-900 border border-cyan-500/40 p-6 rounded-2xl shadow-2xl space-y-5">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">
          🏫 Modalidades Oficiales del MEP — CTP Mercedes Norte y Todo el País
        </span>
        <h2 className="text-2xl font-extrabold text-white mt-2">
          Oferta Educativa por Modalidad (Especialidades Separadas CTP Diurno, Nocturno, Académico y CINDEA)
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {MODALIDADES_OFICIALES_MEP.map((mod) => {
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
                <h3 className="text-xs sm:text-sm font-extrabold text-white">{mod.nombre}</h3>
                <p className="text-[10px] text-cyan-300 font-semibold mt-1">{mod.horario}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-3">
        <h4 className="text-sm font-extrabold text-cyan-400">
          {modActual.icono} Especialidades y Asignaturas en {modActual.nombre}:
        </h4>
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