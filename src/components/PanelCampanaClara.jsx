import React, { useState } from 'react';

export default function PanelCampanaClara() {
  const [recursosPendientes, setRecursosPendientes] = useState([
    { id: 101, titulo: 'Guía Fotográfica Taller Ciberseguridad 12-4', autor: 'Prof. Carlos Vargas', estado: 'Pendiente de Validación' },
    { id: 102, titulo: 'Infografía Nutricional Arroz y Frijoles CR', autor: 'Comité de Comedor', estado: 'Pendiente de Validación' }
  ]);

  const aprobarRecurso = (id) => {
    setRecursosPendientes(recursosPendientes.filter(r => r.id !== id));
    alert('✅ Recurso aprobado y publicado oficialmente bajo Campaña Clara.');
  };

  return (
    <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-2xl text-slate-100 space-y-4 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <span className="text-3xl">🛡️</span>
        <div>
          <h3 className="text-lg font-extrabold text-cyan-400">Panel de Aprobación — Campaña Clara</h3>
          <p className="text-xs text-slate-400">Control de idoneidad y validación institucional por Subdirección / Jefatura</p>
        </div>
      </div>

      <div className="space-y-3">
        {recursosPendientes.length === 0 ? (
          <p className="text-xs text-green-400 text-center py-4 bg-slate-950 rounded-xl border border-slate-800">
            🎉 ¡Todo al día! No hay recursos pendientes de aprobación institucional.
          </p>
        ) : (
          recursosPendientes.map((rec) => (
            <div key={rec.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <p className="text-sm font-bold text-white">{rec.titulo}</p>
                <p className="text-xs text-slate-400">Autor: <span className="text-slate-300">{rec.autor}</span> — <span className="text-amber-400">{rec.estado}</span></p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => aprobarRecurso(rec.id)}
                  className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-lg text-xs transition-all shadow"
                >
                  Aprobar ✓
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}