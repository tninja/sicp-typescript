import { describe, test, expect } from 'vitest';
import { makeEvaluatorMachine } from '../5.4/5.4';

describe('Chapter 5.4: Explicit-Control Evaluator', () => {
  test('Initialize Machine', () => {
    const m = makeEvaluatorMachine();
    expect(m.registers.has('exp')).toBe(true);
    expect(m.registers.has('val')).toBe(true);
  });
});
