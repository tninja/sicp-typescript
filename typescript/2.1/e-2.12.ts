import { makeInterval, center, upperBound, lowerBound } from './2.1';

// Exercise 2.12. Percent tolerance.

export const makeCenterPercent = (c: number, p: number) => {
    const w = c * (p / 100.0);
    return makeInterval(c - w, c + w);
};

export const percent = (i: any) => {
    return ((upperBound(i) - lowerBound(i)) / (2 * center(i))) * 100.0;
};
