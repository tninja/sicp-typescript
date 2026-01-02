// Modeling with mutable data

export class Pair {
    constructor(public car: any, public cdr: any) {}
}

export const cons = (x: any, y: any) => new Pair(x, y);
export const car = (p: Pair) => p.car;
export const cdr = (p: Pair) => p.cdr;
export const setCar = (p: Pair, val: any) => { p.car = val; };
export const setCdr = (p: Pair, val: any) => { p.cdr = val; };

export const lastPair = (x: Pair): Pair => {
    if (x.cdr === null) return x;
    return lastPair(x.cdr);
};

export const appendMutable = (x: Pair, y: any) => {
    lastPair(x).cdr = y;
    return x;
};

export const makeCycle = (x: Pair) => {
    lastPair(x).cdr = x;
    return x;
};

// Queue implementation
export class Queue {
    constructor(public frontPtr: Pair | null = null, public rearPtr: Pair | null = null) {}
}

export const isEmptyQueue = (q: Queue) => q.frontPtr === null;

export const makeQueue = () => new Queue();

export const frontQueue = (q: Queue) => {
    if (isEmptyQueue(q)) throw new Error("FRONT called with empty queue");
    return q.frontPtr!.car;
};

export const insertQueue = (q: Queue, item: any) => {
    const newPair = cons(item, null);
    if (isEmptyQueue(q)) {
        q.frontPtr = newPair;
        q.rearPtr = newPair;
    } else {
        q.rearPtr!.cdr = newPair;
        q.rearPtr = newPair;
    }
    return q;
};

export const deleteQueue = (q: Queue) => {
    if (isEmptyQueue(q)) throw new Error("DELETE! called with empty queue");
    q.frontPtr = q.frontPtr!.cdr;
    return q;
};
