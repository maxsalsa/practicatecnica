import { describe, it, expect } from 'vitest';
import { generarItemsMep, calificarItem } from '../src/utils/generadorItemsMep';
import { TAXONOMIA_MEP, filtrarIndicadores, asignaturas } from '../src/data/taxonomiaMep';
import { parsearTablaMep } from '../src/utils/parserTablaMep';

const base = { indicador: 'Calcula porcentajes en situaciones de consumo.', tipo: 'laboral' };
describe('motor de ítems MEP', () => {
  it('cada ítem tiene exactamente A, B, C y una sola clave válida', () => {
    for (const it of generarItemsMep({ ...base, semilla: 7, cantidad: 300 })) {
      expect(it.opciones.map((o) => o.letra)).toEqual(['A', 'B', 'C']);
      expect(new Set(it.opciones.map((o) => o.texto)).size).toBe(3);
      expect(['A', 'B', 'C']).toContain(it.clave);
      expect(['A', 'B', 'C'].filter((l) => calificarItem(it, l).correcta)).toHaveLength(1);
      expect(Object.keys(it.explicaciones)).toEqual(['A', 'B', 'C']);
    }
  });
  it('es reproducible con la misma semilla y equilibra claves en 300 ítems', () => {
    expect(generarItemsMep({ ...base, semilla: 42, cantidad: 300 })).toEqual(generarItemsMep({ ...base, semilla: 42, cantidad: 300 }));
    expect(generarItemsMep({ ...base, semilla: 42, cantidad: 9 })).not.toEqual(generarItemsMep({ ...base, semilla: 43, cantidad: 9 }));
    const n = { A: 0, B: 0, C: 0 };
    for (const it of generarItemsMep({ ...base, semilla: 42, cantidad: 300 })) n[it.clave]++;
    expect(n).toEqual({ A: 100, B: 100, C: 100 });
  });
  it('otorga 10/20/30 XP según nivel DUA', () => {
    const [g, c, e] = generarItemsMep({ ...base, cantidad: 3 });
    expect([g.nivelDua, g.puntosXP, c.puntosXP, e.puntosXP]).toEqual(['Gatear', 10, 20, 30]);
  });
});
describe('taxonomía MEP', () => {
  it('recorre las tres modalidades sin errores', () => {
    expect(TAXONOMIA_MEP.map((m) => m.modalidad)).toEqual(['Primaria', 'Secundaria Académica', 'Secundaria Técnica CTP']);
    for (const m of TAXONOMIA_MEP) {
      const rows = filtrarIndicadores({ modalidad: m.modalidad });
      expect(rows.length).toBeGreaterThan(0);
      for (const r of rows) for (const it of generarItemsMep({ ...r, cantidad: 3 })) expect(it.opciones).toHaveLength(3);
    }
    expect(asignaturas('Secundaria Técnica CTP')).toContain('Ciberseguridad');
    expect(filtrarIndicadores({ modalidad: 'Primaria', nivel: '3.°', asignatura: 'Matemáticas' }).every((r) => r.nivel === '3.°')).toBe(true);
  });
});
describe('parser de tablas de especificaciones', () => {
  it('extrae varios indicadores de texto plano', () => {
    const txt = 'Tema: Proporcionalidad\nIndicador 1: Resuelve problemas con proporciones.\n- Calcula porcentajes de descuento.\n2) Interpreta tablas de datos.';
    expect(parsearTablaMep(txt).map((r) => r.indicador)).toEqual(['Resuelve problemas con proporciones.', 'Calcula porcentajes de descuento.', 'Interpreta tablas de datos.']);
  });
  it('extrae de tablas con columnas y de JSON', () => {
    expect(parsearTablaMep('Tema | Indicador de logro | Ítems\nNúmeros | Resuelve sumas | 4\nGeometría | Identifica figuras | 3')).toEqual([{ indicador: 'Resuelve sumas', tema: 'Números' }, { indicador: 'Identifica figuras', tema: 'Geometría' }]);
    expect(parsearTablaMep(JSON.stringify([{ tema: 'EPP', indicadores: ['Selecciona el EPP adecuado', 'Inspecciona arneses'] }])).length).toBe(2);
  });
});
