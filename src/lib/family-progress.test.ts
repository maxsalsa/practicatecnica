import { describe, expect, it } from 'vitest';
import { bandOf, subjectOf, summarizeFollowUp } from './family-progress';
import type { Attempt } from './progress-data';

const at = (deck_id: string, score: number, created_at: string, extra: Partial<Attempt> = {}): Attempt => ({ id: deck_id + created_at, deck_id, title: deck_id, score, question_count: 20, created_at, verified_scoring: true, earned_points: 100, points_version: 2, assessment_mode: 'practice', ...extra });
const now = new Date('2026-11-14T22:00:00Z');

describe('seguimiento familiar', () => {
  it('usa las bandas de dominio 80 y 50', () => {
    expect(bandOf(80)).toBe('Dominado');
    expect(bandOf(79)).toBe('En proceso');
    expect(bandOf(50)).toBe('En proceso');
    expect(bandOf(49)).toBe('Requiere reforzamiento');
  });
  it('agrupa prácticas sin repetición de la misma materia aunque cambie la semilla', () => {
    expect(subjectOf({ deck_id: 'gen-matesec-s1', title: 'x' }).key).toBe(subjectOf({ deck_id: 'gen-matesec-60-s99', title: 'y' }).key);
  });
  it('cuenta días de uso de los últimos 30 días combinando visitas y prácticas, sin duplicar', () => {
    const s = summarizeFollowUp([at('gen-matesec-s1', 90, '2026-11-14T15:00:00Z'), at('gen-redes-s2', 40, '2026-11-13T15:00:00Z')], ['2026-11-14', '2026-11-10', '2026-09-01'], now);
    expect(s.activeDays30).toBe(3);
    expect(s.streak).toBe(2);
    expect(s.points).toBe(200);
  });
  it('no cuenta intentos sin calificación verificada en notas ni promedio', () => {
    const s = summarizeFollowUp([at('gen-matesec-s1', 100, '2026-11-14T15:00:00Z'), at('ia-doc', 100, '2026-11-14T16:00:00Z', { verified_scoring: false }), at('gen-redes-s2', 40, '2026-11-14T17:00:00Z')], [], now);
    expect(s.verifiedCount).toBe(2);
    expect(s.average).toBe(70);
    expect(s.toReinforce.length).toBe(1);
  });
});
