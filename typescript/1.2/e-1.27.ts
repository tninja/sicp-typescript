// Exercise 1.27: Demonstrate that the Carmichael numbers listed in footnote
// 47 (561, 1105, 1729, 2465, 2821, and 6601) really do fool the Fermat test.
// That is, write a procedure that takes an integer n and tests whether a^n is
// congruent to a modulo n for every a < n, and try your procedure on the given
// Carmichael numbers.

// Original Scheme code:
// (load "1.2.scm")
// 
// (define (pick-a-prime n)
//   (cond
//     ((= n 1) 561)
//     ((= n 2) 1105)
//     ((= n 3) 1729)
//     ((= n 4) 2465)
//     ((= n 5) 2821)
//     ((= n 6) 6601)
//     (else 1))
// )
// 
// ; for every given prime execute a test
// 
// (define (run-tests n)
//   (cond ((= (pick-a-prime n) 1)
//           (display "done")
//           (newline))
//         (else
//           (test-cm-number (pick-a-prime n))
//           (run-tests (- n 1)))))
// 
// (define (test-cm-number n)
//   (cm-test-iteration 1 n true))
// 
// (define (cm-test-iteration a n is-it?)
//   (cond ((= a n)
//           (display n)
//           (display ": ")
//           (display is-it?)
//           (newline))
//         (else
//           (cm-test-iteration (+ a 1) n (and is-it? (fermat-test a n))))))
// 
// (define (fermat-test a n)
//   (= (expmod a n n) a))

import { expmod } from './1.2';

// List of Carmichael numbers from footnote 47
export const carmichaelNumbers = [561, 1105, 1729, 2465, 2821, 6601];

// Fermat test for a specific base a
export const fermatTest = (a: number, n: number): boolean => {
    return expmod(a, n, n) === a;
};

// Test if n fools the Fermat test for all a < n
export const testCarmichaelNumber = (n: number): boolean => {
    for (let a = 1; a < n; a++) {
        if (!fermatTest(a, n)) {
            return false;
        }
    }
    return true;
};

// More efficient test: only need to test a where gcd(a, n) = 1
// But for completeness, we'll test all a < n as the exercise requests
export const testCarmichaelNumberOptimized = (n: number): boolean => {
    // Carmichael numbers are composite numbers that satisfy
    // a^n ≡ a (mod n) for all integers a
    // Equivalently, a^(n-1) ≡ 1 (mod n) for all a coprime to n
    
    for (let a = 1; a < n; a++) {
        // Check if a and n are coprime (gcd = 1)
        if (gcd(a, n) === 1) {
            if (expmod(a, n - 1, n) !== 1) {
                return false;
            }
        }
    }
    return true;
};

// Helper function for gcd
const gcd = (a: number, b: number): number => {
    if (b === 0) return a;
    return gcd(b, a % b);
};

// Check if a number is prime (for comparison)
export const isPrime = (n: number): boolean => {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    
    for (let i = 3; i * i <= n; i += 2) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
};

// Run tests on all Carmichael numbers
export const testAllCarmichaelNumbers = (): void => {
    console.log('Testing Carmichael numbers:\n');
    
    for (const n of carmichaelNumbers) {
        console.log(`Carmichael number: ${n}`);
        console.log(`  Is prime? ${isPrime(n)}`);
        
        // Test using the exercise's method (all a < n)
        const start1 = performance.now();
        const foolsFermat = testCarmichaelNumber(n);
        const time1 = performance.now() - start1;
        
        // Test using optimized method (only coprime a)
        const start2 = performance.now();
        const foolsFermatOptimized = testCarmichaelNumberOptimized(n);
        const time2 = performance.now() - start2;
        
        console.log(`  Fools Fermat test (all a < n)? ${foolsFermat} (${time1.toFixed(1)} ms)`);
        console.log(`  Fools Fermat test (coprime a)? ${foolsFermatOptimized} (${time2.toFixed(1)} ms)`);
        console.log(`  Prime factors: ${getPrimeFactors(n).join(' × ')}`);
        console.log('');
    }
};

// Helper to get prime factors (for demonstration)
export const getPrimeFactors = (n: number): number[] => {
    const factors: number[] = [];
    let temp = n;
    
    // Check for factor 2
    while (temp % 2 === 0) {
        factors.push(2);
        temp /= 2;
    }
    
    // Check odd factors
    for (let i = 3; i * i <= temp; i += 2) {
        while (temp % i === 0) {
            factors.push(i);
            temp /= i;
        }
    }
    
    // If anything remains
    if (temp > 1) {
        factors.push(temp);
    }
    
    return factors;
};

// Analyze Carmichael numbers
export const analyzeCarmichaelNumbers = (): void => {
    console.log('--- Carmichael Numbers Analysis ---\n');
    
    console.log('Definition: A Carmichael number is a composite number n that');
    console.log('satisfies the congruence b^(n-1) ≡ 1 (mod n) for all integers b');
    console.log('that are relatively prime to n.');
    
    console.log('\nProperties:');
    console.log('1. All Carmichael numbers are odd');
    console.log('2. They are square-free (no prime factor appears more than once)');
    console.log('3. They have at least three prime factors');
    console.log('4. For each prime factor p, (p-1) divides (n-1)');
    
    console.log('\nWhy they fool the Fermat test:');
    console.log('The Fermat test checks if a^(n-1) ≡ 1 (mod n) for random a.');
    console.log('For Carmichael numbers, this holds for ALL a coprime to n,');
    console.log('so the test always returns "prime" even though n is composite.');
    
    console.log('\nFirst few Carmichael numbers:');
    const firstFew = [561, 1105, 1729, 2465, 2821, 6601, 8911, 10585, 15841];
    for (const n of firstFew) {
        const factors = getPrimeFactors(n);
        console.log(`  ${n} = ${factors.join(' × ')}`);
    }
};

// Answer the exercise question
export const answerExercise = (): string => {
    return `Answer to Exercise 1.27:

The Carmichael numbers (561, 1105, 1729, 2465, 2821, 6601) indeed fool the Fermat test.

Demonstration:
1. For each Carmichael number n, we test whether a^n ≡ a (mod n) for all a < n.
2. All tests pass, meaning the Fermat test would incorrectly identify these
   composite numbers as primes.
3. These numbers satisfy Fermat's Little Theorem for all bases a, even though
   they are not prime.

Why this happens:
Carmichael numbers are composite numbers that satisfy the congruence
a^(n-1) ≡ 1 (mod n) for all integers a that are coprime to n. This is exactly
what the Fermat test checks (with random a), so it always returns true.

This demonstrates that the Fermat test can produce false positives (claiming
a composite number is prime). While Carmichael numbers are rare, their
existence shows that the Fermat test is probabilistic, not deterministic.

Note: More sophisticated tests (like the Miller-Rabin test) can detect
Carmichael numbers and provide stronger guarantees.`;
};

export const testExercise1_27 = (): void => {
    console.log('Exercise 1.27: Carmichael numbers and the Fermat test\n');
    
    testAllCarmichaelNumbers();
    analyzeCarmichaelNumbers();
    
    console.log('\n' + answerExercise());
};

// Uncomment to run the test:
// testExercise1_27();