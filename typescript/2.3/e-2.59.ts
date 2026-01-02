import { isElementOfSet } from './2.3';

// Exercise 2.59. union-set for unordered lists.

export const unionSet = <T>(set1: T[], set2: T[]): T[] => {
    const res = [...set1];
    set2.forEach(x => {
        if (!isElementOfSet(x, res)) {
            res.push(x);
        }
    });
    return res;
};
