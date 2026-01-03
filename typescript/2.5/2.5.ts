import { 
    TaggedData, attachTag, typeTag, contents, put, get, applyGeneric 
} from '../2.4/2.4';
import { gcd } from '../common';

// TypeScript implementation of SICP Section 2.5 - Systems with Generic Operations
// Original Scheme code is included as comments for reference

// Exercise 2.5. Generic Arithmetic System

// Scheme: (define (add x y) (apply-generic 'add x y))
export const add = (x: TaggedData, y: TaggedData) => applyGeneric('add', x, y);

// Scheme: (define (sub x y) (apply-generic 'sub x y))
export const sub = (x: TaggedData, y: TaggedData) => applyGeneric('sub', x, y);

// Scheme: (define (mul x y) (apply-generic 'mul x y))
export const mul = (x: TaggedData, y: TaggedData) => applyGeneric('mul', x, y);

// Scheme: (define (div x y) (apply-generic 'div x y))
export const div = (x: TaggedData, y: TaggedData) => applyGeneric('div', x, y);

// Scheme Number package
// Scheme: (define (install-scheme-number-package)
//          (define (tag x) (attach-tag 'scheme-number x))
//          (put 'add '(scheme-number scheme-number)
//               (lambda (x y) (tag (+ x y))))
//          (put 'sub '(scheme-number scheme-number)
//               (lambda (x y) (tag (- x y))))
//          (put 'mul '(scheme-number scheme-number)
//               (lambda (x y) (tag (* x y))))
//          (put 'div '(scheme-number scheme-number)
//               (lambda (x y) (tag (/ x y))))
//          (put 'make 'scheme-number
//               (lambda (x) (tag x)))
//          'done)
export const installSchemeNumberPackage = () => {
    const tag = (x: number) => attachTag('scheme-number', x);
    put('add', ['scheme-number', 'scheme-number'], (x: number, y: number) => tag(x + y));
    put('sub', ['scheme-number', 'scheme-number'], (x: number, y: number) => tag(x - y));
    put('mul', ['scheme-number', 'scheme-number'], (x: number, y: number) => tag(x * y));
    put('div', ['scheme-number', 'scheme-number'], (x: number, y: number) => tag(x / y));
    put('make', 'scheme-number', (x: number) => tag(x));
};

// Scheme: (define (make-scheme-number n)
//          ((get 'make 'scheme-number) n))
export const makeSchemeNumber = (n: number) => attachTag('scheme-number', n);

// Rational Number package
// Scheme: (define (install-rational-package)
//          ;; internal procedures
//          (define (numer x) (car x))
//          (define (denom x) (cdr x))
//          (define (make-rat n d)
//            (let ((g (gcd n d)))
//              (cons (/ n g) (/ d g))))
//          (define (add-rat x y)
//            (make-rat (+ (* (numer x) (denom y))
//                         (* (numer y) (denom x)))
//                      (* (denom x) (denom y))))
//          (define (sub-rat x y)
//            (make-rat (- (* (numer x) (denom y))
//                         (* (numer y) (denom x)))
//                      (* (denom x) (denom y))))
//          (define (mul-rat x y)
//            (make-rat (* (numer x) (numer y))
//                      (* (denom x) (denom y))))
//          (define (div-rat x y)
//            (make-rat (* (numer x) (denom y))
//                      (* (denom x) (numer y))))
//          ;; interface to rest of the system
//          (define (tag x) (attach-tag 'rational x))
//          (put 'add '(rational rational)
//               (lambda (x y) (tag (add-rat x y))))
//          (put 'sub '(rational rational)
//               (lambda (x y) (tag (sub-rat x y))))
//          (put 'mul '(rational rational)
//               (lambda (x y) (tag (mul-rat x y))))
//          (put 'div '(rational rational)
//               (lambda (x y) (tag (div-rat x y))))
//          (put 'make 'rational
//               (lambda (n d) (tag (make-rat n d))))
//          'done)
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

// Scheme: (define (make-rational n d)
//          ((get 'make 'rational) n d))
export const makeRational = (n: number, d: number) => attachTag('rational', [n, d]);

// Coercion
const coercionTable = new Map<string, any>();

// Scheme: (define (put-coercion type1 type2 proc)
//          (hash-table-set! coercion-table (list type1 type2) proc))
export const putCoercion = (type1: string, type2: string, proc: any) => {
    coercionTable.set(`${type1}->${type2}`, proc);
};

// Scheme: (define (get-coercion type1 type2)
//          (hash-table-ref/default coercion-table (list type1 type2) #f))
export const getCoercion = (type1: string, type2: string) => {
    return coercionTable.get(`${type1}->${type2}`);
};

// Scheme: (define (scheme-number->complex n)
//          (make-complex-from-real-imag (content n) 0))
export const schemeNumberToComplex = (n: TaggedData) => {
    // Assuming makeComplexFromRealImag exists
    return applyGeneric('makeFromRealImag', contents(n), 0);
};
