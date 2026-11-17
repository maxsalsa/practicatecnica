import { describe, expect, it } from 'vitest';
import { parsePickupCode } from './pickup-code';
describe('private pickup codes', () => {
  it('reads an opaque pickup QR without personal data', () => {
    expect(parsePickupCode('PT-RETIRO:12345678-1234-4123-8123-123456789abc')).toEqual({ kind: 'pickup', value: '12345678-1234-4123-8123-123456789abc' });
  });
  it('reads an exact identification barcode without inferring age or authority', () => {
    expect(parsePickupCode('123456789')).toEqual({ kind: 'identification', value: '123456789' });
  });
  it('rejects unrelated QR links and structured identity payloads', () => {
    expect(parsePickupCode('https://example.com/private')).toBeNull();
    expect(parsePickupCode('NAME|123456789|BIRTH')).toBeNull();
  });
});