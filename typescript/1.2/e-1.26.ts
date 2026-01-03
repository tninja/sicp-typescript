// Exercise 1.26: Louis Reasoner is having great difficulty doing exercise 1.24. His fast-prime? test seems to run more slowly 
// than his prime? test. Louis calls his friend Eva Lu Ator over to help. 
// When they examine Louis's code, they find that he has rewritten the 
// expmod procedure to use an explicit multiplication, rather than calling square:

// Original Scheme code showing Louis's mistake:
// (define (expmod base exp m)
//   (cond ((= exp 0) 1)
//         ((even? exp)
//          (remainder (* (expmod base (/ exp 2) m)
//                        (expmod base (/ exp 2) m))
//                     m))
//         (else
//          (remainder (* base (expmod base (- exp 1) m))
//                     m))))
// 
// ``I don't see what difference that could make,'' says Louis. 
// ``I do.'' says Eva. ``By writing the procedure like that, you have transformed the (log n) process into a (n) process.'' Explain.

import { isEven, square } from '../common';

// Correct expmod implementation (O(log n))
export const expmodCorrect = (base: number, exp: number, m: number): number => {
    if (exp === 0) return 1;
    if (isEven(exp)) {
        // CORRECT: Compute once, then square
        const half = expmodCorrect(base, exp / 2, m);
        return square(half) % m;
    } else {
        return (base * expmodCorrect(base, exp - 1, m)) % m;
    }
};

// Louis's incorrect expmod implementation (O(n))
export const expmodLouis = (base: number, exp: number, m: number): number => {
    if (exp === 0) return 1;
    if (isEven(exp)) {
        // INCORRECT: Compute twice!
        const half1 = expmodLouis(base, exp / 2, m);
        const half2 = expmodLouis(base, exp / 2, m); // Same computation again!
        return (half1 * half2) % m;
    } else {
        return (base * expmodLouis(base, exp - 1, m)) % m;
    }
};

// Count the number of recursive calls
export const countCallsCorrect = (base: number, exp: number, m: number): { result: number; callCount: number } => {
    let callCount = 0;
    
    const expmodWithCount = (b: number, e: number, mod: number): number => {
        callCount++;
        if (e === 0) return 1;
        if (isEven(e)) {
            const half = expmodWithCount(b, e / 2, mod);
            return square(half) % mod;
        } else {
            return (b * expmodWithCount(b, e - 1, mod)) % mod;
        }
    };
    
    const result = expmodWithCount(base, exp, m);
    return { result, callCount };
};

export const countCallsLouis = (base: number, exp: number, m: number): { result: number; callCount: number } => {
    let callCount = 0;
    
    const expmodWithCount = (b: number, e: number, mod: number): number => {
        callCount++;
        if (e === 0) return 1;
        if (isEven(e)) {
            const half1 = expmodWithCount(b, e / 2, mod);
            const half2 = expmodWithCount(b, e / 2, mod); // Second call!
            return (half1 * half2) % mod;
        } else {
            return (b * expmodWithCount(b, e - 1, mod)) % mod;
        }
    };
    
    const result = expmodWithCount(base, exp, m);
    return { result, callCount };
};

// Analyze the time complexity
export const analyzeComplexity = (): void => {
    console.log('--- Complexity Analysis ---\n');
    
    console.log('Correct implementation (expmodCorrect):');
    console.log('  - When exp is even: T(exp) = T(exp/2) + O(1)');
    console.log('  - When exp is odd:  T(exp) = T(exp-1) + O(1)');
    console.log('  - Master theorem gives: T(exp) = O(log exp)');
    console.log('  - This is exponential speedup via repeated squaring');
    
    console.log('\nLouis\'s implementation (expmodLouis):');
    console.log('  - When exp is even: T(exp) = 2 * T(exp/2) + O(1)');
    console.log('  - When exp is odd:  T(exp) = T(exp-1) + O(1)');
    console.log('  - Recurrence relation for even case: T(exp) = 2T(exp/2)');
    console.log('  - Solving: T(exp) = O(exp)');
    console.log('  - This linearizes the algorithm, destroying the logarithmic speedup');
    
    console.log('\nWhy Louis\'s version is O(n):');
    console.log('  1. For exp = 2^k:');
    console.log('     T(2^k) = 2 * T(2^(k-1))');
    console.log('           = 2^k * T(1)');
    console.log('           = O(2^k) = O(exp)');
    console.log('  2. Each recursive level doubles the work');
    console.log('  3. Total work becomes linear in exp instead of logarithmic');
};

// Demonstrate with examples
export const demonstrateProblem = (): void => {
    console.log('--- Demonstration ---\n');
    
    const testCases = [
        { base: 7, exp: 16, m: 13 },
        { base: 3, exp: 32, m: 17 },
        { base: 5, exp: 64, m: 23 }
    ];
    
    for (const test of testCases) {
        console.log(`Test: expmod(${test.base}, ${test.exp}, ${test.m})`);
        
        const correct = countCallsCorrect(test.base, test.exp, test.m);
        const louis = countCallsLouis(test.base, test.exp, test.m);
        
        console.log(`  Correct: ${correct.result} (${correct.callCount} calls)`);
        console.log(`  Louis:   ${louis.result} (${louis.callCount} calls)`);
        console.log(`  Results match: ${correct.result === louis.result}`);
        console.log(`  Call ratio (Louis/Correct): ${(louis.callCount / correct.callCount).toFixed(1)}`);
        console.log(`  Theoretical ratio for exp=${test.exp}: ~${(test.exp / Math.log2(test.exp)).toFixed(1)}\n`);
    }
    
    console.log('Observation:');
    console.log('Louis\'s version makes exponentially more recursive calls');
    console.log('because it computes the same value twice at each even step.');
};

// Answer the exercise question
export const answerExercise = (): string => {
    return `Answer to Exercise 1.26:

Eva is correct. Louis has transformed the O(log n) process into an O(n) process.

Explanation:

1. Original (correct) expmod:
   - When exp is even: computes expmod(base, exp/2, m) ONCE, then squares it
   - This gives recurrence: T(exp) = T(exp/2) + O(1)
   - Solution: T(exp) = O(log exp) via the master theorem

2. Louis's expmod:
   - When exp is even: computes expmod(base, exp/2, m) TWICE
   - This gives recurrence: T(exp) = 2T(exp/2) + O(1)
   - Solution: T(exp) = O(exp) (solving via recurrence tree shows 2^k calls)

Why this happens:
   The key insight is that (* (expmod base (/ exp 2) m) (expmod base (/ exp 2) m))
   evaluates (expmod base (/ exp 2) m) twice in applicative-order evaluation.
   Each call spawns its own recursive tree, doubling the work at each level.

For exp = 2^k:
   - Correct version: makes ~k = log₂(exp) calls
   - Louis's version: makes ~2^k = exp calls

This explains why Louis's fast-prime? test runs slower than his prime? test:
the Fermat test uses expmod, and Louis's O(n) expmod negates the logarithmic
speedup that makes the Fermat test fast.`;
};

export const testExercise1_26 = (): void => {
    console.log('Exercise 1.26: Louis Reasoner\'s expmod bug\n');
    
    demonstrateProblem();
    analyzeComplexity();
    
    console.log('\n' + answerExercise());
};

// Uncomment to run the test:
// testExercise1_26();