import { expect, it } from 'vitest';
import { assertAttemptAvailable, assessmentBankKey } from './assessment-limits';
it('allows practice number three, blocks number four', () => { expect(() => assertAttemptAvailable(2, false)).not.toThrow(); expect(() => assertAttemptAvailable(3, false)).toThrow(); });
it('allows exam number two, blocks number three', () => { expect(() => assertAttemptAvailable(1, true)).not.toThrow(); expect(() => assertAttemptAvailable(2, true)).toThrow(); });
it('seed and form do not bypass practice identity', () => expect(assessmentBankKey('gen-matesec-s123~f01')).toBe('gen-matesec'));