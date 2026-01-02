// Exercise 2.17. last-pair.

export const lastPair = <T>(items: T[]): T => {
    if (items.length === 0) {
        throw new Error("Empty list");
    }
    return items[items.length - 1];
};
