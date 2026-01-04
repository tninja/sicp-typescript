import { describe, test, expect } from 'vitest';
import { 
  sum, 
  inc, 
  sumCubes, 
  identity, 
  sumIntegers, 
  piSum, 
  integral, 
  search, 
  bisectionMethod, 
  fixedPoint, 
  averageDamp, 
  sqrt, 
  cubeRoot, 
  deriv, 
  newtonTransform, 
  newtonsMethod, 
  sqrtNewton 
} from '../1.3/1.3';
import { simpsonIntegral } from '../1.3/e-1.29';
import { product } from '../1.3/e-1.31';
import { piApprox } from '../1.3/e-1.31';
import { accumulate } from '../1.3/e-1.32';
import { accumulateIterative } from '../1.3/e-1.33';
import { f } from '../1.3/e-1.34';
import { phi } from '../1.3/e-1.35';
import { contFracIter, contFracRecursive } from '../1.3/e-1.37';
import { contFracIter as contFracIterE138 } from '../1.3/e-1.38';
import { solveXXEquals1000, countSteps, verifySolution } from '../1.3/e-1.36';
import { compose } from '../1.3/e-1.42';
import { repeated } from '../1.3/e-1.43';
import { smooth } from '../1.3/e-1.44';
import { nthRoot } from '../1.3/e-1.45';

describe('Chapter 1.3: Higher-Order Procedures', () => {
  describe('Generic Sum Functions', () => {
    test('sum - generic summation', () => {
      expect(sum(x => x, 1, x => x + 1, 10)).toBe(55);
      expect(sum(x => x * x, 1, inc, 3)).toBe(14);
    });

    test('inc - increment function', () => {
      expect(inc(5)).toBe(6);
      expect(inc(0)).toBe(1);
    });

    test('sumCubes - sum of cubes', () => {
      expect(sumCubes(1, 3)).toBe(36);
    });

    test('identity - identity function', () => {
      expect(identity(5)).toBe(5);
      expect(identity(0)).toBe(0);
    });

    test('sumIntegers - sum of integers', () => {
      expect(sumIntegers(1, 10)).toBe(55);
      expect(sumIntegers(5, 5)).toBe(5);
    });

    test('piSum - π approximation', () => {
      const result = piSum(1, 1000);
      expect(result).toBeCloseTo(0.785, 2); // π/4 ≈ 0.785
    });
  });

  describe('Integration', () => {
    test('integral - numerical integration', () => {
      const cube = (x: number) => x * x * x;
      expect(integral(cube, 0, 1, 0.001)).toBeCloseTo(0.25, 2);
      
      const linear = (x: number) => x;
      expect(integral(linear, 0, 10, 0.001)).toBeCloseTo(50, 1);
    });
  });

  describe('Root Finding Methods', () => {
    test('search - bisection search helper', () => {
      const f = (x: number) => x * x - 4;
      expect(search(f, 0, 3, 0.001)).toBeCloseTo(2, 2);
    });

    test('bisectionMethod - complete bisection method', () => {
      const f = (x: number) => x * x - 9; // Roots at x = ±3
      expect(bisectionMethod(f, 0, 5)).toBeCloseTo(3, 2);
      
      expect(() => bisectionMethod(f, 1, 5)).toThrow("Values are not of opposite sign");
    });
  });

  describe('Fixed Point Methods', () => {
    test('fixedPoint - basic fixed point iteration', () => {
      expect(fixedPoint(Math.cos, 1.0, 0.001)).toBeCloseTo(0.739, 2);
      expect(fixedPoint(x => Math.sqrt(x + 1), 1.0, 0.001)).toBeCloseTo(1.618, 2);
    });

    test('averageDamp - average damping', () => {
      const f = averageDamp(x => x / 2);
      expect(f(4)).toBe(3); // average(4, 4/2) = average(4, 2) = 3
    });

    test('sqrt - fixed point square root', () => {
      expect(sqrt(4)).toBeCloseTo(2, 2);
      expect(sqrt(9)).toBeCloseTo(3, 2);
    });

    test('cubeRoot - fixed point cube root', () => {
      expect(cubeRoot(8)).toBeCloseTo(2, 2);
      expect(cubeRoot(27)).toBeCloseTo(3, 2);
    });
  });

  describe('Newton\'s Method', () => {
    test('deriv - numerical derivative', () => {
      const f = (x: number) => x * x; // f' = 2x
      const df = deriv(f);
      expect(df(3)).toBeCloseTo(6, 1); // 2*3 = 6
      expect(df(0)).toBeCloseTo(0, 1); // 2*0 = 0
    });

    test('newtonTransform - Newton transform', () => {
      const f = (x: number) => x * x - 4; // f(x) = x² - 4
      const transform = newtonTransform(f);
      const result = transform(3); // 3 - (3²-4)/(2*3) = 3 - 5/6 = 13/6 ≈ 2.167
      expect(result).toBeCloseTo(2.167, 2);
    });

    test('newtonsMethod - Newton\'s method', () => {
      expect(sqrtNewton(2)).toBeCloseTo(1.414, 3);
      expect(sqrtNewton(9)).toBeCloseTo(3, 3);
    });
  });

  describe('Exercise 1.29: Simpson\'s Rule', () => {
    test('simpsonIntegral - Simpson integration rule', () => {
      const cube = (x: number) => x * x * x;
      expect(simpsonIntegral(cube, 0, 1, 100)).toBeCloseTo(0.25, 4);
      
      const square = (x: number) => x * x;
      expect(simpsonIntegral(square, 0, 1, 100)).toBeCloseTo(1/3, 3);
    });
  });

  describe('Exercise 1.31: Product and π Approximation', () => {
    test('product - generic product', () => {
      expect(product(x => x, 1, x => x + 1, 5)).toBe(120);
      expect(product(x => 2, 1, inc, 3)).toBe(8); // 2*2*2 = 8
    });

    test('piApprox - Wallis product for π', () => {
      expect(piApprox(10)).toBeCloseTo(3.14, 1);
      expect(piApprox(100)).toBeCloseTo(3.14, 2);
    });
  });

  describe('Exercise 1.32-1.33: Accumulation', () => {
    test('accumulate - recursive accumulation', () => {
      const sum = (a: number, b: number) => a + b;
      expect(accumulate(sum, 0, x => x, 1, inc, 5)).toBe(15);
      
      const product = (a: number, b: number) => a * b;
      expect(accumulate(product, 1, x => x, 1, inc, 4)).toBe(24);
    });

    test('filteredAccumulate - filtered accumulation', () => {
      const sum = (a: number, b: number) => a + b;
      expect(filteredAccumulate(sum, 0, (x: number) => x % 2 === 0, (x: number) => x * x, 1, (x: number) => x + 1, 10)).toBe(220);
    });
  });

  describe('Exercise 1.34: Function Application', () => {
    test('f - function composition test', () => {
      expect(f(x => x * 2)).toBe(4); // f(g) = g(2), so 2*2 = 4
      expect(f(x => x + 3)).toBe(5); // f(g) = g(2), so 2+3 = 5
    });
  });

  describe('Exercise 1.35: Golden Ratio', () => {
    test('phi - golden ratio calculation', () => {
      expect(phi(0.0001)).toBeCloseTo(1.618, 3);
      expect(phi(0.00001)).toBeCloseTo(1.618, 4);
    });
  });

  describe('Exercise 1.36: Fixed Point Analysis', () => {
    test('solveXXEquals1000 - x^x = 1000 solution', () => {
      const result = solveXXEquals1000(true);
      expect(verifySolution(result)).toBe(true);
    });

    test('countSteps - iteration counting', () => {
      const withDamping = countSteps(true);
      const withoutDamping = countSteps(false);
      
      expect(withDamping.result).toBeCloseTo(withoutDamping.result, 3);
      expect(withDamping.steps).toBeLessThan(withoutDamping.steps);
    });

test('verifySolution - solution verification', () => {
      expect(verifySolution(4)).toBe(true);
      expect(verifySolution(10)).toBe(false);
    });
  });

  describe('Exercise 1.37: Continued Fractions', () => {
    test('contFracIter - iterative continued fraction', () => {
      const nProc = () => 1.0;
      const dProc = (i: number) => 1.0;
      expect(contFracIter(nProc, dProc, 10)).toBeCloseTo(0.618, 3); // 1/φ
    });

    test('contFrac - recursive continued fraction', () => {
      const nProc = () => 1.0;
      const dProc = (i: number) => 1.0;
      expect(contFrac(nProc, dProc, 10)).toBeCloseTo(0.618, 3);
    });
  });

  describe('Exercise 1.38: e - 2 approximation', () => {
    test('eMinus2 - Euler e-2 approximation', () => {
      expect(eMinus2(10)).toBeCloseTo(0.718, 2);
      expect(eMinus2(20)).toBeCloseTo(0.718, 3);
    });
  });

  describe('Exercise 1.42: Function Composition', () => {
    test('compose - function composition', () => {
      const square = (x: number) => x * x;
      const inc = (x: number) => x + 1;
      
      const composed = compose(square, inc);
      expect(composed(3)).toBe(16); // square(inc(3)) = square(4) = 16
    });
  });

  describe('Exercise 1.43: Repeated Function Application', () => {
    test('repeated - repeated function application', () => {
      const square = (x: number) => x * x;
      expect(repeated(square, 2)(5)).toBe(625); // square(square(5)) = square(25) = 625
      
      const inc = (x: number) => x + 1;
      expect(repeated(inc, 3)(5)).toBe(8); // inc(inc(inc(5))) = 8
    });
  });

  describe('Exercise 1.44: Function Smoothing', () => {
    test('smooth - function smoothing', () => {
      const f = (x: number) => x * x;
      const smoothed = smooth(f, 0.01);
      
      expect(smoothed(2)).toBeCloseTo(4, 1);
      expect(smoothed(3)).toBeCloseTo(9, 1);
    });
  });

  describe('Exercise 1.45: Nth Root', () => {
    test('nthRoot - generalized root finding', () => {
      expect(nthRoot(16, 4)).toBeCloseTo(2, 2); // 4th root of 16 is 2
      expect(nthRoot(27, 3)).toBeCloseTo(3, 2); // cube root of 27 is 3
      expect(nthRoot(32, 5)).toBeCloseTo(2, 2); // 5th root of 32 is 2
    });
  });
});
