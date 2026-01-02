import { describe, test, expect } from 'vitest';
import { square, cube, gcd, filter, reverse } from '../common';

describe('Common Utilities', () => {
  test('math and list helpers', () => {
    expect(square(2)).toBe(4);
    expect(cube(2)).toBe(8);
    expect(gcd(12, 8)).toBe(4);
    expect(filter(x => x % 2 === 0, [1, 2, 3, 4])).toEqual([2, 4]);
    expect(reverse([1, 2, 3])).toEqual([3, 2, 1]);
  });
});
