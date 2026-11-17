import React, { useState, useEffect } from 'react';

const INITIAL_SCHEDULES = [
  { id: 'sch-1', block: '07:00 - 08:20 (Bloque 1-2)', section: '12-1 Técnica', subject: 'Ciberseguridad y Redes', room: 'Lab 03', teacher: 'Ing. Titular', modality: 'Práctica Lab' },
  { id: 'sch-2', block: '08:35 - 09:55 (Bloque 3-4)', section: '11-2 Técnica', subject: 'Diseño de Software y Programación', room: 'Lab 01', teacher: 'Ing. Titular', modality: 'Proyecto STEAM' },
  { id: 'sch-3', block: '10:10 - 11:30 (Bloque 5-6)', section: '10-1 Técnica', subject: 'Soporte TI y Herramientas Digitales', room: 'Lab 02', teacher: 'Ing. Titular', modality: 'Taller Diagnóstico' },
  { id: 'sch-4', block: '12:30 - 01:50 (Bloque 7-8)', section: '12-2 Técnica', subject: 'Desarrollo Web Full-Stack (.JSX)', room: 'Lab 03', teacher: 'Ing. Titular', modality: 'Producción PWA' }
];

const INITIAL_MEALS = [
  { id: 'meal-1', shift: 'Desayuno (06:30 - 07:00)', menu: 'Gallo pinto, huevo revuelto, natilla, fruta y café/agua dulce', capacity: 180, served: 164, status: 'Cerrado' },
  { id: 'meal-2', shift: 'Almuerzo Turno 1 (11:30 - 12:10)', menu: 'Arroz blanco, frijoles tiernos, fajitas de pollo en salsa natural y ensalada verde', capacity: 250, served: 218, status: 'Activo' },
  { id: 'meal-3', shift: 'Almuerzo Turno 2 (12:10 - 12:50)', menu: 'Arroz blanco, frijoles tiernos, fajitas de pollo en salsa natural y refresco natural', capacity: 250, served: 142, status: 'En curso' },
  { id: 'meal-4', shift: 'Merienda Tarde (02:30 - 03:00)', menu: 'Emparedado de queso blanco y jugo de frutas', capacity: 150, served: 0, status: 'Programado' }
];

const INITIAL_PERMISSIONS = [
  { id: 'perm-1', person: 'Estudiante - Sección 12-1', type: 'Salida Médica (CCSS)', time: '10:15 AM', reason: 'Cita odontológica comprobada con carné', status: 'Aprobado' },
  { id: 'perm-2', person: 'Estudiante - Sección 11-2', type: 'Justificación de Tardía', time: '07:22 AM', reason: 'Atraso en ruta de transporte público Alajuela', status: 'Pendiente' },
  { id: 'perm-3', person: 'Docente Técnico - Lab 02', type: 'Permiso Administrativo', time: '01:00 PM', reason: 'Capacitación regional de pruebas estandarizadas', status: 'Aprobado' }
];

export function SchedulesModule() {
  const [schedules, setSchedules] = useState(() => {
    try {
      const saved = localStorage.getItem('pt26_argon_schedules');
      return saved ? JSON.parse(saved) : INITIAL_SCHEDULES;
    } catch {
      return INITIAL_SCHEDULES;
    }
  });
  const [sectionFilter, setSectionFilter] = useState('Todas');
  const [block, setBlock] = useState('07:00 - 08:20 (Bloque 1-2)');
  const [section, setSection] = useState('12-1 Técnica');
  const [subject, setSubject] = useState('');
  const [room, setRoom] = useState('Lab 01');

  useEffect(() => {
    localStorage.setItem('pt26_argon_schedules', JSON.stringify(schedules));
  }, [schedules]);

  const addSchedule = (e) => {
    e.preventDefault();
    if (!subject.trim()) return;
    const item = {
      id: `sch-${Date.now()}`,
      block,
      section,
      subject: subject.trim(),
      room,
      teacher: 'Docente Activo',
      modality: 'Bloque Técnico 80 min'
    };
    setSchedules([item, ...schedules]);
    setSubject('');
  };

  const removeSchedule = (id) => {
    setSchedules(schedules.filter((s) => s.id !== id));
  };

  const visibleSchedules = sectionFilter === 'Todas'
    ? schedules
    : schedules.filter((s) => s.section.includes(sectionFilter));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-4 argon-card p-6">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Cronopedagogía Real</span>
        <h2 className="text-lg font-bold text-slate-800 mt-0.5 mb-4">Asignar Bloque de Horario</h2>
        <form onSubmit={addSchedule} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Bloque Horario (40/80 min)</label>
            <select value={block} onChange={(e) => setBlock(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm bg-white">
              <option>07:00 - 08:20 (Bloque 1-2)</option>
              <option>08:35 - 09:55 (Bloque 3-4)</option>
              <option>10:10 - 11:30 (Bloque 5-6)</option>
              <option>12:30 - 01:50 (Bloque 7-8)</option>
              <option>02:05 - 03:25 (Bloque 9-10)</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Sección</label>
              <select value={section} onChange={(e) => setSection(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm bg-white">
                <option>10-1 Técnica</option>
                <option>11-2 Técnica</option>
                <option>12-1 Técnica</option>
                <option>12-2 Técnica</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Aula / Lab</label>
              <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Subárea o Asignatura</label>
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Ej. Ciberseguridad / Desarrollo Web" className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm" required />
          </div>
          <button type="submit" className="w-full py-3 rounded-lg font-semibold text-sm argon-btn-primary cursor-pointer">
            Guardar en Horario Oficial
          </button>
        </form>
      </div>

      <div className="lg:col-span-8 argon-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Control de Laboratorios y Aulas</span>
            <h2 className="text-lg font-bold text-slate-800">Matriz de Horarios Activos ({visibleSchedules.length})</h2>
          </div>
          <div className="flex gap-1.5 bg-slate-100 p-1 rounded-lg">
            {['Todas', '10-', '11-', '12-'].map((f) => (
              <button key={f} onClick={() => setSectionFilter(f)} className={`px-3 py-1.5 rounded-md text-xs font-semibold ${sectionFilter === f ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600'}`}>
                {f === 'Todas' ? 'Todas' : `Nivel ${f.replace('-', '°')}`}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {visibleSchedules.map((s) => (
            <div key={s.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-white transition flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">{s.block}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">{s.section}</span>
                  <span className="text-xs font-bold text-slate-500">• {s.room}</span>
                </div>
                <h3 className="text-base font-bold text-slate-800 mt-1.5">{s.subject}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Modalidad: {s.modality}</p>
              </div>
              <button onClick={() => removeSchedule(s.id)} className="text-xs font-semibold text-slate-400 hover:text-red-600">
                Quitar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CafeteriaModule() {
  const [meals, setMeals] = useState(() => {
    try {
      const saved = localStorage.getItem('pt26_argon_meals');
      return saved ? JSON.parse(saved) : INITIAL_MEALS;
    } catch {
      return INITIAL_MEALS;
    }
  });

  useEffect(() => {
    localStorage.setItem('pt26_argon_meals', JSON.stringify(meals));
  }, [meals]);

  const registerPlate = (id) => {
    setMeals(meals.map((m) => (m.id === id && m.served < m.capacity ? { ...m, served: m.served + 1 } : m)));
  };

  const resetCount = (id) => {
    setMeals(meals.map((m) => (m.id === id ? { ...m, served: 0 } : m)));
  };

  return (
    <div className="argon-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Nutrición y Bienestar Estudiantil</span>
          <h2 className="text-lg font-bold text-slate-800 mt-0.5">Gestión de Comedor, Menú del Día y Aforo por Turno</h2>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Registro de Asistencia en Tiempo Real
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {meals.map((meal) => {
          const percent = Math.min(100, Math.round((meal.served / meal.capacity) * 100));
          return (
            <div key={meal.id} className="p-5 rounded-xl border border-slate-100 bg-slate-50/60 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase text-indigo-600">{meal.shift}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">{meal.status}</span>
                </div>
                <p className="text-sm font-semibold text-slate-800 mt-2 leading-relaxed">{meal.menu}</p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
                  <span>Platos servidos: <strong>{meal.served}</strong> de {meal.capacity}</span>
                  <span>{percent}% de ocupación</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 transition-all" style={{ width: `${percent}%` }} />
                </div>

                <div className="flex items-center justify-between gap-2 mt-4">
                  <button
                    onClick={() => registerPlate(meal.id)}
                    className="px-3.5 py-2 rounded-lg text-xs font-bold argon-btn-primary cursor-pointer"
                  >
                    +1 Registrar Becado / Almuerzo
                  </button>
                  <button
                    onClick={() => resetCount(meal.id)}
                    className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-200/60"
                  >
                    Reiniciar turno
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function PermissionsModule() {
  const [permissions, setPermissions] = useState(() => {
    try {
      const saved = localStorage.getItem('pt26_argon_permissions');
      return saved ? JSON.parse(saved) : INITIAL_PERMISSIONS;
    } catch {
      return INITIAL_PERMISSIONS;
    }
  });

  const [person, setPerson] = useState('');
  const [type, setType] = useState('Salida Médica (CCSS)');
  const [reason, setReason] = useState('');

  useEffect(() => {
    localStorage.setItem('pt26_argon_permissions', JSON.stringify(permissions));
  }, [permissions]);

  const handleAddPermission = (e) => {
    e.preventDefault();
    if (!person.trim() || !reason.trim()) return;
    const item = {
      id: `perm-${Date.now()}`,
      person: person.trim(),
      type,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reason: reason.trim(),
      status: 'Pendiente'
    };
    setPermissions([item, ...permissions]);
    setPerson('');
    setReason('');
  };

  const updateStatus = (id, newStatus) => {
    setPermissions(permissions.map((p) => (p.id === id ? { ...p, status: newStatus } : p)));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 argon-card p-6">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Control de Ingreso y Egreso</span>
        <h2 className="text-lg font-bold text-slate-800 mt-0.5 mb-4">Registrar Permiso o Justificación</h2>

        <form onSubmit={handleAddPermission} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Estudiante o Funcionario</label>
            <input
              type="text"
              value={person}
              onChange={(e) => setPerson(e.target.value)}
              placeholder="Ej. Nombre completo - Sección 12-1"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Tipo de Trámite</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm bg-white">
              <option>Salida Médica (CCSS)</option>
              <option>Justificación de Tardía</option>
              <option>Retiro con Encargado Legal</option>
              <option>Permiso Administrativo Docente</option>
              <option>Gira Educativa / Práctica Supervisada</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Motivo y Comprobante</label>
            <textarea
              rows="3"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Detalle el comprobante o autorización presentada..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm"
              required
            />
          </div>
          <button type="submit" className="w-full py-3 rounded-lg font-semibold text-sm argon-btn-primary cursor-pointer">
            Emitir Boleta de Permiso
          </button>
        </form>
      </div>

      <div className="lg:col-span-7 argon-card p-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Bitácora Oficial</span>
            <h2 className="text-lg font-bold text-slate-800">Solicitudes y Boletas de Permiso ({permissions.length})</h2>
          </div>
        </div>

        <div className="space-y-3">
          {permissions.map((p) => (
            <div key={p.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    p.status === 'Aprobado' ? 'bg-emerald-100 text-emerald-700' :
                    p.status === 'Rechazado' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {p.status}
                  </span>
                  <span className="text-xs font-bold text-indigo-600">{p.type}</span>
                  <span className="text-xs text-slate-400">• {p.time}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button onClick={() => updateStatus(p.id, 'Aprobado')} className="px-2.5 py-1 rounded text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                    Aprobar
                  </button>
                  <button onClick={() => updateStatus(p.id, 'Rechazado')} className="px-2.5 py-1 rounded text-xs font-bold bg-red-50 text-red-700 hover:bg-red-100">
                    Denegar
                  </button>
                </div>
              </div>
              <h3 className="text-sm font-bold text-slate-800">{p.person}</h3>
              <p className="text-xs text-slate-600">{p.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
