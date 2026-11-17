import { useSyncExternalStore } from 'react';
const listeners = new Set<() => void>();
let selection = 'assigned';
let owner: string | undefined;
/** Transient presentation only, never authorization. */
export function useMenuPreview(userId?: string, authorized = false) {
  const role = useSyncExternalStore(callback => { listeners.add(callback); return () => { listeners.delete(callback); }; }, () => authorized && owner === userId ? selection : 'assigned', () => 'assigned');
  return { role, setRole: (next: string) => { if (!authorized || !userId) return; owner = userId; selection = next; listeners.forEach(callback => callback()); } };
}