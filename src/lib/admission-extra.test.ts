import { expect, it } from 'vitest';
import { admissionExtra } from './admission-extra.bank';
it('checks the arithmetic outcomes in original reasoning cases', () => {
 expect(admissionExtra[0]?.options[admissionExtra[0].answer]).toBe(String(120-120/4-18));
 expect(admissionExtra[1]?.options[admissionExtra[1].answer]).toBe(`${300/4*10} g`);
 expect(admissionExtra[12]?.options[admissionExtra[12].answer]).toBe(`${30/2-9} m`);
});
