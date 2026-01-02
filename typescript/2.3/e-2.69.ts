import { 
    HuffmanTree, makeLeafSet, makeCodeTree, adjoinSet 
} from './example-huffman';

// Exercise 2.69. generate-huffman-tree.

export const generateHuffmanTree = (pairs: [any, number][]): HuffmanTree => {
    return successiveMerge(makeLeafSet(pairs));
};

export const successiveMerge = (set: HuffmanTree[]): HuffmanTree => {
    if (set.length === 1) {
        return set[0];
    }
    const first = set[0];
    const second = set[1];
    const newMerged = makeCodeTree(first, second);
    return successiveMerge(adjoinSet(newMerged, set.slice(2)));
};
