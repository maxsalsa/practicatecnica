import { expect, it } from 'vitest';
import { isFreePath } from './free-access';
it('opens the requested free topic pages without opening paid exams', () => {
  expect(isFreePath('/temas/book-v1-1-matematica')).toBe(true);
  expect(isFreePath('/simulacro')).toBe(false);
  expect(isFreePath('/aprender')).toBe(false);
  expect(isFreePath('/temas-ajenos')).toBe(false);
});
it('allows the approved campaign catalog without opening private assessment paths', () => {
  expect(isFreePath('/campana-clara')).toBe(true);
  expect(isFreePath('/campana-clara-ajena')).toBe(false);
  expect(isFreePath('/examenes-docentes')).toBe(false);
});
it('opens the pickup consultation page without granting assessment access', () => {
  expect(isFreePath('/verificar-retiro')).toBe(true);
  expect(isFreePath('/verificar-retiro-ajeno')).toBe(false);
  expect(isFreePath('/verificar-matricula')).toBe(true);
  expect(isFreePath('/simulacro')).toBe(false);
});