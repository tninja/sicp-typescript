import { Stream, consStream, integers, addStreams, streamMap } from './3.5';

// Exercise 3.55. partial-sums.
export const partialSums = (s: Stream<number>): Stream<number> => {
    return consStream(s.head, () => addStreams(partialSums(s), s.tail!)!);
};

// Local helper to avoid circular dependency issues
const localScaleStream = (s: Stream<number>, factor: number): Stream<number> => {
    return streamMap((x: number) => x * factor, s)!;
};

// Exercise 3.56. Hamming numbers (merge sorted streams).
export const merge = (s1: Stream<number> | null, s2: Stream<number> | null): Stream<number> | null => {
    if (s1 === null) return s2;
    if (s2 === null) return s1;
    const h1 = s1.head;
    const h2 = s2.head;
    if (h1 < h2) return consStream(h1, () => merge(s1.tail, s2));
    if (h1 > h2) return consStream(h2, () => merge(s1, s2.tail));
    return consStream(h1, () => merge(s1.tail, s2.tail));
};

export const hammingNumbers: Stream<number> = consStream(1, () => 
    merge(localScaleStream(hammingNumbers, 2), 
          merge(localScaleStream(hammingNumbers, 3), 
                localScaleStream(hammingNumbers, 5)))!
);

// Exercise 3.59. Power series integration.
export const integrateSeries = (s: Stream<number>): Stream<number> => {
    const iter = (stream: Stream<number>, n: number): Stream<number> => {
        return consStream(stream.head / n, () => iter(stream.tail!, n + 1));
    };
    return iter(s, 1);
};

export const expSeries: Stream<number> = consStream(1, () => integrateSeries(expSeries));

export const cosineSeries: Stream<number> = consStream(1, () => 
    localScaleStream(integrateSeries(sineSeries), -1)
);
export const sineSeries: Stream<number> = consStream(0, () => integrateSeries(cosineSeries));

// Exercise 3.64. stream-limit.
export const streamLimit = (s: Stream<number>, tolerance: number): number => {
    const s1 = s.head;
    const s2 = s.tail!.head;
    if (Math.abs(s1 - s2) < tolerance) return s2;
    return streamLimit(s.tail!, tolerance);
};