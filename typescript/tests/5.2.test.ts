import { describe, test, expect } from 'vitest';
import { Machine } from '../5.2/5.2';

describe('Chapter 5.2: Register Machine Simulator', () => {
  test('Registers and Stack', () => {
    const m = new Machine();
    m.allocateRegister('a');
    m.getRegister('a').set(100);
    expect(m.getRegister('a').get()).toBe(100);
    m.stack.push(50);
    expect(m.stack.pop()).toBe(50);
  });
});
