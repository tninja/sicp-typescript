import { isEven, square } from '../common';

// SICP Section 1.2: Procedures and the Processes They Generate
// Original Scheme code from scheme/1.2/1.2.scm
// 
// ; One of the trivial problems which can describe the difference between
// ; recursive and iterative processes is calculation of factorial
// ;
// ; n! = n*(n-1)*(n-2)*...*3*2*1
// ;
// ; This can be recursivelly defined and executed like this
// ;

// Factorial - recursive
// Original Scheme code:
// (define (factorial n)
//   (if (= n 1)
//       1
//       (* n (factorial (- n 1)))))
export const factorialRecursive = (n: number): number => {
    if (n === 1) {
        return 1;
    }
    return n * factorialRecursive(n - 1);
};

// Factorial - iterative
// Original Scheme code:
// (define (fact-iter product counter max-count)
//   (if (> counter max-count)
//       product
//       (fact-iter
//         (* product counter)
//         (+ counter 1)
//         max-count)))
// 
// (define (factorial n)
//   (fact-iter 1 1 n))
export const factIter = (product: number, counter: number, maxCount: number): number => {
    if (counter > maxCount) {
        return product;
    }
    return factIter(product * counter, counter + 1, maxCount);
};

export const factorial = (n: number): number => {
    return factIter(1, 1, n);
};

// Fibonacci - tree recursive
// Original Scheme code:
// (define (fib n)
//   (cond ((= n 0) 0)
//         ((= n 1) 1)
//         (else (+ (fib (- n 1))
//                  (fib (- n 2))))))
export const fibTree = (n: number): number => {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fibTree(n - 1) + fibTree(n - 2);
};

// Fibonacci - iterative
// Original Scheme code:
// (define (fib n)
//   (fib-iter 0 1 n))
// 
// (define (fib-iter a b count)
//   (if (= count 0)
//       a
//       (fib-iter b (+ a b) (- count 1))))
export const fibIter = (a: number, b: number, count: number): number => {
    if (count === 0) {
        return a;
    }
    return fibIter(b, a + b, count - 1);
};

export const fib = (n: number): number => {
    return fibIter(0, 1, n);
};

// Count change
// Original Scheme code:
// (define (count-change amount)
//   (cc amount 5))
// (define (cc amount kinds-of-coins)
//   (cond ((= amount 0) 1)
//         ((or (< amount 0) (= kinds-of-coins 0)) 0)
//         (else (+ (cc amount (- kinds-of-coins 1))
//                  (cc (- amount (first-denomination kinds-of-coins)) kinds-of-coins)))))
// (define (first-denomination kinds-of-coins)
//   (cond ((= kinds-of-coins 1) 1)
//         ((= kinds-of-coins 2) 5)
//         ((= kinds-of-coins 3) 10)
//         ((= kinds-of-coins 4) 25)
//         ((= kinds-of-coins 5) 50)))
export const countChange = (amount: number): number => {
    return cc(amount, 5);
};

export const cc = (amount: number, kindsOfCoins: number): number => {
    if (amount === 0) return 1;
    if (amount < 0 || kindsOfCoins === 0) return 0;
    return cc(amount, kindsOfCoins - 1) + cc(amount - firstDenomination(kindsOfCoins), kindsOfCoins);
};

export const firstDenomination = (kindsOfCoins: number): number => {
    switch (kindsOfCoins) {
        case 1: return 1;
        case 2: return 5;
        case 3: return 10;
        case 4: return 25;
        case 5: return 50;
        default: return 0;
    }
};

// Exponentiation - linear recursive
// Original Scheme code:
// (define (expt b n)
//   (if (= n 0)
//       1
//       (* b (expt b (- n 1)))))
export const exptRecursive = (b: number, n: number): number => {
    if (n === 0) return 1;
    return b * exptRecursive(b, n - 1);
};

// Exponentiation - iterative
// Original Scheme code:
// (define (expt b n)
//   (expt-iter b n 1))
// 
// (define (expt-iter b count product)
//   (if (= count 0)
//       product
//       (expt-iter b (- count 1) (* product b))))
export const exptIter = (b: number, count: number, product: number): number => {
    if (count === 0) return product;
    return exptIter(b, count - 1, b * product);
};

export const expt = (b: number, n: number): number => {
    return exptIter(b, n, 1);
};

// Fast exponentiation
// Original Scheme code:
// (define (fast-expt b n)
//   (cond ((= n 0) 1)
//         ((even? n) (square (fast-expt b (/ n 2))))
//         (else (* b (fast-expt b (- n 1))))))
export const fastExpt = (b: number, n: number): number => {
    if (n === 0) return 1;
    if (isEven(n)) {
        return square(fastExpt(b, n / 2));
    } else {
        return b * fastExpt(b, n - 1);
    }
};

// Helper function from SICP 1.2.6: divides?
// Original Scheme code:
// (define (divides? a b)
//   (= (remainder b a) 0))
export const divides = (a: number, b: number): boolean => b % a === 0;

// Testing for primality
// Original Scheme code:
// (define (smallest-divisor n)
//   (find-divisor n 2))
export const smallestDivisor = (n: number): number => {
    return findDivisor(n, 2);
};

// Original Scheme code:
// (define (find-divisor n test-divisor)
//   (cond ((> (square test-divisor) n) n)
//         ((divides? test-divisor n) test-divisor)
//         (else (find-divisor n (+ test-divisor 1)))))
export const findDivisor = (n: number, testDivisor: number): number => {
    if (square(testDivisor) > n) return n;
    if (n % testDivisor === 0) return testDivisor;
    return findDivisor(n, testDivisor + 1);
};

// Original Scheme code:
// (define (prime? n)
//   (= n (smallest-divisor n)))
export const isPrime = (n: number): boolean => {
    return n === smallestDivisor(n);
};

// Fermat test
// Original Scheme code:
// (define (expmod base exp m)
//   (cond ((= exp 0) 1)
//         ((even? exp)
//          (remainder (square (expmod base (/ exp 2) m))
//                     m))
//         (else
//          (remainder (* base (expmod base (- exp 1) m))
//                     m))))
export const expmod = (base: number, exp: number, m: number): number => {
    if (exp === 0) return 1;
    if (isEven(exp)) {
        return square(expmod(base, exp / 2, m)) % m;
    } else {
        return (base * expmod(base, exp - 1, m)) % m;
    }
};

// Original Scheme code:
// (define (fermat-test n)
//   (define (try-it a)
//     (= (expmod a n n) a))
//   (try-it (+ 1 (random (- n 1)))))
export const fermatTest = (n: number): boolean => {
    const tryIt = (a: number): boolean => {
        return expmod(a, n, n) === a;
    };
    return tryIt(1 + Math.floor(Math.random() * (n - 1)));
};

// Original Scheme code:
// (define (fast-prime? n times)
//   (cond ((= times 0) true)
//         ((fermat-test n) (fast-prime? n (- times 1)))
//         (else false)))
export const fastPrime = (n: number, times: number): boolean => {
    if (times === 0) return true;
    if (fermatTest(n)) {
        return fastPrime(n, times - 1);
    } else {
        return false;
    }
};
