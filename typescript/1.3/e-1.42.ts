// Exercise 1.42. Compose.

export const compose = <T, U, V>(f: (y: U) => V, g: (x: T) => U) => (x: T) => f(g(x));
