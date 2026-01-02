// Exercise 3.9. Factorial environment analysis.
export const factorial = (n: number): number => {
    if (n === 1) return 1;
    return n * factorial(n - 1);
};

// Exercise 3.10. make-withdraw with let.
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
