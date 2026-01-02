import { isEven } from '../common';
import { sum } from './1.3';

// Exercise 1.29. Simpson's Rule.

export const simpsonIntegral = (f: (x: number) => number, a: number, b: number, n: number): number => {
    const h = (b - a) / n;
    
    const y = (k: number) => f(a + k * h);
    
    const term = (k: number) => {
        if (k === 0 || k === n) return y(k);
        if (isEven(k)) return 2 * y(k);
        return 4 * y(k);
    };

    // Use sum helper from 1.3 but with indices
    const sumTerms = (k: number): number => {
        if (k > n) return 0;
        return term(k) + sumTerms(k + 1);
    };

    return (h / 3) * sumTerms(0);
};