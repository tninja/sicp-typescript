import { describe, test, expect } from 'vitest';
import { output } from '../helpers';

describe('Debug Helpers', () => {
  test('output - console output helper', () => {
    expect(typeof output).toBe('function');
    expect(() => output('test', 123)).not.toThrow();
  });
});