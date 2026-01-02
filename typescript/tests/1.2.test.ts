import { describe, test, expect } from 'vitest';
import { factorial, fib, isPrime, fastExpt } from '../1.2/1.2';
import { A, f as f10 } from '../1.2/e-1.10';
import { pascal } from '../1.2/e-1.12';
import { sine } from '../1.2/e-1.15';
import { mult } from '../1.2/e-1.18';
import { fib as fibLogN } from '../1.2/e-1.19';

describe('Chapter 1.2: Procedures and Processes', () => {
  test('Factorial and Fib', () => {
    expect(factorial(5)).toBe(120);
    expect(fib(6)).toBe(8);
    expect(fibLogN(10)).toBe(55);
  });

  test('Primes and Powers', () => {
    expect(isPrime(7)).toBe(true);
    expect(isPrime(10)).toBe(false);
    expect(fastExpt(2, 10)).toBe(1024);
  });

  test('Exercises 1.10-1.18', () => {
    expect(A(1, 10)).toBe(1024);
    expect(f10(5)).toBe(10);
    expect(pascal(5, 3)).toBe(6);
    expect(sine(1.57)).toBeCloseTo(1.0, 2);
    expect(mult(7, 8)).toBe(56);
  });
});
