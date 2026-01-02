export const square = (x: number): number => x * x;

export const cube = (x: number): number => x * x * x;

export const double = (x: number): number => x * 2;

export const halve = (x: number): number => x / 2;

export const isEven = (n: number): boolean => n % 2 === 0;

export const isOdd = (n: number): boolean => n % 2 !== 0;

export const div = (a: number, b: number): number => Math.floor(a / b);

export const divides = (a: number, b: number): boolean => b % a === 0;

export const identity = <T>(x: T): T => x;

export const isCloseEnough = (a: number, b: number, delta: number): boolean => Math.abs(a - b) < delta;

export const average = (x: number, y: number): number => (x + y) / 2.0;

export const averageOf3 = (x: number, y: number, z: number): number => (x + y + z) / 3.0;

export const inc = (x: number): number => x + 1;

export const gcd = (a: number, b: number): number => {
    if (b === 0) {
        return a;
    }
    return gcd(b, a % b);
};

export const nil: any[] = [];

// Standard sequence procedures for arrays
export const accumulate = <T, U>(op: (curr: T, acc: U) => U, initial: U, sequence: T[]): U => {
    if (sequence.length === 0) {
        return initial;
    }
    return op(sequence[0], accumulate(op, initial, sequence.slice(1)));
};

export const filter = <T>(predicate: (item: T) => boolean, sequence: T[]): T[] => {
    if (sequence.length === 0) {
        return [];
    }
    if (predicate(sequence[0])) {
        return [sequence[0], ...filter(predicate, sequence.slice(1))];
    }
    return filter(predicate, sequence.slice(1));
};

export const enumerateInterval = (low: number, high: number): number[] => {
    if (low > high) {
        return [];
    }
    return [low, ...enumerateInterval(low + 1, high)];
};

export const foldLeft = <T, U>(op: (acc: U, curr: T) => U, initial: U, sequence: T[]): U => {
    const iter = (result: U, rest: T[]): U => {
        if (rest.length === 0) {
            return result;
        }
        return iter(op(result, rest[0]), rest.slice(1));
    };
    return iter(initial, sequence);
};

export const foldRight = accumulate;

export const reverse = <T>(sequence: T[]): T[] => {
    return foldRight((curr: T, acc: T[]) => [...acc, curr], [] as T[], sequence);
};
