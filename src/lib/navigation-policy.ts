export type NavigationAccess = { signedIn: boolean; admin: boolean; teacher: boolean; institutionRoles: string[] };
/** Navigation visibility only; existing server authorization and RLS remain authoritative. */
export function navigationSections(access: NavigationAccess) {
  const leadership = access.institutionRoles.some(role => role === 'direccion' || role === 'subdireccion');
  return {
    administration: access.signedIn && access.admin,
    teaching: access.signedIn && access.teacher,
    institution: access.signedIn && (access.admin || access.institutionRoles.length > 0),
    leadership: access.signedIn && leadership,
    family: access.signedIn && access.institutionRoles.includes('encargado'),
    student: access.signedIn && (access.institutionRoles.includes('estudiante') || (!access.teacher && !leadership && !access.institutionRoles.includes('encargado'))),
  };
}