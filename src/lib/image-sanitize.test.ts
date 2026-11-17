import { expect, it } from 'vitest';
import { scaledSize } from './image-sanitize';

it('las fotos grandes se reducen a 2000 px en su lado mayor, sin deformarse', () => {
  expect(scaledSize(4000, 3000)).toEqual({ width: 2000, height: 1500 });
  expect(scaledSize(1200, 900)).toEqual({ width: 1200, height: 900 });
});
