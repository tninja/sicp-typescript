// Exercise 2.27. deep-reverse.

export const deepReverse = (items: any[]): any[] => {
    if (!Array.isArray(items)) {
        return items;
    }
    return [...items].reverse().map(x => Array.isArray(x) ? deepReverse(x) : x);
};
