// Exercise 2.4. Procedural representation of pairs.

export const cons = (x: any, y: any) => (m: (p: any, q: any) => any) => m(x, y);

export const car = (z: any) => z((p: any, q: any) => p);

export const cdr = (z: any) => z((p: any, q: any) => q);
