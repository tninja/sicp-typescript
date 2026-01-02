import { isEven, isOdd, square } from '../common';
import { fib } from '../1.2/1.2';

// List operations (using Arrays)
export const listRef = <T>(items: T[], n: number): T => items[n];

export const length = <T>(items: T[]): number => items.length;

export const append = <T>(list1: T[], list2: T[]): T[] => [...list1, ...list2];

export const map = <T, U>(proc: (x: T) => U, items: T[]): U[] => items.map(proc);

export const forEach = <T>(proc: (x: T) => void, items: T[]): void => items.forEach(proc);

// Tree operations
export type Tree = any | Tree[];

export const countLeaves = (tree: Tree): number => {
    if (tree === null || (Array.isArray(tree) && tree.length === 0)) {
        return 0;
    }
    if (!Array.isArray(tree)) {
        return 1;
    }
    return tree.reduce((acc, curr) => acc + countLeaves(curr), 0);
};

// Deep reverse
export const deepReverse = (items: any[]): any[] => {
    if (!Array.isArray(items)) {
        return items;
    }
    return [...items].reverse().map(x => Array.isArray(x) ? deepReverse(x) : x);
};

// Subsets
export const subsets = (s: any[]): any[][] => {
    if (s.length === 0) {
        return [[]];
    }
    const rest = subsets(s.slice(1));
    return [...rest, ...rest.map(x => [s[0], ...x])];
};

// Conventional Interfaces
export const filter = <T>(predicate: (x: T) => boolean, sequence: T[]): T[] => sequence.filter(predicate);

export const accumulate = <T, U>(op: (acc: U, curr: T) => U, initial: U, sequence: T[]): U => 
    sequence.reduce(op, initial);

export const enumerateInterval = (low: number, high: number): number[] => {
    const res = [];
    for (let i = low; i <= high; i++) {
        res.push(i);
    }
    return res;
};

export const enumerateLeaves = (tree: Tree): any[] => {
    if (tree === null || (Array.isArray(tree) && tree.length === 0)) {
        return [];
    }
    if (!Array.isArray(tree)) {
        return [tree];
    }
    return tree.reduce((acc, curr) => [...acc, ...enumerateLeaves(curr)], []);
};

export const sumOddSquares = (tree: Tree): number => {
    return accumulate((acc, curr) => acc + curr, 0, 
        map(square, filter(isOdd, enumerateLeaves(tree))));
};

export const evenFibs = (n: number): number[] => {
    return filter(isEven, map(fib, enumerateInterval(0, n)));
};

export const flatMap = <T, U>(proc: (x: T) => U[], seq: T[]): U[] => {
    return accumulate((acc, curr) => [...acc, ...curr], [], map(proc, seq));
};

export const permutations = (s: any[]): any[][] => {
    if (s.length === 0) {
        return [[]];
    }
    return flatMap((x) => 
        map((p) => [x, ...p], permutations(s.filter(y => y !== x))), s);
};