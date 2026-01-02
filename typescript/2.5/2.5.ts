import { 
    TaggedData, attachTag, typeTag, contents, put, get, applyGeneric 
} from '../2.4/2.4';
import { gcd } from '../common';

// Exercise 2.5. Generic Arithmetic System

export const add = (x: TaggedData, y: TaggedData) => applyGeneric('add', x, y);
export const sub = (x: TaggedData, y: TaggedData) => applyGeneric('sub', x, y);
export const mul = (x: TaggedData, y: TaggedData) => applyGeneric('mul', x, y);
export const div = (x: TaggedData, y: TaggedData) => applyGeneric('div', x, y);

// Scheme Number package
export const installSchemeNumberPackage = () => {
    const tag = (x: number) => attachTag('scheme-number', x);
    put('add', ['scheme-number', 'scheme-number'], (x: number, y: number) => tag(x + y));
    put('sub', ['scheme-number', 'scheme-number'], (x: number, y: number) => tag(x - y));
    put('mul', ['scheme-number', 'scheme-number'], (x: number, y: number) => tag(x * y));
    put('div', ['scheme-number', 'scheme-number'], (x: number, y: number) => tag(x / y));
    put('make', 'scheme-number', (x: number) => tag(x));
};

export const makeSchemeNumber = (n: number) => attachTag('scheme-number', n);

// Rational Number package
export const installRationalPackage = () => {
    const makeRat = (n: number, d: number) => {
        const g = gcd(n, d);
        return [n / g, d / g];
    };
    const addRat = (x: number[], y: number[]) => makeRat(x[0] * y[1] + y[0] * x[1], x[1] * y[1]);
    const subRat = (x: number[], y: number[]) => makeRat(x[0] * y[1] - y[0] * x[1], x[1] * y[1]);
    const mulRat = (x: number[], y: number[]) => makeRat(x[0] * y[0], x[1] * y[1]);
    const divRat = (x: number[], y: number[]) => makeRat(x[0] * y[1], x[1] * y[0]);

    const tag = (x: any) => attachTag('rational', x);
    put('add', ['rational', 'rational'], (x: number[], y: number[]) => tag(addRat(x, y)));
    put('sub', ['rational', 'rational'], (x: number[], y: number[]) => tag(subRat(x, y)));
    put('mul', ['rational', 'rational'], (x: number[], y: number[]) => tag(mulRat(x, y)));
    put('div', ['rational', 'rational'], (x: number[], y: number[]) => tag(divRat(x, y)));
    put('make', 'rational', (n: number, d: number) => tag(makeRat(n, d)));
};

export const makeRational = (n: number, d: number) => attachTag('rational', [n, d]);

// Coercion
const coercionTable = new Map<string, any>();

export const putCoercion = (type1: string, type2: string, proc: any) => {
    coercionTable.set(`${type1}->${type2}`, proc);
};

export const getCoercion = (type1: string, type2: string) => {
    return coercionTable.get(`${type1}->${type2}`);
};

export const schemeNumberToComplex = (n: TaggedData) => {
    // Assuming makeComplexFromRealImag exists
    return applyGeneric('makeFromRealImag', contents(n), 0);
};
