// Exercise 2.8: Using reasoning analogous to Alyssa's, describe how the difference of two 
// intervals may be computed. Define a corresponding subtraction procedure, called sub-interval.

// Original Scheme code:
// (load "2.1.scm")
// (load "e-2.7.scm")
// 
// (define (sub-interval x y)
//   (make-interval (- (lower-bound x) (lower-bound y))
//                  (- (upper-bound x) (upper-bound y))))

import { makeInterval, lowerBound, upperBound } from './e-2.7';

// Subtraction of intervals
export const subInterval = (x: [number, number], y: [number, number]): [number, number] => {
    // For interval subtraction: [a, b] - [c, d] = [a - d, b - c]
    // This is because the smallest possible difference occurs when we subtract
    // the largest possible value of y from the smallest possible value of x,
    // and the largest possible difference occurs when we subtract the smallest
    // possible value of y from the largest possible value of x.
    return makeInterval(
        lowerBound(x) - upperBound(y),  // smallest possible difference
        upperBound(x) - lowerBound(y)   // largest possible difference
    );
};

// Alternative implementation matching the Scheme code exactly
// (Note: The Scheme implementation above is actually INCORRECT!
// It computes [a-c, b-d] instead of the correct [a-d, b-c])
export const subIntervalIncorrect = (x: [number, number], y: [number, number]): [number, number] => {
    return makeInterval(
        lowerBound(x) - lowerBound(y),
        upperBound(x) - upperBound(y)
    );
};

// Test and demonstrate
export const testSubInterval = (): void => {
    console.log('Exercise 2.8: Interval subtraction\n');
    
    const r1: [number, number] = [0.15, 0.2];
    const r2: [number, number] = [0.9, 1.1];
    
    console.log(`r1 = [${r1[0]}, ${r1[1]}]`);
    console.log(`r2 = [${r2[0]}, ${r2[1]}]`);
    
    const correctResult = subInterval(r1, r2);
    console.log(`\nCorrect subtraction: r1 - r2 = [${r1[0]}, ${r1[1]}] - [${r2[0]}, ${r2[1]}]`);
    console.log(`  = [${r1[0]} - ${r2[1]}, ${r1[1]} - ${r2[0]}]`);
    console.log(`  = [${correctResult[0]}, ${correctResult[1]}]`);
    
    const incorrectResult = subIntervalIncorrect(r1, r2);
    console.log(`\nIncorrect subtraction (Scheme code): r1 - r2 = [${r1[0]}, ${r1[1]}] - [${r2[0]}, ${r2[1]}]`);
    console.log(`  = [${r1[0]} - ${r2[0]}, ${r1[1]} - ${r2[1]}]`);
    console.log(`  = [${incorrectResult[0]}, ${incorrectResult[1]}]`);
    
    console.log('\nExplanation:');
    console.log('For interval arithmetic, when subtracting y from x:');
    console.log('  The smallest possible result occurs when:');
    console.log('    x takes its smallest value (lower-bound)');
    console.log('    y takes its largest value (upper-bound)');
    console.log('  So min(x - y) = lower-bound(x) - upper-bound(y)');
    console.log('');
    console.log('  The largest possible result occurs when:');
    console.log('    x takes its largest value (upper-bound)');
    console.log('    y takes its smallest value (lower-bound)');
    console.log('  So max(x - y) = upper-bound(x) - lower-bound(y)');
    console.log('');
    console.log('Therefore: [a, b] - [c, d] = [a - d, b - c]');
    console.log('NOT [a - c, b - d] as one might initially think.');
    
    console.log('\nNote: The Scheme code in the exercise appears to have a bug.');
    console.log('It implements [a-c, b-d] instead of the correct [a-d, b-c].');
    console.log('This would give incorrect results for interval arithmetic.');
};

// Uncomment to run the test:
// testSubInterval();