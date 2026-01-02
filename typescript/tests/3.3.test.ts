import { describe, test, expect } from 'vitest';
import { makeQueue, insertQueue, deleteQueue, frontQueue, cons } from '../3.3/3.3';
import { countPairs } from '../3.3/e-3.17';

describe('Chapter 3.3: Modeling with Mutable Data', () => {
  test('Queues', () => {
    const q = makeQueue();
    insertQueue(q, 'a');
    expect(frontQueue(q)).toBe('a');
    deleteQueue(q);
    expect(() => frontQueue(q)).toThrow();
  });

  test('Cycles and Pairs', () => {
    const x = cons('a', 'b');
    const y = cons(x, x);
    expect(countPairs(y)).toBe(2);
  });
});