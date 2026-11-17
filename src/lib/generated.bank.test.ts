import { describe, expect, it } from 'vitest';
import { buildGeneratedDeck, parseGeneratedId, resolveGeneratedDeck } from './generated.bank';
import { GENERATED_FAMILIES } from './generated-catalog';
import { certificationSubject } from './certification-policy';

describe('ítems paramétricos', () => {
  for (const f of GENERATED_FAMILIES.filter(f=>!['frclean','ptclean'].includes(f.key))) {
    it(`${f.key}: 20 ítems de práctica y 60 de simulacro, sin repetirse y con 4 opciones distintas`, () => {
      for (const seed of [1, 77, 123456, 4294967295]) {
        for (const exam of [false, true]) {
          const d = buildGeneratedDeck(f.key, exam, seed);
          expect(d).not.toBeNull();if(!d)return;
          expect(d.questions).toHaveLength(exam ? 60 : 20);
          expect(new Set(d.questions.map(q => q.q)).size).toBe(d.questions.length);
          for (const q of d.questions) {
            expect(q.options).toHaveLength(4);
            expect(new Set(q.options).size).toBe(4);
            expect(q.answer).toBeGreaterThanOrEqual(0);
            expect(q.answer).toBeLessThan(4);
            expect(q.options.join(' ')).not.toMatch(/NaN|undefined|Infinity/);
            expect(q.q).not.toMatch(/NaN|undefined|Infinity/);
            const values = q.options.map(o => /^₡?(−?[\d ]+(?:,\d+)?)(?: [^\d]*)?$/.exec(o)?.[1]).filter((v): v is string => !!v).map(v => Number(v.replace(/ /g, '').replace(',', '.').replace('−', '-')));
            if (values.length === 4) expect(new Set(values).size).toBe(4);
          }
        }
      }
    });
  }
  it('la misma semilla reconstruye exactamente el mismo banco para calificar', () => {
    expect(resolveGeneratedDeck('gen-matesec-s42')).toEqual(resolveGeneratedDeck('gen-matesec-s42'));
  });
  it('semillas distintas producen preguntas distintas', () => {
    const a = buildGeneratedDeck('matesec', false, 1)!.questions.map(q => q.q);
    const b = buildGeneratedDeck('matesec', false, 2)!.questions.map(q => q.q);
    expect(a.filter(q => b.includes(q)).length).toBeLessThan(3);
  });
  it('sin semilla solo se crea en el servidor de contenido, nunca al calificar', () => {
    expect(resolveGeneratedDeck('gen-redes')).toBeNull();
    expect(resolveGeneratedDeck('gen-redes', true)?.id).toMatch(/^gen-redes-s\d+$/);
  });
  it('rechaza familias o semillas inválidas', () => {
    expect(parseGeneratedId('gen-frclean-60-s42')).toBeNull();
    expect(parseGeneratedId('gen-ptclean-s42')).toBeNull();
    expect(resolveGeneratedDeck('gen-frclean-v2-review-s42')?.questions).toHaveLength(8);
    expect(parseGeneratedId('gen-inventada-s1')).toBeNull();
    expect(parseGeneratedId('gen-redes-s99999999999')).toBeNull();
  });
  it('el ítem de suma calcula bien el resultado', () => {
    const d = buildGeneratedDeck('mateprim', false, 9)!;
    for (const q of d.questions) {
      const m = /^Resuelva: ([\d ]+) \+ ([\d ]+) = \?$/.exec(q.q);
      if (m) expect(q.options[q.answer]).toBe(String(Number(m[1]!.replace(/ /g, '')) + Number(m[2]!.replace(/ /g, ''))).replace(/\B(?=(\d{3})+(?!\d))/g, (x, o, s) => (s.length > 4 ? ' ' : '')));
    }
  });
  it('solo el simulacro generado de 60 cuenta para certificado', () => {
    expect(certificationSubject('gen-matesec-60-s5', 60)).toBe('gen-matesec');
    expect(certificationSubject('gen-matesec-s5', 20)).toBeUndefined();
  });
});
