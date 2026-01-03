import { average, square, cube, isCloseEnough } from '../common';

// TypeScript implementation of SICP Section 1.3 - Formulating Abstractions with Higher-Order Procedures
// Original Scheme code is included as comments for reference

// Generic sum procedure
// Scheme: (define (sum term a next b)
//          (if (> a b)
//              0
//              (+ (term a)
//                 (sum term (next a) next b))))
export const sum = (term: (x: number) => number, a: number, next: (x: number) => number, b: number): number => {
    if (a > b) {
        return 0;
    }
    return term(a) + sum(term, next(a), next, b);
};

// Scheme: (define (inc n) (+ n 1))
export const inc = (n: number) => n + 1;

// Scheme: (define (sum-cubes a b)
//          (sum cube a inc b))
export const sumCubes = (a: number, b: number) => sum(cube, a, inc, b);

// Scheme: (define (identity a) a)
export const identity = (x: number) => x;

// Scheme: (define (sum-integers a b)
//          (sum identity a inc b))
export const sumIntegers = (a: number, b: number) => sum(identity, a, inc, b);

// Scheme: (define (pi-term x)
//          (/ 1.0 (* x (+ x 2))))
// Scheme: (define (next-pi-sum x)
//          (+ x 4))
// Scheme: (define (pi-sum a b)
//          (sum pi-term a next-pi-sum b))
export const piSum = (a: number, b: number): number => {
    const piTerm = (x: number) => 1.0 / (x * (x + 2));
    const piNext = (x: number) => x + 4;
    return sum(piTerm, a, piNext, b);
};

// Scheme: (define (integral f a b dx)
//          (define (add-dx x) (+ x dx))
//          (* (sum f (+ a (/ dx 2.0)) add-dx b) dx))
export const integral = (f: (x: number) => number, a: number, b: number, dx: number): number => {
    const addDx = (x: number) => x + dx;
    return sum(f, a + dx / 2.0, addDx, b) * dx;
};

// Half-interval method (bisection method)
// Scheme: (define (search f neg-point pos-point delta)
//          (let ((midpoint (average neg-point pos-point)))
//            (if (close-enough? neg-point pos-point delta)
//                midpoint
//                (let ((test-value (f midpoint)))
//                  (cond ((positive? test-value)
//                         (search f neg-point midpoint delta))
//                        ((negative? test-value)
//                         (search f midpoint pos-point delta))
//                        (else midpoint))))))
export const search = (f: (x: number) => number, negPoint: number, posPoint: number, delta: number): number => {
    const midpoint = average(negPoint, posPoint);
    if (isCloseEnough(negPoint, posPoint, delta)) {
        return midpoint;
    }
    const testValue = f(midpoint);
    if (testValue > 0) {
        return search(f, negPoint, midpoint, delta);
    } else if (testValue < 0) {
        return search(f, midpoint, posPoint, delta);
    } else {
        return midpoint;
    }
};

// Scheme: (define (bisection-method f a b)
//          (let ((a-val (f a))
//                (b-val (f b))
//                (delta 0.001))
//            (cond ((and (negative? a-val) (positive? b-val))
//                   (search f a b delta))
//                  ((and (negative? b-val) (positive? a-val))
//                   (search f b a delta))
//                  (else (error "Values are not of the opposite sign")))))
export const bisectionMethod = (f: (x: number) => number, a: number, b: number): number => {
    const aVal = f(a);
    const bVal = f(b);
    const delta = 0.001;
    if (aVal < 0 && bVal > 0) {
        return search(f, a, b, delta);
    } else if (bVal < 0 && aVal > 0) {
        return search(f, b, a, delta);
    } else {
        throw new Error("Values are not of the opposite sign");
    }
};

// Fixed point
// Scheme: (define (fixed-point f first-guess delta)
//          (define (try guess)
//            (let ((next (f guess)))
//              (if (close-enough? guess next delta)
//                  next
//                  (try next))))
//          (try first-guess))
export const fixedPoint = (f: (x: number) => number, firstGuess: number, delta: number): number => {
    const isClose = (v1: number, v2: number) => Math.abs(v1 - v2) < delta;
    const tryGuess = (guess: number): number => {
        const next = f(guess);
        if (isClose(guess, next)) {
            return next;
        }
        return tryGuess(next);
    };
    return tryGuess(firstGuess);
};

// Scheme: (define (average-dump f)
//          (lambda (x) (average x (f x))))
export const averageDamp = (f: (x: number) => number) => (x: number) => average(x, f(x));

// Scheme: (define (sqrt x)
//          (fixed-point (average-dump (lambda (y) (/ x y))) 1.0 0.001))
export const sqrt = (x: number) => fixedPoint(averageDamp((y: number) => x / y), 1.0, 0.001);

// Scheme: (define (cube-root x)
//          (fixed-point (average-dump (lambda (y) (/ x (square y))))
//                       1.0
//                       0.001))
export const cubeRoot = (x: number) => fixedPoint(averageDamp((y: number) => x / square(y)), 1.0, 0.001);

// Newton's method
const dx = 0.0001;
// Scheme: (define (deriv g)
//          (lambda (x)
//            (/ (- (g (+ x dx)) (g x))
//               dx)))
export const deriv = (g: (x: number) => number) => (x: number) => (g(x + dx) - g(x)) / dx;

// Scheme: (define (newton-transform g)
//          (lambda (x) (- x (/ (g x) ((deriv g) x)))))
export const newtonTransform = (g: (x: number) => number) => (x: number) => x - g(x) / deriv(g)(x);

// Scheme: (define (newtons-method g guess)
//          (fixed-point (newton-transform g) guess 0.0001))
export const newtonsMethod = (g: (x: number) => number, guess: number) => 
    fixedPoint(newtonTransform(g), guess, 0.0001);

// Scheme: (define (sqrt x)
//          (newtons-method (lambda (y) (- (square y) x)) 1.0))
export const sqrtNewton = (x: number) => newtonsMethod((y: number) => square(y) - x, 1.0);
