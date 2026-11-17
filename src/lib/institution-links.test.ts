import {expect,it} from 'vitest';
import {institutionSectionLinks} from './institution-links';
it('links select a section without embedding credentials or granting permissions',()=>{
 const links=institutionSectionLinks('center-id','10-2');const url=new URL(links.student);
 expect(url.origin).toBe('https://practicatecnica.com');expect(url.searchParams.get('centro')).toBe('center-id');expect(url.searchParams.get('seccion')).toBe('10-2');expect([...url.searchParams.keys()]).toEqual(['vista','centro','seccion']);expect(new URL(links.family).searchParams.get('vista')).toBe('resultados');
});