import { Pair, lastPair } from './3.3';

// Exercise 3.13. make-cycle.

export const makeCycle = (x: Pair) => {
    lastPair(x).cdr = x;
    return x;
};
