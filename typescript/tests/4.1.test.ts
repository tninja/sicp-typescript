import { describe, test, expect } from 'vitest';
import { evaluate } from '../4.1/4.1';

describe('Chapter 4.1: Metacircular Evaluator', () => {
  test('Evaluate expressions', () => {
    const env: any[] = [{ vars: ['x'], vals: [10] }];
    expect(evaluate(5, env)).toBe(5);
    expect(evaluate('x', env)).toBe(10);
    expect(evaluate(['quote', 'foo'], env)).toBe('foo');
  });
});
