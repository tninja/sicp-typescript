import { square } from '../common';

export const improve = (guess: number, x: number): number => {
    return (x / square(guess) + 2 * guess) / 3;
};

export const inDelta = (guess1: number, guess2: number): boolean => {
    return Math.abs(guess1 - guess2) < 0.001;
};

export const cubeRootIter = (guess: number, x: number): number => {
    const nextGuess = improve(guess, x);
    if (inDelta(guess, nextGuess)) {
        return nextGuess;
    } else {
        // console.log(guess);
        return cubeRootIter(nextGuess, x);
    }
};

export const cubeRoot = (x: number): number => {
    return cubeRootIter(1.0, x);
};
