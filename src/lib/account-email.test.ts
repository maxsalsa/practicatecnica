import { describe, expect, it } from 'vitest';
import { isAllowedAccountEmail } from './account-email';
describe('solo cuentas Gmail', () => {
  it('acepta correo @gmail.com', () => expect(isAllowedAccountEmail('persona@gmail.com')).toBe(true));
  it('acepta mayúsculas y espacios alrededor', () => expect(isAllowedAccountEmail('  Persona@Gmail.com ')).toBe(true));
  it('rechaza otros dominios', () => expect(isAllowedAccountEmail('persona@hotmail.com')).toBe(false));
  it('rechaza dominios que imitan Gmail', () => expect(isAllowedAccountEmail('persona@gmail.com.evil.cr')).toBe(false));
  it('rechaza correo vacío', () => expect(isAllowedAccountEmail('')).toBe(false));
});
