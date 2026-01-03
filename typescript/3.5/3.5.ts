// SICP Section 3.5: Streams
// Original Scheme code from scheme/3.5/3.5.scm

// Stream implementation with memoization
// Original Scheme code concept:
// (define-syntax cons-stream
//   (syntax-rules ()
//     ((cons-stream x y)
//      (cons x (delay y)))))
// (define (stream-car stream) (car stream))
// (define (stream-cdr stream) (force (cdr stream)))
// (define (memo-proc proc)
//   (let ((already-run? false) (result false))
//     (lambda ()
//       (if (not already-run?)
//         (begin
//           (set! result (proc))
//           (set! already-run? true)
//           result)
//         result))))
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

// Constructor for streams (delayed tail)
// Original Scheme code:
// (define-syntax cons-stream
//   (syntax-rules ()
//     ((cons-stream x y)
//      (cons x (delay y)))))
export const consStream = <T>(head: T, tailFunc: () => Stream<T> | null) => new Stream(head, tailFunc);

// Stream car and cdr operations
// Original Scheme code:
// (define (stream-car stream) (car stream))
// (define (stream-cdr stream) (force (cdr stream)))
export const streamCar = <T>(s: Stream<T>) => s.head;
export const streamCdr = <T>(s: Stream<T>) => s.tail;

// Reference nth element of a stream
// Original Scheme code:
// (define (stream-ref s n)
//   (if (= n 0)
//     (stream-car s)
//     (stream-ref (stream-cdr s) (- n 1))))
export const streamRef = <T>(s: Stream<T>, n: number): T => {
    if (n === 0) return s.head;
    const t = s.tail;
    if (t === null) throw new Error("Stream index out of bounds");
    return streamRef(t, n - 1);
};

// Map a procedure over a stream
// Original Scheme code:
// (define (stream-map proc s)
//   (if (stream-null? s)
//     the-empty-stream
//     (cons-stream
//       (proc (stream-car s))
//       (stream-map proc (stream-cdr s)))))
export const streamMap = <T, U>(proc: (x: T) => U, s: Stream<T> | null): Stream<U> | null => {
    if (s === null) return null;
    return consStream(proc(s.head), () => streamMap(proc, s.tail));
};

// Filter a stream with a predicate
// Original Scheme code:
// (define (stream-filter pred stream)
//   (cond ((stream-null? stream) the-empty-stream)
//         ((pred (stream-car stream))
//          (cons-stream (stream-car stream)
//                       (stream-filter pred (stream-cdr stream))))
//         (else (stream-filter pred (stream-cdr stream)))))
export const streamFilter = <T>(pred: (x: T) => boolean, s: Stream<T> | null): Stream<T> | null => {
    if (s === null) return null;
    if (pred(s.head)) {
        return consStream(s.head, () => streamFilter(pred, s.tail));
    }
    return streamFilter(pred, s.tail);
};

// Enumerate interval as a stream
// Original Scheme code:
// (define (stream-enumerate-interval low high)
//   (if (> low high)
//     the-empty-stream
//     (cons-stream low
//                  (stream-enumerate-interval (+ low 1) high))))
export const streamEnumerateInterval = (low: number, high: number): Stream<number> | null => {
    if (low > high) return null;
    return consStream(low, () => streamEnumerateInterval(low + 1, high));
};

// Infinite streams
// Integers starting from n
// Original Scheme code:
// (define (integers-starting-from n)
//   (cons-stream n (integers-starting-from (+ n 1))))
export const integersStartingFrom = (n: number): Stream<number> => {
    return consStream(n, () => integersStartingFrom(n + 1));
};

// Infinite stream of integers starting from 1
// Original Scheme code: (define integers (integers-starting-from 1))
export const integers = integersStartingFrom(1);

// Add two streams element-wise
// Original Scheme code:
// (define (add-streams s1 s2)
//   (stream-map + s1 s2))
// where stream-map handles multiple streams:
// (define (stream-map proc . argstreams)
//   (if (stream-null? (car argstreams))
//       the-empty-stream
//       (cons-stream
//        (apply proc (map car argstreams))
//        (apply stream-map
//               (cons proc (map stream-cdr argstreams))))))
export const addStreams = (s1: Stream<number> | null, s2: Stream<number> | null): Stream<number> | null => {
    if (s1 === null || s2 === null) return null;
    return consStream(s1.head + s2.head, () => addStreams(s1.tail, s2.tail));
};

// Infinite stream of ones
// Original Scheme code: (define ones (cons-stream 1 ones))
export const ones: Stream<number> = consStream(1, () => ones);
