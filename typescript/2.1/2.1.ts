import { gcd, average } from '../common';

// Pair implementation
export type Pair<T, U> = [T, U];
export const cons = <T, U>(x: T, y: U): Pair<T, U> => [x, y];
export const car = <T, U>(p: Pair<T, U>): T => p[0];
export const cdr = <T, U>(p: Pair<T, U>): U => p[1];

// Rational numbers
export type Rational = Pair<number, number>;

export const makeRat = (n: number, d: number): Rational => {
    const g = gcd(n, d);
    return cons(n / g, d / g);
};

export const numer = (x: Rational) => car(x);
export const denom = (x: Rational) => cdr(x);

export const addRat = (x: Rational, y: Rational): Rational => {
    return makeRat(
        numer(x) * denom(y) + numer(y) * denom(x),
        denom(x) * denom(y)
    );
};

export const subRat = (x: Rational, y: Rational): Rational => {
    return makeRat(
        numer(x) * denom(y) - numer(y) * denom(x),
        denom(x) * denom(y)
    );
};

export const mulRat = (x: Rational, y: Rational): Rational => {
    return makeRat(
        numer(x) * numer(y),
        denom(x) * denom(y)
    );
};

export const equalRat = (x: Rational, y: Rational): boolean => {
    return numer(x) * denom(y) === numer(y) * denom(x);
};

export const printRat = (x: Rational) => {
    console.log(`${numer(x)}/${denom(x)}`);
};

// Interval arithmetic
export type Interval = Pair<number, number>;

export const makeInterval = (a: number, b: number): Interval => cons(a, b);
export const lowerBound = (i: Interval) => car(i);
export const upperBound = (i: Interval) => cdr(i);

export const addInterval = (x: Interval, y: Interval): Interval => {
    return makeInterval(
        lowerBound(x) + lowerBound(y),
        upperBound(x) + upperBound(y)
    );
};

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

export const divInterval = (x: Interval, y: Interval): Interval => {
    if (lowerBound(y) * upperBound(y) <= 0) {
        throw new Error("Division by interval spanning zero");
    }
    return mulInterval(
        x,
        makeInterval(1.0 / upperBound(y), 1.0 / lowerBound(y))
    );
};

export const makeCenterWidth = (c: number, w: number): Interval => {
    return makeInterval(c - w, c + w);
};

export const center = (i: Interval) => average(upperBound(i), lowerBound(i));

export const width = (i: Interval) => (upperBound(i) - lowerBound(i)) / 2;
