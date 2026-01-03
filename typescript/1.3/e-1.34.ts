// Exercise 1.34: Suppose we define the procedure

// Original Scheme code:
// (load "../common.scm")
// 
// (define (f g)
//   (g 2))
// 
// ; Then we have
// 
// (display (f square)) ; 4
// (newline)
// 
// (display (f (lambda (z) (* z (+ z 1))))) ; 6
// (newline)
// 
// ; What happens if we (perversely) ask the interpreter to
// ; evaluate the combination (f f)? Explain.

import { square } from '../common';

// The procedure f takes a function g and applies it to 2
export const f = (g: (x: number) => number): number => {
    return g(2);
};

// Test cases from the exercise
export const testNormalCases = (): void => {
    console.log('Normal test cases:');
    
    // (f square)
    console.log(`f(square) = ${f(square)}`); // Should be 4
    
    // (f (lambda (z) (* z (+ z 1))))
    const lambda = (z: number): number => z * (z + 1);
    console.log(`f(lambda(z => z*(z+1))) = ${f(lambda)}`); // Should be 6
};

// What happens with (f f)?
export const testFF = (): string => {
    try {
        // TypeScript won't let us do this statically typed,
        // so we need to use type assertions
        const result = f(f as any);
        return `Unexpected success: f(f) = ${result}`;
    } catch (error: any) {
        return `Error: ${error.message}`;
    }
};

// Manual step-by-step evaluation
export const evaluateStepByStep = (): string[] => {
    const steps: string[] = [];
    
    steps.push('Step-by-step evaluation of (f f):');
    steps.push('1. (f f)');
    steps.push('2. Substitute: f(g) = g(2), so (f f) becomes f(2)');
    steps.push('3. Now we have (2 2)');
    steps.push('4. In applicative-order evaluation:');
    steps.push('   - First evaluate the operator position: 2');
    steps.push('   - 2 is not a procedure/function');
    steps.push('   - Error: "2 is not a function"');
    
    return steps;
};

// TypeScript version that shows the type error
export const demonstrateTypeError = (): string => {
    return `TypeScript type analysis:

1. f has type: (g: (x: number) => number) => number
2. So f expects a function of type (number) => number
3. f itself has type (g: (x: number) => number) => number
4. This does not match (number) => number
5. Therefore, f(f) is a type error in TypeScript

In Scheme (dynamically typed):
1. (f f) evaluates to (f 2)
2. (f 2) evaluates to (2 2)
3. 2 is not a procedure
4. Error: "application: not a procedure; expected a procedure that can be applied to arguments"`;
};

export const testExercise1_34 = (): void => {
    console.log('Exercise 1.34: Higher-order function application\n');
    
    testNormalCases();
    
    console.log('\nNow testing (f f):');
    const result = testFF();
    console.log(result);
    
    console.log('\n' + evaluateStepByStep().join('\n'));
    console.log('\n' + demonstrateTypeError());
    
    console.log('\nAnswer:');
    console.log('Evaluating (f f) causes an error because:');
    console.log('1. (f f) reduces to f(2)');
    console.log('2. f(2) reduces to (2 2)');
    console.log('3. 2 is not a procedure/function, so applying it to 2 fails');
    console.log('4. The error message would be something like "2 is not a function"');
};

// Uncomment to run the test:
// testExercise1_34();