import { describe, test, expect } from 'vitest';
import { delayIt } from '../4.2/4.2';

describe('Chapter 4.2: Lazy Evaluator', () => {
  test('Thunks', () => {
    const env: any[] = [{ vars: ['x'], vals: [42] }];
    const thunk = delayIt('x', env);
    expect(thunk.type).toBe('thunk');
  });
});
