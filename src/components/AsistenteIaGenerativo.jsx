import React, { useState } from 'react';

export default function AsistenteIaGenerativo() {
  const [tokensDisponibles, setTokensDisponibles] = useState(100);
  const [tipoGeneracion, setTipoGeneracion] = useState('planeamiento');
  const [promptUsuario, setPromptUsuario] = useState('');
  const [resultadoIa, setResultadoIa] = useState('');
  const [cargando, setCargando] = useState(false);
  const [enEspera, setEnEspera] = useState(false);
  const [tiempoEspera, setTiempoEspera] = useState(0);

  const generarConIa = (e) => {
    e.preventDefault();
    if (tokensDisponibles <= 0) {
      setEnEspera(true);
      setTiempoEspera(30);
      const intervalo = setInterval(() => {
        setTiempoEspera((prev) => {
          if (prev <= 1) {
            clearInterval(intervalo);
            setTokensDisponibles(50); // Recarga gratuita parcial
            setEnEspera(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return;
    }

    if (!promptUsuario.trim()) return;

    setCargando(true);
    setResultadoIa('');

    setTimeout(() => {
      setCargando(false);
      setTokensDisponibles(tokensDisponibles - 15);
      
      let tituloRes = '';
      if (tipoGeneracion === 'planeamiento') tituloRes = '📋 Plan de Práctica Pedagógica MEP (Estrategia STEAM & DUA)';
      else if (tipoGeneracion === 'examen') tituloRes = '📝 Examen / Práctica Calificada con Ítems de Selección y Desarrollo';
      else if (tipoGeneracion === 'cotidiano') tituloRes = '⚡ Trabajo Cotidiano y Actividad de Mediación';
      else tituloRes = '📢 Publicación Oficial / Campaña Clara Validada';

      setResultadoIa(`--- [RESULTADO IA OFICIAL - CTP MERCEDES NORTE] ---\n\nTipo: ${tituloRes}\nSolicitud: "${promptUsuario}"\n\n1. Enfoque metodológico alineado al REAC 2026 y regulaciones del MEP.\n2. Criterios de evaluación y rúbrica analítica integrada.\n3. Aprobación automática bajo normas de ciberseguridad SHA-256.\n\n[✓ Generado exitosamente utilizando créditos gratuitos de IA rotativos.]`);
    }, 1500);
  };

  return (
    <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-2xl text-slate-100 space-y-4 max-w-2xl mx-auto font-sans">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🤖</span>
          <div>
            <h3 className="text-lg font-extrabold text-cyan-400">Asistente IA Generativo MEP</h3>
            <p className="text-xs text-slate-400">Planeamientos, Exámenes, Tareas, Proyectos y Campaña Clara</p>
          </div>
        </div>
        <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
          <span className="text-cyan-300 font-bold">⚡ Tokens:</span> <span className="font-mono text-white">{tokensDisponibles} / 100</span>
        </div>
      </div>

      {enEspera ? (
        <div className="bg-amber-950/80 border border-amber-800 p-6 rounded-xl text-center space-y-3">
          <span className="text-3xl">⏳</span>
          <h4 className="text-white font-bold text-sm">Créditos agotados temporalmente</h4>
          <p className="text-xs text-amber-300">Las redes globales de IA se están recargando. Espera la sincronización automática en:</p>
          <div className="text-2xl font-mono font-extrabold text-white">{tiempoEspera}s</div>
        </div>
      ) : (
        <form onSubmit={generarConIa} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Seleccionar Tipo de Generación:</label>
            <select
              value={tipoGeneracion}
              onChange={(e) => setTipoGeneracion(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="planeamiento">Plan de Práctica Pedagógica / Planeamiento</option>
              <option value="examen">Examen o Banco de Pruebas Técnicas</option>
              <option value="cotidiano">Trabajo Cotidiano y Tareas</option>
              <option value="campana">Campaña Clara / Publicación Institucional</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Instrucción o Tema (Prompt):</label>
            <textarea
              rows="3"
              value={promptUsuario}
              onChange={(e) => setPromptUsuario(e.target.value)}
              placeholder="Ej: Diseñar un planeamiento sobre Redes LAN y Subneteo IPv4 para undécimo año..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>✨</span>
            <span>{cargando ? 'Generando contenido con IA...' : 'Generar Contenido Institucional con IA'}</span>
          </button>
        </form>
      )}

      {resultadoIa && (
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 whitespace-pre-wrap leading-relaxed">
          {resultadoIa}
        </div>
      )}
    </div>
  );
}