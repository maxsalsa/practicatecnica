import React, { useState } from 'react';

export default function SelectorMultimedia({ onSeleccionarItem }) {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');

  // Universo multimedia multiplicado por 5 (Gastronomía, Tecnología, Naturaleza, Arquitectura, Símbolos CR)
  const bancoMultimedia = [
    { id: 1, categoria: 'Gastronomía', nombre: 'Arroz y Frijoles Tradicionales', icono: '🍛', estadoAprobado: true },
    { id: 2, categoria: 'Gastronomía', nombre: 'Rice and Beans Caribeño con Coco', icono: '🥥', estadoAprobado: true },
    { id: 3, categoria: 'Gastronomía', nombre: 'Frutas Tropicales (Piña, Papaya, Mango)', icono: '🍍', estadoAprobado: true },
    { id: 4, categoria: 'Gastronomía', nombre: 'Leche Fresca y Productos Lácteos CR', icono: '🥛', estadoAprobado: true },
    { id: 5, categoria: 'Gastronomía', nombre: 'Agua Pura de Manantial Nacional', icono: '💧', estadoAprobado: true },
    { id: 6, categoria: 'Tecnología', nombre: 'Laboratorio de Redes CCNA y Switches', icono: '🔌', estadoAprobado: true },
    { id: 7, categoria: 'Tecnología', nombre: 'Estación de Ciberseguridad & Firewalls', icono: '🛡️', estadoAprobado: true },
    { id: 8, categoria: 'Tecnología', nombre: 'Desarrollo Web Full-Stack (React/JS)', icono: '💻', estadoAprobado: true },
    { id: 9, categoria: 'Tecnología', nombre: 'Taller de Electromecánica Industrial', icono: '⚙️', estadoAprobado: true },
    { id: 10, categoria: 'Naturaleza', nombre: 'Puentes y Estructuras de Ingeniería', icono: '🌉', estadoAprobado: true },
    { id: 11, categoria: 'Naturaleza', nombre: 'Ríos y Cuencas Hidrográficas de CR', icono: '🌊', estadoAprobado: true },
    { id: 12, categoria: 'Naturaleza', nombre: 'Árboles Nativos (Guanacaste / Roble)', icono: '🌳', estadoAprobado: true }
  ];

  const filtrados = bancoMultimedia.filter(item => {
    const coincideTexto = item.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCat = categoriaSeleccionada === 'todos' || item.categoria === categoriaSeleccionada;
    return coincideTexto && coincideCat;
  });

  return (
    <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-2xl text-slate-100 space-y-4 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <span className="text-3xl">🖼️</span>
        <div>
          <h3 className="text-lg font-extrabold text-cyan-400">Banco de Stock Multimedia Libre (Multiverso x5)</h3>
          <p className="text-xs text-slate-400">Selección de recursos gráficos validados por Campaña Clara — CTP Mercedes Norte</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar recurso (Ej: coco, redes, arroz)..."
          className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
        />
        <select
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="todos">Todas las Categorías</option>
          <option value="Gastronomía">Gastronomía</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Naturaleza">Naturaleza</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-1">
        {filtrados.map((item) => (
          <div key={item.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-3 hover:border-cyan-500 transition-all">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.icono}</span>
              <div>
                <p className="text-xs font-bold text-white">{item.nombre}</p>
                <span className="text-[10px] text-cyan-400">{item.categoria} — Aprobado ✓</span>
              </div>
            </div>
            <button
              onClick={() => onSeleccionarItem && onSeleccionarItem(item)}
              className="bg-cyan-700 hover:bg-cyan-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-all shadow"
            >
              Usar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}