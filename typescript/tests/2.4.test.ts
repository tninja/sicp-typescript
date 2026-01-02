import { describe, test, expect, beforeAll } from 'vitest';
import { 
  installRectangularPackage, installPolarPackage, 
  realPart, imagPart, magnitude, attachTag 
} from '../2.4/2.4';

describe('Chapter 2.4: Multiple Representations', () => {
  beforeAll(() => {
    installRectangularPackage();
    installPolarPackage();
  });

  test('Complex numbers', () => {
    const z = attachTag('rectangular', [3, 4]);
    expect(realPart(z)).toBe(3);
    expect(imagPart(z)).toBe(4);
    expect(magnitude(z)).toBe(5);
  });
});
