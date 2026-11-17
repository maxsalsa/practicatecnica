const common = ['avisos', 'agenda', 'canales', 'documentos', 'comedor'];
/** Presentation allow-list. Data authorization always remains server-side. */
export function institutionPreviewTabs(role: string): string[] | null {
  if (role === 'assigned') return null;
  if (role === 'estudiante') return [...common, 'mi-horario'];
  if (role === 'encargado') return [...common, 'resultados', 'seguimiento'];
  const staff = [...common, 'permisos', 'asistencia'];
  if (role === 'direccion') return [...staff, 'revision', 'horarios', 'secciones', 'matriculas', 'accesos', 'revision-areas', 'editorial', 'publicaciones', 'editor-practicas', 'practicas-publicadas', 'bitacora'];
  if (role === 'subdireccion') return [...staff, 'horarios', 'editorial', 'publicaciones', 'editor-practicas', 'practicas-publicadas'];
  if (role === 'docente') return [...staff, 'horarios', 'editorial', 'publicaciones', 'editor-practicas', 'practicas-publicadas', 'asignadas'];
  return staff;
}