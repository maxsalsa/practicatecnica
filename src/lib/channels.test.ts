import { describe, expect, it } from 'vitest';
import { blockedLanguage, canPost, messageError } from './channels';

describe('canales institucionales', () => {
  it('bloquea insultos aunque lleven tildes o mayúsculas', () => {
    expect(blockedLanguage('Usted es un IDIOTA')).toBe(true);
    expect(blockedLanguage('qué estúpido')).toBe(true);
  });
  it('no bloquea palabras comunes que contienen fragmentos parecidos', () => {
    expect(blockedLanguage('La computadora y la impresora HP de la escuela')).toBe(false);
    expect(blockedLanguage('Mañana hay reunión de madres y padres a las 7:00')).toBe(false);
  });
  it('rechaza mensajes vacíos o de más de 2000 caracteres', () => {
    expect(messageError('   ')).toBe('Escriba un mensaje.');
    expect(messageError('a'.repeat(2001))).toBe('El mensaje admite hasta 2000 caracteres.');
    expect(messageError('Buenas tardes, profesora.')).toBeNull();
  });
  it('solo publican quienes tienen permiso de publicar o moderar', () => {
    expect(canPost('read')).toBe(false);
    expect(canPost('none')).toBe(false);
    expect(canPost('post')).toBe(true);
    expect(canPost('moderate')).toBe(true);
  });
});
