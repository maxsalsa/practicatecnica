export const TEACHER_ANNUAL_CRC = 3500;
export function teacherUsd(crcPerUsd: number) {
  if (!Number.isFinite(crcPerUsd) || crcPerUsd <= 0) throw new Error('Cotización no válida.');
  return (Math.ceil(TEACHER_ANNUAL_CRC / crcPerUsd * 100) / 100).toFixed(2);
}
export function verifiedRate(rate: number, timestamp: number, now = Date.now()) {
  if (!Number.isFinite(timestamp) || timestamp > now + 300000 || now - timestamp > 172800000) throw new Error('La cotización no está vigente. Use SINPE.');
  teacherUsd(rate);
  return { rate, date: new Date(timestamp).toISOString() };
}