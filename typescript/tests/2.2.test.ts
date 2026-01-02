import { describe, test, expect } from 'vitest';
import { length, deepReverse, subsets } from '../2.2/2.2';
import { sameParity } from '../2.2/e-2.20';
import { lastPair } from '../2.2/e-2.17';
import { reverse } from '../2.2/e-2.18';
import { hornerEval } from '../2.2/e-2.34';

describe('Chapter 2.2: Hierarchical Data', () => {
  test('List and Tree operations', () => {
    const list = [1, 2, 3, 4];
    expect(length(list)).toBe(4);
    expect(lastPair(list)).toBe(4);
    expect(reverse(list)).toEqual([4, 3, 2, 1]);
    expect(deepReverse([[1, 2], [3, 4]])).toEqual([[4, 3], [2, 1]]);
  });

  test('Subsets and Higher-order', () => {
    expect(subsets([1, 2]).length).toBe(4);
    expect(sameParity(1, 2, 3, 4, 5)).toEqual([1, 3, 5]);
    expect(hornerEval(2, [1, 3, 0, 5, 0, 1])).toBe(79);
  });
});
