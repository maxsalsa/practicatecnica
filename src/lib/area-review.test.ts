import {expect,it} from 'vitest';
import {validAreaReason,studentAreaAllowed} from './area-review';
it('requires a reason between five and one thousand characters',()=>{
 expect(validAreaReason('    ')).toBe(false);expect(validAreaReason('abcd')).toBe(false);
 expect(validAreaReason('Revisado')).toBe(true);expect(validAreaReason('a'.repeat(1001))).toBe(false);
});
it('pending or rejected areas cannot be opened even with an individual assignment',()=>{
 expect(studentAreaAllowed(undefined,true)).toBe(false);expect(studentAreaAllowed('rejected',true)).toBe(false);
 expect(studentAreaAllowed('approved',false)).toBe(false);expect(studentAreaAllowed('approved',true)).toBe(true);
});