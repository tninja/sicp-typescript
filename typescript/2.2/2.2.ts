import { isEven, isOdd, square } from '../common';
import { fib } from '../1.2/1.2';

// TypeScript implementation of SICP Section 2.2 - Hierarchical Data and the Closure Property
// Original Scheme code is included as comments for reference

// List operations (using Arrays)
// Scheme: (define (list-ref items n)
//          (if (= n 0)
//              (car items)
//              (list-ref (cdr items) (- n 1))))
export const listRef = <T>(items: T[], n: number): T => items[n];

// Scheme recursive version: (define (length items)
//                           (if (null? items)
//                               0
//                               (+ 1 (length (cdr items)))))
// Scheme iterative version: (define (length items)
//                           (define (iter-length items count)
//                             (if (null? items)
//                                 count
//                                 (iter-length (cdr items) (+ count 1))))
//                           (iter-length items 0))
export const length = <T>(items: T[]): number => items.length;

// Scheme: (define (append list1 list2)
//          (if (null? list1)
//              list2
//              (cons (car list1) (append (cdr list1) list2))))
export const append = <T>(list1: T[], list2: T[]): T[] => [...list1, ...list2];

// Scheme: (define (map proc items)
//          (if (null? items)
//              nil
//              (cons (proc (car items)) (map proc (cdr items)))))
export const map = <T, U>(proc: (x: T) => U, items: T[]): U[] => items.map(proc);

// TypeScript built-in equivalent of applying procedure to each element
export const forEach = <T>(proc: (x: T) => void, items: T[]): void => items.forEach(proc);

// Tree operations
export type Tree = any | Tree[];

// Scheme: (define (count-leaves tree)
//          (cond ((null? tree) 0)
//                ((not (pair? tree)) 1)
//                (else (+ (count-leaves (car tree))
//                         (count-leaves (cdr tree))))))

export const countLeaves = (tree: Tree): number => {
    if (tree === null || (Array.isArray(tree) && tree.length === 0)) {
        return 0;
    }
    if (!Array.isArray(tree)) {
        return 1;
    }
    return tree.reduce((acc, curr) => acc + countLeaves(curr), 0);
};

// Deep reverse - TypeScript implementation of reversing nested lists
// Scheme: (define (deep-reverse items)
//          (cond ((null? items) nil)
//                ((not (pair? items)) items)
//                (else (append (deep-reverse (cdr items)) (list (deep-reverse (car items)))))))
export const deepReverse = (items: any[]): any[] => {
    if (!Array.isArray(items)) {
        return items;
    }
    return [...items].reverse().map(x => Array.isArray(x) ? deepReverse(x) : x);
};

// Subsets - TypeScript implementation of generating all subsets of a set
// Scheme: (define (subsets s)
//          (if (null? s)
//              (list nil)
//              (let ((rest (subsets (cdr s))))
//                (append rest (map (lambda (x) (cons (car s) x)) rest)))))
export const subsets = (s: any[]): any[][] => {
    if (s.length === 0) {
        return [[]];
    }
    const rest = subsets(s.slice(1));
    return [...rest, ...rest.map(x => [s[0], ...x])];
};

// Conventional Interfaces
// Scheme: (define (filter predicate sequence)
//          (cond ((null? sequence) nil)
//                ((predicate (car sequence))
//                 (cons (car sequence) (filter predicate (cdr sequence))))
//                (else (filter predicate (cdr sequence)))))
export const filter = <T>(predicate: (x: T) => boolean, sequence: T[]): T[] => sequence.filter(predicate);

// Scheme: (define (accumulate op initial sequence)
//          (if (null? sequence)
//              initial
//              (op (car sequence) (accumulate op initial (cdr sequence)))))
export const accumulate = <T, U>(op: (acc: U, curr: T) => U, initial: U, sequence: T[]): U => 
    sequence.reduce(op, initial);

// Scheme: (define (enumerate-interval low high)
//          (if (> low high)
//              nil
//              (cons low (enumerate-interval (+ low 1) high))))
export const enumerateInterval = (low: number, high: number): number[] => {
    const res = [];
    for (let i = low; i <= high; i++) {
        res.push(i);
    }
    return res;
};

// Scheme: (define (enumerate-leaves tree)
//          (cond ((null? tree) nil)
//                ((not (pair? tree)) (list tree))
//                (else (append (enumerate-leaves (car tree))
//                              (enumerate-leaves (cdr tree))))))
export const enumerateLeaves = (tree: Tree): any[] => {
    if (tree === null || (Array.isArray(tree) && tree.length === 0)) {
        return [];
    }
    if (!Array.isArray(tree)) {
        return [tree];
    }
    return tree.reduce((acc, curr) => [...acc, ...enumerateLeaves(curr)], []);
};

// Scheme: (define (sum-odd-squares tree)
//          (accumulate + 0 (map square (filter odd? (enumerate-leaves tree)))))
export const sumOddSquares = (tree: Tree): number => {
    return accumulate((acc, curr) => acc + curr, 0, 
        map(square, filter(isOdd, enumerateLeaves(tree))));
};

// Scheme: (define (even-fib n)
//          (accumulate cons nil (filter even? (map fib (enumerate-interval 0 n)))))
export const evenFibs = (n: number): number[] => {
    return filter(isEven, map(fib, enumerateInterval(0, n)));
};

// Scheme: (define (flatmap proc seq)
//          (accumulate append nil (map proc seq)))
export const flatMap = <T, U>(proc: (x: T) => U[], seq: T[]): U[] => {
    return accumulate((acc, curr) => [...acc, ...curr], [], map(proc, seq));
};

// Scheme: (define (permutations s)
//          (if (null? s)
//              (list nil)
//              (flatmap (lambda (x)
//                         (map (lambda (p) (cons x p))
//                              (permutations (remove x s))))
//                       s)))
export const permutations = (s: any[]): any[][] => {
    if (s.length === 0) {
        return [[]];
    }
    return flatMap((x) => 
        map((p) => [x, ...p], permutations(s.filter(y => y !== x))), s);
};