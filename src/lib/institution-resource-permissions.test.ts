import { describe, expect, it } from 'vitest';
import { officialInstitutionPhone, resourceGrantInput } from './institution-resource-permissions';
const ids = { resource_id: 'a776173d-f24d-4ef7-86fc-8023132de8a6', institution_id: '79a40490-857d-49c4-b2f8-098b48429639' };
describe('institutional resource permission rules', () => {
  it('rejects sending without reading', () => {
    expect(resourceGrantInput.safeParse({ ...ids, can_read: false, can_send: true }).success).toBe(false);
  });
  it('allows read-only institution access', () => {
    expect(resourceGrantInput.parse({ ...ids, can_read: true, can_send: false }).can_send).toBe(false);
  });
  it('validates international institutional numbers', () => {
    expect(officialInstitutionPhone.safeParse('50660906359').success).toBe(true);
    expect(officialInstitutionPhone.safeParse('+50660906359').success).toBe(false);
  });
});