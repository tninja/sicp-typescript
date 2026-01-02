import { Pair } from './3.3';

// Exercise 3.17. count-pairs.

export const countPairs = (x: any): number => {
    const visited = new Set<Pair>();
    const count = (x: any): number => {
        if (!(x instanceof Pair) || visited.has(x)) {
            return 0;
        }
        visited.add(x);
        return 1 + count(x.car) + count(x.cdr);
    };
    return count(x);
};
