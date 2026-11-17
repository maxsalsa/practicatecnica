import { expect, it } from 'vitest';
import { areaResults, deckArea } from './skill-areas';
import type { Attempt } from './progress-data';
const row = (deck_id: string, score: number, verified_scoring = true): Attempt => ({ id: deck_id, deck_id, title: 'No determina el área', score, verified_scoring, question_count: 5, created_at: '2026-11-13T00:00:00Z' });
it('separa carro y moto', () => {
 const r = areaResults([row('mopt-carro', 80), row('mopt-moto', 40)]);
 expect(r.find(a => a.id === 'mopt-carro')?.last).toBe(80);
 expect(r.find(a => a.id === 'mopt-moto')?.last).toBe(40);
});
it('no atribuye admisión genérica a UCR ni MOPT genérico a carro', () => { expect(deckArea('admision')).toBeUndefined(); expect(deckArea('mopt')).toBeUndefined(); });
it('no usa autoinformes como notas verificadas', () => expect(areaResults([row('ctp-ciber', 100, false)]).find(a => a.id === 'ciberseguridad')?.attempts).toBe(0));
it('mantiene ciencias y ciudadanía separadas', () => {
 const r = areaResults([row('civica', 60), row('school-biologia', 90)]);
 expect(r.find(a => a.id === 'ciudadania')?.best).toBe(60); expect(r.find(a => a.id === 'ciencias')?.best).toBe(90);
});