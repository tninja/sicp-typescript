import { Node, makeTree } from './2.3-binary-trees';

// Exercise 2.64. List to tree.

export const partialTree = <T>(elts: T[], n: number): [Node<T> | null, T[]] => {
    if (n === 0) {
        return [null, elts];
    }
    const leftSize = Math.floor((n - 1) / 2);
    const [leftTree, nonLeftElts] = partialTree(elts, leftSize);
    const thisEntry = nonLeftElts[0];
    const rightSize = n - (leftSize + 1);
    const [rightTree, remainingElts] = partialTree(nonLeftElts.slice(1), rightSize);
    return [makeTree(thisEntry, leftTree, rightTree), remainingElts];
};

export const listToTree = <T>(elements: T[]): Node<T> | null => {
    return partialTree(elements, elements.length)[0];
};
