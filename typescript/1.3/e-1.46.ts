import { average, square } from '../common';

// Exercise 1.46. iterative-improve.

export const iterativeImprove = (isGoodEnough: (guess: number) => boolean, improve: (guess: number) => number) => {
    const iter = (guess: number): number => {
        if (isGoodEnough(guess)) {
            return guess;
        }
        return iter(improve(guess));
    };
    return iter;
};

export const sqrt = (x: number) => {
    return iterativeImprove(
        (guess) => Math.abs(square(guess) - x) < 0.001,
        (guess) => average(guess, x / guess)
    )(1.0);
};

export const fixedPoint = (f: (x: number) => number, firstGuess: number) => {
    return iterativeImprove(
        (guess) => Math.abs(guess - f(guess)) < 0.001,
        (guess) => f(guess)
    )(firstGuess);
};
