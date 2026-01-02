// Exercise 2.32. subsets.

export const subsets = (s: any[]): any[][] => {
    if (s.length === 0) {
        return [[]];
    }
    const rest = subsets(s.slice(1));
    return [...rest, ...rest.map(x => [s[0], ...x])];
};
