// Exercise 1.37. Continued fraction.

export const contFrac = (nProc: (i: number) => number, dProc: (i: number) => number, k: number): number => {
    const recurse = (i: number): number => {
        const n = nProc(i);
        const d = dProc(i);
        if (i === k) {
            return n / d;
        }
        return n / (d + recurse(i + 1));
    };
    return recurse(1);
};

// Iterative version
export const contFracIter = (nProc: (i: number) => number, dProc: (i: number) => number, k: number): number => {
    const iter = (i: number, result: number): number => {
        const n = nProc(i);
        const d = dProc(i);
        if (i === 1) {
            return n / (d + result);
        }
        return iter(i - 1, n / (d + result));
    };
    return iter(k, 0); // Start with 0 as initial result
};
