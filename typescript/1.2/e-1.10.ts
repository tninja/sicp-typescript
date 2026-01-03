// TypeScript implementation of SICP Exercise 1.10 - Ackermann's Function
// Original Scheme code is included as comments for reference

// Exercise 1.10.  The following procedure computes a mathematical function called Ackermann's function.

// Scheme: (define (A x y)
//          (cond ((= y 0) 0)
//                ((= x 0) (* 2 y))
//                ((= y 1) 2)
//                (else (A (- x 1)
//                         (A x (- y 1))))))
export const A = (x: number, y: number): number => {
    if (y === 0) return 0;
    if (x === 0) return 2 * y;
    if (y === 1) return 2;
    return A(x - 1, A(x, y - 1));
};

// (A 1 10) => 1024
// (A 2 4) => 65536
// (A 3 3) => 65536

// Scheme: (define (f n) (A 0 n))
export const f = (n: number) => A(0, n); // 2n

// Scheme: (define (g n) (A 1 n))
export const g = (n: number) => A(1, n); // 2^n

// Scheme: (define (h n) (A 2 n))
export const h = (n: number) => A(2, n); // 2 tetrated to n
