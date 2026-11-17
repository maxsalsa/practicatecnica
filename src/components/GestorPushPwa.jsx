import React, { useState } from 'react';

export default function GestorPushPwa() {
  const [suscrito, setSuscrito] = useState(false);
  const [estadoPermiso, setEstadoPermiso] = useState(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'default'
  );

  const solicitarPermisoPush = async () => {
    if (!('Notification' in window)) {
      alert('Este navegador no soporta notificaciones nativas push.');
      return;
    }

    const permiso = await Notification.requestPermission();
    setEstadoPermiso(permiso);

    if (permiso === 'granted') {
      setSuscrito(true);
      new Notification('🦉 Práctica Técnica — CTP Mercedes Norte', {
        body: '¡Notificaciones push activadas con éxito! Recibirás alertas de canales y chat en tiempo real.',
        icon: '/favicon.ico'
      });
    } else {
      alert('Permiso de notificaciones denegado. Puedes habilitarlo en la configuración de tu navegador.');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-2xl text-slate-100 space-y-4 max-w-xl mx-auto">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <span className="text-3xl">🔔</span>
        <div>
          <h3 className="text-lg font-extrabold text-cyan-400">Gestor de Notificaciones Push PWA</h3>
          <p className="text-xs text-slate-400">Alertas nativas en computadora y dispositivos móviles (Escritorio y Celular)</p>
        </div>
      </div>

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
        <p className="text-slate-300">
          Estado actual del permiso: <span className={`font-bold ${estadoPermiso === 'granted' ? 'text-green-400' : 'text-amber-400'}`}>{estadoPermiso.toUpperCase()}</span>
        </p>
        <p className="text-[10px] text-slate-400">
          Al activar las notificaciones, la aplicación PWA te alertará de nuevos mensajes en los canales institucionales de forma inmediata y offline-first.
        </p>
      </div>

      <button
        onClick={solicitarPermisoPush}
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow flex items-center justify-center gap-2"
      >
        <span>📲</span>
        <span>{estadoPermiso === 'granted' ? '✅ Notificaciones Push Habilitadas' : '🔔 Activar Notificaciones Push en este Dispositivo'}</span>
      </button>
    </div>
  );
}