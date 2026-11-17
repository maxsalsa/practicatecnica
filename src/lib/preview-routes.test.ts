import { describe, it, expect } from 'vitest';
import { previewHidesPath } from './preview-routes';
describe('vista de revisión por rol', () => {
  it('Max en su vista ve todo', () => expect(previewHidesPath('assigned', '/superadmin')).toBe(false));
  it('cualquier rol simulado oculta superadministración', () => expect(previewHidesPath('direccion', '/superadmin')).toBe(true));
  it('estudiante no ve herramientas docentes', () => expect(previewHidesPath('estudiante', '/planeamiento')).toBe(true));
  it('docente sí ve herramientas docentes', () => expect(previewHidesPath('docente', '/planeamiento')).toBe(false));
  it('familia ve páginas comunes', () => expect(previewHidesPath('encargado', '/practicas')).toBe(false));
});
