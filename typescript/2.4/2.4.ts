// TypeScript implementation of SICP Section 2.4 - Multiple Representations for Abstract Data
// Original Scheme code is included as comments for reference

// Multiple representations for abstract data

export type TaggedData = {
    tag: string;
    content: any;
};

// Scheme: (define (attach-tag type-tag contents)
//          (cons type-tag contents))
export const attachTag = (tag: string, content: any): TaggedData => ({ tag, content });
// Scheme: (define (type-tag datum)
//          (if (pair? datum)
//              (car datum)
//              (error "bad tagged data -- TYPE-TAG" datum)))
export const typeTag = (datum: TaggedData) => datum.tag;
// Scheme: (define (content datum)
//          (if (pair? datum)
//              (cdr datum)
//              (error "bad tagged data -- CONTENTS" datum)))
export const contents = (datum: TaggedData) => datum.content;

// Operation table
const operationTable = new Map<string, any>();

// Scheme: (put <op> <types> <proc>) - stores procedure in operation table
// Example: (put 'real-part '(rectangular) real-part-rectangular)
export const put = (op: string, types: string | string[], proc: any) => {
    const typeKey = Array.isArray(types) ? types.join(',') : types;
    operationTable.set(`${op}:${typeKey}`, proc);
};

// Scheme: (get <op> <types>) - retrieves procedure from operation table
// Example: (get 'real-part '(rectangular)) -> real-part-rectangular
export const get = (op: string, types: string | string[]) => {
    const typeKey = Array.isArray(types) ? types.join(',') : types;
    return operationTable.get(`${op}:${typeKey}`);
};

// Apply generic
// Scheme: (define (apply-generic op . args)
//          (let ((type-tags (map type-tag args)))
//            (let ((proc (get op type-tags)))
//              (if proc
//                  (apply proc (map content args))
//                  (error "No method for these types - APPLY-GENERIC" (list op type-tags))))))
export const applyGeneric = (op: string, ...args: TaggedData[]) => {
    const typeTags = args.map(typeTag);
    const proc = get(op, typeTags);
    if (proc) {
        return proc(...args.map(contents));
    }
    throw new Error(`No method for these types -- APPLY-GENERIC ${op} ${typeTags}`);
};

// Complex number packages
// Scheme: (define (install-rectangular-package)
//          ;; internal procedures
//          (define (real-part z) (car z))
//          (define (imag-part z) (cdr z))
//          (define (make-from-real-imag x y) (cons x y))
//          (define (magnitude z) (sqrt (+ (square (real-part z)) (square (imag-part z)))))
//          (define (angle z) (atan (imag-part z) (real-part z)))
//          (define (make-from-mag-ang r a) (cons (* r (cos a)) (* r (sin a))))
//          ;; interface to the rest of the system
//          (define (tag x) (attach-tag 'rectangular x))
//          (put 'real-part '(rectangular) real-part)
//          (put 'imag-part '(rectangular) imag-part)
//          (put 'magnitude '(rectangular) magnitude)
//          (put 'angle '(rectangular) angle)
//          (put 'make-from-real-imag 'rectangular (lambda (x y) (tag (make-from-real-imag x y))))
//          (put 'make-from-mag-ang 'rectangular (lambda (r a) (tag (make-from-mag-ang r a))))
//          'done)
export const installRectangularPackage = () => {
    const realPart = (z: [number, number]) => z[0];
    const imagPart = (z: [number, number]) => z[1];
    const magnitude = (z: [number, number]) => Math.sqrt(z[0] * z[0] + z[1] * z[1]);
    const angle = (z: [number, number]) => Math.atan2(z[1], z[0]);
    const makeFromRealImag = (x: number, y: number) => [x, y];
    
    const tag = (x: any) => attachTag('rectangular', x);
    put('realPart', ['rectangular'], realPart);
    put('imagPart', ['rectangular'], imagPart);
    put('magnitude', ['rectangular'], magnitude);
    put('angle', ['rectangular'], angle);
    put('makeFromRealImag', ['rectangular'], (x: number, y: number) => tag(makeFromRealImag(x, y)));
};

// Scheme: (define (install-polar-package)
//          ;; internal procedures
//          (define (magnitude z) (car z))
//          (define (angle z) (cdr z))
//          (define (make-from-mag-ang r a) (cons r a))
//          (define (real-part z) (* (magnitude z) (cos (angle z))))
//          (define (imag-part z) (* (magnitude z) (sin (angle z))))
//          (define (make-from-real-imag x y) (cons (sqrt (+ (square x) (square y))) (atan y x)))
//          ;; interface to the rest of the system
//          (define (tag x) (attach-tag 'polar x))
//          (put 'real-part '(polar) real-part)
//          (put 'imag-part '(polar) imag-part)
//          (put 'magnitude '(polar) magnitude)
//          (put 'angle '(polar) angle)
//          (put 'make-from-real-imag 'polar (lambda (x y) (tag (make-from-real-imag x y))))
//          (put 'make-from-mag-ang 'polar (lambda (r a) (tag (make-from-mag-ang r a))))
//          'done)
export const installPolarPackage = () => {
    const magnitude = (z: [number, number]) => z[0];
    const angle = (z: [number, number]) => z[1];
    const realPart = (z: [number, number]) => magnitude(z) * Math.cos(angle(z));
    const imagPart = (z: [number, number]) => magnitude(z) * Math.sin(angle(z));
    const makeFromMagAng = (r: number, a: number) => [r, a];

    const tag = (x: any) => attachTag('polar', x);
    put('realPart', ['polar'], realPart);
    put('imagPart', ['polar'], imagPart);
    put('magnitude', ['polar'], magnitude);
    put('angle', ['polar'], angle);
    put('makeFromMagAng', ['polar'], (r: number, a: number) => tag(makeFromMagAng(r, a)));
};

// Generic selectors
// Scheme: (define (real-part z) (apply-generic 'real-part z))
export const realPart = (z: TaggedData) => applyGeneric('realPart', z);
// Scheme: (define (imag-part z) (apply-generic 'imag-part z))
export const imagPart = (z: TaggedData) => applyGeneric('imagPart', z);
// Scheme: (define (magnitude z) (apply-generic 'magnitude z))
export const magnitude = (z: TaggedData) => applyGeneric('magnitude', z);
// Scheme: (define (angle z) (apply-generic 'angle z))
export const angle = (z: TaggedData) => applyGeneric('angle', z);
