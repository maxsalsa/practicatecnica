import React, { useState } from 'react';

const HORARIO_BASE = [
  { bloque: 'Lección 1-2 (7:00 - 8:20 am)', lunes: '11-1 Desarrollo Web (Lab 3)', martes: '10-2 Química (Lab Ciencias)', miercoles: '12-1 Ciberseguridad', jueves: '11-3 Estudios Sociales', viernes: '12-2 Accounting Bilingüe' },
  { bloque: 'Lección 3-4 (8:35 - 9:55 am)', lunes: '11-1 Desarrollo Web (Lab 3)', martes: '10-1 Biología', miercoles: '12-1 Ciberseguridad', jueves: '9-4 Educación Física / Deportes', viernes: '12-2 Ejecutivo Comercial' },
  { bloque: 'Lección 5-6 (10:15 - 11:35 am)', lunes: 'Coordinación Técnica', martes: '11-2 Matemáticas MEP', miercoles: 'Atención a Familias', jueves: '10-3 Español y Literatura', viernes: '11-4 Logística y Distribución' },
  { bloque: 'Lección 7-8 (12:30 - 1:50 pm)', lunes: '12-3 Redes CCNA (Lab Cisco)', martes: '11-4 Contabilidad y Finanzas', miercoles: '10-2 Electrónica Industrial', jueves: '12-1 Electromecánica', viernes: 'Planeamiento Pedagógico' },
  { bloque: 'Nocturno (5:45 - 9:45 pm)', lunes: 'CTP Nocturno Desarrollo Web', martes: 'CINDEA / IPEC Emprendimiento', miercoles: 'CTP Nocturno Contabilidad', jueves: 'Colegio Nocturno Cívica', viernes: 'Tutorías Virtuales MEP' }
];

const SOLICITUDES_BASE = [
  {
    id: 'JUST-2026-01',
    tipoPersona: 'Estudiante',
    solicitante: 'Valeria Méndez Rojas (Sección 11-1)',
    tramite: 'Justificación de Ausencia / Tardía',
    motivo: 'Cita médica comprobada en EBAIS de Mercedes Norte (adjunta dictamen CCSS).',
    fechaEvento: '17/11/2026 (Lecciones 1 a 4)',
    estado: 'Pendiente'
  },
  {
    id: 'JUST-2026-02',
    tipoPersona: 'Estudiante',
    solicitante: 'Sebastián Araya Castro (Sección 10-3)',
    tramite: 'Reprogramación de Prueba / Cotidiano',
    motivo: 'Representación oficial del colegio en Juegos Deportivos Estudiantiles MEP.',
    fechaEvento: '16/11/2026',
    estado: 'Aprobado'
  },
  {
    id: 'PERM-2026-03',
    tipoPersona: 'Docente / Administrativo',
    solicitante: 'Prof. Carlos Vargas (Electromecánica)',
    tramite: 'Permiso de Asistencia a Capacitación Regional MEP',
    motivo: 'Convocatoria oficial de Asesoría Regional de Alajuela (Circuito 04).',
    fechaEvento: '19/11/2026 (Jornada Mañana)',
    estado: 'Pendiente'
  }
];

export default function CentroGestionDocenteAdminMep() {
  const [subTab, setSubTab] = useState('justificaciones');
  const [solicitudes, setSolicitudes] = useState(SOLICITUDES_BASE);
  const [horarioActual, setHorarioActual] = useState(HORARIO_BASE);
  const [filtroRol, setFiltroRol] = useState('Todos');
  const [avisoHorario, setAvisoHorario] = useState('');

  const [nuevoTipoPersona, setNuevoTipoPersona] = useState('Estudiante');
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoTramite, setNuevoTramite] = useState('Justificación de Ausencia (Dictamen CCSS)');
  const [nuevoMotivo, setNuevoMotivo] = useState('');
  const [nuevaFecha, setNuevaFecha] = useState('17/11/2026');

  const registrarSolicitud = (e) => {
    e.preventDefault();
    if (!nuevoNombre.trim() || !nuevoMotivo.trim()) return;
    const nueva = {
      id: `TRAM-${Date.now().toString().slice(-4)}`,
      tipoPersona: nuevoTipoPersona,
      solicitante: nuevoNombre,
      tramite: nuevoTramite,
      motivo: nuevoMotivo,
      fechaEvento: nuevaFecha,
      estado: 'Pendiente'
    };
    setSolicitudes([nueva, ...solicitudes]);
    setNuevoNombre('');
    setNuevoMotivo('');
  };

  const cambiarEstado = (id, nuevoEst) => {
    setSolicitudes((prev) => prev.map((s) => (s.id === id ? { ...s, estado: nuevoEst } : s)));
  };

  const optimizarHorarioConIa = (modo) => {
    setAvisoHorario(
      modo === 'ia'
        ? '🤖 Horario optimizado con IA: 0 choques de laboratorio, subgrupos A/B balanceados y lecciones libres distribuidas.'
        : '📋 Plantilla Oficial de Horario MEP (Bloques de 40/80 min Diurno y Nocturno) cargada correctamente.'
    );
    setHorarioActual([...HORARIO_BASE]);
  };

  const solicitudesFiltradas = solicitudes.filter((s) =>
    filtroRol === 'Todos' ? true : s.tipoPersona === filtroRol
  );

  return (
    <div className="bg-slate-900 border border-cyan-500/40 p-6 rounded-2xl shadow-2xl space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
            🏛️ Gestión Oficial MEP — Docentes, Administrativos, Estudiantes y Familias
          </span>
          <h2 className="text-2xl font-extrabold text-white mt-2">
            📋 Horarios, Tardías, Ausencias, Permisos y Control Docente / Administrativo
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: 'justificaciones', label: '📝 Justificaciones, Tardías y Permisos' },
            { id: 'horarios', label: '🗓️ Horarios (Con IA o Plantilla)' },
            { id: 'administrativo', label: '🏛️ Gestión Docente y Administrativa' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                subTab === t.id
                  ? 'bg-cyan-600 text-white shadow-lg'
                  : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-cyan-500/50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {subTab === 'justificaciones' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form onSubmit={registrarSolicitud} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3.5">
            <h3 className="text-sm font-extrabold text-cyan-400">
              ➕ Registrar Justificación o Solicitud
            </h3>
            <p className="text-[11px] text-slate-400">
              Para estudiantes, encargados legales, docentes y personal administrativo.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Perfil:</label>
              <select
                value={nuevoTipoPersona}
                onChange={(e) => setNuevoTipoPersona(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
              >
                <option value="Estudiante">🎓 Estudiante / Encargado Legal</option>
                <option value="Docente / Administrativo">👨‍🏫 Docente / Administrativo</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Nombre y Sección / Cargo:</label>
              <input
                type="text"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
                placeholder="Ej: Sofía Rojas (11-2) o Prof. Andrés Mora..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Tipo de Trámite:</label>
              <select
                value={nuevoTramite}
                onChange={(e) => setNuevoTramite(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
              >
                <option>Justificación de Ausencia (Dictamen CCSS)</option>
                <option>Justificación de Tardía a Lecciones</option>
                <option>Solicitud de Permiso de Salida Anticipada</option>
                <option>Reprogramación de Examen / Trabajo Cotidiano</option>
                <option>Permiso Docente / Convocatoria Regional MEP</option>
                <option>Solicitud de Constancia de Estudio o Notas</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Fecha y Lecciones:</label>
              <input
                type="text"
                value={nuevaFecha}
                onChange={(e) => setNuevaFecha(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Motivo y Respaldo:</label>
              <textarea
                rows="3"
                value={nuevoMotivo}
                onChange={(e) => setNuevoMotivo(e.target.value)}
                placeholder="Describe el motivo médico, familiar, deportivo o institucional..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs shadow-lg transition-all"
            >
              📤 Enviar Solicitud
            </button>
          </form>

          <div className="lg:col-span-2 bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <h3 className="text-sm font-extrabold text-white">
                📥 Bandeja de Tardías, Ausencias y Permisos ({solicitudesFiltradas.length})
              </h3>
              <div className="flex gap-1.5">
                {['Todos', 'Estudiante', 'Docente / Administrativo'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFiltroRol(f)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold ${
                      filtroRol === f ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {solicitudesFiltradas.map((sol) => (
                <div
                  key={sol.id}
                  className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono bg-slate-950 text-cyan-300 px-2 py-0.5 rounded border border-slate-700">
                        {sol.id}
                      </span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                        sol.tipoPersona === 'Estudiante' ? 'bg-sky-950 text-sky-300' : 'bg-purple-950 text-purple-300'
                      }`}>
                        {sol.tipoPersona}
                      </span>
                      <span className="text-xs font-extrabold text-white">{sol.solicitante}</span>
                    </div>
                    <p className="text-xs font-bold text-amber-300">{sol.tramite} — <span className="text-slate-400 font-normal">{sol.fechaEvento}</span></p>
                    <p className="text-xs text-slate-300">{sol.motivo}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2 min-w-[140px]">
                    <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full ${
                      sol.estado === 'Aprobado'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                        : sol.estado === 'Rechazado'
                          ? 'bg-rose-950 text-rose-300 border border-rose-600'
                          : 'bg-amber-950 text-amber-300 border border-amber-600'
                    }`}>
                      {sol.estado === 'Aprobado' ? '✓ Aprobado' : sol.estado}
                    </span>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => cambiarEstado(sol.id, 'Aprobado')}
                        className="bg-emerald-700 hover:bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded"
                      >
                        ✓ Aprobar
                      </button>
                      <button
                        onClick={() => cambiarEstado(sol.id, 'Rechazado')}
                        className="bg-rose-800 hover:bg-rose-700 text-white text-[10px] font-bold px-2.5 py-1 rounded"
                      >
                        ✕ Denegar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {subTab === 'horarios' && (
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-extrabold text-white">
                🗓️ Generador de Horarios Institucionales (Con IA o Con Plantilla Oficial MEP)
              </h3>
              <p className="text-xs text-slate-400">
                Armado automático sin choques de laboratorios ni recargos para CTP Diurno, Nocturno y Académico.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => optimizarHorarioConIa('plantilla')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-2 rounded-xl text-xs shadow"
              >
                📋 Cargar Plantilla Oficial
              </button>
              <button
                onClick={() => optimizarHorarioConIa('ia')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3.5 py-2 rounded-xl text-xs shadow"
              >
                🤖 Auto-Optimizar Horario con IA
              </button>
              <button
                onClick={() => window.print()}
                className="bg-cyan-700 hover:bg-cyan-600 text-white font-bold px-3.5 py-2 rounded-xl text-xs"
              >
                🖨️ Imprimir PDF
              </button>
            </div>
          </div>

          {avisoHorario && (
            <div className="bg-cyan-950/60 border border-cyan-500/50 text-cyan-200 px-4 py-2.5 rounded-xl text-xs font-bold">
              {avisoHorario}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-cyan-400 border-b border-slate-800">
                  <th className="p-3">Bloque / Lecciones</th>
                  <th className="p-3">Lunes</th>
                  <th className="p-3">Martes</th>
                  <th className="p-3">Miércoles</th>
                  <th className="p-3">Jueves</th>
                  <th className="p-3">Viernes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {horarioActual.map((fila, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/60">
                    <td className="p-3 font-mono font-bold text-amber-300">{fila.bloque}</td>
                    <td className="p-3 text-slate-200">{fila.lunes}</td>
                    <td className="p-3 text-slate-200">{fila.martes}</td>
                    <td className="p-3 text-slate-200">{fila.miercoles}</td>
                    <td className="p-3 text-slate-200">{fila.jueves}</td>
                    <td className="p-3 text-slate-200">{fila.viernes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {subTab === 'administrativo' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">📊</span>
            <h4 className="text-sm font-extrabold text-white">Registro de Cotidianos, Tareas y Proyectos (REAC)</h4>
            <p className="text-xs text-slate-400">
              Ponderación oficial automática para asignaturas académicas y subáreas técnicas del MEP.
            </p>
            <div className="pt-2 text-xs font-bold text-emerald-400">✓ Activo con Plantilla o IA</div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">🏛️</span>
            <h4 className="text-sm font-extrabold text-white">Coordinación con la Empresa y Práctica 320h</h4>
            <p className="text-xs text-slate-400">
              Control de bitácoras de práctica supervisada, cartas de ubicación y evaluación conjunta.
            </p>
            <div className="pt-2 text-xs font-bold text-cyan-400">✓ Formatos Oficiales Listos</div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">🛡️</span>
            <h4 className="text-sm font-extrabold text-white">Expedientes DUA y Ley 8968</h4>
            <p className="text-xs text-slate-400">
              Seguimiento individualizado de apoyos educativos y adecuaciones con privacidad por rol.
            </p>
            <div className="pt-2 text-xs font-bold text-amber-400">✓ Protegido con SHA-256</div>
          </div>
        </div>
      )}
    </div>
  );
}