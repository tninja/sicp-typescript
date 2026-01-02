import { describe, test, expect } from 'vitest';
import { deriv } from '../2.3/2.3';
import { adjoinSet, isElementOfSet } from '../2.3/2.3-binary-trees';
import { isEqual } from '../2.3/e-2.54';
import { decode } from '../2.3/example-huffman';
import { encode } from '../2.3/e-2.68';
import { generateHuffmanTree } from '../2.3/e-2.69';

describe('Chapter 2.3: Symbolic Data', () => {
  test('Differentiation', () => {
    const exp = ['+', 'x', 3];
    expect(deriv(exp, 'x')).toBe(1);
  });

  test('Sets and Trees', () => {
    const tree = adjoinSet(5, adjoinSet(3, null));
    expect(isElementOfSet(5, tree)).toBe(true);
    expect(isEqual([1, 2], [1, 2])).toBe(true);
  });

  test('Huffman Encoding', () => {
    const pairs: [string, number][] = [['A', 4], ['B', 2], ['C', 1], ['D', 1]];
    const tree = generateHuffmanTree(pairs);
    const msg = ['A', 'D'];
    const bits = encode(msg, tree);
    expect(decode(bits, tree)).toEqual(msg);
  });
});
