// Exercise 1.4
// Operators can be compound expressions.
// Based on the value of parameter b operator is determined.
export const aPlusAbsB = (a: number, b: number): number => {
    return (b > 0 ? (x: number, y: number) => x + y : (x: number, y: number) => x - y)(a, b);
};
