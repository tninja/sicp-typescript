import { square } from '../common';

// excercise 1.3
// Define procedure that takes three numbers as arguments and returns
// the sum of the squares of the two larger numbers
export const sumLargerSquare = (a: number, b: number, c: number): number => {
    if (a < b && a < c) {
        return square(b) + square(c);
    } else if (b < a && b < c) {
        return square(a) + square(c);
    } else {
        return square(a) + square(b);
    }
};
