import { cube, square } from '../common';
import { newtonsMethod } from './1.3';

// Exercise 1.40. Cubic equation.

export const cubic = (a: number, b: number, c: number) => (x: number) => 
    cube(x) + a * square(x) + b * x + c;

export const solveCubic = (a: number, b: number, c: number) => 
    newtonsMethod(cubic(a, b, c), 1.0);
