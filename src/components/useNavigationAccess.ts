import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { useAccount } from './AccountProvider';
import { supabase } from '@/integrations/supabase/client';
import { readTeacherAccess } from '@/lib/teacher-access.functions';
import { navigationSections } from '@/lib/navigation-policy';

export function useNavigationAccess() {
  const { user, ready } = useAccount();
  const readTeacher = useServerFn(readTeacherAccess);
  const query = useQuery({
    queryKey: ['navigation-access', user?.id], enabled: ready && !!user, staleTime: 60_000,
    queryFn: async () => {
      if (!user) throw new Error('Ingrese primero.');
      const [roles, institutions, teacher] = await Promise.all([
        supabase.from('user_roles').select('role').eq('user_id', user.id),
        supabase.rpc('my_institutions'),
        readTeacher(),
      ]);
      if (roles.error || institutions.error) throw new Error('No se pudieron comprobar los permisos del menú.');
      return { signedIn: true, admin: roles.data.some(r => r.role === 'admin'), teacher, institutionRoles: institutions.data.map(m => m.member_role) };
    },
  });
  return { ...navigationSections(query.data ?? { signedIn: !!user, admin: false, teacher: false, institutionRoles: [] }), assignedRoles: query.data?.institutionRoles ?? [], pending: !!user && query.isPending, error: query.isError };
}