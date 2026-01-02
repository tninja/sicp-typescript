// Binary tree representation

export type Node<T> = [T, Node<T> | null, Node<T> | null];

export const makeTree = <T>(entry: T, left: Node<T> | null, right: Node<T> | null): Node<T> => [entry, left, right];
export const entry = <T>(tree: Node<T>): T => tree[0];
export const leftBranch = <T>(tree: Node<T>): Node<T> | null => tree[1];
export const rightBranch = <T>(tree: Node<T>): Node<T> | null => tree[2];

export const isElementOfSet = (x: number, set: Node<number> | null): boolean => {
    if (set === null) return false;
    if (x === entry(set)) return true;
    if (x < entry(set)) return isElementOfSet(x, leftBranch(set));
    return isElementOfSet(x, rightBranch(set));
};

export const adjoinSet = (x: number, set: Node<number> | null): Node<number> => {
    if (set === null) return makeTree(x, null, null);
    if (x === entry(set)) return set;
    if (x < entry(set)) {
        return makeTree(entry(set), adjoinSet(x, leftBranch(set)), rightBranch(set));
    }
    return makeTree(entry(set), leftBranch(set), adjoinSet(x, rightBranch(set)));
};
