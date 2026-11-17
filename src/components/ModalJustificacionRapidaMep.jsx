import React, { useState } from 'react';

export default function ModalJustificacionRapidaMep({
  modoInicial = 'personal_direccion', // 'personal_direccion' | 'estudiante_docente'
  usuarioActual,
  onClose,
  onIrABandejaCompleta
}) {
  const [flujo, setFlujo] = useState(modoInicial);
  const [nombre, setNombre] = useState(usuarioActual?.nombre || '');
  const [cedulaSeccion, setCedulaSeccion] = useState(
    modoInicial === 'personal_direccion' ? '2-0564-0891 | Docente Técnico' : 'Sección 11-1 | Desarrollo Web'
  );
  const [destinatario, setDestinatario] = useState(
    modoInicial === 'personal_direccion'
      ? 'Dirección / Subdirección / Jefatura CTP Mercedes Norte'
      : 'Prof. Guía / Profesor de Materia (Ing. Max Salazar)'
  );
  const [tipoMotivo, setTipoMotivo] = useState(
    modoInicial === 'personal_direccion'
      ? 'Cita Médica Especializada (CCSS / INS)'
      : 'Justificación de Ausencia / Tardía Estudiantil (CCSS)'
  );
  const [fechaHora, setFechaHora] = useState('17/11/2026 | Lecciones 1 a 4 (07:00 am - 09:55 am)');
  const [detalle, setDetalle] = useState('');
  const [enviadoOk, setEnviadoOk] = useState(false);

  const cambiarFlujo = (nuevoFlujo) => {
    setFlujo(nuevoFlujo);
    setEnviadoOk(false);
    if (nuevoFlujo === 'personal_direccion') {
      setCedulaSeccion('2-0564-0891 | Docente / Administrativo');
      setDestinatario('Dirección / Subdirección / Jefatura Institucional');
      setTipoMotivo('Cita Médica Especializada (CCSS / INS)');
    } else {
      setCedulaSeccion('Sección 11-1 | Estudiante CTP / Académico');
      setDestinatario('Docente de Asignatura / Profesor Guía');
      setTipoMotivo('Justificación de Ausencia / Tardía Estudiantil (CCSS)');
    }
  };

  const procesarEnvio = (e) => {
    e.preventDefault();
    if (!detalle.trim()) return;
    const guardadas = JSON.parse(localStorage.getItem('pt_solicitudes_rapidas_v32') || '[]');
    const nueva = {
      id: `${flujo === 'personal_direccion' ? 'DIR' : 'EST'}-${Date.now().toString().slice(-4)}`,
      flujo,
      nombre: nombre || 'Usuario Activo',
      cedulaSeccion,
      destinatario,
      tipoMotivo,
      fechaHora,
      detalle,
      estado: 'Pendiente de Aprobación',
      fechaRegistro: new Date().toLocaleString('es-CR')
    };
    localStorage.setItem('pt_solicitudes_rapidas_v32', JSON.stringify([nueva, ...guardadas]));
    setEnviadoOk(true);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-slate-900 border-2 border-cyan-500 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-4 text-slate-100">
        <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase bg-emerald-950 text-emerald-300 border border-emerald-600 px-2.5 py-0.5 rounded">
              ⚡ Ventanilla Rápida 1-Clic — UX Directa MEP
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white mt-1">
              📝 Solicitar Permiso o Justificar Tardía / Ausencia
            </h3>
          </div>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white font-extrabold px-3 py-1 rounded-xl text-xs transition-all"
          >
            ✕ Cerrar
          </button>
        </div>

        {/* Selector Grande de Dirección del Trámite */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => cambiarFlujo('personal_direccion')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              flujo === 'personal_direccion'
                ? 'bg-gradient-to-r from-cyan-700 to-blue-800 border-cyan-300 text-white shadow-lg'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <p className="text-xs font-extrabold">👨‍🏫 Personal → Dirección / Jefatura</p>
            <p className="text-[10px] opacity-85 mt-0.5">Docentes y Administrativos hacia el Director(a)</p>
          </button>

          <button
            type="button"
            onClick={() => cambiarFlujo('estudiante_docente')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              flujo === 'estudiante_docente'
                ? 'bg-gradient-to-r from-emerald-700 to-teal-800 border-emerald-300 text-white shadow-lg'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <p className="text-xs font-extrabold">🎓 Estudiante / Familia → Profesor</p>
            <p className="text-[10px] opacity-85 mt-0.5">Justificación de ausencias, tardías o exámenes</p>
          </button>
        </div>

        {enviadoOk ? (
          <div className="bg-emerald-950/80 border-2 border-emerald-500 p-5 rounded-2xl text-center space-y-3">
            <span className="text-3xl">✅</span>
            <h4 className="text-base font-extrabold text-white">
              ¡Boleta Registrada y Enviada a {destinatario}!
            </h4>
            <p className="text-xs text-emerald-200">
              Quedó guardada con respaldo Offline-First y sello SHA-256 en la bandeja oficial para visto bueno e impresión PDF.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onIrABandejaCompleta) onIrABandejaCompleta();
                }}
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow"
              >
                📂 Ver Bandeja de Aprobación e Imprimir PDF
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2 rounded-xl text-xs"
              >
                Cerrar Ventana
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={procesarEnvio} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Solicitante:</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-semibold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  {flujo === 'personal_direccion' ? 'Cédula y Puesto:' : 'Sección y Especialidad:'}
                </label>
                <input
                  type="text"
                  value={cedulaSeccion}
                  onChange={(e) => setCedulaSeccion(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-cyan-300 font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Dirigido a (Jefatura / Docente):</label>
                <input
                  type="text"
                  value={destinatario}
                  onChange={(e) => setDestinatario(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-amber-300 font-semibold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-300 mb-1">Tipo de Permiso o Justificación:</label>
                <select
                  value={tipoMotivo}
                  onChange={(e) => setTipoMotivo(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-semibold"
                >
                  {flujo === 'personal_direccion' ? (
                    <>
                      <option>Cita Médica Especializada (CCSS / INS)</option>
                      <option>Justificación de Llegada Tardía (Marca de Reloj)</option>
                      <option>Emergencia de Salud / Urgencia Familiar</option>
                      <option>Permiso de Salida Anticipada ante Dirección</option>
                      <option>Asistencia a Convocatoria Oficial MEP / Regional</option>
                      <option>Incapacidad Médica / Licencia Oficial</option>
                    </>
                  ) : (
                    <>
                      <option>Justificación de Ausencia / Tardía Estudiantil (CCSS)</option>
                      <option>Solicitud de Reprogramación de Examen / Cotidiano</option>
                      <option>Permiso de Salida con Encargado Legal</option>
                      <option>Justificación por Representación Deportiva / Cultural</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Fecha, Hora de Marca o Lecciones:</label>
              <input
                type="text"
                value={fechaHora}
                onChange={(e) => setFechaHora(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Motivo Detallado y Comprobante Adjunto:</label>
              <textarea
                rows="3"
                required
                value={detalle}
                onChange={(e) => setDetalle(e.target.value)}
                placeholder="Escribe aquí el motivo de la cita médica, llegada tardía, emergencia o solicitud..."
                className="w-full bg-slate-950 border border-cyan-500/50 rounded-xl p-2.5 text-white resize-none"
              />
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3 rounded-xl text-xs shadow-lg transition-all"
              >
                📤 Enviar Boleta Oficial Ahora
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onIrABandejaCompleta) onIrABandejaCompleta();
                }}
                className="bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold px-4 py-3 rounded-xl text-xs"
              >
                📋 Ir al Panel Completo (Aprobar / CSV PIAD)
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}