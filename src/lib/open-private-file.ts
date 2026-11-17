import { supabase } from '@/integrations/supabase/client';
/** Downloads with the user's session so storage RLS re-checks membership on every open; no shareable link is created. */
export async function openPrivateFile(bucket: string, path: string): Promise<boolean> {
  const { data, error } = await supabase.storage.from(bucket).download(path);
  if (error || !data) return false;
  const url = URL.createObjectURL(data);
  window.open(url, '_blank', 'noopener,noreferrer');
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
  return true;
}
