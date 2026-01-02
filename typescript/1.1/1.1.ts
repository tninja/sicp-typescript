import { average, square } from '../common';

export const abs = (x: number): number => {
    if (x < 0) {
        return -x;
    }
    return x;
};

export const gte = (x: number, y: number): boolean => {
    return x >= y;
};

// Newton square roots finder by iterative guessing
export const squareIter = (guess: number, x: number): number => {
    if (isGoodEnough(guess, x)) {
        return guess;
    }
    return squareIter(improve(guess, x), x);
};

export const improve = (guess: number, x: number): number => {
    return average(guess, x / guess);
};

export const isGoodEnough = (guess: number, x: number): boolean => {
    return Math.abs(square(guess) - x) < 0.001;
};

export const sqrt = (x: number): number => {
    return squareIter(1.0, x);
};
