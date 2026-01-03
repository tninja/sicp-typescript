// SICP Section 3.4: Concurrency and Serialization
// Original Scheme code from scheme/3.4/3.4.scm

// Mutex type for mutual exclusion
// Original Scheme concept: mutex object with acquire and release operations
export type Mutex = {
    acquire: () => Promise<void>;
    release: () => void;
};

// Make a mutex (mutual exclusion lock)
// Original Scheme code:
// (define (make-mutex)
//   (let ((cell (list false)))
//     (define (the-mutex m)
//       (cond ((eq? m 'aquire)
//              (if (test-and-set! cell)
//                (the-mutex 'aquire))) ; try again until you aquire it
//             ((eq? m 'release) (clear! cell)))
//       the-mutex)))
// (define (clear! cell)
//   (set-car! cell false))
// (define (test-and-set! cell)
//   (if (car cell)
//     true
//     (begin (set-car! cell true)
//            false)))
export const makeMutex = (): Mutex => {
    let locked = false;
    const waiting: (() => void)[] = [];

    const acquire = (): Promise<void> => {
        if (!locked) {
            locked = true;
            return Promise.resolve();
        }
        return new Promise((resolve) => waiting.push(resolve));
    };

    const release = () => {
        if (waiting.length > 0) {
            const next = waiting.shift();
            next!();
        } else {
            locked = false;
        }
    };

    return { acquire, release };
};

// Make a serializer for serializing procedure execution
// Original Scheme code:
// (define (make-serializer)
//   (let ((mutex (make-mutex)))
//     (lambda (p)
//       (define (serialized-p . args)
//         (mutex 'aquire)
//         (let ((val (apply p args)))
//           (mutex 'release)
//           val))
//       serialized-p))))
export const makeSerializer = () => {
    const mutex = makeMutex();
    return (p: (...args: any[]) => Promise<any>) => {
        return async (...args: any[]) => {
            await mutex.acquire();
            try {
                return await p(...args);
            } finally {
                mutex.release();
            }
        };
    };
};

// Make a bank account with serialized operations
// Original Scheme code:
// (define (make-account balance)
//   (define (withdraw amount)
//     (if (>= balance amount)
//         (begin (set! balance (- balance amount))
//                balance)
//         "Insufficient funds"))
//   (define (deposit amount)
//     (set! balance (+ balance amount))
//     balance)
//   (let ((protected (make-serializer)))
//     (define (dispatch m)
//       (cond ((eq? m 'withdraw) (protected withdraw))
//             ((eq? m 'deposit) (protected deposit))
//             ((eq? m 'balance) balance)
//             (else (error "Unknown request -- MAKE-ACCOUNT"
//                          m))))
//     dispatch))
// 
// Extended version with serializer exposure:
// (define (make-account-and-serializer balance)
//   (define (withdraw amount)
//     (if (>= balance amount)
//         (begin (set! balance (- balance amount))
//                balance)
//         "Insufficient funds"))
//   (define (deposit amount)
//     (set! balance (+ balance amount))
//     balance)
//   (let ((balance-serializer (make-serializer)))
//     (define (dispatch m)
//       (cond ((eq? m 'withdraw) withdraw)
//             ((eq? m 'deposit) deposit)
//             ((eq? m 'balance) balance)
//             ((eq? m 'serializer) balance-serializer)
//             (else (error "Unknown request -- MAKE-ACCOUNT"
//                          m))))
//     dispatch))
export const makeAccount = (balance: number, id: number) => {
    const serializer = makeSerializer();
    return {
        id,
        balance: () => balance,
        withdraw: async (amount: number) => {
            if (balance >= amount) {
                balance -= amount;
                return balance;
            }
            return "Insufficient funds";
        },
        deposit: async (amount: number) => {
            balance += amount;
            return balance;
        },
        serializer: () => serializer
    };
};
