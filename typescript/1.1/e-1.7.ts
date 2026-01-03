// Exercise 1.7: The good-enough? test used in computing square roots will not be very
// effective for finding the square roots of very small numbers. Also, in real computers,
// arithmetic operations are almost always performed with limited precision. This makes our
// test inadequate for very large numbers. Explain these statements, with examples showing
// how the test fails for small and large numbers. An alternative strategy for implementing
// good-enough? is to watch how guess changes from one iteration to the next and to stop when
// the change is a very small fraction of the guess. Design a square-root procedure that uses
// this kind of end test. Does this work better for small and large numbers?
//
// Original Scheme code:
// ; (define (square-iter guess x)
// ;   (if (good-enough? guess x)
// ;       guess
// ;       (begin ; used this compound procedure in order to be able to
// ;         (display guess) ; display the intermediate guess values
// ;         (newline)
// ;         (square-iter (improve guess x) x)
// ;       )
// ;   )
// ; )
// ; 
// ; (define (improve guess x)
// ;   (average guess (/ x guess)))
// ; 
// ; (define (average x y)
// ;   (/ (+ x y) 2))
// ; 
// ; (define (square x)
// ;   (* x x))
// ; 
// ; (define (good-enough? guess x)
// ;   (< (abs (- (square guess) x)) 0.001))
// ; 
// ; (define (sqrt x)
// ;   (square-iter 1.0 x))
// ; 
// ; ; additional definitions for new way of implementation of the Babylonian
// ; ; method. improve method is called twice since we still did not
// ; ; introduce tools to remember local value in the procedure.
// ; (define (square-iter-delta guess x)
// ;   (if (in-delta? guess (improve guess x))
// ;       guess
// ;       (begin
// ;         (display guess)
// ;         (newline)
// ;         (square-iter-delta (improve guess x) x)
// ;       )
// ;   )
// ; )
// ; 
// ; (define (in-delta? guess1 guess2)
// ;   (< (abs (- guess1 guess2)) 0.001))
// ; 
// ; (define (sqrt-delta x)
// ;   (square-iter-delta 1.0 x))

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
