import React, { useState, useEffect } from 'react';
import { EscudoOficialMep, EscudoCtpMercedesNorte } from './LogosOficialesMepCtp';

const BOLETAS_PERSONAL_DIRECCION_INICIAL = [
  {
    id: 'CTP-MN-0101',
    funcionario: 'Ing. Max Salazar Sánchez',
    cedula: '2-0564-0891',
    puesto: 'Docente de Desarrollo Web y Ciberseguridad',
    destinatario: 'Dirección Institucional — CTP Mercedes Norte',
    tipoBoleta: 'Cita Médica Especializada (CCSS / Hospital San Vicente de Paúl)',
    fechaHora: '18/11/2026 | 07:00 am a 10:30 am',
    motivoDetalle: 'Control médico especializado programado. Se adjunta comprobante oficial de asistencia CCSS y queda práctica guiada asignada en laboratorio con Coordinación Técnica.',
    rebajoSalarial: 'Con goce salarial (Comprobante CCSS)',
    estadoDireccion: 'Aprobado por Dirección ✓'
  },
  {
    id: 'CTP-MN-0102',
    funcionario: 'M.Sc. Gabriela Villalobos Sancho',
    cedula: '4-0211-0654',
    puesto: 'Docente de Contabilidad y Finanzas / Accounting',
    destinatario: 'Dirección Institucional — CTP Mercedes Norte',
    tipoBoleta: 'Justificación de Llegada Tardía (Marca Biométrica)',
    fechaHora: '17/11/2026 | Marca registrada: 07:12 am (Jornada inicia 07:00 am)',
    motivoDetalle: 'Cierre vial por colisión en ruta Mercedes Norte - Barva. Se adjunta boleta de tránsito y se repone el bloque en atención estudiantil.',
    rebajoSalarial: 'Justificada sin rebajo',
    estadoDireccion: 'Aprobado por Dirección ✓'
  },
  {
    id: 'CTP-MN-0103',
    funcionario: 'Lic. Edgar García Porras',
    cedula: '1-0943-0211',
    puesto: 'Coordinación Académica',
    destinatario: 'Dirección Institucional / Supervisión Circuito 04',
    tipoBoleta: 'Asistencia a Convocatoria Oficial Dirección Regional Heredia',
    fechaHora: '19/11/2026 | 08:00 am a 03:30 pm',
    motivoDetalle: 'Reunión oficial de coordinación regional sobre pruebas estandarizadas y cierre de período lectivo.',
    rebajoSalarial: 'Comisión Oficial MEP',
    estadoDireccion: 'Aprobado por Dirección ✓'
  },
  {
    id: 'CTP-MN-0104',
    funcionario: 'Ing. Esteban Elizondo Cordero',
    cedula: '3-0452-0912',
    puesto: 'Docente de Electrónica Industrial y Electromecánica',
    destinatario: 'Dirección Institucional — CTP Mercedes Norte',
    tipoBoleta: 'Permiso por Emergencia Médica Familiar',
    fechaHora: '17/11/2026 | Lecciones 5 a 8 (10:15 am a 01:50 pm)',
    motivoDetalle: 'Traslado urgente de familiar directo a clínica de Heredia. Se entrega comprobante médico de atención.',
    rebajoSalarial: 'Pendiente de resolución',
    estadoDireccion: 'Pendiente Firma Director(a)'
  },
  {
    id: 'CTP-MN-0105',
    funcionario: 'Licda. Marcela Chavarría Umaña',
    cedula: '1-1244-0538',
    puesto: 'Docente de Ejecutivo Comercial y Servicio al Cliente',
    destinatario: 'Dirección Institucional — CTP Mercedes Norte',
    tipoBoleta: 'Licencia Oficial / Capacitación Sector Productivo',
    fechaHora: '20/11/2026 | Jornada Mañana',
    motivoDetalle: 'Coordinación de práctica profesional supervisada (320 horas) con empresas de Zona Franca Metropolitana.',
    rebajoSalarial: 'Representación Institucional',
    estadoDireccion: 'Pendiente Firma Director(a)'
  }
];

const SOLICITUDES_ESTUDIANTES_INICIAL = [
  {
    id: 'JUST-EST-201',
    solicitante: 'Valeria Sofía Méndez Rojas (Sección 11-1 • Desarrollo Web)',
    encargado: 'Sra. Adriana Rojas Benavides (Madre / Encargada Legal)',
    docenteGuia: 'Ing. Max Salazar Sánchez',
    tramite: 'Justificación de Ausencia por Cita Médica (CCSS)',
    motivo: 'Atención odontológica y laboratorio clínico en EBAIS de Mercedes Norte. Adjunta comprobante sellado.',
    fechaEvento: '17/11/2026 (Lecciones 1 a 4)',
    estado: 'Aprobado ✓'
  },
  {
    id: 'JUST-EST-202',
    solicitante: 'Sebastián Araya Castro (Sección 12-1 • Ciberseguridad)',
    encargado: 'Sr. Marco Araya Solano (Padre / Encargado Legal)',
    docenteGuia: 'Ing. Steven Corrales Bustos',
    tramite: 'Solicitud de Reprogramación de Prueba Escrita y Cotidiano',
    motivo: 'Convocatoria oficial representando al CTP Mercedes Norte en Final Regional de Atletismo y Ajedrez MEP.',
    fechaEvento: '18/11/2026 (Jornada Completa)',
    estado: 'Aprobado ✓'
  },
  {
    id: 'JUST-EST-203',
    solicitante: 'Camila Salazar Quesada (Sección 10-2 • Contabilidad y Finanzas)',
    encargado: 'Sra. Patricia Quesada Mora (Encargada Legal)',
    docenteGuia: 'M.Sc. Gabriela Villalobos Sancho',
    tramite: 'Justificación de Llegada Tardía por Transporte Estudiantil',
    motivo: 'Atraso documentado en unidad de transporte público ruta San Rafael - Heredia por lluvia intensa.',
    fechaEvento: '17/11/2026 (Lección 1)',
    estado: 'Pendiente'
  },
  {
    id: 'JUST-EST-204',
    solicitante: 'Mateo Corrales Hernández (Sección 11-3 • Electrónica Industrial)',
    encargado: 'Sr. Jorge Corrales Vega (Encargado Legal)',
    docenteGuia: 'Ing. Esteban Elizondo Cordero',
    tramite: 'Permiso de Salida Anticipada con Encargado Presente',
    motivo: 'Cita de renovación de pasaporte y visado para feria científica internacional estudiantil.',
    fechaEvento: '19/11/2026 (Salida 11:35 am)',
    estado: 'Pendiente'
  }
];

const REGISTRO_CALIFICACIONES_INICIAL = [
  { cedula: '4-0289-0821', nombre: 'Méndez Rojas Valeria Sofía', seccion: '11-1', especialidad: 'Desarrollo Web', cotidiano: 35, tareas: 10, proyecto: 24, pruebas: 23, asistencia: 5 },
  { cedula: '4-0291-0319', nombre: 'Araya Castro Sebastián', seccion: '12-1', especialidad: 'Ciberseguridad', cotidiano: 33, tareas: 9, proyecto: 23, pruebas: 22, asistencia: 5 },
  { cedula: '1-1954-0954', nombre: 'Mora Jiménez Ana Lucía', seccion: '11-1', especialidad: 'Desarrollo Web', cotidiano: 34, tareas: 10, proyecto: 25, pruebas: 25, asistencia: 5 },
  { cedula: '2-0899-0412', nombre: 'Solís Vargas Diego Andrés', seccion: '12-1', especialidad: 'Ciberseguridad', cotidiano: 30, tareas: 9, proyecto: 21, pruebas: 20, asistencia: 5 },
  { cedula: '4-0301-0650', nombre: 'Salazar Quesada Camila', seccion: '10-2', especialidad: 'Contabilidad y Finanzas', cotidiano: 35, tareas: 10, proyecto: 25, pruebas: 24, asistencia: 5 },
  { cedula: '3-0544-0118', nombre: 'Corrales Hernández Mateo', seccion: '11-3', especialidad: 'Electrónica Industrial', cotidiano: 33, tareas: 9, proyecto: 23, pruebas: 22, asistencia: 5 },
  { cedula: '4-0298-0771', nombre: 'Bolaños Alfaro Jimena', seccion: '10-4', especialidad: 'Accounting Bilingüe', cotidiano: 34, tareas: 10, proyecto: 24, pruebas: 23, asistencia: 5 },
  { cedula: '1-1960-0332', nombre: 'Ulate Benavides Daniel', seccion: '11-2', especialidad: 'Administración y Logística', cotidiano: 31, tareas: 8, proyecto: 22, pruebas: 19, asistencia: 5 },
  { cedula: '4-0305-0190', nombre: 'Vindas Murillo Mariana', seccion: '12-2', especialidad: 'Ejecutivo Comercial', cotidiano: 35, tareas: 10, proyecto: 25, pruebas: 24, asistencia: 5 },
  { cedula: '2-0915-0844', nombre: 'Chacón Ramírez Alejandro', seccion: '10-1', especialidad: 'Diseño y Desarrollo Digital', cotidiano: 32, tareas: 9, proyecto: 24, pruebas: 21, asistencia: 5 }
];

const HORARIO_BASE = [
  { bloque: 'Lección 1-2 (7:00 - 8:20 am)', lunes: '11-1 Desarrollo Web (Lab 3)', martes: '10-2 Química (Lab Ciencias)', miercoles: '12-1 Ciberseguridad (Lab 2)', jueves: '11-3 Estudios Sociales (Aula 14)', viernes: '10-4 Accounting Bilingüe' },
  { bloque: 'Lección 3-4 (8:35 - 9:55 am)', lunes: '11-1 Desarrollo Web (Lab 3)', martes: '10-1 Biología (Lab Ciencias)', miercoles: '12-1 Ciberseguridad (Lab 2)', jueves: '9-4 Educación Física (Gimnasio)', viernes: '12-2 Ejecutivo Comercial' },
  { bloque: 'Lección 5-6 (10:15 - 11:35 am)', lunes: 'Coordinación Técnica', martes: '11-2 Matemáticas MEP', miercoles: 'Atención a Familias y Estudiantes', jueves: '10-3 Español y Literatura', viernes: '11-2 Administración y Logística' },
  { bloque: 'Lección 7-8 (12:30 - 1:50 pm)', lunes: '12-3 Redes CCNA (Lab Cisco)', martes: '10-2 Contabilidad y Finanzas', miercoles: '11-3 Electrónica Industrial', jueves: '12-1 Electromecánica (Taller)', viernes: '10-1 Diseño y Desarrollo Digital' },
  { bloque: 'Nocturno (5:45 - 9:45 pm)', lunes: 'Sección Nocturna Desarrollo Web', martes: 'CINDEA / IPEC Emprendimiento', miercoles: 'Sección Nocturna Contabilidad', jueves: 'Colegio Nocturno Cívica', viernes: 'Tutorías y Práctica Supervisada' }
];

export default function CentroGestionDocenteAdminMep({ usuarioActual }) {
  const [subTab, setSubTab] = useState('personal_direccion');
  const [boletasPersonal, setBoletasPersonal] = useState(BOLETAS_PERSONAL_DIRECCION_INICIAL);
  const [solicitudesEst, setSolicitudesEst] = useState(SOLICITUDES_ESTUDIANTES_INICIAL);
  const [registroNotas, setRegistroNotas] = useState(REGISTRO_CALIFICACIONES_INICIAL);
  const [horarioActual, setHorarioActual] = useState(HORARIO_BASE);
  const [avisoSistema, setAvisoSistema] = useState('');

  const [funcNombre, setFuncNombre] = useState(usuarioActual?.nombre || 'Ing. Max Salazar Sánchez');
  const [funcCedula, setFuncCedula] = useState('2-0564-0891');
  const [funcPuesto, setFuncPuesto] = useState('Docente de Educación Técnica Profesional');
  const [funcTipo, setFuncTipo] = useState('Cita Médica Especializada (CCSS / INS)');
  const [funcFecha, setFuncFecha] = useState('18/11/2026 | 07:00 am - 11:00 am');
  const [funcMotivo, setFuncMotivo] = useState('');

  const [nuevaCedEst, setNuevaCedEst] = useState('');
  const [nuevoNomEst, setNuevoNomEst] = useState('');
  const [nuevaSecEst, setNuevaSecEst] = useState('11-1');

  useEffect(() => {
    try {
      const rapidas = JSON.parse(localStorage.getItem('pt_solicitudes_rapidas_mep') || '[]');
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
            rebajoSalarial: 'Registrado en Ventanilla Institucional',
            estadoDireccion: r.estado
          }));
        const nuevasEst = rapidas
          .filter((r) => r.flujo === 'estudiante_docente')
          .map((r) => ({
            id: r.id,
            solicitante: `${r.nombre} (${r.cedulaSeccion})`,
            encargado: 'Encargado Legal Registrado',
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

  const enviarBoletaDireccion = (e) => {
    e.preventDefault();
    if (!funcNombre.trim() || !funcMotivo.trim()) return;
    const nueva = {
      id: `CTP-MN-${Math.floor(100 + Math.random() * 899)}`,
      funcionario: funcNombre,
      cedula: funcCedula,
      puesto: funcPuesto,
      destinatario: 'Dirección Institucional — CTP Mercedes Norte',
      tipoBoleta: funcTipo,
      fechaHora: funcFecha,
      motivoDetalle: funcMotivo,
      rebajoSalarial: 'Con respaldo documental adjunto',
      estadoDireccion: 'Pendiente Firma Director(a)'
    };
    setBoletasPersonal([nueva, ...boletasPersonal]);
    setFuncMotivo('');
    setAvisoSistema('✓ Boleta oficial de personal registrada y enviada al despacho de Dirección.');
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
          <title>Boleta Oficial de Personal — CTP Mercedes Norte (${b.id})</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 32px; color: #0f172a; }
            .head { border-bottom: 3px solid #0284c7; padding-bottom: 12px; margin-bottom: 18px; }
            .box { border: 1px solid #cbd5e1; border-radius: 10px; padding: 16px; background: #f8fafc; margin-bottom: 16px; }
            .firmas { display: flex; justify-content: space-between; margin-top: 48px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="head">
            <h2 style="margin:0;">MINISTERIO DE EDUCACIÓN PÚBLICA — CTP MERCEDES NORTE</h2>
            <p style="margin:4px 0 0 0;font-size:13px;">Dirección Regional de Heredia • Circuito 04 • Boleta Oficial de Personal a Dirección</p>
          </div>
          <div class="box">
            <p><strong>Consecutivo:</strong> ${b.id}</p>
            <p><strong>Funcionario(a):</strong> ${b.funcionario} | <strong>Cédula:</strong> ${b.cedula}</p>
            <p><strong>Cargo:</strong> ${b.puesto}</p>
            <p><strong>Destinatario:</strong> ${b.destinatario}</p>
            <p><strong>Tipo de Solicitud:</strong> ${b.tipoBoleta}</p>
            <p><strong>Fecha y Hora:</strong> ${b.fechaHora}</p>
            <p><strong>Detalle y Respaldo:</strong> ${b.motivoDetalle}</p>
            <p><strong>Estado en Dirección:</strong> ${b.estadoDireccion}</p>
          </div>
          <div class="firmas">
            <div>___________________________________<br/>Firma de la Persona Funcionaria</div>
            <div>___________________________________<br/>Firma y Sello de Dirección Institucional</div>
          </div>
          <script>window.onload = function() { window.print(); };</script>
        </body>
      </html>
    `);
    w.document.close();
  };

  // Exportar CSV Oficial para Registro MEP y Excel (Sin siglas externas)
  const exportarPlanillaCsvOficial = (modalidad = 'Colegio_Tecnico_CTP') => {
    const encabezados = [
      'Institucion',
      'Cedula_Estudiante',
      'Nombre_Completo_Estudiante',
      'Seccion',
      'Especialidad_Asignatura',
      'Trabajo_Cotidiano_35',
      'Tareas_10',
      'Proyecto_25',
      'Pruebas_25',
      'Asistencia_5',
      'Nota_Final_100',
      'Condicion_Anual'
    ];

    const filas = registroNotas.map((r) => {
      const notaFinal = Number(r.cotidiano) + Number(r.tareas) + Number(r.proyecto) + Number(r.pruebas) + Number(r.asistencia);
      const condicion = notaFinal >= 70 ? 'APROBADO' : 'APLAZADO';
      return [
        '"CTP Mercedes Norte - MEP"',
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

    const contenidoCsv = '\uFEFF' + encabezados.join(';') + '\r\n' + filas.join('\r\n');
    const blob = new Blob([contenidoCsv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Registro_Calificaciones_MEP_${modalidad}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setAvisoSistema('📥 Planilla Oficial de Calificaciones exportada en formato CSV (compatible con Excel y sistemas oficiales del MEP).');
  };

  const agregarEstudianteRegistro = (e) => {
    e.preventDefault();
    if (!nuevaCedEst.trim() || !nuevoNomEst.trim()) return;
    setRegistroNotas([
      ...registroNotas,
      {
        cedula: nuevaCedEst,
        nombre: nuevoNomEst,
        seccion: nuevaSecEst,
        especialidad: 'Desarrollo Web',
        cotidiano: 35,
        tareas: 10,
        proyecto: 25,
        pruebas: 22,
        asistencia: 5
      }
    ]);
    setNuevaCedEst('');
    setNuevoNomEst('');
  };

  return (
    <div className="bg-slate-900 border border-cyan-500/40 p-5 sm:p-6 rounded-2xl shadow-2xl space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <EscudoOficialMep className="w-11 h-11 shrink-0" />
          <EscudoCtpMercedesNorte className="w-11 h-11 shrink-0" />
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
              🏛️ Ministerio de Educación Pública • CTP Mercedes Norte
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              Despacho de Dirección, Boletas de Personal, Justificaciones y Registro de Calificaciones
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: 'personal_direccion', label: '👨‍🏫 Boletas Personal → Dirección' },
            { id: 'calificaciones_csv', label: '📊 Registro de Notas y Exportar CSV' },
            { id: 'estudiantes', label: '🎓 Justificaciones de Estudiantes' },
            { id: 'horarios', label: '🗓️ Horarios Institucionales' }
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

      {subTab === 'personal_direccion' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form onSubmit={enviarBoletaDireccion} className="bg-slate-950 border border-cyan-500/40 p-5 rounded-2xl space-y-3.5">
            <span className="text-[10px] font-extrabold uppercase bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-700">
              Personal Docente y Administrativo → Dirección
            </span>
            <h3 className="text-sm font-extrabold text-white">
              ➕ Emitir Boleta Oficial ante Dirección
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Funcionario(a):</label>
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
                <label className="block text-xs font-bold text-slate-300 mb-1">Puesto:</label>
                <input
                  type="text"
                  value={funcPuesto}
                  onChange={(e) => setFuncPuesto(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Motivo Oficial:</label>
              <select
                value={funcTipo}
                onChange={(e) => setFuncTipo(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-amber-300 font-semibold"
              >
                <option>Cita Médica Especializada (CCSS / INS)</option>
                <option>Justificación de Llegada Tardía (Marca de Reloj)</option>
                <option>Emergencia de Salud / Urgencia Familiar</option>
                <option>Incapacidad Médica Oficial (Boleta CCSS / INS)</option>
                <option>Permiso de Salida Anticipada</option>
                <option>Asistencia a Convocatoria Regional MEP</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Fecha y Hora / Lecciones:</label>
              <input
                type="text"
                value={funcFecha}
                onChange={(e) => setFuncFecha(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Justificación y Respaldo:</label>
              <textarea
                rows="3"
                value={funcMotivo}
                onChange={(e) => setFuncMotivo(e.target.value)}
                placeholder="Detalle de cita médica, tardía o emergencia y material asignado a los grupos..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold py-2.5 rounded-xl text-xs shadow-lg transition-all"
            >
              📤 Enviar Boleta a Dirección
            </button>
          </form>

          <div className="lg:col-span-2 bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4">
            <h3 className="text-sm font-extrabold text-white border-b border-slate-800 pb-3">
              🏛️ Bandeja de Dirección — Solicitudes del Personal ({boletasPersonal.length})
            </h3>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {boletasPersonal.map((b) => (
                <div key={b.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
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
                        : 'bg-amber-950 text-amber-300 border border-amber-600'
                    }`}>
                      {b.estadoDireccion}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-amber-300">
                    📌 {b.tipoBoleta} — <span className="text-cyan-300 font-mono">{b.fechaHora}</span>
                  </p>
                  <p className="text-xs text-slate-300">{b.motivoDetalle}</p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800">
                    <span className="text-[11px] text-slate-400">{b.rebajoSalarial}</span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => resolverBoletaDireccion(b.id, 'Aprobado por Dirección ✓')}
                        className="bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-lg"
                      >
                        ✓ Aprobar en Dirección
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

      {subTab === 'calificaciones_csv' && (
        <div className="space-y-4">
          <div className="bg-slate-950 border border-emerald-500/40 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-white">
                📊 Registro Oficial de Calificaciones MEP y Exportación de Planillas CSV
              </h3>
              <p className="text-xs text-slate-400">
                Ponderación oficial: Trabajo Cotidiano (35%), Tareas (10%), Proyecto (25%), Pruebas (25%) y Asistencia (5%).
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => exportarPlanillaCsvOficial('Educacion_Tecnica_CTP')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs shadow-lg flex items-center gap-1.5"
              >
                📥 Exportar Planilla Oficial CSV (Excel / MEP)
              </button>
              <button
                onClick={() => window.print()}
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs shadow-lg"
              >
                🖨️ Imprimir Acta de Notas PDF
              </button>
            </div>
          </div>

          <form onSubmit={agregarEstudianteRegistro} className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-cyan-400">➕ Incluir Estudiante:</span>
            <input
              type="text"
              value={nuevaCedEst}
              onChange={(e) => setNuevaCedEst(e.target.value)}
              placeholder="Cédula (ej. 4-0310-0512)"
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white w-44"
            />
            <input
              type="text"
              value={nuevoNomEst}
              onChange={(e) => setNuevoNomEst(e.target.value)}
              placeholder="Apellidos y Nombre Completo"
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
              Agregar a Planilla
            </button>
          </form>

          <div className="overflow-x-auto bg-slate-950 border border-slate-800 rounded-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-cyan-400 border-b border-slate-800">
                  <th className="p-2.5">Cédula</th>
                  <th className="p-2.5">Estudiante</th>
                  <th className="p-2.5">Sección / Especialidad</th>
                  <th className="p-2.5">Cotidiano (35%)</th>
                  <th className="p-2.5">Tareas (10%)</th>
                  <th className="p-2.5">Proyecto (25%)</th>
                  <th className="p-2.5">Pruebas (25%)</th>
                  <th className="p-2.5">Asistencia (5%)</th>
                  <th className="p-2.5">Promedio</th>
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
                      <td className="p-2.5 text-amber-300">{r.seccion} • {r.especialidad}</td>
                      {['cotidiano', 'tareas', 'proyecto', 'pruebas', 'asistencia'].map((campo) => (
                        <td key={campo} className="p-2">
                          <input
                            type="number"
                            value={r[campo]}
                            onChange={(e) => actualizarCampo(campo, e.target.value)}
                            className="w-14 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-center font-mono text-white"
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

      {subTab === 'estudiantes' && (
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-3">
          <h3 className="text-sm font-extrabold text-white">
            🎓 Justificaciones de Estudiantes y Encargados Legales hacia los Docentes ({solicitudesEst.length})
          </h3>
          {solicitudesEst.map((s) => (
            <div key={s.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-wrap justify-between items-center gap-3">
              <div className="space-y-1">
                <p className="text-xs font-extrabold text-white">
                  {s.solicitante} → Docente: <span className="text-cyan-300">{s.docenteGuia}</span>
                </p>
                <p className="text-[11px] text-slate-400">Encargado(a): {s.encargado}</p>
                <p className="text-xs text-amber-300 font-bold">{s.tramite} ({s.fechaEvento})</p>
                <p className="text-xs text-slate-300">{s.motivo}</p>
              </div>
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
                {s.estado}
              </span>
            </div>
          ))}
        </div>
      )}

      {subTab === 'horarios' && (
        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <h3 className="text-base font-extrabold text-white">🗓️ Horario Oficial CTP Mercedes Norte (Diurno y Nocturno)</h3>
            <button onClick={() => window.print()} className="bg-cyan-600 text-white font-bold px-4 py-2 rounded-xl text-xs">
              🖨️ Imprimir Horario Oficial
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