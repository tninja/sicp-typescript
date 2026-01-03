// Exercise 1.20: The process that a procedure generates is of course dependent on the rules used by the interpreter.
// As an example, consider the iterative gcd procedure given below.
// Suppose we were to interpret this procedure using normal-order evaluation,
// as discussed in section 1.1.5. (The normal-order-evaluation rule for if is described in exercise 1.5.).
// Using the substitution method (for normal order), illustrate the process generated in evaluating (gcd 206 40)
// and indicate the remainder operations that are actually performed.
// How many remainder operations are actually performed in the normal-order evaluation of (gcd 206 40)? In the applicative-order evaluation?

// Original Scheme code for gcd (from common.scm):
// (define (gcd a b)
//   (if (= b 0)
//       a
//       (gcd b (remainder a b))))

import { gcd } from '../common';

// Count remainder operations for applicative-order evaluation
export const countRemainderApplicative = (a: number, b: number): { result: number; remainderCount: number } => {
    let remainderCount = 0;
    
    // Helper function to count remainder operations
    const remainder = (x: number, y: number): number => {
        remainderCount++;
        return x % y;
    };
    
    // Implementation of gcd with counting
    const gcdWithCount = (x: number, y: number): number => {
        if (y === 0) {
            return x;
        }
        return gcdWithCount(y, remainder(x, y));
    };
    
    const result = gcdWithCount(a, b);
    return { result, remainderCount };
};

// For normal-order evaluation, we need to simulate lazy evaluation
// This is a simplified simulation - actual normal-order evaluation is more complex
export const analyzeNormalOrder = (): string => {
    return `Normal-order evaluation analysis:
    
For (gcd 206 40) with normal-order evaluation:

1. Check condition: (= 40 0) -> false (0 remainder calls)
2. (gcd 40 (remainder 206 40))
   Check condition: (= (remainder 206 40) 0) -> evaluates to 6 (1 remainder call)
3. (gcd (remainder 206 40) (remainder 40 (remainder 206 40)))
   Check condition: (= (remainder 40 (remainder 206 40)) 0) -> evaluates to 4 (2 remainder calls)
4. (gcd (remainder 40 (remainder 206 40)) (remainder (remainder 206 40) (remainder 40 (remainder 206 40))))
   Check condition: (= (remainder (remainder 206 40) (remainder 40 (remainder 206 40))) 0) -> evaluates to 2 (4 remainder calls)
5. (gcd (remainder (remainder 206 40) (remainder 40 (remainder 206 40))) (remainder (remainder 40 (remainder 206 40)) (remainder (remainder 206 40) (remainder 40 (remainder 206 40)))))
   Check condition: (= (remainder (remainder 40 (remainder 206 40)) (remainder (remainder 206 40) (remainder 40 (remainder 206 40)))) 0) -> evaluates to 0 (7 remainder calls)
   Then evaluate result: (remainder (remainder 206 40) (remainder 40 (remainder 206 40))) -> evaluates to 2 (4 remainder calls)

Total remainder operations in normal-order: 1 + 2 + 4 + 7 + 4 = 18
`;
};

export const analyzeApplicativeOrder = (): string => {
    return `Applicative-order evaluation analysis:
    
For (gcd 206 40) with applicative-order evaluation:

1. (gcd 206 40)
   Check condition: (= 40 0) -> false
2. (gcd 40 (remainder 206 40)) -> evaluates to (gcd 40 6) (1 remainder call)
3. (gcd 40 6)
   Check condition: (= 6 0) -> false
4. (gcd 6 (remainder 40 6)) -> evaluates to (gcd 6 4) (1 remainder call)
5. (gcd 6 4)
   Check condition: (= 4 0) -> false
6. (gcd 4 (remainder 6 4)) -> evaluates to (gcd 4 2) (1 remainder call)
7. (gcd 4 2)
   Check condition: (= 2 0) -> false
8. (gcd 2 (remainder 4 2)) -> evaluates to (gcd 2 0) (1 remainder call)
9. (gcd 2 0)
   Check condition: (= 0 0) -> true, returns 2

Total remainder operations in applicative-order: 4
`;
};

// Test function
export const testExercise1_20 = (): void => {
    console.log('Exercise 1.20: GCD with remainder operation counting\n');
    
    const applicativeResult = countRemainderApplicative(206, 40);
    console.log(`Applicative-order evaluation for gcd(206, 40):`);
    console.log(`  Result: ${applicativeResult.result}`);
    console.log(`  Remainder operations: ${applicativeResult.remainderCount}`);
    
    console.log('\n' + analyzeNormalOrder());
    console.log(analyzeApplicativeOrder());
};