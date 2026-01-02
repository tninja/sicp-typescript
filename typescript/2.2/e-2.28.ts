// Exercise 2.28. fringe.

export const fringe = (tree: any): any[] => {
    if (tree === null) return [];
    if (!Array.isArray(tree)) return [tree];
    return tree.reduce((acc, curr) => [...acc, ...fringe(curr)], []);
};
