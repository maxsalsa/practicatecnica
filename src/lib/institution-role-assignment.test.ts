import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
const sql=readFileSync('drizzle/migrations/0094_institution_director_role_assignment.sql','utf8');
it('direction assignments remain scoped to the caller institution',()=>expect(sql).toContain("public.institution_role_of(_inst)::text='direccion'"));
it('self-assignment remains forbidden',()=>expect(sql).toContain("IF uid=auth.uid() THEN RAISE EXCEPTION 'No puede modificar su propio rol'"));
it('new minister assignments reject the retired role',()=>expect(sql).toContain("_role NOT IN ('ministro','asesor_especialidad','director_general')"));