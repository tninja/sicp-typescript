// Exercise 2.54. equal? for lists.

export const isEqual = (a: any, b: any): boolean => {
    if (a === b) return true;
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        return a.every((val, index) => isEqual(val, b[index]));
    }
    return false;
};
