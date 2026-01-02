import { Pair, lastPair } from './3.3';

// Exercise 3.12. append!.

export const appendMutable = (x: Pair, y: any) => {
    lastPair(x).cdr = y;
    return x;
};
