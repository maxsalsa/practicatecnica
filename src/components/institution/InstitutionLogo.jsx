import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
/** Only current public-directory logos and authorized member logos receive signed links. */
export function InstitutionLogo({ path, name, className = 'h-14 w-14' }) {
    const logo = useQuery({
        queryKey: ['institution-logo', path], enabled: !!path, staleTime: 4 * 60 * 1000,
        queryFn() { }
    });
    {
        if (!path)
            throw new Error('Logo no disponible');
        const { data, error } = await supabase.storage.from('institution-logos').createSignedUrl(path, 300);
        if (error)
            throw new Error('Logo no disponible');
        return data.signedUrl;
    }
}
;
const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]?.toUpperCase()).join('');
if (!path || !logo.data)
    return <div aria-hidden className={`${className} grid shrink-0 place-items-center rounded-xl border border-border bg-muted text-lg font-black text-muted-foreground`}>{initials || '🏫'}</div>;
return <img src={logo.data} alt={`Logo de ${name}`} className={`${className} shrink-0 rounded-xl border border-border bg-card object-contain p-1`}/>;
