import { expect, it } from 'vitest';
import { menuView } from './menu-view';
const student={administration:false,leadership:false,teaching:false,family:false,student:true};
it('students cannot select direction navigation',()=>expect(menuView(student,'direccion')).toEqual(student));
it('Max can inspect student navigation without administration links',()=>expect(menuView({...student,administration:true},'estudiante')).toEqual(student));
it('family view has no leadership or teaching navigation',()=>expect(menuView({...student,administration:true},'encargado')).toEqual({...student,student:false,family:true}));
it.each(['orientacion','auxiliar','conserje','guarda'])('%s review has no academic or management powers',role=>expect(menuView({...student,administration:true},role)).toEqual({...student,student:false}));
it('a teacher cannot select administration',()=>{const teacher={...student,student:false,teaching:true};expect(menuView(teacher,'assigned')).toEqual(teacher);expect(menuView(teacher,'direccion')).toEqual(teacher);});