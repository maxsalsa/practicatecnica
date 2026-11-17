import React, { useState } from 'react';

const BOLETAS_PERSONAL_DIRECCION_INICIAL = [
  {
    id: 'DIR-2026-101',
    funcionario: 'Ing. Max Salazar Sánchez (Docente Técnico TI)',
    cedula: '2-0564-0891',
    puesto: 'Profesor Enseñanza Técnico Profesional (20 lecciones)',
    destinatario: 'Dirección Institucional / Subdirección CTP Mercedes Norte',
    tipoBoleta: 'Cita Médica Especializada (CCSS / Hospital / EBAIS)',
    fechaHora: '2026-11-18 | 07:00 am a 10:30 am',
    motivoDetalle: 'Control médico programado en Hospital San Vicente de Paúl / Clínica CCSS. Se adjunta comprobante de asistencia y queda guía de trabajo autónomo con Coordinación Técnica.',
    rebajoSalarial: 'Con goce salarial (Comprobante CCSS)',
    estadoDireccion: 'Aprobado por Dirección'
  },
  {
    id: 'DIR-2026-102',
    funcionario: 'Profa. Laura Brenes Mora (Departamento de Ciencias)',
    cedula: '4-0198-0432',
    puesto: 'Profesora de Biología y Química',
    destinatario: 'Dirección Institucional',
    tipoBoleta: 'Justificación de Llegada Tardía (Marca de Reloj Biométrico)',
    fechaHora: '2026-11-17 | Marca registrada: 07:14 am (Entrada 07:00 am)',
    motivoDetalle: 'Colisión vehicular múltiple en ruta principal Heredia-Alajuela. Se adjunta reporte oficial de tránsito y se coordina reposición efectiva.',
    rebajoSalarial: 'Justificada sin rebajo',
    estadoDireccion: 'Pendiente Firma Director(a)'
  },
  {
    id: 'DIR-2026-103',
    funcionario: 'Lic. Edgar García Porras (Coordinación Académica)',
    cedula: '1-0943-0211',
    puesto: 'Coordinador Académico',
    destinatario: 'Dirección / Supervisión Circuito 04',
    tipoBoleta: 'Convocatoria Oficial MEP / Dirección Regional',
    fechaHora: '2026-11-19 | Jornada Completa',
    motivoDetalle: 'Sesión técnica regional sobre lineamientos SEA/PIAD y Pruebas Nacionales Estandarizadas en Dirección Regional de Educación.',
    rebajoSalarial: 'Comisión Oficial MEP',
    estadoDireccion: 'Aprobado por Dirección'
  },
  {
    id: 'DIR-2026-104',
    funcionario: 'Sr. Carlos Rodríguez (Agente de Seguridad / Administrativo)',
    cedula: '2-0411-0775',
    puesto: 'Administrativo / Conserjería y Seguridad',
    destinatario: 'Dirección y Junta Administrativa',
    tipoBoleta: 'Emergencia de Salud / Incapacidad INS-CCSS',
    fechaHora: '2026-11-17 | Turno Tarde-Noche',
    motivoDetalle: 'Atención de urgencia médica familiar comprobada en servicio de emergencias.',
    rebajoSalarial: 'Licencia Comprobada',
    estadoDireccion: 'Pendiente Firma Director(a)'
  }
];

const SOLICITUDES_ESTUDIANTES_INICIAL = [
  {
    id: 'EST-2026-01',
    solicitante: 'Valeria Méndez Rojas (Sección 11-1 • Desarrollo Web)',
    docenteGuia: 'Ing. Max Salazar Sánchez',
    tramite: 'Justificación de Ausencia / Tardía Estudiantil',
    motivo: 'Cita médica en EBAIS de Mercedes Norte (presenta carné de citas CCSS dentro de los 3 días hábiles REA).',
    fechaEvento: '17/11/2026 (Lecciones 1 a 4)',
    estado: 'Aprobado'
  },
  {
    id: 'EST-2026-02',
    solicitante: 'Sebastián Araya Castro (Sección 12-2 • Ciberseguridad)',
    docenteGuia: 'Ing. Steven Corrales Bustos',
    tramite: 'Reprogramación de Prueba Escrita / Trabajo Cotidiano',
    motivo: 'Representación oficial del CTP en Final Regional de Juegos Deportivos Estudiantiles MEP.',
    fechaEvento: '18/11/2026',
    estado: 'Pendiente'
  }
];

const REGISTRO_NOTAS_PIAD_SEA_INICIAL = [
  { cedula: '1-1945-0821', nombre: 'Méndez Rojas Valeria Sofía', seccion: '11-1', especialidad: 'Desarrollo Web', cotidiano: 35, tareas: 10, proyecto: 24, pruebas: 23, asistencia: 5 },
  { cedula: '2-0884-0319', nombre: 'Araya Castro Sebastián', seccion: '11-1', especialidad: 'Desarrollo Web', cotidiano: 32, tareas: 9, proyecto: 22, pruebas: 21, asistencia: 5 },
  { cedula: '4-0312-0954', nombre: 'Mora Jiménez Ana Lucía', seccion: '11-1', especialidad: 'Desarrollo Web', cotidiano: 34, tareas: 10, proyecto: 25, pruebas: 25, asistencia: 5 },
  { cedula: '1-1899-0412', nombre: 'Solís Vargas Diego Andrés', seccion: '12-1', especialidad: 'Ciberseguridad', cotidiano: 28, tareas: 8, proyecto: 20, pruebas: 18, asistencia: 4 },
  { cedula: '2-0911-0650', nombre: 'Salazar Quesada Camila', seccion: '10-2', especialidad: 'Contabilidad Pura', cotidiano: 35, tareas: 10, proyecto: 25, pruebas: 24, asistencia: 5 },
  { cedula: '3-0544-0118', nombre: 'Corrales Hernández Mateo', seccion: '10-3', especialidad: 'Accounting Bilingüe', cotidiano: 33, tareas: 9, proyecto: 23, pruebas: 22, asistencia: 5 }
];

const HORARIO_BASE = [
  { bloque: 'Lección 1-2 (7:00 - 8:20 am)', lunes: '11-1 Desarrollo Web (Lab 3)', martes: '10-2 Química (Lab Ciencias)', miercoles: '12-1 Ciberseguridad', jueves: '11-3 Estudios Sociales', viernes: '12-2 Accounting Bilingüe' },
  { bloque: 'Lección 3-4 (8:35 - 9:55 am)', lunes: '11-1 Desarrollo Web (Lab 3)', martes: '10-1 Biología', miercoles: '12-1 Ciberseguridad', jueves: '9-4 Educación Física / Deportes', viernes: '12-2 Ejecutivo Comercial' },
  { bloque: 'Lección 5-6 (10:15 - 11:35 am)', lunes: 'Coordinación Técnica', martes: '11-2 Matemáticas MEP', miercoles: 'Atención a Familias', jueves: '10-3 Español y Literatura', viernes: '11-4 Logística y Distribución' },
  { bloque: 'Lección 7-8 (12:30 - 1:50 pm)', lunes: '12-3 Redes CCNA (Lab Cisco)', martes: '11-4 Contabilidad Pura', miercoles: '10-2 Electrónica Industrial', jueves: '12-1 Electromecánica', viernes: 'Planeamiento Pedagógico' },
  { bloque: 'Nocturno (5:45 - 9:45 pm)', lunes: 'CTP Nocturno Desarrollo Web', martes: 'CINDEA / IPEC Emprendimiento', miercoles: 'CTP Nocturno Contabilidad', jueves: 'Colegio Nocturno Cívica', viernes: 'Tutorías Virtuales MEP' }
];

export default function CentroGestionDocenteAdminMep({ usuarioActual }) {
  const [subTab, setSubTab] = useState('personal_direccion'); // 'personal_direccion' | 'estudiantes' | 'piad_sea' | 'horarios'
  const [boletasPersonal, setBoletasPersonal] = useState(BOLETAS_PERSONAL_DIRECCION_INICIAL);
  const [solicitudesEst, setSolicitudesEst] = useState(SOLICITUDES_ESTUDIANTES_INICIAL);
  const [registroNotas, setRegistroNotas] = useState(REGISTRO_NOTAS_PIAD_SEA_INICIAL);
  const [horarioActual, setHorarioActual] = useState(HORARIO_BASE);
    const [avisoSistema, setAvisoSistema] = useState('');

  React.useEffect(() => {
    try {
      const rapidas = JSON.parse(localStorage.getItem('pt_solicitudes_rapidas_v32') || '[]');
      if (rapidas.length > 0) {
        const nuevasDir = rapidas
          .filter((r) => r.flujo === 'personal_direccion')
          .map((r) => ({
            id: r.id,
            funcionario: r.nombre,
            cedula: r.cedulaSeccion,
            puesto: r.cedulaSeccion,
            destinatario: r.destinatario,
            tipoBoleta: r.tipoMotivo,
            fechaHora: r.fechaHora,
            motivoDetalle: r.detalle,
            rebajoSalarial: 'Registrado vía Ventanilla 1-Clic',
            estadoDireccion: r.estado
          }));
        const nuevasEst = rapidas
          .filter((r) => r.flujo === 'estudiante_docente')
          .map((r) => ({
            id: r.id,
            solicitante: `${r.nombre} (${r.cedulaSeccion})`,
            docenteGuia: r.destinatario,
            tramite: r.tipoMotivo,
            motivo: r.detalle,
            fechaEvento: r.fechaHora,
            estado: r.estado
          }));
        if (nuevasDir.length > 0) setBoletasPersonal((prev) => [...nuevasDir, ...prev]);
        if (nuevasEst.length > 0) setSolicitudesEst((prev) => [...nuevasEst, ...prev]);
      }
    } catch (e) {}
  }, []);

  // Campos Boleta de Personal -> Dirección
  const [funcNombre, setFuncNombre] = useState(usuarioActual?.nombre || 'Ing. Max Salazar Sánchez');
  const [funcCedula, setFuncCedula] = useState('2-0564-0891');
  const [funcPuesto, setFuncPuesto] = useState('Docente Técnico / Académico MEP');
  const [funcTipo, setFuncTipo] = useState('Cita Médica Especializada (CCSS / INS)');
  const [funcFecha, setFuncFecha] = useState('2026-11-18 | 07:00 am - 11:00 am');
  const [funcMotivo, setFuncMotivo] = useState('');

  // Campos nuevo estudiante en Registro SEA/PIAD
  const [nuevaCedEst, setNuevaCedEst] = useState('');
  const [nuevoNomEst, setNuevoNomEst] = useState('');
  const [nuevaSecEst, setNuevaSecEst] = useState('11-1');

  const enviarBoletaDireccion = (e) => {
    e.preventDefault();
    if (!funcNombre.trim() || !funcMotivo.trim()) return;
    const nueva = {
      id: `DIR-2026-${Math.floor(100 + Math.random() * 899)}`,
      funcionario: funcNombre,
      cedula: funcCedula,
      puesto: funcPuesto,
      destinatario: 'Dirección Institucional / Subdirección CTP',
      tipoBoleta: funcTipo,
      fechaHora: funcFecha,
      motivoDetalle: funcMotivo,
      rebajoSalarial: 'Sujeto a comprobante oficial',
      estadoDireccion: 'Pendiente Firma Director(a)'
    };
    setBoletasPersonal([nueva, ...boletasPersonal]);
    setFuncMotivo('');
    setAvisoSistema('✓ Boleta oficial de personal enviada a la bandeja de Dirección / Subdirección con copia al expediente digital.');
  };

  const resolverBoletaDireccion = (id, nuevoEstado) => {
    setBoletasPersonal((prev) =>
      prev.map((b) => (b.id === id ? { ...b, estadoDireccion: nuevoEstado } : b))
    );
  };

  const imprimirBoletaPersonal = (b) => {
    const w = window.open('', '_blank', 'width=850,height=650');
    if (!w) return;
    w.document.write(`
      <html>
        <head>
          <title>Boleta Oficial de Personal a Dirección — ${b.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 32px; color: #0f172a; }
            .head { border-bottom: 3px solid #0284c7; padding-bottom: 12px; margin-bottom: 18px; }
            .box { border: 1px solid #cbd5e1; border-radius: 10px; padding: 16px; background: #f8fafc; margin-bottom: 16px; }
            .firmas { display: flex; justify-content: space-between; margin-top: 48px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="head">
            <h2 style="margin:0;">🏛️ MINISTERIO DE EDUCACIÓN PÚBLICA — BOLETA OFICIAL DE PERSONAL A DIRECCIÓN</h2>
            <p style="margin:4px 0 0 0;font-size:13px;">Control de Asistencia, Llegadas Tardías, Citas Médicas, Emergencias y Permisos Laborales</p>
          </div>
          <div class="box">
            <p><strong>Consecutivo Oficial:</strong> ${b.id}</p>
            <p><strong>Persona Funcionaria:</strong> ${b.funcionario} | <strong>Cédula:</strong> ${b.cedula}</p>
            <p><strong>Puesto / Cargo:</strong> ${b.puesto}</p>
            <p><strong>Dirigido a:</strong> ${b.destinatario}</p>
            <p><strong>Tipo de Gestión:</strong> ${b.tipoBoleta}</p>
            <p><strong>Fecha y Hora / Jornada:</strong> ${b.fechaHora}</p>
            <p><strong>Justificación y Respaldo:</strong> ${b.motivoDetalle}</p>
            <p><strong>Resolución de Dirección:</strong> ${b.estadoDireccion}</p>
          </div>
          <div class="firmas">
            <div>___________________________________<br/>Firma de la Persona Funcionaria</div>
            <div>___________________________________<br/>Firma y Sello de Dirección / Subdirección</div>
          </div>
          <script>window.onload = function() { window.print(); };</script>
        </body>
      </html>
    `);
    w.document.close();
  };

  // Exportar CSV en formato oficial compatible con PIAD / SEA / Excel (con BOM UTF-8 para tildes)
  const exportarCsvPiadSea = (formato = 'PIAD') => {
    const encabezados = [
      'Sistema_Formato',
      'Cedula_Identidad',
      'Nombre_Completo_Estudiante',
      'Seccion',
      'Especialidad_Asignatura',
      'Trabajo_Cotidiano_35',
      'Tareas_10',
      'Proyecto_25',
      'Pruebas_25',
      'Asistencia_5',
      'Nota_Final_100',
      'Condicion_REA'
    ];

    const filas = registroNotas.map((r) => {
      const notaFinal = Number(r.cotidiano) + Number(r.tareas) + Number(r.proyecto) + Number(r.pruebas) + Number(r.asistencia);
      const condicion = notaFinal >= 70 ? 'APROBADO' : 'APLAZADO';
      return [
        formato,
        r.cedula,
        `"${r.nombre}"`,
        r.seccion,
        `"${r.especialidad}"`,
        r.cotidiano,
        r.tareas,
        r.proyecto,
        r.pruebas,
        r.asistencia,
        notaFinal,
        condicion
      ].join(';');
    });

    // Agregar BOM (\uFEFF) para que Microsoft Excel, PIAD y SEA lean perfectamente los acentos y la ñ
    const contenidoCsv = '\uFEFF' + encabezados.join(';') + '\r\n' + filas.join('\r\n');
    const blob = new Blob([contenidoCsv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Planilla_Oficial_${formato}_MEP_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setAvisoSistema(`📥 Archivo CSV en formato oficial ${formato} (separado por punto y coma con codificación UTF-8 BOM para Excel) descargado con éxito.`);
  };

  const agregarEstudiantePiad = (e) => {
    e.preventDefault();
    if (!nuevaCedEst.trim() || !nuevoNomEst.trim()) return;
    setRegistroNotas([
      ...registroNotas,
      {
        cedula: nuevaCedEst,
        nombre: nuevoNomEst,
        seccion: nuevaSecEst,
        especialidad: 'Desarrollo Web / CTP',
        cotidiano: 35,
        tareas: 10,
        proyecto: 25,
        pruebas: 20,
        asistencia: 5
      }
    ]);
    setNuevaCedEst('');
    setNuevoNomEst('');
  };

  return (
    <div className="bg-slate-900 border border-cyan-500/40 p-5 sm:p-6 rounded-2xl shadow-2xl space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
            🏛️ Gestión Oficial MEP — Dirección, Personal Docente/Admin, SEA & PIAD
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
            📋 Boletas de Personal a Dirección, Justificaciones Estudiantiles, Registro CSV (SEA / PIAD) y Horarios
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: 'personal_direccion', label: '👨‍🏫 Boletas Personal → Dirección (Citas, Tardías, Salud)' },
            { id: 'piad_sea', label: '📊 Registro de Notas & Exportar CSV (SEA / PIAD)' },
            { id: 'estudiantes', label: '🎓 Justificaciones Estudiantes ↔ Docentes' },
            { id: 'horarios', label: '🗓️ Horarios (IA / Plantilla)' }
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

      {avisoSistema && (
        <div className="bg-emerald-950/90 border border-emerald-500 text-emerald-200 px-4 py-3 rounded-xl text-xs font-bold flex justify-between items-center">
          <span>{avisoSistema}</span>
          <button onClick={() => setAvisoSistema('')} className="text-emerald-300 hover:text-white">✕</button>
        </div>
      )}

      {/* SUB-PESTAÑA 1: BOLETAS DEL PERSONAL DOCENTE Y ADMINISTRATIVO HACIA LA DIRECCIÓN */}
      {subTab === 'personal_direccion' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form onSubmit={enviarBoletaDireccion} className="bg-slate-950 border border-cyan-500/40 p-5 rounded-2xl space-y-3.5">
            <span className="text-[10px] font-extrabold uppercase bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-700">
              Uso Exclusivo Personal → Dirección
            </span>
            <h3 className="text-sm font-extrabold text-white">
              ➕ Emitir Boleta de Personal hacia la Dirección
            </h3>
            <p className="text-[11px] text-slate-400">
              Para justificar llegadas tardías de reloj marcador, citas médicas CCSS/INS, emergencias de salud, licencias o permisos de salida ante el Director(a).
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Nombre del Funcionario(a):</label>
              <input
                type="text"
                value={funcNombre}
                onChange={(e) => setFuncNombre(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Cédula:</label>
                <input
                  type="text"
                  value={funcCedula}
                  onChange={(e) => setFuncCedula(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Cargo / Puesto:</label>
                <input
                  type="text"
                  value={funcPuesto}
                  onChange={(e) => setFuncPuesto(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Motivo Oficial ante Dirección:</label>
              <select
                value={funcTipo}
                onChange={(e) => setFuncTipo(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-amber-300 font-semibold"
              >
                <option>Cita Médica Especializada (CCSS / INS)</option>
                <option>Justificación de Llegada Tardía (Marca de Reloj)</option>
                <option>Emergencia de Salud / Atención Familiar Urgente</option>
                <option>Incapacidad Médica Oficial (Boleta CCSS / INS)</option>
                <option>Permiso de Salida Anticipada (Con / Sin Goce)</option>
                <option>Asistencia a Convocatoria Regional / Asesoría MEP</option>
                <option>Licencia por Maternidad / Paternidad / Duelo</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Fecha, Hora de Marca o Jornada:</label>
              <input
                type="text"
                value={funcFecha}
                onChange={(e) => setFuncFecha(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Explicación Detallada y Plan de Reposición / Guías:</label>
              <textarea
                rows="3"
                value={funcMotivo}
                onChange={(e) => setFuncMotivo(e.target.value)}
                placeholder="Indique centro médico, motivo de la tardía o emergencia y el material que queda asignado a las secciones..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold py-2.5 rounded-xl text-xs shadow-lg transition-all"
            >
              📤 Elevar Boleta a Dirección Institucional
            </button>
          </form>

          <div className="lg:col-span-2 bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-white">
                  🏛️ Despacho de Dirección / Subdirección — Boletas del Personal ({boletasPersonal.length})
                </h3>
                <p className="text-[11px] text-slate-400">
                  El Director(a), Subdirector(a) o SuperAdmin puede aprobar, denegar o imprimir el comprobante oficial firmado.
                </p>
              </div>
            </div>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {boletasPersonal.map((b) => (
                <div key={b.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono bg-slate-950 text-cyan-300 px-2.5 py-0.5 rounded border border-slate-700">
                        {b.id}
                      </span>
                      <span className="text-xs font-extrabold text-white">{b.funcionario}</span>
                      <span className="text-[11px] text-slate-400">({b.puesto})</span>
                    </div>

                    <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                      b.estadoDireccion.includes('Aprobado')
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                        : b.estadoDireccion.includes('Rechazado')
                          ? 'bg-rose-950 text-rose-300 border border-rose-600'
                          : 'bg-amber-950 text-amber-300 border border-amber-600'
                    }`}>
                      {b.estadoDireccion}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-amber-300">
                    📌 {b.tipoBoleta} — <span className="text-cyan-300 font-mono">{b.fechaHora}</span>
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">{b.motivoDetalle}</p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
                    <span className="text-[11px] text-slate-400">
                      Condición: <strong className="text-slate-200">{b.rebajoSalarial}</strong>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => resolverBoletaDireccion(b.id, 'Aprobado por Dirección ✓')}
                        className="bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-lg"
                      >
                        ✓ Visto Bueno Dirección
                      </button>
                      <button
                        onClick={() => resolverBoletaDireccion(b.id, 'Solicita Comprobante Adicional')}
                        className="bg-amber-700 hover:bg-amber-600 text-white text-[11px] font-bold px-3 py-1 rounded-lg"
                      >
                        ⚠️ Solicitar Boleta CCSS
                      </button>
                      <button
                        onClick={() => imprimirBoletaPersonal(b)}
                        className="bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] font-bold px-3 py-1 rounded-lg"
                      >
                        🖨️ Imprimir Boleta PDF
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-PESTAÑA 2: REGISTRO DE CALIFICACIONES Y EXPORTACIÓN CSV OFICIAL PARA SEA Y PIAD */}
      {subTab === 'piad_sea' && (
        <div className="space-y-4">
          <div className="bg-slate-950 border border-emerald-500/40 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-white">
                📊 Registro Digital de Calificaciones y Exportador Oficial CSV (Compatible con SEA y PIAD MEP)
              </h3>
              <p className="text-xs text-slate-400">
                Edita en vivo los rubros de Trabajo Cotidiano (35%), Tareas (10%), Proyecto (25%), Pruebas (25%) y Asistencia (5%). Descarga el archivo <code className="text-cyan-300">.csv</code> listo para importar en PIAD o SEA.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => exportarCsvPiadSea('SEA_MEP_2026')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs shadow-lg flex items-center gap-1.5"
              >
                📥 Descargar CSV Formato SEA
              </button>
              <button
                onClick={() => exportarCsvPiadSea('PIAD_HISTORICO')}
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs shadow-lg flex items-center gap-1.5"
              >
                📥 Descargar CSV Formato PIAD
              </button>
            </div>
          </div>

          {/* Formulario rápido para añadir estudiante a la planilla */}
          <form onSubmit={agregarEstudiantePiad} className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-cyan-400">➕ Agregar Estudiante a Planilla:</span>
            <input
              type="text"
              value={nuevaCedEst}
              onChange={(e) => setNuevaCedEst(e.target.value)}
              placeholder="Cédula (ej. 1-1988-0234)"
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white w-44"
            />
            <input
              type="text"
              value={nuevoNomEst}
              onChange={(e) => setNuevoNomEst(e.target.value)}
              placeholder="Apellidos y Nombre del Estudiante"
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white min-w-[200px]"
            />
            <input
              type="text"
              value={nuevaSecEst}
              onChange={(e) => setNuevaSecEst(e.target.value)}
              placeholder="Sección"
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white w-20"
            />
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-1.5 rounded-lg">
              Insertar Fila
            </button>
          </form>

          <div className="overflow-x-auto bg-slate-950 border border-slate-800 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-cyan-400 border-b border-slate-800">
                  <th className="p-2.5">Cédula</th>
                  <th className="p-2.5">Estudiante</th>
                  <th className="p-2.5">Sección</th>
                  <th className="p-2.5">Cotidiano (35%)</th>
                  <th className="p-2.5">Tareas (10%)</th>
                  <th className="p-2.5">Proyecto (25%)</th>
                  <th className="p-2.5">Pruebas (25%)</th>
                  <th className="p-2.5">Asistencia (5%)</th>
                  <th className="p-2.5">Nota Final</th>
                  <th className="p-2.5">Condición</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {registroNotas.map((r, idx) => {
                  const nota = Number(r.cotidiano) + Number(r.tareas) + Number(r.proyecto) + Number(r.pruebas) + Number(r.asistencia);
                  const aprobado = nota >= 70;
                  const actualizarCampo = (campo, val) => {
                    const copia = [...registroNotas];
                    copia[idx][campo] = Math.max(0, Number(val) || 0);
                    setRegistroNotas(copia);
                  };
                  return (
                    <tr key={idx} className="hover:bg-slate-900/60">
                      <td className="p-2.5 font-mono text-slate-300">{r.cedula}</td>
                      <td className="p-2.5 font-bold text-white">{r.nombre}</td>
                      <td className="p-2.5 font-mono text-amber-300">{r.seccion}</td>
                      {['cotidiano', 'tareas', 'proyecto', 'pruebas', 'asistencia'].map((campo) => (
                        <td key={campo} className="p-2">
                          <input
                            type="number"
                            value={r[campo]}
                            onChange={(e) => actualizarCampo(campo, e.target.value)}
                            className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-center font-mono text-white"
                          />
                        </td>
                      ))}
                      <td className="p-2.5 font-mono text-sm font-extrabold text-cyan-400">{nota}</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                          aprobado ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' : 'bg-rose-950 text-rose-300 border border-rose-600'
                        }`}>
                          {aprobado ? 'APROBADO' : 'APLAZADO'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-PESTAÑA 3: JUSTIFICACIONES ESTUDIANTILES */}
      {subTab === 'estudiantes' && (
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
          <h3 className="text-sm font-extrabold text-white">
            🎓 Justificaciones de Estudiantes y Familias hacia los Docentes ({solicitudesEst.length})
          </h3>
          {solicitudesEst.map((s) => (
            <div key={s.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-wrap justify-between items-center gap-3">
              <div>
                <p className="text-xs font-extrabold text-white">{s.solicitante} → Docente: <span className="text-cyan-300">{s.docenteGuia}</span></p>
                <p className="text-xs text-amber-300 font-bold">{s.tramite} ({s.fechaEvento})</p>
                <p className="text-xs text-slate-300">{s.motivo}</p>
              </div>
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
                ✓ {s.estado}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* SUB-PESTAÑA 4: HORARIOS */}
      {subTab === 'horarios' && (
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <h3 className="text-base font-extrabold text-white">🗓️ Horarios Institucionales (Con IA o Plantilla)</h3>
            <button onClick={() => window.print()} className="bg-cyan-600 text-white font-bold px-4 py-2 rounded-xl text-xs">
              🖨️ Imprimir Horario
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-cyan-400 border-b border-slate-800">
                  <th className="p-3">Bloque</th>
                  <th className="p-3">Lunes</th>
                  <th className="p-3">Martes</th>
                  <th className="p-3">Miércoles</th>
                  <th className="p-3">Jueves</th>
                  <th className="p-3">Viernes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {horarioActual.map((f, i) => (
                  <tr key={i}>
                    <td className="p-3 font-mono font-bold text-amber-300">{f.bloque}</td>
                    <td className="p-3">{f.lunes}</td>
                    <td className="p-3">{f.martes}</td>
                    <td className="p-3">{f.miercoles}</td>
                    <td className="p-3">{f.jueves}</td>
                    <td className="p-3">{f.viernes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}