// Exercise 2.5. Numeric representation of pairs.

export const cons = (a: number, b: number) => Math.pow(2, a) * Math.pow(3, b);

const countFactors = (n: number, factor: number): number => {
    let count = 0;
    while (n % factor === 0) {
        count++;
        n /= factor;
    }
    return count;
};

export const car = (z: number) => countFactors(z, 2);
export const cdr = (z: number) => countFactors(z, 3);
