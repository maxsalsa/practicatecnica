import React, { useState } from 'react';

const HORARIO_SEMANAL_INICIAL = [
  { bloque: 'LecciÃ³n 1-2 (7:00 - 8:20 am)', lunes: '11-1 Desarrollo Web (Lab 3)', martes: '10-2 Ciencias / QuÃ­mica', miercoles: '12-1 Ciberseguridad', jueves: '11-3 Estudios Sociales', viernes: '12-2 DiseÃ±o de Software' },
  { bloque: 'LecciÃ³n 3-4 (8:35 - 9:55 am)', lunes: '11-1 Desarrollo Web (Lab 3)', martes: '10-1 BiologÃ­a (Lab Ciencias)', miercoles: '12-1 Ciberseguridad', jueves: '9-4 EducaciÃ³n FÃ­sica', viernes: '12-2 DiseÃ±o de Software' },
  { bloque: 'LecciÃ³n 5-6 (10:15 - 11:35 am)', lunes: 'CoordinaciÃ³n TÃ©cnica / Dpto', martes: '11-2 MatemÃ¡ticas MEP', miercoles: 'AtenciÃ³n a Padres / Estudiantes', jueves: '10-3 EspaÃ±ol y Lectura', viernes: 'ComitÃ© EvaluaciÃ³n / REAC' },
  { bloque: 'LecciÃ³n 7-8 (12:30 - 1:50 pm)', lunes: '12-3 Redes CCNA (Lab Cisco)', martes: '11-4 Contabilidad y Finanzas', miercoles: '10-2 InglÃ©s TÃ©cnico', jueves: '12-1 PrÃ¡ctica Supervisada', viernes: 'Planeamiento PedagÃ³gico' },
  { bloque: 'Nocturno (5:45 - 9:45 pm)', lunes: 'SecciÃ³n Nocturna TI (MÃ³dulo I)', martes: 'CINDEA / IPEC Emprendimiento', miercoles: 'SecciÃ³n Nocturna Contabilidad', jueves: 'Liceo Nocturno CÃ­vica', viernes: 'TutorÃ­as Virtuales Teams' }
];

const SOLICITUDES_INICIALES = [
  {
    id: 'JUST-2026-01',
    tipoPersona: 'Estudiante',
    solicitante: 'Valeria MÃ©ndez Rojas (SecciÃ³n 11-1)',
    tramite: 'JustificaciÃ³n de Ausencia / TardÃ­a',
    motivo: 'Cita mÃ©dica comprobada en EBAIS de Mercedes Norte (adjunta dictamen CCSS).',
    fechaEvento: '2026-11-17 (Lecciones 1 a 4)',
    estado: 'Pendiente'
  },
  {
    id: 'JUST-2026-02',
    tipoPersona: 'Estudiante',
    solicitante: 'SebastiÃ¡n Araya Castro (SecciÃ³n 10-3)',
    tramite: 'Solicitud de ReprogramaciÃ³n de Prueba / Cotidiano',
    motivo: 'ParticipaciÃ³n oficial representando al colegio en Juegos Deportivos Estudiantiles MEP.',
    fechaEvento: '2026-11-16',
    estado: 'Aprobado'
  },
  {
    id: 'PERM-2026-03',
    tipoPersona: 'Docente / Administrativo',
    solicitante: 'Prof. Carlos Vargas (ElectromecÃ¡nica)',
    tramite: 'Solicitud de Permiso de Salida / CapacitaciÃ³n MEP',
    motivo: 'Convocatoria oficial de AsesorÃ­a Regional de Alajuela (Circuito 04).',
    fechaEvento: '2026-11-19 (Jornada MaÃ±ana)',
    estado: 'Pendiente'
  },
  {
    id: 'JUST-2026-04',
    tipoPersona: 'Docente / Administrativo',
    solicitante: 'Profa. Laura Brenes (BiologÃ­a y QuÃ­mica)',
    tramite: 'JustificaciÃ³n de Marca / TardÃ­a por TrÃ¡nsito',
    motivo: 'Cierre vial reportado en ruta hacia Heredia/Alajuela; reposiciÃ³n coordinada.',
    fechaEvento: '2026-11-17 (7:12 am)',
    estado: 'Aprobado'
  }
];

export default function CentroGestionDocenteAdminMep({ usuarioActual }) {
  const [subTab, setSubTab] = useState('justificaciones'); // 'justificaciones' | 'horarios' | 'administrativo'
  const [solicitudes, setSolicitudes] = useState(SOLICITUDES_INICIALES);
  const [filtroRol, setFiltroRol] = useState('Todos');

  // Formulario para crear nueva solicitud/justificaciÃ³n de estudiante o docente
  const [nuevoTipoPersona, setNuevoTipoPersona] = useState('Estudiante');
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoTramite, setNuevoTramite] = useState('JustificaciÃ³n de Ausencia (Dictamen CCSS)');
  const [nuevoMotivo, setNuevoMotivo] = useState('');
  const [nuevaFecha, setNuevaFecha] = useState('2026-11-17');

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
    setSolicitudes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, estado: nuevoEst } : s))
    );
  };

  const solicitudesFiltradas = solicitudes.filter((s) =>
    filtroRol === 'Todos' ? true : s.tipoPersona === filtroRol
  );

  return (
    <div className="bg-slate-900 border border-cyan-500/40 p-6 rounded-2xl shadow-2xl space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
            ðŸ›ï¸ GestiÃ³n Oficial MEP â€” REAC 2026 & Ley 8968
          </span>
          <h2 className="text-2xl font-extrabold text-white mt-2">
            ðŸ“‹ Centro Docente, Administrativo, Horarios, Permisos y Justificaciones (TardÃ­as / Ausencias)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Control integral para estudiantes, familias, docentes, coordinaciÃ³n acadÃ©mica y direcciÃ³n institucional.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: 'justificaciones', label: 'ðŸ“ Permisos, TardÃ­as y Ausencias (Estudiantes y Docentes)' },
            { id: 'horarios', label: 'ðŸ—“ï¸ Horarios de Lecciones (Diurno y Nocturno)' },
            { id: 'administrativo', label: 'ðŸ›ï¸ Actas, Boletas y Control Administrativo' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
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

      {/* SUB-PESTAÃ‘A 1: JUSTIFICACIONES, PERMISOS, TARDÃAS Y AUSENCIAS */}
      {subTab === 'justificaciones' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulario de EnvÃ­o de JustificaciÃ³n o Permiso */}
          <form onSubmit={registrarSolicitud} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3.5">
            <h3 className="text-sm font-extrabold text-cyan-400">
              âž• Enviar Nueva Solicitud / JustificaciÃ³n
            </h3>
            <p className="text-[11px] text-slate-400">
              VÃ¡lido dentro de los 3 dÃ­as hÃ¡biles segÃºn el Reglamento de EvaluaciÃ³n de los Aprendizajes (REA - MEP).
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Perfil del Solicitante:</label>
              <select
                value={nuevoTipoPersona}
                onChange={(e) => setNuevoTipoPersona(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
              >
                <option value="Estudiante">ðŸŽ“ Estudiante / Encargado Legal</option>
                <option value="Docente / Administrativo">ðŸ‘¨â€ðŸ« Docente / Funcionario Administrativo</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Nombre y SecciÃ³n / Departamento:</label>
              <input
                type="text"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
                placeholder="Ej: SofÃ­a Rojas (11-2) o Prof. AndrÃ©s Mora..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Tipo de TrÃ¡mite:</label>
              <select
                value={nuevoTramite}
                onChange={(e) => setNuevoTramite(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
              >
                <option>JustificaciÃ³n de Ausencia (Dictamen CCSS)</option>
                <option>JustificaciÃ³n de TardÃ­a a Lecciones</option>
                <option>Solicitud de Permiso de Salida Anticipada</option>
                <option>ReprogramaciÃ³n de Examen / Trabajo Cotidiano</option>
                <option>Permiso Docente / Asistencia a Convocatoria MEP</option>
                <option>Solicitud de Constancia de Estudio / Notas</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Fecha y Lecciones Afectadas:</label>
              <input
                type="text"
                value={nuevaFecha}
                onChange={(e) => setNuevaFecha(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">JustificaciÃ³n y Comprobante Adjunto:</label>
              <textarea
                rows="3"
                value={nuevoMotivo}
                onChange={(e) => setNuevoMotivo(e.target.value)}
                placeholder="Describe el motivo mÃ©dico, familiar, deportivo o administrativo..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs shadow-lg transition-all"
            >
              ðŸ“¤ Registrar Solicitud con Sello SHA-256
            </button>
          </form>

          {/* Bandeja de AprobaciÃ³n y Seguimiento */}
          <div className="lg:col-span-2 bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <h3 className="text-sm font-extrabold text-white">
                ðŸ“¥ Bandeja de Solicitudes, TardÃ­as, Ausencias y Permisos ({solicitudesFiltradas.length})
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
                    <p className="text-xs font-bold text-amber-300">{sol.tramite} â€” <span className="text-slate-400 font-normal">{sol.fechaEvento}</span></p>
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
                      {sol.estado === 'Aprobado' ? 'âœ“ Justificado / Aprobado' : sol.estado}
                    </span>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => cambiarEstado(sol.id, 'Aprobado')}
                        className="bg-emerald-700 hover:bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded"
                      >
                        âœ“ Aprobar
                      </button>
                      <button
                        onClick={() => cambiarEstado(sol.id, 'Rechazado')}
                        className="bg-rose-800 hover:bg-rose-700 text-white text-[10px] font-bold px-2.5 py-1 rounded"
                      >
                        âœ• Denegar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-PESTAÃ‘A 2: HORARIOS DOCENTES Y ESTUDIANTILES (DIURNO Y NOCTURNO) */}
      {subTab === 'horarios' && (
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-extrabold text-white">
                ðŸ—“ï¸ Matriz de Horarios Institucionales (Lecciones de 40/80 min â€” Diurno y Nocturno)
              </h3>
              <p className="text-xs text-slate-400">
                Sincronizado con laboratorios de cÃ³mputo, talleres tÃ©cnicos, aulas acadÃ©micas y secciones nocturnas.
              </p>
            </div>
            <button
              onClick={() => window.print()}
              className="bg-cyan-700 hover:bg-cyan-600 text-white font-bold px-4 py-2 rounded-xl text-xs"
            >
              ðŸ–¨ï¸ Imprimir Horario Oficial
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-cyan-400 border-b border-slate-800">
                  <th className="p-3">Bloque / Lecciones</th>
                  <th className="p-3">Lunes</th>
                  <th className="p-3">Martes</th>
                  <th className="p-3">MiÃ©rcoles</th>
                  <th className="p-3">Jueves</th>
                  <th className="p-3">Viernes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {HORARIO_SEMANAL_INICIAL.map((fila, idx) => (
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

      {/* SUB-PESTAÃ‘A 3: GESTIÃ“N ADMINISTRATIVA Y DOCENTE */}
      {subTab === 'administrativo' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">ðŸ“Š</span>
            <h4 className="text-sm font-extrabold text-white">Control de Asistencia y Cotidianos (SEA / REAC)</h4>
            <p className="text-xs text-slate-400">
              CÃ¡lculo automÃ¡tico de porcentajes de Trabajo Cotidiano, Tareas, Proyectos, Pruebas y Asistencia segÃºn modalidad acadÃ©mica o tÃ©cnica.
            </p>
            <div className="pt-2 text-xs font-bold text-emerald-400">âœ“ Sincronizado con CoordinaciÃ³n AcadÃ©mica</div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">ðŸ›ï¸</span>
            <h4 className="text-sm font-extrabold text-white">CoordinaciÃ³n con la Empresa y PrÃ¡ctica Supervisada</h4>
            <p className="text-xs text-slate-400">
              Control de bitÃ¡coras de 320 horas para duodÃ©cimo aÃ±o (CTP Diurno y Nocturno), seguros estudiantiles e informes de evaluaciÃ³n empresarial.
            </p>
            <div className="pt-2 text-xs font-bold text-cyan-400">âœ“ Formatos Oficiales MEP Listos</div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">ðŸ›¡ï¸</span>
            <h4 className="text-sm font-extrabold text-white">Adecuaciones Curriculares y DUA (Ley 7600)</h4>
            <p className="text-xs text-slate-400">
              Expedientes confidenciales protegidos por la Ley 8968 para apoyos educativos significativos, no significativos, de acceso y alto potencial.
            </p>
            <div className="pt-2 text-xs font-bold text-amber-400">âœ“ Cifrado SHA-256 por Rol</div>
          </div>
        </div>
      )}
    </div>
  );
}