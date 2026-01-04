import { describe, test, expect } from 'vitest';
import { 
  square, 
  cube, 
  double, 
  halve, 
  isEven, 
  isOdd, 
  div, 
  divides,
  identity,
  isCloseEnough,
  average,
  averageOf3,
  inc,
  gcd,
  nil,
  accumulate,
  filter,
  enumerateInterval,
  foldLeft,
  foldRight,
  reverse
} from '../common';

describe('Common Utilities', () => {
  describe('Mathematical Functions', () => {
    test('square, cube - basic arithmetic', () => {
      expect(square(2)).toBe(4);
      expect(square(0)).toBe(0);
      expect(cube(2)).toBe(8);
      expect(cube(1)).toBe(1);
    });

    test('double, halve - multiplication and division by 2', () => {
      expect(double(5)).toBe(10);
      expect(double(0)).toBe(0);
      expect(halve(6)).toBe(3);
      expect(halve(5)).toBe(2.5);
    });

    test('isEven, isOdd - parity testing', () => {
      expect(isEven(2)).toBe(true);
      expect(isEven(3)).toBe(false);
      expect(isOdd(3)).toBe(true);
      expect(isOdd(2)).toBe(false);
    });

    test('div, divides - division and divisibility', () => {
      expect(div(7, 2)).toBe(3);
      expect(div(8, 4)).toBe(2);
      expect(divides(2, 6)).toBe(true);
      expect(divides(2, 7)).toBe(false);
    });

    test('identity - identity function', () => {
      expect(identity(5)).toBe(5);
      expect(identity('hello')).toBe('hello');
      expect(identity(null)).toBe(null);
    });

    test('isCloseEnough - floating point comparison', () => {
      expect(isCloseEnough(1.0, 1.001, 0.01)).toBe(true);
      expect(isCloseEnough(1.0, 1.1, 0.01)).toBe(false);
    });

    test('average, averageOf3 - averaging functions', () => {
      expect(average(4, 8)).toBe(6);
      expect(average(1, 3)).toBe(2);
      expect(averageOf3(1, 2, 3)).toBe(2);
      expect(averageOf3(0, 6, 12)).toBe(6);
    });

    test('inc - increment function', () => {
      expect(inc(5)).toBe(6);
      expect(inc(0)).toBe(1);
      expect(inc(-1)).toBe(0);
    });

    test('gcd - greatest common divisor', () => {
      expect(gcd(12, 8)).toBe(4);
      expect(gcd(17, 13)).toBe(1);
      expect(gcd(0, 5)).toBe(5);
      expect(gcd(48, 18)).toBe(6);
    });
  });

  describe('List and Sequence Operations', () => {
    test('accumulate - recursive accumulation', () => {
      const sum = (a: number, b: number) => a + b;
      expect(accumulate(sum, 0, [1, 2, 3, 4])).toBe(10);
      
      const product = (a: number, b: number) => a * b;
      expect(accumulate(product, 1, [2, 3, 4])).toBe(24);
    });

    test('filter - list filtering', () => {
      expect(filter(x => x % 2 === 0, [1, 2, 3, 4])).toEqual([2, 4]);
      expect(filter(x => x > 2, [1, 2, 3, 4, 5])).toEqual([3, 4, 5]);
      expect(filter(() => false, [1, 2, 3])).toEqual([]);
    });

    test('enumerateInterval - number range generation', () => {
      expect(enumerateInterval(1, 5)).toEqual([1, 2, 3, 4, 5]);
      expect(enumerateInterval(3, 3)).toEqual([3]);
      expect(enumerateInterval(5, 3)).toEqual([]);
    });

    test('foldLeft - left folding', () => {
      expect(foldLeft((acc, curr) => acc + curr, 0, [1, 2, 3, 4])).toBe(10);
      expect(foldLeft((acc, curr) => acc * curr, 1, [2, 3, 4])).toBe(24);
    });

    test('foldRight - right folding', () => {
      expect(foldRight((curr, acc) => acc + curr, 0, [1, 2, 3, 4])).toBe(10);
      expect(foldRight((curr, acc) => acc * curr, 1, [2, 3, 4])).toBe(24);
    });

    test('reverse - list reversal', () => {
      expect(reverse([1, 2, 3])).toEqual([3, 2, 1]);
      expect(reverse(['a', 'b', 'c'])).toEqual(['c', 'b', 'a']);
      expect(reverse([])).toEqual([]);
    });
  });

  describe('Constants', () => {
    test('nil - empty list constant', () => {
      expect(nil).toEqual([]);
    });
  });
});
