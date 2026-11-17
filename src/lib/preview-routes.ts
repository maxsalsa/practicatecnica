/** Presentation-only: which pages Max's role preview hides. Never used for authorization. */
const ADMIN = ['/superadmin', '/admin-pagos', '/gastos-ia', '/migracion', '/institucion_/roles', '/institucion/roles'];
const TEACHING = ['/examenes-docentes', '/planeamiento', '/rubricas', '/generador', '/estudiantes', '/panel', '/pdf-preguntas'];
const TEACHING_ROLES = new Set(['direccion', 'subdireccion', 'docente']);
const hit = (path: string, list: string[]) => list.some(p => path === p || path.startsWith(p + '/'));
export function previewHidesPath(role: string, path: string): boolean {
  if (role === 'assigned') return false;
  if (hit(path, ADMIN)) return true;
  return !TEACHING_ROLES.has(role) && hit(path, TEACHING);
}
