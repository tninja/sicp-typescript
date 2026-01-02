// Concurrency: Mutex and Serializer simulation in JS/TS

export type Mutex = {
    acquire: () => Promise<void>;
    release: () => void;
};

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

// Exercise 3.48. Deadlock avoidance via account numbering.
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
