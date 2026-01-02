import { square } from '../common';

// Exercise 2.30. square-tree.

export const squareTree = (tree: any): any => {
    if (tree === null) return null;
    if (!Array.isArray(tree)) return square(tree);
    return tree.map(squareTree);
};
