import { compose } from './e-1.42';

// Exercise 1.43. Repeated.

export const repeated = <T>(f: (x: T) => T, n: number): (x: T) => T => {
    if (n === 1) {
        return f;
    }
    return compose(f, repeated(f, n - 1));
};

// Iterative version
export const repeatedIter = <T>(f: (x: T) => T, n: number): (x: T) => T => {
    const iter = (i: number, result: (x: T) => T): (x: T) => T => {
        if (i === n) {
            return result;
        }
        return iter(i + 1, compose(f, result));
    };
    return iter(1, f);
};
