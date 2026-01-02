import { Stream, consStream } from './3.5';

// Exercise 3.54. mul-streams.

export const mulStreams = (s1: Stream<number> | null, s2: Stream<number> | null): Stream<number> | null => {
    if (s1 === null || s2 === null) return null;
    return consStream(s1.head * s2.head, () => mulStreams(s1.tail, s2.tail));
};
