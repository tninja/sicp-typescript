// Exercise 1.25: Alyssa P. Hacker complains that we went to a lot of extra work in writing
// expmod. After all, she says, since we already know how to compute
// exponentials, we could have simply written
//
// (define (expmod base exp m)
//   (remainder (fast-expt base exp) m))
//
// Is she correct? Would this procedure serve as well for our fast prime tester?
// Explain.

// Original Scheme code:
// (load "../common.scm")
// (load "1.2.scm")
// 
// 
// (define (expmod base exp m)
//   (cond ((= exp 0) 1)
//         ((even? exp)
//          (remainder (square (expmod base (/ exp 2) m))
//                     m))
//         (else
//          (remainder (* base (expmod base (- exp 1) m))
//                     m))))
// 
// (display (expmod 123 33 12))
// (newline)
// 
// 
// ; definition from the examples reusing fast-expt from 1.2.scm
// (define (expmod2 base exp m)
//   (remainder (fast-expt base exp) m))
// 
// (display (expmod2 123 33 12))
// (newline)

import { isEven, square } from '../common';
import { fastExpt } from './1.2';

// Original expmod implementation (from 1.2.ts)
export const expmod = (base: number, exp: number, m: number): number => {
    if (exp === 0) return 1;
    if (isEven(exp)) {
        return square(expmod(base, exp / 2, m)) % m;
    } else {
        return (base * expmod(base, exp - 1, m)) % m;
    }
};

// Alyssa's simpler version using fast-expt
export const expmod2 = (base: number, exp: number, m: number): number => {
    return fastExpt(base, exp) % m;
};

// Test both implementations
export const testBothExpmods = (base: number, exp: number, m: number): void => {
    console.log(`Testing expmod(base=${base}, exp=${exp}, m=${m}):`);
    
    const start1 = performance.now();
    const result1 = expmod(base, exp, m);
    const time1 = performance.now() - start1;
    
    const start2 = performance.now();
    const result2 = expmod2(base, exp, m);
    const time2 = performance.now() - start2;
    
    console.log(`  Original expmod: ${result1} (${time1.toFixed(3)} ms)`);
    console.log(`  Alyssa's expmod: ${result2} (${time2.toFixed(3)} ms)`);
    console.log(`  Results match: ${result1 === result2}`);
    console.log(`  Time ratio (Alyssa's/Original): ${(time2 / time1).toFixed(2)}`);
};

// Demonstrate the problem with large numbers
export const demonstrateProblem = (): void => {
    console.log('\n--- Demonstration of the Problem ---\n');
    
    // Test with relatively small numbers
    console.log('Test 1: Small numbers (base=123, exp=33, m=12)');
    testBothExpmods(123, 33, 12);
    
    // Test with larger exponent
    console.log('\nTest 2: Larger exponent (base=7, exp=100, m=13)');
    testBothExpmods(7, 100, 13);
    
    // Test with even larger numbers
    console.log('\nTest 3: Even larger (base=3, exp=1000, m=17)');
    testBothExpmods(3, 1000, 17);
    
    console.log('\nNote: For very large exponents (e.g., 10^100), Alyssa\'s version');
    console.log('would fail because fastExpt would produce an astronomically large');
    console.log('intermediate result that cannot be represented in JavaScript.');
    console.log('The original expmod keeps numbers small by taking modulo at each step.');
};

// Analyze the algorithmic differences
export const analyzeExpmods = (): void => {
    console.log('\n--- Algorithmic Analysis ---\n');
    
    console.log('Original expmod algorithm:');
    console.log('  1. Uses repeated squaring and modular reduction at each step');
    console.log('  2. Keeps intermediate results small (always < m^2)');
    console.log('  3. Time complexity: O(log exp)');
    console.log('  4. Space complexity: O(log exp) for recursion');
    console.log('  5. Can handle extremely large exponents (e.g., 10^1000)');
    
    console.log('\nAlyssa\'s expmod algorithm:');
    console.log('  1. Computes full exponentiation first, then takes modulo');
    console.log('  2. Intermediate results can be astronomically large');
    console.log('  3. Time complexity: O(log exp) for exponentiation, but with');
    console.log('     large number arithmetic overhead');
    console.log('  4. Space complexity: Needs to store huge intermediate results');
    console.log('  5. Will fail or be extremely slow for large exponents');
    
    console.log('\nKey differences:');
    console.log('  1. Intermediate values: Original keeps values < m^2,');
    console.log('     Alyssa\'s produces values as large as base^exp');
    console.log('  2. Memory usage: Alyssa\'s version needs much more memory');
    console.log('  3. Practical limits: Alyssa\'s version hits limits quickly');
    console.log('     (e.g., 7^100 is ~1.3e84, which JavaScript can\'t handle)');
    
    console.log('\nFor prime testing:');
    console.log('  In Fermat test, we need expmod(a, n-1, n) where n is large');
    console.log('  (potentially hundreds of digits). Alyssa\'s version would need');
    console.log('  to compute a^(n-1) which is impossibly large.');
    console.log('  The original expmod works because it reduces modulo n at each step.');
};

// Answer the exercise question
export const answerExercise = (): string => {
    return `Answer to Exercise 1.25:

Alyssa is NOT correct. While both implementations produce the same mathematical result,
her version (expmod2) has serious practical problems:

1. Intermediate results: fast-expt(base, exp) computes the full exponentiation first,
   which can produce astronomically large numbers even for moderate-sized inputs.
   For example, 7^100 is approximately 3.2 × 10^84, which cannot be represented
   accurately in most programming languages.

2. Memory and performance: Computing and storing these huge numbers requires
   significant memory and processing time for big integer arithmetic.

3. Practical limits: For cryptographic applications or testing large primes,
   we need to compute modular exponentiations where the exponent can be
   extremely large (e.g., 2^1024). Alyssa's approach would be impossible.

The original expmod uses the "right-to-left binary method" or "exponentiation by squaring"
with modular reduction at each step. This keeps all intermediate values small
(always less than m^2) and allows computation of modular exponentiation for
arbitrarily large exponents efficiently.

Therefore, Alyssa's procedure would NOT serve well for our fast prime tester,
especially when testing large prime candidates.`;
};

export const testExercise1_25 = (): void => {
    console.log('Exercise 1.25: Comparing expmod implementations\n');
    
    demonstrateProblem();
    analyzeExpmods();
    
    console.log('\n' + answerExercise());
};

// Uncomment to run the test:
// testExercise1_25();