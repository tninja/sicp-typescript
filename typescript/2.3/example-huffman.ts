// Huffman encoding

export type Leaf = ['leaf', any, number];
export type CodeTree = [any, any, any[], number]; // [left, right, symbols, weight]
export type HuffmanTree = Leaf | CodeTree;

export const makeLeaf = (symbol: any, weight: number): Leaf => ['leaf', symbol, weight];
export const isLeaf = (object: HuffmanTree): object is Leaf => object[0] === 'leaf';
export const symbolLeaf = (x: Leaf) => x[1];
export const weightLeaf = (x: Leaf) => x[2];

export const symbols = (tree: HuffmanTree): any[] => {
    if (isLeaf(tree)) {
        return [symbolLeaf(tree)];
    }
    return tree[2];
};

export const weight = (tree: HuffmanTree): number => {
    if (isLeaf(tree)) {
        return weightLeaf(tree);
    }
    return tree[3];
};

export const makeCodeTree = (left: HuffmanTree, right: HuffmanTree): CodeTree => {
    return [
        left,
        right,
        [...symbols(left), ...symbols(right)],
        weight(left) + weight(right)
    ];
};

export const leftBranch = (tree: CodeTree) => tree[0];
export const rightBranch = (tree: CodeTree) => tree[1];

export const decode = (bits: number[], tree: HuffmanTree): any[] => {
    const decodeInner = (bits: number[], currentBranch: HuffmanTree): any[] => {
        if (bits.length === 0) {
            return [];
        }
        const nextBranch = chooseBranch(bits[0], currentBranch as CodeTree);
        if (isLeaf(nextBranch)) {
            return [symbolLeaf(nextBranch), ...decodeInner(bits.slice(1), tree)];
        } else {
            return decodeInner(bits.slice(1), nextBranch);
        }
    };
    return decodeInner(bits, tree);
};

export const chooseBranch = (bit: number, branch: CodeTree): HuffmanTree => {
    if (bit === 0) return leftBranch(branch);
    if (bit === 1) return rightBranch(branch);
    throw new Error("Bad bit -- CHOOSE-BRANCH");
};

export const adjoinSet = (x: HuffmanTree, set: HuffmanTree[]): HuffmanTree[] => {
    if (set.length === 0) return [x];
    if (weight(x) < weight(set[0])) return [x, ...set];
    return [set[0], ...adjoinSet(x, set.slice(1))];
};

export const makeLeafSet = (pairs: [any, number][]): HuffmanTree[] => {
    if (pairs.length === 0) return [];
    const pair = pairs[0];
    return adjoinSet(makeLeaf(pair[0], pair[1]), makeLeafSet(pairs.slice(1)));
};
