import { isEven, square } from '../common';

// Exercise 1.16. Iterative fast exponentiation.

export const fastExptIter = (b: number, n: number, product: number): number => {
    if (n === 0) return product;
    if (isEven(n)) {
        return fastExptIter(square(b), n / 2, product);
    } else {
        return fastExptIter(b, n - 1, product * b);
    }
};

export const expt = (b: number, n: number): number => {
    return fastExptIter(b, n, 1);
};
