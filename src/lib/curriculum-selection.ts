import { malla } from './malla';

export type CurriculumSelection = { modalidad?: string | undefined; nivel?: string | undefined; materia?: string | undefined };

/** Exact canonical names keep links stable and never imply new curricular coverage. */
export function resolveCurriculumSelection(input: CurriculumSelection) {
  const modality = malla.find(m => m.id === input.modalidad);
  const level = modality?.niveles.find(n => n.name === input.nivel);
  const subject = level?.materias.find(s => s.name === input.materia);
  return { modality, level, subject };
}

export function validCurriculumSearch(input: Record<string, unknown>): CurriculumSelection {
  const selection = resolveCurriculumSelection({
    modalidad: typeof input['modalidad'] === 'string' ? input['modalidad'] : undefined,
    nivel: typeof input['nivel'] === 'string' ? input['nivel'] : undefined,
    materia: typeof input['materia'] === 'string' ? input['materia'] : undefined,
  });
  return {
    ...(selection.modality ? { modalidad: selection.modality.id } : {}),
    ...(selection.level ? { nivel: selection.level.name } : {}),
    ...(selection.subject ? { materia: selection.subject.name } : {}),
  };
}