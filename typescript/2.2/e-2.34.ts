// Exercise 2.34. Horner's rule.

export const hornerEval = (x: number, coefficientSequence: number[]): number => {
    return coefficientSequence.reduceRight((acc, curr) => curr + x * acc, 0);
};
