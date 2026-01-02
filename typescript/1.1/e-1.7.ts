import { average, square } from '../common';

export const improve = (guess: number, x: number): number => {
    return average(guess, x / guess);
};

export const squareIter = (guess: number, x: number): number => {
    if (isGoodEnough(guess, x)) {
        return guess;
    } else {
        // console.log(guess);
        return squareIter(improve(guess, x), x);
    }
};

export const isGoodEnough = (guess: number, x: number): boolean => {
    return Math.abs(square(guess) - x) < 0.001;
};

export const sqrt = (x: number): number => {
    return squareIter(1.0, x);
};

export const inDelta = (guess1: number, guess2: number): boolean => {
    return Math.abs(guess1 - guess2) < 0.001;
};

export const squareIterDelta = (guess: number, x: number): number => {
    const nextGuess = improve(guess, x);
    if (inDelta(guess, nextGuess)) {
        return guess;
    } else {
        // console.log(guess);
        return squareIterDelta(nextGuess, x);
    }
};

export const sqrtDelta = (x: number): number => {
    return squareIterDelta(1.0, x);
};
