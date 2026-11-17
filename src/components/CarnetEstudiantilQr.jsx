import React from 'react';

export default function CarnetEstudiantilQr({ estudiante }) {
  // Datos por defecto institucionales (CTP Mercedes Norte)
  const datos = estudiante || {
    nombre: 'Maximiliano Salazar',
    cedula: '2-0589-0412',
    seccion: '11-1',
    especialidad: 'Desarrollo Web y Ciberseguridad',
    institucion: 'CTP Mercedes Norte, Alajuela',
    hashSha256: 'a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890'
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-slate-100 rounded-2xl overflow-hidden shadow-2xl border-2 border-cyan-500/40 p-6 font-sans relative">
      
      {/* Sello de Agua / Insignia */}
      <div className="absolute top-3 right-3 text-cyan-400 opacity-20 text-6xl pointer-events-none">
        🦉
      </div>

      {/* Encabezado Institucional */}
      <div className="text-center border-b border-slate-800 pb-4 mb-4">
        <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Ministerio de Educación Pública</span>
        <h2 className="text-lg font-extrabold text-white mt-1">{datos.institucion}</h2>
        <span className="inline-block bg-cyan-950 text-cyan-300 text-[10px] px-3 py-1 rounded-full font-semibold mt-2 border border-cyan-800">
          Carné Digital Oficial — REAC 2026
        </span>
      </div>

      {/* Información del Estudiante */}
      <div className="flex items-center gap-4 my-4">
        <div className="w-20 h-20 bg-slate-800 rounded-xl border-2 border-cyan-500 flex items-center justify-center text-3xl shadow-inner">
          👨‍🎓
        </div>
        <div>
          <h3 className="font-bold text-lg text-white leading-tight">{datos.nombre}</h3>
          <p className="text-xs text-slate-300 mt-1">Cédula: <span className="font-mono text-cyan-300">{datos.cedula}</span></p>
          <p className="text-xs text-slate-300">Sección: <span className="font-bold text-white">{datos.seccion}</span></p>
          <p className="text-xs text-cyan-400 font-medium mt-1">{datos.especialidad}</p>
        </div>
      </div>

      {/* Código QR Simulado / Cifrado */}
      <div className="bg-white p-4 rounded-xl flex flex-col items-center justify-center my-4 shadow-inner">
        <div className="w-36 h-36 bg-slate-950 rounded-lg flex items-center justify-center text-white text-xs font-mono text-center p-2 border border-slate-800">
          [ QR CIFRADO SHA-256 ]<br/>
          <span className="text-[9px] text-cyan-400 mt-1">Acceso a Comedor, Asistencia y Portón</span>
        </div>
        <p className="text-[10px] text-slate-600 font-mono mt-2 truncate w-full text-center">
          SHA: {datos.hashSha256.substring(0, 24)}...
        </p>
      </div>

      {/* Pie de página de seguridad */}
      <div className="text-center border-t border-slate-800 pt-3 flex justify-between items-center text-[10px] text-slate-400">
        <span>GICM & BDS Devs S.A.</span>
        <span className="text-green-400 font-semibold">● Verificado por SuperAdmin</span>
      </div>

    </div>
  );
}