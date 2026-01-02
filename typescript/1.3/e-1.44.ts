import { averageOf3 } from '../common';
import { repeated } from './e-1.43';

// Exercise 1.44. Smoothing.

const dx = 0.001;

export const smooth = (f: (x: number) => number) => (x: number) => 
    averageOf3(f(x - dx), f(x), f(x + dx));

export const nFoldSmooth = (f: (x: number) => number, n: number) => 
    (repeated(smooth, n))(f);
