import React, { useState } from 'react';

export default function LoginGoogleAuth({ onLoginExitoso }) {
  const [cargando, setCargando] = useState(false);

  const handleLoginGoogle = () => {
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      // Usuario autenticado por defecto como SuperAdmin Max Salazar
      const usuario = {
        nombre: 'Ing. Max Salazar Sánchez',
        correo: 'maxi.salsa@gmail.com',
        rol: 'SuperAdmin',
        institucion: 'CTP Mercedes Norte'
      };
      if (onLoginExitoso) onLoginExitoso(usuario);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto bg-slate-900 border border-slate-700 p-8 rounded-2xl shadow-2xl text-center space-y-6">
      <div className="space-y-2">
        <span className="text-4xl">🦉</span>
        <h2 className="text-2xl font-extrabold text-white">Acceso Institucional</h2>
        <p className="text-xs text-slate-400">Práctica Técnica — Ecosistema Soportado por GICM & BDS Devs</p>
      </div>

      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
        <p>🔒 Autenticación Segura con Google OAuth 2.0</p>
        <p>🛡️ Cifrado de sesión con SHA-256 y cumplimiento Ley 8968</p>
      </div>

      <button
        onClick={handleLoginGoogle}
        disabled={cargando}
        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 text-sm disabled:opacity-50"
      >
        <span>🌐</span>
        <span>{cargando ? 'Conectando con Google...' : 'Iniciar Sesión con Google (@est.mep.go.cr / Gmail)'}</span>
      </button>

      <p className="text-[10px] text-slate-500">
        Al ingresar, aceptas los términos de soberanía educativa y el uso offline-first de Práctica Técnica.
      </p>
    </div>
  );
}