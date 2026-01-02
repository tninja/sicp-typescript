// Symbolic differentiation

export type Expression = string | number | any[];

export const isVariable = (x: Expression): x is string => typeof x === 'string' && !['+', '*'].includes(x);

export const isSameVariable = (v1: Expression, v2: Expression): boolean => 
    isVariable(v1) && isVariable(v2) && v1 === v2;

export const isNumber = (x: Expression): x is number => typeof x === 'number';

export const isNumberEqual = (exp: Expression, num: number): boolean => 
    isNumber(exp) && exp === num;

export const makeSum = (a1: Expression, a2: Expression): Expression => {
    if (isNumberEqual(a1, 0)) return a2;
    if (isNumberEqual(a2, 0)) return a1;
    if (isNumber(a1) && isNumber(a2)) return a1 + a2;
    return ['+', a1, a2];
};

export const makeProduct = (m1: Expression, m2: Expression): Expression => {
    if (isNumberEqual(m1, 0) || isNumberEqual(m2, 0)) return 0;
    if (isNumberEqual(m1, 1)) return m2;
    if (isNumberEqual(m2, 1)) return m1;
    if (isNumber(m1) && isNumber(m2)) return m1 * m2;
    return ['*', m1, m2];
};

export const isSum = (x: Expression): boolean => Array.isArray(x) && x[0] === '+';
export const addend = (s: any[]): Expression => s[1];
export const augend = (s: any[]): Expression => s[2];

export const isProduct = (x: Expression): boolean => Array.isArray(x) && x[0] === '*';
export const multiplier = (p: any[]): Expression => p[1];
export const multiplicand = (p: any[]): Expression => p[2];

export const deriv = (exp: Expression, varName: string): Expression => {
    if (isNumber(exp)) {
        return 0;
    } else if (isVariable(exp)) {
        return isSameVariable(exp, varName) ? 1 : 0;
    } else if (isSum(exp)) {
        const e = exp as any[];
        return makeSum(deriv(addend(e), varName), deriv(augend(e), varName));
    } else if (isProduct(exp)) {
        const e = exp as any[];
        return makeSum(
            makeProduct(multiplier(e), deriv(multiplicand(e), varName)),
            makeProduct(deriv(multiplier(e), varName), multiplicand(e))
        );
    } else {
        throw new Error("Unknown expression type -- DERIV");
    }
};

// Sets as unordered lists
export const isElementOfSet = <T>(x: T, set: T[]): boolean => set.includes(x);

export const adjoinSet = <T>(x: T, set: T[]): T[] => {
    if (isElementOfSet(x, set)) return set;
    return [...set, x];
};

export const intersectionSet = <T>(set1: T[], set2: T[]): T[] => {
    return set1.filter(x => isElementOfSet(x, set2));
};

export const unionSet = <T>(set1: T[], set2: T[]): T[] => {
    const res = [...set1];
    set2.forEach(x => {
        if (!isElementOfSet(x, res)) {
            res.push(x);
        }
    });
    return res;
};
