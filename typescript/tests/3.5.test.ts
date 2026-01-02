import { describe, test, expect } from 'vitest';
import { integers, streamRef } from '../3.5/3.5';
import { hammingNumbers, expSeries } from '../3.5/3.5_exercises';

describe('Chapter 3.5: Streams', () => {
  test('Basic Streams', () => {
    expect(streamRef(integers, 10)).toBe(11);
  });

  test('Advanced Streams', () => {
    expect(streamRef(hammingNumbers, 6)).toBe(8);
    expect(streamRef(expSeries, 2)).toBe(0.5);
  });
});
