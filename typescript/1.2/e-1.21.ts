// Exercise 1.21: Use the smallest-divisor procedure to find the
// smallest divisor of each of the following numbers: 199, 1999, 19999.

// Original Scheme code from 1.2.scm:
// (define (smallest-divisor n)
//   (find-divisor n 2))
// 
// (define (find-divisor n test-divisor)
//   (cond ((> (square test-divisor) n) n)
//         ((divides? test-divisor n) test-divisor)
//         (else (find-divisor n (+ test-divisor 1)))))
// 
// (define (divides? a b)
//   (= (remainder b a) 0))

import { smallestDivisor } from './1.2';

export const findSmallestDivisors = (): { number: number; smallestDivisor: number }[] => {
    const numbers = [199, 1999, 19999];
    const results: { number: number; smallestDivisor: number }[] = [];
    
    for (const n of numbers) {
        const divisor = smallestDivisor(n);
        results.push({ number: n, smallestDivisor: divisor });
    }
    
    return results;
};

export const testExercise1_21 = (): void => {
    console.log('Exercise 1.21: Smallest divisor test\n');
    
    const results = findSmallestDivisors();
    
    console.log('Results:');
    for (const result of results) {
        console.log(`  smallest-divisor(${result.number}) = ${result.smallestDivisor}`);
    }
    
    console.log('\nExpected results from SICP:');
    console.log('  199 -> 199 (prime)');
    console.log('  1999 -> 1999 (prime)');
    console.log('  19999 -> 7 (19999 = 7 × 2857)');
};

// Test the exercise
// testExercise1_21();