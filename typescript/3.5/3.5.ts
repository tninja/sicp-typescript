// Streams implementation

export class Stream<T> {
    private memoizedTail: Stream<T> | null = null;
    private tailEvaluated = false;

    constructor(public head: T, private tailFunc: () => Stream<T> | null) {}

    get tail(): Stream<T> | null {
        if (!this.tailEvaluated) {
            this.memoizedTail = this.tailFunc();
            this.tailEvaluated = true;
        }
        return this.memoizedTail;
    }
}

export const consStream = <T>(head: T, tailFunc: () => Stream<T> | null) => new Stream(head, tailFunc);

export const streamCar = <T>(s: Stream<T>) => s.head;
export const streamCdr = <T>(s: Stream<T>) => s.tail;

export const streamRef = <T>(s: Stream<T>, n: number): T => {
    if (n === 0) return s.head;
    const t = s.tail;
    if (t === null) throw new Error("Stream index out of bounds");
    return streamRef(t, n - 1);
};

export const streamMap = <T, U>(proc: (x: T) => U, s: Stream<T> | null): Stream<U> | null => {
    if (s === null) return null;
    return consStream(proc(s.head), () => streamMap(proc, s.tail));
};

export const streamFilter = <T>(pred: (x: T) => boolean, s: Stream<T> | null): Stream<T> | null => {
    if (s === null) return null;
    if (pred(s.head)) {
        return consStream(s.head, () => streamFilter(pred, s.tail));
    }
    return streamFilter(pred, s.tail);
};

export const streamEnumerateInterval = (low: number, high: number): Stream<number> | null => {
    if (low > high) return null;
    return consStream(low, () => streamEnumerateInterval(low + 1, high));
};

// Infinite streams
export const integersStartingFrom = (n: number): Stream<number> => {
    return consStream(n, () => integersStartingFrom(n + 1));
};

export const integers = integersStartingFrom(1);

export const addStreams = (s1: Stream<number> | null, s2: Stream<number> | null): Stream<number> | null => {
    if (s1 === null || s2 === null) return null;
    return consStream(s1.head + s2.head, () => addStreams(s1.tail, s2.tail));
};

export const ones: Stream<number> = consStream(1, () => ones);
