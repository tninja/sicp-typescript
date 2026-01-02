// Exercise 2.61. adjoin-set for ordered lists.

export const adjoinSet = (x: number, set: number[]): number[] => {
    if (set.length === 0) return [x];
    if (x === set[0]) return set;
    if (x < set[0]) return [x, ...set];
    return [set[0], ...adjoinSet(x, set.slice(1))];
};
