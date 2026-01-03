import { average, square } from '../common';

// TypeScript implementation of SICP Section 1.1 - The Elements of Programming
// Original Scheme code is included as comments for reference

// Three implementations of absolute value from SICP 1.1.6
// First version using cond with three clauses
  // Scheme: (define (abs x)
  //          (cond ((> x 0) x)
  //                ((= x 0) 0)
  //                ((< x 0) (- x))))
export const absCond1 = (x: number): number => {
    if (x > 0) return x;
    if (x === 0) return 0;
    return -x;
};

// Second version using cond with two clauses
  // Scheme: (define (abs x)
  //          (cond ((< x 0) (- x))
  //                (else x)))
export const absCond2 = (x: number): number => {
    if (x < 0) return -x;
    return x;
};

// Third version using if (the preferred implementation)
  // Scheme: (define (abs x)
  //          (if (< x 0)
  //              (- x)
  //              x))
export const abs = (x: number): number => {
    if (x < 0) {
        return -x;
    }
    return x;
};

  // Scheme: (define (>= x y)
  //          (or (> x y) (= x y)))
export const gte = (x: number, y: number): boolean => {
    return x >= y;
};

// Newton square roots finder by iterative guessing
  // Scheme: (define (square-iter guess x)
  //          (if (good-enough? guess x)
  //              guess
  //              (square-iter (improve guess x) x)))
export const squareIter = (guess: number, x: number): number => {
    if (isGoodEnough(guess, x)) {
        return guess;
    }
    return squareIter(improve(guess, x), x);
};

  // Scheme: (define (improve guess x)
  //          (average guess (/ x guess)))
export const improve = (guess: number, x: number): number => {
    return average(guess, x / guess);
};

  // Scheme: (define (good-enough? guess x)
  //          (< (abs (- (square guess) x)) 0.001))
export const isGoodEnough = (guess: number, x: number): boolean => {
    return Math.abs(square(guess) - x) < 0.001;
};

  // Scheme: (define (sqrt x)
  //          (square-iter 1.0 x))
export const sqrt = (x: number): number => {
    return squareIter(1.0, x);
};
