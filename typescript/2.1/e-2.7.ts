// Exercise 2.7: Alyssa's program is incomplete because she has not specified the implementation 
// of the interval abstraction. Here is a definition of the interval constructor:

// Original Scheme code:
// (define (make-interval a b) (cons a b))
// 
// ; Define selectors upper-bound and lower-bound to complete the implementation.

// Note: These are already implemented in 2.1.ts, but we recreate them here
// for the exercise completeness.

import { cons, car, cdr } from './2.1';

// Interval type
export type Interval = [number, number];

// Constructor
export const makeInterval = (a: number, b: number): Interval => {
    return cons(a, b);
};

// Selectors
export const lowerBound = (x: Interval): number => {
    return car(x);
};

export const upperBound = (x: Interval): number => {
    return cdr(x);
};

// Test the implementation
export const testIntervalSelectors = (): void => {
    console.log('Testing interval selectors:');
    
    const r1 = makeInterval(0.15, 0.2);
    const r2 = makeInterval(0.9, 1.1);
    
    console.log(`r1 = [${lowerBound(r1)}, ${upperBound(r1)}]`);
    console.log(`r2 = [${lowerBound(r2)}, ${upperBound(r2)}]`);
    console.log(`lowerBound(r1) = ${lowerBound(r1)}`);
    console.log(`upperBound(r1) = ${upperBound(r1)}`);
    console.log(`lowerBound(r2) = ${lowerBound(r2)}`);
    console.log(`upperBound(r2) = ${upperBound(r2)}`);
    
    // Test with addInterval (from 2.1.ts)
    const { addInterval } = require('./2.1');
    const sum = addInterval(r1, r2);
    console.log(`\naddInterval(r1, r2) = [${lowerBound(sum)}, ${upperBound(sum)}]`);
};

// Note: In the actual SICP exercise, students are expected to implement
// these selectors to complete the interval arithmetic abstraction.
// The key insight is that the interval abstraction is built on top of
// the pair abstraction (cons/car/cdr).