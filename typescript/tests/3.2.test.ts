import { describe, test, expect } from 'vitest';
import { factorial, makeWithdraw } from '../3.2/3.2';

describe('Chapter 3.2: The Environment Model', () => {
  test('Recursive factorial', () => {
    expect(factorial(5)).toBe(120);
  });

  test('makeWithdraw environment', () => {
    const w = makeWithdraw(100);
    expect(w(30)).toBe(70);
  });
});
