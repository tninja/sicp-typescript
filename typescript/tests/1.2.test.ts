import { describe, test, expect } from 'vitest';
import { 
  factorialRecursive, 
  factIter, 
  factorial, 
  fibTree, 
  fibIter, 
  fib, 
  countChange, 
  cc, 
  firstDenomination,
  exptRecursive,
  exptIter,
  expt,
  fastExpt,
  divides,
  smallestDivisor,
  findDivisor,
  isPrime,
  expmod,
  fermatTest,
  fastPrime
} from '../1.2/1.2';
import { A, f as f10, g, h } from '../1.2/e-1.10';
import { fRecursive, f } from '../1.2/e-1.11';
import { ex1_2 } from '../1.1/e-1.2';
import { pascal } from '../1.2/e-1.12';
import { sine } from '../1.2/e-1.15';
import { mult } from '../1.2/e-1.18';
import { fib as fibLogN } from '../1.2/e-1.19';
import { timedPrimeTest, findThreePrimes } from '../1.2/e-1.22';
import { next, isPrimeOptimized } from '../1.2/e-1.23';
import { countChangeWithStats } from '../1.2/e-1.14';
import { p } from '../1.2/e-1.15';
import { testCarmichaelNumber, testCarmichaelNumberOptimized } from '../1.2/e-1.27';

describe('Chapter 1.2: Procedures and Processes', () => {
  describe('Factorial Functions', () => {
    test('factorialRecursive - recursive implementation', () => {
      expect(factorialRecursive(1)).toBe(1);
      expect(factorialRecursive(5)).toBe(120);
      expect(factorialRecursive(0)).toBe(undefined);
    });

    test('factIter - iterative helper', () => {
      expect(factIter(24, 4, 5)).toBe(120);
      expect(factIter(6, 3, 3)).toBe(6);
    });

    test('factorial - main iterative implementation', () => {
      expect(factorial(5)).toBe(120);
      expect(factorial(1)).toBe(1);
      expect(factorial(3)).toBe(6);
    });
  });

  describe('Fibonacci Functions', () => {
    test('fibTree - tree recursive implementation', () => {
      expect(fibTree(0)).toBe(0);
      expect(fibTree(1)).toBe(1);
      expect(fibTree(2)).toBe(1);
      expect(fibTree(3)).toBe(2);
      expect(fibTree(6)).toBe(8);
    });

    test('fibIter - iterative helper', () => {
      expect(fibIter(0, 1, 6)).toBe(8);
      expect(fibIter(0, 1, 3)).toBe(2);
    });

    test('fib - main iterative implementation', () => {
      expect(fib(6)).toBe(8);
      expect(fib(0)).toBe(0);
      expect(fib(1)).toBe(1);
      expect(fib(10)).toBe(55);
    });
  });

  describe('Count Change', () => {
    test('countChange - main function', () => {
      expect(countChange(0)).toBe(1);
      expect(countChange(100)).toBe(292);
      expect(countChange(11)).toBe(4);
    });

    test('cc - helper function', () => {
      expect(cc(11, 1)).toBe(1);
      expect(cc(11, 2)).toBe(1);
    });

    test('firstDenomination - coin values', () => {
      expect(firstDenomination(1)).toBe(1);
      expect(firstDenomination(2)).toBe(5);
      expect(firstDenomination(3)).toBe(10);
      expect(firstDenomination(4)).toBe(25);
      expect(firstDenomination(5)).toBe(50);
      expect(firstDenomination(0)).toBe(0);
    });
  });

  describe('Exponentiation', () => {
    test('exptRecursive - linear recursive', () => {
      expect(exptRecursive(2, 3)).toBe(8);
      expect(exptRecursive(5, 0)).toBe(1);
      expect(exptRecursive(3, 4)).toBe(81);
    });

    test('exptIter - iterative helper', () => {
      expect(exptIter(2, 3, 1)).toBe(8);
      expect(exptIter(5, 0, 1)).toBe(1);
    });

    test('expt - main iterative implementation', () => {
      expect(expt(2, 10)).toBe(1024);
      expect(expt(3, 3)).toBe(27);
      expect(expt(5, 1)).toBe(5);
    });

    test('fastExpt - logarithmic implementation', () => {
      expect(fastExpt(2, 10)).toBe(1024);
      expect(fastExpt(3, 4)).toBe(81);
      expect(fastExpt(5, 0)).toBe(1);
    });
  });

  describe('Prime Testing', () => {
    test('divides - helper function', () => {
      expect(divides(2, 4)).toBe(true);
      expect(divides(3, 6)).toBe(true);
      expect(divides(3, 7)).toBe(false);
    });

    test('smallestDivisor - prime factor finder', () => {
      expect(smallestDivisor(7)).toBe(7);
      expect(smallestDivisor(9)).toBe(3);
      expect(smallestDivisor(13)).toBe(13);
      expect(smallestDivisor(15)).toBe(3);
    });

    test('findDivisor - divisor search helper', () => {
      expect(findDivisor(7, 2)).toBe(7);
      expect(findDivisor(9, 2)).toBe(3);
    });

    test('isPrime - primality test', () => {
      expect(isPrime(2)).toBe(true);
      expect(isPrime(3)).toBe(true);
      expect(isPrime(5)).toBe(true);
      expect(isPrime(7)).toBe(true);
      expect(isPrime(9)).toBe(false);
      expect(isPrime(10)).toBe(false);
    });

    test('expmod - modular exponentiation', () => {
      expect(expmod(2, 10, 7)).toBe(2);
      expect(expmod(3, 4, 5)).toBe(1);
    });

    test('fermatTest - probabilistic primality test', () => {
      expect(typeof fermatTest(7)).toBe('boolean');
      expect(typeof fermatTest(10)).toBe('boolean');
    });

    test('fastPrime - multiple fermat tests', () => {
      expect(fastPrime(7, 3)).toBe(true);
      expect(fastPrime(10, 3)).toBe(false);
    });
  });

  describe('Exercise 1.10: Ackermann Function', () => {
    test('A - Ackermann function', () => {
      expect(A(1, 10)).toBe(1024);
      expect(A(2, 4)).toBe(65536);
      expect(A(0, 5)).toBe(10);
    });

    test('f - 2n function', () => {
      expect(f10(5)).toBe(10);
      expect(f10(0)).toBe(0);
    });

    test('g - 2^n function', () => {
      expect(g(3)).toBe(8);
      expect(g(4)).toBe(16);
    });

    test('h - tetration function', () => {
      expect(h(1)).toBe(2);
      expect(h(2)).toBe(4);
    });
  });

  describe('Exercise 1.11: Recursive Function', () => {
    test('fRecursive - tree recursive implementation', () => {
      expect(fRecursive(0)).toBe(0);
      expect(fRecursive(1)).toBe(1);
      expect(fRecursive(2)).toBe(2);
      expect(fRecursive(3)).toBe(4);
      expect(fRecursive(4)).toBe(11);
    });

    test('f - iterative implementation', () => {
      expect(f(0)).toBe(0);
      expect(f(1)).toBe(1);
      expect(f(2)).toBe(2);
      expect(f(3)).toBe(4);
      expect(f(4)).toBe(11);
    });
  });

  describe('Exercise 1.12: Pascal Triangle', () => {
    test('pascal - binomial coefficients', () => {
      expect(pascal(5, 3)).toBe(6);
      expect(pascal(4, 2)).toBe(3);
      expect(pascal(0, 0)).toBe(1);
    });
  });

  describe('Exercise 1.14: Count Change with Statistics', () => {
    test('countChangeWithStats - tracks recursive calls', () => {
      const result = countChangeWithStats(11);
      expect(result.ways).toBe(4);
      expect(result.calls).toBeGreaterThan(0);
    });
  });

  describe('Exercise 1.15: Sine Function', () => {
    test('sine - trigonometric computation', () => {
      expect(sine(1.57)).toBeCloseTo(1.0, 2);
      expect(sine(0.1)).toBeCloseTo(0.1, 3);
    });
  });

  describe('Exercise 1.18: Multiplication', () => {
    test('mult - recursive multiplication', () => {
      expect(mult(7, 8)).toBe(56);
      expect(mult(0, 5)).toBe(0);
      expect(mult(5, 0)).toBe(0);
    });
  });

  describe('Exercise 1.19: Logarithmic Fibonacci', () => {
    test('fibLogN - fast fibonacci implementation', () => {
      expect(fibLogN(10)).toBe(55);
      expect(fibLogN(0)).toBe(0);
      expect(fibLogN(1)).toBe(1);
    });
  });

  describe('Exercise 1.22: Prime Timing', () => {
    test('timedPrimeTest - measures prime testing time', () => {
      const time = timedPrimeTest(1009);
      expect(typeof time).toBe('number');
    });

    test('findThreePrimes - finds three consecutive primes', () => {
      const primes = findThreePrimes(1000);
      expect(primes).toHaveLength(3);
      primes.forEach(p => {
        expect(p.prime).toBeGreaterThan(1000);
        expect(p.time).toBeGreaterThan(0);
      });
    });
  });

  describe('Exercise 1.23: Optimized Prime Testing', () => {
    test('next - generates next test divisor', () => {
      expect(next(2)).toBe(3);
      expect(next(3)).toBe(5);
      expect(next(5)).toBe(7);
    });

    test('isPrimeOptimized - optimized primality test', () => {
      expect(isPrimeOptimized(7)).toBe(true);
      expect(isPrimeOptimized(9)).toBe(false);
    });
  });

  describe('Exercise 1.27: Carmichael Numbers', () => {
    test('testCarmichaelNumber - Carmichael detection', () => {
      expect(typeof testCarmichaelNumber(561)).toBe('boolean');
      expect(typeof testCarmichaelNumber(1105)).toBe('boolean');
    });

    test('testCarmichaelNumberOptimized - optimized detection', () => {
      expect(typeof testCarmichaelNumberOptimized(561)).toBe('boolean');
      expect(typeof testCarmichaelNumberOptimized(1105)).toBe('boolean');
    });
  });
});
