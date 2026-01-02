import { isEven, double, halve } from '../common';

// Exercise 1.18. Fast multiplication (iterative).

export const fastMultIter = (a: number, b: number, product: number): number => {
    if (b === 0) return product;
    if (isEven(b)) {
        return fastMultIter(double(a), halve(b), product);
    } else {
        return fastMultIter(a, b - 1, product + a);
    }
};

export const mult = (a: number, b: number): number => {
    return fastMultIter(a, b, 0);
};
