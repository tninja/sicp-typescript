// Exercise 2.36. accumulate-n.

export const accumulateN = <T, U>(op: (acc: U, curr: T) => U, init: U, seqs: T[][]): U[] => {
    if (seqs[0].length === 0) {
        return [];
    }
    return [
        seqs.map(s => s[0]).reduce(op, init),
        ...accumulateN(op, init, seqs.map(s => s.slice(1)))
    ];
};
