export const RUBRIC_LEVELS = [3, 2, 1, 0] as const;
export const RUBRIC_DESCRIPTORS = {
  3: 'Logrado: cumple el indicador correctamente y presenta la evidencia solicitada.',
  2: 'Con errores: presenta evidencia parcial con errores u omisiones que requieren corrección.',
  1: 'Sin logro demostrado: presentó trabajo, pero no demuestra el indicador.',
  0: 'Faltó / no presentó: no hay evidencia evaluable; registre la causa por separado.',
} as const;
export function lessonMinutes(kind: 'academica' | 'especialidad', lessons: number) {
  return Math.max(0, Math.floor(lessons)) * (kind === 'especialidad' ? 60 : 40);
}