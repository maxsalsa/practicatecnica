import { describe, expect, it } from 'vitest';
import { documentMime, enrollmentPathOwned, enrollmentDocumentSchema, pickupIsAuthorized } from './enrollment-document';
describe('private enrollment documents', () => {
  it('a pending proposal never authorizes pickup', () => expect(pickupIsAuthorized('aprobada', 'pendiente')).toBe(false));
  it('revocation blocks pickup', () => expect(pickupIsAuthorized('aprobada', 'revocada')).toBe(false));
  it('an approved person requires approved enrollment', () => {
    expect(pickupIsAuthorized('pendiente', 'autorizada')).toBe(false);
    expect(pickupIsAuthorized('aprobada', 'autorizada')).toBe(true);
  });
  it('rejects another family path', () => {
    expect(enrollmentPathOwned('center/other/id.jpg','center','family')).toBe(false);
    expect(enrollmentPathOwned('center/family/id.jpg','center','family')).toBe(true);
  });
  it('rejects traversal', () => expect(enrollmentPathOwned('center/family/../id.jpg','center','family')).toBe(false));
  it('requires separate image consent for private identity', () => {
    expect(enrollmentDocumentSchema.safeParse({ path: 'a/b/c', category: 'foto', description: 'Familia', purpose: 'identidad_privada', imageConsent: false }).success).toBe(false);
  });
  it('requires a real place label for institution photographs', () => {
    expect(enrollmentDocumentSchema.safeParse({ path: 'a/b/c', category: 'foto', description: 'Aula', purpose: 'centro_autorizado', imageConsent: true, place: '' }).success).toBe(false);
    expect(enrollmentDocumentSchema.safeParse({ path: 'a/b/c', category: 'foto', description: 'Aula', purpose: 'centro_autorizado', imageConsent: true, place: 'Aula 1' }).success).toBe(true);
  });
  it('checks file contents instead of names', () => {
    expect(documentMime(new TextEncoder().encode('<html>'))).toBeNull();
    expect(documentMime(new TextEncoder().encode('%PDF-1.7'))).toBe('application/pdf');
  });
});