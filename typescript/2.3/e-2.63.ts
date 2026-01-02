import { Node, entry, leftBranch, rightBranch } from './2.3-binary-trees';

// Exercise 2.63. Tree to list.

export const treeToList1 = <T>(tree: Node<T> | null): T[] => {
    if (tree === null) return [];
    return [
        ...treeToList1(leftBranch(tree)),
        entry(tree),
        ...treeToList1(rightBranch(tree))
    ];
};

export const treeToList2 = <T>(tree: Node<T> | null): T[] => {
    const copyToList = (tree: Node<T> | null, resultList: T[]): T[] => {
        if (tree === null) return resultList;
        return copyToList(
            leftBranch(tree),
            [entry(tree), ...copyToList(rightBranch(tree), resultList)]
        );
    };
    return copyToList(tree, []);
};
