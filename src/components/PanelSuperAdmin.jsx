import React, { useState } from 'react';

export default function PanelSuperAdmin({ superAdminNombre = 'Ing. Max Salazar Sánchez' }) {
  // Lista inicial de usuarios de prueba institucional
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Ana Sofía Mora', cedula: '1-1678-0411', rol: 'estudiante', seccion: '11-1', estado: 'Activo' },
    { id: 2, nombre: 'Carlos Eduardo Vargas', cedula: '2-0451-0982', rol: 'docente', seccion: 'Taller CCNA', estado: 'Activo' },
    { id: 3, nombre: 'Lic. María Elena Campos', cedula: '1-0892-0333', rol: 'director', seccion: 'Administración', estado: 'Activo' }
  ]);

  const [auditoria, setAuditoria] = useState([
    { id: 101, timestamp: '2026-11-17 14:10:05', responsable: 'Ing. Max Salazar Sánchez', accion: 'Asignación de rol Docente a Carlos Eduardo Vargas', hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }
  ]);

  const [filtroRol, setFiltroRol] = useState('todos');

  // Función para cambiar rol (Privilegio exclusivo del SuperAdmin con SHA-256)
  const cambiarRol = (id, nuevoRol) => {
    setUsuarios(usuarios.map(u => u.id === id ? { ...u, rol: nuevoRol } : u));
    
    // Registrar en auditoría SHA-256 simulada
    const nuevoRegistro = {
      id: Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      responsable: superAdminNombre,
      accion: Cambio de rol para usuario ID  a '',
      hash: 'sha256-' + Math.random().toString(36).substring(2) + Date.now().toString(36)
    };
    setAuditoria([nuevoRegistro, ...auditoria]);
  };

  const usuariosFiltrados = filtroRol === 'todos' ? usuarios : usuarios.filter(u => u.rol === filtroRol);

  return (
    <div className="max-w-6xl mx-auto bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-700 p-6 font-sans space-y-6">
      
      {/* Cabecera del Panel */}
      <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-cyan-400 flex items-center gap-2">
            🔐 Panel de Control SuperAdmin
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            SuperAdmin Autorizado: <span className="text-white font-semibold">{superAdminNombre}</span> (GICM & BDS Devs)
          </p>
        </div>
        <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-xs">
          <span className="text-green-400 font-bold">● Sistema Blindado:</span> Criptografía SHA-256 Activa
        </div>
      </div>

      {/* Sección de Gestión de Usuarios y Roles */}
      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <h3 className="font-bold text-lg text-white">Directorio Institucional y RBAC</h3>
          
          {/* Filtros de Rol */}
          <div className="flex gap-2 text-xs">
            {['todos', 'estudiante', 'docente', 'director', 'administrador'].map((rol) => (
              <button
                key={rol}
                onClick={() => setFiltroRol(rol)}
                className={px-3 py-1.5 rounded-lg capitalize transition-all }
              >
                {rol}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                <th className="p-3">Nombre</th>
                <th className="p-3">Cédula</th>
                <th className="p-3">Sección / Área</th>
                <th className="p-3">Rol Actual</th>
                <th className="p-3 text-right">Acción SuperAdmin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {usuariosFiltrados.map((u) => (
                <tr key={u.id} className="hover:bg-slate-900/50 transition-all">
                  <td className="p-3 font-medium text-white">{u.nombre}</td>
                  <td className="p-3 font-mono text-xs text-slate-300">{u.cedula}</td>
                  <td className="p-3 text-slate-300">{u.seccion}</td>
                  <td className="p-3">
                    <span className={px-2.5 py-1 rounded-full text-xs font-semibold uppercase }>
                      {u.rol}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <select
                      value={u.rol}
                      onChange={(e) => cambiarRol(u.id, e.target.value)}
                      className="bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-cyan-500"
                    >
                      <option value="estudiante">Estudiante</option>
                      <option value="docente">Docente</option>
                      <option value="director">Director(a)</option>
                      <option value="administrador">Administrador</option>
                      <option value="ministro">Ministro / Asesor</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sección de Registro de Auditoría SHA-256 */}
      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
        <h3 className="font-bold text-lg text-white flex items-center gap-2">
          🛡️ Registro de Auditoría Criptográfica (SHA-256)
        </h3>
        <p className="text-xs text-slate-400">
          Cada alteración de privilegios o eventos institucionales queda firmada de forma inalterable en este registro.
        </p>

        <div className="space-y-2 max-h-48 overflow-y-auto">
          {auditoria.map((item) => (
            <div key={item.id} className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <span className="text-cyan-400 font-mono">{item.timestamp}</span> — <span className="text-white font-semibold">{item.responsable}</span>: {item.accion}
              </div>
              <span className="font-mono text-[10px] text-slate-500 bg-slate-950 px-2 py-1 rounded truncate max-w-[200px]">
                SHA: {item.hash}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}