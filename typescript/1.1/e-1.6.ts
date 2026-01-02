import { average, square } from '../common';

export const newIf = (predicate: boolean, thenClause: any, elseClause: any): any => {
    if (predicate) {
        return thenClause;
    } else {
        return elseClause;
    }
};

export const improve = (guess: number, x: number): number => {
    return average(guess, x / guess);
};

export const isGoodEnough = (guess: number, x: number): boolean => {
    return Math.abs(square(guess) - x) < 0.001;
};

export const sqrtIter = (guess: number, x: number): number => {
    return newIf(
        isGoodEnough(guess, x),
        guess,
        sqrtIter(improve(guess, x), x)
    );
};

export const sqrt = (x: number): number => {
    return sqrtIter(1.0, x);
};

// Because TypeScript uses applicative-order evaluation, sqrtIter will result 
// in infinite recursion because the recursive call to sqrtIter is evaluated 
// before being passed to newIf.
