type Access = { administration: boolean; leadership: boolean; teaching: boolean; family: boolean; student: boolean };
/** Presentation only. Never pass this selection to authorization or data reads. */
export function menuView(access: Access, role: string): Access {
  if (!access.administration || role === 'assigned') return access;
  return { administration: false, leadership: role === 'direccion' || role === 'subdireccion', teaching: role === 'docente', family: role === 'encargado', student: role === 'estudiante' };
}