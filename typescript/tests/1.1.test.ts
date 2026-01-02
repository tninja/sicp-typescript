import { describe, test, expect } from 'vitest';
import { sqrt } from '../1.1/1.1';
import { sumLargerSquare } from '../1.1/e-1.3';
import { aPlusAbsB } from '../1.1/e-1.4';
import { sqrtDelta } from '../1.1/e-1.7';
import { cubeRoot } from '../1.1/e-1.8';

describe('Chapter 1.1: The Elements of Programming', () => {
  test('sqrt and cubeRoot', () => {
    expect(sqrt(9)).toBeCloseTo(3, 3);
    expect(sqrtDelta(2)).toBeCloseTo(1.414, 3);
    expect(cubeRoot(27)).toBeCloseTo(3, 2);
  });

  test('sumLargerSquare and abs logic', () => {
    expect(sumLargerSquare(1, 2, 3)).toBe(13);
    expect(aPlusAbsB(10, -5)).toBe(15);
  });
});
