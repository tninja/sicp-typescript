import { describe, test, expect, beforeAll } from 'vitest';
import { 
  installSchemeNumberPackage, installRationalPackage, 
  makeSchemeNumber, makeRational, add 
} from '../2.5/2.5';

describe('Chapter 2.5: Systems with Generic Operations', () => {
  beforeAll(() => {
    installSchemeNumberPackage();
    installRationalPackage();
  });

  test('Generic addition', () => {
    const n1 = makeSchemeNumber(10);
    const n2 = makeSchemeNumber(20);
    expect(add(n1, n2).content).toBe(30);

    const r1 = makeRational(1, 2);
    const r2 = makeRational(1, 4);
    expect(add(r1, r2).content).toEqual([3, 4]);
  });
});
