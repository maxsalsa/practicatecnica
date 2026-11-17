/** Shared rules for institution channels; the database enforces the same access and language filter. */
export type ChannelKind = 'personal' | 'seccion' | 'familia';
export type ChannelAccess = 'none' | 'read' | 'post' | 'moderate';
export const CHANNEL_KIND_LABELS: Record<ChannelKind, string> = { personal: 'Personal', seccion: 'Sección', familia: 'Familia' };
export const CHANNEL_KIND_HELP: Record<ChannelKind, string> = {
  personal: 'Solo personal adulto: dirección, docentes y administrativos.',
  seccion: 'El personal publica recados y avisos; estudiantes y familias de la sección leen.',
  familia: 'Conversación privada entre la familia y el personal: guía, orientación, dirección y docentes.',
};
export const SENDER_ROLE_LABELS: Record<string, string> = { direccion: 'Dirección', docente: 'Docente', administrativo: 'Administración y orientación', estudiante: 'Estudiante', encargado: 'Familia', superadmin: 'Superadministración', subdireccion: 'Subdirección', asistente: 'Asistente', auxiliar: 'Auxiliar', orientacion: 'Orientación', secretaria: 'Secretaría', apoyo: 'Personal de apoyo' };
export const canPost = (a: ChannelAccess) => a === 'post' || a === 'moderate';

const BLOCKED = ['hijueputa', 'hijoeputa', 'jueputa', 'hdp', 'puta', 'puto', 'putas', 'putos', 'mierda', 'malparido', 'malparida', 'carepicha', 'pendejo', 'pendeja', 'idiota', 'idiotas', 'imbecil', 'estupido', 'estupida', 'zorra', 'culero', 'verga', 'playo', 'maricon', 'cerote', 'mamon', 'ctm'];
const fold = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
/** Client-side preview of the server language filter (whole words, accent-insensitive). */
export function blockedLanguage(text: string) {
  const words = fold(text).split(/[^a-zñ0-9]+/);
  return words.some(w => BLOCKED.includes(w));
}
export function messageError(text: string) {
  const t = text.trim();
  if (!t) return 'Escriba un mensaje.';
  if (t.length > 2000) return 'El mensaje admite hasta 2000 caracteres.';
  if (blockedLanguage(t)) return 'Mensaje bloqueado: use un lenguaje respetuoso.';
  return null;
}
