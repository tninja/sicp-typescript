// Exercise 1.39. Lambert's tangent.

export const tanCf = (x: number, k: number): number => {
    const nProc = (i: number) => {
        if (i === 1) return x;
        return -(x * x);
    };
    const dProc = (i: number) => 2 * i - 1;

    const iter = (i: number, result: number): number => {
        if (i === 0) return result;
        return iter(i - 1, nProc(i) / (dProc(i) + result));
    };
    return iter(k, 0);
};
