// Exercise 1.30. Iterative sum.

export const sum = (term: (x: number) => number, a: number, next: (x: number) => number, b: number): number => {
    const iter = (a: number, result: number): number => {
        if (a > b) {
            return result;
        }
        return iter(next(a), result + term(a));
    };
    return iter(a, 0);
};
