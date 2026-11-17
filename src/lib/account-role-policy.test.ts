import { expect, it } from 'vitest';
import { canCorrectPersonalRole } from './account-role-policy';
it('Max account cannot be demoted using personal account correction',()=>expect(canCorrectPersonalRole(['admin'],'student')).toBe(false));
it('student accounts can be corrected to teacher',()=>expect(canCorrectPersonalRole(['student'],'teacher')).toBe(true));
it('teacher accounts can be corrected to student',()=>expect(canCorrectPersonalRole(['teacher'],'student')).toBe(true));
it('account correction never assigns global administration',()=>expect(canCorrectPersonalRole(['student'],'admin')).toBe(false));