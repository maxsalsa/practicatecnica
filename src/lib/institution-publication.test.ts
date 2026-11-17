import { expect,it } from 'vitest';
import { hasVisibleTransparency,institutionQuestion } from './institution-publication';
it('requires a visible logo with transparent pixels',()=>{expect(hasVisibleTransparency(new Uint8ClampedArray([1,2,3,255,0,0,0,0]))).toBe(true);expect(hasVisibleTransparency(new Uint8ClampedArray([1,2,3,255]))).toBe(false);expect(hasVisibleTransparency(new Uint8ClampedArray([0,0,0,0]))).toBe(false);});
it('rejects answer keys outside four options',()=>expect(institutionQuestion.safeParse({q:'Question',options:['a','b','c','d'],answer:4}).success).toBe(false));