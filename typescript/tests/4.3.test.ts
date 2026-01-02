import { describe, test, expect } from 'vitest';
import { amb } from '../4.3/4.3';

describe('Chapter 4.3: Amb Evaluator', () => {
  test('Nondeterministic computing', () => {
    return new Promise<void>((resolve) => {
      const results: number[] = [];
      amb([1, 2, 3], (val, fail) => {
        results.push(val);
        fail();
      }, () => {
        expect(results).toEqual([1, 2, 3]);
        resolve();
      });
    });
  });
});