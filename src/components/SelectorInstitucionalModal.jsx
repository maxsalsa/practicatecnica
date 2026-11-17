import React, { useState } from 'react';
import { DIRECTORIO_27_REGIONALES_MEP } from '../data/directorioRegionalesMep';

export default function SelectorInstitucionalModal({ onSeleccionar }) {
  const [provIndex, setProvIndex] = useState(1); // Heredia por defecto (CTP Mercedes Norte)
  const [regIndex, setRegIndex] = useState(0);
  const [circuitoSel, setCircuitoSel] = useState('04');
  const [institucionSel, setInstitucionSel] = useState('CTP Mercedes Norte (Institución Modelo)');
  const [modalidadSel, setModalidadSel] = useState('CTP Diurno / Técnico Nocturno / Académico');
  const [busquedaInst, setBusquedaInst] = useState('');

  const provActual = DIRECTORIO_27_REGIONALES_MEP[provIndex] || DIRECTORIO_27_REGIONALES_MEP[0];
  const regActual = provActual.regionales[regIndex] || provActual.regionales[0];

  const cambiarProvincia = (idx) => {
    const p = DIRECTORIO_27_REGIONALES_MEP[idx];
    const r = p.regionales[0];
    setProvIndex(idx);
    setRegIndex(0);
    setCircuitoSel(r.circuitos[0]);
    setInstitucionSel(r.instituciones[0]);
  };

  const cambiarRegional = (idx) => {
    const r = provActual.regionales[idx];
    setRegIndex(idx);
    setCircuitoSel(r.circuitos[0]);
    setInstitucionSel(r.instituciones[0]);
  };

  const guardarSeleccion = (e) => {
    e.preventDefault();
    if (onSeleccionar) {
      onSeleccionar({
        provincia: provActual.provincia,
        region: regActual.nombre,
        circuito: `${circuitoSel} (${institucionSel})`,
        institucion: institucionSel,
        modalidad: modalidadSel
      });
    }
  };

  return (
    <div className="bg-slate-900 border-2 border-cyan-500/60 p-6 rounded-2xl shadow-2xl text-slate-100 space-y-4">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-[10px] font-extrabold uppercase bg-cyan-950 text-cyan-300 border border-cyan-700 px-2 py-0.5 rounded">
          🇨🇷 Cobertura Nacional — 7 Provincias y 27 Direcciones Regionales MEP
        </span>
        <h3 className="text-lg font-extrabold text-white mt-1">
          🏛️ Seleccionar Provincia, Dirección Regional, Circuito e Institución
        </h3>
      </div>

      <form onSubmit={guardarSeleccion} className="space-y-3 text-xs">
        <div>
          <label className="block font-bold text-slate-300 mb-1">1. Provincia de Costa Rica:</label>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
            {DIRECTORIO_27_REGIONALES_MEP.map((p, idx) => (
              <button
                type="button"
                key={p.provincia}
                onClick={() => cambiarProvincia(idx)}
                className={`py-1.5 px-2 rounded-lg font-bold border text-[11px] transition-all ${
                  provIndex === idx
                    ? 'bg-cyan-600 text-white border-cyan-400 shadow'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-600'
                }`}
              >
                {p.provincia}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-300 mb-1">2. Dirección Regional de Educación (27 Oficiales):</label>
          <select
            value={regIndex}
            onChange={(e) => cambiarRegional(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-semibold"
          >
            {provActual.regionales.map((r, idx) => (
              <option key={r.nombre} value={idx}>{r.nombre}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-300 mb-1">3. Circuito Escolar:</label>
            <select
              value={circuitoSel}
              onChange={(e) => setCircuitoSel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-semibold"
            >
              {regActual.circuitos.map((c) => (
                <option key={c} value={c}>Circuito Escolar {c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">4. Modalidad Educativa:</label>
            <select
              value={modalidadSel}
              onChange={(e) => setModalidadSel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-semibold"
            >
              <option>CTP Diurno (Colegio Técnico Profesional)</option>
              <option>CTP Nocturno / Sección Técnica Nocturna</option>
              <option>Colegio Académico Diurno / Liceo</option>
              <option>Colegio Nocturno Académico</option>
              <option>CINDEA / IPEC / CONED</option>
              <option>Escuela Primaria (I y II Ciclos)</option>
              <option>Colegio Científico / Humanístico / Bilingüe</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-300 mb-1">5. Centro Educativo (Escuela, Liceo, CTP, CINDEA):</label>
          <select
            value={institucionSel}
            onChange={(e) => setInstitucionSel(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-semibold mb-2"
          >
            {regActual.instituciones.map((inst) => (
              <option key={inst} value={inst}>{inst}</option>
            ))}
          </select>
          <input
            type="text"
            value={busquedaInst}
            onChange={(e) => {
              setBusquedaInst(e.target.value);
              if (e.target.value.trim()) setInstitucionSel(e.target.value);
            }}
            placeholder="O escribe el nombre de tu escuela, colegio o CTP específico..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-xs text-cyan-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3 rounded-xl text-xs shadow-lg transition-all"
        >
          ✓ Aplicar Dirección Regional, Circuito e Institución
        </button>
      </form>
    </div>
  );
}