// TypeScript implementation of SICP Section 3.1 - Assignment and Local State
// Original Scheme code is included as comments for reference

// Assignment and local state

// Scheme: (define (make-withdraw balance)
//          (lambda (amount)
//            (if (>= balance amount)
//                (begin (set! balance (- balance amount))
//                       balance)
//                "Insufficient funds")))
export const makeWithdraw = (initialBalance: number) => {
    let balance = initialBalance;
    return (amount: number) => {
        if (balance >= amount) {
            balance -= amount;
            return balance;
        } else {
            return "Insufficient funds";
        }
    };
};

// Scheme: (define (make-account balance)
//          (define (withdraw amount)
//            (if (>= balance amount)
//              (begin (set! balance (- balance amount))
//                     balance)
//              "Insufficient funds"))
//          (define (deposit amount)
//            (set! balance (+ balance amount))
//            balance)
//          (define (dispatch m)
//            (cond ((eq? m 'withdraw) withdraw)
//                  ((eq? m 'deposit) deposit)
//                  (else (error "Unknown request -- MAKE-ACCOUNT" m))))
//          dispatch)
export const makeAccount = (initialBalance: number) => {
    let balance = initialBalance;
    const withdraw = (amount: number) => {
        if (balance >= amount) {
            balance -= amount;
            return balance;
        } else {
            return "Insufficient funds";
        }
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

// Monte Carlo simulation
// Scheme: (define (estimate-pi trials)
//          (sqrt (/ 6 (monte-carlo trials cesaro-test))))
export const estimatePi = (trials: number): number => {
    return Math.sqrt(6 / monteCarlo(trials, cesaroTest));
};

// Scheme: (define (cesaro-test)
//          (= (gcd (rand) (rand)) 1))
export const cesaroTest = (): boolean => {
    const gcd = (a: number, b: number): number => {
        if (b === 0) return a;
        return gcd(b, a % b);
    };
    const rand = () => Math.floor(Math.random() * 1000000);
    return gcd(rand(), rand()) === 1;
};

// Scheme: (define (monte-carlo trials experiment)
//          (define (iter trials-remaining trials-passed)
//            (cond ((= trials-remaining 0) (/ trials-passed trials))
//                  ((experiment)
//                   (iter (- trials-remaining 1) (+ trials-passed 1)))
//                  (else
//                    (iter (- trials-remaining 1) trials-passed))))
//          (iter trials 0))
export const monteCarlo = (trials: number, experiment: () => boolean): number => {
    const iter = (trialsRemaining: number, trialsPassed: number): number => {
        if (trialsRemaining === 0) {
            return trialsPassed / trials;
        } else if (experiment()) {
            return iter(trialsRemaining - 1, trialsPassed + 1);
        } else {
            return iter(trialsRemaining - 1, trialsPassed);
        }
    };
    return iter(trials, 0);
};
