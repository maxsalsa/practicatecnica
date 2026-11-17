import { expect, it } from 'vitest';
import { backupDocument } from './portable-backup';
it('preserves users, grades and permissions in a real JSON document', () => {
 const data={users:[{id:'u1',institution_role:'docente'}],grades:[{score:83}],permissions:[{status:'aprobado'}]};
 expect(JSON.parse(backupDocument(data))).toEqual(data);
});