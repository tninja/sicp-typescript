import { gcd, cons } from './2.1';

// Exercise 2.1. Improved make-rat.

export const makeRat = (n: number, d: number) => {
    const g = Math.abs(gcd(n, d));
    if (d < 0) {
        return cons(-n / g, -d / g);
    }
    return cons(n / g, d / g);
};
