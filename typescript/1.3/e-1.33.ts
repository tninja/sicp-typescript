import { isPrime, gcd } from '../1.2/1.2';

// Exercise 1.33. Filtered-accumulate.

export const filteredAccumulate = <T>(
    combiner: (a: T, b: T) => T,
    nullValue: T,
    filter: (x: number) => boolean,
    term: (x: number) => T,
    a: number,
    next: (x: number) => number,
    b: number
): T => {
    if (a > b) {
        return nullValue;
    }
    const current = filter(a) ? term(a) : nullValue;
    return combiner(current, filteredAccumulate(combiner, nullValue, filter, term, next(a), next, b));
};

export const sumPrimeSquares = (a: number, b: number) => 
    filteredAccumulate((x, y) => x + y, 0, isPrime, (x) => x * x, a, (x) => x + 1, b);

export const productRelativePrimes = (n: number) => 
    filteredAccumulate((x, y) => x * y, 1, (x) => gcd(x, n) === 1, (x) => x, 1, (x) => x + 1, n);
