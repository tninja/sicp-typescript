import { 
    Expression, isNumber, isVariable, isSameVariable, isSum, addend, augend, 
    makeSum, isProduct, multiplier, multiplicand, makeProduct, isNumberEqual 
} from './2.3';

// Exercise 2.56. Exponentiation rule for deriv.

export const isExponent = (x: Expression): boolean => Array.isArray(x) && x[0] === '**';
export const base = (e: any[]): Expression => e[1];
export const exponent = (e: any[]): Expression => e[2];

export const makeExponent = (b: Expression, p: Expression): Expression => {
    if (isNumberEqual(p, 0)) return 1;
    if (isNumberEqual(p, 1)) return b;
    if (isNumber(b) && isNumber(p)) return Math.pow(b, p);
    return ['**', b, p];
};

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
    } else if (isExponent(exp)) {
        const e = exp as any[];
        const b = base(e);
        const p = exponent(e);
        if (isNumber(p)) {
            return makeProduct(
                makeProduct(p, makeExponent(b, p - 1)),
                deriv(b, varName)
            );
        }
        throw new Error("Exponent must be a number for this simplified differentiator");
    } else {
        throw new Error("Unknown expression type -- DERIV");
    }
};
