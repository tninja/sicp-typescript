// Exercise 1.32. Accumulate.

export const accumulate = <T>(
    combiner: (a: T, b: T) => T,
    nullValue: T,
    term: (x: number) => T,
    a: number,
    next: (x: number) => number,
    b: number
): T => {
    if (a > b) {
        return nullValue;
    }
    return combiner(term(a), accumulate(combiner, nullValue, term, next(a), next, b));
};

export const sum = (term: (x: number) => number, a: number, next: (x: number) => number, b: number) => 
    accumulate((x, y) => x + y, 0, term, a, next, b);

export const product = (term: (x: number) => number, a: number, next: (x: number) => number, b: number) => 
    accumulate((x, y) => x * y, 1, term, a, next, b);

// Iterative accumulate
export const accumulateIter = <T>(
    combiner: (a: T, b: T) => T,
    nullValue: T,
    term: (x: number) => T,
    a: number,
    next: (x: number) => number,
    b: number
): T => {
    const iter = (a: number, result: T): T => {
        if (a > b) {
            return result;
        }
        return iter(next(a), combiner(result, term(a)));
    };
    return iter(a, nullValue);
};
