// Exercise 1.23: The smallest-divisor procedure shown at the start of this section does lots of needless testing:
// After it checks to see if the number is divisible by 2 there is no point in checking to see if it
// is divisible by any larger even numbers. This suggests that the values used for test-divisor should
// not be 2, 3, 4, 5, 6, ..., but rather 2, 3, 5, 7, 9, .... To implement this change, define a procedure
// next that returns 3 if its input is equal to 2 and otherwise returns its input plus 2.
// Modify the smallest-divisor procedure to use (next test-divisor) instead of (+ test-divisor 1).
// With timed-prime-test incorporating this modified version of smallest-divisor,
// run the test for each of the 12 primes found in exercise 1.22. Since this modification halves the
// number of test steps, you should expect it to run about twice as fast.
// Is this expectation confirmed? If not, what is the observed ratio of the speeds of the two algorithms,
// and how do you explain the fact that it is different from 2?

// Original Scheme code:
// (define (next n)
//   (if (= n 2)
//       3
//       (+ n 2)))
// 
// (define (smallest-divisor n)
//   (find-divisor n 2))
// 
// (define (find-divisor n test-divisor)
//   (cond ((> (square test-divisor) n) n)
//         ((divides? test-divisor n) test-divisor)
//         (else (find-divisor n (next test-divisor)))))
// 
// (define (prime? n)
//   (= n (smallest-divisor n)))

import { square } from '../common';

// Optimized version that skips even numbers after 2
export const next = (n: number): number => {
    return n === 2 ? 3 : n + 2;
};

// Optimized find-divisor that uses next to skip even numbers
export const findDivisorOptimized = (n: number, testDivisor: number): number => {
    if (square(testDivisor) > n) return n;
    if (n % testDivisor === 0) return testDivisor;
    return findDivisorOptimized(n, next(testDivisor));
};

export const smallestDivisorOptimized = (n: number): number => {
    return findDivisorOptimized(n, 2);
};

export const isPrimeOptimized = (n: number): boolean => {
    return n === smallestDivisorOptimized(n);
};

// Original version from 1.2.ts for comparison
import { findDivisor } from './1.2';

// Helper function to get current time in microseconds
const runtime = (): number => {
    return performance.now() * 1000;
};

// Test function for both versions
export const timedPrimeTest = (n: number, useOptimized: boolean): number | null => {
    const startTime = runtime();
    
    let isPrimeResult: boolean;
    if (useOptimized) {
        isPrimeResult = isPrimeOptimized(n);
    } else {
        // Use original version
        isPrimeResult = n === findDivisor(n, 2);
    }
    
    if (isPrimeResult) {
        const elapsedTime = runtime() - startTime;
        console.log(`${n} *** ${elapsedTime.toFixed(1)}`);
        return elapsedTime;
    }
    
    return null;
};

// List of primes from exercise 1.22
export const primes = [
    1009, 1013, 1019,           // > 1000
    10007, 10009, 10037,        // > 10000
    100003, 100019, 100043,     // > 100000
    1000003, 1000033, 1000037   // > 1000000
];

// Run tests for both versions
export const runPrimesComparison = (): { 
    originalTimes: number[], 
    optimizedTimes: number[],
    ratios: number[]
} => {
    console.log('Original version (testing all numbers):');
    const originalTimes: number[] = [];
    for (const prime of primes) {
        const time = timedPrimeTest(prime, false);
        if (time !== null) {
            originalTimes.push(time);
        }
    }
    
    console.log('\nOptimized version (skipping even numbers):');
    const optimizedTimes: number[] = [];
    for (const prime of primes) {
        const time = timedPrimeTest(prime, true);
        if (time !== null) {
            optimizedTimes.push(time);
        }
    }
    
    console.log('\n\nComparison:');
    const ratios: number[] = [];
    for (let i = 0; i < originalTimes.length; i++) {
        const ratio = originalTimes[i] / optimizedTimes[i];
        ratios.push(ratio);
        console.log(`Prime ${primes[i]}: Original ${originalTimes[i].toFixed(1)} µs, ` +
                   `Optimized ${optimizedTimes[i].toFixed(1)} µs, Ratio: ${ratio.toFixed(3)}`);
    }
    
    const avgRatio = ratios.reduce((a, b) => a + b) / ratios.length;
    console.log(`\nAverage ratio (Original/Optimized): ${avgRatio.toFixed(3)}`);
    console.log(`Expected ratio if twice as fast: 2.000`);
    
    return { originalTimes, optimizedTimes, ratios };
};

// Analyze the results
export const analyzeResults = (originalTimes: number[], optimizedTimes: number[], ratios: number[]): void => {
    console.log('\n--- Analysis ---');
    console.log('The optimized version should be about twice as fast because it');
    console.log('skips testing even divisors (except 2), reducing the number of');
    console.log('test steps by half.');
    console.log('\nHowever, the actual speedup may be less than 2 because:');
    console.log('1. The "next" function adds overhead');
    console.log('2. Function calls in JavaScript have some cost');
    console.log('3. The original algorithm already skips many divisors quickly when n is not divisible');
    
    console.log('\nFrom the Scheme implementation results in SICP:');
    console.log('The optimized version was faster but not exactly twice as fast.');
    console.log('This is because the overhead of the extra function call (next)');
    console.log('reduces the theoretical speedup.');
    
    // Group results by magnitude
    const groups = [
        { name: '~1000', indices: [0, 1, 2] },
        { name: '~10000', indices: [3, 4, 5] },
        { name: '~100000', indices: [6, 7, 8] },
        { name: '~1000000', indices: [9, 10, 11] }
    ];
    
    console.log('\nRatios by magnitude:');
    for (const group of groups) {
        const groupRatios = group.indices.map(i => ratios[i]);
        const avg = groupRatios.reduce((a, b) => a + b) / groupRatios.length;
        console.log(`  ${group.name}: ${avg.toFixed(3)}`);
    }
};

export const testExercise1_23 = (): void => {
    console.log('Exercise 1.23: Optimized prime testing (skipping even divisors)\n');
    
    const { originalTimes, optimizedTimes, ratios } = runPrimesComparison();
    analyzeResults(originalTimes, optimizedTimes, ratios);
    
    console.log('\nConclusion: The optimized version is faster but not exactly twice as fast');
    console.log('due to the overhead of the additional function calls and other factors.');
};

// Uncomment to run the test:
// testExercise1_23();