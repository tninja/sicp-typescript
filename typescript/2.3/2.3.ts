// TypeScript implementation of SICP Section 2.3 - Symbolic Data
// Original Scheme code is included as comments for reference

// Symbolic differentiation

export type Expression = string | number | any[];

// Scheme: (define (variable? x) (symbol? x))
export const isVariable = (x: Expression): x is string => typeof x === 'string' && !['+', '*'].includes(x);

// Scheme: (define (same-variable? v1 v2)
//          (and (variable? v1) (variable? v2) (eq? v1 v2)))
export const isSameVariable = (v1: Expression, v2: Expression): boolean => 
    isVariable(v1) && isVariable(v2) && v1 === v2;

// Scheme built-in: (number? x)
export const isNumber = (x: Expression): x is number => typeof x === 'number';

// Scheme: (define (=number? exp num)
//          (and (number? exp) (= exp num)))
export const isNumberEqual = (exp: Expression, num: number): boolean => 
    isNumber(exp) && exp === num;

// Scheme: (define (make-sum a1 a2)
//          (cond ((=number? a1 0) a2)
//                ((=number? a2 0) a1)
//                ((and (number? a1) (number? a2)) (+ a1 a2))
//                (else (list '+ a1 a2))))
export const makeSum = (a1: Expression, a2: Expression): Expression => {
    if (isNumberEqual(a1, 0)) return a2;
    if (isNumberEqual(a2, 0)) return a1;
    if (isNumber(a1) && isNumber(a2)) return a1 + a2;
    return ['+', a1, a2];
};

// Scheme: (define (make-product m1 m2)
//          (cond ((or (=number? m1 0) (=number? m2 0)) 0)
//                ((=number? m1 1) m2)
//                ((=number? m2 1) m1)
//                ((and (number? m1) (number? m2)) (* m1 m2))
//                (else (list '* m1 m2))))
export const makeProduct = (m1: Expression, m2: Expression): Expression => {
    if (isNumberEqual(m1, 0) || isNumberEqual(m2, 0)) return 0;
    if (isNumberEqual(m1, 1)) return m2;
    if (isNumberEqual(m2, 1)) return m1;
    if (isNumber(m1) && isNumber(m2)) return m1 * m2;
    return ['*', m1, m2];
};

// Scheme: (define (sum? e) (and (pair? e) (eq? (car e) '+)))
// Scheme: (define (addend e) (cadr e))
// Scheme: (define (augend e) (caddr e))
export const isSum = (x: Expression): boolean => Array.isArray(x) && x[0] === '+';
export const addend = (s: any[]): Expression => s[1];
export const augend = (s: any[]): Expression => s[2];

// Scheme: (define (product? e) (and (pair? e) (eq? (car e) '*)))
// Scheme: (define (multiplier e) (cadr e))
// Scheme: (define (multiplicand e) (caddr e))
export const isProduct = (x: Expression): boolean => Array.isArray(x) && x[0] === '*';
export const multiplier = (p: any[]): Expression => p[1];
export const multiplicand = (p: any[]): Expression => p[2];

// Scheme: (define (deriv exp var)
//          (cond ((number? exp) 0)
//                ((variable? exp)
//                 (if (same-variable? exp var) 1 0))
//                ((sum? exp)
//                 (make-sum (deriv (addend exp) var)
//                           (deriv (augend exp) var)))
//                ((product? exp)
//                 (make-sum 
//                   (make-product (multiplier exp) 
//                                 (deriv (multiplicand exp) var))
//                   (make-product (multiplicand exp)
//                                 (deriv (multiplier exp) var))))
//                (else (error "unknown expression type" exp))))
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
// Scheme: (define (element-of-set? x set)
//          (cond ((null? set) false)
//                ((equal? x (car set)) true)
//                (else (element-of-set? x (cdr set)))))
export const isElementOfSet = <T>(x: T, set: T[]): boolean => set.includes(x);

// Scheme: (define (adjoin-set x set)
//          (if (not (element-of-set? x set))
//              (append set (list x))
//              set))
export const adjoinSet = <T>(x: T, set: T[]): T[] => {
    if (isElementOfSet(x, set)) return set;
    return [...set, x];
};

// Scheme: (define (intersection-set set1 set2)
//          (cond ((or (equal? set1 '()) (equal? set2 '())) '())
//                ((element-of-set? (car set1) set2)
//                 (cons (car set1) (intersection-set (cdr set1) set2)))
//                (else (intersection-set (cdr set1) set2))))
export const intersectionSet = <T>(set1: T[], set2: T[]): T[] => {
    return set1.filter(x => isElementOfSet(x, set2));
};

// Union set - TypeScript implementation combining two sets
// Scheme: (define (union-set set1 set2)
//          (cond ((equal? set1 '()) set2)
//                ((not (element-of-set? (car set1) set2))
//                 (cons (car set1) (union-set (cdr set1) set2)))
//                (else (union-set (cdr set1) set2))))
export const unionSet = <T>(set1: T[], set2: T[]): T[] => {
    const res = [...set1];
    set2.forEach(x => {
        if (!isElementOfSet(x, res)) {
            res.push(x);
        }
    });
    return res;
};
