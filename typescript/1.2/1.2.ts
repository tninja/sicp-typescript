import { isEven, square } from '../common';

// Factorial - recursive
export const factorialRecursive = (n: number): number => {
    if (n === 1) {
        return 1;
    }
    return n * factorialRecursive(n - 1);
};

// Factorial - iterative
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
export const fibTree = (n: number): number => {
    if (n === 0) return 0;
    if (n === 1) return 1;
    return fibTree(n - 1) + fibTree(n - 2);
};

// Fibonacci - iterative
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
export const exptRecursive = (b: number, n: number): number => {
    if (n === 0) return 1;
    return b * exptRecursive(b, n - 1);
};

// Exponentiation - iterative
export const exptIter = (b: number, count: number, product: number): number => {
    if (count === 0) return product;
    return exptIter(b, count - 1, b * product);
};

export const expt = (b: number, n: number): number => {
    return exptIter(b, n, 1);
};

// Fast exponentiation
export const fastExpt = (b: number, n: number): number => {
    if (n === 0) return 1;
    if (isEven(n)) {
        return square(fastExpt(b, n / 2));
    } else {
        return b * fastExpt(b, n - 1);
    }
};

// Testing for primality
export const smallestDivisor = (n: number): number => {
    return findDivisor(n, 2);
};

export const findDivisor = (n: number, testDivisor: number): number => {
    if (square(testDivisor) > n) return n;
    if (n % testDivisor === 0) return testDivisor;
    return findDivisor(n, testDivisor + 1);
};

export const isPrime = (n: number): boolean => {
    return n === smallestDivisor(n);
};

// Fermat test
export const expmod = (base: number, exp: number, m: number): number => {
    if (exp === 0) return 1;
    if (isEven(exp)) {
        return square(expmod(base, exp / 2, m)) % m;
    } else {
        return (base * expmod(base, exp - 1, m)) % m;
    }
};

export const fermatTest = (n: number): boolean => {
    const tryIt = (a: number): boolean => {
        return expmod(a, n, n) === a;
    };
    return tryIt(1 + Math.floor(Math.random() * (n - 1)));
};

export const fastPrime = (n: number, times: number): boolean => {
    if (times === 0) return true;
    if (fermatTest(n)) {
        return fastPrime(n, times - 1);
    } else {
        return false;
    }
};
