import { fastExpt } from '../1.2/1.2';
import { fixedPoint, averageDamp } from './1.3';
import { repeated } from './e-1.43';

// Exercise 1.45. nth-root.

export const nthRoot = (x: number, n: number): number => {
    const damps = Math.floor(Math.log2(n));
    return fixedPoint(
        (repeated(averageDamp, damps))((y: number) => x / fastExpt(y, n - 1)),
        1.0,
        0.001
    );
};
