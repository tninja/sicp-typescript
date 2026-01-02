import { describe, test, expect } from 'vitest';
import { unifyMatch } from '../4.4/4.4';

describe('Chapter 4.4: Logic Programming', () => {
  test('Unification', () => {
    const p1 = ['?x', 2];
    const p2 = [1, 2];
    const bindings = unifyMatch(p1, p2, new Map());
    expect(bindings?.get('?x')).toBe(1);
  });
});
