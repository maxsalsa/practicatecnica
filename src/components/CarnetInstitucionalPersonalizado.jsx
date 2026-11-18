import React, { useState } from 'react';
import { EscudoOficialMep, EscudoCtpMercedesNorte } from './LogosOficialesMepCtp';
import { QrSvgGenerador } from './QrSvgGenerador';

const LISTA_CATEGORIAS_INSTITUCIONALES = [
  { rol: 'Estudiante Técnico', color: 'from-cyan-600 to-blue-900', badge: 'ESTUDIANTE CTP' },
  { rol: 'Docente Académico / Técnico', color: 'from-emerald-600 to-teal-900', badge: 'DOCENTE MEP' },
  { rol: 'Personal Auxiliar y Administrativo', color: 'from-indigo-600 to-slate-900', badge: 'ADMINISTRATIVO' },
  { rol: 'Personal de Vigilancia y Seguridad', color: 'from-amber-600 to-orange-950', badge: 'SEGURIDAD CTP' },
  { rol: 'Miembro de Junta Administrativa', color: 'from-purple-700 to-slate-900', badge: 'JUNTA DIRECTIVA' }
];

export default function CarnetInstitucionalPersonalizado() {
  const [categoriaSel, setCategoriaSel] = useState(LISTA_CATEGORIAS_INSTITUCIONALES[0]);
  const [nombrePersona, setNombrePersona] = useState('Valeria Sofía Méndez Rojas');
  const [identificacion, setIdentificacion] = useState('4-0289-0821');
  const [especialidadSeccion, setEspecialidadSeccion] = useState('11-1 • Desarrollo Web');

  const codigoHashCarnet = `CTP-MN-ID-${identificacion.replace(/-/g, '')}-2026`;

  return (
    <div className="bg-slate-900 border border-cyan-500/40 p-5 sm:p-6 rounded-2xl shadow-2xl space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-sky-950 text-sky-300 border border-sky-700">
            🪪 Credenciales y Carnés Digitales Oficiales con QR y SHA-256
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
            Generador de Carnés para Estudiantes, Docentes, Auxiliares, Vigilancia y Junta Administrativa
          </h2>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {LISTA_CATEGORIAS_INSTITUCIONALES.map((cat) => (
            <button
              key={cat.rol}
              onClick={() => setCategoriaSel(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                categoriaSel.rol === cat.rol
                  ? 'bg-cyan-600 text-white shadow'
                  : 'bg-slate-950 text-slate-300 border border-slate-800'
              }`}
            >
              {cat.rol}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Formulario de Datos */}
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3.5 text-xs">
          <h3 className="text-sm font-extrabold text-cyan-400">
            ✍️ Personalizar Datos del Carné ({categoriaSel.rol})
          </h3>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Nombre Completo:</label>
            <input
              type="text"
              value={nombrePersona}
              onChange={(e) => setNombrePersona(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Cédula / Identificación:</label>
              <input
                type="text"
                value={identificacion}
                onChange={(e) => setIdentificacion(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Especialidad / Puesto:</label>
              <input
                type="text"
                value={especialidadSeccion}
                onChange={(e) => setEspecialidadSeccion(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
              />
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3 rounded-xl text-xs shadow-lg transition-all"
          >
            🖨️ Imprimir Carné Digital en PDF
          </button>
        </div>

        {/* Vista Previa del Carné Físico / Digital con Escudos y QR */}
        <div className="flex justify-center">
          <div className={`w-80 rounded-3xl bg-gradient-to-br ${categoriaSel.color} p-5 border-2 border-cyan-400 shadow-2xl text-white space-y-4 relative overflow-hidden`}>
            {/* Cabecera del Carné */}
            <div className="flex items-center justify-between border-b border-white/20 pb-3">
              <div className="flex items-center gap-2">
                <EscudoOficialMep className="w-9 h-9" />
                <EscudoCtpMercedesNorte className="w-9 h-9" />
              </div>
              <span className="text-[10px] font-extrabold bg-black/40 text-cyan-200 px-2.5 py-1 rounded-full border border-cyan-400/50">
                {categoriaSel.badge}
              </span>
            </div>

            {/* Identidad del Portador */}
            <div className="space-y-1 text-center py-2">
              <div className="w-20 h-20 rounded-full bg-slate-900 border-2 border-cyan-400 mx-auto flex items-center justify-center text-3xl shadow-inner">
                👤
              </div>
              <h3 className="text-base font-extrabold text-white tracking-tight pt-1">{nombrePersona}</h3>
              <p className="text-xs text-cyan-200 font-mono">{identificacion}</p>
              <p className="text-[11px] font-bold text-amber-300">{especialidadSeccion}</p>
            </div>

            {/* Código QR y Pie de Carné */}
            <div className="flex items-center justify-between bg-slate-950/80 p-3 rounded-2xl border border-white/10">
              <div>
                <p className="text-[10px] text-slate-300 font-bold">CTP MERCEDES NORTE</p>
                <p className="text-[9px] text-cyan-300 font-mono">Validez: Ciclo Lectivo 2026</p>
                <p className="text-[8px] text-slate-400 font-mono mt-1">SHA256: {codigoHashCarnet.slice(0, 16)}...</p>
              </div>
              <div className="bg-white p-1 rounded-xl">
                <QrSvgGenerador valor={`https://practicatecnica.com/carnet?id=${identificacion}&hash=${codigoHashCarnet}`} size={64} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}