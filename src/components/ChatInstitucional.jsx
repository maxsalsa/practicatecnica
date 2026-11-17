import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'practica_tecnica_chats_offline';

export default function ChatInstitucional({ usuarioActual }) {
  const [canales] = useState([
    { id: 'guia', nombre: 'Profesor(a) Guía (Sección 11-1)', tipo: 'docente' },
    { id: 'orientacion', nombre: 'Departamento de Orientación', tipo: 'orientacion' },
    { id: 'direccion', nombre: 'Dirección / Auxiliares CTP', tipo: 'directiva' },
    { id: 'familia', nombre: 'Grupo Familia (Papá / Mamá)', tipo: 'familiar' }
  ]);
  
  const [canalActivo, setCanalActivo] = useState(canales[0]);
  const [mensajes, setMensajes] = useState([]);
  const [nuevoTexto, setNuevoTexto] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const guardados = localStorage.getItem(`${STORAGE_KEY}_${canalActivo.id}`);
    if (guardados) {
      try {
        setMensajes(JSON.parse(guardados));
      } catch (e) {
        console.error('Error al parsear mensajes offline', e);
      }
    } else {
      setMensajes([
        { id: 1, remitente: 'Sistema Institucional', texto: `Bienvenido al canal oficial de ${canalActivo.nombre}. Comunicación segura MEP.`, hora: '08:00 AM', leido: true }
      ]);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [canalActivo]);

  const enviarMensaje = (e) => {
    e.preventDefault();
    if (!nuevoTexto.trim()) return;

    const mensajeObj = {
      id: Date.now(),
      remitente: usuarioActual?.nombre || 'Estudiante / Usuario',
      texto: nuevoTexto.trim(),
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sincronizado: isOnline
    };

    const nuevosMensajes = [...mensajes, mensajeObj];
    setMensajes(nuevosMensajes);
    setNuevoTexto('');

    localStorage.setItem(`${STORAGE_KEY}_${canalActivo.id}`, JSON.stringify(nuevosMensajes));
  };

  return (
    <div className="flex h-[600px] bg-slate-900 text-slate-100 rounded-xl overflow-hidden shadow-2xl border border-slate-700 font-sans">
      <div className="w-1/3 bg-slate-950 border-r border-slate-800 flex flex-col">
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
          <h3 className="font-bold text-cyan-400 flex items-center gap-2">💬 Canales Oficiales</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full ${isOnline ? 'bg-green-900 text-green-300' : 'bg-amber-900 text-amber-300'}`}>
            {isOnline ? '🟢 En Línea' : '⚡ Modo Offline'}
          </span>
        </div>
        <div className="overflow-y-auto flex-1 p-2 space-y-1">
          {canales.map((canal) => (
            <button
              key={canal.id}
              onClick={() => setCanalActivo(canal)}
              className={`w-full text-left p-3 rounded-lg transition-all flex items-center justify-between ${
                canalActivo.id === canal.id ? 'bg-cyan-600 text-white font-semibold shadow-md' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div>
                <p className="text-sm">{canal.nombre}</p>
                <span className="text-xs opacity-75 capitalize">Rol: {canal.tipo}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col bg-slate-900">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h4 className="font-bold text-lg text-white">{canalActivo.nombre}</h4>
            <p className="text-xs text-slate-400">Canal institucional cifrado — CTP Mercedes Norte</p>
          </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col">
          {mensajes.map((msg) => {
            const esMio = msg.remitente === (usuarioActual?.nombre || 'Estudiante / Usuario');
            return (
              <div key={msg.id} className={`max-w-[75%] p-3 rounded-xl shadow ${esMio ? 'ml-auto bg-cyan-700 text-white rounded-br-none' : 'mr-auto bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'}`}>
                <div className="text-xs font-semibold text-cyan-200 mb-1">{msg.remitente}</div>
                <p className="text-sm leading-relaxed">{msg.texto}</p>
                <div className="text-[10px] text-right mt-1 opacity-70 flex items-center justify-end gap-1">
                  {msg.hora} {esMio && (msg.sincronizado ? '✓✓' : '⏱️ (Local)')}
                </div>
              </div>
            );
          })}
        </div>
        <form onSubmit={enviarMensaje} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            value={nuevoTexto}
            onChange={(e) => setNuevoTexto(e.target.value)}
            placeholder="Escribe un mensaje institucional..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
          />
          <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-all shadow">
            Enviar 🚀
          </button>
        </form>
      </div>
    </div>
  );
}