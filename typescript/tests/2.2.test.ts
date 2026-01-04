import { describe, test, expect } from 'vitest';
import { listRef, length, append, countLeaves, deepReverse, map, filter, accumulate, enumerateLeaves, sumOddSquares, evenFibs, permutations, fringe, subsets } from '../2.2/2.2';
import { lastPair } from '../2.2/e-2.17';
import { reverse } from '../2.2/e-2.18';
import { squareTree } from '../2.2/e-2.30';
import { fringe } from '../2.2/e-2.28';
import { transpose } from '../2.2/e-2.37';

describe('Chapter 2.2: Hierarchical Data', () => {
  describe('Basic List Operations', () => {
    test('listRef - list element access', () => {
      const list = [10, 20, 30, 40];
      expect(listRef(list, 0)).toBe(10);
      expect(listRef(list, 2)).toBe(30);
    });

    test('length - list length', () => {
      expect(length([])).toBe(0);
      expect(length([1, 2, 3])).toBe(3);
      expect(length([1, 2, 3, 4, 5])).toBe(5);
    });

    test('append - list concatenation', () => {
      expect(append([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
      expect(append([], [1, 2])).toEqual([1, 2]);
      expect(append([1, 2], [])).toEqual([1, 2]);
    });
  });

  describe('Tree Operations', () => {
    test('countLeaves - count tree leaves', () => {
      expect(countLeaves(null)).toBe(0);
      expect(countLeaves([])).toBe(0);
      expect(countLeaves(1)).toBe(1);
      expect(countLeaves([1, 2, [3, 4]])).toBe(4);
    });

    test('deepReverse - deep list reversal', () => {
      expect(deepReverse([1, 2, 3])).toEqual([3, 2, 1]);
      expect(deepReverse([[1, 2], [3, 4]])).toEqual([[4, 3], [2, 1]]);
    });
  });

  describe('Higher-order Operations', () => {
    test('map - tree mapping', () => {
      const tree = [1, [2, [3, 4]]];
      const result = map((x: number) => x * 2, tree);
      expect(result).toEqual([2, [4, [6, 8]]]);
    });

    test('filter - tree filtering', () => {
      const tree = [1, [2, [3, 4]]];
      const result = filter((x: number) => x % 2 === 0, tree);
      expect(result).toEqual([2, [4]]);
    });
  });

  describe('Accumulation and Enumeration', () => {
    test('accumulate - generic accumulation', () => {
      const sum = (a: number, b: number) => a + b;
      expect(accumulate(sum, 0, [1, 2, 3, 4])).toBe(10);
    });

    test('enumerateLeaves - flatten tree to list', () => {
      const tree = [1, [2, [3, 4]]];
      expect(enumerateLeaves(tree)).toEqual([1, 2, 3, 4]);
    });

    test('sumOddSquares - sum of odd squares', () => {
      const tree = [1, [2, [3, 4]]];
      expect(sumOddSquares(tree)).toBe(10);
    });
  });

  describe('Specialized Operations', () => {
    test('evenFibs - even Fibonacci numbers', () => {
      const result = evenFibs(10);
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((x: number) => x % 2 === 0)).toBe(true);
    });

    test('permutations - generate permutations', () => {
      const result = permutations([1, 2, 3]);
      expect(result.length).toBe(6);
      expect(result).toContainEqual([1, 2, 3]);
      expect(result).toContainEqual([1, 3, 2]);
    });
  });

  describe('Exercise Functions', () => {
    test('lastPair - get last element', () => {
      expect(lastPair([1, 2, 3, 4])).toBe(4);
      expect(lastPair([42])).toBe(42);
      expect(() => lastPair([])).toThrow("Empty list");
    });

    test('reverse - list reversal', () => {
      expect(reverse([1, 2, 3, 4])).toEqual([4, 3, 2, 1]);
      expect(reverse([])).toEqual([]);
    });

    test('squareTree - square all tree elements', () => {
      const tree = [1, [2, [3, 4]]];
      const result = squareTree(tree);
      expect(result).toEqual([1, [4, [9, 16]]]);
    });

    test('fringe - extract tree fringe', () => {
      const tree = [1, [2, [3, 4]]];
      expect(fringe(tree)).toEqual([1, 2, 3, 4]);
    });

    test('transpose - matrix transposition', () => {
      const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
      const transposed = transpose(matrix);
      expect(transposed).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]]);
    });
  });
});
