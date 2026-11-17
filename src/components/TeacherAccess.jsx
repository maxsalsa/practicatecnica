import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { Link } from '@tanstack/react-router';

import { useAccount } from './AccountProvider';
import { Button } from './ui/button';
import { readTeacherAccess } from '@/lib/teacher-access.functions';

export function TeacherAccess({ children }) {
  const { user, ready } = useAccount();
  const read = useServerFn(readTeacherAccess);
  const access = useQuery({ queryKey: ['teacher-access', user?.id], enabled && !!user, queryFn: () => read() });
  if (!ready || (!!user && access.isPending)) return <p role="status" className="p-8">Comprobando acceso docente…</p>;
  if (access.isError) return <p role="alert" className="p-8">No se pudo comprobar el acceso docente. Recargue para intentar de nuevo.</p>;
  if (!user || !access.data) return <section className="mx-auto max-w-xl p-8"><h1 className="text-2xl font-bold">Acceso docente requerido</h1><p className="mt-3">Estas herramientas son exclusivas para docentes autorizados con prueba vigente de 13 días o plan docente confirmado. El plan estudiante o general no concede permisos docentes.</p><Button asChild className="mt-4"><Link to={user ? '/pagos' : '/auth'}>{user ? 'Ver plan docente' : 'Ingresar'}</Link></Button></section>;
  return children;
}