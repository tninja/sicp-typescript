// Exercise 2.31. tree-map.

export const treeMap = (proc: (x: any) => any, tree: any): any => {
    if (tree === null) return null;
    if (!Array.isArray(tree)) return proc(tree);
    return tree.map(x => treeMap(proc, x));
};
