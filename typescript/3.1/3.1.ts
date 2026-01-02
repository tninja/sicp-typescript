// Assignment and local state

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
export const estimatePi = (trials: number): number => {
    return Math.sqrt(6 / monteCarlo(trials, cesaroTest));
};

export const cesaroTest = (): boolean => {
    const gcd = (a: number, b: number): number => {
        if (b === 0) return a;
        return gcd(b, a % b);
    };
    const rand = () => Math.floor(Math.random() * 1000000);
    return gcd(rand(), rand()) === 1;
};

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
