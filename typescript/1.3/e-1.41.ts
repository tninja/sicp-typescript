// Exercise 1.41. Double.

export const double = <T>(f: (x: T) => T) => (x: T) => f(f(x));

// (((double(double(double)))(inc))(5))
// (double(double)) applies f 4 times.
// (double(double(double))) applies f 16 times.
// Result should be 21 if inc is +1.
