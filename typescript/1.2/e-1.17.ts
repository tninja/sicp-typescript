import { isEven, double, halve } from '../common';

// Exercise 1.17. Fast multiplication (recursive).

export const fastMult = (a: number, b: number): number => {
    if (b === 0) return 0;
    if (isEven(b)) {
        return double(fastMult(a, halve(b)));
    } else {
        return a + fastMult(a, b - 1);
    }
};
