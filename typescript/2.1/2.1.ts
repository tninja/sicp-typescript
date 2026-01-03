import { gcd, average } from '../common';

// SICP Section 2.1: Building Abstractions with Data
// Original Scheme code from scheme/2.1/2.1.scm

// Pair implementation
export type Pair<T, U> = [T, U];

// Pair implementation using tuples (simplified)
// Original Scheme code for functional pair implementation:
// (define (cons x y)
//   (lambda (z)
//     (cond ((= z 1) x)
//           ((= z 2) y))))
// (define (car p) (p 1))
// (define (cdr p) (p 2))
export const cons = <T, U>(x: T, y: U): Pair<T, U> => [x, y];
// car selector for pairs
// Original Scheme code: (define (car p) (p 1))
export const car = <T, U>(p: Pair<T, U>): T => p[0];

// cdr selector for pairs  
// Original Scheme code: (define (cdr p) (p 2))
export const cdr = <T, U>(p: Pair<T, U>): U => p[1];

// Rational numbers
export type Rational = Pair<number, number>;

// Make rational number with normalization
// Original Scheme code:
// (define (make-rat n d)
//   (let ((g (gcd n d)))
//     (cons (/ n g) (/ d g))))
export const makeRat = (n: number, d: number): Rational => {
    const g = gcd(n, d);
    return cons(n / g, d / g);
};

// Numerator selector for rational numbers
// Original Scheme code: (define (numer x) (car x))
export const numer = (x: Rational) => car(x);

// Denominator selector for rational numbers
// Original Scheme code: (define (denom x) (cdr x))
export const denom = (x: Rational) => cdr(x);

// Add two rational numbers
// Original Scheme code:
// (define (add-rat x y)
//   (make-rat (+ (* (numer x) (denom y))
//                (* (numer y) (denom x)))
//             (* (denom x) (denom y))))
export const addRat = (x: Rational, y: Rational): Rational => {
    return makeRat(
        numer(x) * denom(y) + numer(y) * denom(x),
        denom(x) * denom(y)
    );
};

// Subtract two rational numbers
// Original Scheme code:
// (define (sub-rat x y)
//   (make-rat (- (* (numer x) (denom y))
//                (* (numer y) (denom x)))
//             (* (denom x) (denom y))))
export const subRat = (x: Rational, y: Rational): Rational => {
    return makeRat(
        numer(x) * denom(y) - numer(y) * denom(x),
        denom(x) * denom(y)
    );
};

// Multiply two rational numbers
// Original Scheme code:
// (define (mul-rat x y)
//   (make-rat (* (numer x) (numer y))
//             (* (denom x) (denom y))))
export const mulRat = (x: Rational, y: Rational): Rational => {
    return makeRat(
        numer(x) * numer(y),
        denom(x) * denom(y)
    );
};

// Check if two rational numbers are equal
// Original Scheme code:
// (define (equal-rat? x y)
//   (= (* (numer x) (denom y))
//      (* (numer y) (denom x))))
export const equalRat = (x: Rational, y: Rational): boolean => {
    return numer(x) * denom(y) === numer(y) * denom(x);
};

// Print rational number representation
// Original Scheme code:
// (define (print-rat x)
//   (display (numer x))
//   (display "/")
//   (display (denom x))
//   (newline))
export const printRat = (x: Rational) => {
    console.log(`${numer(x)}/${denom(x)}`);
};

// Interval arithmetic
export type Interval = Pair<number, number>;

// Create interval from lower and upper bounds
// Original Scheme concept: interval as pair (lower-bound . upper-bound)
export const makeInterval = (a: number, b: number): Interval => cons(a, b);

// Lower bound selector for intervals
export const lowerBound = (i: Interval) => car(i);

// Upper bound selector for intervals  
export const upperBound = (i: Interval) => cdr(i);

// Add two intervals
// Original Scheme code:
// (define (add-interval x y)
//   (make-interval 
//     (+ (lower-bound x) (lower-bound y))
//     (+ (upper-bound x) (upper-bound y))))
export const addInterval = (x: Interval, y: Interval): Interval => {
    return makeInterval(
        lowerBound(x) + lowerBound(y),
        upperBound(x) + upperBound(y)
    );
};

// Multiply two intervals (all combinations of bounds)
// Original Scheme code:
// (define (mul-interval x y)
//   (let 
//     ((p1 (* (lower-bound x) (lower-bound y)))
//      (p2 (* (lower-bound x) (upper-bound y)))
//      (p3 (* (upper-bound x) (lower-bound y)))
//      (p4 (* (upper-bound x) (upper-bound y))))
//     (make-interval 
//       (min p1 p2 p3 p4)
//       (max p1 p2 p3 p4))))
export const mulInterval = (x: Interval, y: Interval): Interval => {
    const p1 = lowerBound(x) * lowerBound(y);
    const p2 = lowerBound(x) * upperBound(y);
    const p3 = upperBound(x) * lowerBound(y);
    const p4 = upperBound(x) * upperBound(y);
    return makeInterval(
        Math.min(p1, p2, p3, p4),
        Math.max(p1, p2, p3, p4)
    );
};

// Divide interval x by interval y
// Original Scheme code:
// (define (div-interval x y)
//   (mul-interval
//     x
//     (make-interval (/ 1.0 (lower-bound y))
//                    (/ 1.0 (upper-bound y)))))
export const divInterval = (x: Interval, y: Interval): Interval => {
    if (lowerBound(y) * upperBound(y) <= 0) {
        throw new Error("Division by interval spanning zero");
    }
    return mulInterval(
        x,
        makeInterval(1.0 / upperBound(y), 1.0 / lowerBound(y))
    );
};

// Create interval from center and width (c ± w representation)
// Original Scheme code:
// (define (make-center-width c w)
//   (make-interval (- c w) (+ c w)))
export const makeCenterWidth = (c: number, w: number): Interval => {
    return makeInterval(c - w, c + w);
};

// Get center of interval
// Original Scheme code:
// (define (center i)
//   (average (upper-bound i) (lower-bound i)))
export const center = (i: Interval) => average(upperBound(i), lowerBound(i));

// Get width of interval  
// Original Scheme code:
// (define (width i)
//   (/ (- (upper-bound i) (lower-bound i)) 2))
export const width = (i: Interval) => (upperBound(i) - lowerBound(i)) / 2;

// Alternative implementation of cons/car/cdr using functions only
// This demonstrates that pairs can be implemented without data structures,
// using only procedures (functions).

// Functional implementation of cons (using only procedures)
// Original Scheme code:
// (define (cons x y)
//   (lambda (z)
//     (cond ((= z 1) x)
//           ((= z 2) y))))
export const consFunctional = <T, U>(x: T, y: U): ((z: number) => T | U) => {
    return (z: number) => {
        if (z === 1) return x;
        if (z === 2) return y;
        throw new Error(`Invalid selector: ${z}`);
    };
};

// Functional implementation of car
// Original Scheme code: (define (car p) (p 1))
export const carFunctional = <T, U>(p: (z: number) => T | U): T => {
    return p(1) as T;
};

// Functional implementation of cdr
// Original Scheme code: (define (cdr p) (p 2))
export const cdrFunctional = <T, U>(p: (z: number) => T | U): U => {
    return p(2) as U;
};

// Alternative rational number implementation with normalization in selectors
// instead of in the constructor

// Alternative rational number constructor (no normalization)
// Original Scheme code for lazy normalization:
// (define (make-rat n d)
//   (cons n d))
export const makeRatLazy = (n: number, d: number): Rational => {
    // No normalization here - store raw values
    return cons(n, d);
};

// Numerator selector with lazy normalization
// Original Scheme code:
// (define (numer x)
//   (let ((g (gcd (car x) (cdr x))))
//     (/ (car x) g)))
export const numerLazy = (x: Rational): number => {
    const g = gcd(car(x), cdr(x));
    return car(x) / g;
};

// Denominator selector with lazy normalization
// Original Scheme code:
// (define (denom x)
//   (let ((g (gcd (car x) (cdr x))))
//     (/ (cdr x) g)))
export const denomLazy = (x: Rational): number => {
    const g = gcd(car(x), cdr(x));
    return cdr(x) / g;
};

// This approach is more efficient if we create rational numbers more often
// than we select their components, since we avoid computing gcd on creation.
