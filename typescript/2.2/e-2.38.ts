// Exercise 2.38. fold-left.

export const foldRight = <T, U>(op: (acc: U, curr: T) => U, init: U, seq: T[]): U => 
    seq.reduceRight(op, init);

export const foldLeft = <T, U>(op: (acc: U, curr: T) => U, init: U, seq: T[]): U => 
    seq.reduce(op, init);
