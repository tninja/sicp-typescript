// Exercise 1.31. Product.

export const product = (term: (x: number) => number, a: number, next: (x: number) => number, b: number): number => {
    if (a > b) {
        return 1;
    }
    return term(a) * product(term, next(a), next, b);
};

export const factorial = (n: number) => product((x: number) => x, 1, (x: number) => x + 1, n);

export const piApprox = (n: number): number => {
    const next = (x: number) => x + 2;
    const square = (x: number) => x * x;
    return 4.0 * (2 * product(square, 4, next, n - 2) * n) / product(square, 3, next, n);
};

// Iterative product
export const productIter = (term: (x: number) => number, a: number, next: (x: number) => number, b: number): number => {
    const iter = (a: number, result: number): number => {
        if (a > b) {
            return result;
        }
        return iter(next(a), result * term(a));
    };
    return iter(a, 1);
};
