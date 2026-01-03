// TypeScript implementation of SICP Section 3.2 Exercises
// Original Scheme code is included as comments for reference

// Exercise 3.9. Factorial environment analysis.
// Scheme: (define (factorial n)
//          (if (= n 1)
//              1
//              (* n (factorial (- n 1)))))
export const factorial = (n: number): number => {
    if (n === 1) return 1;
    return n * factorial(n - 1);
};

// Exercise 3.10. make-withdraw with let.
// Scheme: (define (make-withdraw initial-amount)
//          (let ((balance initial-amount))
//            (lambda (amount)
//              (if (>= balance amount)
//                  (begin (set! balance (- balance amount))
//                         balance)
//                  "Insufficient funds"))))
export const makeWithdraw = (initialAmount: number) => {
    let balance = initialAmount;
    return (amount: number) => {
        if (balance >= amount) {
            balance -= amount;
            return balance;
        }
        return "Insufficient funds";
    };
};

// Exercise 3.11. Internal definitions in make-account.
// Scheme: (define (make-account balance)
//          (define (withdraw amount)
//            (if (>= balance amount)
//                (begin (set! balance (- balance amount))
//                       balance)
//                "Insufficient funds"))
//          (define (deposit amount)
//            (set! balance (+ balance amount))
//            balance)
//          (define (dispatch m)
//            (cond ((eq? m 'withdraw) withdraw)
//                  ((eq? m 'deposit) deposit)
//                  (else (error "Unknown request -- MAKE-ACCOUNT" m))))
//          dispatch)
export const makeAccount = (balance: number) => {
    const withdraw = (amount: number) => {
        if (balance >= amount) {
            balance -= amount;
            return balance;
        }
        return "Insufficient funds";
    };
    const deposit = (amount: number) => {
        balance += amount;
        return balance;
    };
    return (m: string) => {
        if (m === 'withdraw') return withdraw;
        if (m === 'deposit') return deposit;
        throw new Error("Unknown request -- MAKE-ACCOUNT " + m);
    };
};
