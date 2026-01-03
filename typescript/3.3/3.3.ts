// SICP Section 3.3: Modeling with Mutable Data
// Original Scheme code from scheme/3.3/3.3.scm, queue.scm, and tables.scm

// Pair implementation with mutable car and cdr
// Original Scheme code concept:
// (define (cons x y)
//   (let ((new (get-new-pair)))
//     (set-car! new x)
//     (set-cdr! new y)
//     new))
export class Pair {
    constructor(public car: any, public cdr: any) {}
}

// cons, car, cdr with mutation
// Original Scheme code:
// (define (cons x y)
//   (let ((new (get-new-pair)))
//     (set-car! new x)
//     (set-cdr! new y)
//     new))
// (define (car pair) (car pair))
// (define (cdr pair) (cdr pair))
// (define (set-car! pair value) (set-car! pair value))
// (define (set-cdr! pair value) (set-cdr! pair value))
export const cons = (x: any, y: any) => new Pair(x, y);
export const car = (p: Pair) => p.car;
export const cdr = (p: Pair) => p.cdr;
export const setCar = (p: Pair, val: any) => { p.car = val; };
export const setCdr = (p: Pair, val: any) => { p.cdr = val; };

// Last pair of a list
// Original Scheme code:
// (define (last-pair x)
//   (if (null? (cdr x))
//       x
//       (last-pair (cdr x))))
export const lastPair = (x: Pair): Pair => {
    if (x.cdr === null) return x;
    return lastPair(x.cdr);
};

// Append to mutable list (destructive)
// Original Scheme code:
// (define (append! x y)
//   (set-cdr! (last-pair x) y)
//   x)
export const appendMutable = (x: Pair, y: any) => {
    lastPair(x).cdr = y;
    return x;
};

// Create a cycle in a list
// Original Scheme concept: not directly in SICP, but similar to:
// (define (make-cycle x)
//   (set-cdr! (last-pair x) x)
//   x)
export const makeCycle = (x: Pair) => {
    lastPair(x).cdr = x;
    return x;
};

// Queue implementation
// Original Scheme code from queue.scm:
// (define (make-queue) (cons '() '()))
// (define (empty-queue? queue) (null? (car queue)))
// (define (front-queue queue)
//   (if (empty-queue? queue)
//     (error "FRONT called with and empty queue" queue)
//     (car (car queue))))
// (define (insert-queue! queue item)
//   (let ((new-pair (cons item '())))
//     (cond ((empty-queue? queue)
//            (set-car! queue new-pair)
//            (set-cdr! queue new-pair)
//            queue)
//           (else
//             (set-cdr! (cdr queue) new-pair)
//             (set-cdr! queue new-pair)
//             queue))))
// (define (delete-queue! queue)
//   (cond ((empty-queue? queue)
//          (error "DELETE! called on the empty queue"))
//         (else
//           (set-car! queue (cdr (car queue)))
//           queue)))
export class Queue {
    constructor(public frontPtr: Pair | null = null, public rearPtr: Pair | null = null) {}
}

// Check if queue is empty
// Original Scheme code: (define (empty-queue? queue) (null? (car queue)))
export const isEmptyQueue = (q: Queue) => q.frontPtr === null;

// Create a new empty queue
// Original Scheme code: (define (make-queue) (cons '() '()))
export const makeQueue = () => new Queue();

// Get front element of queue
// Original Scheme code:
// (define (front-queue queue)
//   (if (empty-queue? queue)
//     (error "FRONT called with and empty queue" queue)
//     (car (car queue))))
export const frontQueue = (q: Queue) => {
    if (isEmptyQueue(q)) throw new Error("FRONT called with empty queue");
    return q.frontPtr!.car;
};

// Insert item at rear of queue
// Original Scheme code:
// (define (insert-queue! queue item)
//   (let ((new-pair (cons item '())))
//     (cond ((empty-queue? queue)
//            (set-car! queue new-pair)
//            (set-cdr! queue new-pair)
//            queue)
//           (else
//             (set-cdr! (cdr queue) new-pair)
//             (set-cdr! queue new-pair)
//             queue))))
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

// Delete front element from queue
// Original Scheme code:
// (define (delete-queue! queue)
//   (cond ((empty-queue? queue)
//          (error "DELETE! called on the empty queue"))
//         (else
//           (set-car! queue (cdr (car queue)))
//           queue)))
export const deleteQueue = (q: Queue) => {
    if (isEmptyQueue(q)) throw new Error("DELETE! called with empty queue");
    q.frontPtr = q.frontPtr!.cdr;
    return q;
};
