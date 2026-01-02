import { fixedPoint } from './1.3';

// Exercise 1.35. Golden ratio as fixed point.

export const phi = (precision: number): number => {
    return fixedPoint((x: number) => 1 + 1 / x, 1.0, precision);
};
