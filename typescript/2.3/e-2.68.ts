import { 
    HuffmanTree, isLeaf, symbols, leftBranch, rightBranch, makeCodeTree 
} from './example-huffman';

// Exercise 2.68. encode.

export const encode = (message: any[], tree: HuffmanTree): number[] => {
    if (message.length === 0) {
        return [];
    }
    return [...encodeSymbol(message[0], tree), ...encode(message.slice(1), tree)];
};

export const encodeSymbol = (symbol: any, tree: HuffmanTree): number[] => {
    if (isLeaf(tree)) {
        return [];
    }
    const left = leftBranch(tree as any);
    const right = rightBranch(tree as any);
    if (symbols(left).includes(symbol)) {
        return [0, ...encodeSymbol(symbol, left)];
    } else if (symbols(right).includes(symbol)) {
        return [1, ...encodeSymbol(symbol, right)];
    } else {
        throw new Error("Symbol not in tree -- ENCODE-SYMBOL " + symbol);
    }
};
