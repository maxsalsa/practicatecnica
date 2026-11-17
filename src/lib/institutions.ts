export type InstitutionKind = 'preescolar' | 'escuela' | 'academico' | 'ctp' | 'universidad';
export const INSTITUTION_KIND_LABELS: Record<InstitutionKind, string> = { preescolar: 'Preescolar (materno y transición)', escuela: 'Escuela (1.º a 6.º)', academico: 'Liceo o colegio académico (7.º a 11.º)', ctp: 'Colegio técnico profesional (7.º a 12.º)', universidad: 'Universidad' };
export type InstitutionRole = 'direccion' | 'docente' | 'administrativo' | 'estudiante' | 'encargado' | 'subdireccion' | 'asistente' | 'auxiliar' | 'orientacion' | 'secretaria' | 'apoyo';
export type Audience = 'todos' | 'personal' | 'estudiantes';
export type AnnouncementKind = 'actividad' | 'reunion' | 'ausencia' | 'salida_temprana' | 'acto_civico' | 'general';
export type PermissionKind = 'cita_medica' | 'incapacidad' | 'asunto_personal' | 'capacitacion' | 'congreso' | 'asamblea' | 'actividad_institucional' | 'visita_empresa' | 'sindical' | 'cita_encargado' | 'justificacion_ausencia' | 'otro';
export type PermissionStatus = 'pendiente' | 'aprobado' | 'rechazado' | 'cancelado';

export const ROLE_LABELS: Record<InstitutionRole, string> = { direccion: 'Dirección', docente: 'Docente', administrativo: 'Administrativo', estudiante: 'Estudiante', encargado: 'Familia (madre, padre o encargado)', subdireccion: 'Subdirección', asistente: 'Asistente', auxiliar: 'Auxiliar', orientacion: 'Orientación', secretaria: 'Secretaría', apoyo: 'Guarda y personal de apoyo' };
export const AUDIENCE_LABELS: Record<Audience, string> = { todos: 'Todo el personal y estudiantes', personal: 'Solo personal', estudiantes: 'Estudiantes (el personal también lo ve)' };
export const KIND_LABELS: Record<AnnouncementKind, string> = { actividad: '🎭 Actividad', reunion: '🗓️ Reunión / consejo', ausencia: '📋 Ausencia', salida_temprana: '🕐 Salida temprana', acto_civico: '🇨🇷 Acto cívico', general: '📢 General' };
export const PERMISSION_KIND_LABELS: Record<PermissionKind, string> = {
  cita_medica: 'Cita médica', incapacidad: 'Incapacidad o enfermedad', asunto_personal: 'Asunto personal', capacitacion: 'Capacitación',
  congreso: 'Congreso', asamblea: 'Asamblea', actividad_institucional: 'Actividad del colegio', visita_empresa: 'Visita o gira a empresa',
  sindical: 'Actividad sindical o gremial', cita_encargado: 'Cita de madre, padre o encargado', justificacion_ausencia: 'Justificación de ausencia', otro: 'Otro',
};
export const STAFF_PERMISSION_KINDS: PermissionKind[] = ['cita_medica', 'incapacidad', 'asunto_personal', 'capacitacion', 'congreso', 'asamblea', 'actividad_institucional', 'visita_empresa', 'sindical', 'cita_encargado', 'otro'];
export const STUDENT_PERMISSION_KINDS: PermissionKind[] = ['justificacion_ausencia', 'cita_medica', 'incapacidad', 'cita_encargado', 'actividad_institucional', 'otro'];
/** Planned absences should be requested at least this many days ahead; illness and emergencies are exceptions. */
export const ADVANCE_NOTICE_DAYS = 3;
export const JUSTIFICATION_HOURS = 48;
const UNPLANNED: PermissionKind[] = ['incapacidad', 'justificacion_ausencia'];
export const needsJustification = (kind: PermissionKind) => kind !== 'asunto_personal' && kind !== 'actividad_institucional';
export function lateNotice(kind: PermissionKind, startsOn: string, createdAt: string, urgent: boolean) {
  return !urgent && !UNPLANNED.includes(kind) && noticeDays(startsOn, createdAt) < ADVANCE_NOTICE_DAYS;
}
/** Justification deadline: 48 hours after the end of the last permission day (Costa Rica, UTC-6). */
export function justificationDeadline(endsOn: string) {
  return new Date(Date.parse(`${endsOn}T00:00:00-06:00`) + 86400000 + JUSTIFICATION_HOURS * 3600000);
}
export type JustificationState = 'no_aplica' | 'a_tiempo' | 'tardia' | 'pendiente' | 'vencida';
export function justificationState(r: { kind: PermissionKind; ends_on: string; justified_at: string | null; attachment_path: string | null }, now = Date.now()): JustificationState {
  if (!needsJustification(r.kind)) return 'no_aplica';
  const deadline = justificationDeadline(r.ends_on).getTime();
  if (r.justified_at) return Date.parse(r.justified_at) <= deadline ? 'a_tiempo' : 'tardia';
  if (r.attachment_path) return 'a_tiempo';
  return now > deadline ? 'vencida' : 'pendiente';
}
export const JUSTIFICATION_LABELS: Record<JustificationState, string> = { no_aplica: '', a_tiempo: 'Justificación entregada a tiempo', tardia: 'Justificación entregada fuera de las 48 horas', pendiente: 'Justificación pendiente (48 horas después de la fecha)', vencida: 'Sin justificar a tiempo' };
export const permissionVerifyUrl = (hash: string, origin = 'https://practicatecnica.com') => `${origin}/verificar-permiso?codigo=${hash}`;
export const PERMISSION_STATUS_LABELS: Record<PermissionStatus, string> = { pendiente: 'Pendiente de aprobación', aprobado: 'Aprobado', rechazado: 'Rechazado', cancelado: 'Cancelado' };

export const isStaff = (role: InstitutionRole | null | undefined) => role === 'direccion' || role === 'docente' || role === 'administrativo';

/** Mirrors the announcement read policy: staff see everything; students and families only "todos" and "estudiantes". */
export function audienceIncludes(audience: Audience, role: InstitutionRole) {
  if (isStaff(role)) return true;
  return audience === 'todos' || audience === 'estudiantes';
}
/** Expected recipients for delivery counts (staff reading a student notice is visibility, not a target). */
export function audienceTargets(audience: Audience, role: InstitutionRole) {
  return audience === 'todos' || (audience === 'personal' ? isStaff(role) : role === 'estudiante');
}
export function canPublish(role: InstitutionRole | 'admin' | null | undefined) {
  return role === 'admin' || role === 'direccion' || role === 'administrativo';
}
/** Presentation helper only; database policies and publication guards authorize the action. */
export function canLeadInstitution(role: InstitutionRole | 'admin' | null | undefined) {
  return role === 'admin' || role === 'direccion' || role === 'subdireccion';
}

const ATTACHMENT_TYPES: Record<string, string> = { 'application/pdf': 'pdf', 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
const LOGO_TYPES: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
export const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
export const MAX_LOGO_BYTES = 1024 * 1024;

export function attachmentExtension(file: { type: string; size: number }): { ext?: string; error?: string } {
  const ext = ATTACHMENT_TYPES[file.type];
  if (!ext) return { error: 'Adjunte un PDF o una imagen JPG, PNG o WebP.' };
  if (file.size > MAX_ATTACHMENT_BYTES) return { error: 'El comprobante no puede superar 5 MB.' };
  if (file.size === 0) return { error: 'El archivo está vacío.' };
  return { ext };
}
export function logoExtension(file: { type: string; size: number }): { ext?: string; error?: string } {
  const ext = LOGO_TYPES[file.type];
  if (!ext) return { error: 'Use un logo PNG, JPG o WebP.' };
  if (file.size > MAX_LOGO_BYTES) return { error: 'El logo no puede superar 1 MB.' };
  if (file.size === 0) return { error: 'El archivo está vacío.' };
  return { ext };
}

/** Days of notice between request creation (Costa Rica date) and the permission start date. */
export function noticeDays(startsOn: string, createdAt: string) {
  const created = new Date(createdAt).toLocaleDateString('en-CA', { timeZone: 'America/Costa_Rica' });
  return Math.round((Date.parse(`${startsOn}T00:00:00Z`) - Date.parse(`${created}T00:00:00Z`)) / 86400000);
}
