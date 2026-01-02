import { describe, test, expect } from 'vitest';
import { sum, fixedPoint, sqrtNewton } from '../1.3/1.3';
import { simpsonIntegral } from '../1.3/e-1.29';
import { product } from '../1.3/e-1.31';
import { phi } from '../1.3/e-1.35';
import { contFracIter } from '../1.3/e-1.37';
import { repeated } from '../1.3/e-1.43';
import { nthRoot } from '../1.3/e-1.45';

describe('Chapter 1.3: Higher-Order Procedures', () => {
  test('Sum and Integration', () => {
    expect(sum(x => x, 1, x => x + 1, 10)).toBe(55);
    const cube = (x: number) => x * x * x;
    expect(simpsonIntegral(cube, 0, 1, 100)).toBeCloseTo(0.25, 4);
  });

  test('Fixed Point and Roots', () => {
    expect(fixedPoint(Math.cos, 1.0, 0.001)).toBeCloseTo(0.739, 2);
    expect(sqrtNewton(2)).toBeCloseTo(1.414, 3);
    expect(nthRoot(16, 4)).toBeCloseTo(2, 2);
  });

  test('General Abstractions', () => {
    expect(product(x => x, 1, x => x + 1, 5)).toBe(120);
    expect(phi(0.0001)).toBeCloseTo(1.618, 3);
    expect(repeated(x => x * x, 2)(5)).toBe(625);
  });
});
