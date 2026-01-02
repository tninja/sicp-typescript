import { describe, test, expect } from 'vitest';
import { makeRat, numer, denom } from '../2.1/2.1';
import { makePoint, makeSegment, midpointSegment } from '../2.1/e-2.2';
import { area, makeRect } from '../2.1/e-2.3';
import { one, two, add } from '../2.1/e-2.6';

describe('Chapter 2.1: Data Abstraction', () => {
  test('Rational numbers', () => {
    const r = makeRat(6, 9);
    expect(numer(r)).toBe(2);
    expect(denom(r)).toBe(3);
  });

  test('Geometry and Rectangles', () => {
    const p1 = makePoint(0, 0);
    const p2 = makePoint(4, 4);
    const mid = midpointSegment(makeSegment(p1, p2));
    expect(mid).toEqual([2, 2]);

    const rect = makeRect(makePoint(0, 10), makePoint(10, 0));
    expect(area(rect)).toBe(100);
  });

  test('Church Numerals', () => {
    const inc = (x: number) => x + 1;
    expect(add(one, two)(inc)(0)).toBe(3);
  });
});
