import { expect, it } from 'vitest';
import { RUBRIC_LEVELS, lessonMinutes } from './teaching-rubric';
it('uses the exact 3, 2, 1, 0 rubric scale', () => expect(RUBRIC_LEVELS).toEqual([3, 2, 1, 0]));
it('academic lessons last 40 minutes', () => expect(lessonMinutes('academica', 3)).toBe(120));
it('specialty clock hours last 60 minutes', () => expect(lessonMinutes('especialidad', 3)).toBe(180));