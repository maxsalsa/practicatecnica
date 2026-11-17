const freePaths = ['/', '/libros', '/temas', '/pagos', '/legal', '/contacto', '/auth', '/acerca', '/reset-password', '/perfil', '/superadmin', '/admin-pagos', '/institucion', '/instituciones', '/campana-clara', '/verificar-permiso', '/verificar-retiro', '/verificar-matricula', '/verificar-documento'];
export function isFreePath(path: string) {
  return freePaths.some(f => path === f || (f !== '/' && path.startsWith(f + '/')));
}