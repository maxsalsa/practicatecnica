import React, { useState, useEffect } from 'react';

const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'ann-101',
    title: 'Simulacro Oficial de Pruebas Estandarizadas 2026',
    category: 'Académico',
    priority: 'Alta',
    audience: 'Estudiantes 11° y 12°',
    message: 'El módulo de práctica offline ya se encuentra habilitado con reactivos actualizados y retroalimentación inmediata.',
    date: 'Hoy, 08:30 AM',
    reads: 342
  },
  {
    id: 'ann-102',
    title: 'Actualización de Banco Técnico y Teórico MOPT',
    category: 'Plataforma',
    priority: 'Media',
    audience: 'Comunidad General',
    message: 'Se integraron nuevos casos prácticos con temporizador real y modo sin conexión para dispositivos móviles.',
    date: 'Ayer, 04:15 PM',
    reads: 518
  },
  {
    id: 'ann-103',
    title: 'Mantenimiento Preventivo de Sincronización en la Nube',
    category: 'Infraestructura',
    priority: 'Informativa',
    audience: 'Docentes y Coordinadores',
    message: 'El respaldo local continúa operando al 100% durante las ventanas de actualización del servidor.',
    date: '17 Nov 2026',
    reads: 189
  }
];

export default function AnnouncementsBroadcastPanel() {
  const [announcements, setAnnouncements] = useState(() => {
    try {
      const saved = localStorage.getItem('pt26_argon_announcements');
      return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
    } catch {
      return INITIAL_ANNOUNCEMENTS;
    }
  });

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Académico');
  const [priority, setPriority] = useState('Alta');
  const [audience, setAudience] = useState('Todos los Estudiantes');
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('Todos');

  useEffect(() => {
    try {
      localStorage.setItem('pt26_argon_announcements', JSON.stringify(announcements));
    } catch (err) {
      console.error('Error guardando en cache local:', err);
    }
  }, [announcements]);

  const handlePublish = (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    const newItem = {
      id: `ann-${Date.now()}`,
      title: title.trim(),
      category,
      priority,
      audience,
      message: message.trim(),
      date: 'Hace un momento',
      reads: 1
    };

    setAnnouncements([newItem, ...announcements]);
    setTitle('');
    setMessage('');
  };

  const handleDelete = (id) => {
    setAnnouncements(announcements.filter((item) => item.id !== id));
  };

  const filteredList = filter === 'Todos'
    ? announcements
    : announcements.filter((item) => item.category === filter);

  const badgeStyle = (prio) => {
    if (prio === 'Alta') return 'bg-red-100 text-red-700 border border-red-200';
    if (prio === 'Media') return 'bg-amber-100 text-amber-700 border border-amber-200';
    return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 argon-card p-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Centro de Difusión
            </span>
            <h2 className="text-lg font-bold text-slate-800 mt-0.5">
              Nuevo Comunicado Oficial
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600">
            Offline-First
          </span>
        </div>

        <form onSubmit={handlePublish} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Título del Comunicado
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Apertura de simulacro técnico nacional"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Académico">Académico</option>
                <option value="Plataforma">Plataforma</option>
                <option value="Infraestructura">Infraestructura</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Prioridad
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Informativa">Informativa</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Público Meta
            </label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Mensaje Detallado
            </label>
            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe las instrucciones claras para estudiantes o docentes..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg font-semibold text-sm argon-btn-primary cursor-pointer"
          >
            Publicar Comunicado Ahora
          </button>
        </form>
      </div>

      <div className="lg:col-span-7 argon-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Canal Institucional Activo
            </span>
            <h2 className="text-lg font-bold text-slate-800 mt-0.5">
              Historial de Transmisiones ({filteredList.length})
            </h2>
          </div>

          <div className="flex gap-1.5 bg-slate-100 p-1 rounded-lg">
            {['Todos', 'Académico', 'Plataforma', 'Infraestructura'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                  filter === tab
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredList.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-white transition flex flex-col gap-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${badgeStyle(item.priority)}`}>
                    {item.priority}
                  </span>
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    • {item.date}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-xs text-slate-400 hover:text-red-600 font-semibold"
                >
                  Eliminar
                </button>
              </div>

              <h3 className="text-base font-bold text-slate-800">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.message}
              </p>

              <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-200/60 text-xs text-slate-500">
                <span>Destino: <strong className="text-slate-700">{item.audience}</strong></span>
                <span>Lecturas confirmadas: <strong className="text-indigo-600">{item.reads}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
