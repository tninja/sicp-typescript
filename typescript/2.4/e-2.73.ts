import { get, put } from './2.4';

// Exercise 2.73. Data-directed differentiation.

export type Expression = any[];

export const operator = (exp: Expression) => exp[0];
export const operands = (exp: Expression) => exp.slice(1);

export const deriv = (exp: any, varName: string): any => {
    if (typeof exp === 'number') {
        return 0;
    } else if (typeof exp === 'string') {
        return exp === varName ? 1 : 0;
    } else {
        const proc = get('deriv', [operator(exp)]);
        if (proc) {
            return proc(operands(exp), varName);
        }
        throw new Error("Unknown expression type -- DERIV " + exp);
    }
};

// Installation
export const installSumDerivation = () => {
    const makeSum = (a1: any, a2: any) => ['+', a1, a2];
    const addend = (ops: any[]) => ops[0];
    const augend = (ops: any[]) => ops[1];
    
    put('deriv', ['+'], (ops: any[], varName: string) => 
        makeSum(deriv(addend(ops), varName), deriv(augend(ops), varName))
    );
};

export const installProductDerivation = () => {
    const makeSum = (a1: any, a2: any) => ['+', a1, a2];
    const makeProduct = (m1: any, m2: any) => ['*', m1, m2];
    const multiplier = (ops: any[]) => ops[0];
    const multiplicand = (ops: any[]) => ops[1];

    put('deriv', ['*'], (ops: any[], varName: string) => 
        makeSum(
            makeProduct(multiplier(ops), deriv(multiplicand(ops), varName)),
            makeProduct(deriv(multiplier(ops), varName), multiplicand(ops))
        )
    );
};
