import { isEven, square, div } from '../common';

// Exercise 1.19. Fibonacci in log(n) steps.

export const fibIter = (a: number, b: number, p: number, q: number, count: number): number => {
    if (count === 0) {
        return b;
    }
    if (isEven(count)) {
        return fibIter(
            a,
            b,
            square(p) + square(q),     // compute p'
            2 * p * q + square(q),     // compute q'
            div(count, 2)
        );
    } else {
        return fibIter(
            b * q + a * q + a * p,
            b * p + a * q,
            p,
            q,
            count - 1
        );
    }
};

export const fib = (n: number): number => {
    return fibIter(1, 0, 0, 1, n);
};
