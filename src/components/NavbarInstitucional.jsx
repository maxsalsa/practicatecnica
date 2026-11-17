import React, { useState, useEffect } from 'react';

export default function NavbarInstitucional({ usuarioActual, onCambiarSeccion }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const opcionesNavegacion = [
    { id: 'inicio', label: 'Inicio', icono: '🏠' },
    { id: 'simuladores', label: 'Simuladores (Excel/Word/CCNA)', icono: '💻' },
    { id: 'chats', label: 'Canales y Chats', icono: '💬' },
    { id: 'carnet', label: 'Carné Digital QR', icon: '🪪' },
    { id: 'admin', label: 'Panel SuperAdmin', icono: '🔐' }
  ];

  return (
    <header className="bg-slate-950 border-b border-slate-800 text-slate-100 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo y Marca */}
          <div className="flex items-center gap-3">
            <span className="text-2xl">🦉</span>
            <div>
              <h1 className="font-bold text-lg text-cyan-400 tracking-wide">Práctica Técnica</h1>
              <p className="text-[10px] text-slate-400 hidden sm:block">CTP Mercedes Norte & Ecosistema MEP</p>
            </div>
          </div>

          {/* Navegación para Escritorio */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {opcionesNavegacion.map((op) => (
              <button
                key={op.id}
                onClick={() => onCambiarSeccion && onCambiarSeccion(op.id)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center gap-1.5"
              >
                <span>{op.icono}</span>
                <span>{op.label}</span>
              </button>
            ))}
          </nav>

          {/* Indicador de Estado y Usuario */}
          <div className="hidden md:flex items-center gap-3">
            <span className={	ext-xs px-2.5 py-1 rounded-full font-medium }>
              {isOnline ? '🟢 En Línea' : '⚡ Offline'}
            </span>
            <div className="text-right">
              <p className="text-xs font-bold text-cyan-300">{usuarioActual?.nombre || 'Ing. Max (SuperAdmin)'}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">{usuarioActual?.rol || 'SuperAdmin'}</p>
            </div>
          </div>

          {/* Botón de Menú Móvil (Hamburguesa) */}
          <div className="flex md:hidden items-center gap-2">
            <span className={	ext-[10px] px-2 py-0.5 rounded-full }>
              {isOnline ? '🟢' : '⚡'}
            </span>
            <button
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Abrir menú"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuAbierto ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Menú Desplegable para Móviles y Tablets */}
      {menuAbierto && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2 animate-fadeIn">
          <div className="pb-2 mb-2 border-b border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-cyan-300">{usuarioActual?.nombre || 'Ing. Max (SuperAdmin)'}</p>
              <p className="text-[10px] text-slate-400 uppercase">Rol: {usuarioActual?.rol || 'SuperAdmin'}</p>
            </div>
            <span className="text-xs text-slate-400">GICM & BDS Devs</span>
          </div>

          {opcionesNavegacion.map((op) => (
            <button
              key={op.id}
              onClick={() => {
                onCambiarSeccion && onCambiarSeccion(op.id);
                setMenuAbierto(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-cyan-700 hover:text-white transition-all flex items-center gap-2"
            >
              <span>{op.icono}</span>
              <span>{op.label}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
}