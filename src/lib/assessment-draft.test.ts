import { expect, it, vi } from 'vitest';
import { draftKey, readDraft, writeDraft } from './assessment-draft';
it('restores the pending item, responses and remaining exam time after returning', () => {
  const values = new Map<string,string>();
  vi.stubGlobal('localStorage', {getItem:(k:string)=>values.get(k)??null,setItem:(k:string,v:string)=>values.set(k,v),removeItem:(k:string)=>values.delete(k)});
  const key = draftKey('student-1','english~f02','exam');
  const state = {i:7,marks:[1,null,2],left:419};
  writeDraft(key,{request:'english~f02',signature:'bank-v1',state});
  expect(readDraft(key)?.state).toEqual({i:7,marks:[1,null,2],left:419});
  expect(readDraft(draftKey('student-2','english','exam'))).toBeNull();
  expect(readDraft(draftKey(undefined,'english','exam'))).toBeNull();
  expect(readDraft(draftKey('student-1','english','practice'))).toBeNull();
  writeDraft(key,null);
  expect(readDraft(key)).toBeNull();
  vi.unstubAllGlobals();
});it('una práctica generada guarda un solo avance por familia, sin importar la semilla', () => {
  expect(draftKey('student-1', 'gen-matesec-s123', 'practice')).toBe(draftKey('student-1', 'gen-matesec', 'practice'));
  expect(draftKey('student-1', 'gen-matesec-60-s9', 'exam')).toBe(draftKey('student-1', 'gen-matesec-60', 'exam'));
  expect(draftKey('student-1', 'gen-matesec-60-s9', 'exam')).not.toBe(draftKey('student-1', 'gen-matesec', 'exam'));
});
