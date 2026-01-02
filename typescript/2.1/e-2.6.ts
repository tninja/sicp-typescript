// Exercise 2.6. Church numerals.

export const zero = <T>(f: (x: T) => T) => (x: T) => x;

export const add1 = (n: any) => <T>(f: (x: T) => T) => (x: T) => f(n(f)(x));

export const one = <T>(f: (x: T) => T) => (x: T) => f(x);

export const two = <T>(f: (x: T) => T) => (x: T) => f(f(x));

export const add = (m: any, n: any) => <T>(f: (x: T) => T) => (x: T) => m(f)(n(f)(x));
