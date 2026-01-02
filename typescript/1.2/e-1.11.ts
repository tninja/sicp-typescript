// Exercise 1.11.  A function f is defined by the rule that 
// f(n) = n if n<3 and f(n) = f(n - 1) + 2f(n - 2) + 3f(n - 3) if n>= 3. 

// Recursive implementation
export const fRecursive = (n: number): number => {
    if (n < 3) return n;
    return fRecursive(n - 1) + 2 * fRecursive(n - 2) + 3 * fRecursive(n - 3);
};

// Iterative implementation
export const fIter = (a: number, b: number, c: number, count: number): number => {
    if (count === 0) return c;
    return fIter(b, c, c + 2 * b + 3 * a, count - 1);
};

export const f = (n: number): number => {
    if (n < 3) return n;
    return fIter(0, 1, 2, n - 2);
};
