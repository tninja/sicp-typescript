// Exercise 1.22: Most Lisp implementations include a primitive called runtime that returns an
// integer that specifies the amount of time the system has been running
// (measured, for example, in microseconds). The following timed-prime-test procedure,
// when called with an integer n, prints n and checks to see if n is prime.
// If n is prime, the procedure prints three asterisks followed by the amount of time used in performing the test.

// Original Scheme code:
// (define (timed-prime-test n)
//   (newline)
//   (display n)
//   (start-prime-test n (runtime)))
// 
// (define (report-prime elapsed-time)
//   (display " *** ")
//   (display elapsed-time))
// 
// (define (start-prime-test n start-time)
//   (if (prime? n)
//       (report-prime (- (runtime) start-time))))
// 
// (define (search-for-primes from to)
//   (cond ((>= from to) (newline) (display "done") (newline))
//         ((even? from) (search-for-primes (+ from 1) to)) ; just skip to the next odd
//         (else (timed-prime-test from)
//               (search-for-primes (+ from 2) to)))) ; take only odds

import { isPrime } from './1.2';

// Helper function to get current time in microseconds
const runtime = (): number => {
    // performance.now() returns milliseconds, convert to microseconds
    return performance.now() * 1000;
};

// TypeScript equivalent of timed-prime-test
export const timedPrimeTest = (n: number): number | null => {
    const startTime = runtime();
    
    if (isPrime(n)) {
        const elapsedTime = runtime() - startTime;
        console.log(`${n} *** ${elapsedTime.toFixed(1)}`);
        return elapsedTime;
    }
    
    return null;
};

// TypeScript equivalent of search-for-primes
export const searchForPrimes = (from: number, to: number): { prime: number; time: number }[] => {
    const results: { prime: number; time: number }[] = [];
    
    // Ensure we start with an odd number
    let current = from % 2 === 0 ? from + 1 : from;
    
    while (current < to) {
        const elapsedTime = timedPrimeTest(current);
        if (elapsedTime !== null) {
            results.push({ prime: current, time: elapsedTime });
        }
        current += 2; // Only check odd numbers
    }
    
    console.log('done\n');
    return results;
};

// Find three smallest primes larger than given numbers
export const findThreePrimes = (base: number): { prime: number; time: number }[] => {
    console.log(`\nSearching for primes larger than ${base}:`);
    const results: { prime: number; time: number }[] = [];
    let current = base + (base % 2 === 0 ? 1 : 2); // Start with odd number > base
    
    while (results.length < 3) {
        const elapsedTime = timedPrimeTest(current);
        if (elapsedTime !== null) {
            results.push({ prime: current, time: elapsedTime });
        }
        current += 2;
    }
    
    return results;
};

// Analyze timing data
export const analyzeTimingData = (results1000: { prime: number; time: number }[],
                                  results10000: { prime: number; time: number }[],
                                  results100000: { prime: number; time: number }[],
                                  results1000000: { prime: number; time: number }[]): void => {
    
    const avg = (times: number[]): number => times.reduce((a, b) => a + b) / times.length;
    
    const avg1000 = avg(results1000.map(r => r.time));
    const avg10000 = avg(results10000.map(r => r.time));
    const avg100000 = avg(results100000.map(r => r.time));
    const avg1000000 = avg(results1000000.map(r => r.time));
    
    console.log('\n--- Timing Analysis ---');
    console.log('Average times:');
    console.log(`  1000: ${avg1000.toFixed(1)} µs`);
    console.log(`  10000: ${avg10000.toFixed(1)} µs`);
    console.log(`  100000: ${avg100000.toFixed(1)} µs`);
    console.log(`  1000000: ${avg1000000.toFixed(1)} µs`);
    
    console.log('\nRatios (actual vs expected sqrt(10) ≈ 3.162):');
    console.log(`  10000/1000: ${(avg10000 / avg1000).toFixed(3)}`);
    console.log(`  100000/10000: ${(avg100000 / avg10000).toFixed(3)}`);
    console.log(`  1000000/100000: ${(avg1000000 / avg100000).toFixed(3)}`);
    
    console.log('\nFrom SICP Scheme results:');
    console.log('  1000 range primes: 1009, 1013, 1019');
    console.log('  10000 range primes: 10007, 10009, 10037');
    console.log('  100000 range primes: 100003, 100019, 100043');
    console.log('  1000000 range primes: 1000003, 1000033, 1000037');
};

export const testExercise1_22 = (): void => {
    console.log('Exercise 1.22: Timed prime test\n');
    
    // Find primes in different ranges
    const primes1000 = findThreePrimes(1000);
    const primes10000 = findThreePrimes(10000);
    const primes100000 = findThreePrimes(100000);
    const primes1000000 = findThreePrimes(1000000);
    
    // Analyze timing
    analyzeTimingData(primes1000, primes10000, primes100000, primes1000000);
    
    console.log('\nNote: The algorithm has O(√n) order of growth, so testing primes');
    console.log('around 10,000 should take about √10 ≈ 3.162 times as long as');
    console.log('testing primes around 1000. Our data should support this prediction.');
};

// Uncomment to run the test:
// testExercise1_22();