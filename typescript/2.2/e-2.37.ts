import { accumulateN } from './e-2.36';

// Exercise 2.37. Matrix operations.

export type Vector = number[];
export type Matrix = Vector[];

export const dotProduct = (v: Vector, w: Vector): number => {
    return v.map((x, i) => x * w[i]).reduce((acc, curr) => acc + curr, 0);
};

export const matrixMultVector = (m: Matrix, v: Vector): Vector => {
    return m.map(row => dotProduct(row, v));
};

export const transpose = (mat: Matrix): Matrix => {
    return accumulateN((acc, curr) => [curr, ...acc], [], mat);
};

export const matrixMultMatrix = (m: Matrix, n: Matrix): Matrix => {
    const cols = transpose(n);
    return m.map(row => matrixMultVector(cols, row));
};
