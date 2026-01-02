// Exercise 2.62. union-set for ordered lists.

export const unionSet = (set1: number[], set2: number[]): number[] => {
    if (set1.length === 0) return set2;
    if (set2.length === 0) return set1;
    const x1 = set1[0];
    const x2 = set2[0];
    if (x1 === x2) {
        return [x1, ...unionSet(set1.slice(1), set2.slice(1))];
    } else if (x1 < x2) {
        return [x1, ...unionSet(set1.slice(1), set2)];
    } else {
        return [x2, ...unionSet(set1, set2.slice(1))];
    }
};
