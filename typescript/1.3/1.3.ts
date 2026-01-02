import { average, square, cube, isCloseEnough } from '../common';

// Generic sum procedure
export const sum = (term: (x: number) => number, a: number, next: (x: number) => number, b: number): number => {
    if (a > b) {
        return 0;
    }
    return term(a) + sum(term, next(a), next, b);
};

export const inc = (n: number) => n + 1;

export const sumCubes = (a: number, b: number) => sum(cube, a, inc, b);

export const identity = (x: number) => x;

export const sumIntegers = (a: number, b: number) => sum(identity, a, inc, b);

export const piSum = (a: number, b: number): number => {
    const piTerm = (x: number) => 1.0 / (x * (x + 2));
    const piNext = (x: number) => x + 4;
    return sum(piTerm, a, piNext, b);
};

export const integral = (f: (x: number) => number, a: number, b: number, dx: number): number => {
    const addDx = (x: number) => x + dx;
    return sum(f, a + dx / 2.0, addDx, b) * dx;
};

// Half-interval method
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

export const averageDamp = (f: (x: number) => number) => (x: number) => average(x, f(x));

export const sqrt = (x: number) => fixedPoint(averageDamp((y: number) => x / y), 1.0, 0.001);

export const cubeRoot = (x: number) => fixedPoint(averageDamp((y: number) => x / square(y)), 1.0, 0.001);

// Newton's method
const dx = 0.0001;
export const deriv = (g: (x: number) => number) => (x: number) => (g(x + dx) - g(x)) / dx;

export const newtonTransform = (g: (x: number) => number) => (x: number) => x - g(x) / deriv(g)(x);

export const newtonsMethod = (g: (x: number) => number, guess: number) => 
    fixedPoint(newtonTransform(g), guess, 0.0001);

export const sqrtNewton = (x: number) => newtonsMethod((y: number) => square(y) - x, 1.0);
