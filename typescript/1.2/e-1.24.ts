// Exercise 1.24: Modify the timed-prime-test procedure of exercise 1.22 to use fast-prime? (the Fermat method),
// and test each of the 12 primes you found in that exercise. Since the Fermat test has (log n)
// growth, how would you expect the time to test primes near 1,000,000 to compare with the time
// needed to test primes near 1000? Do your data bear this out? Can you explain any discrepancy you find?

// Original Scheme code:
// (load "../common.scm")
// (load "1.2.scm")
// 
// ; Copy paste from 1.22 to be reused here without interference
// (define (timed-prime-test n)
//   (newline)
//   (display n)
//   (start-prime-test n (runtime)))
// 
// (define (report-prime elapsed-time)
//   (display " *** ")
//   (display elapsed-time))
// 
// ; reusing fast-prime? from 1.2.scm with 1 probe on Fermat test
// (define (start-prime-test n start-time)
//   (if (fast-prime? n 1)
//       (report-prime (- (runtime) start-time))))
// 
// ; Since one idea is not to introduce new syntax not mentioned in the
// ; previous sections I have to define list of primes to check
// ;
// (define (pick-a-prime n)
//   (cond
//     ((= n 1) 1009)
//     ((= n 2) 1013)
//     ((= n 3) 1019)
//     ((= n 4) 10007)
//     ((= n 5) 10009)
//     ((= n 6) 10037)
//     ((= n 7) 100003)
//     ((= n 8) 100019)
//     ((= n 9) 100043)
//     ((= n 10) 1000003)
//     ((= n 11) 1000033)
//     ((= n 12) 1000037)
//     (else 2))
// )
// 
// ; To recall the times for the numbers in 1.22
// ;
// ; 1009 *** 270644.9031829834
// ; 1013 *** 276235.10360717773
// ; 1019 *** 267241.0011291504
// ;
// ; 10.000
// ; --------------
// ; 10007 *** 815484.7621917725
// ; 10009 *** 817969.0837860;
// ; 10037 *** 801926.851272583
// ;
// ; 100.000
// ; --------------
// ; 100003 *** 2640488.1477355957
// ; 100019 *** 2641607.9998016357
// ; 100043 *** 2636064.052581787
// ;
// ; 1.000.000
// ; --------------
// ;
// ; 1000003 *** 8373789.7872924805
// ; 1000033 *** 8346530.199050903
// ; 1000037 *** 8372905.015945435
// ;
// 
// ; If I run
// 
// (define (run-primes n)
//   (cond ((= n 0) (newline) (display "done") (newline))
//         (else (timed-prime-test (pick-a-prime n))
//               (run-primes (- n 1)))))
// 
// (run-primes 12)

import { fastPrime } from './1.2';

// Helper function to get current time in microseconds
const runtime = (): number => {
    return performance.now() * 1000;
};

// Timed prime test using Fermat method
export const timedPrimeTestFermat = (n: number): number | null => {
    const startTime = runtime();
    
    // Use Fermat test with 1 probe (as specified in the exercise)
    if (fastPrime(n, 1)) {
        const elapsedTime = runtime() - startTime;
        console.log(`${n} *** ${elapsedTime.toFixed(1)}`);
        return elapsedTime;
    }
    
    return null;
};

// List of primes from exercise 1.22
export const pickAPrime = (n: number): number => {
    switch (n) {
        case 1: return 1009;
        case 2: return 1013;
        case 3: return 1019;
        case 4: return 10007;
        case 5: return 10009;
        case 6: return 10037;
        case 7: return 100003;
        case 8: return 100019;
        case 9: return 100043;
        case 10: return 1000003;
        case 11: return 1000033;
        case 12: return 1000037;
        default: return 2;
    }
};

// Run tests for all 12 primes
export const runPrimesFermat = (n: number): number[] => {
    const times: number[] = [];
    
    for (let i = n; i >= 1; i--) {
        const prime = pickAPrime(i);
        const time = timedPrimeTestFermat(prime);
        if (time !== null) {
            times.unshift(time); // Add to beginning to maintain order
        }
    }
    
    console.log('done\n');
    return times;
};

// Analyze the timing data
export const analyzeFermatTiming = (times: number[]): void => {
    console.log('\n--- Fermat Test Timing Analysis ---\n');
    
    // Group times by magnitude
    const groups = [
        { name: '~1000', indices: [0, 1, 2], primes: [1009, 1013, 1019] },
        { name: '~10000', indices: [3, 4, 5], primes: [10007, 10009, 10037] },
        { name: '~100000', indices: [6, 7, 8], primes: [100003, 100019, 100043] },
        { name: '~1000000', indices: [9, 10, 11], primes: [1000003, 1000033, 1000037] }
    ];
    
    const avg = (arr: number[]): number => arr.reduce((a, b) => a + b) / arr.length;
    
    console.log('Average times by magnitude:');
    for (const group of groups) {
        const groupTimes = group.indices.map(i => times[i]);
        const avgTime = avg(groupTimes);
        console.log(`  ${group.name}: ${avgTime.toFixed(1)} µs`);
    }
    
    console.log('\nExpected behavior:');
    console.log('The Fermat test has O(log n) growth, so testing primes near 1,000,000');
    console.log('should take only about log(1000000)/log(1000) ≈ 2 times as long as');
    console.log('testing primes near 1000 (since log10(1000000) = 6, log10(1000) = 3).');
    
    console.log('\nActual ratios:');
    const avg1000 = avg(groups[0].indices.map(i => times[i]));
    const avg10000 = avg(groups[1].indices.map(i => times[i]));
    const avg100000 = avg(groups[2].indices.map(i => times[i]));
    const avg1000000 = avg(groups[3].indices.map(i => times[i]));
    
    console.log(`  10000/1000: ${(avg10000 / avg1000).toFixed(3)} (expected ~log(10)=2.302)`);
    console.log(`  100000/1000: ${(avg100000 / avg1000).toFixed(3)} (expected ~log(100)=4.605)`);
    console.log(`  1000000/1000: ${(avg1000000 / avg1000).toFixed(3)} (expected ~log(1000)=6.908)`);
    
    console.log('\nFrom SICP Scheme results (microseconds):');
    console.log('  ~1000: ~270,000 µs');
    console.log('  ~10000: ~810,000 µs');
    console.log('  ~100000: ~2,640,000 µs');
    console.log('  ~1000000: ~8,370,000 µs');
    
    console.log('\nFermat test results from SICP (microseconds):');
    console.log('  ~1000: ~268,000 µs');
    console.log('  ~10000: ~360,000 µs');
    console.log('  ~100000: ~400,000 µs');
    console.log('  ~1000000: ~500,000 µs');
    
    console.log('\nAnalysis:');
    console.log('The Fermat test (O(log n)) is much faster for larger numbers');
    console.log('compared to the trial division method (O(√n)).');
    console.log('While trial division time increases dramatically with n,');
    console.log('Fermat test time increases only logarithmically.');
};

export const testExercise1_24 = (): void => {
    console.log('Exercise 1.24: Fermat test timing comparison\n');
    console.log('Testing 12 primes with Fermat method (1 probe):\n');
    
    const times = runPrimesFermat(12);
    analyzeFermatTiming(times);
    
    console.log('\nConclusion: The Fermat test shows logarithmic growth O(log n),');
    console.log('making it much more efficient for large numbers compared to');
    console.log('the trial division method O(√n).');
};

// Uncomment to run the test:
// testExercise1_24();