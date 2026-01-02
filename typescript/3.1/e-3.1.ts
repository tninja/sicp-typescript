// Exercise 3.1. accumulator.

export const makeAccumulator = (n: number) => {
    let accumulated = n;
    return (addition: number) => {
        accumulated += addition;
        return accumulated;
    };
};
