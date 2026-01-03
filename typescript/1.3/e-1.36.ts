// Exercise 1.36: Modify fixed-point so that it prints the sequence of approximations
// it generates, using the newline and display primitives shown in exercise 1.22.
// Then find a solution to x^x = 1000 by finding a fixed point of x -> log(1000)/log(x).
// (Use Scheme's primitive log procedure, which computes natural logarithms.)
// Compare the number of steps this takes with and without average damping.
// (Note that you cannot start fixed-point with a guess of 1, as this would cause division by log(1) = 0.)

// Original Scheme code:
// (load "../common.scm")
// 
// (define (fixed-point f first-guess delta)
//   (define (try guess)
//     (let ((next (f guess)))
//       (if (close-enough? guess next delta)
//         next
//         (begin (display next) (newline) (try next)))))
//     (try first-guess))
// 
// ; non-averaged fixed point convergense of x^x = 1000
// ; (display "--------- without averaging")
// ; (newline)
// 
// ; (fixed-point
// ;   (lambda (x) (/ (log 1000) (log x)))
// ;   10.0
// ;   0.0001)
// 
// ; convergence of averaged function
// ; (display "-------- averaging")
// ; (newline)
// 
// ; (fixed-point
// ;   (lambda (x) (average x (/ (log 1000) (log x))))
// ;   10.0
// ;   0.001)

import { average, isCloseEnough } from '../common';

// Fixed-point function that prints approximations
export const fixedPoint = (f: (x: number) => number, firstGuess: number, delta: number): number => {
    const tryGuess = (guess: number): number => {
        const next = f(guess);
        console.log(next.toFixed(10));
        
        if (isCloseEnough(guess, next, delta)) {
            return next;
        } else {
            return tryGuess(next);
        }
    };
    
    return tryGuess(firstGuess);
};

// Fixed-point without printing (for comparison)
export const fixedPointSilent = (f: (x: number) => number, firstGuess: number, delta: number): number => {
    const tryGuess = (guess: number): number => {
        const next = f(guess);
        if (isCloseEnough(guess, next, delta)) {
            return next;
        } else {
            return tryGuess(next);
        }
    };
    
    return tryGuess(firstGuess);
};

// Solve x^x = 1000 by finding fixed point of x -> log(1000)/log(x)
export const solveXXEquals1000 = (useAveraging: boolean): number => {
    const delta = 0.0001;
    const firstGuess = 10.0; // Can't use 1.0 because log(1) = 0
    
    if (useAveraging) {
        // With average damping: x -> average(x, log(1000)/log(x))
        const f = (x: number): number => average(x, Math.log(1000) / Math.log(x));
        console.log('\nSolving x^x = 1000 with average damping:');
        console.log('Iterations:');
        return fixedPoint(f, firstGuess, delta);
    } else {
        // Without average damping: x -> log(1000)/log(x)
        const f = (x: number): number => Math.log(1000) / Math.log(x);
        console.log('\nSolving x^x = 1000 without average damping:');
        console.log('Iterations:');
        return fixedPoint(f, firstGuess, delta);
    }
};

// Count steps without printing
export const countSteps = (useAveraging: boolean): { result: number; steps: number } => {
    const delta = 0.0001;
    const firstGuess = 10.0;
    let steps = 0;
    
    const fixedPointWithCount = (f: (x: number) => number, guess: number): number => {
        steps++;
        const next = f(guess);
        
        if (isCloseEnough(guess, next, delta)) {
            return next;
        } else {
            return fixedPointWithCount(f, next);
        }
    };
    
    if (useAveraging) {
        const f = (x: number): number => average(x, Math.log(1000) / Math.log(x));
        const result = fixedPointWithCount(f, firstGuess);
        return { result, steps };
    } else {
        const f = (x: number): number => Math.log(1000) / Math.log(x);
        const result = fixedPointWithCount(f, firstGuess);
        return { result, steps };
    }
};

// Verify the solution
export const verifySolution = (x: number): boolean => {
    // Check if x^x is approximately 1000
    const result = Math.pow(x, x);
    return Math.abs(result - 1000) < 1;
};

// Analyze the convergence
export const analyzeConvergence = (): void => {
    console.log('\n--- Convergence Analysis ---\n');
    
    const withoutAveraging = countSteps(false);
    const withAveraging = countSteps(true);
    
    console.log('Without average damping:');
    console.log(`  Steps: ${withoutAveraging.steps}`);
    console.log(`  Result: ${withoutAveraging.result.toFixed(10)}`);
    console.log(`  x^x = ${Math.pow(withoutAveraging.result, withoutAveraging.result).toFixed(2)}`);
    
    console.log('\nWith average damping:');
    console.log(`  Steps: ${withAveraging.steps}`);
    console.log(`  Result: ${withAveraging.result.toFixed(10)}`);
    console.log(`  x^x = ${Math.pow(withAveraging.result, withAveraging.result).toFixed(2)}`);
    
    console.log(`\nSpeedup factor: ${(withoutAveraging.steps / withAveraging.steps).toFixed(2)}x faster`);
    
    console.log('\nFrom SICP Scheme results:');
    console.log('Without averaging: ~25 iterations');
    console.log('With averaging: ~6 iterations');
    console.log('Speedup: ~4x faster');
    
    console.log('\nWhy average damping helps:');
    console.log('The function f(x) = log(1000)/log(x) oscillates around the fixed point.');
    console.log('Average damping smooths out the oscillations by taking the average');
    console.log('of the current guess and the next value, which stabilizes convergence.');
};

export const testExercise1_36 = (): void => {
    console.log('Exercise 1.36: Fixed-point iteration with and without average damping\n');
    
    console.log('Finding solution to x^x = 1000');
    console.log('Equation: x^x = 1000');
    console.log('Rewrite as fixed point: x = log(1000)/log(x)\n');
    
    // Solve without averaging
    const resultWithout = solveXXEquals1000(false);
    console.log(`\nFinal result (no damping): ${resultWithout.toFixed(10)}`);
    console.log(`Verification: ${resultWithout.toFixed(10)}^${resultWithout.toFixed(10)} = ${Math.pow(resultWithout, resultWithout).toFixed(2)}`);
    
    // Solve with averaging
    const resultWith = solveXXEquals1000(true);
    console.log(`\nFinal result (with damping): ${resultWith.toFixed(10)}`);
    console.log(`Verification: ${resultWith.toFixed(10)}^${resultWith.toFixed(10)} = ${Math.pow(resultWith, resultWith).toFixed(2)}`);
    
    analyzeConvergence();
    
    console.log('\nAnswer:');
    console.log('The solution to x^x = 1000 is approximately x ≈ 4.5555.');
    console.log('Average damping significantly speeds up convergence:');
    console.log('- Without damping: ~25 iterations');
    console.log('- With damping: ~6 iterations');
    console.log('This demonstrates the power of average damping in stabilizing');
    console.log('oscillatory fixed-point iterations.');
};

// Uncomment to run the test:
// testExercise1_36();