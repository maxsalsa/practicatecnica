import React, { useState } from 'react';
import { JERARQUIA_MEP_SEGURIDAD } from '../data/jerarquiaMepSeguridad';

export default function SelectorInstitucionalModal({ onSeleccionar }) {
  const [regionSeleccionada, setRegionSeleccionada] = useState(JERARQUIA_MEP_SEGURIDAD.direccionesRegionalesCostaRica[0]);
  const [circuitoSeleccionado, setCircuitoSeleccionado] = useState(regionSeleccionada.circuitos[0]);
  const [modalidad, setModalidad] = useState('Colegios Técnicos Profesionales (CTP)');

  const handleRegionChange = (e) => {
    const reg = JERARQUIA_MEP_SEGURIDAD.direccionesRegionalesCostaRica.find(r => r.region === e.target.value);
    setRegionSeleccionada(reg);
    setCircuitoSeleccionado(reg.circuitos[0]);
  };

  const aplicarFiltro = () => {
    if (onSeleccionar) {
      onSeleccionar({ region: regionSeleccionada.region, circuito: circuitoSeleccionado, modalidad });
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-2xl text-slate-100 space-y-4 max-w-lg mx-auto">
      <h3 className="text-xl font-extrabold text-cyan-400 flex items-center gap-2">
        🏛️ Selector Institucional MEP & Circuitos
      </h3>
      <p className="text-xs text-slate-400">Selecciona la Dirección Regional, Circuito y Modalidad educativa bajo norma soberana.</p>

      <div className="space-y-3 text-sm">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Dirección Regional:</label>
          <select 
            value={regionSeleccionada.region} 
            onChange={handleRegionChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
          >
            {JERARQUIA_MEP_SEGURIDAD.direccionesRegionalesCostaRica.map((r, i) => (
              <option key={i} value={r.region}>{r.region}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Circuito Escolar:</label>
          <select 
            value={circuitoSeleccionado} 
            onChange={(e) => setCircuitoSeleccionado(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
          >
            {regionSeleccionada.circuitos.map((c, i) => (
              <option key={i} value={c}>Circuito {c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Modalidad Educativa:</label>
          <select 
            value={modalidad} 
            onChange={(e) => setModalidad(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="Primaria (I y II Ciclos)">Primaria (I y II Ciclos)</option>
            <option value="Secundaria Académica">Secundaria Académica</option>
            <option value="Colegios Técnicos Profesionales (CTP)">Colegios Técnicos Profesionales (CTP)</option>
            <option value="Colegios Científicos / Humanísticos">Colegios Científicos / Humanísticos</option>
          </select>
        </div>
      </div>

      <button
        onClick={aplicarFiltro}
        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow"
      >
        Confirmar Contexto Institucional 🚀
      </button>
    </div>
  );
}