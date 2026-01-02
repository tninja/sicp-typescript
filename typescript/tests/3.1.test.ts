import { describe, test, expect } from 'vitest';
import { makeWithdraw, makeAccount } from '../3.1/3.1';
import { makeAccumulator } from '../3.1/e-3.1';
import { makeMonitored } from '../3.1/e-3.2';

describe('Chapter 3.1: Assignment and Local State', () => {
  test('Withdraw and Account', () => {
    const W = makeWithdraw(100);
    expect(W(40)).toBe(60);
    
    const acc = makeAccount(100);
    expect(acc('withdraw')(40)).toBe(60);
  });

  test('Objects with state', () => {
    const acc = makeAccumulator(5);
    expect(acc(10)).toBe(15);
    const m = makeMonitored(Math.sqrt);
    m(100);
    expect(m('how-many-calls?')).toBe(1);
  });
});
