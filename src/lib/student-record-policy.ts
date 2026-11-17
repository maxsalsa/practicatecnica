export const RECORD_LINK_SECONDS = 30;
export const RECORD_FILE_BYTES = 5 * 1024 * 1024;
export function canReadStudentRecords(role: string | null | undefined) {
  return role === 'direccion' || role === 'subdireccion';
}
export function validateRecordFile(type: string, size: number) {
  return ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'].includes(type) && size > 0 && size <= RECORD_FILE_BYTES;
}